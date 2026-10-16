const GPT_SCRIPT_URL = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
const REQUEST_TIMEOUT_MS = 60_000;
const CLOSE_GRACE_MS = 5_000;

let gptLoadPromise;

export function isValidGoogleAdUnitPath(value) {
  if (typeof value !== 'string') return false;
  const parts = value.split('/').filter(Boolean);
  return parts.length >= 2 && /^\d+$/.test(parts[0]) && parts.slice(1).every(part => /^[\w-]+$/.test(part));
}

function loadGooglePublisherTag() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return Promise.reject(new Error('Google Publisher Tag requer um navegador.'));
  if (window.googletag?.apiReady) return Promise.resolve(window.googletag);
  if (gptLoadPromise) return gptLoadPromise;

  window.googletag = window.googletag || { cmd: [] };
  gptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = GPT_SCRIPT_URL;
    script.crossOrigin = 'anonymous';
    script.addEventListener('load', () => resolve(window.googletag), { once: true });
    script.addEventListener('error', () => {
      gptLoadPromise = undefined;
      reject(new Error('Não foi possível carregar o Google Publisher Tag.'));
    }, { once: true });
    document.head.append(script);
  });
  return gptLoadPromise;
}

export function createGoogleRewardedAds(config = {}, dependencies = {}) {
  const adUnitPath = String(config.adUnitPath || '').trim();
  const rewardType = String(config.rewardType || 'life').trim();
  const rewardAmount = Number(config.rewardAmount ?? 1);
  const loadTag = dependencies.loadTag || loadGooglePublisherTag;
  const getTag = dependencies.getTag || (() => window.googletag);
  let activeRequest = null;
  let servicesEnabled = false;

  function isConfigured() { return isValidGoogleAdUnitPath(adUnitPath); }
  function isReady() { return isConfigured() && !activeRequest; }

  async function showRewardedAd({ onReward } = {}) {
    if (!isReady()) return false;
    activeRequest = { loading: true };
    try { await loadTag(); }
    catch { activeRequest = null; return false; }

    let googletag;
    try { googletag = getTag(); }
    catch { activeRequest = null; return false; }
    if (!googletag?.cmd || !googletag?.pubads) { activeRequest = null; return false; }

    return new Promise(resolve => {
      const request = { slot: null, granted: false, closed: false, settled: false, closeTimer: null, timeoutTimer: null };
      activeRequest = request;
      const listeners = [];
      let service;
      const listen = (name, handler) => {
        service.addEventListener(name, handler);
        listeners.push([name, handler]);
      };
      const cleanup = result => {
        if (request.settled) return;
        request.settled = true;
        clearTimeout(request.closeTimer);
        clearTimeout(request.timeoutTimer);
        listeners.forEach(([name, handler]) => service.removeEventListener(name, handler));
        if (request.slot) {
          try { googletag.destroySlots([request.slot]); } catch { /* Cleanup must still settle the ad request. */ }
        }
        activeRequest = null;
        resolve(result);
      };
      const onReady = event => {
        if (event.slot !== request.slot) return;
        let visible = false;
        try { visible = event.makeRewardedVisible(); } catch { visible = false; }
        if (!visible) cleanup(false);
      };
      const onGranted = event => {
        if (event.slot !== request.slot || request.granted) return;
        if (String(event.payload?.type || '') !== rewardType || Number(event.payload?.amount) !== rewardAmount) return;
        request.granted = true;
        try { onReward?.(event.payload); } catch { /* A callback error must not create a second reward. */ }
        if (request.closed) cleanup(true);
      };
      const onClosed = event => {
        if (event.slot !== request.slot) return;
        request.closed = true;
        if (request.granted) cleanup(true);
        else request.closeTimer = setTimeout(() => cleanup(false), CLOSE_GRACE_MS);
      };
      const onRenderEnded = event => {
        if (event.slot === request.slot && event.isEmpty) cleanup(false);
      };

      try {
        service = googletag.pubads();
        googletag.cmd.push(() => {
          try {
            request.slot = googletag.defineOutOfPageSlot(adUnitPath, googletag.enums.OutOfPageFormat.REWARDED);
            if (!request.slot) { cleanup(false); return; }
            request.slot.addService(service);
            listen('rewardedSlotReady', onReady);
            listen('rewardedSlotGranted', onGranted);
            listen('rewardedSlotClosed', onClosed);
            listen('slotRenderEnded', onRenderEnded);
            if (!servicesEnabled) { googletag.enableServices(); servicesEnabled = true; }
            request.timeoutTimer = setTimeout(() => cleanup(false), REQUEST_TIMEOUT_MS);
            googletag.display(request.slot);
          } catch { cleanup(false); }
        });
      } catch { cleanup(false); }
    });
  }

  return { isConfigured, isReady, showRewardedAd };
}
