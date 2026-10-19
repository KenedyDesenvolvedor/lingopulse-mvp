import { EXTRA_LANGUAGES, EXTRA_ANSWERS, EXTRA_READINGS, romanizeKorean } from './additional-languages.js';
import { EXPANSION_ROWS } from './expansion-lessons.js';
import { EXPANSION_ROWS_MORE } from './expansion-lessons-more.js';

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
// Para escritas sem separação por espaços, usamos segmentos curtos no puzzle.
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

const TOPIC_GUIDANCE = {
  greetings: { emoji: '👋', hint: 'Repare na expressão usada para cumprimentar ou se despedir.', context: 'Use esta frase ao cumprimentar alguém, agradecer ou encerrar uma conversa.' },
  food: { emoji: '🍽️', hint: 'Identifique o alimento ou a expressão que forma o pedido.', context: 'Use em um café, restaurante ou ao falar sobre comida e bebida.' },
  travel: { emoji: '🧭', hint: 'Observe as palavras que indicam transporte, direção ou duração.', context: 'Use para pedir informações e organizar um deslocamento.' },
  emergency: { emoji: '🆘', hint: 'Esta frase comunica uma necessidade urgente; pratique-a em voz alta.', context: 'Use para explicar uma emergência e pedir ajuda rapidamente.' },
  conversation: { emoji: '💬', hint: 'Observe como a pergunta ou resposta mantém a conversa clara.', context: 'Use para conhecer alguém, esclarecer algo ou continuar uma conversa.' },
  study: { emoji: '📚', hint: 'Repare nas palavras relacionadas a estudar, entender e praticar.', context: 'Use ao conversar sobre estudos, exercícios e aprendizado.' },
  shopping: { emoji: '🛍️', hint: 'Identifique a expressão útil para escolher, pagar ou trocar um produto.', context: 'Use em lojas para perguntar, escolher ou pagar por algo.' },
  work: { emoji: '💼', hint: 'Observe as palavras que expressam tarefas, horários ou pedidos profissionais.', context: 'Use ao combinar horários e conversar com colegas de trabalho.' },
  wellbeing: { emoji: '🩺', hint: 'Repare na expressão que descreve uma sensação ou necessidade de saúde.', context: 'Use para explicar como você está e pedir apoio para cuidar da saúde.' },
  daily: { emoji: '🏠', hint: 'Observe o vocabulário que aparece em uma situação cotidiana.', context: 'Use em atividades e conversas do dia a dia.' }
};

