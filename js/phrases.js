export const LANGUAGES = {
  en: { label: 'Inglês', locale: 'en-US', flag: '🇬🇧' },
  es: { label: 'Espanhol', locale: 'es-ES', flag: '🇪🇸' },
  fr: { label: 'Francês', locale: 'fr-FR', flag: '🇫🇷' },
  ja: { label: 'Japonês', locale: 'ja-JP', flag: '🇯🇵' },
  ru: { label: 'Russo', locale: 'ru-RU', flag: '🇷🇺' }
};

export const TOPICS = {
  all: 'Trilha completa',
  greetings: 'Saudações',
  food: 'Comida e bebida',
  travel: 'Viagens',
  shopping: 'Compras',
  conversation: 'Conversas',
  study: 'Estudos',
  work: 'Trabalho',
  emergency: 'Pedir ajuda',
  wellbeing: 'Saúde',
  daily: 'Dia a dia'
};

function lesson(id, prompt, answer, hint, emoji, topic, context) {
  return { id, prompt, answer, hint, emoji, topic, context };
}

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

const PROMPT_TOPICS = {
  'Eu gosto de café.': 'food',
  'Bom dia!': 'greetings',
  'Onde fica a estação?': 'travel',
  'Eu preciso de ajuda.': 'emergency',
  'Muito obrigado.': 'conversation',
  'A conta, por favor.': 'food',
  'Eu estou aprendendo.': 'study',
  'Quanto custa?': 'shopping',
  'Prazer em conhecer você.': 'conversation',
  'Até amanhã!': 'greetings'
};

for (const phrases of Object.values(PHRASES)) {
  for (const phrase of phrases) phrase.topic ||= PROMPT_TOPICS[phrase.prompt] || 'daily';
}

PHRASES.en.push(
  lesson('en11', 'Preciso de uma passagem para o aeroporto.', ['I', 'need', 'a', 'ticket', 'to', 'the', 'airport.'], 'Use “I need” para dizer do que você precisa.', '✈️', 'travel', 'Na bilheteria ou ao organizar o trajeto até o aeroporto.'),
  lesson('en12', 'Como chego ao centro da cidade?', ['How', 'do', 'I', 'get', 'to', 'the', 'city', 'center?'], '“How do I get to…?” pede instruções de caminho.', '🗺️', 'travel', 'Pergunte a alguém como chegar à região central.'),
  lesson('en13', 'Tenho uma reserva.', ['I', 'have', 'a', 'reservation.'], '“I have” apresenta algo que você possui ou já fez.', '🛎️', 'travel', 'Confirme sua reserva ao chegar ao hotel ou restaurante.'),
  lesson('en14', 'Onde fica a estação de metrô?', ['Where', 'is', 'the', 'subway', 'station?'], '“Where is…?” pergunta onde algo está.', '🚇', 'travel', 'Peça ajuda para encontrar uma estação durante o passeio.'),
  lesson('en15', 'Uma mesa para duas pessoas, por favor.', ['A', 'table', 'for', 'two,', 'please.'], '“A table for two” informa quantas pessoas vão se sentar.', '🍽️', 'food', 'Use ao pedir uma mesa em um restaurante.'),
  lesson('en16', 'Posso ver o cardápio, por favor?', ['Could', 'I', 'see', 'the', 'menu,', 'please?'], '“Could I…?” é uma forma cordial de fazer um pedido.', '📋', 'food', 'Peça o cardápio antes de escolher o que vai comer.'),
  lesson('en17', 'A comida está deliciosa.', ['The', 'food', 'is', 'delicious.'], '“Delicious” descreve algo muito gostoso.', '😋', 'food', 'Comente a comida durante ou depois da refeição.'),
  lesson('en18', 'Vocês têm uma opção vegetariana?', ['Do', 'you', 'have', 'a', 'vegetarian', 'option?'], 'Use “Do you have…?” para perguntar se algo está disponível.', '🥗', 'food', 'Pergunte sobre opções do cardápio antes de fazer o pedido.'),
  lesson('en19', 'Posso pagar com cartão?', ['Can', 'I', 'pay', 'by', 'card?'], '“Can I…?” pergunta se algo é possível ou permitido.', '💳', 'shopping', 'Confirme a forma de pagamento em uma loja ou restaurante.'),
  lesson('en20', 'Quanto custa este aqui?', ['How', 'much', 'is', 'this', 'one?'], '“How much” é usado para perguntar um preço.', '🏷️', 'shopping', 'Pergunte o preço de um item que está apontando.'),
  lesson('en21', 'Estou só olhando, obrigado.', ["I'm", 'just', 'looking,', 'thank', 'you.'], '“I’m just…” suaviza a explicação do que você está fazendo.', '🛍️', 'shopping', 'Diga isso quando um vendedor oferecer ajuda e você ainda estiver escolhendo.'),
  lesson('en22', 'Pode falar mais devagar?', ['Could', 'you', 'speak', 'more', 'slowly?'], '“Could you…?” transforma o pedido em uma solicitação educada.', '🐢', 'conversation', 'Peça um ritmo mais lento quando estiver difícil acompanhar.'),
  lesson('en23', 'Pode repetir, por favor?', ['Could', 'you', 'repeat', 'that,', 'please?'], '“Repeat that” significa dizer de novo o que foi falado.', '🔁', 'conversation', 'Use quando não ouviu ou não entendeu uma frase.'),
  lesson('en24', 'Não entendo esta palavra.', ["I", "don't", 'understand', 'this', 'word.'], '“I don’t understand” explica que algo não ficou claro.', '💬', 'conversation', 'Peça ajuda com uma palavra desconhecida numa conversa.'),
  lesson('en25', 'Tenho uma reunião às dez.', ['I', 'have', 'a', 'meeting', 'at', 'ten.'], 'Use “at” antes de um horário específico.', '🗓️', 'work', 'Avise um colega sobre o horário de uma reunião.'),
  lesson('en26', 'Preciso terminar esta tarefa.', ['I', 'need', 'to', 'finish', 'this', 'assignment.'], 'Depois de “need”, use “to” antes de outro verbo.', '📝', 'study', 'Fale sobre uma atividade de estudo que ainda precisa concluir.'),
  lesson('en27', 'Preciso de um médico.', ['I', 'need', 'a', 'doctor.'], '“I need a…” é uma forma direta de pedir algo essencial.', '🩺', 'emergency', 'Use para pedir atendimento médico.'),
  lesson('en28', 'Não estou me sentindo bem.', ["I", "don't", 'feel', 'well.'], '“Feel well” descreve como você está se sentindo.', '🌡️', 'wellbeing', 'Explique que está passando mal ou indisposto.'),
  lesson('en29', 'Onde fica o banheiro?', ['Where', 'is', 'the', 'restroom?'], '“Restroom” é uma forma comum de dizer banheiro nos Estados Unidos.', '🚻', 'daily', 'Pergunte onde encontrar o banheiro em um local público.'),
  lesson('en30', 'Que horas são?', ['What', 'time', 'is', 'it?'], 'A pergunta inteira “What time is it?” significa “Que horas são?”.', '🕒', 'daily', 'Pergunte as horas durante uma conversa ou passeio.'),
  lesson('en31', 'Estou procurando este endereço.', ['I', 'am', 'looking', 'for', 'this', 'address.'], '“I am looking for…” significa “estou procurando…”.', '📍', 'travel', 'Mostre um endereço a alguém e explique o que está procurando.'),
  lesson('en32', 'Um copo de água, por favor.', ['A', 'glass', 'of', 'water,', 'please.'], '“A glass of…” indica um copo de alguma bebida.', '🥛', 'food', 'Peça água em um café ou restaurante.'),
  lesson('en33', 'Dá para ir a pé até a estação?', ['Can', 'I', 'walk', 'to', 'the', 'station?'], '“Can I…?” pergunta se é possível fazer algo.', '🚶', 'travel', 'Confirme se a estação pode ser alcançada caminhando.'),
  lesson('en34', 'Posso tirar uma foto aqui?', ['Can', 'I', 'take', 'a', 'photo', 'here?'], '“Take a photo” é a expressão usada para tirar uma foto.', '📷', 'conversation', 'Peça permissão antes de fotografar em um local.'),
  lesson('en35', 'Hoje está muito quente.', ['It', 'is', 'very', 'hot', 'today.'], 'Em inglês, “it is” é usado para falar do clima.', '☀️', 'daily', 'Comente o clima durante uma conversa.'),
  lesson('en36', 'Falo um pouco de português.', ['I', 'speak', 'a', 'little', 'Portuguese.'], '“A little” significa “um pouco”.', '🗣️', 'conversation', 'Explique quais idiomas você consegue falar.'),
  lesson('en37', 'Vou esperar aqui.', ['I', 'will', 'wait', 'here.'], '“Will” pode indicar uma ação que você fará em seguida.', '⏳', 'daily', 'Avise alguém onde você vai esperar.'),
  lesson('en38', 'Quero confirmar a reserva.', ['I', 'want', 'to', 'confirm', 'the', 'reservation.'], 'Depois de “want”, use “to” antes de outro verbo.', '🛎️', 'travel', 'Confirme os detalhes de uma reserva em um hotel.'),
  lesson('en39', 'O que esta palavra significa?', ['What', 'does', 'this', 'word', 'mean?'], 'A estrutura “What does … mean?” pergunta o significado de algo.', '📖', 'study', 'Pergunte o significado de uma palavra nova.'),
  lesson('en40', 'O que você recomenda?', ['What', 'do', 'you', 'recommend?'], '“Recommend” significa recomendar ou sugerir.', '💡', 'food', 'Peça uma sugestão a alguém em um restaurante ou loja.'),
  lesson('en41', 'Vocês aceitam cartão?', ['Do', 'you', 'accept', 'cards?'], 'Use “Do you…?” para fazer uma pergunta no presente.', '💳', 'shopping', 'Pergunte sobre formas de pagamento antes de comprar.'),
  lesson('en42', 'Preciso de um lugar para descansar.', ['I', 'need', 'a', 'place', 'to', 'rest.'], '“A place to…” indica um lugar onde você pode fazer algo.', '🪑', 'wellbeing', 'Peça ajuda para encontrar um local tranquilo.'),
  lesson('en43', 'Por favor, escreva isso para mim.', ['Please', 'write', 'that', 'down', 'for', 'me.'], '“Write down” significa anotar ou registrar por escrito.', '✍️', 'study', 'Peça que anotem uma informação importante.'),
  lesson('en44', 'O ponto de ônibus fica perto.', ['The', 'bus', 'stop', 'is', 'nearby.'], '“Nearby” significa perto ou nas proximidades.', '🚌', 'travel', 'Pergunte ou informe onde fica o ponto de ônibus.'),
  lesson('en45', 'Até a semana que vem!', ['See', 'you', 'next', 'week!'], '“Next week” significa “na próxima semana”.', '👋', 'greetings', 'Despeça-se de alguém que você verá na próxima semana.')
);

