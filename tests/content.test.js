import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LANGUAGES, PHRASES } from '../js/phrases.js';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../js/app.js', import.meta.url), 'utf8');
const themes = readFileSync(new URL('../css/themes.css', import.meta.url), 'utf8');

test('mantém cinco idiomas e 45 lições válidas por idioma', () => {
  assert.deepEqual(Object.keys(LANGUAGES).sort(), ['en', 'es', 'fr', 'ja', 'ru']);
  assert.equal(LANGUAGES.ru.locale, 'ru-RU');
  assert.match(html, /<option value="ru">🇷🇺 Russo<\/option>/);
  for (const [language, phrases] of Object.entries(PHRASES)) {
    assert.equal(phrases.length, 45, `${language} deve ter 45 lições`);
    for (const phrase of phrases) {
      assert.ok(phrase.id && phrase.prompt && phrase.answer.length, `${phrase.id} precisa de conteúdo`);
      assert.ok(phrase.hint && phrase.emoji && phrase.topic, `${phrase.id} precisa de dica, tema e marcador visual`);
      if (language === 'ja' || language === 'ru') assert.ok(phrase.reading, `${phrase.id} precisa de apoio de leitura`);
    }
  }
});

test('HTML apresenta as quatro etapas pedagógicas na ordem correta', () => {
  const positions = ['id="learn-stage"', 'id="practice-stage"', 'id="puzzle-stage"', 'id="review-stage"'].map(token => html.indexOf(token));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(html, /id="review-queue-stage"/);
  assert.match(html, /aria-live="polite"/);
});

test('todo seletor por ID usado pelo app existe no HTML', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  const selectors = new Set([...app.matchAll(/\$\('([^']+)'\)/g)].map(match => match[1]));
  assert.deepEqual([...selectors].filter(id => !ids.has(id)), []);
});

test('resposta correta na prática avança ao puzzle sem exigir clique adicional', () => {
  assert.match(app, /O puzzle abrirá em instantes/);
  assert.match(app, /Continuar para o puzzle/);
  assert.match(app, /window\.setTimeout\(\(\) => \{\s*practiceAdvanceTimer = null;\s*if \(stage === 'practice' && practicePassed\) startPuzzle\(\);\s*\}, 2500\)/);
  assert.match(app, /if \(next !== 'practice' && practiceAdvanceTimer !== null\)[\s\S]*?window\.clearTimeout\(practiceAdvanceTimer\)/);
});

test('tema visual acompanha o idioma selecionado e é restaurado ao abrir o app', () => {
  assert.match(html, /href="css\/themes\.css"/);
  assert.match(app, /const language = LANGUAGES\[state\.language\] \? state\.language : 'en';[\s\S]*?document\.documentElement\.dataset\.languageTheme = language;/);
  for (const language of Object.keys(LANGUAGES)) {
    assert.match(themes, new RegExp(`data-language-theme="${language}"`));
  }
});

test('tema cultural atualiza nome, cidade, motivo e bandeira para cada idioma', () => {
  assert.match(html, /id="country-banner"/);
  assert.match(html, /id="country-name"/);
  assert.match(html, /id="country-caption"/);
  assert.match(html, /id="country-motif"/);
  assert.match(html, /id="country-flag"/);
  assert.match(app, /const COUNTRY_THEMES = \{/);
  for (const [language, country] of Object.entries({ en: 'Reino Unido', es: 'Espanha', fr: 'França', ja: 'Japão', ru: 'Rússia' })) {
    assert.match(app, new RegExp(`${language}: \\{ country: '${country}'`));
  }
  assert.match(themes, /--art-background:/);
  assert.match(themes, /--page-pattern:/);
  assert.match(app, /\$\('country-banner'\)\.setAttribute\('aria-label'/);
});

test('XP, moedas e vidas têm progressão, gasto e vitrine de pacotes', () => {
  for (const id of ['level-open-button', 'level-dialog', 'shop-open-button', 'shop-dialog', 'lives-open-button', 'watch-ad-button', 'buy-life-button']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /50 <small>moedas<\/small>/);
  assert.match(html, /150 <small>moedas<\/small>/);
  assert.match(html, /400 <small>moedas<\/small>/);
  assert.match(html, /R\$ 4,90/);
  assert.match(html, /R\$ 9,90/);
  assert.match(html, /R\$ 19,90/);
  assert.match(html, /Mercado Pago/);
  assert.match(app, /awardLessonCompletion\(state, currentPhrase\(\)\.id\)/);
  assert.match(app, /purchaseLife\(state, Date\.now\(\)\)/);
  assert.match(html, /O anúncio só começa quando você tocar no botão/);
  assert.match(html, /Comprar com moedas/);
  assert.match(app, /rewardLifeForAd/);
  assert.match(html, /js\/ads-config\.js/);
});