// Each row contains the Portuguese prompt, five target-language versions,
// Japanese romaji, and Russian transliteration.
const TOPIC_LESSONS = {
  greetings: [
    ['Boa tarde!', 'Good afternoon!', '¡Buenas tardes!', 'Bon après-midi !', 'こんにちは！', 'Konnichiwa', 'Добрый день!', 'Dóbryy den'],
    ['Boa noite, até amanhã!', 'Good night, see you tomorrow!', '¡Buenas noches, hasta mañana!', 'Bonne nuit, à demain !', 'おやすみなさい|また|明日！', 'Oyasuminasai, mata ashita', 'Спокойной ночи, до завтра!', 'Spokóynoy nóchi, do závtra'],
    ['Bem-vindo à nossa cidade.', 'Welcome to our city.', 'Bienvenido a nuestra ciudad.', 'Bienvenue dans notre ville.', '私たちの|町へ|ようこそ。', 'Watashitachi no machi e yōkoso', 'Добро пожаловать в наш город.', 'Dobró pozhalovat v nash górod'],
    ['Fico feliz em ver você de novo.', 'I am happy to see you again.', 'Me alegra verte de nuevo.', 'Je suis heureux de vous revoir.', 'また|会えて|うれしい|です。', 'Mata aete ureshii desu', 'Я рад снова вас видеть.', 'Ya rád snóva vas vídet'],
    ['Como você está hoje?', 'How are you today?', '¿Cómo estás hoy?', 'Comment allez-vous aujourd’hui ?', '今日は|お元気|ですか？', 'Kyō wa ogenki desu ka', 'Как вы себя чувствуете сегодня?', 'Kak vy sebya chúvstvuyete segódnya'],
    ['Tenha um ótimo dia!', 'Have a great day!', '¡Que tengas un buen día!', 'Passez une excellente journée !', 'よい|一日を！', 'Yoi ichinichi o', 'Хорошего дня!', 'Khoróshego dnya'],
    ['Desejo uma boa viagem.', 'I wish you a safe trip.', 'Te deseo un buen viaje.', 'Je vous souhaite un bon voyage.', 'よい|旅を。', 'Yoi tabi o', 'Желаю вам хорошей поездки.', 'Zheláyu vam khoróshey póyezki'],
    ['Parabéns pelo seu aniversário!', 'Happy birthday!', '¡Feliz cumpleaños!', 'Joyeux anniversaire !', 'お誕生日|おめでとう|ございます！', 'Otanjōbi omedetō gozaimasu', 'С днём рождения!', 'S dnyom rozhdéniya'],
    ['Obrigado por ter vindo.', 'Thank you for coming.', 'Gracias por venir.', 'Merci d’être venu.', '来て|くれて|ありがとう。', 'Kite kurete arigatō', 'Спасибо, что пришли.', 'Spasíbo, chto prishlí'],
    ['Foi bom conhecer você.', 'It was nice meeting you.', 'Fue un placer conocerte.', 'Ravi de vous avoir rencontré.', 'お会いできて|よかった|です。', 'Oai dekite yokatta desu', 'Было приятно познакомиться.', 'Býlo priyátno poznakómitsya'],
    ['Até mais tarde!', 'See you later!', '¡Hasta luego!', 'À tout à l’heure !', 'また|後で！', 'Mata ato de', 'До скорого!', 'Do skórógo'],
    ['Cuide-se!', 'Take care!', '¡Cuídate!', 'Prenez soin de vous !', 'お元気で！', 'Ogenki de', 'Берегите себя!', 'Beregíte sebya']
  ],
  food: [
    ['Estou com fome.', 'I am hungry.', 'Tengo hambre.', 'J’ai faim.', 'お腹が|すきました。', 'Onaka ga sukimashita', 'Я хочу есть.', 'Ya khochú yest'],
    ['Estou com sede.', 'I am thirsty.', 'Tengo sed.', 'J’ai soif.', '喉が|渇きました。', 'Nodo ga kawakimashita', 'Я хочу пить.', 'Ya khochú pit'],
    ['Sem açúcar, por favor.', 'No sugar, please.', 'Sin azúcar, por favor.', 'Sans sucre, s’il vous plaît.', '砂糖|なしで|お願いします。', 'Satō nashi de onegaishimasu', 'Без сахара, пожалуйста.', 'Bez sákhara, pozhalúysta'],
    ['Pode trazer a sobremesa?', 'Could you bring the dessert?', '¿Puede traer el postre?', 'Pourriez-vous apporter le dessert ?', 'デザートを|お願いします。', 'Dezāto o onegaishimasu', 'Принесите десерт, пожалуйста.', 'Prinesíte desért, pozhalúysta'],
    ['A sopa está muito quente.', 'The soup is very hot.', 'La sopa está muy caliente.', 'La soupe est très chaude.', 'スープが|とても|熱い|です。', 'Sūpu ga totemo atsui desu', 'Суп очень горячий.', 'Sup óchen goryáchiy'],
    ['Posso pedir o prato do dia?', 'Can I order the dish of the day?', '¿Puedo pedir el plato del día?', 'Puis-je commander le plat du jour ?', '今日の|料理を|注文|できますか？', 'Kyō no ryōri o chūmon dekimasu ka', 'Можно заказать блюдо дня?', 'Mózhno zakazát blyúdo dnya'],
    ['A comida estava deliciosa.', 'The meal was delicious.', 'La comida estuvo deliciosa.', 'Le repas était délicieux.', '料理は|とても|おいしかった|です。', 'Ryōri wa totemo oishikatta desu', 'Еда была очень вкусной.', 'Yedá bylá óchen vkúsnoy']
  ],
  travel: [
    ['Este ônibus vai ao centro?', 'Does this bus go downtown?', '¿Este autobús va al centro?', 'Est-ce que ce bus va au centre-ville ?', 'このバスは|中心街へ|行きますか？', 'Kono basu wa chūshingai e ikimasu ka', 'Этот автобус идёт в центр?', 'Étot avtóbus idyót v tséntr'],
    ['Preciso trocar de trem?', 'Do I need to change trains?', '¿Tengo que cambiar de tren?', 'Dois-je changer de train ?', '電車を|乗り換える|必要が|ありますか？', 'Densha o norikaeru hitsuyō ga arimasu ka', 'Мне нужно пересесть на другой поезд?', 'Mne núzhno peresést na drugóy póyezd'],
    ['Quero uma passagem de ida e volta.', 'I would like a round-trip ticket.', 'Quiero un billete de ida y vuelta.', 'Je voudrais un billet aller-retour.', '往復切符を|一枚|ください。', 'Ōfuku kippu o ichimai kudasai', 'Мне нужен билет туда и обратно.', 'Mne núzhen bilét tudá i obrátno'],
    ['Quanto tempo dura a viagem?', 'How long does the trip take?', '¿Cuánto dura el viaje?', 'Combien de temps dure le voyage ?', '旅行には|どのくらい|かかりますか？', 'Ryokō ni wa dono kurai kakarimasu ka', 'Сколько времени займёт поездка?', 'Skólko vrémeni zaymyót póyezka'],
    ['Meu voo foi cancelado.', 'My flight was canceled.', 'Mi vuelo fue cancelado.', 'Mon vol a été annulé.', '飛行機が|欠航に|なりました。', 'Hikōki ga kekkō ni narimashita', 'Мой рейс отменили.', 'Moy réys otmeníli'],
    ['Pode chamar um táxi?', 'Could you call a taxi?', '¿Puede llamar un taxi?', 'Pouvez-vous appeler un taxi ?', 'タクシーを|呼んで|もらえますか？', 'Takushī o yonde moraemasu ka', 'Вызовите такси, пожалуйста.', 'Vyzovíte taksí, pozhalúysta']
  ],
  emergency: [
    ['Chame a polícia, por favor.', 'Call the police, please.', 'Llame a la policía, por favor.', 'Appelez la police, s’il vous plaît.', '警察を|呼んで|ください。', 'Keisatsu o yonde kudasai', 'Вызовите полицию, пожалуйста.', 'Vyzovíte polítsiyu, pozhalúysta'],
    ['Preciso de uma ambulância.', 'I need an ambulance.', 'Necesito una ambulancia.', 'J’ai besoin d’une ambulance.', '救急車が|必要|です。', 'Kyūkyūsha ga hitsuyō desu', 'Мне нужна скорая помощь.', 'Mne nuzhná skóraya pómoshch'],
    ['Não consigo encontrar minha carteira.', 'I cannot find my wallet.', 'No encuentro mi cartera.', 'Je ne trouve pas mon portefeuille.', '財布が|見つかりません。', 'Saifu ga mitsukarimasen', 'Я не могу найти кошелёк.', 'Ya ne mogú naytí koshélyok'],
    ['Roubaram meu telefone.', 'Someone stole my phone.', 'Me robaron el teléfono.', 'On m’a volé mon téléphone.', '携帯電話を|盗まれました。', 'Keitai denwa o nusumaremashita', 'У меня украли телефон.', 'U menyá ukráli telefón'],
    ['Não sei onde estou.', 'I do not know where I am.', 'No sé dónde estoy.', 'Je ne sais pas où je suis.', '自分が|どこに|いるか|わかりません。', 'Jibun ga doko ni iru ka wakarimasen', 'Я не знаю, где нахожусь.', 'Ya ne znáyu, gde nakhozhús'],
    ['Não consigo encontrar meu hotel.', 'I cannot find my hotel.', 'No encuentro mi hotel.', 'Je ne trouve pas mon hôtel.', 'ホテルが|見つかりません。', 'Hoteru ga mitsukarimasen', 'Я не могу найти отель.', 'Ya ne mogú naytí otél'],
    ['Há um hospital por perto?', 'Is there a hospital nearby?', '¿Hay un hospital cerca?', 'Y a-t-il un hôpital près d’ici ?', '近くに|病院は|ありますか？', 'Chikaku ni byōin wa arimasu ka', 'Здесь поблизости есть больница?', 'Zdes poblízosti yest bolnítsa'],
    ['Não consigo respirar.', 'I cannot breathe.', 'No puedo respirar.', 'Je n’arrive pas à respirer.', '息が|できません。', 'Iki ga dekimasen', 'Я не могу дышать.', 'Ya ne mogú dyshát'],
    ['Estou com um ferimento.', 'I have an injury.', 'Tengo una herida.', 'J’ai une blessure.', 'けがを|しました。', 'Kega o shimashita', 'У меня травма.', 'U menyá trávma'],
    ['Preciso de ajuda agora.', 'I need help now.', 'Necesito ayuda ahora.', 'J’ai besoin d’aide maintenant.', '今すぐ|助けが|必要|です。', 'Ima sugu tasuke ga hitsuyō desu', 'Мне срочно нужна помощь.', 'Mne sróchno nuzhná pómoshch'],
    ['Não consigo encontrar meu passaporte.', 'I cannot find my passport.', 'No encuentro mi pasaporte.', 'Je ne trouve pas mon passeport.', 'パスポートが|見つかりません。', 'Pasupōto ga mitsukarimasen', 'Я не могу найти паспорт.', 'Ya ne mogú naytí pásport'],
    ['Pode chamar os bombeiros?', 'Can you call the fire department?', '¿Puede llamar a los bomberos?', 'Pouvez-vous appeler les pompiers ?', '消防署に|電話して|もらえますか？', 'Shōbōsho ni denwa shite moraemasu ka', 'Вызовите пожарных, пожалуйста.', 'Vyzovíte požárnykh, pozhalúysta'],
    ['Estou em perigo.', 'I am in danger.', 'Estoy en peligro.', 'Je suis en danger.', '危険な|状態|です。', 'Kiken na jōtai desu', 'Мне угрожает опасность.', 'Mne ugrozháyet opásnost']
  ],
  conversation: [
    ['De onde você é?', 'Where are you from?', '¿De dónde eres?', 'D’où venez-vous ?', 'ご出身は|どちら|ですか？', 'Goshusshin wa dochira desu ka', 'Откуда вы?', 'Otkúda vy'],
    ['Qual é o seu nome completo?', 'What is your full name?', '¿Cuál es tu nombre completo?', 'Quel est votre nom complet ?', 'お名前を|教えて|ください。', 'Onamae o oshiete kudasai', 'Как ваше полное имя?', 'Kak váshe pólnoye ímya'],
    ['O que você gosta de fazer?', 'What do you like to do?', '¿Qué te gusta hacer?', 'Qu’aimez-vous faire ?', '何を|するのが|好き|ですか？', 'Nani o suru no ga suki desu ka', 'Что вы любите делать?', 'Chto vy lyúbite délat'],
    ['Pode me mostrar no mapa?', 'Can you show me on the map?', '¿Puede mostrármelo en el mapa?', 'Vous pouvez me montrer sur la carte ?', '地図で|見せて|もらえますか？', 'Chizu de misete moraemasu ka', 'Можете показать мне на карте?', 'Mózhete pokazát mne na kárte'],
    ['Pode escrever seu nome?', 'Can you write your name?', '¿Puede escribir su nombre?', 'Pouvez-vous écrire votre nom ?', 'お名前を|書いて|もらえますか？', 'Onamae o kaite moraemasu ka', 'Можете написать своё имя?', 'Mózhete napisát svoyó ímya'],
    ['Não entendi a última parte.', 'I did not understand the last part.', 'No entendí la última parte.', 'Je n’ai pas compris la dernière partie.', '最後の|部分が|わかりませんでした。', 'Saigo no bubun ga wakarimasen deshita', 'Последняя часть мне непонятна.', 'Poslyédnyaya chast mne neponyatna'],
    ['Você fala português?', 'Do you speak Portuguese?', '¿Hablas portugués?', 'Parlez-vous portugais ?', 'ポルトガル語を|話しますか？', 'Porutogarugo o hanashimasu ka', 'Вы говорите по-португальски?', 'Vy govoríte po-portugálski'],
    ['Podemos conversar mais tarde?', 'Can we talk later?', '¿Podemos hablar más tarde?', 'Pouvons-nous parler plus tard ?', '後で|話せますか？', 'Ato de hanasemasu ka', 'Можем поговорить позже?', 'Mózhem pogovorít pózhe']
  ],
  study: [
    ['Estudo japonês todos os dias.', 'I study Japanese every day.', 'Estudio japonés todos los días.', 'J’étudie le japonais tous les jours.', '毎日|日本語を|勉強|しています。', 'Mainichi nihongo o benkyō shite imasu', 'Я изучаю японский каждый день.', 'Ya izucháyu yapónskiy kázhdyy den'],
    ['Tenho uma prova amanhã.', 'I have an exam tomorrow.', 'Tengo un examen mañana.', 'J’ai un examen demain.', '明日|試験が|あります。', 'Ashita shiken ga arimasu', 'У меня завтра экзамен.', 'U menyá závtra ekzámen'],
    ['Pode explicar esta regra?', 'Can you explain this rule?', '¿Puede explicar esta regla?', 'Pouvez-vous expliquer cette règle ?', 'この|規則を|説明して|もらえますか？', 'Kono kisoku o setsumei shite moraemasu ka', 'Можете объяснить это правило?', 'Mózhete obyásnit éto právilo'],
    ['Preciso revisar minhas anotações.', 'I need to review my notes.', 'Necesito repasar mis apuntes.', 'Je dois relire mes notes.', 'ノートを|復習する|必要が|あります。', 'Nōto o fukushū suru hitsuyō ga arimasu', 'Мне нужно повторить конспект.', 'Mne núzhno povtorít konspékt'],
    ['Como se pronuncia esta palavra?', 'How is this word pronounced?', '¿Cómo se pronuncia esta palabra?', 'Comment prononce-t-on ce mot ?', 'この|単語は|どう|発音しますか？', 'Kono tango wa dō hatsuon shimasu ka', 'Как произносится это слово?', 'Kak proiznósitsya éto slóvo'],
    ['Posso usar um dicionário?', 'May I use a dictionary?', '¿Puedo usar un diccionario?', 'Puis-je utiliser un dictionnaire ?', '辞書を|使っても|いいですか？', 'Jisho o tsukatte mo ii desu ka', 'Можно пользоваться словарём?', 'Mózhno pólzovatsya slovaryóm'],
    ['Aprendi uma palavra nova.', 'I learned a new word.', 'Aprendí una palabra nueva.', 'J’ai appris un nouveau mot.', '新しい|単語を|覚えました。', 'Atarashii tango o oboemashita', 'Я выучил новое слово.', 'Ya výuchil nóvoye slóvo'],
    ['Este exercício foi fácil.', 'This exercise was easy.', 'Este ejercicio fue fácil.', 'Cet exercice était facile.', 'この|練習は|簡単|でした。', 'Kono renshū wa kantan deshita', 'Это упражнение было лёгким.', 'Éto uprazhneniye býlo lyókhkim'],
    ['Esta frase está correta?', 'Is this sentence correct?', '¿Esta frase es correcta?', 'Cette phrase est-elle correcte ?', 'この|文は|正しい|ですか？', 'Kono bun wa tadashii desu ka', 'Это предложение правильное?', 'Éto predlozhéniye právilnoye'],
    ['Vamos estudar juntos.', 'Let us study together.', 'Estudiemos juntos.', 'Étudions ensemble.', '一緒に|勉強|しましょう。', 'Issho ni benkyō shimashō', 'Давайте заниматься вместе.', 'Daváyte zanimátsya vméste'],
    ['Estou praticando a escrita.', 'I am practicing writing.', 'Estoy practicando la escritura.', 'Je m’entraîne à écrire.', '書く|練習を|しています。', 'Kaku renshū o shite imasu', 'Я практикуюсь в письме.', 'Ya praktikúyus v pismé'],
    ['Preciso de mais exemplos.', 'I need more examples.', 'Necesito más ejemplos.', 'J’ai besoin de plus d’exemples.', 'もっと|例が|必要|です。', 'Motto rei ga hitsuyō desu', 'Мне нужно больше примеров.', 'Mne núzhno bolshe primerov'],
    ['Pode corrigir minha resposta?', 'Can you correct my answer?', '¿Puede corregir mi respuesta?', 'Pouvez-vous corriger ma réponse ?', '私の|答えを|直して|もらえますか？', 'Watashi no kotae o naoshite moraemasu ka', 'Можете исправить мой ответ?', 'Mózhete isprávit moy otvét']
  ],
  shopping: [
    ['Estou procurando uma lembrança.', 'I am looking for a souvenir.', 'Estoy buscando un recuerdo.', 'Je cherche un souvenir.', 'お土産を|探して|います。', 'Omiyage o sagashite imasu', 'Я ищу сувенир.', 'Ya ishchú suvenír'],
    ['Tem em outro tamanho?', 'Do you have another size?', '¿Lo tiene en otra talla?', 'Vous l’avez dans une autre taille ?', '別の|サイズは|ありますか？', 'Betsu no saizu wa arimasu ka', 'Есть другой размер?', 'Yest drugóy razmér'],
    ['Posso experimentar?', 'Can I try it on?', '¿Puedo probármelo?', 'Puis-je l’essayer ?', '試着しても|いいですか？', 'Shichaku shite mo ii desu ka', 'Можно примерить?', 'Mózhno primerít'],
    ['Onde posso pagar?', 'Where can I pay?', '¿Dónde puedo pagar?', 'Où puis-je payer ?', 'どこで|支払えますか？', 'Doko de shiharaemasu ka', 'Где можно оплатить?', 'Gde mózhno oplatít'],
    ['Vou levar este.', 'I will take this one.', 'Me llevo este.', 'Je prends celui-ci.', 'これを|ください。', 'Kore o kudasai', 'Я возьму вот это.', 'Ya vozmú vot éto'],
    ['Tem em outra cor?', 'Do you have it in another color?', '¿Lo tiene en otro color?', 'Vous l’avez dans une autre couleur ?', '別の|色は|ありますか？', 'Betsu no iro wa arimasu ka', 'Есть другой цвет?', 'Yest drugóy tsvet'],
    ['Vocês aceitam dinheiro?', 'Do you accept cash?', '¿Aceptan efectivo?', 'Acceptez-vous les espèces ?', '現金は|使えますか？', 'Genkin wa tsukaemasu ka', 'Вы принимаете наличные?', 'Vy prinimáyete nalíchnye'],
    ['Posso receber um recibo?', 'Could I get a receipt?', '¿Me puede dar un recibo?', 'Puis-je avoir un reçu ?', 'レシートを|もらえますか？', 'Reshīto o moraemasu ka', 'Можно получить чек?', 'Mózhno poluchít chek'],
    ['Este produto está em promoção?', 'Is this item on sale?', '¿Este producto está en oferta?', 'Cet article est-il en promotion ?', 'これは|セール|商品|ですか？', 'Kore wa sēru shōhin desu ka', 'Этот товар продаётся со скидкой?', 'Étot továr prodayótsya so skídkoy'],
    ['Preciso trocar este produto.', 'I need to exchange this item.', 'Necesito cambiar este producto.', 'Je dois échanger cet article.', 'この|商品を|交換する|必要が|あります。', 'Kono shōhin o kōkan suru hitsuyō ga arimasu', 'Мне нужно обменять этот товар.', 'Mne núzhno obmenyát étot továr']
  ],
  work: [
    ['Trabalho de casa às sextas-feiras.', 'I work from home on Fridays.', 'Trabajo desde casa los viernes.', 'Je travaille à la maison le vendredi.', '金曜日は|在宅で|働きます。', 'Kinyōbi wa zaitaku de hatarakimasu', 'По пятницам я работаю из дома.', 'Po pyátnitsam ya rabótayu iz dóma'],
    ['Pode enviar o relatório hoje?', 'Could you send the report today?', '¿Puede enviar el informe hoy?', 'Pouvez-vous envoyer le rapport aujourd’hui ?', '今日|レポートを|送って|もらえますか？', 'Kyō repōto o okutte moraemasu ka', 'Можете отправить отчёт сегодня?', 'Mózhete otprávit otchyót segódnya'],
    ['A reunião começa às nove.', 'The meeting starts at nine.', 'La reunión empieza a las nueve.', 'La réunion commence à neuf heures.', '会議は|九時に|始まります。', 'Kaigi wa kuji ni hajimarimasu', 'Совещание начинается в девять.', 'Soveshchániye nachináyetsya v dévyat'],
    ['Estou disponível depois do almoço.', 'I am available after lunch.', 'Estoy disponible después del almuerzo.', 'Je suis disponible après le déjeuner.', '昼食の|後なら|時間が|あります。', 'Chūshoku no ato nara jikan ga arimasu', 'Я свободен после обеда.', 'Ya svobóden pósle obéda'],
    ['Preciso marcar uma reunião.', 'I need to schedule a meeting.', 'Necesito programar una reunión.', 'Je dois organiser une réunion.', '会議を|設定する|必要が|あります。', 'Kaigi o settei suru hitsuyō ga arimasu', 'Мне нужно назначить совещание.', 'Mne núzhno naznáchit soveshchániye'],
    ['Estou trabalhando neste projeto.', 'I am working on this project.', 'Estoy trabajando en este proyecto.', 'Je travaille sur ce projet.', 'この|プロジェクトに|取り組んで|います。', 'Kono purojekuto ni torikunde imasu', 'Я работаю над этим проектом.', 'Ya rabótayu nad étim proyéktom'],
    ['Pode compartilhar o arquivo comigo?', 'Can you share the file with me?', '¿Puede compartir el archivo conmigo?', 'Pouvez-vous partager le fichier avec moi ?', 'ファイルを|共有して|もらえますか？', 'Fairu o kyōyū shite moraemasu ka', 'Можете поделиться со мной файлом?', 'Mózhete podelítsya so mnoy fáylom'],
    ['Terminei a tarefa.', 'I finished the task.', 'Terminé la tarea.', 'J’ai terminé la tâche.', '作業が|終わりました。', 'Sagyō ga owarimashita', 'Я закончил задание.', 'Ya zakónchil zadániye'],
    ['Preciso de um pouco mais de tempo.', 'I need a little more time.', 'Necesito un poco más de tiempo.', 'J’ai besoin d’un peu plus de temps.', 'もう少し|時間が|必要|です。', 'Mō sukoshi jikan ga hitsuyō desu', 'Мне нужно немного больше времени.', 'Mne núzhno nemnógo bolshe vrémeni'],
    ['Vamos conversar sobre os detalhes.', 'Let us discuss the details.', 'Hablemos de los detalles.', 'Parlons des détails.', '詳細に|ついて|話しましょう。', 'Shōsai ni tsuite hanashimashō', 'Давайте обсудим подробности.', 'Daváyte obsúdım podróbnosti'],
    ['Por favor, envie o contrato.', 'Please send the contract.', 'Envíe el contrato, por favor.', 'Veuillez envoyer le contrat.', '契約書を|送って|ください。', 'Keiyakusho o okutte kudasai', 'Отправьте договор, пожалуйста.', 'Otprávte dogovór, pozhalúysta'],
    ['Estou em uma chamada agora.', 'I am on a call right now.', 'Estoy en una llamada ahora.', 'Je suis en appel en ce moment.', '今|通話中|です。', 'Ima tsūwachuu desu', 'Я сейчас разговариваю по телефону.', 'Ya seychás razgovárivayu po telefónu'],
    ['Devo responder a este e-mail?', 'Should I reply to this email?', '¿Debo responder a este correo?', 'Dois-je répondre à cet e-mail ?', 'この|メールに|返信した|ほうが|いいですか？', 'Kono mēru ni henshin shita hō ga ii desu ka', 'Мне ответить на это письмо?', 'Mne otvétit na éto pismó'],
    ['Obrigado pela ajuda hoje.', 'Thank you for your help today.', 'Gracias por su ayuda hoy.', 'Merci pour votre aide aujourd’hui.', '今日は|手伝って|くれて|ありがとう。', 'Kyō wa tetsudatte kurete arigatō', 'Спасибо за помощь сегодня.', 'Spasíbo za pómoshch segódnya']
  ],
  wellbeing: [
    ['Estou com dor de cabeça.', 'I have a headache.', 'Me duele la cabeza.', 'J’ai mal à la tête.', '頭が|痛い|です。', 'Atama ga itai desu', 'У меня болит голова.', 'U menyá bolít golová'],
    ['Estou com dor de estômago.', 'My stomach hurts.', 'Me duele el estómago.', 'J’ai mal au ventre.', 'お腹が|痛い|です。', 'Onaka ga itai desu', 'У меня болит живот.', 'U menyá bolít zhivót'],
    ['Preciso de um remédio.', 'I need some medicine.', 'Necesito un medicamento.', 'J’ai besoin d’un médicament.', '薬が|必要|です。', 'Kusuri ga hitsuyō desu', 'Мне нужно лекарство.', 'Mne núzhno lékarstvo'],
    ['Tenho consulta médica amanhã.', 'I have a doctor’s appointment tomorrow.', 'Tengo una cita médica mañana.', 'J’ai rendez-vous chez le médecin demain.', '明日|病院の|予約が|あります。', 'Ashita byōin no yoyaku ga arimasu', 'У меня завтра приём у врача.', 'U menyá závtra priyóm u vrachá'],
    ['Onde fica a farmácia mais próxima?', 'Where is the nearest pharmacy?', '¿Dónde está la farmacia más cercana?', 'Où se trouve la pharmacie la plus proche ?', '一番近い|薬局は|どこ|ですか？', 'Ichiban chikai yakkyoku wa doko desu ka', 'Где ближайшая аптека?', 'Gde blizháyshaya aptéka'],
    ['Tenho alergia a amendoim.', 'I am allergic to peanuts.', 'Tengo alergia al cacahuete.', 'Je suis allergique aux cacahuètes.', 'ピーナッツに|アレルギーが|あります。', 'Pīnattsu ni arerugī ga arimasu', 'У меня аллергия на арахис.', 'U menyá allergíya na arakhís'],
    ['Por favor, chame uma enfermeira.', 'Please call a nurse.', 'Llame a una enfermera, por favor.', 'Appelez une infirmière, s’il vous plaît.', '看護師を|呼んで|ください。', 'Kangoshi o yonde kudasai', 'Позовите медсестру, пожалуйста.', 'Pozovíte medsestrú, pozhalúysta'],
    ['Estou me sentindo melhor agora.', 'I feel better now.', 'Me siento mejor ahora.', 'Je me sens mieux maintenant.', '今は|気分が|よくなりました。', 'Ima wa kibun ga yoku narimashita', 'Сейчас мне лучше.', 'Seychás mne lúchshe'],
    ['Preciso me sentar.', 'I need to sit down.', 'Necesito sentarme.', 'Je dois m’asseoir.', '座る|必要が|あります。', 'Suwaru hitsuyō ga arimasu', 'Мне нужно сесть.', 'Mne núzhno sest'],
    ['Preciso beber água.', 'I need to drink water.', 'Necesito beber agua.', 'Je dois boire de l’eau.', '水を|飲む|必要が|あります。', 'Mizu o nomu hitsuyō ga arimasu', 'Мне нужно выпить воды.', 'Mne núzhno výpit vody'],
    ['Estou exausto.', 'I am exhausted.', 'Estoy agotado.', 'Je suis épuisé.', 'とても|疲れて|います。', 'Totemo tsukarete imasu', 'Я очень устал.', 'Ya óchen ustál'],
    ['Há uma clínica por perto?', 'Is there a clinic nearby?', '¿Hay una clínica cerca?', 'Y a-t-il une clinique à proximité ?', '近くに|クリニックは|ありますか？', 'Chikaku ni kurinikku wa arimasu ka', 'Поблизости есть клиника?', 'Poblízosti yest klínika'],
    ['Não consigo dormir.', 'I cannot sleep.', 'No puedo dormir.', 'Je n’arrive pas à dormir.', '眠ることが|できません。', 'Nemuru koto ga dekimasen', 'Я не могу уснуть.', 'Ya ne mogú usnút']
  ],
  daily: [
    ['Que dia da semana é hoje?', 'What day of the week is it today?', '¿Qué día de la semana es hoy?', 'Quel jour de la semaine sommes-nous aujourd’hui ?', '今日は|何曜日|ですか？', 'Kyō wa nan-yōbi desu ka', 'Какой сегодня день недели?', 'Kakóy segódnya den nedéli'],
    ['Preciso carregar meu telefone.', 'I need to charge my phone.', 'Necesito cargar mi teléfono.', 'Je dois recharger mon téléphone.', '携帯電話を|充電する|必要が|あります。', 'Keitai denwa o jūden suru hitsuyō ga arimasu', 'Мне нужно зарядить телефон.', 'Mne núzhno zaryadít telefón'],
    ['A loja fecha às oito.', 'The store closes at eight.', 'La tienda cierra a las ocho.', 'Le magasin ferme à huit heures.', '店は|八時に|閉まります。', 'Mise wa hachiji ni shimarimasu', 'Магазин закрывается в восемь.', 'Magazín zakryváyetsya v vósem'],
    ['Minhas chaves estão na mesa.', 'My keys are on the table.', 'Mis llaves están en la mesa.', 'Mes clés sont sur la table.', '鍵は|テーブルの|上に|あります。', 'Kagi wa tēburu no ue ni arimasu', 'Мои ключи лежат на столе.', 'Moi klyuchí lezhát na stolé'],
    ['Pode abrir a janela?', 'Could you open the window?', '¿Puede abrir la ventana?', 'Pouvez-vous ouvrir la fenêtre ?', '窓を|開けて|もらえますか？', 'Mado o akete moraemasu ka', 'Можете открыть окно?', 'Mózhete otkrýt oknó'],
    ['Onde posso lavar as mãos?', 'Where can I wash my hands?', '¿Dónde puedo lavarme las manos?', 'Où puis-je me laver les mains ?', 'どこで|手を|洗えますか？', 'Doko de te o araemasu ka', 'Где можно помыть руки?', 'Gde mózhno pomýt rukí'],
    ['Vou chegar em casa em breve.', 'I will be home soon.', 'Llegaré a casa pronto.', 'Je rentrerai bientôt à la maison.', 'もうすぐ|家に|帰ります。', 'Mōsugu ie ni kaerimasu', 'Я скоро буду дома.', 'Ya skóro búdu dóma'],
    ['O elevador fica à direita.', 'The elevator is on the right.', 'El ascensor está a la derecha.', 'L’ascenseur est à droite.', 'エレベーターは|右側|です。', 'Erebētā wa migigawa desu', 'Лифт находится справа.', 'Lift nakhóditsya správa'],
    ['Por favor, acenda a luz.', 'Please turn on the light.', 'Encienda la luz, por favor.', 'Veuillez allumer la lumière.', '電気を|つけて|ください。', 'Denki o tsukete kudasai', 'Включите свет, пожалуйста.', 'Vklyuchíte svet, pozhalúysta'],
    ['Pego o ônibus todas as manhãs.', 'I take the bus every morning.', 'Tomo el autobús todas las mañanas.', 'Je prends le bus tous les matins.', '毎朝|バスに|乗ります。', 'Maiasa basu ni norimasu', 'Каждое утро я езжу на автобусе.', 'Kázhdoye útro ya yezhzhu na avtóbuse'],
    ['Leva cinco minutos.', 'It takes five minutes.', 'Se tarda cinco minutos.', 'Cela prend cinq minutes.', '五分|かかります。', 'Gofun kakarimasu', 'Это займёт пять минут.', 'Éto zaymyót pyat minut']
  ]
};

