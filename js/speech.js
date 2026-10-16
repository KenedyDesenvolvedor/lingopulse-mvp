/** Pronúncia opcional com fallback acessível para texto. */
export function speak(text, language = 'en-US') {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    return { ok: false, message: 'A leitura em voz alta não está disponível neste navegador.' };
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.86;
    utterance.pitch = 1;
    utterance.onerror = event => console.warn('Falha na pronúncia:', event.error);
    window.speechSynthesis.speak(utterance);
    return { ok: true, message: 'Pronúncia solicitada.' };
  } catch {
    return { ok: false, message: 'Não foi possível reproduzir o áudio. Use a expressão escrita como referência.' };
  }
}
