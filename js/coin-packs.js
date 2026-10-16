export const COIN_PACKS = Object.freeze([
  Object.freeze({ id: 'starter', name: 'Inicial', coins: 50, priceCents: 490 }),
  Object.freeze({ id: 'practice', name: 'Prática', coins: 150, priceCents: 990 }),
  Object.freeze({ id: 'immersion', name: 'Imersão', coins: 400, priceCents: 1990 })
]);

export function getCoinPack(id) {
  return COIN_PACKS.find(pack => pack.id === id) || null;
}

export function formatBrl(priceCents) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceCents / 100);
}
