export const LANGUAGES = {
  en: { label: 'Inglês', locale: 'en-US', flag: '🇬🇧' },
  es: { label: 'Espanhol', locale: 'es-ES', flag: '🇪🇸' },
  fr: { label: 'Francês', locale: 'fr-FR', flag: '🇫🇷' },
  ja: { label: 'Japonês', locale: 'ja-JP', flag: '🇯🇵' },
  ru: { label: 'Russo', locale: 'ru-RU', flag: '🇷🇺' }
};

// As peças são separadas por espaços para manter o puzzle simples no MVP.
// No japonês, usamos segmentos curtos que podem ser ordenados visualmente.
export const PHRASES = {
  en: [
    { id: 'en1', prompt: 'Eu gosto de café.', answer: ['I', 'like', 'coffee'], hint: 'Comece com quem faz a ação.', emoji: '☕' },
    { id: 'en2', prompt: 'Bom dia!', answer: ['Good', 'morning'], hint: 'Uma saudação usada pela manhã.', emoji: '🌅' },
    { id: 'en3', prompt: 'Onde fica a estação?', answer: ['Where', 'is', 'the', 'station'], hint: 'Uma pergunta para pedir direções.', emoji: '🚉' },
    { id: 'en4', prompt: 'Eu preciso de ajuda.', answer: ['I', 'need', 'help'], hint: 'Comece com “I”.', emoji: '🆘' },
    { id: 'en5', prompt: 'Muito obrigado.', answer: ['Thank', 'you', 'very', 'much'], hint: 'Uma expressão de gratidão.', emoji: '🙏' },
    { id: 'en6', prompt: 'A conta, por favor.', answer: ['The', 'bill', 'please'], hint: 'Você pode dizer isso no restaurante.', emoji: '🍽️' },
    { id: 'en7', prompt: 'Eu estou aprendendo.', answer: ['I', 'am', 'learning'], hint: 'Use “I am” para falar de algo acontecendo agora.', emoji: '📚' },
    { id: 'en8', prompt: 'Quanto custa?', answer: ['How', 'much', 'does', 'it', 'cost'], hint: 'Uma pergunta útil para fazer compras.', emoji: '🛍️' },
    { id: 'en9', prompt: 'Prazer em conhecer você.', answer: ['Nice', 'to', 'meet', 'you'], hint: 'Uma frase para apresentações.', emoji: '🤝' },
    { id: 'en10', prompt: 'Até amanhã!', answer: ['See', 'you', 'tomorrow'], hint: 'Uma despedida para o dia seguinte.', emoji: '👋' }
  ],
  es: [
    { id: 'es1', prompt: 'Eu gosto de café.', answer: ['Me', 'gusta', 'el', 'café'], hint: 'Em espanhol, “me gusta” expressa que você gosta de algo.', emoji: '☕' },
    { id: 'es2', prompt: 'Bom dia!', answer: ['Buenos', 'días'], hint: 'Uma saudação usada pela manhã.', emoji: '🌅' },
    { id: 'es3', prompt: 'Onde fica a estação?', answer: ['¿Dónde', 'está', 'la', 'estación?'], hint: 'Comece com a palavra interrogativa.', emoji: '🚉' },
    { id: 'es4', prompt: 'Eu preciso de ajuda.', answer: ['Necesito', 'ayuda'], hint: 'A frase pode começar com o verbo.', emoji: '🆘' },
    { id: 'es5', prompt: 'Muito obrigado.', answer: ['Muchas', 'gracias'], hint: 'Uma expressão de gratidão.', emoji: '🙏' },
    { id: 'es6', prompt: 'A conta, por favor.', answer: ['La', 'cuenta,', 'por', 'favor'], hint: 'Você pode dizer isso no restaurante.', emoji: '🍽️' },
    { id: 'es7', prompt: 'Eu estou aprendendo.', answer: ['Estoy', 'aprendiendo'], hint: 'Use o verbo “estar”.', emoji: '📚' },
    { id: 'es8', prompt: 'Quanto custa?', answer: ['¿Cuánto', 'cuesta?'], hint: 'Uma pergunta útil para fazer compras.', emoji: '🛍️' },
    { id: 'es9', prompt: 'Prazer em conhecer você.', answer: ['Mucho', 'gusto'], hint: 'Uma forma comum e curta de se apresentar.', emoji: '🤝' },
    { id: 'es10', prompt: 'Até amanhã!', answer: ['¡Hasta', 'mañana!'], hint: 'Uma despedida para o dia seguinte.', emoji: '👋' }
  ],
  fr: [
    { id: 'fr1', prompt: 'Eu gosto de café.', answer: ["J’aime", 'le', 'café'], hint: 'Comece com “J’aime”.', emoji: '☕' },
    { id: 'fr2', prompt: 'Bom dia!', answer: ['Bonjour'], hint: 'Uma saudação comum durante o dia.', emoji: '🌅' },
    { id: 'fr3', prompt: 'Onde fica a estação?', answer: ['Où', 'est', 'la', 'gare', '?'], hint: 'Comece com “Où”.', emoji: '🚉' },
    { id: 'fr4', prompt: 'Eu preciso de ajuda.', answer: ["J’ai", 'besoin', "d’aide"], hint: 'A expressão “avoir besoin de” significa precisar de.', emoji: '🆘' },
    { id: 'fr5', prompt: 'Muito obrigado.', answer: ['Merci', 'beaucoup'], hint: 'Uma expressão de gratidão.', emoji: '🙏' },
    { id: 'fr6', prompt: 'A conta, por favor.', answer: ["L’addition", 's’il', 'vous', 'plaît'], hint: 'Uma frase útil em um restaurante.', emoji: '🍽️' },
    { id: 'fr7', prompt: 'Eu estou aprendendo.', answer: ['J’apprends'], hint: 'Um verbo que significa aprender.', emoji: '📚' },
    { id: 'fr8', prompt: 'Quanto custa?', answer: ['Combien', 'ça', 'coûte', '?'], hint: 'Uma pergunta útil para fazer compras.', emoji: '🛍️' },
    { id: 'fr9', prompt: 'Prazer em conhecer você.', answer: ['Enchanté', 'de', 'vous', 'rencontrer'], hint: 'Uma frase para apresentações.', emoji: '🤝' },
    { id: 'fr10', prompt: 'Até amanhã!', answer: ['À', 'demain', '!'], hint: 'Uma despedida para o dia seguinte.', emoji: '👋' }
  ],
  ja: [
    { id: 'ja1', prompt: 'Eu gosto de café.', answer: ['コーヒー', 'が', '好き', 'です'], hint: '“好きです” expressa gostar de algo.', emoji: '☕' },
    { id: 'ja2', prompt: 'Bom dia!', answer: ['おはよう', 'ございます'], hint: 'Uma saudação respeitosa pela manhã.', emoji: '🌅' },
    { id: 'ja3', prompt: 'Onde fica a estação?', answer: ['駅', 'は', 'どこ', 'ですか'], hint: '駅 significa estação.', emoji: '🚉' },
    { id: 'ja4', prompt: 'Eu preciso de ajuda.', answer: ['助け', 'が', '必要', 'です'], hint: '必要 significa necessário.', emoji: '🆘' },
    { id: 'ja5', prompt: 'Muito obrigado.', answer: ['どうも', 'ありがとう', 'ございます'], hint: 'Uma expressão educada de gratidão.', emoji: '🙏' },
    { id: 'ja6', prompt: 'A conta, por favor.', answer: ['お会計', 'を', 'お願いします'], hint: 'Uma frase útil em um restaurante.', emoji: '🍽️' },
    { id: 'ja7', prompt: 'Eu estou aprendendo.', answer: ['勉強', 'して', 'います'], hint: '勉強する significa estudar.', emoji: '📚' },
    { id: 'ja8', prompt: 'Quanto custa?', answer: ['いくら', 'ですか'], hint: 'Uma pergunta útil para fazer compras.', emoji: '🛍️' },
    { id: 'ja9', prompt: 'Prazer em conhecer você.', answer: ['はじめまして'], hint: 'Uma expressão usada ao conhecer alguém.', emoji: '🤝' },
    { id: 'ja10', prompt: 'Até amanhã!', answer: ['また', '明日'], hint: '明日 significa amanhã.', emoji: '👋' }
  ],
  ru: [
    { id: 'ru1', prompt: 'Eu gosto de café.', answer: ['Мне', 'нравится', 'кофе.'], hint: 'A construção “Мне нравится...” expressa que você gosta de algo.', emoji: '☕' },
    { id: 'ru2', prompt: 'Bom dia!', answer: ['Доброе', 'утро!'], hint: 'Saudação comum pela manhã; literalmente, “boa manhã”.', emoji: '🌅' },
    { id: 'ru3', prompt: 'Onde fica a estação?', answer: ['Где', 'находится', 'вокзал?'], hint: 'Comece com “Где” (“onde”); “вокзал” é uma estação ferroviária.', emoji: '🚉' },
    { id: 'ru4', prompt: 'Eu preciso de ajuda.', answer: ['Мне', 'нужна', 'помощь.'], hint: '“Мне нужна помощь” significa “preciso de ajuda”; помощь é feminino, por isso usamos нужна.', emoji: '🆘' },
    { id: 'ru5', prompt: 'Muito obrigado.', answer: ['Большое', 'спасибо!'], hint: '“Большое спасибо” é uma forma cordial de agradecer.', emoji: '🙏' },
    { id: 'ru6', prompt: 'A conta, por favor.', answer: ['Счёт,', 'пожалуйста.'], hint: '“Счёт” é a conta; “пожалуйста” acrescenta “por favor”.', emoji: '🍽️' },
    { id: 'ru7', prompt: 'Eu estou aprendendo.', answer: ['Я', 'учусь.'], hint: '“Я учусь” quer dizer “estou estudando/aprendendo”.', emoji: '📚' },
    { id: 'ru8', prompt: 'Quanto custa?', answer: ['Сколько', 'это', 'стоит?'], hint: 'Comece com “Сколько” (“quanto”).', emoji: '🛍️' },
    { id: 'ru9', prompt: 'Prazer em conhecer você.', answer: ['Приятно', 'познакомиться!'], hint: 'Expressão usada ao conhecer alguém.', emoji: '🤝' },
    { id: 'ru10', prompt: 'Até amanhã!', answer: ['До', 'завтра!'], hint: 'Uma despedida curta para indicar que vocês se verão amanhã.', emoji: '👋' }
  ]
};