for (const [topic, rows] of Object.entries(TOPIC_LESSONS)) {
  const guidance = TOPIC_GUIDANCE[topic];
  for (const [prompt, en, es, fr, ja, jaReading, ru, ruReading] of rows) {
    const translations = {
      en: en.split(' '), es: es.split(' '), fr: fr.split(' '),
      ja: ja.split('|'), ru: ru.split(' ')
    };
    for (const language of Object.keys(PHRASES)) {
      if (PHRASES[language].filter(phrase => phrase.topic === topic).length >= 15) continue;
      const id = `${language}${PHRASES[language].length + 1}`;
      const phrase = lesson(id, prompt, translations[language], guidance.hint, guidance.emoji, topic, guidance.context);
      if (language === 'ja') phrase.reading = jaReading;
      if (language === 'ru') phrase.reading = ruReading;
      PHRASES[language].push(phrase);
    }
  }
}

Object.assign(LANGUAGES, EXTRA_LANGUAGES);
for (const [language, topics] of Object.entries(EXTRA_ANSWERS)) {
  const topicIndexes = Object.fromEntries(Object.keys(TOPICS).filter(topic => topic !== 'all').map(topic => [topic, 0]));
  PHRASES[language] = PHRASES.en.map((source, index) => {
    const topicIndex = topicIndexes[source.topic]++;
    const answers = topics[source.topic];
    if (!answers || answers.length !== 15) throw new Error(`${language}/${source.topic} precisa de 15 traduções.`);
    const phrase = lesson(`${language}${index + 1}`, source.prompt, answers[topicIndex], source.hint, source.emoji, source.topic, source.context);
    if (language === 'zh') phrase.reading = EXTRA_READINGS.zh[source.topic][topicIndex][0];
    if (language === 'ko') phrase.reading = answers[topicIndex].map(romanizeKorean).join(' ');
    if (language === 'ar') phrase.reading = EXTRA_READINGS.ar[source.topic][topicIndex][0];
    return phrase;
  });
}

