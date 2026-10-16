import { LANGUAGES, PHRASES } from './phrases.js';
import { MAX_ENERGY, ENERGY_RECHARGE_MS, LIFE_REFILL_COST, createInitialState, loadState, saveState, shuffleWords, isAnswerCorrect, recordMistake, getDueReviews, recordReview, getPlayerLevel, awardLessonCompletion, purchaseLife, rewardLifeForAd, restoreEnergy } from './game-logic.js';
import { createGoogleRewardedAds } from './rewarded-ads.js';
import { speak } from './speech.js';

const $ = id => document.getElementById(id);
const rewardedAds = createGoogleRewardedAds(window.LingoPulseAdsConfig);
const storage = (() => { try { return window.localStorage; } catch { return null; } })();
let state = loadState(storage);
let phraseIndex = Math.max(0, Math.min(Number(state.currentLesson) || 0, (PHRASES[state.language] || PHRASES.en).length - 1));
let selected = [];
let bank = [];
let locked = false;
let stage = 'learn';
let sessionXP = 0;
let sessionCoins = 0;
let practicePassed = false;
let practiceAdvanceTimer = null;
let practiceHintVisible = false;
let lastPuzzleCorrect = false;
let lastSelectedAnswer = [];
let reviewQueue = [];
let reviewQueueIndex = 0;
let rewardedAdInProgress = false;

const WORD_MEANINGS = {
  en: { I: 'eu', like: 'gosto', coffee: 'café', Good: 'bom/boa', morning: 'manhã', Where: 'onde', is: 'é/está', the: 'o/a', station: 'estação', need: 'preciso', help: 'ajuda', Thank: 'agradecer', you: 'você', very: 'muito', much: 'muito', bill: 'conta', please: 'por favor', am: 'estou', learning: 'aprendendo', How: 'quanto/como', does: 'auxiliar da pergunta', it: 'isso', cost: 'custar', Nice: 'prazer/agradável', to: 'a/para', meet: 'conhecer', See: 'ver/até', tomorrow: 'amanhã' },
  es: { Me: 'a mim/me', gusta: 'agrada/gosto', el: 'o', café: 'café', Buenos: 'bons', días: 'dias', '¿Dónde': 'onde', está: 'está', la: 'a', Necesito: 'preciso', ayuda: 'ajuda', Muchas: 'muitas', gracias: 'obrigado(a)', cuenta: 'conta', por: 'por', favor: 'favor', Estoy: 'estou', aprendiendo: 'aprendendo', '¿Cuánto': 'quanto', cuesta: 'custa', Mucho: 'muito', gusto: 'prazer', '¡Hasta': 'até', mañana: 'amanhã' },
  fr: { 'J’aime': 'eu gosto', le: 'o', café: 'café', Bonjour: 'bom dia/olá', Où: 'onde', est: 'é/está', la: 'a', gare: 'estação', 'J’ai': 'eu tenho', besoin: 'necessidade', 'd’aide': 'de ajuda', Merci: 'obrigado(a)', beaucoup: 'muito', 'L’addition': 'a conta', 's’il': 'se', vous: 'você/o senhor', plaît: 'agrada', 'J’apprends': 'estou aprendendo', Combien: 'quanto', ça: 'isso', coûte: 'custa', Enchanté: 'prazer', de: 'de', rencontrer: 'conhecer', À: 'até', demain: 'amanhã' },
  ja: { 'コーヒー': 'café', 'が': 'partícula que marca o sujeito/tema do gostar', '好き': 'gostar', 'です': 'é/forma educada', 'おはよう': 'bom dia (informal)', 'ございます': 'forma respeitosa', '駅': 'estação', 'は': 'partícula de tópico', 'どこ': 'onde', 'ですか': 'forma de pergunta educada', '助け': 'ajuda', '必要': 'necessário', 'どうも': 'muito/obrigado', 'ありがとう': 'obrigado(a)', 'お会計': 'a conta', 'お願いします': 'por favor', '勉強': 'estudo', 'して': 'fazendo', 'います': 'estar (ação em andamento)', 'いくら': 'quanto', 'はじめまして': 'prazer em conhecer', 'また': 'até/outra vez', '明日': 'amanhã' },
  ru: { 'Мне': 'a mim; em russo, é a forma usada com “нравится”', 'нравится': 'agrada', 'кофе.': 'café', 'Доброе': 'bom (forma neutra)', 'утро!': 'manhã', 'Где': 'onde', 'находится': 'fica/localiza-se', 'вокзал?': 'estação ferroviária', 'нужна': 'é necessária (forma feminina)', 'помощь.': 'ajuda', 'Большое': 'grande/muito', 'спасибо!': 'obrigado(a)', 'Счёт,': 'conta', 'пожалуйста.': 'por favor', 'Я': 'eu', 'учусь.': 'estudo/aprendo', 'Сколько': 'quanto', 'это': 'isto', 'стоит?': 'custa?', 'Приятно': 'agradável', 'познакомиться!': 'conhecer alguém', 'До': 'até', 'завтра!': 'amanhã' }
};

