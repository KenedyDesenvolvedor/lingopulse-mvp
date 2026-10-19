import { romanizeKorean } from './additional-languages.js';

// Vocabulário adicional: 75 cartões novos para cada tema, nos dez idiomas.
// Campos: tema|português|en|es|fr|ja|ru|de|it|zh|pinyin|ko|ar
const RAW_ROWS = String.raw`
greetings|olá|hello|hola|bonjour|こんにちは|привет|Hallo|ciao|你好|nǐ hǎo|안녕하세요|مرحبًا
greetings|bom dia|good morning|buenos días|bonjour|おはようございます|доброе утро|Guten Morgen|buongiorno|早上好|zǎoshang hǎo|좋은 아침이에요|صباح الخير
greetings|boa tarde|good afternoon|buenas tardes|bon après-midi|こんにちは|добрый день|Guten Tag|buon pomeriggio|下午好|xiàwǔ hǎo|좋은 오후예요|مساء الخير
greetings|boa noite|good evening|buenas noches|bonsoir|こんばんは|добрый вечер|Guten Abend|buonasera|晚上好|wǎnshàng hǎo|좋은 저녁이에요|مساء الخير
greetings|boa noite (despedida)|good night|buenas noches|bonne nuit|おやすみなさい|спокойной ночи|Gute Nacht|buonanotte|晚安|wǎn'ān|안녕히 주무세요|تصبح على خير
greetings|tchau|goodbye|adiós|au revoir|さようなら|до свидания|Auf Wiedersehen|arrivederci|再见|zàijiàn|안녕히 가세요|إلى اللقاء
greetings|até logo|see you later|hasta luego|à plus tard|またあとで|до скорого|Bis später|a dopo|回头见|huítóu jiàn|나중에 봐요|أراك لاحقًا
greetings|até amanhã|see you tomorrow|hasta mañana|à demain|また明日|до завтра|Bis morgen|a domani|明天见|míngtiān jiàn|내일 봐요|أراك غدًا
greetings|bem-vindo|welcome|bienvenido|bienvenue|ようこそ|добро пожаловать|Willkommen|benvenuto|欢迎|huānyíng|환영합니다|أهلًا وسهلًا
greetings|bem-vindo de volta|welcome back|bienvenido de nuevo|bon retour|おかえりなさい|с возвращением|Willkommen zurück|bentornato|欢迎回来|huānyíng huílái|다시 오신 걸 환영해요|مرحبًا بعودتك
greetings|prazer em conhecer você|nice to meet you|encantado de conocerte|ravi de vous rencontrer|はじめまして|приятно познакомиться|Schön, Sie kennenzulernen|piacere di conoscerti|很高兴认识你|hěn gāoxìng rènshi nǐ|만나서 반가워요|سعيد بلقائك
greetings|como você está?|how are you?|¿cómo estás?|comment allez-vous ?|お元気ですか|как дела?|Wie geht es Ihnen?|come stai?|你好吗？|nǐ hǎo ma|잘 지내세요?|كيف حالك؟
greetings|como você está hoje?|how are you today?|¿cómo estás hoy?|comment allez-vous aujourd’hui ?|今日はお元気ですか|как вы сегодня?|Wie geht es Ihnen heute?|come stai oggi?|你今天好吗？|nǐ jīntiān hǎo ma|오늘은 어떠세요?|كيف حالك اليوم؟
greetings|estou bem, obrigado|I am well, thank you|estoy bien, gracias|je vais bien, merci|元気です、ありがとう|у меня всё хорошо, спасибо|Mir geht es gut, danke|sto bene, grazie|我很好，谢谢|wǒ hěn hǎo, xièxie|잘 지내요, 고마워요|أنا بخير، شكرًا
greetings|e você?|and you?|¿y tú?|et vous ?|あなたは|а вы?|Und Ihnen?|e tu?|你呢？|nǐ ne|당신은요?|وأنت؟
greetings|por favor|please|por favor|s’il vous plaît|お願いします|пожалуйста|bitte|per favore|请|qǐng|부탁합니다|من فضلك
greetings|obrigado|thank you|gracias|merci|ありがとう|спасибо|danke|grazie|谢谢|xièxie|감사합니다|شكرًا
greetings|muito obrigado|thank you very much|muchas gracias|merci beaucoup|どうもありがとうございます|большое спасибо|Vielen Dank|grazie mille|非常感谢|fēicháng gǎnxiè|정말 감사합니다|شكرًا جزيلًا
greetings|de nada|you are welcome|de nada|de rien|どういたしまして|не за что|Gern geschehen|prego|不客气|bú kèqi|천만에요|على الرحب والسعة
greetings|com licença|excuse me|con permiso|excusez-moi|すみません|извините|Entschuldigung|mi scusi|打扰一下|dǎrǎo yíxià|실례합니다|عذرًا
greetings|sinto muito|I am sorry|lo siento|je suis désolé|ごめんなさい|мне жаль|Es tut mir leid|mi dispiace|对不起|duìbuqǐ|죄송합니다|أنا آسف
greetings|perdão|pardon|perdón|pardon|失礼しました|простите|Verzeihung|perdono|抱歉|bàoqiàn|미안합니다|المعذرة
greetings|parabéns|congratulations|felicidades|félicitations|おめでとうございます|поздравляю|Glückwunsch|congratulazioni|恭喜|gōngxǐ|축하합니다|تهانينا
greetings|feliz aniversário|happy birthday|feliz cumpleaños|joyeux anniversaire|お誕生日おめでとう|с днём рождения|Alles Gute zum Geburtstag|buon compleanno|生日快乐|shēngrì kuàilè|생일 축하해요|عيد ميلاد سعيد
greetings|feliz ano-novo|happy new year|feliz año nuevo|bonne année|あけましておめでとうございます|с новым годом|Frohes neues Jahr|buon anno|新年快乐|xīnnián kuàilè|새해 복 많이 받으세요|سنة جديدة سعيدة
greetings|feliz Natal|Merry Christmas|Feliz Navidad|Joyeux Noël|メリークリスマス|счастливого Рождества|Frohe Weihnachten|Buon Natale|圣诞快乐|shèngdàn kuàilè|메리 크리스마스|عيد ميلاد مجيد
greetings|boas festas|happy holidays|felices fiestas|bonnes fêtes|楽しい休暇を|с праздниками|Schöne Feiertage|buone feste|节日快乐|jiérì kuàilè|즐거운 연휴 보내세요|أعياد سعيدة
greetings|boa sorte|good luck|buena suerte|bonne chance|頑張ってください|удачи|Viel Glück|buona fortuna|祝你好运|zhù nǐ hǎoyùn|행운을 빌어요|حظًا سعيدًا
greetings|tenha um bom dia|have a nice day|que tengas un buen día|bonne journée|よい一日を|хорошего дня|Einen schönen Tag|buona giornata|祝你今天愉快|zhù nǐ jīntiān yúkuài|좋은 하루 보내세요|أتمنى لك يومًا سعيدًا
greetings|bom fim de semana|have a nice weekend|buen fin de semana|bon week-end|よい週末を|хороших выходных|Schönes Wochenende|buon fine settimana|周末愉快|zhōumò yúkuài|주말 잘 보내세요|عطلة نهاية أسبوع سعيدة
greetings|boa viagem|have a safe trip|buen viaje|bon voyage|よい旅を|счастливого пути|Gute Reise|buon viaggio|一路顺风|yílù shùnfēng|즐거운 여행 되세요|رحلة سعيدة
greetings|saúde (brinde)|cheers|salud|santé|乾杯|за здоровье|Prost|cin cin|干杯|gānbēi|건배|في صحتك
greetings|que bom ver você|good to see you|qué gusto verte|heureux de vous voir|会えてうれしいです|рад вас видеть|Schön, Sie zu sehen|che bello vederti|很高兴见到你|hěn gāoxìng jiàndào nǐ|만나서 반가워요|سعيد برؤيتك
greetings|quanto tempo|long time no see|cuánto tiempo sin verte|ça fait longtemps|お久しぶりです|давно не виделись|Lange nicht gesehen|quanto tempo|好久不见|hǎojiǔ bújiàn|오랜만이에요|منذ وقت طويل لم أرك
greetings|sente-se, por favor|please sit down|siéntese, por favor|asseyez-vous, s’il vous plaît|どうぞお座りください|присаживайтесь, пожалуйста|Setzen Sie sich bitte|si accomodi, per favore|请坐|qǐng zuò|앉으세요|تفضل بالجلوس
greetings|entre, por favor|please come in|pase, por favor|entrez, s’il vous plaît|どうぞお入りください|входите, пожалуйста|Kommen Sie bitte herein|prego, entri|请进|qǐng jìn|들어오세요|تفضل بالدخول
greetings|depois de você|after you|después de usted|après vous|お先にどうぞ|после вас|Nach Ihnen|dopo di lei|您先请|nín xiān qǐng|먼저 가세요|تفضل أنت أولًا
greetings|senhor|sir|señor|monsieur|おとこのかた|господин|Herr|signore|先生|xiānsheng|선생님|سيد
greetings|senhora|ma’am|señora|madame|おんなのかた|госпожа|Frau|signora|女士|nǚshì|부인|سيدة
greetings|amigo|friend|amigo|ami|友達|друг|Freund|amico|朋友|péngyou|친구|صديق
greetings|amiga|friend|amiga|amie|友達|подруга|Freundin|amica|朋友|péngyou|친구|صديقة
greetings|colega|colleague|compañero|collègue|同僚|коллега|Kollege|collega|同事|tóngshì|동료|زميل
greetings|convidado|guest|invitado|invité|招待客|гость|Gast|ospite|客人|kèrén|손님|ضيف
greetings|anfitrião|host|anfitrión|hôte|主催者|хозяин|Gastgeber|padrone di casa|主人|zhǔrén|주인|مضيف
greetings|família|family|familia|famille|家族|семья|Familie|famiglia|家人|jiārén|가족|عائلة
greetings|vizinho|neighbor|vecino|voisin|隣人|сосед|Nachbar|vicino|邻居|línjū|이웃|جار
greetings|nome|name|nombre|nom|名前|имя|Name|nome|名字|míngzi|이름|اسم
greetings|primeiro nome|first name|nombre de pila|prénom|下の名前|имя|Vorname|nome proprio|名字|míngzi|이름|الاسم الأول
greetings|sobrenome|surname|apellido|nom de famille|名字|фамилия|Nachname|cognome|姓|xìng|성|اسم العائلة
greetings|apresentação|introduction|presentación|présentation|紹介|представление|Vorstellung|presentazione|介绍|jièshào|소개|مقدمة
greetings|saudação|greeting|saludo|salutation|挨拶|приветствие|Begrüßung|saluto|问候|wènhòu|인사|تحية
greetings|despedida|farewell|despedida|adieu|別れの挨拶|прощание|Abschied|commiato|告别|gàobié|작별 인사|وداع
greetings|convite|invitation|invitación|invitation|招待|приглашение|Einladung|invito|邀请|yāoqǐng|초대|دعوة
greetings|agradecimento|thank-you|agradecimiento|remerciement|お礼|благодарность|Dank|ringraziamento|感谢|gǎnxiè|감사|شكر
greetings|pedido de desculpa|apology|disculpa|excuse|謝罪|извинение|Entschuldigung|scusa|道歉|dàoqiàn|사과|اعتذار
greetings|elogio|compliment|cumplido|compliment|褒め言葉|комплимент|Kompliment|complimento|赞美|zànměi|칭찬|مجاملة
greetings|respeito|respect|respeto|respect|尊敬|уважение|Respekt|rispetto|尊重|zūnzhòng|존중|احترام
greetings|gentileza|kindness|amabilidad|gentillesse|親切|доброта|Freundlichkeit|gentilezza|善意|shànyì|친절|لطف
greetings|sorriso|smile|sonrisa|sourire|笑顔|улыбка|Lächeln|sorriso|微笑|wēixiào|미소|ابتسامة
greetings|aperto de mão|handshake|apretón de manos|poignée de main|握手|рукопожатие|Handschlag|stretta di mano|握手|wòshǒu|악수|مصافحة
greetings|abraço|hug|abrazo|câlin|抱擁|объятие|Umarmung|abbraccio|拥抱|yōngbào|포옹|عناق
greetings|visita|visit|visita|visite|訪問|визит|Besuch|visita|拜访|bàifǎng|방문|زيارة
greetings|encontro|meeting|encuentro|rencontre|会合|встреча|Treffen|incontro|会面|huìmiàn|만남|لقاء
greetings|chegada|arrival|llegada|arrivée|到着|прибытие|Ankunft|arrivo|到达|dàodá|도착|وصول
greetings|partida|departure|salida|départ|出発|отъезд|Abreise|partenza|出发|chūfā|출발|مغادرة
greetings|manhã|morning|mañana|matin|朝|утро|Morgen|mattina|早晨|zǎochén|아침|صباح
greetings|tarde|afternoon|tarde|après-midi|午後|день|Nachmittag|pomeriggio|下午|xiàwǔ|오후|بعد الظهر
greetings|noite|night|noche|soir|夜|ночь|Nacht|notte|夜晚|yèwǎn|밤|ليل
greetings|hoje|today|hoy|aujourd’hui|今日|сегодня|heute|oggi|今天|jīntiān|오늘|اليوم
greetings|amanhã|tomorrow|mañana|demain|明日|завтра|morgen|domani|明天|míngtiān|내일|غدًا
greetings|segunda-feira|Monday|lunes|lundi|月曜日|понедельник|Montag|lunedì|星期一|xīngqīyī|월요일|الاثنين
greetings|fim de semana|weekend|fin de semana|week-end|週末|выходные|Wochenende|fine settimana|周末|zhōumò|주말|نهاية الأسبوع
greetings|feriado|holiday|festivo|jour férié|祝日|праздник|Feiertag|giorno festivo|节日|jiérì|공휴일|عطلة
greetings|comemoração|celebration|celebración|célébration|お祝い|празднование|Feier|festeggiamento|庆祝|qìngzhù|축하 행사|احتفال
greetings|com prazer|with pleasure|con mucho gusto|avec plaisir|よろこんで|с удовольствием|gern geschehen|con piacere|很乐意|hěn lèyì|기꺼이|بكل سرور
food|água|water|agua|eau|みず|вода|Wasser|acqua|水|shuǐ|물|ماء
food|café|coffee|café|café|コーヒー|кофе|Kaffee|caffè|咖啡|kāfēi|커피|قهوة
food|chá|tea|té|thé|おちゃ|чай|Tee|tè|茶|chá|차|شاي
food|leite|milk|leche|lait|ぎゅうにゅう|молоко|Milch|latte|牛奶|niúnǎi|우유|حليب
food|suco|juice|zumo|jus|ジュース|сок|Saft|succo|果汁|guǒzhī|주스|عصير
food|refrigerante|soft drink|refresco|boisson gazeuse|ソーダ|газировка|Limonade|bibita gassata|汽水|qìshuǐ|탄산음료|مشروب غازي
food|pão|bread|pan|pain|パン|хлеб|Brot|pane|面包|miànbāo|빵|خبز
food|arroz|rice|arroz|riz|ごはん|рис|Reis|riso|米饭|mǐfàn|밥|أرز
food|macarrão|pasta|pasta|pâtes|パスタ|макароны|Nudeln|pasta|意大利面|yìdàlìmiàn|파스타|معكرونة
food|sopa|soup|sopa|soupe|スープ|суп|Suppe|zuppa|汤|tāng|수프|حساء
food|salada|salad|ensalada|salade|サラダ|салат|Salat|insalata|沙拉|shālā|샐러드|سلطة
food|carne|meat|carne|viande|にく|мясо|Fleisch|carne|肉|ròu|고기|لحم
food|carne bovina|beef|carne de res|bœuf|ぎゅうにく|говядина|Rindfleisch|manzo|牛肉|niúròu|소고기|لحم بقري
food|frango|chicken|pollo|poulet|とりにく|курица|Hähnchen|pollo|鸡肉|jīròu|닭고기|دجاج
food|peixe|fish|pescado|poisson|さかな|рыба|Fisch|pesce|鱼|yú|생선|سمك
food|ovo|egg|huevo|œuf|たまご|яйцо|Ei|uovo|鸡蛋|jīdàn|달걀|بيض
food|queijo|cheese|queso|fromage|チーズ|сыр|Käse|formaggio|奶酪|nǎilào|치즈|جبن
food|manteiga|butter|mantequilla|beurre|バター|сливочное масло|Butter|burro|黄油|huángyóu|버터|زبدة
food|iogurte|yogurt|yogur|yaourt|ヨーグルト|йогурт|Joghurt|yogurt|酸奶|suānnǎi|요구르트|زبادي
food|fruta|fruit|fruta|fruit|くだもの|фрукты|Obst|frutta|水果|shuǐguǒ|과일|فاكهة
food|maçã|apple|manzana|pomme|りんご|яблоко|Apfel|mela|苹果|píngguǒ|사과|تفاحة
food|banana|banana|plátano|banane|バナナ|банан|Banane|banana|香蕉|xiāngjiāo|바나나|موز
food|laranja|orange|naranja|orange|オレンジ|апельсин|Orange|arancia|橙子|chéngzi|오렌지|برتقال
food|limão|lemon|limón|citron|レモン|лимон|Zitrone|limone|柠檬|níngméng|레몬|ليمون
food|uva|grape|uva|raisin|ぶどう|виноград|Traube|uva|葡萄|pútao|포도|عنب
food|morango|strawberry|fresa|fraise|いちご|клубника|Erdbeere|fragola|草莓|cǎoméi|딸기|فراولة
food|tomate|tomato|tomate|tomate|トマト|помидор|Tomate|pomodoro|西红柿|xīhóngshì|토마토|طماطم
food|batata|potato|patata|pomme de terre|じゃがいも|картофель|Kartoffel|patata|土豆|tǔdòu|감자|بطاطس
food|cebola|onion|cebolla|oignon|たまねぎ|лук|Zwiebel|cipolla|洋葱|yángcōng|양파|بصل
food|alho|garlic|ajo|ail|にんにく|чеснок|Knoblauch|aglio|大蒜|dàsuàn|마늘|ثوم
food|cenoura|carrot|zanahoria|carotte|にんじん|морковь|Karotte|carota|胡萝卜|húluóbo|당근|جزر
food|alface|lettuce|lechuga|laitue|レタス|салат|Kopfsalat|lattuga|生菜|shēngcài|상추|خس
food|pepino|cucumber|pepino|concombre|きゅうり|огурец|Gurke|cetriolo|黄瓜|huángguā|오이|خيار
food|cogumelo|mushroom|seta|champignon|きのこ|гриб|Pilz|fungo|蘑菇|mógū|버섯|فطر
food|feijão|beans|frijoles|haricots|まめ|фасоль|Bohnen|fagioli|豆子|dòuzi|콩|فاصولياء
food|milho|corn|maíz|maïs|とうもろこし|кукуруза|Mais|mais|玉米|yùmǐ|옥수수|ذرة
food|farinha|flour|harina|farine|こむぎこ|мука|Mehl|farina|面粉|miànfěn|밀가루|دقيق
food|açúcar|sugar|azúcar|sucre|さとう|сахар|Zucker|zucchero|糖|táng|설탕|سكر
food|sal|salt|sal|sel|しお|соль|Salz|sale|盐|yán|소금|ملح
food|pimenta|pepper|pimienta|poivre|こしょう|перец|Pfeffer|pepe|胡椒|hújiāo|후추|فلفل
food|óleo|oil|aceite|huile|あぶら|масло|Öl|olio|食用油|shíyòngyóu|기름|زيت
food|vinagre|vinegar|vinagre|vinaigre|おす|уксус|Essig|aceto|醋|cù|식초|خل
food|molho|sauce|salsa|sauce|ソース|соус|Soße|salsa|酱汁|jiàngzhī|소스|صلصة
food|sanduíche|sandwich|sándwich|sandwich|サンドイッチ|сэндвич|Sandwich|panino|三明治|sānmíngzhì|샌드위치|شطيرة
food|pizza|pizza|pizza|pizza|ピザ|пицца|Pizza|pizza|披萨|pīsà|피자|بيتزا
food|hambúrguer|hamburger|hamburguesa|hamburger|ハンバーガー|гамбургер|Hamburger|hamburger|汉堡包|hànbǎobāo|햄버거|همبرغر
food|cachorro-quente|hot dog|perrito caliente|hot-dog|ホットドッグ|хот-дог|Hotdog|hot dog|热狗|règǒu|핫도그|هوت دوغ
food|linguiça|sausage|salchicha|saucisse|ソーセージ|колбаса|Wurst|salsiccia|香肠|xiāngcháng|소시지|نقانق
food|presunto|ham|jamón|jambon|ハム|ветчина|Schinken|prosciutto|火腿|huǒtuǐ|햄|لحم خنزير
food|bacon|bacon|tocino|bacon|ベーコン|бекон|Speck|pancetta|培根|péigēn|베이컨|لحم مقدد
food|frutos do mar|seafood|mariscos|fruits de mer|シーフード|морепродукты|Meeresfrüchte|frutti di mare|海鲜|hǎixiān|해산물|مأكولات بحرية
food|camarão|shrimp|camarón|crevette|えび|креветка|Garnele|gamberetto|虾|xiā|새우|روبيان
food|atum|tuna|atún|thon|まぐろ|тунец|Thunfisch|tonno|金枪鱼|jīnjiāngyú|참치|تونة
food|salmão|salmon|salmón|saumon|さけ|лосось|Lachs|salmone|三文鱼|sānwényú|연어|سلمون
food|bolo|cake|pastel|gâteau|ケーキ|торт|Kuchen|torta|蛋糕|dàngāo|케이크|كعكة
food|torta|pie|tarta|tarte|タルト|пирог|Kuchen|crostata|馅饼|xiànbǐng|파이|فطيرة
food|biscoito|cookie|galleta|biscuit|クッキー|печенье|Keks|biscotto|饼干|bǐnggān|쿠키|بسكويت
food|chocolate|chocolate|chocolate|chocolat|チョコレート|шоколад|Schokolade|cioccolato|巧克力|qiǎokèlì|초콜릿|شوكولاتة
food|sorvete|ice cream|helado|glace|アイスクリーム|мороженое|Eis|gelato|冰淇淋|bīngqílín|아이스크림|آيس كريم
food|mel|honey|miel|miel|はちみつ|мёд|Honig|miele|蜂蜜|fēngmì|꿀|عسل
food|geleia|jam|mermelada|confiture|ジャム|варенье|Marmelade|marmellata|果酱|guǒjiàng|잼|مربى
food|café da manhã|breakfast|desayuno|petit-déjeuner|あさごはん|завтрак|Frühstück|colazione|早餐|zǎocān|아침 식사|إفطار
food|almoço|lunch|almuerzo|déjeuner|ひるごはん|обед|Mittagessen|pranzo|午餐|wǔcān|점심|غداء
food|jantar|dinner|cena|dîner|ばんごはん|ужин|Abendessen|cena|晚餐|wǎncān|저녁 식사|عشاء
food|sobremesa|dessert|postre|dessert|デザート|десерт|Nachtisch|dessert|甜点|tiándiǎn|디저트|حلوى
food|lanche|snack|tentempié|collation|おやつ|перекус|Imbiss|spuntino|零食|língshí|간식|وجبة خفيفة
food|cardápio|menu|menú|menu|メニュー|меню|Speisekarte|menù|菜单|càidān|메뉴|قائمة الطعام
food|prato|plate|plato|assiette|おさら|тарелка|Teller|piatto|盘子|pánzi|접시|طبق
food|tigela|bowl|cuenco|bol|どんぶり|миска|Schüssel|ciotola|碗|wǎn|그릇|وعاء
food|xícara|cup|taza|tasse|カップ|чашка|Tasse|tazza|杯子|bēizi|컵|فنجان
food|copo|glass|vaso|verre|コップ|стакан|Glas|bicchiere|玻璃杯|bōlibēi|유리컵|كوب
food|garfo|fork|tenedor|fourchette|フォーク|вилка|Gabel|forchetta|叉子|chāzi|포크|شوكة
food|colher|spoon|cuchara|cuillère|スプーン|ложка|Löffel|cucchiaio|勺子|sháozi|숟가락|ملعقة
food|faca|knife|cuchillo|couteau|ナイフ|нож|Messer|coltello|刀|dāo|칼|سكين
food|guardanapo|napkin|servilleta|serviette|ナプキン|салфетка|Serviette|tovagliolo|餐巾|cānjīn|냅킨|منديل
travel|aeroporto|airport|aeropuerto|aéroport|くうこう|аэропорт|Flughafen|aeroporto|机场|jīchǎng|공항|مطار
travel|estação ferroviária|train station|estación de tren|gare ferroviaire|えき|вокзал|Bahnhof|stazione ferroviaria|火车站|huǒchēzhàn|기차역|محطة قطار
travel|estação de metrô|subway station|estación de metro|station de métro|ちかてつのえき|станция метро|U-Bahn-Station|stazione della metro|地铁站|dìtiězhàn|지하철역|محطة مترو
travel|ponto de ônibus|bus stop|parada de autobús|arrêt de bus|バスてい|автобусная остановка|Bushaltestelle|fermata dell’autobus|公交车站|gōngjiāochēzhàn|버스 정류장|موقف الحافلات
travel|porto|port|puerto|port|みなと|порт|Hafen|porto|港口|gǎngkǒu|항구|ميناء
travel|fronteira|border|frontera|frontière|こっきょう|граница|Grenze|confine|边境|biānjìng|국경|حدود
travel|hotel|hotel|hotel|hôtel|ホテル|отель|Hotel|hotel|酒店|jiǔdiàn|호텔|فندق
travel|reserva|reservation|reserva|réservation|よやく|бронирование|Reservierung|prenotazione|预订|yùdìng|예약|حجز
travel|passaporte|passport|pasaporte|passeport|パスポート|паспорт|Reisepass|passaporto|护照|hùzhào|여권|جواز سفر
travel|visto|visa|visado|visa|ビザ|виза|Visum|visto|签证|qiānzhèng|비자|تأشيرة
travel|passagem|ticket|billete|billet|きっぷ|билет|Fahrkarte|biglietto|车票|chēpiào|표|تذكرة
travel|passagem de ida e volta|round-trip ticket|billete de ida y vuelta|billet aller-retour|おうふくきっぷ|билет туда и обратно|Hin- und Rückfahrkarte|biglietto di andata e ritorno|往返票|wǎngfǎnpiào|왕복표|تذكرة ذهاب وعودة
travel|plataforma|platform|andén|quai|ホーム|платформа|Bahnsteig|binario|站台|zhàntái|승강장|رصيف
travel|horário|schedule|horario|horaire|じこくひょう|расписание|Fahrplan|orario|时刻表|shíkèbiǎo|시간표|جدول المواعيد
travel|partida|departure|salida|départ|しゅっぱつ|отправление|Abfahrt|partenza|出发|chūfā|출발|مغادرة
travel|chegada|arrival|llegada|arrivée|とうちゃく|прибытие|Ankunft|arrivo|到达|dàodá|도착|وصول
travel|atraso|delay|retraso|retard|おくれ|задержка|Verspätung|ritardo|延误|yánwù|지연|تأخير
travel|cancelamento|cancellation|cancelación|annulation|キャンセル|отмена|Stornierung|cancellazione|取消|qǔxiāo|취소|إلغاء
travel|bagagem|luggage|equipaje|bagages|にもつ|багаж|Gepäck|bagaglio|行李|xíngli|짐|أمتعة
travel|mala|suitcase|maleta|valise|スーツケース|чемодан|Koffer|valigia|行李箱|xínglǐxiāng|여행 가방|حقيبة سفر
travel|mochila|backpack|mochila|sac à dos|リュックサック|рюкзак|Rucksack|zaino|背包|bēibāo|배낭|حقيبة ظهر
travel|bagagem de mão|carry-on luggage|equipaje de mano|bagage à main|てにもつ|ручная кладь|Handgepäck|bagaglio a mano|手提行李|shǒutíxíngli|기내 수하물|أمتعة يدوية
travel|esteira de bagagem|baggage carousel|cinta de equipaje|tapis à bagages|にもつうけとり|лента выдачи багажа|Gepäckband|nastro bagagli|行李转盘|xínglǐzhuànpán|수하물 벨트|سير الأمتعة
travel|portão de embarque|boarding gate|puerta de embarque|porte d’embarquement|とうじょうぐち|выход на посадку|Flugsteig|gate d’imbarco|登机口|dēngjīkǒu|탑승구|بوابة الصعود
travel|voo|flight|vuelo|vol|フライト|рейс|Flug|volo|航班|hángbān|항공편|رحلة جوية
travel|avião|airplane|avión|avion|ひこうき|самолёт|Flugzeug|aereo|飞机|fēijī|비행기|طائرة
travel|trem|train|tren|train|でんしゃ|поезд|Zug|treno|火车|huǒchē|기차|قطار
travel|ônibus|bus|autobús|bus|バス|автобус|Bus|autobus|公交车|gōngjiāochē|버스|حافلة
travel|metrô|subway|metro|métro|ちかてつ|метро|U-Bahn|metropolitana|地铁|dìtiě|지하철|مترو
travel|táxi|taxi|taxi|taxi|タクシー|такси|Taxi|taxi|出租车|chūzūchē|택시|سيارة أجرة
travel|carro|car|coche|voiture|くるま|машина|Auto|auto|汽车|qìchē|자동차|سيارة
travel|bicicleta|bicycle|bicicleta|vélo|じてんしゃ|велосипед|Fahrrad|bicicletta|自行车|zìxíngchē|자전거|دراجة
travel|balsa|ferry|ferri|ferry|フェリー|паром|Fähre|traghetto|渡船|dùchuán|페리|عبّارة
travel|navio|ship|barco|navire|ふね|корабль|Schiff|nave|船|chuán|배|سفينة
travel|bonde|tram|tranvía|tramway|ろめんでんしゃ|трамвай|Straßenbahn|tram|有轨电车|yǒuguǐdiànchē|전차|ترام
travel|motocicleta|motorcycle|motocicleta|moto|オートバイ|мотоцикл|Motorrad|motocicletta|摩托车|mótuōchē|오토바이|دراجة نارية
travel|estrada|road|carretera|route|どうろ|дорога|Straße|strada|道路|dàolù|도로|طريق
travel|rodovia|highway|autopista|autoroute|こうそくどうろ|автомагистраль|Autobahn|autostrada|高速公路|gāosùgōnglù|고속도로|طريق سريع
travel|rua|street|calle|rue|とおり|улица|Straße|via|街道|jiēdào|거리|شارع
travel|mapa|map|mapa|carte|ちず|карта|Karte|mappa|地图|dìtú|지도|خريطة
travel|endereço|address|dirección|adresse|じゅうしょ|адрес|Adresse|indirizzo|地址|dìzhǐ|주소|عنوان
travel|rota|route|ruta|itinéraire|ルート|маршрут|Route|percorso|路线|lùxiàn|경로|مسار
travel|direção|direction|dirección|direction|ほうこう|направление|Richtung|direzione|方向|fāngxiàng|방향|اتجاه
travel|cruzamento|intersection|cruce|carrefour|こうさてん|перекрёсток|Kreuzung|incrocio|十字路口|shízìlùkǒu|교차로|تقاطع
travel|semáforo|traffic light|semáforo|feu de circulation|しんごう|светофор|Ampel|semaforo|红绿灯|hónglǜdēng|신호등|إشارة المرور
travel|ponte|bridge|puente|pont|はし|мост|Brücke|ponte|桥|qiáo|다리|جسر
travel|túnel|tunnel|túnel|tunnel|トンネル|тоннель|Tunnel|tunnel|隧道|suìdào|터널|نفق
travel|estacionamento|parking lot|aparcamiento|parking|ちゅうしゃじょう|парковка|Parkplatz|parcheggio|停车场|tíngchēchǎng|주차장|موقف سيارات
travel|faixa de pedestres|crosswalk|paso de peatones|passage piéton|おうだんほどう|пешеходный переход|Zebrastreifen|strisce pedonali|人行横道|rénxínghéngdào|횡단보도|ممر المشاة
travel|calçada|sidewalk|acera|trottoir|ほどう|тротуар|Gehweg|marciapiede|人行道|rénxíngdào|인도|رصيف المشاة
travel|prédio|building|edificio|bâtiment|たてもの|здание|Gebäude|edificio|大楼|dàlóu|건물|مبنى
travel|elevador|elevator|ascensor|ascenseur|エレベーター|лифт|Aufzug|ascensore|电梯|diàntī|엘리베이터|مصعد
travel|escada|stairs|escalera|escalier|かいだん|лестница|Treppe|scala|楼梯|lóutī|계단|درج
travel|andar do prédio|floor|piso|étage|かい|этаж|Stockwerk|piano|楼层|lóucéng|층|طابق
travel|entrada|entrance|entrada|entrée|いりぐち|вход|Eingang|ingresso|入口|rùkǒu|입구|مدخل
travel|saída|exit|salida|sortie|でぐち|выход|Ausgang|uscita|出口|chūkǒu|출구|مخرج
travel|banheiro público|public restroom|baño público|toilettes publiques|こうしゅうトイレ|общественный туалет|öffentliche Toilette|bagno pubblico|公共厕所|gōnggòng cèsuǒ|공중화장실|حمام عام
travel|balcão de informações|information desk|mostrador de información|bureau d’information|あんないじょ|справочная стойка|Informationsschalter|ufficio informazioni|问讯处|wènxùnchù|안내 데스크|مكتب الاستعلامات
travel|turista|tourist|turista|touriste|かんこうきゃく|турист|Tourist|turista|游客|yóukè|관광객|سائح
travel|guia turístico|tour guide|guía turístico|guide touristique|ツアーガイド|экскурсовод|Reiseleiter|guida turistica|导游|dǎoyóu|여행 가이드|مرشد سياحي
travel|museu|museum|museo|musée|はくぶつかん|музей|Museum|museo|博物馆|bówùguǎn|박물관|متحف
travel|praia|beach|playa|plage|ビーチ|пляж|Strand|spiaggia|海滩|hǎitān|해변|شاطئ
travel|montanha|mountain|montaña|montagne|やま|гора|Berg|montagna|山|shān|산|جبل
travel|vila|village|pueblo|village|むら|деревня|Dorf|villaggio|村庄|cūnzhuāng|마을|قرية
travel|centro da cidade|city center|centro de la ciudad|centre-ville|まちのちゅうしん|центр города|Stadtzentrum|centro città|市中心|shì zhōngxīn|시내 중심|وسط المدينة
travel|praça|square|plaza|place|ひろば|площадь|Platz|piazza|广场|guǎngchǎng|광장|ساحة
travel|mercado|market|mercado|marché|いちば|рынок|Markt|mercato|市场|shìchǎng|시장|سوق
travel|farmácia|pharmacy|farmacia|pharmacie|やっきょく|аптека|Apotheke|farmacia|药店|yàodiàn|약국|صيدلية
travel|delegacia|police station|comisaría|commissariat|けいさつしょ|полицейский участок|Polizeiwache|commissariato|警察局|jǐngchájú|경찰서|مركز شرطة
travel|embaixada|embassy|embajada|ambassade|たいしかん|посольство|Botschaft|ambasciata|大使馆|dàshǐguǎn|대사관|سفارة
travel|câmbio|currency exchange|cambio de moneda|change de devises|りょうがえ|обмен валюты|Geldwechsel|cambio valuta|货币兑换|huòbì duìhuàn|환전|صرف العملات
travel|aluguel de carro|car rental|alquiler de coches|location de voiture|レンタカー|прокат автомобилей|Autovermietung|noleggio auto|汽车租赁|qìchē zūlìn|자동차 대여|تأجير السيارات
travel|seguro de viagem|travel insurance|seguro de viaje|assurance voyage|りょこうほけん|туристическая страховка|Reiseversicherung|assicurazione di viaggio|旅行保险|lǚxíng bǎoxiǎn|여행자 보험|تأمين السفر
travel|destino|destination|destino|destination|もくてきち|пункт назначения|Reiseziel|destinazione|目的地|mùdìdì|목적지|وجهة
travel|passeio turístico|guided tour|visita guiada|visite guidée|ガイドツアー|экскурсия|Stadtführung|visita guidata|导览|dǎolǎn|가이드 투어|جولة سياحية
shopping|loja|store|tienda|magasin|みせ|магазин|Geschäft|negozio|商店|shāngdiàn|가게|متجر
shopping|vendedor|salesperson|vendedor|vendeur|てんいん|продавец|Verkäufer|commesso|售货员|shòuhuòyuán|판매원|بائع
shopping|cliente|customer|cliente|client|きゃく|покупатель|Kunde|cliente|顾客|gùkè|고객|زبون
shopping|preço|price|precio|prix|ねだん|цена|Preis|prezzo|价格|jiàgé|가격|سعر
shopping|desconto|discount|descuento|réduction|わりびき|скидка|Rabatt|sconto|折扣|zhékòu|할인|خصم
shopping|liquidação|sale|rebajas|soldes|セール|распродажа|Ausverkauf|saldi|大减价|dà jiǎnjià|세일|تخفيضات
shopping|promoção|special offer|oferta|promotion|キャンペーン|акция|Sonderangebot|promozione|促销|cùxiāo|특가 행사|عرض خاص
shopping|caixa|checkout|caja|caisse|レジ|касса|Kasse|cassa|收银台|shōuyíntái|계산대|صندوق الدفع
shopping|recibo|receipt|recibo|reçu|レシート|чек|Quittung|scontrino|收据|shōujù|영수증|إيصال
shopping|cartão de crédito|credit card|tarjeta de crédito|carte de crédit|クレジットカード|кредитная карта|Kreditkarte|carta di credito|信用卡|xìnyòngkǎ|신용카드|بطاقة ائتمان
shopping|dinheiro em espécie|cash|efectivo|espèces|げんきん|наличные|Bargeld|contanti|现金|xiànjīn|현금|نقد
shopping|moeda|coin|moneda|pièce|コイン|монета|Münze|moneta|硬币|yìngbì|동전|عملة معدنية
shopping|carteira|wallet|cartera|portefeuille|さいふ|кошелёк|Geldbörse|portafoglio|钱包|qiánbāo|지갑|محفظة
shopping|bolsa de compras|shopping bag|bolsa|sac de courses|かいものぶくろ|пакет|Einkaufstasche|borsa della spesa|购物袋|gòuwùdài|장바구니|حقيبة تسوق
shopping|tamanho|size|talla|taille|サイズ|размер|Größe|taglia|尺码|chǐmǎ|사이즈|مقاس
shopping|cor|color|color|couleur|いろ|цвет|Farbe|colore|颜色|yánsè|색깔|لون
shopping|azul|blue|azul|bleu|あお|синий|blau|blu|蓝色|lánsè|파란색|أزرق
shopping|vermelho|red|rojo|rouge|あか|красный|rot|rosso|红色|hóngsè|빨간색|أحمر
shopping|verde|green|verde|vert|みどり|зелёный|grün|verde|绿色|lǜsè|초록색|أخضر
shopping|preto|black|negro|noir|くろ|чёрный|schwarz|nero|黑色|hēisè|검은색|أسود
shopping|branco|white|blanco|blanc|しろ|белый|weiß|bianco|白色|báisè|흰색|أبيض
shopping|provador|fitting room|probador|cabine d’essayage|しちゃくしつ|примерочная|Umkleidekabine|camerino|试衣间|shìyījiān|탈의실|غرفة القياس
shopping|roupa|clothing|ropa|vêtement|ふく|одежда|Kleidung|vestiti|衣服|yīfu|옷|ملابس
shopping|camisa|shirt|camisa|chemise|シャツ|рубашка|Hemd|camicia|衬衫|chènshān|셔츠|قميص
shopping|camiseta|T-shirt|camiseta|T-shirt|ティーシャツ|футболка|T-Shirt|maglietta|T恤|T xù|티셔츠|قميص قصير الأكمام
shopping|calça|trousers|pantalones|pantalon|ズボン|брюки|Hose|pantaloni|裤子|kùzi|바지|بنطال
shopping|jeans|jeans|vaqueros|jean|ジーンズ|джинсы|Jeans|jeans|牛仔裤|niúzǎikù|청바지|جينز
shopping|saia|skirt|falda|jupe|スカート|юбка|Rock|gonna|裙子|qúnzi|치마|تنورة
shopping|vestido|dress|vestido|robe|ワンピース|платье|Kleid|vestito|连衣裙|liányīqún|원피스|فستان
shopping|casaco|coat|abrigo|manteau|コート|пальто|Mantel|cappotto|外套|wàitào|코트|معطف
shopping|jaqueta|jacket|chaqueta|veste|ジャケット|куртка|Jacke|giacca|夹克|jiákè|재킷|سترة
shopping|suéter|sweater|suéter|pull|セーター|свитер|Pullover|maglione|毛衣|máoyī|스웨터|كنزة
shopping|sapato|shoe|zapato|chaussure|くつ|ботинок|Schuh|scarpa|鞋子|xiézi|신발|حذاء
shopping|tênis|sneaker|zapatilla|basket|スニーカー|кроссовок|Turnschuh|scarpa da ginnastica|运动鞋|yùndòngxié|운동화|حذاء رياضي
shopping|bota|boot|bota|botte|ブーツ|сапог|Stiefel|stivale|靴子|xuēzi|부츠|حذاء طويل
shopping|meia|sock|calcetín|chaussette|くつした|носок|Socke|calzino|袜子|wàzi|양말|جورب
shopping|chapéu|hat|sombrero|chapeau|ぼうし|шляпа|Hut|cappello|帽子|màozi|모자|قبعة
shopping|boné|cap|gorra|casquette|キャップ|кепка|Kappe|berretto|鸭舌帽|yāshémào|야구 모자|قبعة
shopping|cinto|belt|cinturón|ceinture|ベルト|ремень|Gürtel|cintura|腰带|yāodài|벨트|حزام
shopping|bolsa de mão|handbag|bolso|sac à main|ハンドバッグ|сумка|Handtasche|borsa|手提包|shǒutíbāo|핸드백|حقيبة يد
shopping|relógio|watch|reloj|montre|うでどけい|часы|Uhr|orologio|手表|shǒubiǎo|손목시계|ساعة يد
shopping|óculos|glasses|gafas|lunettes|めがね|очки|Brille|occhiali|眼镜|yǎnjìng|안경|نظارات
shopping|guarda-chuva|umbrella|paraguas|parapluie|かさ|зонт|Regenschirm|ombrello|雨伞|yǔsǎn|우산|مظلة
shopping|mochila|backpack|mochila|sac à dos|リュック|рюкзак|Rucksack|zaino|背包|bēibāo|배낭|حقيبة ظهر
shopping|livro|book|libro|livre|ほん|книга|Buch|libro|书|shū|책|كتاب
shopping|brinquedo|toy|juguete|jouet|おもちゃ|игрушка|Spielzeug|giocattolo|玩具|wánjù|장난감|لعبة
shopping|presente|gift|regalo|cadeau|プレゼント|подарок|Geschenk|regalo|礼物|lǐwù|선물|هدية
shopping|joia|jewelry|joya|bijou|アクセサリー|украшение|Schmuck|gioiello|珠宝|zhūbǎo|장신구|مجوهرات
shopping|anel|ring|anillo|bague|ゆびわ|кольцо|Ring|anello|戒指|jièzhi|반지|خاتم
shopping|colar|necklace|collar|collier|ネックレス|ожерелье|Halskette|collana|项链|xiàngliàn|목걸이|قلادة
shopping|brinco|earring|pendiente|boucle d’oreille|イヤリング|серьга|Ohrring|orecchino|耳环|ěrhuán|귀걸이|قرط
shopping|perfume|perfume|perfume|parfum|こうすい|духи|Parfüm|profumo|香水|xiāngshuǐ|향수|عطر
shopping|cosmético|cosmetic|cosmético|cosmétique|けしょうひん|косметика|Kosmetik|cosmetico|化妆品|huàzhuāngpǐn|화장품|مستحضر تجميل
shopping|maquiagem|makeup|maquillaje|maquillage|メイク|макияж|Make-up|trucco|化妆|huàzhuāng|화장|مكياج
shopping|xampu|shampoo|champú|shampooing|シャンプー|шампунь|Shampoo|shampoo|洗发水|xǐfàshuǐ|샴푸|شامبو
shopping|sabonete|soap|jabón|savon|せっけん|мыло|Seife|sapone|肥皂|féizào|비누|صابون
shopping|toalha|towel|toalla|serviette|タオル|полотенце|Handtuch|asciugamano|毛巾|máojīn|수건|منشفة
shopping|eletrodoméstico|appliance|electrodoméstico|appareil électroménager|かでん|бытовая техника|Haushaltsgerät|elettrodomestico|家用电器|jiāyòng diànqì|가전제품|جهاز منزلي
shopping|celular|mobile phone|teléfono móvil|téléphone portable|けいたいでんわ|мобильный телефон|Mobiltelefon|telefono cellulare|手机|shǒujī|휴대전화|هاتف محمول
shopping|computador|computer|computadora|ordinateur|コンピューター|компьютер|Computer|computer|电脑|diànnǎo|컴퓨터|حاسوب
shopping|fone de ouvido|headphones|auriculares|casque audio|ヘッドホン|наушники|Kopfhörer|cuffie|耳机|ěrjī|헤드폰|سماعات
shopping|carregador|charger|cargador|chargeur|じゅうでんき|зарядное устройство|Ladegerät|caricabatterie|充电器|chōngdiànqì|충전기|شاحن
shopping|cabo|cable|cable|câble|ケーブル|кабель|Kabel|cavo|电缆|diànlǎn|케이블|كابل
shopping|bateria|battery|batería|batterie|バッテリー|батарея|Batterie|batteria|电池|diànchí|배터리|بطارية
shopping|pequeno|small|pequeño|petit|ちいさい|маленький|klein|piccolo|小|xiǎo|작은|صغير
shopping|médio|medium|mediano|moyen|ちゅうくらい|средний|mittel|medio|中|zhōng|중간|متوسط
shopping|grande|large|grande|grand|おおきい|большой|groß|grande|大|dà|큰|كبير
shopping|barato|cheap|barato|pas cher|やすい|дешёвый|günstig|economico|便宜|piányi|저렴한|رخيص
shopping|caro|expensive|caro|cher|たかい|дорогой|teuer|costoso|贵|guì|비싼|غالي
shopping|provar roupa|try on clothes|probarse ropa|essayer un vêtement|しちゃくする|примерить одежду|Kleidung anprobieren|provare i vestiti|试穿衣服|shìchuān yīfu|옷을 입어 보다|تجربة الملابس
shopping|troca|exchange|cambio|échange|こうかん|обмен|Umtausch|cambio|换货|huànhuò|교환|استبدال
shopping|devolução|return|devolución|retour|へんぴん|возврат|Rückgabe|reso|退货|tuìhuò|반품|إرجاع
shopping|garantia|warranty|garantía|garantie|ほしょう|гарантия|Garantie|garanzia|保修|bǎoxiū|보증|ضمان
shopping|carrinho de compras|shopping cart|carrito de compra|chariot|ショッピングカート|тележка|Einkaufswagen|carrello|购物车|gòuwùchē|쇼핑 카트|عربة التسوق
shopping|cesta|basket|cesta|panier|かご|корзина|Korb|cestino|篮子|lánzi|바구니|سلة
conversation|conversa|conversation|conversación|conversation|かいわ|разговор|Gespräch|conversazione|谈话|tánhuà|대화|محادثة
conversation|pergunta|question|pregunta|question|しつもん|вопрос|Frage|domanda|问题|wèntí|질문|سؤال
conversation|resposta|answer|respuesta|réponse|こたえ|ответ|Antwort|risposta|回答|huídá|답변|إجابة
conversation|frase|sentence|frase|phrase|ぶん|предложение|Satz|frase|句子|jùzi|문장|جملة
conversation|palavra|word|palabra|mot|ことば|слово|Wort|parola|词语|cíyǔ|단어|كلمة
conversation|significado|meaning|significado|signification|いみ|значение|Bedeutung|significato|意思|yìsi|의미|معنى
conversation|idioma|language|idioma|langue|げんご|язык|Sprache|lingua|语言|yǔyán|언어|لغة
conversation|voz|voice|voz|voix|こえ|голос|Stimme|voce|声音|shēngyīn|목소리|صوت
conversation|som|sound|sonido|son|おと|звук|Geräusch|suono|声音|shēngyīn|소리|صوت
conversation|pronúncia|pronunciation|pronunciación|prononciation|はつおん|произношение|Aussprache|pronuncia|发音|fāyīn|발음|نطق
conversation|sotaque|accent|acento|accent|なまり|акцент|Akzent|accento|口音|kǒuyīn|억양|لكنة
conversation|mensagem|message|mensaje|message|メッセージ|сообщение|Nachricht|messaggio|消息|xiāoxi|메시지|رسالة
conversation|mensagem de texto|text message|mensaje de texto|message texte|テキストメッセージ|текстовое сообщение|Textnachricht|messaggio di testo|短信|duǎnxìn|문자 메시지|رسالة نصية
conversation|e-mail|email|correo electrónico|courriel|メール|электронное письмо|E-Mail|e-mail|电子邮件|diànzǐ yóujiàn|이메일|بريد إلكتروني
conversation|telefonema|phone call|llamada telefónica|appel téléphonique|でんわ|телефонный звонок|Anruf|telefonata|电话|diànhuà|전화 통화|مكالمة هاتفية
conversation|carta|letter|carta|lettre|てがみ|письмо|Brief|lettera|信|xìn|편지|رسالة
conversation|interlocutor|conversation partner|interlocutor|interlocuteur|あいて|собеседник|Gesprächspartner|interlocutore|交谈对象|jiāotán duìxiàng|대화 상대|محاور
conversation|assunto|topic|tema|sujet|わだい|тема|Thema|argomento|话题|huàtí|주제|موضوع
conversation|opinião|opinion|opinión|opinion|いけん|мнение|Meinung|opinione|意见|yìjiàn|의견|رأي
conversation|ideia|idea|idea|idée|かんがえ|идея|Idee|idea|想法|xiǎngfǎ|생각|فكرة
conversation|sugestão|suggestion|sugerencia|suggestion|ていあん|предложение|Vorschlag|suggerimento|建议|jiànyì|제안|اقتراح
conversation|motivo|reason|motivo|raison|りゆう|причина|Grund|motivo|原因|yuányīn|이유|سبب
conversation|exemplo|example|ejemplo|exemple|れい|пример|Beispiel|esempio|例子|lìzi|예시|مثال
conversation|história|story|historia|histoire|ものがたり|история|Geschichte|storia|故事|gùshi|이야기|قصة
conversation|piada|joke|broma|blague|じょうだん|шутка|Witz|barzelletta|笑话|xiàohua|농담|نكتة
conversation|notícia|news|noticia|nouvelle|ニュース|новость|Nachricht|notizia|新闻|xīnwén|뉴스|خبر
conversation|informação|information|información|information|じょうほう|информация|Information|informazione|信息|xìnxī|정보|معلومة
conversation|detalhe|detail|detalle|détail|くわしいこと|подробность|Einzelheit|dettaglio|细节|xìjié|세부 사항|تفصيل
conversation|explicação|explanation|explicación|explication|せつめい|объяснение|Erklärung|spiegazione|解释|jiěshì|설명|شرح
conversation|tradução|translation|traducción|traduction|ほんやく|перевод|Übersetzung|traduzione|翻译|fānyì|번역|ترجمة
conversation|expressão|expression|expresión|expression|ひょうげん|выражение|Ausdruck|espressione|表达|biǎodá|표현|تعبير
conversation|frase feita|phrase|frase hecha|expression|きまりもんく|фраза|Redewendung|modo di dire|短语|duǎnyǔ|관용구|عبارة
conversation|intérprete|interpreter|intérprete|interprète|つうやくしゃ|переводчик устный|Dolmetscher|interprete|口译员|kǒuyìyuán|통역사|مترجم شفهي
conversation|microfone|microphone|micrófono|microphone|マイク|микрофон|Mikrofon|microfono|麦克风|màikèfēng|마이크|ميكروفون
conversation|pausa|pause|pausa|pause|ま|пауза|Pause|pausa|停顿|tíngdùn|잠깐 멈춤|وقفة
conversation|silêncio|silence|silencio|silence|ちんもく|тишина|Stille|silenzio|沉默|chénmò|침묵|صمت
conversation|sua vez|your turn|tu turno|à votre tour|あなたのばん|ваша очередь|Sie sind dran|tocca a te|轮到你了|lún dào nǐ le|당신 차례|دورك
conversation|discussão|discussion|discusión|discussion|ぎろん|обсуждение|Diskussion|discussione|讨论|tǎolùn|토론|نقاش
conversation|debate|debate|debate|débat|ディベート|дебаты|Debatte|dibattito|辩论|biànlùn|토론|مناظرة
conversation|concordância|agreement|acuerdo|accord|さんせい|согласие|Zustimmung|accordo|同意|tóngyì|동의|موافقة
conversation|discordância|disagreement|desacuerdo|désaccord|はんたい|несогласие|Meinungsverschiedenheit|disaccordo|不同意|bù tóngyì|반대|اختلاف
conversation|dúvida|doubt|duda|doute|ぎもん|сомнение|Zweifel|dubbio|疑问|yíwèn|의문|شك
conversation|ponto de interrogação|question mark|signo de interrogación|point d’interrogation|ぎもんふ|вопросительный знак|Fragezeichen|punto interrogativo|问号|wènhào|물음표|علامة استفهام
conversation|sim|yes|sí|oui|はい|да|ja|sì|是|shì|네|نعم
conversation|não|no|no|non|いいえ|нет|nein|no|不|bù|아니요|لا
conversation|talvez|maybe|quizás|peut-être|たぶん|может быть|vielleicht|forse|也许|yěxǔ|아마|ربما
conversation|claro|of course|claro|bien sûr|もちろん|конечно|natürlich|certo|当然|dāngrán|물론|بالطبع
conversation|eu acho|I think|creo|je pense|そうおもいます|я думаю|Ich denke|penso|我觉得|wǒ juéde|제 생각에는|أعتقد
conversation|na minha opinião|in my opinion|en mi opinión|à mon avis|わたしのいけんでは|по моему мнению|meiner Meinung nach|secondo me|在我看来|zài wǒ kàn lái|제 의견으로는|في رأيي
conversation|realmente|really|realmente|vraiment|ほんとうに|действительно|wirklich|davvero|真的|zhēn de|정말|حقًا
conversation|provavelmente|probably|probablemente|probablement|たぶん|вероятно|wahrscheinlich|probabilmente|可能|kěnéng|아마도|على الأرجح
conversation|exatamente|exactly|exactamente|exactement|そのとおり|именно|genau|esattamente|正是|zhèng shì|정확히|بالضبط
conversation|quase|almost|casi|presque|もうすこしで|почти|fast|quasi|几乎|jīhū|거의|تقريبًا
conversation|de novo|again|otra vez|encore|もういちど|ещё раз|noch einmal|di nuovo|再一次|zài yí cì|다시|مرة أخرى
conversation|devagar|slowly|despacio|lentement|ゆっくり|медленно|langsam|lentamente|慢慢地|mànmàn de|천천히|ببطء
conversation|claramente|clearly|claramente|clairement|はっきり|ясно|deutlich|chiaramente|清楚地|qīngchu de|분명하게|بوضوح
conversation|rapidamente|quickly|rápidamente|rapidement|はやく|быстро|schnell|rapidamente|快速地|kuàisù de|빠르게|بسرعة
conversation|em voz alta|loudly|en voz alta|à voix haute|おおきなこえで|громко|laut|ad alta voce|大声地|dàshēng de|큰 소리로|بصوت عالٍ
conversation|baixinho|quietly|en voz baja|à voix basse|しずかに|тихо|leise|a bassa voce|轻声地|qīngshēng de|조용히|بهدوء
conversation|porque|because|porque|parce que|なぜなら|потому что|weil|perché|因为|yīnwèi|왜냐하면|لأن
conversation|embora|although|aunque|bien que|だけれども|хотя|obwohl|sebbene|虽然|suīrán|비록|على الرغم من
conversation|portanto|therefore|por lo tanto|donc|したがって|поэтому|deshalb|quindi|因此|yīncǐ|그러므로|لذلك
conversation|mas|but|pero|mais|しかし|но|aber|ma|但是|dànshì|하지만|لكن
conversation|e|and|y|et|そして|и|und|e|和|hé|그리고|و
conversation|ou|or|o|ou|または|или|oder|o|或者|huòzhě|또는|أو
conversation|sem|without|sin|sans|なしで|без|ohne|senza|没有|méiyǒu|없이|بدون
conversation|antes|before|antes|avant|まえに|до|vorher|prima|以前|yǐqián|전에|قبل
conversation|depois|after|después|après|あとで|после|danach|dopo|以后|yǐhòu|후에|بعد
conversation|o quê|what|qué|quoi|なに|что|was|che cosa|什么|shénme|무엇|ماذا
conversation|quem|who|quién|qui|だれ|кто|wer|chi|谁|shéi|누구|من
conversation|onde|where|dónde|où|どこ|где|wo|dove|哪里|nǎlǐ|어디|أين
conversation|quando|when|cuándo|quand|いつ|когда|wann|quando|什么时候|shénme shíhou|언제|متى
conversation|por quê|why|por qué|pourquoi|なぜ|почему|warum|perché|为什么|wèishénme|왜|لماذا
conversation|como|how|cómo|comment|どうやって|как|wie|come|怎么|zěnme|어떻게|كيف
conversation|qual|which|cuál|lequel|どれ|который|welcher|quale|哪一个|nǎ yí ge|어느 것|أيّ
study|escola|school|escuela|école|がっこう|школа|Schule|scuola|学校|xuéxiào|학교|مدرسة
study|sala de aula|classroom|aula|salle de classe|きょうしつ|класс|Klassenzimmer|aula|教室|jiàoshì|교실|فصل دراسي
study|universidade|university|universidad|université|だいがく|университет|Universität|università|大学|dàxué|대학교|جامعة
study|aluno|student|estudiante|étudiant|がくせい|ученик|Schüler|studente|学生|xuéshēng|학생|طالب
study|professor|teacher|profesor|enseignant|せんせい|учитель|Lehrer|insegnante|老师|lǎoshī|선생님|معلم
study|aula|class|clase|cours|じゅぎょう|урок|Unterricht|lezione|课|kè|수업|درس
study|lição|lesson|lección|leçon|レッスン|урок|Lektion|lezione|课程|kèchéng|수업|درس
study|curso|course|curso|cours|コース|курс|Kurs|corso|课程|kèchéng|과정|دورة
study|matéria escolar|subject|asignatura|matière|かもく|предмет|Fach|materia|科目|kēmù|과목|مادة دراسية
study|livro didático|textbook|libro de texto|manuel scolaire|きょうかしょ|учебник|Lehrbuch|libro di testo|课本|kèběn|교과서|كتاب مدرسي
study|caderno|notebook|cuaderno|cahier|ノート|тетрадь|Heft|quaderno|笔记本|bǐjìběn|공책|دفتر
study|papel|paper|papel|papier|かみ|бумага|Papier|carta|纸|zhǐ|종이|ورق
study|lápis|pencil|lápiz|crayon|えんぴつ|карандаш|Bleistift|matita|铅笔|qiānbǐ|연필|قلم رصاص
study|caneta|pen|bolígrafo|stylo|ペン|ручка|Kugelschreiber|penna|笔|bǐ|펜|قلم
study|borracha|eraser|borrador|gomme|けしゴム|ластик|Radiergummi|gomma|橡皮|xiàngpí|지우개|ممحاة
study|régua|ruler|regla|règle|じょうぎ|линейка|Lineal|righello|尺子|chǐzi|자|مسطرة
study|marcador|marker|marcador|marqueur|マーカー|маркер|Marker|pennarello|记号笔|jìhàobǐ|마커|قلم تحديد
study|carteira escolar|school desk|pupitre|bureau d’écolier|つくえ|школьная парта|Schultisch|banco scolastico|课桌|kèzhuō|책상|مقعد دراسي
study|cadeira|chair|silla|chaise|いす|стул|Stuhl|sedia|椅子|yǐzi|의자|كرسي
study|quadro|board|pizarra|tableau|こくばん|доска|Tafel|lavagna|黑板|hēibǎn|칠판|لوح
study|giz|chalk|tiza|craie|チョーク|мел|Kreide|gesso|粉笔|fěnbǐ|분필|طبشور
study|dicionário|dictionary|diccionario|dictionnaire|じしょ|словарь|Wörterbuch|dizionario|词典|cídiǎn|사전|قاموس
study|vocabulário|vocabulary|vocabulario|vocabulaire|ごい|словарный запас|Wortschatz|vocabolario|词汇|cíhuì|어휘|مفردات
study|gramática|grammar|gramática|grammaire|ぶんぽう|грамматика|Grammatik|grammatica|语法|yǔfǎ|문법|قواعد
study|alfabeto|alphabet|alfabeto|alphabet|アルファベット|алфавит|Alphabet|alfabeto|字母表|zìmǔbiǎo|알파벳|أبجدية
study|caractere|character|carácter|caractère|もじ|иероглиф|Schriftzeichen|carattere|文字|wénzì|글자|حرف
study|kanji|kanji|kanji|kanji|かんじ|кандзи|Kanji|kanji|日文汉字|rìwén hànzì|한자|كانجي
study|hiragana|hiragana|hiragana|hiragana|ひらがな|хирагана|Hiragana|hiragana|平假名|píngjiǎmíng|히라가나|هيراغانا
study|katakana|katakana|katakana|katakana|カタカナ|катакана|Katakana|katakana|片假名|piànjiǎmíng|가타카나|كاتاكانا
study|cirílico|Cyrillic|cirílico|cyrillique|キリルもじ|кириллица|Kyrillisch|cirillico|西里尔字母|xīlǐ'ěr zìmǔ|키릴 문자|السيريلية
study|sílaba|syllable|sílaba|syllabe|おんせつ|слог|Silbe|sillaba|音节|yīnjié|음절|مقطع لفظي
study|pronúncia|pronunciation|pronunciación|prononciation|はつおん|произношение|Aussprache|pronuncia|发音|fāyīn|발음|نطق
study|tradução|translation|traducción|traduction|ほんやく|перевод|Übersetzung|traduzione|翻译|fānyì|번역|ترجمة
study|exercício|exercise|ejercicio|exercice|れんしゅう|упражнение|Übung|esercizio|练习|liànxí|연습|تمرين
study|dever de casa|homework|tarea|devoirs|しゅくだい|домашнее задание|Hausaufgaben|compiti|作业|zuòyè|숙제|واجب منزلي
study|tarefa|assignment|tarea|travail|かだい|задание|Aufgabe|compito|任务|rènwu|과제|مهمة
study|projeto|project|proyecto|projet|プロジェクト|проект|Projekt|progetto|项目|xiàngmù|프로젝트|مشروع
study|exame|exam|examen|examen|しけん|экзамен|Prüfung|esame|考试|kǎoshì|시험|امتحان
study|prova|test|prueba|test|テスト|тест|Test|test|测验|cèyàn|테스트|اختبار
study|questionário|quiz|cuestionario|questionnaire|クイズ|викторина|Quiz|quiz|小测验|xiǎo cèyàn|퀴즈|اختبار قصير
study|nota escolar|grade|nota|note|せいせき|оценка|Note|voto|成绩|chéngjì|성적|درجة
study|resultado|result|resultado|résultat|けっか|результат|Ergebnis|risultato|结果|jiéguǒ|결과|نتيجة
study|resposta|answer|respuesta|réponse|こたえ|ответ|Antwort|risposta|答案|dá'àn|답|답
study|pergunta|question|pregunta|question|しつもん|вопрос|Frage|domanda|问题|wèntí|질문|سؤال
study|exemplo|example|ejemplo|exemple|れい|пример|Beispiel|esempio|例子|lìzi|예시|مثال
study|explicação|explanation|explicación|explication|せつめい|объяснение|Erklärung|spiegazione|解释|jiěshì|설명|شرح
study|instrução|instruction|instrucción|consigne|しじ|инструкция|Anweisung|istruzione|说明|shuōmíng|지시|تعليمات
study|regra|rule|regla|règle|ルール|правило|Regel|regola|规则|guīzé|규칙|قاعدة
study|anotação|note|apunte|note|メモ|заметка|Notiz|appunto|笔记|bǐjì|메모|ملاحظة
study|resumo|summary|resumen|résumé|ようやく|краткое содержание|Zusammenfassung|riassunto|摘要|zhāiyào|요약|ملخص
study|capítulo|chapter|capítulo|chapitre|しょう|глава|Kapitel|capitolo|章节|zhāngjié|장|فصل
study|página|page|página|page|ページ|страница|Seite|pagina|页|yè|페이지|صفحة
study|parágrafo|paragraph|párrafo|paragraphe|だんらく|абзац|Absatz|paragrafo|段落|duànluò|문단|فقرة
study|título|title|título|titre|タイトル|заголовок|Titel|titolo|标题|biāotí|제목|عنوان
study|biblioteca|library|biblioteca|bibliothèque|としょかん|библиотека|Bibliothek|biblioteca|图书馆|túshūguǎn|도서관|مكتبة
study|laboratório|laboratory|laboratorio|laboratoire|じっけんしつ|лаборатория|Labor|laboratorio|实验室|shíyànshì|실험실|مختبر
study|computador|computer|computadora|ordinateur|コンピューター|компьютер|Computer|computer|电脑|diànnǎo|컴퓨터|حاسوب
study|tela|screen|pantalla|écran|スクリーン|экран|Bildschirm|schermo|屏幕|píngmù|화면|شاشة
study|teclado|keyboard|teclado|clavier|キーボード|клавиатура|Tastatur|tastiera|键盘|jiànpán|키보드|لوحة مفاتيح
study|internet|internet|internet|internet|インターネット|интернет|Internet|internet|互联网|hùliánwǎng|인터넷|إنترنت
study|pesquisa|research|investigación|recherche|けんきゅう|исследование|Forschung|ricerca|研究|yánjiū|연구|بحث
study|fonte|source|fuente|source|しゅってん|источник|Quelle|fonte|来源|láiyuán|출처|مصدر
study|referência|reference|referencia|référence|さんこうぶんけん|ссылка|Referenz|riferimento|参考资料|cānkǎo zīliào|참고 자료|مرجع
study|apresentação|presentation|presentación|présentation|はっぴょう|презентация|Präsentation|presentazione|演示|yǎnshì|발표|عرض تقديمي
study|grupo|group|grupo|groupe|グループ|группа|Gruppe|gruppo|小组|xiǎozǔ|그룹|مجموعة
study|dupla|pair|pareja|binôme|ペア|пара|Paar|coppia|搭档|dādàng|짝|ثنائي
study|intervalo|break|recreo|pause|やすみじかん|перемена|Pause|intervallo|休息|xiūxi|쉬는 시간|استراحة
study|semestre|semester|semestre|semestre|はんき|семестр|Semester|semestre|学期|xuéqī|학기|فصل دراسي
study|horário|schedule|horario|emploi du temps|じかんわり|расписание|Stundenplan|orario|课程表|kèchéngbiǎo|시간표|جدول
study|prazo|deadline|fecha límite|date limite|しめきり|срок сдачи|Abgabetermin|scadenza|截止日期|jiézhǐ rìqī|마감일|موعد نهائي
study|estudo|study|estudio|étude|べんきょう|учёба|Studium|studio|学习|xuéxí|공부|دراسة
study|prática|practice|práctica|pratique|れんしゅう|практика|Praxis|pratica|练习|liànxí|연습|ممارسة
study|revisão|review|repaso|révision|ふくしゅう|повторение|Wiederholung|ripasso|复习|fùxí|복습|مراجعة
study|formatura|graduation|graduación|remise des diplômes|そつぎょう|выпускной|Abschluss|laurea|毕业|bìyè|졸업|تخرج
study|diploma|diploma|diploma|diplôme|そつぎょうしょうしょ|диплом|Diplom|diploma|毕业证书|bìyè zhèngshū|졸업장|شهادة
work|trabalho|work|trabajo|travail|しごと|работа|Arbeit|lavoro|工作|gōngzuò|일|عمل
work|emprego|job|empleo|emploi|しょく|работа|Stelle|impiego|职位|zhíwèi|직업|وظيفة
work|local de trabalho|workplace|lugar de trabajo|lieu de travail|しょくば|рабочее место|Arbeitsplatz|posto di lavoro|工作场所|gōngzuò chǎngsuǒ|직장|مكان العمل
work|escritório|office|oficina|bureau|オフィス|офис|Büro|ufficio|办公室|bàngōngshì|사무실|مكتب
work|empresa|company|empresa|entreprise|かいしゃ|компания|Unternehmen|azienda|公司|gōngsī|회사|شركة
work|negócio|business|negocio|affaires|ビジネス|бизнес|Geschäft|affari|生意|shēngyi|사업|أعمال
work|equipe|team|equipo|équipe|チーム|команда|Team|squadra|团队|tuánduì|팀|فريق
work|departamento|department|departamento|service|ぶしょ|отдел|Abteilung|reparto|部门|bùmén|부서|قسم
work|colega|colleague|compañero|collègue|どうりょう|коллега|Kollege|collega|同事|tóngshì|동료|زميل
work|supervisor|supervisor|supervisor|superviseur|かんとくしゃ|руководитель|Vorgesetzter|supervisore|主管|zhǔguǎn|감독자|مشرف
work|gerente|manager|gerente|directeur|マネージャー|менеджер|Manager|dirigente|经理|jīnglǐ|관리자|مدير
work|diretor|director|director|directeur|しちょう|директор|Direktor|direttore|主任|zhǔrèn|이사|مدير
work|funcionário|employee|empleado|employé|しゃいん|сотрудник|Mitarbeiter|dipendente|员工|yuángōng|직원|موظف
work|empregador|employer|empleador|employeur|やといぬし|работодатель|Arbeitgeber|datore di lavoro|雇主|gùzhǔ|고용주|صاحب العمل
work|cliente|client|cliente|client|クライアント|клиент|Kunde|cliente|客户|kèhù|고객|عميل
work|reunião|meeting|reunión|réunion|かいぎ|совещание|Besprechung|riunione|会议|huìyì|회의|اجتماع
work|pauta|agenda|orden del día|ordre du jour|ぎだい|повестка дня|Tagesordnung|ordine del giorno|议程|yìchéng|의제|جدول الأعمال
work|compromisso|appointment|cita|rendez-vous|よてい|встреча|Termin|appuntamento|预约|yùyuē|약속|موعد
work|cronograma|schedule|cronograma|calendrier|スケジュール|график|Zeitplan|programma|时间表|shíjiānbiǎo|일정|جدول زمني
work|prazo final|deadline|fecha límite|échéance|しめきり|крайний срок|Frist|scadenza|截止日期|jiézhǐ rìqī|마감일|موعد نهائي
work|projeto|project|proyecto|projet|プロジェクト|проект|Projekt|progetto|项目|xiàngmù|프로젝트|مشروع
work|tarefa|task|tarea|tâche|タスク|задача|Aufgabe|compito|任务|rènwu|업무|مهمة
work|responsabilidade|assignment|encargo|mission|やくわり|поручение|Auftrag|incarico|职责|zhízé|담당 업무|تكليف
work|relatório|report|informe|rapport|レポート|отчёт|Bericht|relazione|报告|bàogào|보고서|تقرير
work|documento|document|documento|document|しょるい|документ|Dokument|documento|文件|wénjiàn|문서|وثيقة
work|contrato|contract|contrato|contrat|けいやく|договор|Vertrag|contratto|合同|hétong|계약서|عقد
work|e-mail|email|correo electrónico|e-mail|メール|электронное письмо|E-Mail|e-mail|电子邮件|diànzǐ yóujiàn|이메일|بريد إلكتروني
work|telefonema|phone call|llamada|appel téléphonique|でんわ|звонок|Anruf|telefonata|电话|diànhuà|전화 통화|مكالمة هاتفية
work|mensagem|message|mensaje|message|メッセージ|сообщение|Nachricht|messaggio|消息|xiāoxi|메시지|رسالة
work|apresentação|presentation|presentación|présentation|プレゼンテーション|презентация|Präsentation|presentazione|演示|yǎnshì|발표|عرض تقديمي
work|proposta|proposal|propuesta|proposition|ていあん|предложение|Vorschlag|proposta|提议|tíyì|제안|اقتراح
work|plano|plan|plan|plan|けいかく|план|Plan|piano|计划|jìhuà|계획|خطة
work|objetivo|goal|objetivo|objectif|もくひょう|цель|Ziel|obiettivo|目标|mùbiāo|목표|هدف
work|resultado|result|resultado|résultat|けっか|результат|Ergebnis|risultato|结果|jiéguǒ|결과|نتيجة
work|decisão|decision|decisión|décision|けってい|решение|Entscheidung|decisione|决定|juédìng|결정|قرار
work|acordo|agreement|acuerdo|accord|ごうい|соглашение|Vereinbarung|accordo|协议|xiéyì|합의|اتفاق
work|orçamento|budget|presupuesto|budget|よさん|бюджет|Budget|bilancio|预算|yùsuàn|예산|ميزانية
work|fatura|invoice|factura|facture|せいきゅうしょ|счёт|Rechnung|fattura|发票|fāpiào|청구서|فاتورة
work|pagamento|payment|pago|paiement|しはらい|оплата|Zahlung|pagamento|付款|fùkuǎn|결제|دفع
work|salário|salary|salario|salaire|きゅうりょう|зарплата|Gehalt|stipendio|工资|gōngzī|급여|راتب
work|bônus|bonus|bono|prime|ボーナス|премия|Bonus|bonus|奖金|jiǎngjīn|보너스|مكافأة
work|benefício|benefit|beneficio|avantage|てあて|льгота|Vorteil|benefit|福利|fúlì|복리후생|ميزة
work|férias|vacation|vacaciones|vacances|きゅうか|отпуск|Urlaub|vacanza|假期|jiàqī|휴가|إجازة
work|turno|shift|turno|équipe|シフト|смена|Schicht|turno|班次|bāncì|교대 근무|مناوبة
work|intervalo|break|descanso|pause|きゅうけい|перерыв|Pause|pausa|休息|xiūxi|휴식 시간|استراحة
work|treinamento|training|formación|formation|けんしゅう|обучение|Schulung|formazione|培训|péixùn|교육|تدريب
work|experiência|experience|experiencia|expérience|けいけん|опыт|Erfahrung|esperienza|经验|jīngyàn|경험|خبرة
work|habilidade|skill|habilidad|compétence|ぎのう|навык|Fähigkeit|abilità|技能|jìnéng|기술|مهارة
work|carreira|career|carrera|carrière|キャリア|карьера|Karriere|carriera|职业生涯|zhíyè shēngyá|경력|مسيرة مهنية
work|profissão|profession|profesión|profession|しょくぎょう|профессия|Beruf|professione|职业|zhíyè|직업|مهنة
work|entrevista de emprego|job interview|entrevista de trabajo|entretien d’embauche|めんせつ|собеседование|Vorstellungsgespräch|colloquio di lavoro|求职面试|qiúzhí miànshì|취업 면접|مقابلة عمل
work|currículo|résumé|currículum|CV|りれきしょ|резюме|Lebenslauf|curriculum vitae|简历|jiǎnlì|이력서|سيرة ذاتية
work|candidatura|application|solicitud|candidature|おうぼ|заявка|Bewerbung|candidatura|申请|shēnqǐng|지원서|طلب توظيف
work|contratação|hiring|contratación|recrutement|さいよう|приём на работу|Einstellung|assunzione|招聘|zhāopìn|채용|توظيف
work|pedido de demissão|resignation|renuncia|démission|たいしょく|увольнение по собственному желанию|Kündigung|dimissioni|辞职|cízhí|사직|استقالة
work|promoção|promotion|ascenso|promotion|しょうしん|повышение|Beförderung|promozione|晋升|jìnshēng|승진|ترقية
work|trabalho em equipe|teamwork|trabajo en equipo|travail d’équipe|チームワーク|командная работа|Teamarbeit|lavoro di squadra|团队合作|tuánduì hézuò|팀워크|عمل جماعي
work|estação de trabalho|workstation|estación de trabajo|poste de travail|ワークステーション|рабочее место|Arbeitsplatz|postazione di lavoro|工作站|gōngzuòzhàn|워크스테이션|محطة عمل
work|mesa de escritório|desk|escritorio|bureau|つくえ|письменный стол|Schreibtisch|scrivania|办公桌|bàngōngzhuō|책상|مكتب
work|cadeira de escritório|office chair|silla de oficina|chaise de bureau|オフィスチェア|офисное кресло|Bürostuhl|sedia da ufficio|办公椅|bàngōngyǐ|사무용 의자|كرسي مكتب
work|computador|computer|computadora|ordinateur|コンピューター|компьютер|Computer|computer|电脑|diànnǎo|컴퓨터|حاسوب
work|teclado|keyboard|teclado|clavier|キーボード|клавиатура|Tastatur|tastiera|键盘|jiànpán|키보드|لوحة مفاتيح
work|tela|screen|pantalla|écran|スクリーン|экран|Bildschirm|schermo|屏幕|píngmù|화면|شاشة
work|impressora|printer|impresora|imprimante|プリンター|принтер|Drucker|stampante|打印机|dǎyìnjī|프린터|طابعة
work|papel|paper|papel|papier|かみ|бумага|Papier|carta|纸|zhǐ|종이|ورق
work|pasta de documentos|folder|carpeta|dossier|フォルダー|папка|Ordner|cartella|文件夹|wénjiànjiā|폴더|مجلد
work|arquivo|file|archivo|fichier|ファイル|файл|Datei|file|文件|wénjiàn|파일|ملف
work|calendário|calendar|calendario|calendrier|カレンダー|календарь|Kalender|calendario|日历|rìlì|달력|تقويم
work|caderno|notebook|cuaderno|carnet|ノート|блокнот|Notizbuch|quaderno|笔记本|bǐjìběn|수첩|دفتر
work|caneta|pen|bolígrafo|stylo|ペン|ручка|Stift|penna|笔|bǐ|펜|قلم
work|fone de ouvido com microfone|headset|auriculares con micrófono|casque avec micro|ヘッドセット|гарнитура|Headset|cuffie con microfono|耳麦|ěrmài|헤드셋|سماعة رأس بميكروفون
work|software|software|software|logiciel|ソフトウェア|программное обеспечение|Software|software|软件|ruǎnjiàn|소프트웨어|برنامج
work|rede|network|red|réseau|ネットワーク|сеть|Netzwerk|rete|网络|wǎngluò|네트워크|شبكة
work|senha|password|contraseña|mot de passe|パスワード|пароль|Passwort|password|密码|mìmǎ|비밀번호|كلمة مرور
work|cartão de visita|business card|tarjeta de visita|carte de visite|めいし|визитная карточка|Visitenkarte|biglietto da visita|名片|míngpiàn|명함|بطاقة عمل
emergency|emergência|emergency|emergencia|urgence|きんきゅう|чрезвычайная ситуация|Notfall|emergenza|紧急情况|jǐnjí qíngkuàng|응급 상황|حالة طارئة
emergency|ajuda|help|ayuda|aide|たすけ|помощь|Hilfe|aiuto|帮助|bāngzhù|도움|مساعدة
emergency|serviço de emergência|emergency service|servicio de emergencia|service d’urgence|きゅうきゅうサービス|служба экстренной помощи|Notdienst|servizio di emergenza|急救服务|jíjiù fúwù|응급 서비스|خدمة الطوارئ
emergency|perigo|danger|peligro|danger|きけん|опасность|Gefahr|pericolo|危险|wēixiǎn|위험|خطر
emergency|acidente|accident|accidente|accident|じこ|несчастный случай|Unfall|incidente|事故|shìgù|사고|حادث
emergency|fogo|fire|fuego|feu|ひ|огонь|Feuer|fuoco|火|huǒ|불|نار
emergency|fumaça|smoke|humo|fumée|けむり|дым|Rauch|fumo|烟|yān|연기|دخان
emergency|ambulância|ambulance|ambulancia|ambulance|きゅうきゅうしゃ|скорая помощь|Krankenwagen|ambulanza|救护车|jiùhùchē|구급차|سيارة إسعاف
emergency|hospital|hospital|hospital|hôpital|びょういん|больница|Krankenhaus|ospedale|医院|yīyuàn|병원|مستشفى
emergency|clínica|clinic|clínica|clinique|クリニック|клиника|Klinik|clinica|诊所|zhěnsuǒ|진료소|عيادة
emergency|médico|doctor|médico|médecin|いしゃ|врач|Arzt|medico|医生|yīshēng|의사|طبيب
emergency|enfermeiro|nurse|enfermero|infirmier|かんごし|медбрат|Krankenpfleger|infermiere|护士|hùshi|간호사|ممرض
emergency|polícia|police|policía|police|けいさつ|полиция|Polizei|polizia|警察|jǐngchá|경찰|شرطة
emergency|bombeiros|firefighters|bomberos|pompiers|しょうぼうし|пожарные|Feuerwehr|vigili del fuoco|消防员|xiāofángyuán|소방관|رجال الإطفاء
emergency|resgate|rescue|rescate|secours|きゅうじょ|спасение|Rettung|soccorso|救援|jiùyuán|구조|إنقاذ
emergency|primeiros socorros|first aid|primeros auxilios|premiers secours|おうきゅうてあて|первая помощь|Erste Hilfe|primo soccorso|急救|jíjiù|응급 처치|إسعافات أولية
emergency|ferida|wound|herida|blessure|きず|рана|Wunde|ferita|伤口|shāngkǒu|상처|جرح
emergency|sangramento|bleeding|sangrado|saignement|しゅっけつ|кровотечение|Blutung|sanguinamento|出血|chūxuè|출혈|نزيف
emergency|queimadura|burn|quemadura|brûlure|やけど|ожог|Verbrennung|ustione|烧伤|shāoshāng|화상|حرق
emergency|hematoma|bruise|moretón|ecchymose|あざ|синяк|Bluterguss|livido|瘀伤|yūshāng|멍|كدمة
emergency|fratura|fracture|fractura|fracture|こっせつ|перелом|Bruch|frattura|骨折|gǔzhé|골절|كسر
emergency|dor|pain|dolor|douleur|いたみ|боль|Schmerz|dolore|疼痛|téngtòng|통증|ألم
emergency|inconsciente|unconscious|inconsciente|inconscient|いしきふめい|без сознания|bewusstlos|incosciente|失去意识|shīqù yìshí|의식이 없는|فاقد الوعي
emergency|respiração|breathing|respiración|respiration|こきゅう|дыхание|Atmung|respirazione|呼吸|hūxī|호흡|تنفس
emergency|engasgo|choking|atragantamiento|étouffement|ちっそく|удушье|Ersticken|soffocamento|窒息|zhìxī|질식|اختناق
emergency|alergia|allergy|alergia|allergie|アレルギー|аллергия|Allergie|allergia|过敏|guòmǐn|알레르기|حساسية
emergency|remédio|medicine|medicamento|médicament|くすり|лекарство|Medikament|medicina|药|yào|약|دواء
emergency|curativo|bandage|vendaje|pansement|ばんそうこう|бинт|Pflaster|cerotto|创可贴|chuàngkětiē|반창고|ضمادة
emergency|gaze|gauze|gasa|gaze|ガーゼ|марля|Mull|garza|纱布|shābù|거즈|شاش
emergency|antisséptico|antiseptic|antiséptico|antiseptique|しょうどくざい|антисептик|Antiseptikum|antisettico|消毒剂|xiāodújì|소독제|مطهر
emergency|bolsa de gelo|ice pack|bolsa de hielo|poche de glace|アイスパック|пакет со льдом|Kühlpackung|borsa del ghiaccio|冰袋|bīngdài|얼음 주머니|كيس ثلج
emergency|termômetro|thermometer|termómetro|thermomètre|たいおんけい|термометр|Thermometer|termometro|体温计|tǐwēnjì|체온계|مقياس حرارة
emergency|telefone|phone|teléfono|téléphone|でんわ|телефон|Telefon|telefono|电话|diànhuà|전화|هاتف
emergency|número de telefone|phone number|número de teléfono|numéro de téléphone|でんわばんごう|номер телефона|Telefonnummer|numero di telefono|电话号码|diànhuà hàomǎ|전화번호|رقم الهاتف
emergency|endereço|address|dirección|adresse|じゅうしょ|адрес|Adresse|indirizzo|地址|dìzhǐ|주소|عنوان
emergency|localização|location|ubicación|emplacement|ばしょ|местоположение|Standort|posizione|位置|wèizhì|위치|موقع
emergency|mapa|map|mapa|carte|ちず|карта|Karte|mappa|地图|dìtú|지도|خريطة
emergency|saída|exit|salida|sortie|でぐち|выход|Ausgang|uscita|出口|chūkǒu|출구|مخرج
emergency|entrada|entrance|entrada|entrée|いりぐち|вход|Eingang|ingresso|入口|rùkǒu|입구|مدخل
emergency|escada|stairs|escalera|escalier|かいだん|лестница|Treppe|scala|楼梯|lóutī|계단|درج
emergency|elevador|elevator|ascensor|ascenseur|エレベーター|лифт|Aufzug|ascensore|电梯|diàntī|엘리베이터|مصعد
emergency|alarme|alarm|alarma|alarme|アラーム|сигнализация|Alarm|allarme|警报|jǐngbào|경보|إنذار
emergency|alarme de incêndio|fire alarm|alarma de incendios|alarme incendie|かさいほうちき|пожарная сигнализация|Feueralarm|allarme antincendio|火警|huǒjǐng|화재 경보기|إنذار حريق
emergency|saída de emergência|emergency exit|salida de emergencia|sortie de secours|ひじょうぐち|аварийный выход|Notausgang|uscita di emergenza|紧急出口|jǐnjí chūkǒu|비상구|مخرج طوارئ
emergency|evacuação|evacuation|evacuación|évacuation|ひなん|эвакуация|Evakuierung|evacuazione|疏散|shūsàn|대피|إخلاء
emergency|abrigo|shelter|refugio|abri|ひなんじょ|убежище|Schutzraum|rifugio|避难所|bìnànsuǒ|대피소|مأوى
emergency|seguro|safe|seguro|sûr|あんぜん|безопасный|sicher|sicuro|安全|ānquán|안전한|آمن
emergency|inseguro|unsafe|inseguro|dangereux|あぶない|опасный|unsicher|insicuro|不安全|bù ānquán|위험한|غير آمن
emergency|aviso|warning|aviso|avertissement|けいこく|предупреждение|Warnung|avviso|警告|jǐnggào|경고|تحذير
emergency|risco|hazard|riesgo|risque|きけん|риск|Risiko|rischio|风险|fēngxiǎn|위험|مخاطر
emergency|eletricidade|electricity|electricidad|électricité|でんき|электричество|Elektrizität|elettricità|电|diàn|전기|كهرباء
emergency|vazamento de gás|gas leak|fuga de gas|fuite de gaz|ガスもれ|утечка газа|Gasleck|fuga di gas|燃气泄漏|ránqì xièlòu|가스 누출|تسرب غاز
emergency|inundação|flood|inundación|inondation|こうずい|наводнение|Überschwemmung|alluvione|洪水|hóngshuǐ|홍수|فيضان
emergency|tempestade|storm|tormenta|tempête|あらし|шторм|Sturm|tempesta|暴风雨|bàofēngyǔ|폭풍|عاصفة
emergency|terremoto|earthquake|terremoto|tremblement de terre|じしん|землетрясение|Erdbeben|terremoto|地震|dìzhèn|지진|زلزال
emergency|delegacia|police station|comisaría|commissariat|けいさつしょ|полицейский участок|Polizeiwache|commissariato|警察局|jǐngchájú|경찰서|مركز شرطة
emergency|extintor de incêndio|fire extinguisher|extintor de incendios|extincteur|しょうかき|огнетушитель|Feuerlöscher|estintore|灭火器|mièhuǒqì|소화기|مطفأة حريق
emergency|colete salva-vidas|life jacket|chaleco salvavidas|gilet de sauvetage|ライフジャケット|спасательный жилет|Rettungsweste|giubbotto salvagente|救生衣|jiùshēngyī|구명조끼|سترة نجاة
emergency|cinto de segurança|seat belt|cinturón de seguridad|ceinture de sécurité|シートベルト|ремень безопасности|Sicherheitsgurt|cintura di sicurezza|安全带|ānquándài|안전벨트|حزام الأمان
emergency|capacete|helmet|casco|casque|ヘルメット|шлем|Helm|casco|头盔|tóukuī|헬멧|خوذة
emergency|lanterna|flashlight|linterna|lampe torche|かいちゅうでんとう|фонарик|Taschenlampe|torcia|手电筒|shǒudiàntǒng|손전등|مصباح يدوي
emergency|bateria|battery|batería|pile|バッテリー|батарея|Batterie|batteria|电池|diànchí|배터리|بطارية
emergency|água|water|agua|eau|みず|вода|Wasser|acqua|水|shuǐ|물|ماء
emergency|alimento|food|alimento|nourriture|たべもの|еда|Lebensmittel|cibo|食物|shíwù|식량|طعام
emergency|cobertor|blanket|manta|couverture|もうふ|одеяло|Decke|coperta|毯子|tǎnzi|담요|بطانية
emergency|apito|whistle|silbato|sifflet|ふえ|свисток|Pfeife|fischietto|哨子|shàozi|호루라기|صفارة
emergency|chave|key|llave|clé|かぎ|ключ|Schlüssel|chiave|钥匙|yàoshi|열쇠|مفتاح
emergency|carteira|wallet|cartera|portefeuille|さいふ|кошелёк|Geldbörse|portafoglio|钱包|qiánbāo|지갑|محفظة
emergency|documento de identidade|ID card|documento de identidad|carte d’identité|みぶんしょうめいしょ|удостоверение личности|Ausweis|documento d’identità|身份证|shēnfènzhèng|신분증|بطاقة هوية
emergency|passaporte|passport|pasaporte|passeport|パスポート|паспорт|Reisepass|passaporto|护照|hùzhào|여권|جواز سفر
emergency|contato de emergência|emergency contact|contacto de emergencia|contact d’urgence|きんきゅうれんらくさき|экстренный контакт|Notfallkontakt|contatto di emergenza|紧急联系人|jǐnjí liánxìrén|비상 연락처|جهة اتصال للطوارئ
emergency|família|family|familia|famille|かぞく|семья|Familie|famiglia|家人|jiārén|가족|عائلة
emergency|perdido|lost|perdido|perdu|まいご|потерявшийся|verloren|smarrito|迷路|mílù|길을 잃은|تائه
emergency|roubado|stolen|robado|volé|ぬすまれた|украденный|gestohlen|rubato|被偷|bèi tōu|도난당한|مسروق
emergency|furto|theft|robo|vol|ぬすみ|кража|Diebstahl|furto|盗窃|dàoqiè|도둑질|سرقة
wellbeing|saúde|health|salud|santé|けんこう|здоровье|Gesundheit|salute|健康|jiànkāng|건강|صحة
wellbeing|corpo|body|cuerpo|corps|からだ|тело|Körper|corpo|身体|shēntǐ|몸|جسم
wellbeing|cabeça|head|cabeza|tête|あたま|голова|Kopf|testa|头|tóu|머리|رأس
wellbeing|rosto|face|cara|visage|かお|лицо|Gesicht|viso|脸|liǎn|얼굴|وجه
wellbeing|olho|eye|ojo|œil|め|глаз|Auge|occhio|眼睛|yǎnjing|눈|عين
wellbeing|orelha|ear|oreja|oreille|みみ|ухо|Ohr|orecchio|耳朵|ěrduo|귀|أذن
wellbeing|nariz|nose|nariz|nez|はな|нос|Nase|naso|鼻子|bízi|코|أنف
wellbeing|boca|mouth|boca|bouche|くち|рот|Mund|bocca|嘴|zuǐ|입|فم
wellbeing|dente|tooth|diente|dent|は|зуб|Zahn|dente|牙齿|yáchǐ|이|سن
wellbeing|garganta|throat|garganta|gorge|のど|горло|Hals|gola|喉咙|hóulóng|목|حلق
wellbeing|pescoço|neck|cuello|cou|くび|шея|Hals|collo|脖子|bózi|목|رقبة
wellbeing|ombro|shoulder|hombro|épaule|かた|плечо|Schulter|spalla|肩膀|jiānbǎng|어깨|كتف
wellbeing|braço|arm|brazo|bras|うで|рука|Arm|braccio|手臂|shǒubì|팔|ذراع
wellbeing|cotovelo|elbow|codo|coude|ひじ|локоть|Ellbogen|gomito|肘部|zhǒubù|팔꿈치|مرفق
wellbeing|mão|hand|mano|main|て|кисть|Hand|mano|手|shǒu|손|يد
wellbeing|dedo|finger|dedo|doigt|ゆび|палец|Finger|dito|手指|shǒuzhǐ|손가락|إصبع
wellbeing|peito|chest|pecho|poitrine|むね|грудь|Brust|petto|胸部|xiōngbù|가슴|صدر
wellbeing|costas|back|espalda|dos|せなか|спина|Rücken|schiena|背部|bèibù|등|ظهر
wellbeing|estômago|stomach|estómago|estomac|い|желудок|Magen|stomaco|胃|wèi|위|معدة
wellbeing|abdômen|abdomen|abdomen|abdomen|ふくぶ|живот|Bauch|addome|腹部|fùbù|복부|بطن
wellbeing|perna|leg|pierna|jambe|あし|нога|Bein|gamba|腿|tuǐ|다리|ساق
wellbeing|joelho|knee|rodilla|genou|ひざ|колено|Knie|ginocchio|膝盖|xīgài|무릎|ركبة
wellbeing|pé|foot|pie|pied|あし|ступня|Fuß|piede|脚|jiǎo|발|قدم
wellbeing|pele|skin|piel|peau|はだ|кожа|Haut|pelle|皮肤|pífū|피부|جلد
wellbeing|coração|heart|corazón|cœur|しんぞう|сердце|Herz|cuore|心脏|xīnzàng|심장|قلب
wellbeing|sangue|blood|sangre|sang|ち|кровь|Blut|sangue|血液|xuèyè|혈액|دم
wellbeing|osso|bone|hueso|os|ほね|кость|Knochen|osso|骨头|gǔtou|뼈|عظم
wellbeing|músculo|muscle|músculo|muscle|きんにく|мышца|Muskel|muscolo|肌肉|jīròu|근육|عضلة
wellbeing|febre|fever|fiebre|fièvre|ねつ|жар|Fieber|febbre|发烧|fāshāo|열|حمى
wellbeing|resfriado|common cold|resfriado|rhume|かぜ|простуда|Erkältung|raffreddore|感冒|gǎnmào|감기|زكام
wellbeing|tosse|cough|tos|toux|せき|кашель|Husten|tosse|咳嗽|késou|기침|سعال
wellbeing|dor de garganta|sore throat|dolor de garganta|mal de gorge|のどのいたみ|боль в горле|Halsschmerzen|mal di gola|喉咙痛|hóulóng tòng|인후통|التهاب الحلق
wellbeing|dor de cabeça|headache|dolor de cabeza|mal de tête|ずつう|головная боль|Kopfschmerzen|mal di testa|头痛|tóutòng|두통|صداع
wellbeing|dor de estômago|stomachache|dolor de estómago|mal d’estomac|いのいたみ|боль в животе|Bauchschmerzen|mal di stomaco|胃痛|wèitòng|복통|ألم المعدة
wellbeing|dor de dente|toothache|dolor de muelas|mal de dents|はのいたみ|зубная боль|Zahnschmerzen|mal di denti|牙痛|yátòng|치통|ألم الأسنان
wellbeing|náusea|nausea|náusea|nausée|はきけ|тошнота|Übelkeit|nausea|恶心|ěxīn|메스꺼움|غثيان
wellbeing|tontura|dizziness|mareo|étourdissement|めまい|головокружение|Schwindel|capogiro|头晕|tóuyūn|어지럼증|دوخة
wellbeing|cansaço|fatigue|cansancio|fatigue|つかれ|усталость|Müdigkeit|stanchezza|疲劳|píláo|피로|تعب
wellbeing|fraqueza|weakness|debilidad|faiblesse|よわさ|слабость|Schwäche|debolezza|虚弱|xūruò|약함|ضعف
wellbeing|erupção cutânea|rash|sarpullido|éruption cutanée|ほっしん|сыпь|Ausschlag|eruzione cutanea|皮疹|pízhěn|발진|طفح جلدي
wellbeing|inchaço|swelling|hinchazón|gonflement|はれ|отёк|Schwellung|gonfiore|肿胀|zhǒngzhàng|부기|تورم
wellbeing|coceira|itch|picazón|démangeaison|かゆみ|зуд|Juckreiz|prurito|瘙痒|sāoyǎng|가려움|حكة
wellbeing|pulso|pulse|pulso|pouls|みゃく|пульс|Puls|polso|脉搏|màibó|맥박|نبض
wellbeing|temperatura|temperature|temperatura|température|たいおん|температура|Temperatur|temperatura|体温|tǐwēn|체온|درجة الحرارة
wellbeing|paciente|patient|paciente|patient|かんじゃ|пациент|Patient|paziente|病人|bìngrén|환자|مريض
wellbeing|plano de saúde|health insurance|seguro médico|assurance maladie|けんこうほけん|медицинская страховка|Krankenversicherung|assicurazione sanitaria|医疗保险|yīliáo bǎoxiǎn|건강 보험|تأمين صحي
wellbeing|dieta|diet|dieta|régime|しょくじ|диета|Ernährung|dieta|饮食|yǐnshí|식단|حمية
wellbeing|água|water|agua|eau|みず|вода|Wasser|acqua|水|shuǐ|물|ماء
wellbeing|sono|sleep|sueño|sommeil|すいみん|сон|Schlaf|sonno|睡眠|shuìmián|수면|نوم
wellbeing|descanso|rest|descanso|repos|きゅうそく|отдых|Erholung|riposo|休息|xiūxi|휴식|راحة
wellbeing|exercício|exercise|ejercicio|exercice|うんどう|упражнение|Bewegung|esercizio|锻炼|duànliàn|운동|تمرين
wellbeing|estresse|stress|estrés|stress|ストレス|стресс|Stress|stress|压力|yālì|스트레스|ضغط نفسي
wellbeing|calma|calm|calma|calme|おちつき|спокойствие|Ruhe|calma|平静|píngjìng|차분함|هدوء
wellbeing|melhor|better|mejor|mieux|よく|лучше|besser|meglio|更好|gèng hǎo|더 나은|أفضل
wellbeing|pior|worse|peor|pire|わるく|хуже|schlechter|peggio|更糟|gèng zāo|더 나쁜|أسوأ
wellbeing|doente|sick|enfermo|malade|びょうき|больной|krank|malato|生病|shēngbìng|아픈|مريض
wellbeing|saudável|healthy|saludable|en bonne santé|けんこうな|здоровый|gesund|sano|健康的|jiànkāng de|건강한|صحي
wellbeing|sintoma|symptom|síntoma|symptôme|しょうじょう|симптом|Symptom|sintomo|症状|zhèngzhuàng|증상|عَرَض
wellbeing|tratamento|treatment|tratamiento|traitement|ちりょう|лечение|Behandlung|trattamento|治疗|zhìliáo|치료|علاج
wellbeing|recuperação|recovery|recuperación|récupération|かいふく|выздоровление|Genesung|recupero|康复|kāngfù|회복|تعافٍ
wellbeing|apetite|appetite|apetito|appétit|しょくよく|аппетит|Appetit|appetito|食欲|shíyù|식욕|شهية
wellbeing|nutrição|nutrition|nutrición|nutrition|えいよう|питание|Ernährung|nutrizione|营养|yíngyǎng|영양|تغذية
wellbeing|vitamina|vitamin|vitamina|vitamine|ビタミン|витамин|Vitamin|vitamina|维生素|wéishēngsù|비타민|فيتامين
wellbeing|hidratação|hydration|hidratación|hydratation|すいぶんほきゅう|гидратация|Flüssigkeitszufuhr|idratazione|补水|bǔshuǐ|수분 보충|ترطيب
wellbeing|insônia|insomnia|insomnio|insomnie|ふみん|бессонница|Schlaflosigkeit|insonnia|失眠|shīmián|불면증|أرق
wellbeing|ansiedade|anxiety|ansiedad|anxiété|ふあん|тревога|Angst|ansia|焦虑|jiāolǜ|불안|قلق
wellbeing|felicidade|happiness|felicidad|bonheur|しあわせ|счастье|Glück|felicità|幸福|xìngfú|행복|سعادة
wellbeing|humor|mood|estado de ánimo|humeur|きぶん|настроение|Stimmung|umore|心情|xīnqíng|기분|مزاج
wellbeing|meditação|meditation|meditación|méditation|めいそう|медитация|Meditation|meditazione|冥想|míngxiǎng|명상|تأمل
wellbeing|caminhada|walk|caminata|marche|さんぽ|прогулка|Spaziergang|passeggiata|散步|sànbù|산책|مشي
wellbeing|alongamento|stretch|estiramiento|étirement|ストレッチ|растяжка|Dehnung|stretching|拉伸|lāshēn|스트레칭|تمدد
wellbeing|força|strength|fuerza|force|ちから|сила|Kraft|forza|力量|lìliàng|힘|قوة
wellbeing|equilíbrio|balance|equilibrio|équilibre|バランス|равновесие|Gleichgewicht|equilibrio|平衡|pínghéng|균형|توازن
wellbeing|energia|energy|energía|énergie|エネルギー|энергия|Energie|energia|精力|jīnglì|에너지|طاقة
wellbeing|relaxamento|relaxation|relajación|relaxation|リラックス|расслабление|Entspannung|rilassamento|放松|fàngsōng|휴식|استرخاء
daily|acordar|wake up|despertarse|se réveiller|めをさます|просыпаться|aufwachen|svegliarsi|醒来|xǐnglái|잠에서 깨다|يستيقظ
daily|levantar-se|get up|levantarse|se lever|おきる|вставать|aufstehen|alzarsi|起床|qǐchuáng|일어나다|ينهض
daily|arrumar a cama|make the bed|hacer la cama|faire le lit|ベッドをととのえる|заправлять кровать|das Bett machen|rifare il letto|铺床|pūchuáng|침대 정리하기|يرتب السرير
daily|tomar banho|take a shower|ducharse|prendre une douche|シャワーをあびる|принимать душ|duschen|fare la doccia|洗澡|xǐzǎo|샤워하다|يستحم
daily|escovar os dentes|brush your teeth|cepillarse los dientes|se brosser les dents|はをみがく|чистить зубы|Zähne putzen|lavarsi i denti|刷牙|shuāyá|이를 닦다|يفرش أسنانه
daily|lavar o rosto|wash your face|lavarse la cara|se laver le visage|かおをあらう|умывать лицо|das Gesicht waschen|lavarsi il viso|洗脸|xǐliǎn|세수하다|يغسل وجهه
daily|vestir-se|get dressed|vestirse|s’habiller|きがえる|одеваться|sich anziehen|vestirsi|穿衣服|chuān yīfu|옷을 입다|يرتدي ملابسه
daily|café da manhã|breakfast|desayuno|petit-déjeuner|あさごはん|завтрак|Frühstück|colazione|早餐|zǎocān|아침 식사|إفطار
daily|ir para o trabalho|commute to work|ir al trabajo|aller au travail|しごとにいく|ездить на работу|zur Arbeit fahren|andare al lavoro|通勤|tōngqín|출근하다|يذهب إلى العمل
daily|trabalhar|work|trabajar|travailler|はたらく|работать|arbeiten|lavorare|工作|gōngzuò|일하다|يعمل
daily|estudar|study|estudiar|étudier|べんきょうする|учиться|lernen|studiare|学习|xuéxí|공부하다|يدرس
daily|almoçar|have lunch|almorzar|déjeuner|ひるごはんをたべる|обедать|zu Mittag essen|pranzare|午餐|wǔcān|점심을 먹다|يتناول الغداء
daily|cozinhar|cook|cocinar|cuisiner|りょうりする|готовить|kochen|cucinare|做饭|zuòfàn|요리하다|يطبخ
daily|limpar|clean|limpiar|nettoyer|そうじする|убирать|putzen|pulire|打扫|dǎsǎo|청소하다|ينظف
daily|lavar a louça|wash the dishes|lavar los platos|faire la vaisselle|しょっきをあらう|мыть посуду|Geschirr spülen|lavare i piatti|洗碗|xǐwǎn|설거지하다|يغسل الأطباق
daily|lavar roupa|do the laundry|lavar la ropa|faire la lessive|せんたくする|стирать бельё|Wäsche waschen|fare il bucato|洗衣服|xǐ yīfu|빨래하다|يغسل الملابس
daily|estender a roupa|hang out the laundry|tender la ropa|étendre le linge|せんたくものをほす|развешивать бельё|Wäsche aufhängen|stendere il bucato|晾衣服|liàng yīfu|빨래를 널다|ينشر الغسيل
daily|passar roupa|iron clothes|planchar la ropa|repasser les vêtements|アイロンをかける|гладить одежду|Kleidung bügeln|stirare i vestiti|熨衣服|yùn yīfu|옷을 다리다|يكوي الملابس
daily|varrer|sweep|barrer|balayer|はく|подметать|fegen|spazzare|扫地|sǎodì|쓸다|يكنس
daily|passar pano|mop the floor|fregar el suelo|passer la serpillière|ゆかをふく|мыть пол|den Boden wischen|lavare il pavimento|拖地|tuōdì|바닥을 닦다|يمسح الأرض
daily|aspirar|vacuum|aspirar|passer l’aspirateur|そうじきでそうじする|пылесосить|staubsaugen|passare l’aspirapolvere|吸尘|xīchén|청소기로 청소하다|يكنس بالمكنسة الكهربائية
daily|levar o lixo|take out the trash|sacar la basura|sortir les poubelles|ごみをだす|выносить мусор|den Müll rausbringen|portare fuori la spazzatura|倒垃圾|dào lājī|쓰레기를 버리다|يخرج القمامة
daily|regar as plantas|water the plants|regar las plantas|arroser les plantes|しょくぶつにみずをやる|поливать растения|Pflanzen gießen|annaffiare le piante|浇花|jiāo huā|식물에 물을 주다|يسقي النباتات
daily|alimentar o animal de estimação|feed the pet|dar de comer a la mascota|nourrir l’animal|ペットにえさをあげる|кормить питомца|das Haustier füttern|dare da mangiare all’animale|喂宠物|wèi chǒngwù|반려동물에게 밥을 주다|يطعم الحيوان الأليف
daily|passear com o cachorro|walk the dog|pasear al perro|promener le chien|いぬのさんぽをする|гулять с собакой|mit dem Hund spazieren gehen|portare a spasso il cane|遛狗|liù gǒu|개를 산책시키다|يمشي مع الكلب
daily|fazer exercício|exercise|hacer ejercicio|faire de l’exercice|うんどうする|заниматься спортом|Sport treiben|fare esercizio|锻炼|duànliàn|운동하다|يمارس الرياضة
daily|alongar|stretch|estirar|s’étirer|ストレッチする|делать растяжку|sich dehnen|fare stretching|伸展|shēnzhǎn|스트레칭하다|يتمدد
daily|descansar|rest|descansar|se reposer|やすむ|отдыхать|sich ausruhen|riposarsi|休息|xiūxi|쉬다|يستريح
daily|relaxar|relax|relajarse|se détendre|リラックスする|расслабляться|sich entspannen|rilassarsi|放松|fàngsōng|휴식하다|يسترخي
daily|ler|read|leer|lire|よむ|читать|lesen|leggere|阅读|yuèdú|읽다|يقرأ
daily|escrever|write|escribir|écrire|かく|писать|schreiben|scrivere|写字|xiězì|쓰다|يكتب
daily|ouvir música|listen to music|escuchar música|écouter de la musique|おんがくをきく|слушать музыку|Musik hören|ascoltare musica|听音乐|tīng yīnyuè|음악을 듣다|يستمع إلى الموسيقى
daily|assistir à televisão|watch television|ver la televisión|regarder la télévision|テレビをみる|смотреть телевизор|fernsehen|guardare la televisione|看电视|kàn diànshì|텔레비전을 보다|يشاهد التلفاز
daily|telefonar|make a call|llamar por teléfono|téléphoner|でんわする|звонить|telefonieren|telefonare|打电话|dǎ diànhuà|전화하다|يتصل هاتفيًا
daily|enviar mensagem|send a message|enviar un mensaje|envoyer un message|メッセージをおくる|отправлять сообщение|eine Nachricht senden|inviare un messaggio|发消息|fā xiāoxi|메시지를 보내다|يرسل رسالة
daily|fazer compras|shop|hacer compras|faire les courses|かいものする|ходить за покупками|einkaufen|fare la spesa|购物|gòuwù|쇼핑하다|يتسوق
daily|pagar as contas|pay the bills|pagar las facturas|payer les factures|りょうきんをはらう|оплачивать счета|Rechnungen bezahlen|pagare le bollette|付账|fùzhàng|공과금을 내다|يدفع الفواتير
daily|preparar o jantar|prepare dinner|preparar la cena|préparer le dîner|ばんごはんをつくる|готовить ужин|das Abendessen zubereiten|preparare la cena|做晚饭|zuò wǎnfàn|저녁을 준비하다|يحضر العشاء
daily|pôr a mesa|set the table|poner la mesa|mettre la table|しょくたくをととのえる|накрывать на стол|den Tisch decken|apparecchiare la tavola|摆桌子|bǎi zhuōzi|상을 차리다|يجهز المائدة
daily|jantar|have dinner|cenar|dîner|ばんごはんをたべる|ужинать|zu Abend essen|cenare|吃晚饭|chī wǎnfàn|저녁을 먹다|يتناول العشاء
daily|lavar-se|wash up|lavarse|se laver|からだをあらう|умыться|sich waschen|lavarsi|洗漱|xǐshù|씻다|يغتسل
daily|hora de dormir|bedtime|hora de dormir|heure du coucher|ねるじかん|время сна|Schlafenszeit|ora di dormire|睡觉时间|shuìjiào shíjiān|취침 시간|وقت النوم
daily|adormecer|fall asleep|dormirse|s’endormir|ねむりにつく|засыпать|einschlafen|addormentarsi|入睡|rùshuì|잠들다|يغفو
daily|sonhar|dream|soñar|rêver|ゆめをみる|мечтать|träumen|sognare|做梦|zuòmèng|꿈을 꾸다|يحلم
daily|manhã|morning|mañana|matin|あさ|утро|Morgen|mattina|早晨|zǎochén|아침|صباح
daily|tarde|afternoon|tarde|après-midi|ごご|день|Nachmittag|pomeriggio|下午|xiàwǔ|오후|بعد الظهر
daily|anoitecer|evening|atardecer|soirée|ゆうがた|вечер|Abend|sera|傍晚|bàngwǎn|저녁|مساء
daily|noite|night|noche|nuit|よる|ночь|Nacht|notte|夜晚|yèwǎn|밤|ليل
daily|hoje|today|hoy|aujourd’hui|きょう|сегодня|heute|oggi|今天|jīntiān|오늘|اليوم
daily|amanhã|tomorrow|mañana|demain|あした|завтра|morgen|domani|明天|míngtiān|내일|غدًا
daily|ontem|yesterday|ayer|hier|きのう|вчера|gestern|ieri|昨天|zuótiān|어제|أمس
daily|dia útil|weekday|día laborable|jour ouvrable|へいじつ|будний день|Wochentag|giorno feriale|工作日|gōngzuòrì|평일|يوم عمل
daily|fim de semana|weekend|fin de semana|week-end|しゅうまつ|выходные|Wochenende|fine settimana|周末|zhōumò|주말|نهاية الأسبوع
daily|agora|now|ahora|maintenant|いま|сейчас|jetzt|adesso|现在|xiànzài|지금|الآن
daily|mais tarde|later|más tarde|plus tard|あとで|позже|später|più tardi|稍后|shāohòu|나중에|لاحقًا
daily|cedo|early|temprano|tôt|はやく|рано|früh|presto|早|zǎo|일찍|مبكرًا
daily|atrasado|late|tarde|en retard|おそく|поздно|spät|in ritardo|晚|wǎn|늦게|متأخرًا
daily|no horário|on time|a tiempo|à l’heure|じかんどおり|вовремя|pünktlich|in orario|准时|zhǔnshí|제시간에|في الوقت المحدد
daily|tempo|weather|tiempo|météo|てんき|погода|Wetter|tempo|天气|tiānqì|날씨|طقس
daily|ensolarado|sunny|soleado|ensoleillé|はれ|солнечно|sonnig|soleggiato|晴天|qíngtiān|맑은|مشمس
daily|nublado|cloudy|nublado|nuageux|くもり|облачно|bewölkt|nuvoloso|多云|duōyún|흐린|غائم
daily|chuvoso|rainy|lluvioso|pluvieux|あめ|дождливо|regnerisch|piovoso|下雨|xiàyǔ|비 오는|ممطر
daily|ventoso|windy|ventoso|venteux|かぜがつよい|ветрено|windig|ventoso|有风|yǒufēng|바람 부는|عاصف
daily|quente|hot|caliente|chaud|あつい|жарко|heiß|caldo|热|rè|더운|حار
daily|frio|cold|frío|froid|さむい|холодно|kalt|freddo|冷|lěng|추운|بارد
daily|morno|warm|templado|tiède|あたたかい|тёплый|warm|tiepido|温暖|wēnnuǎn|따뜻한|دافئ
daily|fresco|cool|fresco|frais|すずしい|прохладно|kühl|fresco|凉爽|liángshuǎng|선선한|منعش
daily|estação do ano|season|estación|saison|きせつ|время года|Jahreszeit|stagione|季节|jìjié|계절|فصل
daily|primavera|spring|primavera|printemps|はる|весна|Frühling|primavera|春天|chūntiān|봄|ربيع
daily|verão|summer|verano|été|なつ|лето|Sommer|estate|夏天|xiàtiān|여름|صيف
daily|outono|autumn|otoño|automne|あき|осень|Herbst|autunno|秋天|qiūtiān|가을|خريف
daily|inverno|winter|invierno|hiver|ふゆ|зима|Winter|inverno|冬天|dōngtiān|겨울|شتاء
daily|nascer do sol|sunrise|amanecer|lever du soleil|ひので|восход|Sonnenaufgang|alba|日出|rìchū|일출|شروق الشمس
daily|pôr do sol|sunset|atardecer|coucher du soleil|ひのいり|закат|Sonnenuntergang|tramonto|日落|rìluò|일몰|غروب الشمس
daily|temperatura|temperature|temperatura|température|おんど|температура|Temperatur|temperatura|温度|wēndù|온도|درجة الحرارة
`;

