export const MAX_ENERGY = 5;
export const ENERGY_RECHARGE_MS = 30 * 60 * 1000;
export const STORAGE_KEY = 'lingopulse-mvp-v1';
export const REVIEW_INTERVALS_MS = [60 * 1000, 10 * 60 * 1000, 24 * 60 * 60 * 1000, 3 * 24 * 60 * 60 * 1000];

export function normalizeWords(words) {
  return words.map(word => word.trim()).join(' ').replace(/\s+([,.!?;:])/g, '$1').replace(/\s+/g, ' ').trim().toLocaleLowerCase();
}

export function isAnswerCorrect(selectedWords, expectedWords) {
  return normalizeWords(selectedWords) === normalizeWords(expectedWords);
}

export function shuffleWords(words, random = Math.random) {
  const shuffled = [...words];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.length > 1 && shuffled.every((word, i) => word === words[i])) [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  return shuffled;
}

export function createInitialState(now = Date.now()) {
  return { version: 1, language: 'en', currentLesson: 0, xp: 0, coins: 0, energy: MAX_ENERGY, energyUpdatedAt: now, streakDays: 0, completed: {}, mistakes: {}, reviewHistory: {}, lastPlayedDate: null };
}

export function restoreEnergy(state, now = Date.now()) {
  const updated = { ...state };
  const rawLast = Number(updated.energyUpdatedAt);
  const last = Number.isFinite(rawLast) ? rawLast : now;
  const elapsed = Math.max(0, now - last);
  const recovered = Math.floor(elapsed / ENERGY_RECHARGE_MS);
  if (recovered > 0) {
    const previous = Math.min(MAX_ENERGY, Math.max(0, Number(updated.energy) || 0));
    updated.energy = Math.min(MAX_ENERGY, previous + recovered);
    updated.energyUpdatedAt = updated.energy >= MAX_ENERGY ? now : last + recovered * ENERGY_RECHARGE_MS;
  }
  return updated;
}

export function loadState(storage, now = Date.now()) {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return createInitialState(now);
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 1) return createInitialState(now);
    const safe = { ...createInitialState(now), ...parsed };
    safe.language = ['en', 'es', 'fr', 'ja', 'ru'].includes(safe.language) ? safe.language : 'en';
    safe.currentLesson = Math.max(0, Math.floor(Number(safe.currentLesson) || 0));
    safe.xp = Math.max(0, Number(safe.xp) || 0);
    safe.coins = Math.max(0, Number(safe.coins) || 0);
    safe.energy = Math.min(MAX_ENERGY, Math.max(0, Number(safe.energy) || 0));
    safe.completed = safe.completed && typeof safe.completed === 'object' ? safe.completed : {};
    safe.mistakes = safe.mistakes && typeof safe.mistakes === 'object' ? safe.mistakes : {};
    safe.reviewHistory = safe.reviewHistory && typeof safe.reviewHistory === 'object' ? safe.reviewHistory : {};
    return restoreEnergy(safe, now);
  } catch {
    return createInitialState(now);
  }
}

export function saveState(storage, state) {
  try { storage?.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
  catch { return false; }
}

export function recordMistake(state, phraseId, expectedWords, selectedWords, now = Date.now()) {
  const mistakes = { ...state.mistakes };
  const previous = mistakes[phraseId] || { count: 0, expected: expectedWords, lastAnswer: [], reviewCount: 0 };
  const count = previous.count + 1;
  const interval = REVIEW_INTERVALS_MS[Math.min(Math.max(count - 1, 0), 1)];
  mistakes[phraseId] = { ...previous, count, expected: [...expectedWords], lastAnswer: [...selectedWords], dueAt: now + interval, lastMistakeAt: now };
  return { ...state, mistakes };
}

export function getDueReviews(state, now = Date.now()) {
  return Object.entries(state.mistakes || {})
    .filter(([, mistake]) => Number(mistake.dueAt) <= now)
    .map(([phraseId, mistake]) => ({ phraseId, ...mistake }))
    .sort((a, b) => Number(a.dueAt) - Number(b.dueAt));
}

export function recordReview(state, phraseId, now = Date.now()) {
  const existing = state.mistakes?.[phraseId];
  if (!existing) return state;
  const reviewCount = (Number(existing.reviewCount) || 0) + 1;
  const interval = REVIEW_INTERVALS_MS[Math.min(reviewCount + 1, REVIEW_INTERVALS_MS.length - 1)];
  return {
    ...state,
    mistakes: { ...state.mistakes, [phraseId]: { ...existing, reviewCount, lastReviewedAt: now, dueAt: now + interval } },
    reviewHistory: { ...(state.reviewHistory || {}), [phraseId]: { count: ((state.reviewHistory || {})[phraseId]?.count || 0) + 1, lastReviewedAt: now } }
  };
}
