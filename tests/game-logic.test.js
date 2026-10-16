import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, isAnswerCorrect, loadState, normalizeWords, recordMistake, recordReview, getDueReviews, restoreEnergy, saveState, shuffleWords, getPlayerLevel, awardLessonCompletion, purchaseLife, MAX_ENERGY, ENERGY_RECHARGE_MS, REVIEW_INTERVALS_MS, STORAGE_KEY, LIFE_REFILL_COST } from '../js/game-logic.js';

test('normaliza espaços e pontuação sem mudar a ordem', () => {
  assert.equal(normalizeWords([' Hello ', 'world', '!']), 'hello world!');
  assert.equal(isAnswerCorrect(['Good', 'morning'], ['Good', 'morning']), true);
  assert.equal(isAnswerCorrect(['morning', 'Good'], ['Good', 'morning']), false);
});

test('embaralha sem perder ou duplicar palavras', () => {
  const source = ['I', 'like', 'coffee'];
  const result = shuffleWords(source, () => 0.1);
  assert.deepEqual([...result].sort(), [...source].sort());
  assert.notDeepEqual(result, source);
  assert.deepEqual(source, ['I', 'like', 'coffee'], 'não deve mutar a entrada');
});

test('estado inicial tem cinco pontos de energia e zero recompensas', () => {
  const state = createInitialState(1234);
  assert.equal(state.energy, MAX_ENERGY);
  assert.equal(state.xp, 0);
  assert.equal(state.coins, 0);
  assert.equal(state.energyUpdatedAt, 1234);
  assert.deepEqual(state.mistakes, {});
});

test('energia recarrega um ponto por intervalo e nunca excede o máximo', () => {
  const state = { ...createInitialState(0), energy: 2, energyUpdatedAt: 0 };
  assert.equal(restoreEnergy(state, ENERGY_RECHARGE_MS - 1).energy, 2);
  assert.equal(restoreEnergy(state, ENERGY_RECHARGE_MS).energy, 3);
  assert.equal(restoreEnergy(state, ENERGY_RECHARGE_MS * 10).energy, MAX_ENERGY);
});

test('XP calcula nível e progresso para a próxima meta', () => {
  assert.deepEqual(getPlayerLevel(0), { level: 1, progressXp: 0, xpForNextLevel: 100, remainingXp: 100 });
  assert.deepEqual(getPlayerLevel(99), { level: 1, progressXp: 99, xpForNextLevel: 100, remainingXp: 1 });
  assert.deepEqual(getPlayerLevel(100), { level: 2, progressXp: 0, xpForNextLevel: 100, remainingXp: 100 });
});

test('conclusão de lição dá XP, moedas e bônus único ao subir de nível', () => {
  const initial = { ...createInitialState(0), xp: 90, coins: 2 };
  const earned = awardLessonCompletion(initial, 'en1');
  assert.equal(earned.reward.xp, 10);
  assert.equal(earned.reward.coins, 20);
  assert.equal(earned.reward.bonusCoins, 15);
  assert.equal(earned.reward.leveledUp, true);
  assert.equal(earned.state.xp, 100);
  assert.equal(earned.state.coins, 22);
  assert.equal(earned.state.highestRewardedLevel, 2);
  assert.equal(awardLessonCompletion(earned.state, 'en1').state, earned.state, 'repetir uma lição não deve gerar recompensa duplicada');
});

test('loja troca moedas por uma vida e preserva o limite de energia', () => {
  const broke = { ...createInitialState(0), energy: 0, coins: LIFE_REFILL_COST - 1, energyUpdatedAt: 1000 };
  assert.equal(purchaseLife(broke, 2000).reason, 'coins');
  const ready = { ...broke, coins: LIFE_REFILL_COST };
  const purchase = purchaseLife(ready, 2000);
  assert.equal(purchase.ok, true);
  assert.equal(purchase.state.coins, 0);
  assert.equal(purchase.state.energy, 1);
  assert.equal(purchase.state.energyUpdatedAt, 2000);
  assert.equal(purchaseLife({ ...createInitialState(0), energy: MAX_ENERGY }, 0).reason, 'full');
});

test('salva e restaura progresso com validação defensiva', () => {
  const map = new Map();
  const storage = { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) };
  const state = { ...createInitialState(1000), xp: 50, coins: 25, energy: 3, language: 'ru', currentLesson: 4, completed: { ru1: true }, reviewHistory: { en1: { count: 2 } } };
  assert.equal(saveState(storage, state), true);
  assert.equal(map.has(STORAGE_KEY), true);
  const restored = loadState(storage, 1000);
  assert.equal(restored.xp, 50); assert.equal(restored.coins, 25); assert.equal(restored.energy, 3); assert.equal(restored.language, 'ru');
  assert.equal(restored.currentLesson, 4); assert.equal(restored.completed.ru1, true); assert.equal(restored.reviewHistory.en1.count, 2);
  map.set(STORAGE_KEY, '{not json');
  assert.equal(loadState(storage, 1000).xp, 0);
});

test('registra erros e agenda a primeira revisão espaçada sem mutar estado anterior', () => {
  const now = 10_000;
  const state = createInitialState(now);
  const first = recordMistake(state, 'en1', ['I', 'like', 'coffee'], ['coffee', 'I', 'like'], now);
  const second = recordMistake(first, 'en1', ['I', 'like', 'coffee'], ['I', 'coffee', 'like'], now + 100);
  assert.equal(second.mistakes.en1.count, 2);
  assert.deepEqual(second.mistakes.en1.expected, ['I', 'like', 'coffee']);
  assert.deepEqual(state.mistakes, {});
  assert.equal(first.mistakes.en1.dueAt, now + REVIEW_INTERVALS_MS[0]);
  assert.equal(second.mistakes.en1.dueAt, now + 100 + REVIEW_INTERVALS_MS[1]);
});

test('retorna apenas revisões vencidas em ordem de vencimento', () => {
  let state = createInitialState(0);
  state = recordMistake(state, 'en1', ['I', 'like'], ['like', 'I'], 1000);
  state = recordMistake(state, 'es1', ['Me', 'gusta'], ['gusta', 'Me'], 2000);
  assert.deepEqual(getDueReviews(state, 1000).map(item => item.phraseId), []);
  assert.deepEqual(getDueReviews(state, 61_500).map(item => item.phraseId), ['en1']);
  assert.deepEqual(getDueReviews(state, 62_000).map(item => item.phraseId), ['en1', 'es1']);
  assert.deepEqual(getDueReviews(state, 700_000).map(item => item.phraseId), ['en1', 'es1']);
});

test('revisar uma expressão registra histórico e agenda o próximo intervalo', () => {
  let state = createInitialState(0);
  state = recordMistake(state, 'fr1', ['Bonjour'], ['Bonsoir'], 1000);
  const reviewedAt = state.mistakes.fr1.dueAt + 10;
  const reviewed = recordReview(state, 'fr1', reviewedAt);
  assert.equal(reviewed.mistakes.fr1.reviewCount, 1);
  assert.equal(reviewed.mistakes.fr1.lastReviewedAt, reviewedAt);
  assert.equal(reviewed.mistakes.fr1.dueAt, reviewedAt + REVIEW_INTERVALS_MS[2]);
  assert.equal(reviewed.reviewHistory.fr1.count, 1);
  assert.equal(state.reviewHistory.fr1, undefined, 'não deve mutar o estado anterior');
});