PHRASES.es.push(
  lesson('es11', 'Preciso de uma passagem para o aeroporto.', ['Necesito', 'un', 'billete', 'para', 'el', 'aeropuerto.'], '“Necesito” expressa uma necessidade; na Espanha, “billete” é passagem.', '✈️', 'travel', 'Na bilheteria ou ao organizar o trajeto até o aeroporto.'),
  lesson('es12', 'Como chego ao centro da cidade?', ['¿Cómo', 'llego', 'al', 'centro', 'de', 'la', 'ciudad?'], '“¿Cómo llego a…?” pede instruções de caminho.', '🗺️', 'travel', 'Pergunte a alguém como chegar à região central.'),
  lesson('es13', 'Tenho uma reserva.', ['Tengo', 'una', 'reserva.'], '“Tengo” significa “tenho” e apresenta uma reserva feita.', '🛎️', 'travel', 'Confirme sua reserva ao chegar ao hotel ou restaurante.'),
  lesson('es14', 'Onde fica a estação de metrô?', ['¿Dónde', 'está', 'la', 'estación', 'de', 'metro?'], '“¿Dónde está…?” pergunta onde algo está.', '🚇', 'travel', 'Peça ajuda para encontrar uma estação durante o passeio.'),
  lesson('es15', 'Uma mesa para duas pessoas, por favor.', ['Una', 'mesa', 'para', 'dos', 'personas,', 'por', 'favor.'], '“Una mesa para dos” informa quantas pessoas vão se sentar.', '🍽️', 'food', 'Use ao pedir uma mesa em um restaurante.'),
  lesson('es16', 'Pode me trazer o cardápio, por favor?', ['¿Me', 'puede', 'traer', 'la', 'carta,', 'por', 'favor?'], '“¿Me puede…?” é uma forma educada de pedir algo.', '📋', 'food', 'Peça o cardápio antes de escolher o que vai comer.'),
  lesson('es17', 'A comida está deliciosa.', ['La', 'comida', 'está', 'deliciosa.'], '“Está deliciosa” descreve o sabor da comida.', '😋', 'food', 'Comente a comida durante ou depois da refeição.'),
  lesson('es18', 'Vocês têm uma opção vegetariana?', ['¿Tienen', 'una', 'opción', 'vegetariana?'], '“¿Tienen…?” pergunta se há algo disponível.', '🥗', 'food', 'Pergunte sobre opções do cardápio antes de fazer o pedido.'),
  lesson('es19', 'Posso pagar com cartão?', ['¿Puedo', 'pagar', 'con', 'tarjeta?'], '“¿Puedo…?” pergunta se você pode fazer algo.', '💳', 'shopping', 'Confirme a forma de pagamento em uma loja ou restaurante.'),
  lesson('es20', 'Quanto custa este aqui?', ['¿Cuánto', 'cuesta', 'este?'], '“¿Cuánto cuesta…?” pergunta o preço de algo.', '🏷️', 'shopping', 'Pergunte o preço de um item que está apontando.'),
  lesson('es21', 'Estou só olhando, obrigado.', ['Solo', 'estoy', 'mirando,', 'gracias.'], '“Solo” significa “só/apenas” e limita o que você está fazendo.', '🛍️', 'shopping', 'Diga isso quando um vendedor oferecer ajuda e você ainda estiver escolhendo.'),
  lesson('es22', 'Pode falar mais devagar?', ['¿Podría', 'hablar', 'más', 'despacio?'], '“¿Podría…?” faz um pedido formal e educado.', '🐢', 'conversation', 'Peça um ritmo mais lento quando estiver difícil acompanhar.'),
  lesson('es23', 'Pode repetir, por favor?', ['¿Puede', 'repetirlo,', 'por', 'favor?'], '“Repetirlo” significa repetir aquilo que foi dito.', '🔁', 'conversation', 'Use quando não ouviu ou não entendeu uma frase.'),
  lesson('es24', 'Não entendo esta palavra.', ['No', 'entiendo', 'esta', 'palabra.'], '“No entiendo” comunica que algo não ficou claro.', '💬', 'conversation', 'Peça ajuda com uma palavra desconhecida numa conversa.'),
  lesson('es25', 'Tenho uma reunião às dez.', ['Tengo', 'una', 'reunión', 'a', 'las', 'diez.'], 'Use “a las” antes de um horário.', '🗓️', 'work', 'Avise um colega sobre o horário de uma reunião.'),
  lesson('es26', 'Preciso terminar esta tarefa.', ['Necesito', 'terminar', 'esta', 'tarea.'], 'Depois de “necesito”, o verbo seguinte fica no infinitivo.', '📝', 'study', 'Fale sobre uma atividade de estudo que ainda precisa concluir.'),
  lesson('es27', 'Preciso de um médico.', ['Necesito', 'un', 'médico.'], '“Necesito un…” é uma forma direta de pedir algo essencial.', '🩺', 'emergency', 'Use para pedir atendimento médico.'),
  lesson('es28', 'Não estou me sentindo bem.', ['No', 'me', 'encuentro', 'bien.'], '“No me encuentro bien” é uma forma comum de dizer que está indisposto.', '🌡️', 'wellbeing', 'Explique que está passando mal ou indisposto.'),
  lesson('es29', 'Onde fica o banheiro?', ['¿Dónde', 'está', 'el', 'baño?'], '“¿Dónde está…?” também serve para perguntar onde fica um lugar.', '🚻', 'daily', 'Pergunte onde encontrar o banheiro em um local público.'),
  lesson('es30', 'Que horas são?', ['¿Qué', 'hora', 'es?'], 'A pergunta “¿Qué hora es?” significa “Que horas são?”.', '🕒', 'daily', 'Pergunte as horas durante uma conversa ou passeio.'),
  lesson('es31', 'Estou procurando este endereço.', ['Estoy', 'buscando', 'esta', 'dirección.'], '“Estoy buscando” significa “estou procurando”.', '📍', 'travel', 'Mostre um endereço a alguém e explique o que está procurando.'),
  lesson('es32', 'Um copo de água, por favor.', ['Un', 'vaso', 'de', 'agua,', 'por', 'favor.'], '“Un vaso de…” indica um copo de alguma bebida.', '🥛', 'food', 'Peça água em um café ou restaurante.'),
  lesson('es33', 'Dá para ir a pé até a estação?', ['¿Se', 'puede', 'ir', 'a', 'pie', 'hasta', 'la', 'estación?'], '“A pie” significa “a pé”.', '🚶', 'travel', 'Confirme se a estação pode ser alcançada caminhando.'),
  lesson('es34', 'Posso tirar uma foto aqui?', ['¿Puedo', 'hacer', 'una', 'foto', 'aquí?'], '“¿Puedo…?” pergunta se você pode fazer algo.', '📷', 'conversation', 'Peça permissão antes de fotografar em um local.'),
  lesson('es35', 'Hoje está muito quente.', ['Hoy', 'hace', 'mucho', 'calor.'], 'Para falar do clima, o espanhol usa “hace calor”.', '☀️', 'daily', 'Comente o clima durante uma conversa.'),
  lesson('es36', 'Falo um pouco de português.', ['Hablo', 'un', 'poco', 'de', 'portugués.'], '“Un poco de” significa “um pouco de”.', '🗣️', 'conversation', 'Explique quais idiomas você consegue falar.'),
  lesson('es37', 'Vou esperar aqui.', ['Voy', 'a', 'esperar', 'aquí.'], '“Ir a” seguido de um verbo expressa uma ação futura próxima.', '⏳', 'daily', 'Avise alguém onde você vai esperar.'),
  lesson('es38', 'Quero confirmar a reserva.', ['Quiero', 'confirmar', 'la', 'reserva.'], '“Quiero” significa “quero”; depois dele vem o infinitivo.', '🛎️', 'travel', 'Confirme os detalhes de uma reserva em um hotel.'),
  lesson('es39', 'O que esta palavra significa?', ['¿Qué', 'significa', 'esta', 'palabra?'], '“¿Qué significa…?” pergunta o significado de algo.', '📖', 'study', 'Pergunte o significado de uma palavra nova.'),
  lesson('es40', 'O que você recomenda?', ['¿Qué', 'me', 'recomienda?'], '“Recomendar” é recomendar ou sugerir; “me” indica para mim.', '💡', 'food', 'Peça uma sugestão a alguém em um restaurante ou loja.'),
  lesson('es41', 'Vocês aceitam cartão?', ['¿Aceptan', 'tarjeta?'], '“¿Aceptan…?” pergunta se um estabelecimento aceita algo.', '💳', 'shopping', 'Pergunte sobre formas de pagamento antes de comprar.'),
  lesson('es42', 'Preciso de um lugar para descansar.', ['Necesito', 'un', 'lugar', 'para', 'descansar.'], '“Necesito” expressa necessidade; “descansar” significa descansar.', '🪑', 'wellbeing', 'Peça ajuda para encontrar um local tranquilo.'),
  lesson('es43', 'Por favor, escreva isso para mim.', ['Escriba', 'eso', 'para', 'mí,', 'por', 'favor.'], '“Escriba” é uma forma educada de pedir que alguém escreva.', '✍️', 'study', 'Peça que anotem uma informação importante.'),
  lesson('es44', 'O ponto de ônibus fica perto.', ['La', 'parada', 'de', 'autobús', 'está', 'cerca.'], '“Cerca” significa perto ou nas proximidades.', '🚌', 'travel', 'Pergunte ou informe onde fica o ponto de ônibus.'),
  lesson('es45', 'Até a semana que vem!', ['¡Hasta', 'la', 'próxima', 'semana!'], '“Hasta la próxima semana” é uma despedida para a semana seguinte.', '👋', 'greetings', 'Despeça-se de alguém que você verá na próxima semana.')
);

