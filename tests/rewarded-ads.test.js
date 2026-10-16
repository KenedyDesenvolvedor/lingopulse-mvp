import test from 'node:test';
import assert from 'node:assert/strict';
import { createGoogleRewardedAds, isValidGoogleAdUnitPath } from '../js/rewarded-ads.js';

function makeFakeTag({ onDisplay } = {}) {
  const listeners = new Map();
  const slot = { addService() {} };
  const service = {
    addEventListener(name, callback) {
      const callbacks = listeners.get(name) || new Set();
      callbacks.add(callback);
      listeners.set(name, callbacks);
    },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
    dispatch(name, event = {}) {
      for (const callback of [...(listeners.get(name) || [])]) callback(event);
    }
  };
  const googletag = {
    cmd: { push(callback) { callback(); } },
    enums: { OutOfPageFormat: { REWARDED: 'rewarded' } },
    pubads: () => service,
    defineOutOfPageSlot: () => slot,
    enableServices() {},
    display: () => onDisplay?.({ service, slot }),
    destroySlots() {}
  };
  return { googletag, service, slot };
}

test('valida o formato do caminho de unidade do Google Ad Manager', () => {
  assert.equal(isValidGoogleAdUnitPath('/1234567/lingopulse/vida-recompensada'), true);
  assert.equal(isValidGoogleAdUnitPath(''), false);
  assert.equal(isValidGoogleAdUnitPath('/abc/lingopulse'), false);
  assert.equal(isValidGoogleAdUnitPath('/1234567/lingopulse/path with spaces'), false);
});

test('concede a vida apenas após rewardedSlotGranted e finaliza ao fechar', async () => {
  let events;
  const { googletag } = makeFakeTag({ onDisplay: value => {
    events = value;
    value.service.dispatch('rewardedSlotReady', { slot: value.slot, makeRewardedVisible: () => true });
  } });
  const ads = createGoogleRewardedAds(
    { adUnitPath: '/1234567/lingopulse/vida-recompensada' },
    { loadTag: async () => {}, getTag: () => googletag }
  );
  let rewards = 0;
  const resultPromise = ads.showRewardedAd({ onReward: () => { rewards += 1; } });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(ads.isReady(), false);
  assert.equal(rewards, 0);

  events.service.dispatch('rewardedSlotGranted', { slot: events.slot, payload: { amount: 1, type: 'life' } });
  assert.equal(rewards, 1);
  events.service.dispatch('rewardedSlotClosed', { slot: events.slot });
  assert.equal(await resultPromise, true);
  assert.equal(ads.isReady(), true);
});

test('não concede recompensa para inventário sem preenchimento', async () => {
  let events;
  const { googletag } = makeFakeTag({ onDisplay: value => {
    events = value;
    value.service.dispatch('slotRenderEnded', { slot: value.slot, isEmpty: true });
  } });
  const ads = createGoogleRewardedAds(
    { adUnitPath: '/1234567/lingopulse/vida-recompensada' },
    { loadTag: async () => {}, getTag: () => googletag }
  );
  let rewards = 0;
  assert.equal(await ads.showRewardedAd({ onReward: () => { rewards += 1; } }), false);
  assert.equal(rewards, 0);
  assert.equal(ads.isReady(), true);
});

test('sem unidade configurada não carrega GPT nem promete recompensa', async () => {
  let loaded = false;
  const ads = createGoogleRewardedAds({}, { loadTag: async () => { loaded = true; } });
  assert.equal(ads.isConfigured(), false);
  assert.equal(await ads.showRewardedAd({ onReward() { assert.fail('não deve recompensar'); } }), false);
  assert.equal(loaded, false);
});
