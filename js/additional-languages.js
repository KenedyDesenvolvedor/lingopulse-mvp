export const EXTRA_LANGUAGES = {
  de: { label: 'Alemão', locale: 'de-DE', flag: '🇩🇪' },
  it: { label: 'Italiano', locale: 'it-IT', flag: '🇮🇹' },
  zh: { label: 'Chinês (mandarim)', locale: 'zh-CN', flag: '🇨🇳' },
  ko: { label: 'Coreano', locale: 'ko-KR', flag: '🇰🇷' },
  ar: { label: 'Árabe', locale: 'ar-SA', flag: '🇸🇦' }
};

const topicRows = text => text.trim().split('\n').map(line => line.split('|'));

// Each topic follows the same 15 lesson order as the English track.
export const EXTRA_ANSWERS = {
  de: {
    greetings: topicRows(`Guten|Morgen!
Bis|morgen!
Bis|nächste|Woche!
Guten|Tag!
Gute|Nacht,|bis|morgen!
Willkommen|in|unserer|Stadt.
Ich|freue|mich,|dich|wiederzusehen.
Wie|geht|es|dir|heute?
Hab|einen|schönen|Tag!
Gute|Reise!
Alles|Gute|zum|Geburtstag!
Danke,|dass|du|gekommen|bist.
Schön,|dich|kennenzulernen.
Bis|später!
Pass|auf|dich|auf!`),
    food: topicRows(`Ich|mag|Kaffee.
Die|Rechnung,|bitte.
Einen|Tisch|für|zwei,|bitte.
Kann|ich|bitte|die|Speisekarte|sehen?
Das|Essen|ist|köstlich.
Haben|Sie|eine|vegetarische|Option?
Was|empfehlen|Sie?
Ich|habe|Hunger.
Ich|habe|Durst.
Ohne|Zucker,|bitte.
Könnten|Sie|das|Dessert|bringen?
Die|Suppe|ist|sehr|heiß.
Kann|ich|das|Tagesgericht|bestellen?
Das|Essen|war|köstlich.
Ein|Glas|Wasser,|bitte.`),
    travel: topicRows(`Wo|ist|der|Bahnhof?
Ich|brauche|ein|Ticket|zum|Flughafen.
Wie|komme|ich|ins|Stadtzentrum?
Ich|habe|eine|Reservierung.
Wo|ist|die|U-Bahn-Station?
Ich|suche|diese|Adresse.
Kann|ich|zu|Fuß|zum|Bahnhof|gehen?
Ich|möchte|die|Reservierung|bestätigen.
Die|Bushaltestelle|ist|in|der|Nähe.
Fährt|dieser|Bus|ins|Zentrum?
Muss|ich|den|Zug|wechseln?
Ich|möchte|eine|Hin- und|Rückfahrkarte.
Wie|lange|dauert|die|Reise?
Mein|Flug|wurde|annulliert.
Können|Sie|ein|Taxi|rufen?`),
    shopping: topicRows(`Wie|viel|kostet|das?
Kann|ich|mit|Karte|bezahlen?
Wie|viel|kostet|dieses|hier?
Ich|schaue|mich|nur|um,|danke.
Akzeptieren|Sie|Karten?
Ich|suche|ein|Souvenir.
Haben|Sie|es|in|einer|anderen|Größe?
Kann|ich|es|anprobieren?
Wo|kann|ich|bezahlen?
Ich|nehme|das|hier.
Haben|Sie|es|in|einer|anderen|Farbe?
Akzeptieren|Sie|Bargeld?
Könnte|ich|eine|Quittung|bekommen?
Ist|dieser|Artikel|im|Angebot?
Ich|muss|diesen|Artikel|umtauschen.`),
    conversation: topicRows(`Vielen|Dank!
Schön,|dich|kennenzulernen.
Können|Sie|langsamer|sprechen?
Können|Sie|das|bitte|wiederholen?
Ich|verstehe|dieses|Wort|nicht.
Kann|ich|hier|ein|Foto|machen?
Ich|spreche|ein|wenig|Portugiesisch.
Woher|kommst|du?
Wie|ist|dein|vollständiger|Name?
Was|machst|du|gern?
Kannst|du|es|mir|auf|der|Karte|zeigen?
Kannst|du|deinen|Namen|aufschreiben?
Ich|habe|den|letzten|Teil|nicht|verstanden.
Sprichst|du|Portugiesisch?
Können|wir|später|sprechen?`),
    study: topicRows(`Ich|lerne.
Ich|muss|diese|Aufgabe|beenden.
Was|bedeutet|dieses|Wort?
Schreiben|Sie|das|bitte|für|mich|auf.
Ich|lerne|jeden|Tag|Japanisch.
Ich|habe|morgen|eine|Prüfung.
Können|Sie|diese|Regel|erklären?
Ich|muss|meine|Notizen|durchsehen.
Wie|spricht|man|dieses|Wort|aus?
Darf|ich|ein|Wörterbuch|benutzen?
Ich|habe|ein|neues|Wort|gelernt.
Diese|Übung|war|einfach.
Ist|dieser|Satz|richtig?
Lass|uns|zusammen|lernen.
Ich|übe|das|Schreiben.`),
    work: topicRows(`Ich|habe|um|zehn|Uhr|ein|Meeting.
Freitags|arbeite|ich|von|zu|Hause.
Könnten|Sie|den|Bericht|heute|schicken?
Das|Meeting|beginnt|um|neun.
Nach|dem|Mittagessen|bin|ich|verfügbar.
Ich|muss|ein|Meeting|vereinbaren.
Ich|arbeite|an|diesem|Projekt.
Kannst|du|die|Datei|mit|mir|teilen?
Ich|habe|die|Aufgabe|beendet.
Ich|brauche|etwas|mehr|Zeit.
Lass|uns|die|Details|besprechen.
Bitte|schicken|Sie|den|Vertrag.
Ich|bin|gerade|in|einem|Anruf.
Soll|ich|auf|diese|E-Mail|antworten?
Danke|für|deine|Hilfe|heute.`),
    emergency: topicRows(`Ich|brauche|Hilfe.
Ich|brauche|einen|Arzt.
Rufen|Sie|bitte|die|Polizei.
Ich|brauche|einen|Krankenwagen.
Ich|kann|mein|Portemonnaie|nicht|finden.
Mein|Telefon|wurde|gestohlen.
Ich|weiß|nicht,|wo|ich|bin.
Ich|kann|mein|Hotel|nicht|finden.
Gibt|es|in|der|Nähe|ein|Krankenhaus?
Ich|kann|nicht|atmen.
Ich|habe|eine|Verletzung.
Ich|brauche|jetzt|Hilfe.
Ich|kann|meinen|Reisepass|nicht|finden.
Können|Sie|die|Feuerwehr|rufen?
Ich|bin|in|Gefahr.`),
    wellbeing: topicRows(`Ich|fühle|mich|nicht|gut.
Ich|brauche|einen|Ort|zum|Ausruhen.
Ich|habe|Kopfschmerzen.
Ich|habe|Bauchschmerzen.
Ich|brauche|ein|Medikament.
Ich|habe|morgen|einen|Arzttermin.
Wo|ist|die|nächste|Apotheke?
Ich|bin|allergisch|gegen|Erdnüsse.
Rufen|Sie|bitte|eine|Krankenschwester.
Jetzt|geht|es|mir|besser.
Ich|muss|mich|hinsetzen.
Ich|muss|Wasser|trinken.
Ich|bin|sehr|erschöpft.
Gibt|es|in|der|Nähe|eine|Klinik?
Ich|kann|nicht|schlafen.`),
    daily: topicRows(`Wo|ist|die|Toilette?
Wie|spät|ist|es?
Heute|ist|es|sehr|heiß.
Ich|warte|hier.
Welcher|Wochentag|ist|heute?
Ich|muss|mein|Handy|aufladen.
Das|Geschäft|schließt|um|acht.
Meine|Schlüssel|liegen|auf|dem|Tisch.
Können|Sie|das|Fenster|öffnen?
Wo|kann|ich|meine|Hände|waschen?
Ich|bin|bald|zu|Hause.
Der|Aufzug|ist|rechts.
Machen|Sie|bitte|das|Licht|an.
Jeden|Morgen|nehme|ich|den|Bus.
Es|dauert|fünf|Minuten.`)
  },
  it: {
    greetings: topicRows(`Buongiorno!
A|domani!
Alla|prossima|settimana!
Buon|pomeriggio!
Buonanotte,|a|domani!
Benvenuto|nella|nostra|città.
Sono|felice|di|rivederti.
Come|stai|oggi?
Ti|auguro|una|splendida|giornata!
Ti|auguro|buon|viaggio.
Buon|compleanno!
Grazie|per|essere|venuto.
È|stato|un|piacere|conoscerti.
A|più|tardi!
Abbi|cura|di|te!`),
    food: topicRows(`Mi|piace|il|caffè.
Il|conto,|per|favore.
Un|tavolo|per|due,|per|favore.
Posso|vedere|il|menù,|per|favore?
Il|cibo|è|delizioso.
Avete|un'opzione|vegetariana?
Cosa|mi|consiglia?
Ho|fame.
Ho|sete.
Senza|zucchero,|per|favore.
Può|portare|il|dolce?
La|zuppa|è|molto|calda.
Posso|ordinare|il|piatto|del|giorno?
Il|pasto|era|delizioso.
Un|bicchiere|d'acqua,|per|favore.`),
    travel: topicRows(`Dov'è|la|stazione?
Mi|serve|un|biglietto|per|l'aeroporto.
Come|arrivo|in|centro?
Ho|una|prenotazione.
Dov'è|la|stazione|della|metropolitana?
Sto|cercando|questo|indirizzo.
Posso|andare|a|piedi|fino|alla|stazione?
Voglio|confermare|la|prenotazione.
La|fermata|dell'autobus|è|qui|vicino.
Questo|autobus|va|in|centro?
Devo|cambiare|treno?
Vorrei|un|biglietto|di|andata|e|ritorno.
Quanto|dura|il|viaggio?
Il|mio|volo|è|stato|cancellato.
Può|chiamare|un|taxi?`),
    shopping: topicRows(`Quanto|costa?
Posso|pagare|con|la|carta?
Quanto|costa|questo?
Sto|solo|guardando,|grazie.
Accettate|le|carte?
Cerco|un|souvenir.
Ce|l'avete|in|un'altra|taglia?
Posso|provarlo?
Dove|posso|pagare?
Prendo|questo.
Ce|l'avete|in|un|altro|colore?
Accettate|contanti?
Potrei|avere|una|ricevuta?
Questo|articolo|è|in|offerta?
Devo|cambiare|questo|prodotto.`),
    conversation: topicRows(`Grazie|mille!
È|un|piacere|conoscerti.
Può|parlare|più|lentamente?
Può|ripetere,|per|favore?
Non|capisco|questa|parola.
Posso|fare|una|foto|qui?
Parlo|un|po'|di|portoghese.
Di|dove|sei?
Qual|è|il|tuo|nome|completo?
Cosa|ti|piace|fare?
Puoi|mostrarmelo|sulla|mappa?
Puoi|scrivere|il|tuo|nome?
Non|ho|capito|l'ultima|parte.
Parli|portoghese?
Possiamo|parlare|più|tardi?`),
    study: topicRows(`Sto|imparando.
Devo|finire|questo|compito.
Cosa|significa|questa|parola?
Per|favore,|scrivilo|per|me.
Studio|giapponese|ogni|giorno.
Domani|ho|un|esame.
Puoi|spiegare|questa|regola?
Devo|ripassare|i|miei|appunti.
Come|si|pronuncia|questa|parola?
Posso|usare|un|dizionario?
Ho|imparato|una|parola|nuova.
Questo|esercizio|era|facile.
Questa|frase|è|corretta?
Studiamo|insieme.
Mi|sto|esercitando|a|scrivere.`),
    work: topicRows(`Ho|una|riunione|alle|dieci.
Il|venerdì|lavoro|da|casa.
Può|inviare|il|rapporto|oggi?
La|riunione|inizia|alle|nove.
Sono|disponibile|dopo|pranzo.
Devo|fissare|una|riunione.
Sto|lavorando|a|questo|progetto.
Puoi|condividere|il|file|con|me?
Ho|finito|il|compito.
Ho|bisogno|di|un|po'|più|di|tempo.
Parliamo|dei|dettagli.
Per|favore,|invia|il|contratto.
Sono|al|telefono|adesso.
Devo|rispondere|a|questa|e-mail?
Grazie|per|l'aiuto|di|oggi.`),
    emergency: topicRows(`Ho|bisogno|di|aiuto.
Ho|bisogno|di|un|medico.
Chiami|la|polizia,|per|favore.
Ho|bisogno|di|un'ambulanza.
Non|trovo|il|mio|portafoglio.
Mi|hanno|rubato|il|telefono.
Non|so|dove|mi|trovo.
Non|trovo|il|mio|hotel.
C'è|un|ospedale|qui|vicino?
Non|riesco|a|respirare.
Ho|una|ferita.
Ho|bisogno|di|aiuto|adesso.
Non|trovo|il|mio|passaporto.
Può|chiamare|i|pompieri?
Sono|in|pericolo.`),
    wellbeing: topicRows(`Non|mi|sento|bene.
Ho|bisogno|di|un|posto|per|riposare.
Ho|mal|di|testa.
Mi|fa|male|lo|stomaco.
Ho|bisogno|di|un|medicinale.
Domani|ho|una|visita|medica.
Dov'è|la|farmacia|più|vicina?
Sono|allergico|alle|arachidi.
Chiami|un'infermiera,|per|favore.
Ora|mi|sento|meglio.
Devo|sedermi.
Devo|bere|dell'acqua.
Sono|molto|stanco.
C'è|una|clinica|qui|vicino?
Non|riesco|a|dormire.`),
    daily: topicRows(`Dov'è|il|bagno?
Che|ore|sono?
Oggi|fa|molto|caldo.
Aspetterò|qui.
Che|giorno|della|settimana|è|oggi?
Devo|caricare|il|telefono.
Il|negozio|chiude|alle|otto.
Le|mie|chiavi|sono|sul|tavolo.
Puoi|aprire|la|finestra?
Dove|posso|lavarmi|le|mani?
Sarò|a|casa|presto.
L'ascensore|è|a|destra.
Per|favore,|accendi|la|luce.
Prendo|l'autobus|ogni|mattina.
Ci|vogliono|cinque|minuti.`)
  },
  zh: {
    greetings: topicRows(`早上|好！
明天|见！
下周|见！
下午|好！
晚安，|明天|见！
欢迎|来到|我们|的|城市。
很|高兴|再次|见到|你。
你|今天|好吗？
祝|你|今天|愉快！
祝|你|旅途|愉快。
生日|快乐！
谢谢|你|来。
很|高兴|认识|你。
待会儿|见！
保重！`),
    food: topicRows(`我|喜欢|咖啡。
请|结账。
请给|我们|一张|两人桌。
请问|可以|看|菜单吗？
食物|很好吃。
有|素食|选项吗？
你|推荐|什么？
我|饿了。
我|渴了。
请|不要|加糖。
可以|把|甜点|拿来吗？
汤|很烫。
我|可以|点|今日特餐吗？
这顿饭|很好吃。
请给我|一杯|水。`),
    travel: topicRows(`车站|在哪里？
我|需要|一张|去机场的|车票。
怎么|去|市中心？
我|有|预订。
地铁站|在哪里？
我|在找|这个|地址。
我|可以|走路|去车站吗？
我|想|确认|预订。
公交车站|在|附近。
这辆|公交车|去|市中心吗？
我|需要|换火车吗？
我|想要|一张|往返票。
旅程|需要|多长时间？
我的|航班|取消了。
可以|帮我|叫|出租车吗？`),
    shopping: topicRows(`多少钱？
我|可以|刷卡吗？
这个|多少钱？
我|只是|看看，|谢谢。
你们|收|银行卡吗？
我|在找|纪念品。
有|别的|尺码吗？
我|可以|试穿吗？
我|在哪里|付款？
我|买|这个。
有|别的|颜色吗？
你们|收|现金吗？
可以|给我|一张|收据吗？
这个|商品|在|打折吗？
我|需要|换|这个|商品。`),
    conversation: topicRows(`非常|感谢你！
很|高兴|认识|你。
你|可以|说得|慢一点吗？
请问|可以|再说|一遍吗？
我|不懂|这个|词。
我|可以|在这里|拍照吗？
我|会说|一点|葡萄牙语。
你|来自|哪里？
你的|全名|是什么？
你|喜欢|做|什么？
你|可以|在地图上|指给我看吗？
你|可以|写下|你的|名字吗？
我|没听懂|最后|一部分。
你|会说|葡萄牙语吗？
我们|可以|晚点|聊吗？`),
    study: topicRows(`我|正在|学习。
我|需要|完成|这个|作业。
这个|词|是什么意思？
请|帮我|把|这个|写下来。
我|每天|学习|日语。
我|明天|有|考试。
你|可以|解释|这个|规则吗？
我|需要|复习|我的|笔记。
这个|词|怎么|发音？
我|可以|用|词典吗？
我|学会了|一个|新词。
这个|练习|很|简单。
这个|句子|正确吗？
我们|一起|学习吧。
我|正在|练习|写作。`),
    work: topicRows(`我|十点|有|会议。
我|星期五|在家|工作。
你|今天|可以|发|报告吗？
会议|九点|开始。
我|午饭后|有空。
我|需要|安排|一个|会议。
我|正在|做|这个|项目。
你|可以|把|文件|分享给我吗？
我|完成了|这个|任务。
我|需要|再多|一点|时间。
我们|讨论一下|细节吧。
请|发送|合同。
我|现在|正在|通话。
我|需要|回复|这封|邮件吗？
谢谢|你|今天的|帮助。`),
    emergency: topicRows(`我|需要|帮助。
我|需要|看|医生。
请|叫|警察。
我|需要|救护车。
我|找不到|钱包了。
我的|手机|被偷了。
我|不知道|自己|在哪里。
我|找不到|酒店了。
附近|有|医院吗？
我|不能|呼吸。
我|受伤了。
我|现在|需要|帮助。
我|找不到|护照了。
你|可以|叫|消防员吗？
我|有|危险。`),
    wellbeing: topicRows(`我|不|舒服。
我|需要|一个|地方|休息。
我|头疼。
我|肚子疼。
我|需要|一些|药。
我|明天|要|看医生。
最近的|药店|在哪里？
我|对|花生|过敏。
请|叫|护士来。
我|现在|感觉|好多了。
我|需要|坐下。
我|需要|喝水。
我|非常|累。
附近|有|诊所吗？
我|睡不着。`),
    daily: topicRows(`洗手间|在哪里？
现在|几点了？
今天|很|热。
我|会|在这里|等。
今天|是|星期几？
我|需要|给|手机|充电。
商店|八点|关门。
我的|钥匙|在|桌子上。
你|可以|打开|窗户吗？
我|在哪里|可以|洗手？
我|很快|就|到家。
电梯|在|右边。
请|开灯。
我|每天早上|坐|公交车。
需要|五分钟。`)
  },
  ko: {
    greetings: topicRows(`좋은|아침이에요!
내일|봐요!
다음|주에|봐요!
안녕하세요!
안녕히|주무세요,|내일|봐요!
우리|도시에|오신|것을|환영해요.
다시|만나서|반가워요.
오늘|어떻게|지내세요?
좋은|하루|보내세요!
즐거운|여행|되세요.
생일|축하해요!
와|주셔서|감사합니다.
만나서|반가워요.
나중에|봐요!
몸조심하세요!`),
    food: topicRows(`저는|커피를|좋아해요.
계산서|주세요.
두|명|자리|부탁해요.
메뉴를|볼|수|있을까요?
음식이|맛있어요.
채식|메뉴가|있나요?
무엇을|추천하세요?
배고파요.
목말라요.
설탕은|빼|주세요.
디저트를|가져다|주시겠어요?
수프가|너무|뜨거워요.
오늘의|요리를|주문해도|될까요?
음식이|정말|맛있었어요.
물|한|잔|주세요.`),
    travel: topicRows(`역이|어디에|있어요?
공항까지|가는|표가|필요해요.
시내|중심가에|어떻게|가요?
예약했어요.
지하철역이|어디에|있어요?
이|주소를|찾고|있어요.
역까지|걸어갈|수|있어요?
예약을|확인하고|싶어요.
버스|정류장이|근처에|있어요.
이|버스는|시내로|가나요?
기차를|갈아타야|하나요?
왕복|표를|사고|싶어요.
여행은|얼마나|걸려요?
비행기가|취소됐어요.
택시를|불러|주시겠어요?`),
    shopping: topicRows(`얼마예요?
카드로|결제해도|될까요?
이건|얼마예요?
그냥|구경|중이에요,|감사합니다.
카드|결제|되나요?
기념품을|찾고|있어요.
다른|사이즈도|있나요?
입어|봐도|될까요?
어디에서|계산하면|되나요?
이걸로|할게요.
다른|색상도|있나요?
현금도|받으시나요?
영수증을|받을|수|있을까요?
이|상품은|세일|중인가요?
이|상품을|교환해야|해요.`),
    conversation: topicRows(`정말|감사합니다!
만나서|반가워요.
천천히|말씀해|주시겠어요?
다시|말씀해|주시겠어요?
이|단어를|이해하지|못했어요.
여기에서|사진을|찍어도|될까요?
포르투갈어를|조금|해요.
어디에서|오셨어요?
성함이|어떻게|되세요?
무엇을|하는|것을|좋아하세요?
지도에서|보여|주시겠어요?
이름을|써|주시겠어요?
마지막|부분을|이해하지|못했어요.
포르투갈어를|할|줄|아세요?
나중에|이야기해도|될까요?`),
    study: topicRows(`배우고|있어요.
이|과제를|끝내야|해요.
이|단어는|무슨|뜻이에요?
이것을|적어|주시겠어요?
매일|일본어를|공부해요.
내일|시험이|있어요.
이|규칙을|설명해|주시겠어요?
필기를|복습해야|해요.
이|단어는|어떻게|발음해요?
사전을|사용해도|될까요?
새로운|단어를|배웠어요.
이|연습은|쉬웠어요.
이|문장은|맞나요?
같이|공부해요.
글쓰기를|연습하고|있어요.`),
    work: topicRows(`열|시에|회의가|있어요.
금요일에는|집에서|일해요.
오늘|보고서를|보내|주시겠어요?
회의는|아홉|시에|시작해요.
점심|식사|후에|시간이|있어요.
회의를|잡아야|해요.
이|프로젝트를|진행하고|있어요.
파일을|공유해|주시겠어요?
과제를|끝냈어요.
시간이|조금|더|필요해요.
세부|사항을|논의해요.
계약서를|보내|주세요.
지금|통화|중이에요.
이|이메일에|답장해야|할까요?
오늘|도와주셔서|감사합니다.`),
    emergency: topicRows(`도움이|필요해요.
의사가|필요해요.
경찰을|불러|주세요.
구급차가|필요해요.
지갑을|찾을|수|없어요.
휴대전화를|도둑맞았어요.
제가|어디에|있는지|모르겠어요.
호텔을|찾을|수|없어요.
근처에|병원이|있나요?
숨을|쉴|수|없어요.
다쳤어요.
지금|도움이|필요해요.
여권을|찾을|수|없어요.
소방서에|연락해|주시겠어요?
위험해요.`),
    wellbeing: topicRows(`몸이|좋지|않아요.
쉴|곳이|필요해요.
머리가|아파요.
배가|아파요.
약이|필요해요.
내일|병원|예약이|있어요.
가장|가까운|약국이|어디예요?
땅콩|알레르기가|있어요.
간호사를|불러|주세요.
이제|좀|나아졌어요.
앉아야|겠어요.
물을|마셔야|해요.
너무|피곤해요.
근처에|의원이|있나요?
잠을|잘|수|없어요.`),
    daily: topicRows(`화장실이|어디예요?
지금|몇|시예요?
오늘|정말|더워요.
여기서|기다릴게요.
오늘은|무슨|요일이에요?
휴대전화를|충전해야|해요.
가게는|여덟|시에|닫아요.
열쇠가|탁자|위에|있어요.
창문을|열어|주시겠어요?
어디에서|손을|씻을|수|있어요?
곧|집에|도착해요.
엘리베이터는|오른쪽에|있어요.
불을|켜|주세요.
매일|아침|버스를|타요.
오|분|걸려요.`)
  },
  ar: {
    greetings: topicRows(`صباح|الخير!
أراك|غدًا!
إلى|الأسبوع|القادم!
مساء|الخير!
ليلة|سعيدة،|أراك|غدًا!
مرحبًا|بك|في|مدينتنا.
سعدت|برؤيتك|مرة|أخرى.
كيف|حالك|اليوم؟
أتمنى|لك|يومًا|جميلًا!
أتمنى|لك|رحلة|سعيدة.
عيد|ميلاد|سعيد!
شكرًا|لمجيئك.
سعدت|بمعرفتك.
أراك|لاحقًا!
اعتن|بنفسك!`),
    food: topicRows(`أحب|القهوة.
الحساب،|من|فضلك.
طاولة|لشخصين،|من|فضلك.
هل|يمكنني|رؤية|قائمة|الطعام؟
الطعام|لذيذ.
هل|لديكم|خيار|نباتي؟
ماذا|توصي؟
أنا|جائع.
أنا|عطشان.
من|دون|سكر،|من|فضلك.
هل|يمكنك|إحضار|الحلوى؟
الحساء|ساخن|جدًا.
هل|يمكنني|طلب|طبق|اليوم؟
كانت|الوجبة|لذيذة.
كوب|ماء،|من|فضلك.`),
    travel: topicRows(`أين|المحطة؟
أحتاج|إلى|تذكرة|إلى|المطار.
كيف|أصل|إلى|وسط|المدينة؟
لدي|حجز.
أين|محطة|المترو؟
أبحث|عن|هذا|العنوان.
هل|يمكنني|المشي|إلى|المحطة؟
أريد|تأكيد|الحجز.
موقف|الحافلة|بالقرب|من|هنا.
هل|تذهب|هذه|الحافلة|إلى|وسط|المدينة؟
هل|أحتاج|إلى|تغيير|القطار؟
أريد|تذكرة|ذهاب|وإياب.
كم|تستغرق|الرحلة؟
أُلغيت|رحلتي|الجوية.
هل|يمكنك|طلب|سيارة|أجرة؟`),
    shopping: topicRows(`كم|السعر؟
هل|يمكنني|الدفع|بالبطاقة؟
كم|سعر|هذا؟
أنا|أتفرج|فقط،|شكرًا.
هل|تقبلون|البطاقات؟
أبحث|عن|تذكار.
هل|لديكم|مقاس|آخر؟
هل|يمكنني|تجربته؟
أين|يمكنني|الدفع؟
سآخذ|هذا.
هل|لديكم|لون|آخر؟
هل|تقبلون|النقد؟
هل|يمكنني|الحصول|على|إيصال؟
هل|هذا|المنتج|معروض|للبيع؟
أحتاج|إلى|استبدال|هذا|المنتج.`),
    conversation: topicRows(`شكرًا|جزيلًا!
سعدت|بمعرفتك.
هل|يمكنك|التحدث|ببطء|أكثر؟
هل|يمكنك|التكرار،|من|فضلك؟
لا|أفهم|هذه|الكلمة.
هل|يمكنني|التقاط|صورة|هنا؟
أتحدث|قليلًا|من|البرتغالية.
من|أين|أنت؟
ما|اسمك|الكامل؟
ماذا|تحب|أن|تفعل؟
هل|يمكنك|أن|تريني|على|الخريطة؟
هل|يمكنك|كتابة|اسمك؟
لم|أفهم|الجزء|الأخير.
هل|تتحدث|البرتغالية؟
هل|يمكننا|التحدث|لاحقًا؟`),
    study: topicRows(`أنا|أتعلم.
أحتاج|إلى|إنهاء|هذا|الواجب.
ماذا|تعني|هذه|الكلمة؟
من|فضلك،|اكتب|ذلك|لي.
أدرس|اليابانية|كل|يوم.
لدي|امتحان|غدًا.
هل|يمكنك|شرح|هذه|القاعدة؟
أحتاج|إلى|مراجعة|ملاحظاتي.
كيف|يُنطق|هذا|الكلمة؟
هل|يمكنني|استخدام|قاموس؟
تعلمت|كلمة|جديدة.
كان|هذا|التمرين|سهلًا.
هل|هذه|الجملة|صحيحة؟
لندرس|معًا.
أتدرب|على|الكتابة.`),
    work: topicRows(`لدي|اجتماع|في|الساعة|العاشرة.
أعمل|من|المنزل|أيام|الجمعة.
هل|يمكنك|إرسال|التقرير|اليوم؟
يبدأ|الاجتماع|في|الساعة|التاسعة.
أنا|متاح|بعد|الغداء.
أحتاج|إلى|تحديد|موعد|اجتماع.
أعمل|على|هذا|المشروع.
هل|يمكنك|مشاركة|الملف|معي؟
أنهيت|المهمة.
أحتاج|إلى|مزيد|قليل|من|الوقت.
لنتحدث|عن|التفاصيل.
من|فضلك،|أرسل|العقد.
أنا|في|مكالمة|الآن.
هل|أرد|على|هذا|البريد|الإلكتروني؟
شكرًا|على|مساعدتك|اليوم.`),
    emergency: topicRows(`أحتاج|إلى|مساعدة.
أحتاج|إلى|طبيب.
اتصل|بالشرطة،|من|فضلك.
أحتاج|إلى|سيارة|إسعاف.
لا|أستطيع|العثور|على|محفظتي.
سُرق|هاتفي.
لا|أعرف|أين|أنا.
لا|أستطيع|العثور|على|فندقي.
هل|يوجد|مستشفى|بالقرب|من|هنا؟
لا|أستطيع|التنفس.
لدي|إصابة.
أحتاج|إلى|مساعدة|الآن.
لا|أستطيع|العثور|على|جواز|سفري.
هل|يمكنك|الاتصال|بفرقة|الإطفاء؟
أنا|في|خطر.`),
    wellbeing: topicRows(`لا|أشعر|أنني|بخير.
أحتاج|إلى|مكان|للراحة.
لدي|صداع.
معدتي|تؤلمني.
أحتاج|إلى|دواء.
لدي|موعد|مع|الطبيب|غدًا.
أين|أقرب|صيدلية؟
لدي|حساسية|من|الفول|السوداني.
اتصل|بممرضة،|من|فضلك.
أشعر|بتحسن|الآن.
أحتاج|إلى|الجلوس.
أحتاج|إلى|شرب|الماء.
أنا|مرهق|جدًا.
هل|توجد|عيادة|بالقرب|من|هنا؟
لا|أستطيع|النوم.`),
    daily: topicRows(`أين|الحمام؟
كم|الساعة|الآن؟
الجو|حار|جدًا|اليوم.
سأنتظر|هنا.
ما|يوم|الأسبوع|اليوم؟
أحتاج|إلى|شحن|هاتفي.
يغلق|المتجر|في|الساعة|الثامنة.
مفاتيحي|على|الطاولة.
هل|يمكنك|فتح|النافذة؟
أين|يمكنني|غسل|يدي؟
سأصل|إلى|المنزل|قريبًا.
المصعد|على|اليمين.
من|فضلك،|أشعل|النور.
أستقل|الحافلة|كل|صباح.
يستغرق|الأمر|خمس|دقائق.`)
  }
};