PHRASES.fr.push(
  lesson('fr11', 'Preciso de uma passagem para o aeroporto.', ["J’ai", 'besoin', "d’un", 'billet', 'pour', "l’aéroport."], '“Avoir besoin de” significa “precisar de”.', '✈️', 'travel', 'Na bilheteria ou ao organizar o trajeto até o aeroporto.'),
  lesson('fr12', 'Como chego ao centro da cidade?', ['Comment', 'aller', 'au', 'centre-ville', '?'], '“Comment aller à…?” pede instruções de caminho.', '🗺️', 'travel', 'Pergunte a alguém como chegar à região central.'),
  lesson('fr13', 'Tenho uma reserva.', ["J’ai", 'une', 'réservation.'], '“J’ai” é a forma contraída de “je ai”.', '🛎️', 'travel', 'Confirme sua reserva ao chegar ao hotel ou restaurante.'),
  lesson('fr14', 'Onde fica a estação de metrô?', ['Où', 'se', 'trouve', 'la', 'station', 'de', 'métro', '?'], '“Où se trouve…?” pergunta onde fica algo.', '🚇', 'travel', 'Peça ajuda para encontrar uma estação durante o passeio.'),
  lesson('fr15', 'Uma mesa para duas pessoas, por favor.', ['Une', 'table', 'pour', 'deux,', "s’il", 'vous', 'plaît.'], '“S’il vous plaît” é a forma educada de dizer “por favor”.', '🍽️', 'food', 'Use ao pedir uma mesa em um restaurante.'),
  lesson('fr16', 'Posso ver o cardápio, por favor?', ['Puis-je', 'voir', 'la', 'carte,', "s’il", 'vous', 'plaît', '?'], '“Puis-je…?” é uma forma polida de perguntar “posso?”.', '📋', 'food', 'Peça o cardápio antes de escolher o que vai comer.'),
  lesson('fr17', 'A comida está deliciosa.', ['Le', 'repas', 'est', 'délicieux.'], '“Délicieux” descreve algo muito saboroso.', '😋', 'food', 'Comente a comida durante ou depois da refeição.'),
  lesson('fr18', 'Vocês têm uma opção vegetariana?', ['Avez-vous', 'une', 'option', 'végétarienne', '?'], '“Avez-vous…?” pergunta educadamente se há algo disponível.', '🥗', 'food', 'Pergunte sobre opções do cardápio antes de fazer o pedido.'),
  lesson('fr19', 'Posso pagar com cartão?', ['Puis-je', 'payer', 'par', 'carte', '?'], '“Puis-je…?” pergunta se você pode fazer algo.', '💳', 'shopping', 'Confirme a forma de pagamento em uma loja ou restaurante.'),
  lesson('fr20', 'Quanto custa este aqui?', ['Combien', 'coûte', 'celui-ci', '?'], '“Combien coûte…?” pergunta o preço de algo.', '🏷️', 'shopping', 'Pergunte o preço de um item que está apontando.'),
  lesson('fr21', 'Estou só olhando, obrigado.', ['Je', 'regarde', 'seulement,', 'merci.'], '“Seulement” significa “somente/só”.', '🛍️', 'shopping', 'Diga isso quando um vendedor oferecer ajuda e você ainda estiver escolhendo.'),
  lesson('fr22', 'Pode falar mais devagar?', ['Pourriez-vous', 'parler', 'plus', 'lentement', '?'], '“Pourriez-vous…?” faz um pedido formal e educado.', '🐢', 'conversation', 'Peça um ritmo mais lento quando estiver difícil acompanhar.'),
  lesson('fr23', 'Pode repetir, por favor?', ['Pouvez-vous', 'répéter,', "s’il", 'vous', 'plaît', '?'], '“Pouvez-vous…?” pergunta educadamente se alguém pode fazer algo.', '🔁', 'conversation', 'Use quando não ouviu ou não entendeu uma frase.'),
  lesson('fr24', 'Não entendo esta palavra.', ['Je', 'ne', 'comprends', 'pas', 'ce', 'mot.'], 'Em uma negação padrão, “ne” e “pas” envolvem o verbo.', '💬', 'conversation', 'Peça ajuda com uma palavra desconhecida numa conversa.'),
  lesson('fr25', 'Tenho uma reunião às dez.', ["J’ai", 'une', 'réunion', 'à', 'dix', 'heures.'], 'Use “à” antes de um horário específico.', '🗓️', 'work', 'Avise um colega sobre o horário de uma reunião.'),
  lesson('fr26', 'Preciso terminar esta tarefa.', ['Je', 'dois', 'finir', 'ce', 'devoir.'], '“Je dois” significa “preciso/devo”; o próximo verbo fica no infinitivo.', '📝', 'study', 'Fale sobre uma atividade de estudo que ainda precisa concluir.'),
  lesson('fr27', 'Preciso de um médico.', ['J’ai', 'besoin', "d’un", 'médecin.'], '“Avoir besoin de” significa “precisar de”.', '🩺', 'emergency', 'Use para pedir atendimento médico.'),
  lesson('fr28', 'Não estou me sentindo bem.', ['Je', 'ne', 'me', 'sens', 'pas', 'bien.'], '“Je me sens bien” significa “estou me sentindo bem”; “ne…pas” inverte o sentido.', '🌡️', 'wellbeing', 'Explique que está passando mal ou indisposto.'),
  lesson('fr29', 'Onde fica o banheiro?', ['Où', 'sont', 'les', 'toilettes', '?'], 'Em francês, “les toilettes” normalmente é usado no plural.', '🚻', 'daily', 'Pergunte onde encontrar o banheiro em um local público.'),
  lesson('fr30', 'Que horas são?', ['Quelle', 'heure', 'est-il', '?'], 'A expressão “Quelle heure est-il ?” pergunta as horas.', '🕒', 'daily', 'Pergunte as horas durante uma conversa ou passeio.'),
  lesson('fr31', 'Estou procurando este endereço.', ['Je', 'cherche', 'cette', 'adresse.'], '“Je cherche…” significa “estou procurando…”.', '📍', 'travel', 'Mostre um endereço a alguém e explique o que está procurando.'),
  lesson('fr32', 'Um copo de água, por favor.', ['Un', 'verre', 'd’eau,', 's’il', 'vous', 'plaît.'], '“Un verre de…” indica um copo de alguma bebida.', '🥛', 'food', 'Peça água em um café ou restaurante.'),
  lesson('fr33', 'Dá para ir a pé até a estação?', ['Peut-on', 'aller', 'à', 'pied', 'jusqu’à', 'la', 'gare', '?'], '“À pied” significa “a pé”.', '🚶', 'travel', 'Confirme se a estação pode ser alcançada caminhando.'),
  lesson('fr34', 'Posso tirar uma foto aqui?', ['Est-ce', 'que', 'je', 'peux', 'prendre', 'une', 'photo', 'ici', '?'], '“Est-ce que je peux…?” pede permissão de forma comum.', '📷', 'conversation', 'Peça permissão antes de fotografar em um local.'),
  lesson('fr35', 'Hoje está muito quente.', ['Il', 'fait', 'très', 'chaud', 'aujourd’hui.'], '“Il fait chaud” é a expressão usada para dizer que está quente.', '☀️', 'daily', 'Comente o clima durante uma conversa.'),
  lesson('fr36', 'Falo um pouco de português.', ['Je', 'parle', 'un', 'peu', 'portugais.'], '“Un peu” significa “um pouco”.', '🗣️', 'conversation', 'Explique quais idiomas você consegue falar.'),
  lesson('fr37', 'Vou esperar aqui.', ['Je', 'vais', 'attendre', 'ici.'], '“Je vais” seguido do infinitivo fala de uma ação futura próxima.', '⏳', 'daily', 'Avise alguém onde você vai esperar.'),
  lesson('fr38', 'Quero confirmar a reserva.', ['Je', 'voudrais', 'confirmer', 'la', 'réservation.'], '“Je voudrais” é uma forma educada de dizer “eu gostaria”.', '🛎️', 'travel', 'Confirme os detalhes de uma reserva em um hotel.'),
  lesson('fr39', 'O que esta palavra significa?', ['Que', 'signifie', 'ce', 'mot', '?'], '“Que signifie…?” pergunta o significado de algo.', '📖', 'study', 'Pergunte o significado de uma palavra nova.'),
  lesson('fr40', 'O que você recomenda?', ['Qu’est-ce', 'que', 'vous', 'conseillez', '?'], '“Conseiller” significa aconselhar ou recomendar.', '💡', 'food', 'Peça uma sugestão a alguém em um restaurante ou loja.'),
  lesson('fr41', 'Vocês aceitam cartão?', ['Acceptez-vous', 'la', 'carte', '?'], '“Acceptez-vous…?” pergunta educadamente se algo é aceito.', '💳', 'shopping', 'Pergunte sobre formas de pagamento antes de comprar.'),
  lesson('fr42', 'Preciso de um lugar para descansar.', ['J’ai', 'besoin', 'd’un', 'endroit', 'pour', 'me', 'reposer.'], '“Avoir besoin de” significa precisar de algo.', '🪑', 'wellbeing', 'Peça ajuda para encontrar um local tranquilo.'),
  lesson('fr43', 'Por favor, escreva isso para mim.', ['Écrivez', 'cela', 'pour', 'moi,', 's’il', 'vous', 'plaît.'], '“Écrivez” é uma forma educada de pedir que alguém escreva.', '✍️', 'study', 'Peça que anotem uma informação importante.'),
  lesson('fr44', 'O ponto de ônibus fica perto.', ['L’arrêt', 'de', 'bus', 'est', 'tout', 'près.'], '“Tout près” significa bem perto.', '🚌', 'travel', 'Pergunte ou informe onde fica o ponto de ônibus.'),
  lesson('fr45', 'Até a semana que vem!', ['À', 'la', 'semaine', 'prochaine', '!'], '“À la semaine prochaine” é uma despedida para a semana seguinte.', '👋', 'greetings', 'Despeça-se de alguém que você verá na próxima semana.')
);