const EXTRA_LESSONS = [...EXPANSION_ROWS, ...EXPANSION_ROWS_MORE];
const SUPPORTED_ANSWER_LANGUAGES = ['en', 'es', 'fr', 'ja', 'ru', 'de', 'it', 'zh', 'ko', 'ar'];
if (EXTRA_LESSONS.length !== 100) throw new Error(`Esperadas 100 frases extras, encontradas ${EXTRA_LESSONS.length}.`);
for (const topic of Object.keys(TOPICS).filter(topic => topic !== 'all')) {
  if (EXTRA_LESSONS.filter(phrase => phrase.topic === topic).length !== 10) {
    throw new Error(`O tema ${topic} precisa de exatamente 10 frases extras.`);
  }
}

function tokenizeChinese(text) {
  if (typeof Intl.Segmenter === 'function') {
    return [...new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text)]
      .map(part => part.segment).filter(part => part.trim());
  }
  return [...text].filter(part => !/\s/u.test(part));
}

for (const row of EXTRA_LESSONS) {
  const guidance = TOPIC_GUIDANCE[row.topic];
  for (const language of SUPPORTED_ANSWER_LANGUAGES) {
    const rawAnswer = row[language];
    const answer = language === 'ja'
      ? rawAnswer.split('~')
      : language === 'zh'
        ? tokenizeChinese(rawAnswer)
        : rawAnswer.split(' ');
    const phrase = lesson(
      `${language}${PHRASES[language].length + 1}`,
      row.prompt,
      answer,
      guidance.hint,
      guidance.emoji,
      row.topic,
      guidance.context
    );
    if (language === 'ja') phrase.reading = row.jaReading;
    if (language === 'ru') phrase.reading = row.ruReading;
    if (language === 'zh') phrase.reading = row.zhReading;
    if (language === 'ko') phrase.reading = romanizeKorean(answer.join(' '));
    if (language === 'ar') phrase.reading = row.arReading;
    PHRASES[language].push(phrase);
  }
}