export const EXTRA_READINGS = {
  zh: {
    greetings: topicRows(`zǎoshang hǎo
míngtiān jiàn
xià zhōu jiàn
xiàwǔ hǎo
wǎn'ān, míngtiān jiàn
huānyíng lái dào wǒmen de chéngshì
hěn gāoxìng zài cì jiàn dào nǐ
nǐ jīntiān hǎo ma
zhù nǐ jīntiān yúkuài
zhù nǐ lǚtú yúkuài
shēngrì kuàilè
xièxie nǐ lái
hěn gāoxìng rènshi nǐ
dāihuǐr jiàn
bǎozhòng`),
    food: topicRows(`wǒ xǐhuan kāfēi
qǐng jiézhàng
qǐng gěi wǒmen yì zhāng liǎng rén zhuō
qǐngwèn kěyǐ kàn càidān ma
shíwù hěn hǎochī
yǒu sùshí xuǎnxiàng ma
nǐ tuījiàn shénme
wǒ è le
wǒ kě le
qǐng bú yào jiā táng
kěyǐ bǎ tiándiǎn ná lái ma
tāng hěn tàng
wǒ kěyǐ diǎn jīnrì tècān ma
zhè dùn fàn hěn hǎochī
qǐng gěi wǒ yì bēi shuǐ`),
    travel: topicRows(`chēzhàn zài nǎlǐ
wǒ xūyào yì zhāng qù jīchǎng de chēpiào
zěnme qù shì zhōngxīn
wǒ yǒu yùdìng
dìtiězhàn zài nǎlǐ
wǒ zài zhǎo zhège dìzhǐ
wǒ kěyǐ zǒulù qù chēzhàn ma
wǒ xiǎng quèrèn yùdìng
gōngjiāochēzhàn zài fùjìn
zhè liàng gōngjiāochē qù shì zhōngxīn ma
wǒ xūyào huàn huǒchē ma
wǒ xiǎngyào yì zhāng wǎngfǎn piào
lǚchéng xūyào duō cháng shíjiān
wǒ de hángbān qǔxiāo le
kěyǐ bāng wǒ jiào chūzūchē ma`),
    shopping: topicRows(`duōshao qián
wǒ kěyǐ shuākǎ ma
zhège duōshao qián
wǒ zhǐshì kànkan, xièxie
nǐmen shōu yínhángkǎ ma
wǒ zài zhǎo jìniànpǐn
yǒu bié de chǐmǎ ma
wǒ kěyǐ shìchuān ma
wǒ zài nǎlǐ fùkuǎn
wǒ mǎi zhège
yǒu bié de yánsè ma
nǐmen shōu xiànjīn ma
kěyǐ gěi wǒ yì zhāng shōujù ma
zhège shāngpǐn zài dǎzhé ma
wǒ xūyào huàn zhège shāngpǐn`),
    conversation: topicRows(`fēicháng gǎnxiè nǐ
hěn gāoxìng rènshi nǐ
nǐ kěyǐ shuō de màn yìdiǎn ma
qǐngwèn kěyǐ zài shuō yí biàn ma
wǒ bù dǒng zhège cí
wǒ kěyǐ zài zhèlǐ pāizhào ma
wǒ huì shuō yìdiǎn pútaoyáyǔ
nǐ láizì nǎlǐ
nǐ de quánmíng shì shénme
nǐ xǐhuan zuò shénme
nǐ kěyǐ zài dìtú shàng zhǐ gěi wǒ kàn ma
nǐ kěyǐ xiě xià nǐ de míngzi ma
wǒ méi tīng dǒng zuìhòu yí bùfen
nǐ huì shuō pútaoyáyǔ ma
wǒmen kěyǐ wǎndiǎn liáo ma`),
    study: topicRows(`wǒ zhèngzài xuéxí
wǒ xūyào wánchéng zhège zuòyè
zhège cí shì shénme yìsi
qǐng bāng wǒ bǎ zhège xiě xiàlai
wǒ měitiān xuéxí rìyǔ
wǒ míngtiān yǒu kǎoshì
nǐ kěyǐ jiěshì zhège guīzé ma
wǒ xūyào fùxí wǒ de bǐjì
zhège cí zěnme fāyīn
wǒ kěyǐ yòng cídiǎn ma
wǒ xuéhuì le yí ge xīn cí
zhège liànxí hěn jiǎndān
zhège jùzi zhèngquè ma
wǒmen yìqǐ xuéxí ba
wǒ zhèngzài liànxí xiězuò`),
    work: topicRows(`wǒ shí diǎn yǒu huìyì
wǒ xīngqīwǔ zài jiā gōngzuò
nǐ jīntiān kěyǐ fā bàogào ma
huìyì jiǔ diǎn kāishǐ
wǒ wǔfàn hòu yǒu kòng
wǒ xūyào ānpái yí ge huìyì
wǒ zhèngzài zuò zhège xiàngmù
nǐ kěyǐ bǎ wénjiàn fēnxiǎng gěi wǒ ma
wǒ wánchéng le zhège rènwu
wǒ xūyào zài duō yìdiǎn shíjiān
wǒmen tǎolùn yíxià xìjié ba
qǐng fāsòng hétong
wǒ xiànzài zhèngzài tōnghuà
wǒ xūyào huífù zhè fēng yóujiàn ma
xièxie nǐ jīntiān de bāngzhù`),
    emergency: topicRows(`wǒ xūyào bāngzhù
wǒ xūyào kàn yīshēng
qǐng jiào jǐngchá
wǒ xūyào jiùhùchē
wǒ zhǎo bú dào qiánbāo le
wǒ de shǒujī bèi tōu le
wǒ bù zhīdào zìjǐ zài nǎlǐ
wǒ zhǎo bú dào jiǔdiàn le
fùjìn yǒu yīyuàn ma
wǒ bù néng hūxī
wǒ shòushāng le
wǒ xiànzài xūyào bāngzhù
wǒ zhǎo bú dào hùzhào le
nǐ kěyǐ jiào xiāofángyuán ma
wǒ yǒu wēixiǎn`),
    wellbeing: topicRows(`wǒ bù shūfu
wǒ xūyào yí ge dìfang xiūxi
wǒ tóuténg
wǒ dùzi téng
wǒ xūyào yìxiē yào
wǒ míngtiān yào kàn yīshēng
zuìjìn de yàodiàn zài nǎlǐ
wǒ duì huāshēng guòmǐn
qǐng jiào hùshi lái
wǒ xiànzài gǎnjué hǎoduō le
wǒ xūyào zuò xià
wǒ xūyào hē shuǐ
wǒ fēicháng lèi
fùjìn yǒu zhěnsuǒ ma
wǒ shuì bù zháo`),
    daily: topicRows(`xǐshǒujiān zài nǎlǐ
xiànzài jǐ diǎn le
jīntiān hěn rè
wǒ huì zài zhèlǐ děng
jīntiān shì xīngqī jǐ
wǒ xūyào gěi shǒujī chōngdiàn
shāngdiàn bā diǎn guānmén
wǒ de yàoshi zài zhuōzi shàng
nǐ kěyǐ dǎkāi chuānghu ma
wǒ zài nǎlǐ kěyǐ xǐ shǒu
wǒ hěn kuài jiù dào jiā
diàntī zài yòubiān
qǐng kāi dēng
wǒ měitiān zǎoshang zuò gōngjiāochē
xūyào wǔ fēnzhōng`)
  },
  ar: {
    greetings: topicRows(`ṣabāḥ al-khayr
arāka ghadan
ilā al-usbūʿ al-qādim
masāʾ al-khayr
layla saʿīda, arāka ghadan
marḥaban bika fī madīnatina
saʿidtu biruʾyatika marratan ukhrā
kayfa ḥāluka al-yawm
atamannā laka yawman jamīlan
atamannā laka riḥlatan saʿīda
ʿīd mīlād saʿīd
shukran limajīʾika
surirtu bimaʿrifatika
arāka lāḥiqan
iʿtan binafsik`),
    food: topicRows(`uḥibbu al-qahwa
al-ḥisāb, min faḍlik
ṭāwila lishakhṣayn, min faḍlik
hal yumkinunī ruʾyatu qāʾimati al-ṭaʿām
al-ṭaʿām ladhīdh
hal ladaykum khiyār nabātī
mādhā tanṣaḥ
anā jāʾiʿ
anā ʿaṭshān
min dūni sukkar, min faḍlik
hal yumkinuka iḥḍāru al-ḥalwā
al-ḥasāʾ sākhun jiddan
hal yumkinunī ṭalabu ṭabaqi al-yawm
kānat al-wajba ladhīdhat
kūb māʾ, min faḍlik`),
    travel: topicRows(`ayna al-maḥaṭṭa
aḥtāju ilā tadhkiratin ilā al-maṭār
kayfa aṣilu ilā wasaṭ al-madīna
ladayya ḥajz
ayna maḥaṭṭat al-mītrū
abḥathu ʿan hādhā al-ʿunwān
hal yumkinunī al-mashyu ilā al-maḥaṭṭa
urīdu taʾkīda al-ḥajz
mawqifu al-ḥāfila bilqurbi min hunā
hal tadhhabu hādhihi al-ḥāfila ilā wasaṭ al-madīna
hal aḥtāju ilā taghyīri al-qiṭār
urīdu tadhkirata dhahābin wa-iyāb
kam tastagriqu al-riḥla
ulghiyat riḥlatī al-jawwiyya
hal yumkinuka ṭalabu sayyārati ujra`),
    shopping: topicRows(`kam al-siʿr
hal yumkinunī al-dafʿu bilbiṭāqa
kam siʿru hādhā
anā atafarraju faqaṭ, shukran
hal taqbalūna al-biṭāqāt
abḥathu ʿan tadhkār
hal ladaykum maqāsun ākhar
hal yumkinunī tajribatuh
ayna yumkinunī al-dafʿ
saʾākhud hādhā
hal ladaykum lawnun ākhar
hal taqbalūna al-naqd
hal yumkinunī al-ḥuṣūlu ʿalā īṣāl
hal hādhā al-muntaj maʿrūḍ lil-bayʿ
aḥtāju ilā istibdāli hādhā al-muntaj`),
    conversation: topicRows(`shukran jazīlan
surirtu bimaʿrifatika
hal yumkinuka al-taḥadduthu bibṭʾin akthar
hal yumkinuka al-tikrār, min faḍlik
lā afhamu hādhihi al-kalima
hal yumkinunī iltiqāṭu ṣūrati hunā
ataḥaddathu qalīlan min al-burtughāliyya
min ayna anta
mā ismuka al-kāmil
mādhā tuḥibbu an tafʿal
hal yumkinuka an turiyanī ʿalā al-kharīṭa
hal yumkinuka kitābatu ismika
lam afham al-juzʾa al-akhīr
hal tataḥaddathu al-burtughāliyya
hal yumkinunā al-taḥadduthu lāḥiqan`),
    study: topicRows(`anā ataʿallam
aḥtāju ilā inhāʾi hādhā al-wājib
mādhā taʿnī hādhihi al-kalima
min faḍlik, uktub dhālika lī
adrusu al-yābāniyya kulla yawm
ladayya imtiḥān ghadan
hal yumkinuka sharḥu hādhihi al-qāʿida
aḥtāju ilā murājaʿati mulāḥaẓātī
kayfa tunṭaqu hādhihi al-kalima
hal yumkinunī istikhdāmu qāmūs
taʿallamtu kalimatan jadīda
kāna hādhā al-tamrīn sahlān
hal hādhihi al-jumla ṣaḥīḥa
linadrus maʿan
atadarrabu ʿalā al-kitāba`),
    work: topicRows(`ladayya ijtimāʿ fī al-sāʿa al-ʿāshira
aʿmalu min al-manzil ayyām al-jumʿa
hal yumkinuka irsālu al-taqrīr al-yawm
yabdaʾu al-ijtimāʿ fī al-sāʿa al-tāsiʿa
anā mutāḥ baʿda al-ghadāʾ
aḥtāju ilā taḥdīdi mawʿidi ijtimāʿ
aʿmalu ʿalā hādhā al-mashrūʿ
hal yumkinuka mushārakatu al-milaff maʿī
anhaytu al-muhimma
aḥtāju ilā mazīdin qalīlin min al-waqt
linataḥaddath ʿan al-tafāṣīl
min faḍlik, arsil al-ʿaqd
anā fī mukālima al-ān
hal aruddu ʿalā hādhā al-barīd al-iliktrūnī
shukran ʿalā musāʿadatika al-yawm`),
    emergency: topicRows(`aḥtāju ilā musāʿada
aḥtāju ilā ṭabīb
ittaṣil bil-shurṭa, min faḍlik
aḥtāju ilā sayyārati isʿāf
lā astaṭīʿu al-ʿuthūra ʿalā miḥfaẓatī
suriqa hātifī
lā aʿrifu ayna anā
lā astaṭīʿu al-ʿuthūra ʿalā funduqī
hal yūjadu mustashfā bilqurbi min hunā
lā astaṭīʿu al-tanaffus
ladayya iṣāba
aḥtāju ilā musāʿadatin al-ān
lā astaṭīʿu al-ʿuthūra ʿalā jawāzi safarī
hal yumkinuka al-ittiṣālu bifirqat al-iṭfāʾ
anā fī khaṭar`),
    wellbeing: topicRows(`lā ashʿuru annanī bikhayr
aḥtāju ilā makānin lil-rāḥa
ladayya ṣudāʿ
miʿdatī tuʾlimunī
aḥtāju ilā dawāʾ
ladayya mawʿid maʿa al-ṭabīb ghadan
ayna aqrabu ṣaydaliyya
ladayya ḥasāsiyya min al-fūl al-sūdānī
ittaṣil bimumarriḍa, min faḍlik
ashʿuru bitaḥassun al-ān
aḥtāju ilā al-julūs
aḥtāju ilā shurb al-māʾ
anā murhaq jiddan
hal tūjadu ʿiyāda bilqurbi min hunā
lā astaṭīʿu al-nawm`),
    daily: topicRows(`ayna al-ḥammām
kam al-sāʿa al-ān
al-jawwu ḥārrun jiddan al-yawm
saʾantaẓiru hunā
mā yawm al-usbūʿ al-yawm
aḥtāju ilā shaḥni hātifī
yughliqu al-matjar fī al-sāʿa al-thāmina
mafātīḥī ʿalā al-ṭāwila
hal yumkinuka fatḥu al-nāfidha
ayna yumkinunī ghaslu yadayya
saʾaṣilu ilā al-manzil qarīban
al-miṣʿadu ʿalā al-yamīn
min faḍlik, ashʿil al-nūr
astaqillu al-ḥāfila kulla ṣabāḥ
yastaġriqu al-amru khams daqāʾiq`)
  }
};

export function romanizeKorean(text) {
  const initial = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
  const vowel = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
  const final = ['', 'k', 'k', 'ks', 'n', 'nj', 'nh', 't', 'l', 'lk', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'p', 'ps', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];
  return [...text].map(char => {
    const code = char.codePointAt(0) - 0xac00;
    if (code < 0 || code > 11171) return char;
    const initialIndex = Math.floor(code / 588);
    const vowelIndex = Math.floor((code % 588) / 28);
    const finalIndex = code % 28;
    return initial[initialIndex] + vowel[vowelIndex] + final[finalIndex];
  }).join('');
}