const LEVEL_TITLES = ['Aprendiz', 'Explorador', 'Viajante', 'Poliglota', 'Mestre'];

const COUNTRY_THEMES = {
  en: { country: 'Reino Unido', caption: 'Londres · ruas históricas e vida urbana', motif: '🏙️', color: '#101d31' },
  es: { country: 'Espanha', caption: 'Madri · sol, praças e azulejos', motif: '☀️', color: '#f2e5d1' },
  fr: { country: 'França', caption: 'Paris · arte e grandes avenidas', motif: '🗼', color: '#e7edf4' },
  ja: { country: 'Japão', caption: 'Tóquio · lanternas, flores e ondas', motif: '🌸', color: '#f3e9e2' },
  ru: { country: 'Rússia', caption: 'Moscou · cúpulas coloridas e inverno', motif: '🏰', color: '#dfe9f3' }
};

function currentPhrases() { return PHRASES[state.language] || PHRASES.en; }
function currentPhrase() { return currentPhrases()[phraseIndex]; }
function targetText(phrase = currentPhrase()) { return phrase.answer.join(state.language === 'ja' ? '' : ' '); }
function applyLanguageTheme() {
  const language = LANGUAGES[state.language] ? state.language : 'en';
  const theme = COUNTRY_THEMES[language];
  document.documentElement.dataset.languageTheme = language;
  $('country-name').textContent = theme.country;
  $('country-caption').textContent = theme.caption;
  $('country-motif').textContent = theme.motif;
  $('country-flag').textContent = LANGUAGES[language].flag;
  $('country-banner').setAttribute('aria-label', `Tema cultural: ${theme.country}. ${theme.caption}`);
  document.querySelector('meta[name="theme-color"]').content = theme.color;
}
function persist() { state.currentLesson = Math.max(0, Math.min(phraseIndex, currentPhrases().length - 1)); saveState(storage, state); renderStats(); renderReviewCount(); }
function renderStats() {
  const progress = getPlayerLevel(state.xp);
  $('xp-value').textContent = `${state.xp} XP`;
  $('coins-value').textContent = state.coins;
  $('energy-value').textContent = `${state.energy}/${MAX_ENERGY} vidas`;
  $('level-value').textContent = progress.level;
  $('xp-progress-fill').style.width = `${progress.progressXp}%`;
  document.querySelector('.xp-track').setAttribute('aria-valuenow', String(progress.progressXp));
  $('level-dialog-number').textContent = progress.level;
  $('level-title').textContent = LEVEL_TITLES[Math.min(progress.level - 1, LEVEL_TITLES.length - 1)];
  $('level-dialog-summary').textContent = progress.level >= LEVEL_TITLES.length
    ? 'Você alcançou o nível máximo de título. Continue aprendendo para acumular XP e moedas.'
    : `Faltam ${progress.remainingXp} XP para chegar ao nível ${progress.level + 1}.`;
  $('level-dialog-progress').style.width = `${progress.progressXp}%`;
  $('level-dialog-progress').parentElement.setAttribute('aria-valuenow', String(progress.progressXp));
  $('level-dialog-xp').textContent = `${progress.progressXp} de ${progress.xpForNextLevel} XP para o próximo nível`;
  const energyUpdatedAt = Number(state.energyUpdatedAt);
  const energyElapsed = Number.isFinite(energyUpdatedAt) ? Math.max(0, Date.now() - energyUpdatedAt) : 0;
  const msUntilLife = state.energy >= MAX_ENERGY ? 0 : Math.max(0, ENERGY_RECHARGE_MS - energyElapsed);
  $('lives-timer').hidden = state.energy >= MAX_ENERGY;
  $('lives-timer').textContent = msUntilLife ? `+1 em ${formatCountdown(msUntilLife)}` : 'Vida disponível';
  $('lives-open-button').setAttribute('aria-label', `${state.energy} de ${MAX_ENERGY} vidas. Abrir loja para recuperar uma vida por ${LIFE_REFILL_COST} moedas.`);
  $('shop-balance').textContent = `Seu saldo: ${state.coins} LingoCoins`;
  $('life-refill-cost').textContent = LIFE_REFILL_COST;
  $('buy-life-button').disabled = state.energy >= MAX_ENERGY || state.coins < LIFE_REFILL_COST;
  const adButton = $('watch-ad-button');
  const adProviderReady = rewardedAds.isReady();
  adButton.disabled = state.energy >= MAX_ENERGY || !adProviderReady || rewardedAdInProgress;
  adButton.textContent = rewardedAdInProgress ? 'Carregando…' : rewardedAds.isConfigured() ? 'Assistir anúncio' : 'Em breve';
  adButton.setAttribute('aria-label', state.energy >= MAX_ENERGY
    ? 'Você já tem todas as vidas'
    : rewardedAds.isConfigured() ? 'Assistir anúncio recompensado para ganhar uma vida' : 'Anúncio indisponível até configurar o caminho da unidade do Google Ad Manager');
}
function formatCountdown(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
function openDialog(id) { const dialog = $(id); if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', ''); }
function closeDialog(id) { const dialog = $(id); if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); }
function openShop() { $('shop-feedback').hidden = true; renderStats(); openDialog('shop-dialog'); }
function buyLife() {
  const purchase = purchaseLife(state, Date.now());
  state = purchase.state;
  persist();
  const feedback = $('shop-feedback');
  if (!purchase.ok) {
    const message = purchase.reason === 'full'
      ? 'Você já está com todas as vidas. Guarde suas moedas para quando precisar.'
      : `Você precisa de ${LIFE_REFILL_COST} moedas para recuperar uma vida. Complete novas lições para ganhar mais.`;
    feedback.textContent = message;
    feedback.className = 'feedback bad';
    feedback.hidden = false;
    renderBank();
    return;
  }
  feedback.textContent = 'Vida recuperada! Boa prática.';
  feedback.className = 'feedback good';
  feedback.hidden = false;
  if (stage === 'puzzle') {
    $('check-button').disabled = false;
    $('check-button').textContent = 'Conferir resposta →';
    renderBank();
  }
}
async function watchAdForLife() {
  if (rewardedAdInProgress || state.energy >= MAX_ENERGY) return;
  if (!rewardedAds.isConfigured()) {
    $('shop-feedback').textContent = 'Configure a unidade de anúncios do Google Ad Manager para ativar esta opção.';
    $('shop-feedback').className = 'feedback bad';
    $('shop-feedback').hidden = false;
    return;
  }

  rewardedAdInProgress = true;
  renderStats();
  const feedback = $('shop-feedback');
  let rewardApplied = false;
  const grantLife = () => {
    if (rewardApplied) return;
    rewardApplied = true;
    const reward = rewardLifeForAd(state, Date.now());
    state = reward.state;
    persist();
    feedback.textContent = reward.ok ? 'Anúncio concluído: 1 vida adicionada.' : 'Você já está com todas as vidas.';
    feedback.className = reward.ok ? 'feedback good' : 'feedback bad';
    feedback.hidden = false;
    if (reward.ok && stage === 'puzzle') {
      $('check-button').disabled = false;
      $('check-button').textContent = 'Conferir resposta →';
      renderBank();
    }
  };
  try {
    await rewardedAds.showRewardedAd({ placementId: 'life-refill', onReward: grantLife });
    if (!rewardApplied) {
      state = restoreEnergy(state, Date.now());
      persist();
      feedback.textContent = 'Anúncio não concluído. Nenhuma vida foi adicionada.';
      feedback.className = 'feedback bad';
      feedback.hidden = false;
    }
  } catch {
    if (!rewardApplied) feedback.textContent = 'Não foi possível carregar o anúncio. Nenhuma vida foi adicionada.';
    feedback.className = 'feedback bad';
    feedback.hidden = false;
  } finally {
    rewardedAdInProgress = false;
    renderStats();
  }
}
function renderProgress() {
  const total = currentPhrases().length;
  const done = Math.min(phraseIndex, total);
  $('question-counter').textContent = phraseIndex >= total ? 'TRILHA CONCLUÍDA' : `${stageLabel(stage)} · ${phraseIndex + 1} DE ${total}`;
  $('lesson-number').textContent = `LIÇÃO ${String(Math.min(phraseIndex + 1, total)).padStart(2, '0')}`;
  $('lesson-progress').setAttribute('aria-valuemax', String(total));
  $('lesson-progress').setAttribute('aria-valuenow', String(done));
  $('progress-fill').style.width = `${done / total * 100}%`;
}
function stageLabel(value) { return ({ learn: 'APRENDER', practice: 'PRATICAR', puzzle: 'WORDPUZZLE', review: 'REVISAR', queue: 'REVISÃO', done: 'CONCLUÍDO' })[value] || 'APRENDER'; }
function setStage(next) {
  if (next !== 'practice' && practiceAdvanceTimer !== null) {
    window.clearTimeout(practiceAdvanceTimer);
    practiceAdvanceTimer = null;
  }
  stage = next;
  for (const id of ['learn-stage', 'practice-stage', 'puzzle-stage', 'review-stage', 'review-queue-stage']) $(id).hidden = true;
  const map = { learn: 'learn-stage', practice: 'practice-stage', puzzle: 'puzzle-stage', review: 'review-stage', queue: 'review-queue-stage' };
  if (map[next]) $(map[next]).hidden = false;
  $('lesson-title').textContent = ({ learn: 'Aprenda a expressão', practice: 'Pratique com ajuda', puzzle: 'Monte a expressão', review: 'Fixe o aprendizado', queue: 'Revisão espaçada' })[next] || 'LingoPulse';
  $('lesson-subtitle').textContent = ({ learn: 'Entenda o significado antes de jogar.', practice: 'Experimente sem pressão e use as dicas.', puzzle: 'Agora tente montar a expressão sozinho.', review: 'Veja a resposta, entenda o motivo e prepare-se para avançar.', queue: 'Revise as expressões no momento certo para lembrar por mais tempo.' })[next] || '';
  $('sound-button').hidden = next !== 'learn';
  $('open-reviews-button').hidden = next === 'queue';
  renderProgress();
}
function showFeedback(message, good, target = 'feedback') {
  const feedback = $(target);
  feedback.textContent = message;
  feedback.className = `feedback ${good ? 'good' : 'bad'}`;
  feedback.hidden = false;
}
function speakCurrent(target = 'speech-status') {
  const result = speak(targetText(), LANGUAGES[state.language].locale);
  $(target).textContent = result.ok
    ? `Solicitei a pronúncia em ${LANGUAGES[state.language].label}. Se não ouvir, verifique o volume e as vozes do dispositivo.`
    : `${result.message} Expressão: ${targetText()}. Tradução: ${currentPhrase().prompt}`;
}
function renderLearn() {
  const phrase = currentPhrase();
  $('learn-title').textContent = phrase.prompt;
  $('learn-translation').textContent = targetText(phrase);
  $('learn-emoji').textContent = phrase.emoji;
  $('learn-pronunciation').textContent = state.language === 'ja' ? 'Ouça o ritmo da expressão japonesa e repita devagar.' : 'Ouça a pronúncia e repita em voz alta, se quiser.';
  const vocab = $('vocabulary-list'); vocab.replaceChildren();
  phrase.answer.forEach(word => {
    const item = document.createElement('div'); item.className = 'vocabulary-item';
    const term = document.createElement('strong'); term.textContent = word;
    const meaning = document.createElement('span'); meaning.textContent = WORD_MEANINGS[state.language]?.[word] || 'parte da expressão';
    item.append(term, meaning); vocab.append(item);
  });
  $('learn-example').textContent = `Expressão: “${targetText(phrase)}”. Significado: “${phrase.prompt}”. ${phrase.hint}`;
  $('learn-tip').textContent = `Dica de estudo: ouça a expressão, observe cada parte e tente repetir. ${phrase.hint}`;
  $('speech-status').textContent = 'Você pode ouvir a expressão quantas vezes quiser. O áudio não é obrigatório.';
}
function renderPractice() {
  const phrase = currentPhrase();
  $('practice-prompt').textContent = phrase.prompt;
  $('practice-feedback').hidden = true;
  $('practice-hint-button').textContent = practiceHintVisible ? 'Ocultar dica' : 'Ver dica';
  $('practice-hint-button').setAttribute('aria-expanded', String(practiceHintVisible));
  $('to-puzzle-button').disabled = !practicePassed;
  $('to-puzzle-button').textContent = practicePassed ? 'Continuar para o puzzle →' : 'Responda para continuar';
  const others = currentPhrases().filter(item => item.id !== phrase.id).slice(0, 2).map(item => targetText(item));
  const options = shuffleWords([targetText(phrase), ...others]);
  const root = $('practice-options'); root.replaceChildren();
  options.forEach((option, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'practice-option'; button.textContent = option;
    button.addEventListener('click', () => {
      if (practicePassed) return;
      if (option === targetText(phrase)) {
        practicePassed = true;
        showFeedback(`Isso mesmo! “${option}” significa “${phrase.prompt}”. O puzzle abrirá em instantes; se preferir, toque em “Continuar para o puzzle”.`, true, 'practice-feedback');
        [...root.children].forEach(control => { control.disabled = true; if (control.textContent === option) control.classList.add('correct-option'); });
        $('to-puzzle-button').disabled = false;
        $('to-puzzle-button').textContent = 'Continuar para o puzzle →';
        practiceAdvanceTimer = window.setTimeout(() => {
          practiceAdvanceTimer = null;
          if (stage === 'practice' && practicePassed) startPuzzle();
        }, 2500);
      } else {
        showFeedback(`Ainda não. A expressão procurada significa “${phrase.prompt}”. ${practiceHintVisible ? phrase.hint : 'Use “Ver dica” para receber uma pista.'}`, false, 'practice-feedback');
        button.classList.add('wrong-option');
      }
    });
    button.setAttribute('aria-label', `Opção ${index + 1}: ${option}`); root.append(button);
  });
  if (practiceHintVisible) $('practice-feedback').hidden = false, showFeedback(phrase.hint, true, 'practice-feedback');
}
function makeBank() {
  const phrase = currentPhrase();
  bank = shuffleWords(phrase.answer).map((word, index) => ({ id: `${phrase.id}-${index}-${word}`, word, used: false }));
}
function renderAnswer() {
  const slots = $('answer-slots'); slots.replaceChildren();
  if (!selected.length) {
    const placeholder = document.createElement('span'); placeholder.className = 'hint-text'; placeholder.textContent = 'Sua expressão aparecerá aqui…'; slots.append(placeholder);
  }
  selected.forEach((item, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'word-tile';
    button.textContent = item.word; button.setAttribute('aria-label', `Remover palavra ${item.word}`);
    button.addEventListener('click', () => removeSelected(index));
    button.addEventListener('dragover', event => event.preventDefault());
    button.addEventListener('drop', event => { event.preventDefault(); const id = event.dataTransfer?.getData('text/plain'); moveBankWord(id, index); });
    slots.append(button);
  });
}
function renderBank() {
  const root = $('word-bank'); root.replaceChildren();
  bank.forEach(item => {
    const button = document.createElement('button'); button.type = 'button'; button.className = `word-tile${item.used ? ' used' : ''}`;
    button.textContent = item.word; button.disabled = item.used || locked || state.energy <= 0; button.draggable = !item.used && !locked && state.energy > 0;
    button.setAttribute('aria-label', item.used ? `${item.word}, já selecionada` : `Adicionar palavra ${item.word}`);
    button.addEventListener('click', () => addWord(item.id));
    button.addEventListener('dragstart', event => { event.dataTransfer?.setData('text/plain', item.id); if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'; });
    root.append(button);
  });
}
function renderPuzzle() {
  const phrase = currentPhrase();
  $('prompt-text').textContent = phrase.prompt;
  $('hint-text').textContent = phrase.hint;
  $('prompt-emoji').textContent = phrase.emoji;
  $('feedback').hidden = true; $('feedback').textContent = ''; $('feedback').className = 'feedback';
  $('check-button').hidden = false; $('check-button').disabled = false; $('check-button').textContent = 'Conferir resposta →';
  locked = false; selected = []; makeBank(); renderAnswer(); renderBank();
}
function addWord(id) {
  if (locked) return;
  const item = bank.find(entry => entry.id === id && !entry.used);
  if (!item) return;
  item.used = true; selected.push(item); renderAnswer(); renderBank();
}
function removeSelected(index) {
  if (locked) return;
  const [item] = selected.splice(index, 1); if (!item) return;
  const bankItem = bank.find(entry => entry.id === item.id); if (bankItem) bankItem.used = false;
  renderAnswer(); renderBank();
}
function moveBankWord(id, targetIndex) {
  if (locked) return;
  const item = bank.find(entry => entry.id === id && !entry.used); if (!item) return;
  item.used = true; selected.splice(Math.max(0, Math.min(targetIndex, selected.length)), 0, item);
  renderAnswer(); renderBank();
}
function checkAnswer() {
  if (locked) return;
  if (!selected.length) { showFeedback('Escolha as palavras para montar a expressão antes de conferir.', false); return; }
  const answerWords = selected.map(item => item.word);
  lastSelectedAnswer = [...answerWords];
  if (isAnswerCorrect(answerWords, currentPhrase().answer)) {
    locked = true; lastPuzzleCorrect = true;
    const completion = awardLessonCompletion(state, currentPhrase().id);
    state = { ...completion.state, lastPlayedDate: new Date().toISOString().slice(0, 10) };
    sessionXP += completion.reward.xp; sessionCoins += completion.reward.coins;
    const rewardText = completion.reward.xp
      ? `+${completion.reward.xp} XP e +${completion.reward.coins} LingoCoins${completion.reward.leveledUp ? `, incluindo bônus por alcançar o nível ${completion.reward.level}` : ''}.`
      : 'Você já concluiu esta expressão antes, então não há recompensa duplicada.';
    persist(); showFeedback(`Correto! Você aplicou o que aprendeu. ${rewardText}`, true);
    $('check-button').hidden = true; renderBank();
    window.setTimeout(showReviewStage, 650);
  } else {
    lastPuzzleCorrect = false;
    state.energy = Math.max(0, state.energy - 1); state.energyUpdatedAt = Date.now();
    state = recordMistake(state, currentPhrase().id, currentPhrase().answer, answerWords, Date.now());
    persist();
    const correct = targetText();
    showFeedback(`Ainda não. Sua resposta foi “${answerWords.join(' ')}”. A expressão correta é “${correct}”. ${currentPhrase().hint} Você pode corrigir e tentar novamente; cada tentativa incorreta no desafio consome 1 energia.`, false);
    if (state.energy <= 0) {
      $('check-button').textContent = 'Sem energia'; $('check-button').disabled = true;
      $('feedback').textContent += ' Você pode revisar a explicação e continuar aprendendo sem energia; o puzzle ficará bloqueado até a recarga.';
    }
  }
}
function showReviewStage() {
  const phrase = currentPhrase();
  const mistakeRecord = state.mistakes[phrase.id];
  $('review-result').textContent = mistakeRecord ? 'Você encontrou uma dificuldade nesta expressão. Veja a resposta e a explicação; ela voltará para revisão espaçada.' : 'Muito bem! Você montou a expressão corretamente.';
  $('review-correct').textContent = targetText(phrase);
  $('review-meaning').textContent = `Significado: ${phrase.prompt}`;
  $('review-explanation').textContent = `${phrase.hint} Revise as partes: ${phrase.answer.map(word => `${word} (${WORD_MEANINGS[state.language]?.[word] || 'parte da expressão'})`).join(' · ')}.`;
  $('review-your-answer').textContent = mistakeRecord?.lastAnswer?.length ? `Última tentativa incorreta: ${mistakeRecord.lastAnswer.join(' ')}` : (lastSelectedAnswer.length ? `Sua resposta: ${lastSelectedAnswer.join(' ')}` : 'Você concluiu a prática guiada.');
  const mistake = state.mistakes[phrase.id];
  $('review-schedule').textContent = mistake ? `Esta expressão foi adicionada à revisão espaçada. Próxima revisão prevista: ${new Date(mistake.dueAt).toLocaleString()}.` : 'Continue praticando. Se uma expressão ficar difícil, ela será adicionada à revisão espaçada.';
  $('next-lesson-button').textContent = phraseIndex + 1 >= currentPhrases().length ? 'Concluir trilha →' : 'Próxima lição →';
  setStage('review');
}
function startLesson(resetSession = false) {
  if (resetSession) { phraseIndex = 0; sessionXP = 0; sessionCoins = 0; }
  practicePassed = false; practiceHintVisible = false; locked = false; selected = []; bank = [];
  renderLearn(); setStage('learn'); persist();
}
function startPuzzle() { renderPuzzle(); setStage('puzzle'); if (state.energy <= 0) { $('check-button').disabled = true; $('check-button').textContent = 'Sem energia'; showFeedback('Sua energia acabou. Você ainda pode voltar à explicação e estudar; o desafio será liberado quando a energia recarregar.', false); } }
function nextLesson() {
  phraseIndex++;
  if (phraseIndex >= currentPhrases().length) { finishLesson(); return; }
  practicePassed = false; practiceHintVisible = false; lastSelectedAnswer = []; lastPuzzleCorrect = false;
  persist(); renderLearn(); setStage('learn');
}
function finishLesson() {
  $('progress-fill').style.width = '100%'; $('lesson-progress').setAttribute('aria-valuenow', String(currentPhrases().length));
  $('question-counter').textContent = 'TRILHA CONCLUÍDA';
  $('result-summary').textContent = `Você concluiu ${currentPhrases().length} lições de ${LANGUAGES[state.language].label}. As expressões difíceis ficam disponíveis para revisão espaçada.`;
  $('result-xp').textContent = `+${sessionXP} XP`; $('result-coins').textContent = `+${sessionCoins} moedas`;
  const dialog = $('result-dialog'); if (typeof dialog.showModal === 'function') dialog.showModal(); else window.alert('Trilha concluída!');
}
function renderReviewCount() {
  const count = getDueReviews(state).length;
  $('pending-review-count').textContent = String(count);
  $('open-reviews-button').disabled = count === 0;
  $('open-reviews-button').setAttribute('aria-label', `${count} expressões pendentes para revisão`);
}
function openReviewQueue() {
  reviewQueue = getDueReviews(state);
  reviewQueueIndex = 0;
  const root = $('review-queue-list'); root.replaceChildren();
  $('review-queue-description').textContent = reviewQueue.length ? `${reviewQueue.length} expressão(ões) chegou(aram) ao momento de revisar.` : 'Nenhuma revisão está pendente agora. As expressões difíceis aparecerão aqui no horário programado.';
  if (!reviewQueue.length) {
    const p = document.createElement('p'); p.className = 'status-message'; p.textContent = 'Você pode continuar a trilha enquanto a memória consolida o que aprendeu.'; root.append(p);
  } else {
    reviewQueue.forEach(item => {
      const phrase = Object.values(PHRASES).flat().find(entry => entry.id === item.phraseId);
      if (!phrase) return;
      const card = document.createElement('article'); card.className = 'review-queue-item';
      const title = document.createElement('h3'); title.textContent = phrase.prompt;
      const answer = document.createElement('p'); answer.textContent = phrase.answer.join(' ');
      const detail = document.createElement('p'); detail.className = 'hint-text'; detail.textContent = `Você errou esta expressão ${item.count} vez(es).`;
      const button = document.createElement('button'); button.type = 'button'; button.className = 'secondary-button'; button.textContent = 'Marcar como revisada';
      button.addEventListener('click', () => { state = recordReview(state, item.phraseId); persist(); card.remove(); $('review-queue-description').textContent = 'Revisão salva. O sistema vai agendar uma próxima revisão mais adiante.'; if (!$('review-queue-list').children.length) { const empty = document.createElement('p'); empty.className = 'status-message'; empty.textContent = 'Tudo revisado por agora. Bom trabalho!'; $('review-queue-list').append(empty); } });
      card.append(title, answer, detail, button); root.append(card);
    });
  }
  setStage('queue');
}

$('to-practice-button').addEventListener('click', () => { practicePassed = false; practiceHintVisible = false; renderPractice(); setStage('practice'); });
$('practice-hint-button').addEventListener('click', () => { practiceHintVisible = !practiceHintVisible; renderPractice(); });
$('to-puzzle-button').addEventListener('click', startPuzzle);
$('check-button').addEventListener('click', checkAnswer);
$('clear-button').addEventListener('click', () => { if (!locked) { selected.forEach(item => { const found = bank.find(entry => entry.id === item.id); if (found) found.used = false; }); selected = []; renderAnswer(); renderBank(); } });
$('retry-learning-button').addEventListener('click', () => { renderLearn(); setStage('learn'); });
$('next-lesson-button').addEventListener('click', nextLesson);
$('sound-button').addEventListener('click', () => speakCurrent('speech-status'));
$('repeat-speech-button').addEventListener('click', () => speakCurrent('speech-status'));
$('review-speak-button').addEventListener('click', () => speakCurrent('review-speech-status'));
$('open-reviews-button').addEventListener('click', openReviewQueue);
$('level-open-button').addEventListener('click', () => { renderStats(); openDialog('level-dialog'); });
$('shop-open-button').addEventListener('click', openShop);
$('lives-open-button').addEventListener('click', openShop);
$('buy-life-button').addEventListener('click', buyLife);
$('watch-ad-button').addEventListener('click', watchAdForLife);
document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => closeDialog(button.dataset.closeDialog)));
$('back-to-learning-button').addEventListener('click', () => { renderLearn(); setStage('learn'); });
$('language-select').addEventListener('change', event => { state.language = LANGUAGES[event.target.value] ? event.target.value : 'en'; applyLanguageTheme(); phraseIndex = 0; persist(); startLesson(true); });
$('restart-button').addEventListener('click', () => { $('result-dialog').close(); startLesson(true); });
$('reset-button').addEventListener('click', () => { if (window.confirm('Quer apagar seu XP, moedas, energia e histórico deste navegador?')) { state = createInitialState(); persist(); startLesson(true); } });
$('answer-slots').addEventListener('dragover', event => event.preventDefault());
$('answer-slots').addEventListener('drop', event => { event.preventDefault(); const id = event.dataTransfer?.getData('text/plain'); if (id) addWord(id); });
window.addEventListener('focus', () => { state = loadState(storage); persist(); });
window.setInterval(() => {
  const previousEnergy = state.energy;
  state = restoreEnergy(state, Date.now());
  if (state.energy !== previousEnergy) persist();
  else renderStats();
}, 1000);
$('language-select').value = LANGUAGES[state.language] ? state.language : 'en';
applyLanguageTheme();
renderStats(); renderReviewCount(); renderLearn(); setStage('learn');