PHRASES.ja.push(
  lesson('ja11', 'Preciso de uma passagem para o aeroporto.', ['空港', 'まで', 'の', '切符', 'が', '必要', 'です'], '“必要です” expressa que algo é necessário.', '✈️', 'travel', 'Na bilheteria ou ao organizar o trajeto até o aeroporto.'),
  lesson('ja12', 'Como chego ao centro da cidade?', ['中心街', 'へ', 'は', 'どう', '行けば', 'いい', 'ですか'], '“どう行けばいいですか” pergunta como chegar a um lugar.', '🗺️', 'travel', 'Pergunte a alguém como chegar à região central.'),
  lesson('ja13', 'Tenho uma reserva.', ['予約', 'が', 'あります'], '“あります” indica que você tem ou existe algo.', '🛎️', 'travel', 'Confirme sua reserva ao chegar ao hotel ou restaurante.'),
  lesson('ja14', 'Onde fica a estação de metrô?', ['地下鉄', 'の', '駅', 'は', 'どこ', 'ですか'], '“どこですか” pergunta onde algo fica.', '🚇', 'travel', 'Peça ajuda para encontrar uma estação durante o passeio.'),
  lesson('ja15', 'Uma mesa para duas pessoas, por favor.', ['二人', '用', 'の', 'テーブル', 'を', 'お願いします'], '“お願いします” deixa o pedido educado.', '🍽️', 'food', 'Use ao pedir uma mesa em um restaurante.'),
  lesson('ja16', 'Posso ver o cardápio, por favor?', ['メニュー', 'を', '見せて', 'ください'], '“見せてください” significa “por favor, mostre”.', '📋', 'food', 'Peça o cardápio antes de escolher o que vai comer.'),
  lesson('ja17', 'A comida está deliciosa.', ['料理', 'が', 'おいしい', 'です'], '“おいしい” descreve algo saboroso.', '😋', 'food', 'Comente a comida durante ou depois da refeição.'),
  lesson('ja18', 'Vocês têm uma opção vegetariana?', ['ベジタリアン', '向け', 'の', 'メニュー', 'は', 'あります', 'か'], '“ありますか” pergunta se algo existe ou está disponível.', '🥗', 'food', 'Pergunte sobre opções do cardápio antes de fazer o pedido.'),
  lesson('ja19', 'Posso pagar com cartão?', ['カード', 'で', '払え', 'ます', 'か'], '“で” indica o meio usado para fazer algo.', '💳', 'shopping', 'Confirme a forma de pagamento em uma loja ou restaurante.'),
  lesson('ja20', 'Quanto custa este aqui?', ['これ', 'は', 'いくら', 'ですか'], '“いくらですか” pergunta quanto algo custa.', '🏷️', 'shopping', 'Pergunte o preço de um item que está apontando.'),
  lesson('ja21', 'Estou só olhando, obrigado.', ['見ている', 'だけ', 'です', 'ありがとう'], '“だけ” significa “somente/só”.', '🛍️', 'shopping', 'Diga isso quando alguém oferecer ajuda e você ainda estiver escolhendo.'),
  lesson('ja22', 'Pode falar mais devagar?', ['もう', '少し', 'ゆっくり', '話して', 'ください'], '“ください” torna o pedido mais educado.', '🐢', 'conversation', 'Peça um ritmo mais lento quando estiver difícil acompanhar.'),
  lesson('ja23', 'Pode repetir, por favor?', ['もう', '一度', '言って', 'ください'], '“もう一度” significa “mais uma vez”.', '🔁', 'conversation', 'Use quando não ouviu ou não entendeu uma frase.'),
  lesson('ja24', 'Não entendo esta palavra.', ['この', '言葉', 'が', 'わかりません'], '“わかりません” significa “não entendo/não sei”.', '💬', 'conversation', 'Peça ajuda com uma palavra desconhecida numa conversa.'),
  lesson('ja25', 'Tenho uma reunião às dez.', ['十時', 'に', '会議', 'が', 'あります'], '“に” marca o horário de um compromisso.', '🗓️', 'work', 'Avise um colega sobre o horário de uma reunião.'),
  lesson('ja26', 'Preciso terminar esta tarefa.', ['この', '課題', 'を', '終わらせる', '必要', 'が', 'あります'], '“必要があります” expressa que algo precisa ser feito.', '📝', 'study', 'Fale sobre uma atividade de estudo que ainda precisa concluir.'),
  lesson('ja27', 'Preciso de um médico.', ['医者', 'が', '必要', 'です'], '“必要です” expressa uma necessidade.', '🩺', 'emergency', 'Use para pedir atendimento médico.'),
  lesson('ja28', 'Não estou me sentindo bem.', ['気分', 'が', 'よく', 'ありません'], '“気分がよくありません” é uma forma comum de dizer que está indisposto.', '🌡️', 'wellbeing', 'Explique que está passando mal ou indisposto.'),
  lesson('ja29', 'Onde fica o banheiro?', ['トイレ', 'は', 'どこ', 'ですか'], '“どこですか” pergunta onde fica um lugar.', '🚻', 'daily', 'Pergunte onde encontrar o banheiro em um local público.'),
  lesson('ja30', 'Que horas são?', ['今', '何時', 'ですか'], '“今” significa “agora”; “何時” significa “que horas”.', '🕒', 'daily', 'Pergunte as horas durante uma conversa ou passeio.'),
  lesson('ja31', 'Estou procurando este endereço.', ['この', '住所', 'を', '探して', 'います'], '“探しています” significa “estou procurando”.', '📍', 'travel', 'Mostre um endereço a alguém e explique o que está procurando.'),
  lesson('ja32', 'Um copo de água, por favor.', ['水', 'を', '一杯', 'ください'], '“ください” transforma a frase em um pedido educado.', '🥛', 'food', 'Peça água em um café ou restaurante.'),
  lesson('ja33', 'Dá para ir a pé até a estação?', ['駅', 'まで', '歩いて', '行けます', 'か'], '“歩いて” significa “a pé”; “行けますか” pergunta se é possível ir.', '🚶', 'travel', 'Confirme se a estação pode ser alcançada caminhando.'),
  lesson('ja34', 'Posso tirar uma foto aqui?', ['ここ', 'で', '写真', 'を', '撮って', 'も', 'いい', 'ですか'], '“～てもいいですか” pede permissão para fazer algo.', '📷', 'conversation', 'Peça permissão antes de fotografar em um local.'),
  lesson('ja35', 'Hoje está muito quente.', ['今日', 'は', 'とても', '暑い', 'です'], '“暑い” descreve o clima quente.', '☀️', 'daily', 'Comente o clima durante uma conversa.'),
  lesson('ja36', 'Falo um pouco de português.', ['ポルトガル語', 'を', '少し', '話します'], '“少し” significa “um pouco”.', '🗣️', 'conversation', 'Explique quais idiomas você consegue falar.'),
  lesson('ja37', 'Vou esperar aqui.', ['ここ', 'で', '待って', 'います'], '“待っています” significa “estou esperando/vou esperar”.', '⏳', 'daily', 'Avise alguém onde você vai esperar.'),
  lesson('ja38', 'Quero confirmar a reserva.', ['予約', 'を', '確認', 'したい', 'です'], '“～したいです” expressa que você quer fazer algo.', '🛎️', 'travel', 'Confirme os detalhes de uma reserva em um hotel.'),
  lesson('ja39', 'O que é isto?', ['これ', 'は', '何', 'ですか'], '“何ですか” significa “o que é?”.', '❓', 'conversation', 'Pergunte sobre um objeto que você não conhece.'),
  lesson('ja40', 'O que você recomenda?', ['おすすめ', 'は', '何', 'ですか'], '“おすすめ” é uma recomendação ou sugestão.', '💡', 'food', 'Peça uma sugestão a alguém em um restaurante ou loja.'),
  lesson('ja41', 'Vocês aceitam cartão?', ['カード', 'は', '使えます', 'か'], '“使えますか” pergunta se algo pode ser usado.', '💳', 'shopping', 'Pergunte sobre formas de pagamento antes de comprar.'),
  lesson('ja42', 'Por favor, me ajude.', ['助けて', 'ください'], '“ください” deixa o pedido direto e educado.', '🆘', 'emergency', 'Peça ajuda quando precisar de apoio.'),
  lesson('ja43', 'Quero descansar um pouco.', ['少し', '休みたい', 'です'], '“～たいです” expressa vontade; “少し” significa um pouco.', '🪑', 'wellbeing', 'Diga que precisa fazer uma pausa.'),
  lesson('ja44', 'Onde fica o ponto de ônibus?', ['バス停', 'は', 'どこ', 'ですか'], '“どこですか” pergunta onde fica um lugar.', '🚌', 'travel', 'Pergunte onde encontrar o ponto de ônibus.'),
  lesson('ja45', 'Até a semana que vem!', ['また', '来週', '会いましょう'], '“来週” significa “na próxima semana”; “会いましょう” sugere nos vermos.', '👋', 'greetings', 'Despeça-se de alguém que você verá na próxima semana.')
);

