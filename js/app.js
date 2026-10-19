import { LANGUAGES, PHRASES, TOPICS } from './phrases.js';
import { MAX_ENERGY, ENERGY_RECHARGE_MS, LIFE_REFILL_COST, createInitialState, loadState, saveState, shuffleWords, isAnswerCorrect, recordMistake, getDueReviews, recordReview, getPlayerLevel, awardLessonCompletion, purchaseLife, rewardLifeForAd, restoreEnergy } from './game-logic.js';
import { createGoogleRewardedAds } from './rewarded-ads.js';
import { speak } from './speech.js';
import { acknowledgeLifeGrant, createCoinCheckout, getPaymentConfig, getPaymentStatus, getPendingLifeGrants, getPurchasedCoinBalance, spendPurchasedCoinsOnLife } from './payments.js';

const $ = id => document.getElementById(id);
const rewardedAds = createGoogleRewardedAds(window.LingoPulseAdsConfig);
const storage = (() => { try { return window.localStorage; } catch { return null; } })();
const COLOR_MODE_STORAGE_KEY = 'lingopulse-color-mode';
function loadColorMode() {
  try {
    const saved = storage?.getItem(COLOR_MODE_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
let colorMode = loadColorMode();
document.documentElement.dataset.colorMode = colorMode;
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
let purchasedCoinBalance = 0;
let paymentsEnabled = false;
let checkoutInProgress = false;
let selectedTopic = 'all';

const WORD_MEANINGS = {
  en: { I: 'eu', like: 'gosto', coffee: 'café', Good: 'bom/boa', morning: 'manhã', Where: 'onde', is: 'é/está', the: 'o/a', station: 'estação', need: 'preciso', help: 'ajuda', Thank: 'agradecer', you: 'você', very: 'muito', much: 'muito', bill: 'conta', please: 'por favor', am: 'estou', learning: 'aprendendo', How: 'quanto/como', does: 'auxiliar da pergunta', it: 'isso', cost: 'custar', Nice: 'prazer/agradável', to: 'a/para', meet: 'conhecer', See: 'ver/até', tomorrow: 'amanhã' },
  es: { Me: 'a mim/me', gusta: 'agrada/gosto', el: 'o', café: 'café', Buenos: 'bons', días: 'dias', '¿Dónde': 'onde', está: 'está', la: 'a', Necesito: 'preciso', ayuda: 'ajuda', Muchas: 'muitas', gracias: 'obrigado(a)', cuenta: 'conta', por: 'por', favor: 'favor', Estoy: 'estou', aprendiendo: 'aprendendo', '¿Cuánto': 'quanto', cuesta: 'custa', Mucho: 'muito', gusto: 'prazer', '¡Hasta': 'até', mañana: 'amanhã' },
  fr: { 'J’aime': 'eu gosto', le: 'o', café: 'café', Bonjour: 'bom dia/olá', Où: 'onde', est: 'é/está', la: 'a', gare: 'estação', 'J’ai': 'eu tenho', besoin: 'necessidade', 'd’aide': 'de ajuda', Merci: 'obrigado(a)', beaucoup: 'muito', 'L’addition': 'a conta', 's’il': 'se', vous: 'você/o senhor', plaît: 'agrada', 'J’apprends': 'estou aprendendo', Combien: 'quanto', ça: 'isso', coûte: 'custa', Enchanté: 'prazer', de: 'de', rencontrer: 'conhecer', À: 'até', demain: 'amanhã' },
  ja: { 'コーヒー': 'café', 'が': 'partícula que marca o sujeito/tema do gostar', '好き': 'gostar', 'です': 'é/forma educada', 'おはよう': 'bom dia (informal)', 'ございます': 'forma respeitosa', '駅': 'estação', 'は': 'partícula de tópico', 'どこ': 'onde', 'ですか': 'forma de pergunta educada', '助け': 'ajuda', '必要': 'necessário', 'どうも': 'muito/obrigado', 'ありがとう': 'obrigado(a)', 'お会計': 'a conta', 'お願いします': 'por favor', '勉強': 'estudo', 'して': 'fazendo', 'います': 'estar (ação em andamento)', 'いくら': 'quanto', 'はじめまして': 'prazer em conhecer', 'また': 'até/outra vez', '明日': 'amanhã' },
  ru: { 'Мне': 'a mim; em russo, é a forma usada com “нравится”', 'нравится': 'agrada', 'кофе.': 'café', 'Доброе': 'bom (forma neutra)', 'утро!': 'manhã', 'Где': 'onde', 'находится': 'fica/localiza-se', 'вокзал?': 'estação ferroviária', 'нужна': 'é necessária (forma feminina)', 'помощь.': 'ajuda', 'Большое': 'grande/muito', 'спасибо!': 'obrigado(a)', 'Счёт,': 'conta', 'пожалуйста.': 'por favor', 'Я': 'eu', 'учусь.': 'estudo/aprendo', 'Сколько': 'quanto', 'это': 'isto', 'стоит?': 'custa?', 'Приятно': 'agradável', 'познакомиться!': 'conhecer alguém', 'До': 'até', 'завтра!': 'amanhã' }
};

Object.assign(WORD_MEANINGS.en, {
  ticket: 'passagem', airport: 'aeroporto', city: 'cidade', center: 'centro', reservation: 'reserva', subway: 'metrô',
  table: 'mesa', two: 'duas pessoas', menu: 'cardápio', food: 'comida', delicious: 'delicioso(a)', vegetarian: 'vegetariano(a)',
  option: 'opção', pay: 'pagar', card: 'cartão', looking: 'olhando', speak: 'falar', slowly: 'devagar', repeat: 'repetir',
  understand: 'entender', word: 'palavra', meeting: 'reunião', ten: 'dez', finish: 'terminar', assignment: 'tarefa',
  doctor: 'médico(a)', feel: 'sentir', well: 'bem', restroom: 'banheiro', time: 'hora'
});
Object.assign(WORD_MEANINGS.es, {
  billete: 'passagem', aeropuerto: 'aeroporto', centro: 'centro', ciudad: 'cidade', reserva: 'reserva', estación: 'estação',
  metro: 'metrô', mesa: 'mesa', personas: 'pessoas', carta: 'cardápio', comida: 'comida', deliciosa: 'deliciosa',
  vegetariana: 'vegetariana', pagar: 'pagar', tarjeta: 'cartão', mirando: 'olhando', despacio: 'devagar', palabra: 'palavra',
  reunión: 'reunião', tarea: 'tarefa', médico: 'médico', baño: 'banheiro', hora: 'hora'
});
Object.assign(WORD_MEANINGS.fr, {
  billet: 'passagem', aéroport: 'aeroporto', 'centre-ville': 'centro da cidade', réservation: 'reserva', station: 'estação',
  métro: 'metrô', table: 'mesa', deux: 'duas pessoas', carte: 'cardápio', repas: 'refeição', délicieux: 'delicioso',
  végétarienne: 'vegetariana', payer: 'pagar', 'celui-ci': 'este aqui', regarde: 'olhando', lentement: 'devagar',
  répéter: 'repetir', comprends: 'entendo', mot: 'palavra', réunion: 'reunião', devoir: 'tarefa', médecin: 'médico',
  toilettes: 'banheiro', heure: 'hora'
});
Object.assign(WORD_MEANINGS.ja, {
  '空港': 'aeroporto', '切符': 'passagem', '中心街': 'centro da cidade', '予約': 'reserva', '地下鉄': 'metrô', '二人': 'duas pessoas',
  'テーブル': 'mesa', 'メニュー': 'cardápio', '料理': 'comida/prato', 'おいしい': 'saboroso', 'ベジタリアン': 'vegetariano(a)',
  'カード': 'cartão', '見ている': 'olhando', 'ゆっくり': 'devagar', '言葉': 'palavra', '十時': 'dez horas', '会議': 'reunião',
  '課題': 'tarefa', '医者': 'médico(a)', '気分': 'estado de espírito', 'トイレ': 'banheiro', '何時': 'que horas'
});
Object.assign(WORD_MEANINGS.ru, {
  'билет': 'passagem', 'аэропорта': 'aeroporto', 'центра': 'centro', 'бронь': 'reserva', 'станция': 'estação', 'метро': 'metrô',
  'Столик': 'mesa', 'двоих': 'duas pessoas', 'посмотреть': 'ver', 'меню': 'cardápio', 'Еда': 'comida', 'вкусная': 'saborosa',
  'вегетарианские': 'vegetarianos', 'блюда': 'pratos', 'оплатить': 'pagar', 'картой': 'com cartão', 'смотрю': 'olhando',
  'говорить': 'falar', 'помедленнее': 'mais devagar', 'Повторите': 'repita', 'понимаю': 'entendo', 'слово': 'palavra',
  'встреча': 'reunião', 'десять': 'dez', 'задание': 'tarefa', 'врач': 'médico(a)', 'чувствую': 'sinto', 'туалет': 'banheiro'
});
Object.assign(WORD_MEANINGS.en, {
  address: 'endereço', glass: 'copo', water: 'água', walk: 'ir a pé', photo: 'foto', hot: 'quente', today: 'hoje',
  speak: 'falar', little: 'um pouco', wait: 'esperar', here: 'aqui', confirm: 'confirmar', reservation: 'reserva',
  mean: 'significar', recommend: 'recomendar', accept: 'aceitar', cards: 'cartões', place: 'lugar', rest: 'descansar',
  write: 'escrever', nearby: 'perto', next: 'próxima(o)', week: 'semana'
});
Object.assign(WORD_MEANINGS.es, {
  buscando: 'procurando', dirección: 'endereço', vaso: 'copo', agua: 'água', pie: 'pé', hacer: 'fazer', foto: 'foto',
  Hoy: 'hoje', calor: 'calor', Hablo: 'falo', poco: 'pouco', esperar: 'esperar', aquí: 'aqui', confirmar: 'confirmar',
  recomienda: 'recomenda', Aceptan: 'aceitam', descansar: 'descansar', Escriba: 'escreva', parada: 'ponto de ônibus',
  autobús: 'ônibus', cerca: 'perto', próxima: 'próxima', semana: 'semana'
});
Object.assign(WORD_MEANINGS.fr, {
  cherche: 'procuro', adresse: 'endereço', verre: 'copo', 'd’eau': 'de água', pied: 'pé', photo: 'foto', chaud: 'quente',
  'aujourd’hui': 'hoje', parle: 'falo', attendre: 'esperar', ici: 'aqui', réservation: 'reserva', signifie: 'significa',
  conseillez: 'recomenda', 'Acceptez-vous': 'vocês aceitam', endroit: 'lugar', reposer: 'descansar',
  'L’arrêt': 'o ponto/parada', bus: 'ônibus', près: 'perto', prochaine: 'próxima', semaine: 'semana'
});
Object.assign(WORD_MEANINGS.ja, {
  '住所': 'endereço', '探して': 'procurando', '水': 'água', '一杯': 'um copo', '歩いて': 'a pé', '写真': 'foto',
  '撮って': 'tirar (foto)', '今日': 'hoje', '暑い': 'quente', 'ポルトガル語': 'português', '少し': 'um pouco',
  '話します': 'falo', '待って': 'esperar', '確認': 'confirmação', 'おすすめ': 'recomendação', '使えます': 'pode usar',
  '助けて': 'ajude', '休みたい': 'quero descansar', 'バス停': 'ponto de ônibus', '来週': 'semana que vem',
  '会いましょう': 'vamos nos ver'
});
Object.assign(WORD_MEANINGS.ru, {
  'ищу': 'estou procurando', 'этот': 'este', 'адрес': 'endereço', 'Дайте': 'dê/me dê', 'стакан': 'copo',
  'воды': 'de água', 'дойти': 'chegar a pé', 'пешком': 'a pé', 'здесь': 'aqui', 'сфотографировать': 'fotografar',
  'Сегодня': 'hoje', 'жарко': 'quente', 'говорю': 'falo', 'хочу': 'quero', 'подтвердить': 'confirmar',
  'Что': 'o que', 'такое': 'é/isso', 'посоветуете': 'recomenda', 'ближайший': 'mais próximo',
  'банкомат': 'caixa eletrônico', 'Позовите': 'chame', 'врача': 'médico', 'немного': 'um pouco',
  'отдохнуть': 'descansar', 'ближайшая': 'mais próxima', 'автобусная': 'de ônibus', 'остановка': 'parada',
  'встречи': 'encontro', 'следующей': 'próxima', 'неделе': 'semana'
});

const LEVEL_TITLES = ['Aprendiz', 'Explorador', 'Viajante', 'Poliglota', 'Mestre'];

const COUNTRY_THEMES = {
  en: { country: 'Reino Unido', caption: 'Londres · ruas históricas e vida urbana', motif: '🏙️', color: '#101d31' },
  es: { country: 'Espanha', caption: 'Madri · sol, praças e azulejos', motif: '☀️', color: '#f2e5d1' },
  fr: { country: 'França', caption: 'Paris · arte e grandes avenidas', motif: '🗼', color: '#e7edf4' },
  ja: { country: 'Japão', caption: 'Tóquio · lanternas, flores e ondas', motif: '🌸', color: '#f3e9e2' },
  ru: { country: 'Rússia', caption: 'Moscou · cúpulas coloridas e inverno', motif: '🏰', color: '#dfe9f3' },
  de: { country: 'Alemanha', caption: 'Berlim · história, arte e vida urbana', motif: '🏛️', color: '#f3eddf' },
  it: { country: 'Itália', caption: 'Roma · praças, história e cafés', motif: '🏛️', color: '#edf3eb' },
  zh: { country: 'China', caption: 'Pequim · lanternas e tradição', motif: '🏮', color: '#f8e8df' },
  ko: { country: 'Coreia do Sul', caption: 'Seul · tradição e cultura contemporânea', motif: '🌆', color: '#e8eef6' },
  ar: { country: 'Arábia Saudita', caption: 'Riade · cultura árabe e arquitetura', motif: '🌙', color: '#e6f0e5' }
};

function currentPhrases() {
  const phrases = PHRASES[state.language] || PHRASES.en;
  return selectedTopic === 'all' ? phrases : phrases.filter(phrase => phrase.topic === selectedTopic);
}
function currentPhrase() { return currentPhrases()[phraseIndex]; }
function joinAnswerParts(words, language = state.language) { return words.join(language === 'ja' || language === 'zh' ? '' : ' '); }
function targetText(phrase = currentPhrase(), language = state.language) { return joinAnswerParts(phrase.answer, language); }
function displayTargetText(phrase, language = state.language) { return joinAnswerParts(phrase.answer, language); }
function applyScriptFont(element, language = state.language) {
  const scriptLanguage = LANGUAGES[language]?.locale;
  if (scriptLanguage) element.lang = scriptLanguage;
  element.classList.toggle('script-text', ['ja', 'ru', 'zh', 'ko', 'ar'].includes(language));
  if (language === 'ar') element.dir = 'rtl';
  else element.removeAttribute('dir');
}
function renderTargetPhrase(element, phrase, language = state.language) {
  element.replaceChildren();
  applyScriptFont(element, language);
  const segmented = ['ja', 'ru', 'zh', 'ko', 'ar'].includes(language);
  element.classList.toggle('segmented-phrase', segmented);
  if (!segmented) {
    element.removeAttribute('aria-label');
    element.textContent = targetText(phrase, language);
    return;
  }
  element.setAttribute('aria-label', displayTargetText(phrase, language));
  phrase.answer.forEach(word => {
    const segment = document.createElement('strong');
    segment.className = 'script-word';
    segment.lang = LANGUAGES[language]?.locale || '';
    if (language === 'ar') segment.dir = 'rtl';
    segment.setAttribute('aria-hidden', 'true');
    segment.textContent = word;
    element.append(segment);
  });
}
function wordMeaning(word, language = state.language) {
  const dictionary = WORD_MEANINGS[language] || {};
  const cleanWord = word.replace(/[,.!?;:¿¡]+$/u, '');
  return dictionary[word] || dictionary[cleanWord] || '';
}
function readingText(phrase, language = state.language) {
  if (!phrase.reading) return '';
  if (language === 'ja') return `Romaji · ${phrase.reading} ("oo" ou macron, como ō/ū, indica uma vogal longa).`;
  if (language === 'ru') return `Transliteração · ${phrase.reading}. “zh” soa como o j de “jogo”; os acentos indicam a sílaba forte.`;
  if (language === 'zh') return `Pinyin · ${phrase.reading}. Os sinais sobre as vogais indicam os tons do mandarim.`;
  if (language === 'ko') return `Romanização · ${phrase.reading}. É uma aproximação em letras latinas; o áudio ajuda a ouvir as mudanças de som.`;
  if (language === 'ar') return `Leitura aproximada · ${phrase.reading}. “kh” e “ḥ” representam sons guturais do árabe.`;
  return '';
}
function applyLanguageTheme() {
  const language = LANGUAGES[state.language] ? state.language : 'en';
  const theme = COUNTRY_THEMES[language];
  document.documentElement.dataset.languageTheme = language;
  $('country-name').textContent = theme.country;
  $('country-caption').textContent = theme.caption;
  $('country-motif').textContent = theme.motif;
  $('country-flag').textContent = LANGUAGES[language].flag;
  $('country-banner').setAttribute('aria-label', `Tema cultural: ${theme.country}. ${theme.caption}`);
  syncThemeColor();
}
function syncThemeColor() {
  const theme = COUNTRY_THEMES[state.language] || COUNTRY_THEMES.en;
  document.querySelector('meta[name="theme-color"]').content = colorMode === 'dark' ? '#101820' : theme.color;
}
function applyColorMode() {
  document.documentElement.dataset.colorMode = colorMode;
  $('color-mode-select').value = colorMode;
  syncThemeColor();
}
function persist() {
  const catalog = PHRASES[state.language] || PHRASES.en;
  const catalogIndex = catalog.findIndex(phrase => phrase.id === currentPhrase()?.id);
  state.currentLesson = Math.max(0, catalogIndex);
  const saved = saveState(storage, state);
  renderStats(); renderReviewCount();
  return saved;
}
function renderStats() {
  const progress = getPlayerLevel(state.xp);
  $('xp-value').textContent = `${state.xp} XP`;
  const totalCoins = state.coins + purchasedCoinBalance;
  $('coins-value').textContent = totalCoins;
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
  $('shop-balance').textContent = `Saldo: ${state.coins} moedas de jogo + ${purchasedCoinBalance} moedas compradas`;
  $('life-refill-cost').textContent = LIFE_REFILL_COST;
  $('buy-life-button').disabled = state.energy >= MAX_ENERGY || (state.coins < LIFE_REFILL_COST && purchasedCoinBalance < LIFE_REFILL_COST);
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
function openShop() {
  $('shop-feedback').hidden = true;
  $('coin-pack-feedback').hidden = true;
  document.querySelectorAll('.coin-pack').forEach(card => {
    card.classList.remove('selected');
    card.querySelector('[data-coin-pack]')?.setAttribute('aria-pressed', 'false');
  });
  renderStats();
  openDialog('shop-dialog');
}
async function selectCoinPack(button) {
  if (checkoutInProgress) return;
  const selectedCard = button.closest('.coin-pack');
  document.querySelectorAll('.coin-pack').forEach(card => {
    const selected = card === selectedCard;
    card.classList.toggle('selected', selected);
    card.querySelector('[data-coin-pack]')?.setAttribute('aria-pressed', String(selected));
  });
  const feedback = $('coin-pack-feedback');
  if (!paymentsEnabled) {
    feedback.textContent = 'O checkout ainda não está pronto. Conclua a configuração segura do Mercado Pago e do banco de dados no servidor.';
    feedback.hidden = false;
    return;
  }
  checkoutInProgress = true;
  button.disabled = true;
  feedback.textContent = `Preparando o checkout Mercado Pago para ${button.dataset.packName} (${button.dataset.coins} LingoCoins)…`;
  feedback.hidden = false;
  try {
    const checkout = await createCoinCheckout(button.dataset.packId);
    window.location.assign(checkout.checkoutUrl);
  } catch (error) {
    feedback.textContent = error.message;
    feedback.className = 'payment-notice bad';
    checkoutInProgress = false;
    button.disabled = false;
  }
}
async function buyLife() {
  let purchase = purchaseLife(state, Date.now());
  const feedback = $('shop-feedback');
  if (!purchase.ok && purchase.reason === 'coins' && purchasedCoinBalance >= LIFE_REFILL_COST) {
    $('buy-life-button').disabled = true;
    feedback.textContent = 'Confirmando o uso das LingoCoins compradas…';
    feedback.className = 'feedback';
    feedback.hidden = false;
    try {
      const result = await spendPurchasedCoinsOnLife();
      purchasedCoinBalance = Number(result.purchasedCoins) || 0;
      if (!/^[0-9a-f-]{36}$/i.test(result.lifeGrantId || '')) throw new Error('Compra confirmada; estamos recuperando sua vida. Atualize seu saldo em instantes.');
      const applied = await applyLifeGrant(result.lifeGrantId);
      feedback.textContent = applied
        ? 'Vida recuperada com LingoCoins compradas. Boa prática!'
        : 'As moedas foram debitadas e a vida ficou guardada. Ela será aplicada assim que houver espaço entre suas vidas.';
      feedback.className = applied ? 'feedback good' : 'feedback';
      feedback.hidden = false;
      return;
    } catch (error) {
      try {
        const balance = await getPurchasedCoinBalance();
        purchasedCoinBalance = Number(balance.purchasedCoins) || 0;
      } catch { purchasedCoinBalance = 0; }
      feedback.textContent = error.message;
      feedback.className = 'feedback bad';
      feedback.hidden = false;
      persist();
      return;
    }
  }
  state = purchase.state;
  persist();
  if (!purchase.ok) {
    const message = purchase.reason === 'full'
      ? 'Você já está com todas as vidas. Guarde suas moedas para quando precisar.'
      : `Você precisa de ${LIFE_REFILL_COST} moedas para recuperar uma vida. Complete novas lições ou compre um pacote.`;
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

async function refreshPurchasedCoinBalance() {
  const balance = await getPurchasedCoinBalance();
  purchasedCoinBalance = Math.max(0, Number(balance.purchasedCoins) || 0);
  renderStats();
}

async function applyLifeGrant(grantId) {
  if (!/^[0-9a-f-]{36}$/i.test(grantId || '')) return false;
  const claimed = Array.isArray(state.claimedLifeGrants) ? state.claimedLifeGrants : [];
  if (claimed.includes(grantId)) {
    try { await acknowledgeLifeGrant(grantId); } catch { /* Será confirmado novamente ao abrir o app. */ }
    return true;
  }

  const now = Date.now();
  const restored = restoreEnergy(state, now);
  if (restored.energy >= MAX_ENERGY) {
    state = restored;
    persist();
    return false;
  }

  const previousState = state;
  state = {
    ...restored,
    energy: restored.energy + 1,
    energyUpdatedAt: restored.energy === 0 ? now : restored.energyUpdatedAt,
    claimedLifeGrants: [...claimed, grantId]
  };
  if (!persist()) {
    state = previousState;
    persist();
    return false;
  }

  try { await acknowledgeLifeGrant(grantId); } catch { /* A marca local impede crédito duplicado na próxima tentativa. */ }
  if (stage === 'puzzle') {
    $('check-button').disabled = false;
    $('check-button').textContent = 'Conferir resposta →';
    renderBank();
  }
  return true;
}

async function reconcilePendingLifeGrants() {
  if (!paymentsEnabled) return;
  try {
    const response = await getPendingLifeGrants();
    for (const grant of response.grants || []) {
      const applied = await applyLifeGrant(grant.id);
      if (!applied && restoreEnergy(state, Date.now()).energy >= MAX_ENERGY) break;
    }
  } catch { /* A próxima abertura, uso da loja ou perda de vida tentará novamente. */ }
}

function wait(milliseconds) { return new Promise(resolve => window.setTimeout(resolve, milliseconds)); }

async function handlePaymentReturn() {
  const url = new URL(window.location.href);
  const paymentResult = url.searchParams.get('payment');
  const orderId = url.searchParams.get('order_id');
  if (!paymentResult) return;
  openDialog('shop-dialog');
  const feedback = $('shop-feedback');
  feedback.className = 'feedback';
  feedback.hidden = false;
  if (paymentResult === 'failure') {
    feedback.textContent = 'O pagamento não foi concluído. Nenhuma moeda foi adicionada.';
  } else if (orderId) {
    feedback.textContent = 'Verificando a confirmação do Mercado Pago…';
    let complete = false;
    for (let attempt = 0; attempt < 15; attempt++) {
      try {
        const status = await getPaymentStatus(orderId);
        if (status.status === 'approved') {
          await refreshPurchasedCoinBalance();
          feedback.textContent = `${status.coins} LingoCoins foram adicionadas ao seu saldo.`;
          feedback.className = 'feedback good';
          complete = true;
          break;
        }
        if (status.status === 'refunded' || status.status === 'checkout_error') {
          feedback.textContent = status.status === 'refunded' ? 'Esse pagamento foi estornado.' : 'Não foi possível concluir o checkout.';
          feedback.className = 'feedback bad';
          complete = true;
          break;
        }
      } catch { /* Mantém a consulta até o webhook confirmar ou o prazo terminar. */ }
      if (attempt < 14) await wait(2000);
    }
    if (!complete) feedback.textContent = 'O pagamento ainda está sendo confirmado. O saldo será atualizado quando o Mercado Pago notificar o servidor.';
  } else {
    feedback.textContent = 'O Mercado Pago retornou sem identificar o pedido. Consulte seu saldo novamente em instantes.';
  }
  url.searchParams.delete('payment');
  url.searchParams.delete('order_id');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
}

async function initializePayments() {
  const notice = $('payment-config-notice');
  try {
    const config = await getPaymentConfig();
    paymentsEnabled = config.enabled === true;
    document.querySelectorAll('[data-coin-pack]').forEach(button => {
      const pack = config.packs?.find(item => item.id === button.dataset.packId);
      const price = button.closest('.coin-pack').querySelector('.coin-pack-price');
      if (pack && price) price.textContent = pack.price;
      button.disabled = !paymentsEnabled;
      button.textContent = paymentsEnabled && pack ? `Comprar · ${pack.price}` : 'Configuração pendente';
    });
    notice.textContent = paymentsEnabled
      ? 'Checkout seguro Mercado Pago. As moedas entram no saldo após a confirmação do pagamento.'
      : 'Pacotes definidos. Para habilitar compras, configure Mercado Pago, Supabase e as variáveis seguras na Vercel.';
    if (paymentsEnabled) {
      await refreshPurchasedCoinBalance();
      await reconcilePendingLifeGrants();
    }
  } catch {
    paymentsEnabled = false;
    notice.textContent = 'Não foi possível verificar o serviço de pagamentos. As compras permanecem desativadas.';
  }
  await handlePaymentReturn();
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
  renderTargetPhrase($('learn-translation'), phrase);
  const reading = $('learn-reading');
  reading.textContent = readingText(phrase);
  reading.hidden = !reading.textContent;
  $('learn-emoji').textContent = phrase.emoji;
  $('learn-pronunciation').textContent = state.language === 'ja' ? 'Ouça o ritmo da expressão japonesa e repita devagar.' : 'Ouça a pronúncia e repita em voz alta, se quiser.';
  const vocab = $('vocabulary-list'); vocab.replaceChildren();
  phrase.answer.forEach(word => {
    const meaningText = wordMeaning(word);
    if (!meaningText) return;
    const item = document.createElement('div'); item.className = 'vocabulary-item';
    const term = document.createElement('strong'); term.textContent = word; applyScriptFont(term);
    const meaning = document.createElement('span'); meaning.textContent = meaningText;
    item.append(term, meaning); vocab.append(item);
  });
  $('vocabulary-block').hidden = vocab.children.length === 0;
  const topicContext = {
    greetings: 'Use em uma saudação ou despedida.', food: 'Use ao pedir comida ou bebida em um café ou restaurante.',
    travel: 'Use para pedir informações e se deslocar.', shopping: 'Use em uma loja ou ao perguntar sobre preços.',
    conversation: 'Use para manter uma conversa e se fazer entender.', study: 'Use para falar sobre seu aprendizado ou uma tarefa de estudo.',
    work: 'Use ao conversar sobre compromissos e tarefas de trabalho.', emergency: 'Use para pedir ajuda ou comunicar uma necessidade urgente.',
    wellbeing: 'Use para explicar como você está se sentindo.', daily: 'Use em uma conversa do dia a dia.'
  };
  $('learn-example').textContent = phrase.context || topicContext[phrase.topic] || topicContext.daily;
  $('learn-tip').textContent = phrase.hint;
  $('speech-status').textContent = 'Você pode ouvir a expressão quantas vezes quiser. O áudio não é obrigatório.';
}
function renderPractice() {
  const phrase = currentPhrase();
  $('practice-prompt').textContent = phrase.prompt;
  const readingNotes = {
    ja: 'As opções mostram o romaji junto da escrita japonesa; use o áudio para ouvir o ritmo.',
    ru: 'As opções mostram a leitura em letras latinas; os acentos ajudam a localizar a sílaba forte.',
    zh: 'As opções mostram o pinyin junto dos caracteres; os sinais indicam os tons do mandarim.',
    ko: 'As opções incluem uma romanização aproximada para acompanhar a leitura do hangul.',
    ar: 'As opções incluem uma leitura aproximada em letras latinas para apoiar a escrita árabe.'
  };
  $('practice-reading-note').textContent = readingNotes[state.language] || 'Escolha uma opção. Aqui você pode aprender com as dicas, sem perder energia.';
  $('practice-feedback').hidden = true;
  $('practice-hint-button').textContent = practiceHintVisible ? 'Ocultar dica' : 'Ver dica';
  $('practice-hint-button').setAttribute('aria-expanded', String(practiceHintVisible));
  $('to-puzzle-button').disabled = !practicePassed;
  $('to-puzzle-button').textContent = practicePassed ? 'Continuar para o puzzle →' : 'Responda para continuar';
  const catalog = PHRASES[state.language] || PHRASES.en;
  const sameTopic = catalog.filter(item => item.id !== phrase.id && item.topic === phrase.topic);
  const otherPhrases = catalog.filter(item => item.id !== phrase.id && item.topic !== phrase.topic);
  const distractors = [];
  for (const candidate of [...shuffleWords(sameTopic), ...shuffleWords(otherPhrases)]) {
    if (!distractors.some(item => targetText(item) === targetText(candidate))) distractors.push(candidate);
    if (distractors.length === 2) break;
  }
  const options = shuffleWords([phrase, ...distractors]);
  const root = $('practice-options'); root.replaceChildren();
  options.forEach((optionPhrase, index) => {
    const option = targetText(optionPhrase);
    const button = document.createElement('button'); button.type = 'button'; button.className = 'practice-option'; button.dataset.answer = option;
    const label = document.createElement('span'); label.className = 'practice-option-label'; renderTargetPhrase(label, optionPhrase); button.append(label);
    if (optionPhrase.reading) {
      const romanized = document.createElement('small'); romanized.className = 'practice-reading'; romanized.textContent = `Leitura: ${optionPhrase.reading}`; button.append(romanized);
    }
    button.addEventListener('click', () => {
      if (practicePassed) return;
      if (option === targetText(phrase)) {
        practicePassed = true;
        showFeedback(`Isso mesmo! “${displayTargetText(optionPhrase)}” significa “${phrase.prompt}”. O puzzle abrirá em instantes; se preferir, toque em “Continuar para o puzzle”.`, true, 'practice-feedback');
        [...root.children].forEach(control => { control.disabled = true; if (control.dataset.answer === targetText(phrase)) control.classList.add('correct-option'); });
        $('to-puzzle-button').disabled = false;
        $('to-puzzle-button').textContent = 'Continuar para o puzzle →';
        practiceAdvanceTimer = window.setTimeout(() => {
          practiceAdvanceTimer = null;
          if (stage === 'practice' && practicePassed) startPuzzle();
        }, 2500);
      } else {
        showFeedback(`Essa opção não combina. Tente outra; você pode pedir uma dica e não perde energia nesta etapa. ${practiceHintVisible ? phrase.hint : ''}`, false, 'practice-feedback');
        button.classList.add('wrong-option');
        button.disabled = true;
      }
    });
    button.setAttribute('aria-label', `Opção ${index + 1}: ${displayTargetText(optionPhrase)}${optionPhrase.reading ? `. Leitura: ${optionPhrase.reading}` : ''}`); root.append(button);
  });
  if (practiceHintVisible) $('practice-feedback').hidden = false, showFeedback(phrase.hint, true, 'practice-feedback');
}
function makeBank() {
  const phrase = currentPhrase();
  bank = shuffleWords(phrase.answer).map((word, index) => ({ id: `${phrase.id}-${index}-${word}`, word, used: false }));
}
function renderAnswer() {
  const slots = $('answer-slots'); slots.replaceChildren();
  slots.dir = state.language === 'ar' ? 'rtl' : 'ltr';
  if (!selected.length) {
    const placeholder = document.createElement('span'); placeholder.className = 'hint-text'; placeholder.textContent = 'Sua expressão aparecerá aqui…'; slots.append(placeholder);
  }
  selected.forEach((item, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'word-tile';
    button.textContent = item.word; applyScriptFont(button); button.setAttribute('aria-label', `Remover palavra ${item.word}`);
    button.addEventListener('click', () => removeSelected(index));
    button.addEventListener('dragover', event => event.preventDefault());
    button.addEventListener('drop', event => { event.preventDefault(); const id = event.dataTransfer?.getData('text/plain'); moveBankWord(id, index); });
    slots.append(button);
  });
}
function renderBank() {
  const root = $('word-bank'); root.replaceChildren();
  root.dir = state.language === 'ar' ? 'rtl' : 'ltr';
  bank.forEach(item => {
    const button = document.createElement('button'); button.type = 'button'; button.className = `word-tile${item.used ? ' used' : ''}`;
    button.textContent = item.word; applyScriptFont(button); button.disabled = item.used || locked || state.energy <= 0; button.draggable = !item.used && !locked && state.energy > 0;
    button.setAttribute('aria-label', item.used ? `${item.word}, já selecionada` : `Adicionar palavra ${item.word}`);
    button.addEventListener('click', () => addWord(item.id));
    button.addEventListener('dragstart', event => { event.dataTransfer?.setData('text/plain', item.id); if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'; });
    root.append(button);
  });
}
function renderPuzzle() {
  const phrase = currentPhrase();
  $('prompt-text').textContent = phrase.prompt;
  $('puzzle-reading').textContent = readingText(phrase);
  $('puzzle-reading').hidden = !$('puzzle-reading').textContent;
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
    void reconcilePendingLifeGrants();
    const correct = displayTargetText(currentPhrase());
    showFeedback(`Ainda não. Sua resposta foi “${joinAnswerParts(answerWords)}”. A expressão correta é “${correct}”. ${currentPhrase().hint} Você pode corrigir e tentar novamente; cada tentativa incorreta no desafio consome 1 energia.`, false);
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
  renderTargetPhrase($('review-correct'), phrase);
  $('review-reading').textContent = readingText(phrase);
  $('review-reading').hidden = !$('review-reading').textContent;
  $('review-meaning').textContent = `Significado: ${phrase.prompt}`;
  const glosses = phrase.answer.map(word => {
    const meaning = wordMeaning(word);
    return meaning ? `${word} (${meaning})` : '';
  }).filter(Boolean);
  $('review-explanation').textContent = glosses.length
    ? `${phrase.hint} Palavras-chave: ${glosses.join(' · ')}.`
    : phrase.hint;
  $('review-your-answer').textContent = mistakeRecord?.lastAnswer?.length ? `Última tentativa incorreta: ${joinAnswerParts(mistakeRecord.lastAnswer)}` : (lastSelectedAnswer.length ? `Sua resposta: ${joinAnswerParts(lastSelectedAnswer)}` : 'Você concluiu a prática guiada.');
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
  const trackName = selectedTopic === 'all' ? `a trilha completa de ${LANGUAGES[state.language].label}` : `o tema ${TOPICS[selectedTopic].toLowerCase()} em ${LANGUAGES[state.language].label}`;
  $('result-summary').textContent = `Você concluiu ${currentPhrases().length} lições de ${trackName}. As expressões difíceis ficam disponíveis para revisão espaçada.`;
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
  $('review-queue-description').textContent = reviewQueue.length ? `${reviewQueue.length} expressão(ões) chegou(aram) ao momento de revisar. Tente lembrar da tradução antes de revelar a resposta; a revisão não consome energia.` : 'Nenhuma revisão está pendente agora. As expressões difíceis aparecerão aqui no horário programado.';
  if (!reviewQueue.length) {
    const p = document.createElement('p'); p.className = 'status-message'; p.textContent = 'Você pode continuar a trilha enquanto a memória consolida o que aprendeu.'; root.append(p);
  } else {
    reviewQueue.forEach(item => {
      const phrase = Object.values(PHRASES).flat().find(entry => entry.id === item.phraseId);
      if (!phrase) return;
      const card = document.createElement('article'); card.className = 'review-queue-item';
      const title = document.createElement('h3'); title.textContent = phrase.prompt;
      const detail = document.createElement('p'); detail.className = 'hint-text'; detail.textContent = `Você errou esta expressão ${item.count} vez(es). Diga a tradução em voz alta antes de revelar.`;
      const language = item.phraseId.slice(0, 2);
      const answer = document.createElement('p'); answer.className = 'review-recall-answer'; renderTargetPhrase(answer, phrase, language); answer.hidden = true;
      const reading = document.createElement('p'); reading.className = 'reading-guide';
      reading.textContent = readingText(phrase, item.phraseId.slice(0, 2)); reading.hidden = true;
      const explanation = document.createElement('p'); explanation.className = 'hint-text'; explanation.textContent = phrase.hint; explanation.hidden = true;
      const reveal = document.createElement('button'); reveal.type = 'button'; reveal.className = 'secondary-button'; reveal.textContent = 'Revelar tradução';
      const actions = document.createElement('div'); actions.className = 'review-recall-actions'; actions.hidden = true;
      const remembered = document.createElement('button'); remembered.type = 'button'; remembered.className = 'primary-button'; remembered.textContent = 'Eu lembrei';
      const forgotten = document.createElement('button'); forgotten.type = 'button'; forgotten.className = 'secondary-button'; forgotten.textContent = 'Preciso revisar';
      reveal.addEventListener('click', () => { answer.hidden = false; reading.hidden = !reading.textContent; explanation.hidden = false; reveal.hidden = true; actions.hidden = false; });
      remembered.addEventListener('click', () => { state = recordReview(state, item.phraseId); persist(); removeReviewCard(card, root); });
      forgotten.addEventListener('click', () => { state = recordMistake(state, item.phraseId, phrase.answer, [], Date.now()); persist(); removeReviewCard(card, root); });
      actions.append(remembered, forgotten);
      card.append(title, detail, reveal, answer, reading, explanation, actions); root.append(card);
    });
  }
  setStage('queue');
}
function removeReviewCard(card, root) {
  card.remove();
  const remaining = root.querySelectorAll('.review-queue-item').length;
  $('review-queue-description').textContent = remaining
    ? `Revisão salva. Restam ${remaining} expressão(ões) nesta sessão.`
    : 'Tudo revisado por agora. Bom trabalho!';
  if (!remaining) {
    const empty = document.createElement('p'); empty.className = 'status-message'; empty.textContent = 'As próximas revisões serão agendadas conforme sua resposta.'; root.append(empty);
  }
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
document.querySelectorAll('[data-coin-pack]').forEach(button => button.addEventListener('click', () => selectCoinPack(button)));
document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => closeDialog(button.dataset.closeDialog)));
$('back-to-learning-button').addEventListener('click', () => { renderLearn(); setStage('learn'); });
$('language-select').addEventListener('change', event => { state.language = LANGUAGES[event.target.value] ? event.target.value : 'en'; applyLanguageTheme(); phraseIndex = 0; persist(); startLesson(true); });
$('color-mode-select').addEventListener('change', event => {
  colorMode = event.target.value === 'dark' ? 'dark' : 'light';
  applyColorMode();
  try { storage?.setItem(COLOR_MODE_STORAGE_KEY, colorMode); } catch {}
});
$('restart-button').addEventListener('click', () => { $('result-dialog').close(); startLesson(true); });
$('reset-button').addEventListener('click', () => { if (window.confirm('Quer apagar seu XP, moedas, energia e histórico deste navegador?')) { state = createInitialState(); persist(); startLesson(true); } });
$('answer-slots').addEventListener('dragover', event => event.preventDefault());
$('answer-slots').addEventListener('drop', event => { event.preventDefault(); const id = event.dataTransfer?.getData('text/plain'); if (id) addWord(id); });
window.addEventListener('focus', () => { state = loadState(storage); persist(); void reconcilePendingLifeGrants(); });
window.setInterval(() => {
  const previousEnergy = state.energy;
  state = restoreEnergy(state, Date.now());
  if (state.energy !== previousEnergy) persist();
  else renderStats();
}, 1000);
$('language-select').value = LANGUAGES[state.language] ? state.language : 'en';
$('topic-select').value = selectedTopic;
$('topic-select').addEventListener('change', event => {
  selectedTopic = TOPICS[event.target.value] ? event.target.value : 'all';
  phraseIndex = 0;
  startLesson(true);
});
applyColorMode();
applyLanguageTheme();
renderStats(); renderReviewCount(); renderLearn(); setStage('learn');
initializePayments();