const COLUMNS = ['topic', 'promptWord', 'en', 'es', 'fr', 'ja', 'ru', 'de', 'it', 'zh', 'zhReading', 'ko', 'ar'];
const rows = RAW_ROWS.trim().split('\n').filter(Boolean).map((line, index) => {
  const fields = line.split('|');
  if (fields.length !== COLUMNS.length) throw new Error(`Vocabulário ${index + 1}: esperado ${COLUMNS.length} campos, encontrados ${fields.length}.`);
  return Object.fromEntries(COLUMNS.map((column, fieldIndex) => [column, fields[fieldIndex]]));
});

const TOPIC_LABELS = {
  greetings: 'saudações e cortesia', food: 'comida e bebida', travel: 'viagens', shopping: 'compras',
  conversation: 'conversas', study: 'estudos', work: 'trabalho', emergency: 'pedir ajuda',
  wellbeing: 'saúde e bem-estar', daily: 'dia a dia'
};

function romanizeJapaneseKana(text) {
  const romajiOverrides = {
    'こんにちは':'konnichiwa','おはようございます':'ohayou gozaimasu','こんばんは':'konbanwa','おやすみなさい':'oyasuminasai',
    'またあとで':'mata ato de','また明日':'mata ashita','お元気ですか':'ogenki desu ka','今日はお元気ですか':'kyou wa ogenki desu ka',
    '元気です、ありがとう':'genki desu, arigatou','どうもありがとうございます':'doumo arigatou gozaimasu','お願いします':'onegaishimasu',
    '失礼しました':'shitsurei shimashita','お誕生日おめでとう':'otanjoubi omedetou','楽しい休暇を':'tanoshii kyuuka o',
    '頑張ってください':'ganbatte kudasai','よい一日を':'yoi ichinichi o','よい週末を':'yoi shuumatsu o','よい旅を':'yoi tabi o',
    'かんぱい':'kanpai','会えてうれしいです':'aete ureshii desu','お久しぶりです':'ohisashiburi desu',
    'どうぞお座りください':'douzo osuwari kudasai','どうぞお入りください':'douzo ohairi kudasai','お先にどうぞ':'osaki ni douzo',
    'おとこのかた':'otoko no kata','おんなのかた':'onna no kata','しょくぶつにみずをやる':'shokubutsu ni mizu o yaru',
    'はをみがく':'ha o migaku','あさごはんをたべる':'asagohan o taberu','ひるごはんをたべる':'hirugohan o taberu',
    'ばんごはんをたべる':'bangohan o taberu','かおをあらう':'kao o arau','しごとにいく':'shigoto ni iku',
    'ペットにえさをあげる':'petto ni esa o ageru','いぬのさんぽをする':'inu no sanpo o suru',
    'おんがくをきく':'ongaku o kiku','テレビをみる':'terebi o miru','メッセージをおくる':'messeji o okuru',
    'しょくたくをととのえる':'shokutaku o totonoeru','しょっきをあらう':'shokki o arau','せんたくものをほす':'sentakumono o hosu',
    'ごみをだす':'gomi o dasu','うんどうする':'undou suru','ストレッチする':'sutorecchi suru','リラックスする':'rirakkusu suru',
    'よくおもいます':'yoku omoimasu','わたしのいけんでは':'watashi no iken de wa','だけれども':'dakeredomo',
    'なしで':'nashi de','まえに':'mae ni','あとで':'ato de','あめ':'ame','かぜがつよい':'kaze ga tsuyoi'
  };
  if (romajiOverrides[text]) return romajiOverrides[text];
  const kanjiReadings = {
    'また明日':'またあした','お元気ですか':'おげんきですか','今日はお元気ですか':'きょうはおげんきですか','元気です、ありがとう':'げんきです、ありがとう',
    'お願いします':'おねがいします','失礼しました':'しつれいしました','お誕生日おめでとう':'おたんじょうびおめでとう','楽しい休暇を':'たのしいきゅうかを',
    '頑張ってください':'がんばってください','よい一日を':'よいいちにちを','よい週末を':'よいしゅうまつを','よい旅を':'よいたびを',
    '乾杯':'かんぱい','会えてうれしいです':'あえてうれしいです','お久しぶりです':'おひさしぶりです','どうぞお座りください':'どうぞおすわりください',
    'どうぞお入りください':'どうぞおはいりください','お先にどうぞ':'おさきにどうぞ','男性':'だんせい','女性':'じょせい','友達':'ともだち',
    '同僚':'どうりょう','招待客':'しょうたいきゃく','主催者':'しゅさいしゃ','家族':'かぞく','隣人':'りんじん','名前':'なまえ','下の名前':'したのなまえ',
    '名字':'みょうじ','紹介':'しょうかい','挨拶':'あいさつ','別れの挨拶':'わかれのあいさつ','招待':'しょうたい','お礼':'おれい','謝罪':'しゃざい',
    '褒め言葉':'ほめことば','尊敬':'そんけい','親切':'しんせつ','笑顔':'えがお','握手':'あくしゅ','抱擁':'ほうよう','訪問':'ほうもん','会合':'かいごう',
    '到着':'とうちゃく','出発':'しゅっぱつ','朝':'あさ','午後':'ごご','夜':'よる','今日':'きょう','明日':'あした','月曜日':'げつようび','週末':'しゅうまつ',
    '祝日':'しゅくじつ','お祝い':'おいわい'
  };
  const pairs = {
    きゃ:'kya',きゅ:'kyu',きょ:'kyo',しゃ:'sha',しゅ:'shu',しょ:'sho',ちゃ:'cha',ちゅ:'chu',ちょ:'cho',
    にゃ:'nya',にゅ:'nyu',にょ:'nyo',ひゃ:'hya',ひゅ:'hyu',ひょ:'hyo',みゃ:'mya',みゅ:'myu',みょ:'myo',
    りゃ:'rya',りゅ:'ryu',りょ:'ryo',ぎゃ:'gya',ぎゅ:'gyu',ぎょ:'gyo',じゃ:'ja',じゅ:'ju',じょ:'jo',
    びゃ:'bya',びゅ:'byu',びょ:'byo',ぴゃ:'pya',ぴゅ:'pyu',ぴょ:'pyo',
    キャ:'kya',キュ:'kyu',キョ:'kyo',シャ:'sha',シュ:'shu',ショ:'sho',チャ:'cha',チュ:'chu',チョ:'cho',
    ニャ:'nya',ニュ:'nyu',ニョ:'nyo',ヒャ:'hya',ヒュ:'hyu',ヒョ:'hyo',ミャ:'mya',ミュ:'myu',ミョ:'myo',
    リャ:'rya',リュ:'ryu',リョ:'ryo',ギャ:'gya',ギュ:'gyu',ギョ:'gyo',ジャ:'ja',ジュ:'ju',ジョ:'jo',
    ビャ:'bya',ビュ:'byu',ビョ:'byo',ピャ:'pya',ピュ:'pyu',ピョ:'pyo'
  };
  const kana = {
    あ:'a',い:'i',う:'u',え:'e',お:'o',か:'ka',き:'ki',く:'ku',け:'ke',こ:'ko',さ:'sa',し:'shi',す:'su',せ:'se',そ:'so',
    た:'ta',ち:'chi',つ:'tsu',て:'te',と:'to',な:'na',に:'ni',ぬ:'nu',ね:'ne',の:'no',は:'ha',ひ:'hi',ふ:'fu',へ:'he',ほ:'ho',
    ま:'ma',み:'mi',む:'mu',め:'me',も:'mo',や:'ya',ゆ:'yu',よ:'yo',ら:'ra',り:'ri',る:'ru',れ:'re',ろ:'ro',
    わ:'wa',を:'o',ん:'n',が:'ga',ぎ:'gi',ぐ:'gu',げ:'ge',ご:'go',ざ:'za',じ:'ji',ず:'zu',ぜ:'ze',ぞ:'zo',
    だ:'da',ぢ:'ji',づ:'zu',で:'de',ど:'do',ば:'ba',び:'bi',ぶ:'bu',べ:'be',ぼ:'bo',ぱ:'pa',ぴ:'pi',ぷ:'pu',ぺ:'pe',ぽ:'po',
    ぁ:'a',ぃ:'i',ぅ:'u',ぇ:'e',ぉ:'o',ゃ:'ya',ゅ:'yu',ょ:'yo',っ:'',ー:'-',
    ア:'a',イ:'i',ウ:'u',エ:'e',オ:'o',カ:'ka',キ:'ki',ク:'ku',ケ:'ke',コ:'ko',サ:'sa',シ:'shi',ス:'su',セ:'se',ソ:'so',
    タ:'ta',チ:'chi',ツ:'tsu',テ:'te',ト:'to',ナ:'na',ニ:'ni',ヌ:'nu',ネ:'ne',ノ:'no',ハ:'ha',ヒ:'hi',フ:'fu',ヘ:'he',ホ:'ho',
    マ:'ma',ミ:'mi',ム:'mu',メ:'me',モ:'mo',ヤ:'ya',ユ:'yu',ヨ:'yo',ラ:'ra',リ:'ri',ル:'ru',レ:'re',ロ:'ro',
    ワ:'wa',ヲ:'o',ン:'n',ガ:'ga',ギ:'gi',グ:'gu',ゲ:'ge',ゴ:'go',ザ:'za',ジ:'ji',ズ:'zu',ゼ:'ze',ゾ:'zo',
    ダ:'da',ヂ:'ji',ヅ:'zu',デ:'de',ド:'do',バ:'ba',ビ:'bi',ブ:'bu',ベ:'be',ボ:'bo',パ:'pa',ピ:'pi',プ:'pu',ペ:'pe',ポ:'po',
    ァ:'a',ィ:'i',ゥ:'u',ェ:'e',ォ:'o',ャ:'ya',ュ:'yu',ョ:'yo',ッ:'',ヴ:'vu'
  };
  const chars = [...(kanjiReadings[text] || text).normalize('NFC')];
  let result = '';
  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index];
    const next = chars[index + 1];
    const pair = next ? char + next : '';
    if (pairs[pair]) { result += pairs[pair]; index += 1; continue; }
    if (char === 'っ' || char === 'ッ') {
      const following = next ? (pairs[next + (chars[index + 2] || '')] || kana[next] || '') : '';
      result += following.startsWith('ch') ? 't' : following.charAt(0);
      continue;
    }
    if (char === 'ー') { result += result.match(/[aeiou](?!.*[aeiou])/u)?.[0] || '-'; continue; }
    result += kana[char] ?? char;
  }
  return result;
}