PHRASES.ru.push(
  lesson('ru11', 'Preciso de uma passagem para o aeroporto.', ['Мне', 'нужен', 'билет', 'до', 'аэропорта.'], '“Мне нужен” expressa que algo é necessário para você.', '✈️', 'travel', 'Na bilheteria ou ao organizar o trajeto até o aeroporto.'),
  lesson('ru12', 'Como chego ao centro da cidade?', ['Как', 'добраться', 'до', 'центра?'], '“Как добраться до…?” pergunta como chegar a um lugar.', '🗺️', 'travel', 'Pergunte a alguém como chegar à região central.'),
  lesson('ru13', 'Tenho uma reserva.', ['У', 'меня', 'есть', 'бронь.'], '“У меня есть…” expressa que você tem algo.', '🛎️', 'travel', 'Confirme sua reserva ao chegar ao hotel ou restaurante.'),
  lesson('ru14', 'Onde fica a estação de metrô?', ['Где', 'находится', 'станция', 'метро?'], '“Где находится…?” pergunta onde algo fica.', '🚇', 'travel', 'Peça ajuda para encontrar uma estação durante o passeio.'),
  lesson('ru15', 'Uma mesa para duas pessoas, por favor.', ['Столик', 'на', 'двоих,', 'пожалуйста.'], '“На двоих” significa “para duas pessoas”.', '🍽️', 'food', 'Use ao pedir uma mesa em um restaurante.'),
  lesson('ru16', 'Posso ver o cardápio, por favor?', ['Можно', 'посмотреть', 'меню,', 'пожалуйста?'], '“Можно…?” pergunta educadamente se algo é possível.', '📋', 'food', 'Peça o cardápio antes de escolher o que vai comer.'),
  lesson('ru17', 'A comida está deliciosa.', ['Еда', 'очень', 'вкусная!'], '“Вкусная” descreve algo saboroso e concorda com “еда”.', '😋', 'food', 'Comente a comida durante ou depois da refeição.'),
  lesson('ru18', 'Vocês têm uma opção vegetariana?', ['У', 'вас', 'есть', 'вегетарианские', 'блюда?'], '“У вас есть…?” pergunta se há algo disponível.', '🥗', 'food', 'Pergunte sobre opções do cardápio antes de fazer o pedido.'),
  lesson('ru19', 'Posso pagar com cartão?', ['Можно', 'оплатить', 'картой?'], '“Можно…?” pergunta educadamente se algo é possível.', '💳', 'shopping', 'Confirme a forma de pagamento em uma loja ou restaurante.'),
  lesson('ru20', 'Quanto custa este aqui?', ['Сколько', 'стоит', 'вот', 'это?'], '“Сколько стоит…?” pergunta o preço de algo.', '🏷️', 'shopping', 'Pergunte o preço de um item que está apontando.'),
  lesson('ru21', 'Estou só olhando, obrigado.', ['Я', 'просто', 'смотрю,', 'спасибо.'], '“Просто” significa “só/apenas”.', '🛍️', 'shopping', 'Diga isso quando um vendedor oferecer ajuda e você ainda estiver escolhendo.'),
  lesson('ru22', 'Pode falar mais devagar?', ['Не', 'могли', 'бы', 'вы', 'говорить', 'помедленнее?'], '“Не могли бы вы…?” é um pedido formal e educado.', '🐢', 'conversation', 'Peça um ritmo mais lento quando estiver difícil acompanhar.'),
  lesson('ru23', 'Pode repetir, por favor?', ['Повторите,', 'пожалуйста.'], '“Повторите” é a forma educada de pedir que alguém repita.', '🔁', 'conversation', 'Use quando não ouviu ou não entendeu uma frase.'),
  lesson('ru24', 'Não entendo esta palavra.', ['Я', 'не', 'понимаю', 'это', 'слово.'], '“Не” vem antes do verbo para formar uma negação.', '💬', 'conversation', 'Peça ajuda com uma palavra desconhecida numa conversa.'),
  lesson('ru25', 'Tenho uma reunião às dez.', ['У', 'меня', 'встреча', 'в', 'десять.'], '“У меня” significa literalmente “comigo”, mas expressa que você tem algo.', '🗓️', 'work', 'Avise um colega sobre o horário de uma reunião.'),
  lesson('ru26', 'Preciso terminar esta tarefa.', ['Мне', 'нужно', 'закончить', 'это', 'задание.'], '“Мне нужно” expressa que você precisa fazer algo.', '📝', 'study', 'Fale sobre uma atividade de estudo que ainda precisa concluir.'),
  lesson('ru27', 'Preciso de um médico.', ['Мне', 'нужен', 'врач.'], '“Мне нужен” expressa que algo é necessário para você.', '🩺', 'emergency', 'Use para pedir atendimento médico.'),
  lesson('ru28', 'Não estou me sentindo bem.', ['Я', 'плохо', 'себя', 'чувствую.'], '“Плохо себя чувствую” significa que está se sentindo mal.', '🌡️', 'wellbeing', 'Explique que está passando mal ou indisposto.'),
  lesson('ru29', 'Onde fica o banheiro?', ['Где', 'находится', 'туалет?'], '“Где находится…?” também serve para perguntar onde fica um lugar.', '🚻', 'daily', 'Pergunte onde encontrar o banheiro em um local público.'),
  lesson('ru30', 'Que horas são?', ['Который', 'час?'], '“Который час?” é a pergunta comum para saber as horas.', '🕒', 'daily', 'Pergunte as horas durante uma conversa ou passeio.'),
  lesson('ru31', 'Estou procurando este endereço.', ['Я', 'ищу', 'этот', 'адрес.'], '“Я ищу…” significa “estou procurando…”.', '📍', 'travel', 'Mostre um endereço a alguém e explique o que está procurando.'),
  lesson('ru32', 'Um copo de água, por favor.', ['Дайте,', 'пожалуйста,', 'стакан', 'воды.'], '“Дайте, пожалуйста” é um pedido educado: “me dê, por favor”.', '🥛', 'food', 'Peça água em um café ou restaurante.'),
  lesson('ru33', 'Dá para ir a pé até a estação?', ['Можно', 'дойти', 'до', 'станции', 'пешком?'], '“Пешком” significa “a pé”.', '🚶', 'travel', 'Confirme se a estação pode ser alcançada caminhando.'),
  lesson('ru34', 'Posso tirar uma foto aqui?', ['Можно', 'здесь', 'сфотографировать?'], '“Можно…?” pergunta educadamente se algo é permitido.', '📷', 'conversation', 'Peça permissão antes de fotografar em um local.'),
  lesson('ru35', 'Hoje está muito quente.', ['Сегодня', 'очень', 'жарко.'], '“Жарко” descreve um clima quente.', '☀️', 'daily', 'Comente o clima durante uma conversa.'),
  lesson('ru36', 'Falo um pouco de português.', ['Я', 'говорю', 'по-португальски.'], '“Говорю по-…” significa “falo em…”.', '🗣️', 'conversation', 'Explique quais idiomas você consegue falar.'),
  lesson('ru37', 'Vou esperar aqui.', ['Я', 'буду', 'ждать', 'здесь.'], '“Буду ждать” significa “vou esperar”.', '⏳', 'daily', 'Avise alguém onde você vai esperar.'),
  lesson('ru38', 'Quero confirmar a reserva.', ['Я', 'хочу', 'подтвердить', 'бронь.'], '“Я хочу” significa “eu quero”; depois vem o infinitivo.', '🛎️', 'travel', 'Confirme os detalhes de uma reserva em um hotel.'),
  lesson('ru39', 'O que é isto?', ['Что', 'это', 'такое?'], '“Что это такое?” pergunta o que é algo.', '❓', 'conversation', 'Pergunte sobre um objeto que você não conhece.'),
  lesson('ru40', 'O que você recomenda?', ['Что', 'вы', 'посоветуете?'], '“Посоветуете” significa “recomenda/sugere” em uma pergunta educada.', '💡', 'food', 'Peça uma sugestão a alguém em um restaurante ou loja.'),
  lesson('ru41', 'Onde fica o caixa eletrônico mais próximo?', ['Где', 'ближайший', 'банкомат?'], '“Ближайший” significa “mais próximo”; “банкомат” é caixa eletrônico.', '🏧', 'shopping', 'Pergunte onde encontrar um caixa eletrônico.'),
  lesson('ru42', 'Por favor, chame um médico.', ['Позовите', 'врача,', 'пожалуйста.'], '“Позовите” é um pedido educado para chamar alguém.', '🩺', 'emergency', 'Peça ajuda para chamar um médico.'),
  lesson('ru43', 'Preciso descansar um pouco.', ['Мне', 'нужно', 'немного', 'отдохнуть.'], '“Мне нужно” expressa necessidade; “отдохнуть” é descansar.', '🪑', 'wellbeing', 'Diga que precisa fazer uma pausa.'),
  lesson('ru44', 'Onde fica o ponto de ônibus mais próximo?', ['Где', 'ближайшая', 'автобусная', 'остановка?'], '“Ближайшая” significa “mais próxima”.', '🚌', 'travel', 'Pergunte onde encontrar o ponto de ônibus mais próximo.'),
  lesson('ru45', 'Até a semana que vem!', ['До', 'встречи', 'на', 'следующей', 'неделе!'], '“До встречи” significa “até nos vermos”.', '👋', 'greetings', 'Despeça-se de alguém que você verá na próxima semana.')
);

const READINGS = {
  ja: {
    ja1: 'Kōhī ga suki desu', ja2: 'ohayoo gozaimasu', ja3: 'Eki wa doko desu ka', ja4: 'Tasuke ga hitsuyō desu',
    ja5: 'Dōmo arigatō gozaimasu', ja6: 'Okaikei o onegaishimasu', ja7: 'Benkyō shite imasu', ja8: 'Ikura desu ka',
    ja9: 'Hajimemashite', ja10: 'Mata ashita', ja11: 'Kūkō made no kippu ga hitsuyō desu',
    ja12: 'Chūshingai e wa dō ikeba ii desu ka', ja13: 'Yoyaku ga arimasu', ja14: 'Chikatetsu no eki wa doko desu ka',
    ja15: 'Futari-yō no tēburu o onegaishimasu', ja16: 'Menyū o misete kudasai', ja17: 'Ryōri ga oishii desu',
    ja18: 'Bejitarian-muke no menyū wa arimasu ka', ja19: 'Kādo de haraemasu ka', ja20: 'Kore wa ikura desu ka',
    ja21: 'Mite iru dake desu, arigatō', ja22: 'Mō sukoshi yukkuri hanashite kudasai', ja23: 'Mō ichido itte kudasai',
    ja24: 'Kono kotoba ga wakarimasen', ja25: 'Jūji ni kaigi ga arimasu', ja26: 'Kono kadai o owaraseru hitsuyō ga arimasu',
    ja27: 'Isha ga hitsuyō desu', ja28: 'Kibun ga yoku arimasen', ja29: 'Toire wa doko desu ka', ja30: 'Ima nanji desu ka',
    ja31: 'Kono jūsho o sagashite imasu', ja32: 'Mizu o ippai kudasai', ja33: 'Eki made aruite ikemasu ka',
    ja34: 'Koko de shashin o totte mo ii desu ka', ja35: 'Kyō wa totemo atsui desu', ja36: 'Porutogarugo o sukoshi hanashimasu',
    ja37: 'Koko de matte imasu', ja38: 'Yoyaku o kakunin shitai desu', ja39: 'Kore wa nan desu ka', ja40: 'Osusume wa nan desu ka',
    ja41: 'Kādo wa tsukaemasu ka', ja42: 'Tasukete kudasai', ja43: 'Sukoshi yasumitai desu', ja44: 'Basutei wa doko desu ka',
    ja45: 'Mata raishū aimashō'
  },
  ru: {
    ru1: 'Mne nrávitsya kófe', ru2: 'Dóbroye útro', ru3: 'Gde nakhóditsya vokzál', ru4: 'Mne nuzhná pómoshch',
    ru5: 'Bolshóye spasíbo', ru6: 'Shchyot, pozhalúysta', ru7: 'Ya uchús', ru8: 'Skólko éto stóit',
    ru9: 'Priyátno poznakómitsya', ru10: 'Do závtra', ru11: 'Mne núzhen bilét do aeropórta',
    ru12: 'Kak dobrátsya do tséntra', ru13: 'U menyá yest brón', ru14: 'Gde nakhóditsya stántsiya metró',
    ru15: 'Stólik na dvoíkh, pozhalúysta', ru16: 'Mózhno posmotrét menyú, pozhalúysta', ru17: 'Yedá óchen vkúsnaya',
    ru18: 'U vas yest vegetariánskiye blyúda', ru19: 'Mózhno oplatít kartoy', ru20: 'Skólko stóit vot éto',
    ru21: 'Ya prósto smotrú, spasíbo', ru22: 'Ne moglí by vy govorít pomédlenneye', ru23: 'Povtoríte, pozhalúysta',
    ru24: 'Ya ne ponimáyu éto slóvo', ru25: 'U menyá vstrécha v désyat', ru26: 'Mne núzhno zakónchit éto zadániye',
    ru27: 'Mne núzhen vrach', ru28: 'Ya plókho sebya chúvstvuyu', ru29: 'Gde nakhóditsya tualét', ru30: 'Kotóryy chas',
    ru31: 'Ya ishchú etot ádres', ru32: 'Dáyte, pozhalúysta, stakán vody', ru33: 'Mózhno doytí do stántsii peshkóm',
    ru34: 'Mózhno zdes sfotografírovat', ru35: 'Segódnya óchen zhárko', ru36: 'Ya govorýu po-portugálski',
    ru37: 'Ya búdu zhdat zdes', ru38: 'Ya khochú podtverdit brón', ru39: 'Chto éto takóye', ru40: 'Chto vy posovétuyete',
    ru41: 'Gde blizháyshiy bankomát', ru42: 'Pozovíte vrachá, pozhalúysta', ru43: 'Mne núzhno nemnógo otdokhnút',
    ru44: 'Gde blizháyshaya avtobúsnaya ostanóvka', ru45: 'Do vstréchi na sléduyushchey nédéle'
  }
};

for (const [language, readings] of Object.entries(READINGS)) {
  for (const phrase of PHRASES[language]) phrase.reading = readings[phrase.id];
}