function romanizeRussian(text) {
  const map = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya' };
  return [...text.toLowerCase()].map(char => map[char] ?? char).join('');
}

function romanizeArabic(text) {
  const map = { 'ا':'ā','أ':'ʾa','إ':'ʾi','آ':'ʾā','ء':'ʾ','ؤ':'ʾu','ئ':'ʾi','ب':'b','ت':'t','ث':'th','ج':'j','ح':'ḥ','خ':'kh','د':'d','ذ':'dh','ر':'r','ز':'z','س':'s','ش':'sh','ص':'ṣ','ض':'ḍ','ط':'ṭ','ظ':'ẓ','ع':'ʿ','غ':'gh','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','ة':'a','و':'ū','ي':'ī','ى':'ā','ً':'an','ٌ':'un','ٍ':'in','َ':'a','ُ':'u','ِ':'i','ْ':'','ّ':'','؟':'?','،':',','؛':';','۔':'.' };
  return [...text].map(char => map[char] ?? char).join('').replace(/\s+/gu, ' ').trim();
}

const columnsByLanguage = ['en', 'es', 'fr', 'ja', 'ru', 'de', 'it', 'zh', 'zhReading', 'ko', 'ar'];
export const VOCABULARY_ROWS = rows;
export const VOCABULARY_LESSONS = rows.map((row, index) => {
  const translations = Object.fromEntries(columnsByLanguage.map(language => [language, row[language]]));
  return { ...row, translations, index };
});
export { romanizeJapaneseKana, romanizeRussian, romanizeArabic, TOPIC_LABELS };
