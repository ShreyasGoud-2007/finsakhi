import type { FinancialLesson, LessonCategory } from "./types";

export const LESSON_CATEGORIES: {
  id: LessonCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All topics" },
  { id: "basics", label: "Basics" },
  { id: "saving", label: "Saving" },
  { id: "borrowing", label: "Borrowing" },
  { id: "investing", label: "Investing" },
  { id: "protection", label: "Protection" },
];

export const LESSONS: FinancialLesson[] = [
  {
    id: "savings-account",
    title: {
      en: "What is a Savings Account?",
      te: "సేవింగ్స్ అకౌంట్ అంటే ఏమిటి?",
      hi: "सेविंग्स अकाउंट क्या है?",
    },
    summary: {
      en: "A safe place in a bank to keep money you do not need today.",
      te: "ఇప్పుడిక అవసరం లేని డబ్బును బ్యాంక్లో ఉంచుకోవడానికి సురక్షితమైన స్థానం.",
      hi: "ऐसा सुरक्षित स्थान जहाँ आप आज के लिए ज़रूरी नहीं पैसा रख सकते हैं।",
    },
    category: "basics",
    icon: "PiggyBank",
    explanation: {
      en: "A savings account is an account you open at a bank or post office. You keep your money there instead of at home. You can put money in and take money out whenever you need it. The bank also adds a small amount of extra money, called interest, for keeping your money with them.",
      te: "సేవింగ్స్ అకౌంట్ అంటే బ్యాంకు లేదా పోస్టాఫీసులో తెరవుకునే ఖాతా. మీరు మీ డబ్బును ఇంట్లో కాకుండా అక్కడ ఉంచుతారు. మీకు అవసరమైతే డబ్బును జమ చేయవచ్చు లేదా తీసుకోవచ్చు. మీ డబ్బును అక్కడ ఉంచినందుకు బ్యాంకు చిన్న మొత్తంలో వడ్డీ చెల్లిస్తుంది.",
      hi: "सेविंग्स अकाउंट वह खाता है जिसे आप बैंक या पोस्ट ऑफिस में खोलते हैं। आप अपना पैसा घर पर रखने के बजाय वहां रखते हैं। आप जब भी जरूरत हो, पैसा जमा या निकाल सकते हैं। बैंक आपको आपके पैसे को रखने के लिए थोड़ी अतिरिक्त राशि भी देता है, जिसे ब्याज कहते हैं।",
    },
    example: {
      en: "Kavitha sells vegetables. Every evening she keeps ₹50 aside. At the end of the month she puts ₹1,500 into her savings account. The money is safe, and she can withdraw it any day she needs it.",
      te: "కవిత కూరగాయలు అమ్ముతుంది. ప్రతి సాయంత్రం ₹50ను పక్కన ఉంచుతుంది. నెలాఖర్లో ₹1,500ను సేవింగ్స్ అకౌంట్‌లో వేస్తుంది. డబ్బు సురక్షితంగా ఉంటుంది, అవసరం వచ్చినప్పుడు ఎప్పుడైనా తీసుకోవచ్చు.",
      hi: "कविता सब्ज़ियाँ बेचती है। हर शाम वह ₹50 अलग रखती है। महीने के अंत में वह ₹1,500 अपने सेविंग्स अकाउंट में डाल देती है। पैसा सुरक्षित रहता है, और अगर ज़रूरत पड़े तो वह किसी भी दिन निकाल सकती है।",
    },
    whyItMatters: {
      en: "Money kept at home can be lost, stolen or spent without thinking. Money in a bank is counted, recorded and available when you need it. A bank account is also needed to receive government payments directly.",
      te: "ఇంట్లో ఉంచిన డబ్బు పోగొట్టుకోవచ్చు, దొంగిలించవచ్చు లేదా ఆలోచించకుండా ఖర్చు చేయవచ్చు. బ్యాంకులో ఉంచిన డబ్బు లెక్కలో ఉంటుంది, రికార్డు ఉంటుంది మరియు అవసరమైనప్పుడు అందుబాటులో ఉంటుంది. ప్రభుత్వ చెల్లింపులు నేరుగా పొందడానికి బ్యాంకు ఖాతా కూడా అవసరం.",
      hi: "घर में रखा पैसा खो सकता है, चोरी हो सकता है या बिना सोचे खर्च हो सकता है। बैंक में रखा पैसा गिना और दर्ज किया जाता है, और जरूरत पड़ने पर मिल जाता है। सरकार से मिलने वाला पैसा सीधे पाने के लिए बैंक खाता भी जरूरी है।",
    },
    remember: {
      en: [
        "Opening a basic savings account under Jan Dhan needs no minimum balance.",
        "Ask the bank for a passbook so you can see every entry.",
        "Never share your PIN or OTP with anyone, including bank staff.",
      ],
      te: [
        "జన్ ధన్ క్రింద బేసిక్ సేవింగ్స్ అకౌంట్ తెరవడానికి కనీస బ్యాలెన్స్ అవసరం లేదు.",
        "ప్రతి ఎంట్రీను చూడటానికి బ్యాంకు నుంచి పాస్బుక్ అడగండి.",
        "PIN లేదా OTPను బ్యాంకు స్టాఫ్‌తో సహా ఎవరితోనూ పంచుకోకండి.",
      ],
      hi: [
        "जनधन के तहत बेसिक सेविंग्स अकाउंट खोलने के लिए कोई मिनिमम बैलेंस जरूरी नहीं है।",
        "हर एंट्री देखने के लिए बैंक से पासबुक मांगें।",
        "PIN या OTP किसी के साथ भी शेयर न करें, बैंक स्टाफ़ सहित।",
      ],
    },
  },
  {
    id: "interest",
    title: {
      en: "What is Interest?",
      te: "వడ్డీ అంటే ఏమిటి?",
      hi: "ब्याज क्या है?",
    },
    summary: {
      en: "Extra money you earn on savings, or extra money you pay on a loan.",
      te: "పొదుపుపై మీకు వచ్చే అదనపు డబ్బు, లేదా రుణంపై చెల్లించే అదనపు డబ్బు.",
      hi: "बचत पर मिलने वाला अतिरिक्त पैसा या कर्ज पर देना पड़ने वाला अतिरिक्त पैसा।",
    },
    category: "basics",
    icon: "Percent",
    explanation: {
      en: "Interest works in two directions. When you keep money in a bank, the bank pays you interest. When you borrow money, you pay interest to the lender. It is usually written as a percentage for one year.",
      te: "వడ్డీ రెండు విధాలుగా పనిచేస్తుంది. మీరు డబ్బును బ్యాంకులో ఉంచితే, బ్యాంకు మీకు వడ్డీ చెల్లిస్తుంది. మీరు డబ్బు అప్పుగా తీసుకుంటే, అప్పు ఇచ్చిన వారికి వడ్డీ చెల్లించాలి. ఇది సాధారణంగా ఒక సంవత్సరానికి శాతంగా రాస్తారు.",
      hi: "ब्याज दो तरह से काम करता है। जब आप पैसा बैंक में रखते हैं, तो बैंक आपको ब्याज देता है। जब आप पैसा उधार लेते हैं, तो आपको कर्ज देने वाले को ब्याज देना पड़ता है। इसे आमतौर पर एक साल की प्रतिशत दर के रूप में लिखा जाता है।",
    },
    example: {
      en: "If you keep ₹10,000 in a savings account at 4% per year, after one year the bank adds about ₹400. If you borrow ₹10,000 at 24% per year, you pay about ₹2,400 extra over the year.",
      te: "మీరు ₹10,000ను 4% వార్షిక వడ్డీతో సేవింగ్స్ అకౌంట్‌లో ఉంచితే, ఒక సంవత్సరం తర్వాత బ్యాంకు సుమారుగా ₹400 అదనంగా జోడిస్తుంది. మీరు ₹10,000ను 24% వార్షిక వడ్డీతో అప్పుగా తీసుకుంటే, ఒక సంవత్సరంలో సుమారుగా ₹2,400 అదనంగా చెల్లించాలి.",
      hi: "अगर आप ₹10,000 को 4% सालाना ब्याज पर सेविंग्स अकाउंट में रखते हैं, तो एक साल बाद बैंक लगभग ₹400 जोड़ देगा। अगर आप ₹10,000 को 24% सालाना ब्याज पर उधार लेते हैं, तो एक साल में आपको लगभग ₹2,400 अतिरिक्त देना होगा।",
    },
    whyItMatters: {
      en: "The same word can help you or cost you. Understanding the rate before borrowing is the difference between a loan you can repay and one that grows faster than your income.",
      te: "అదే పదం మీకు సహాయం చేయగలదు లేదా మీకు ఖర్చు చేయగలదు. రుణం తీసుకోకముందే వడ్డీ రేటును అర్థం చేసుకోవడం, మీరు చెల్లించగల రుణంను మరియు మీ ఆదాయంతో పోలిస్తే వేగంగా పెరిగే రుణం మధ్య తేడాను తెలుసుకోవడమే.",
      hi: "इसी शब्द से आपको लाभ भी हो सकता है और नुकसान भी। उधार लेने से पहले दर समझना, ऐसी लोन को पहचानने में मदद करता है जिसे आप चुका सकते हैं और ऐसी लोन से बचा जा सकता है जो आपकी आय से तेज़ी से बढ़ती है।",
    },
    remember: {
      en: [
        "Always ask for the yearly rate, not the monthly one.",
        "A moneylender charging 5% per month is charging 60% per year.",
        "Interest on savings is small but it is free money.",
      ],
      te: [
        "ఎల్లప్పుడూ నెలవారీ రేటు కాకుండా వార్షిక రేటును అడగండి.",
        "నెలకు 5% వడ్డీ వసూలు చేసే వ్యక్తి వార్షికంగా 60% వడ్డీ వసూలు చేస్తున్నాడు.",
        "పొదుపుపై వడ్డీ చిన్నది, కానీ అది ఉచిత డబ్బు.",
      ],
      hi: [
        "हमेशा महीना-वार दर नहीं, सालाना दर पूछें।",
        "जो व्यक्ति महीने में 5% ब्याज लेता है, वह सालाना 60% ब्याज ले रहा है।",
        "बचत पर ब्याज कम होता है, लेकिन यह मुफ्त पैसा है।",
      ],
    },
  },
  {
    id: "budget",
    title: {
      en: "What is a Budget?",
      te: "బడ్జెట్ అంటే ఏమిటి?",
      hi: "बजट क्या है?",
    },
    summary: {
      en: "A simple plan for what your money will do this month.",
      te: "ఈ నెల మీ డబ్బును ఎలా ఉపయోగించాలో చెప్పే సులభమైన ప్రణాళిక.",
      hi: "इस महीने आपके पैसे का सरल प्लान।",
    },
    category: "basics",
    icon: "ClipboardList",
    explanation: {
      en: "A budget is deciding, before the month starts, how much of your income goes to food, travel, school, medicines and savings. It is not about spending less on everything. It is about knowing where your money is going.",
      te: "బడ్జెట్ అంటే నెల ప్రారంభమయ్యేదాకా మీ ఆదాయం ఎంత భాగం ఆహారం, ప్రయాణం, పాఠశాల, ఔషధాలు మరియు పొదుపులకు వెళ్తుందో నిర్ణయించడం. ఇది సమస్తంగా తక్కువ ఖర్చు చేయడం కాదు. మీ డబ్బు ఎక్కడికి వెళ్తుందో తెలుసుకోవడం.",
      hi: "बजट का मतलब है महीने शुरू होने से पहले तय करना कि आपकी आय का कितना हिस्सा भोजन, यात्रा, स्कूल, दवाइयाँ और बचत में जाएगा। इसका मतलब यह नहीं है कि हर चीज़ पर कम खर्च करना है। इसका मतलब है यह समझना कि आपका पैसा कहाँ जा रहा है।",
    },
    example: {
      en: "Income ₹15,000. Plan: ₹4,000 food, ₹1,500 travel, ₹2,000 school, ₹1,000 household, ₹500 medicines, ₹2,000 savings. That leaves ₹4,000 for anything unexpected.",
      te: "ఆదాయం ₹15,000. ప్లాన్: ₹4,000 ఆహారం, ₹1,500 ప్రయాణం, ₹2,000 పాఠశాల, ₹1,000 గృహ అవసరాలు, ₹500 ఔషధాలు, ₹2,000 పొదుపు. మిగిలిన ₹4,000 ఊహించని అవసరాలకు ఉంటుంది.",
      hi: "आय ₹15,000. योजना: ₹4,000 भोजन, ₹1,500 यात्रा, ₹2,000 स्कूल, ₹1,000 घरेलू खर्च, ₹500 दवा, ₹2,000 बचत। शेष ₹4,000 अप्रत्याशित चीजों के लिए बचा है।",
    },
    whyItMatters: {
      en: "Without a plan, money disappears in small amounts and there is nothing left at month end. With a plan, saving happens first instead of last.",
      te: "ప్లాన్ లేకుండా, డబ్బు చిన్న మొత్తాలుగా ఆవిరైపోతుంది మరియు నెలాఖరుకు ఏమీ మిగలదు. ప్లాన్ ఉంటే, పొదుపు చివరిలో కాకుండా మొదట జరుగుతుంది.",
      hi: "बिना योजना के, पैसा छोटे-छोटे रूप में खत्म हो जाता है और महीने के अंत में कुछ नहीं बचता। योजना होने पर, बचत आखिर में नहीं बल्कि पहले होती है।",
    },
    remember: {
      en: [
        "Write the plan at the start of the month, not the end.",
        "Keep savings as a fixed item, like rent.",
        "A budget that is never followed is still better than no budget - adjust it.",
      ],
      te: [
        "ప్లాన్‌ను నెల ప్రారంభంలో వ్రాయండి, ముగింపు వద్ద కాదు.",
        "పొదుపును క్రయం వంటి స్థిర అంశంగా ఉంచండి.",
        "ఎప్పుడూ అనుసరించని బడ్జెట్ కూడా బడ్జెట్ లేకపోవడాన్ని కంటే మెరుగ్గా ఉంటుంది - దాన్ని సర్దుబాటు చేయండి.",
      ],
      hi: [
        "योजना महीने की शुरुआत में लिखें, अंत में नहीं।",
        "बचत को किराए जैसी स्थिर चीज़ के रूप में रखें।",
        "जो बजट कभी नहीं चलता, वह बजट न होने से बेहतर है — उसे बदलें।",
      ],
    },
  },
  {
    id: "emergency-fund",
    title: {
      en: "What is an Emergency Fund?",
      te: "అత్యవసర నిధి అంటే ఏమిటి?",
      hi: "आपातकालीन फंड क्या है?",
    },
    summary: {
      en: "Money kept aside only for sudden, unexpected needs.",
      te: "హఠాత్తుగా వచ్చే అనుకోని అవసరాల కోసం మాత్రమే విడిగా ఉంచిన డబ్బు.",
      hi: "अचानक और अप्रत्याशित ज़रूरतों के लिए अलग रखा गया पैसा।",
    },
    category: "saving",
    icon: "ShieldCheck",
    explanation: {
      en: "An emergency fund is money kept aside for unexpected expenses such as medical needs, house or vehicle repairs, or a month when income does not come. It is not for festivals, weddings or shopping - those can be planned in advance.",
      te: "అత్యవసర నిధి అంటే వైద్య అవసరాలు, ఇల్లు లేదా వాహనం మరమ్మత్తు, లేదా ఆదాయం రాని నెల వంటి అనుకోని ఖర్చుల కోసం విడిగా ఉంచిన డబ్బు. ఇది పండుగలు, పెళ్లిళ్లు లేదా షాపింగ్ కోసం కాదు — వీటిని ముందుగానే ప్లాన్ చేయవచ్చు.",
      hi: "आपातकालीन फंड वह पैसा है जिसे मेडिकल ज़रूरत, घर या वाहन की मरम्मत, या ऐसे महीने के लिए अलग रखा जाता है जब आय नहीं आती। यह त्योहार, शादी या खरीदारी के लिए नहीं है — इनकी योजना पहले से की जा सकती है।",
    },
    example: {
      en: "If your essential monthly expenses are ₹8,000, you can gradually build an emergency fund by saving a small amount regularly. Saving ₹2,000 a month reaches ₹20,000 in ten months - enough to cover more than two months of essentials.",
      te: "మీ ప్రాధాన్య నెలవారీ ఖర్చులు ₹8,000 అయితే, మీరు చిన్న మొత్తాన్ని క్రమంగా పొదుపు చేయడం ద్వారా అత్యవసర నిధిని నిర్మించవచ్చు. నెలకు ₹2,000 పొదుపు చేస్తే, 10 నెలల్లో ₹20,000 చేరుతుంది — ఇది రెండు నెలల అవసరాలకు సరిపోతుంది.",
      hi: "अगर आपके ज़रूरी महीने के खर्च ₹8,000 हैं, तो आप नियमित रूप से थोड़ा-थोड़ा पैसा बचाकर आपातकालीन फंड बना सकते हैं। महीने में ₹2,000 बचाने से 10 महीने में ₹20,000 बन जाता है — जो दो महीने के ज़रूरी खर्चों से ज़्यादा है।",
    },
    whyItMatters: {
      en: "An emergency fund is what stops a small problem from becoming a big debt. Without it, a hospital bill turns into a high-interest loan that takes years to repay.",
      te: "అత్యవసర నిధి చిన్న సమస్యను పెద్ద రుణంగా మారకుండా అడ్డుకుంటుంది. అది లేకపోతే, ఆసుపత్రి బిల్లు ఎక్కువ వడ్డీతో కూడిన రుణంగా మారి సంవత్సరాలు చెల్లించాల్సి వస్తుంది.",
      hi: "आपातकालीन फंड छोटे संकट को बड़े कर्ज में बदलने से रोकता है। इसके बिना अस्पताल का बिल ऊँची ब्याज दर वाले कर्ज में बदल सकता है, जिसे चुकाने में सालों लग जाते हैं।",
    },
    remember: {
      en: [
        "Aim for three months of essential expenses, built slowly.",
        "Keep it separate from your daily-use money so it is not spent by habit.",
        "Refill it after you use it.",
      ],
      te: [
        "మూడు నెలల ప్రాధాన్య ఖర్చులకు లక్ష్యంగా ఉండండి, నెమ్మదిగా నిర్మించండి.",
        "దీనిని రోజువారీ డబ్బు నుంచి వేరుగా ఉంచండి, తద్వారా అలవాటుని బట్టి ఖర్చు చేయకండి.",
        "వాడిన తర్వాత మళ్లీ నింపండి.",
      ],
      hi: [
        "तीन महीने के ज़रूरी खर्चों का लक्ष्य रखें, धीरे-धीरे बनाएं।",
        "इसे रोज़मर्रा के पैसे से अलग रखें ताकि यह आदत से खर्च न हो जाए।",
        "इसे उपयोग करने के बाद फिर से भरें।",
      ],
    },
  },
  {
    id: "loan",
    title: {
      en: "What is a Loan?",
      te: "రుణం అంటే ఏమిటి?",
      hi: "लोन क्या है?",
    },
    summary: {
      en: "Money you borrow now and repay later, with interest.",
      te: "ఇప్పుడే తీసుకొని తర్వాత వడ్డీతో తిరిగి చెల్లించాల్సిన డబ్బు.",
      hi: "आज उधार लिया जाने वाला पैसा जिसे बाद में ब्याज सहित चुकाना होता है।",
    },
    category: "borrowing",
    icon: "Landmark",
    explanation: {
      en: "A loan is money given to you by a bank, a self-help group or a lender, which you repay in instalments over an agreed time. Along with the borrowed amount, you pay interest. A loan is useful when it helps you earn more - like buying a sewing machine - and risky when it is used for daily spending.",
      te: "రుణం అంటే బ్యాంకు, స్వయం సహాయక సమూహం లేదా అప్పు ఇచ్చే వ్యక్తి మీకు ఇచ్చే డబ్బు. అంగీకరించిన సమయంలో దాన్ని వాయిదాలుగా తిరిగి చెల్లించాలి. తీసుకున్న మొత్తంపై వడ్డీ కూడా చెల్లించాలి. రుణం మీ ఆదాయాన్ని పెంచడంలో సహాయపడితే ఉపయోగకరం — ఉదాహరణకు కుట్టు యంత్రం కొనడం — కానీ రోజువారీ ఖర్చులకు ఉపయోగిస్తే ప్రమాదకరం.",
      hi: "कर्ज वह पैसा है जो बैंक, स्वयं सहायता समूह या कोई कर्ज देने वाला आपको देता है। इसे तय समय में किश्तों में चुकाना होता है। उधार ली गई राशि पर ब्याज भी देना पड़ता है। कर्ज तब उपयोगी है जब वह आपकी आय बढ़ाने में मदद करे — जैसे सिलाई मशीन खरीदना — और रोज़मर्रा के खर्च के लिए लेने पर खतरनाक हो सकता है।",
    },
    example: {
      en: "Sunita borrows ₹20,000 from her SHG to buy a sewing machine. She repays ₹2,000 every month for 11 months. The machine earns her ₹3,000 a month, so the loan pays for itself.",
      te: "సునీత తన SHG నుంచి ₹20,000ను తీసుకొని దర్జీ మెషీన్ కొంటుంది. ఆమె నెలకు ₹2,000ను 11 నెలల పాటు చెల్లిస్తుంది. మెషీన్ ఆమెకు నెలకు ₹3,000 సంపాదిస్తుంది, కాబట్టి రుణం తనకు తానే చెల్లించుకుంటుంది.",
      hi: "सुनीता अपनी SHG से ₹20,000 उधार लेती है और सिलाई मशीन खरीदती है। वह हर महीने ₹2,000 11 महीने तक चुकाती है। यह मशीन उसे हर महीने ₹3,000 कमाती है, इसलिए लोन अपने आप चुका हो जाता है।",
    },
    whyItMatters: {
      en: "The wrong loan can take more from your family than it gives. Knowing the rate, the instalment and the total repayment before signing protects you.",
      te: "చెడ్డ రుణం మీ కుటుంబం నుంచి ఎక్కువ తీసుకెళ్లవచ్చు. సంతకం చేయడం ముందు వడ్డీ రేటు, కేటాయింపు మరియు మొత్తం తిరిగి చెల్లింపు తెలుసుకోవడం మీకు రక్షణ ఇస్తుంది.",
      hi: "गलत लोन आपके परिवार से ज्यादा ले सकता है, जितना वह देता है। साइन करने से पहले दर, किश्त और कुल चुकौती को समझ लेना आपकी रक्षा करता है।",
    },
    remember: {
      en: [
        "Ask three questions: how much per month, for how many months, total repayment?",
        "Bank and SHG loans usually cost far less than a private moneylender.",
        "Never sign a paper you have not had read aloud to you.",
      ],
      te: [
        "మూడు ప్రశ్నలు అడగండి: నెలకు ఎంత, ఎన్ని నెలలు, మొత్తం చెల్లింపు ఎంత?",
        "బ్యాంకు మరియు SHG రుణాలు సాధారణంగా ప్రైవేట్ అప్పు ఇచ్చేవారి కంటే తక్కువ ఖర్చు చేస్తాయి.",
        "మీకు గట్టిగా చదివి వినిపించని కాగితంపై సంతకం చేయకండి.",
      ],
      hi: [
        "तीन सवाल पूछें: हर महीने कितना, कितने महीने, कुल चुकौती कितनी?",
        "बैंक और SHG लोन आमतौर पर निजी सूदखोर से कम महंगे होते हैं।",
        "ऐसा कागज़ कभी न हस्ताक्षर करें जिसे आपसे जोर से पढ़कर न सुनाया गया हो।",
      ],
    },
  },
  {
    id: "insurance",
    title: {
      en: "What is Insurance?",
      te: "బీమా అంటే ఏమిటి?",
      hi: "बीमा क्या है?",
    },
    summary: {
      en: "A small regular payment that protects you from a big loss.",
      te: "చిన్న, స్థిర చెల్లింపుతో పెద్ద నష్టం నుంచి రక్షించేది.",
      hi: "छोटा नियमित भुगतान जो बड़े नुकसान से बचाता है।",
    },
    category: "protection",
    icon: "Umbrella",
    explanation: {
      en: "With insurance, you pay a small amount regularly, called a premium. If something bad happens - an accident, illness, or the death of an earning member - the insurance company pays a large amount to you or your family.",
      te: "బీమాలో మీరు సాధారణంగా ప్రీమియం అని పిలువబడే చిన్న మొత్తాన్ని చెల్లిస్తారు. ఏదైనా చెడు సంఘటన జరిగినప్పుడు - ప్రమాదం, అనారోగ్యం లేదా ఆదాయాన్ని సంపాదిస్తున్న సభ్యుడి మరణం - బీమా కంపెనీ పెద్ద మొత్తాన్ని మీకు లేదా మీ కుటుంబానికి చెల్లిస్తుంది.",
      hi: "बीमे में आप नियमित रूप से छोटी राशि देते हैं, जिसे प्रीमियम कहते हैं। अगर कोई बुरा घटना होती है — दुर्घटना, बीमारी, या कमाने वाले सदस्य की मृत्यु — तो बीमा कंपनी आपको या आपके परिवार को बड़ी राशि देता है।",
    },
    example: {
      en: "Under PMJJBY, a premium of around ₹436 a year gives the family ₹2 lakh if the insured person dies. Under PMSBY, about ₹20 a year covers accidental death and disability.",
      te: "PMJJBY కింద, సంవత్సరానికి సుమారు ₹436 ప్రీమియం చెల్లిస్తే, బీమా తీసుకున్న వ్యక్తి మరణించినప్పుడు కుటుంబానికి ₹2 లక్షలు అందుతాయి. PMSBY కింద, సంవత్సరానికి సుమారు ₹20తో ప్రమాద మరణం మరియు అంగవైకల్యానికి రక్షణ లభిస్తుంది.",
      hi: "PMJJBY के तहत, सालाना लगभग ₹436 प्रीमियम देने पर बीमा किए गए व्यक्ति की मृत्यु होने पर परिवार को ₹2 लाख मिलते हैं। PMSBY के तहत, सालाना लगभग ₹20 से दुर्घटना में मृत्यु और विकलांगता की सुरक्षा मिलती है।",
    },
    whyItMatters: {
      en: "Insurance does not prevent trouble. It prevents trouble from destroying your savings and pushing your family into debt.",
      te: "బీమా సమస్యను అడ్డుకోదు. కానీ అది మీ పొదుపును నాశనం చేసి, మీ కుటుంబాన్ని రుణంలోకి నెట్టకుండా నిరోధిస్తుంది.",
      hi: "बीमा समस्या को नहीं रोकता है, लेकिन यह समस्या को आपके बचत को नष्ट करने और परिवार को कर्ज में धकेलने से बचाता है।",
    },
    remember: {
      en: [
        "Insurance is protection, not an investment - do not expect returns.",
        "Tell your family which policies exist and where the papers are kept.",
        "Government schemes are available through your bank account.",
      ],
      te: [
        "బీమా రక్షణ మాత్రమే, పెట్టుబడి కాదు — రిటర్న్స్ ఆశించకండి.",
        "మీ కుటుంబానికి ఏ పాలసీలు ఉన్నాయి మరియు పత్రాలు ఎక్కడ ఉంచబడ్డాయి అని చెప్పండి.",
        "ప్రభుత్వ పథకాలు మీ బ్యాంక్ ఖాతా ద్వారా అందుబాటులో ఉంటాయి.",
      ],
      hi: [
        "बीमा सुरक्षा है, निवेश नहीं — रिटर्न की उम्मीद न करें।",
        "अपने परिवार को बताएं कौन-कौन से पॉलिसियाँ हैं और पेपर्स कहाँ रखे गए हैं।",
        "सरकारी योजनाएँ आपके बैंक खाते के माध्यम से उपलब्ध हैं।",
      ],
    },
  },
  {
    id: "fixed-deposit",
    title: {
      en: "What is a Fixed Deposit?",
      te: "ఫిక్స్డ్ డిపాజిట్ అంటే ఏమిటి?",
      hi: "फिक्स्ड डिपॉज़िट क्या है?",
    },
    summary: {
      en: "Money locked in a bank for a fixed time at a fixed interest rate.",
      te: "నిర్ధిష్ట సమయంలో, నిర్ధిష్ట వడ్డీ రేటుతో బ్యాంకులో బంధించబడిన డబ్బు.",
      hi: "एक निश्चित समय के लिए बैंक में रखा गया पैसा, जिस पर निश्चित ब्याज मिलता है।",
    },
    category: "saving",
    icon: "Lock",
    explanation: {
      en: "In a fixed deposit, you give the bank an amount for a chosen period - six months, one year, five years. The bank pays a higher interest rate than a savings account because you agree not to withdraw it. You can still break it early, but you earn a little less.",
      te: "ఫిక్స్డ్ డిపాజిట్‌లో మీరు బ్యాంకులో నిర్దిష్ట కాలం కోసం మొత్తం ఉంచుతారు — ఆరు నెలలు, ఒక సంవత్సరం, ఐదు సంవత్సరాలు. ఆ కాలం పూర్తయ్యే వరకు డబ్బు తీసుకోకూడదని అంగీకరిస్తారు కాబట్టి బ్యాంకు సేవింగ్స్ అకౌంట్ కంటే ఎక్కువ వడ్డీ ఇస్తుంది. మీరు ముందుగానే డబ్బు తీసుకోవచ్చు, కానీ కొంచెం తక్కువ వడ్డీ వస్తుంది.",
      hi: "फिक्स्ड डिपॉज़िट में आप बैंक को एक तय समय के लिए पैसा देते हैं — छह महीने, एक साल, पाँच साल। बैंक आपको सेविंग्स अकाउंट से ज़्यादा ब्याज देता है क्योंकि आप इसे निकालने से मना करते हैं। आप इसे जल्दी तोड़ भी सकते हैं, लेकिन थोड़ा कम ब्याज मिलेगा।",
    },
    example: {
      en: "Put ₹10,000 in a one-year fixed deposit at about 7%. At the end of the year you get back roughly ₹10,700.",
      te: "₹10,000ను ఒక సంవత్సరానికి 7% దగ్గరున్న ఫిక్స్డ్ డిపాజిట్‌లో ఉంచండి. ఏడాది ముగిసిన తర్వాత మీరు సుమారుగా ₹10,700ను తిరిగి పొందుతారు.",
      hi: "₹10,000 को एक साल के फिक्स्ड डिपॉज़िट में लगभग 7% पर रखें। साल के अंत में आपको लगभग ₹10,700 वापस मिलेंगे।",
    },
    whyItMatters: {
      en: "Money that is slightly harder to reach is money you are less likely to spend. It is one of the simplest ways to make savings grow safely.",
      te: "కొద్దిగా తీసుకోవడం కష్టంగా ఉన్న డబ్బు, దానిని ఖర్చు చేయడానికి తక్కువ అవకాశం ఉంది. ఇది పొదుపును సురక్షితంగా పెంచే సరళమైన మార్గాలలో ఒకటి.",
      hi: "जो पैसा थोड़ा कठिन से मिल पाता है, उसे खर्च करने की संभावना कम होती है। यह बचत को सुरक्षित रूप से बढ़ाने का एक सरल तरीका है।",
    },
    remember: {
      en: [
        "A recurring deposit works the same way but with a small amount each month.",
        "Bank deposits are insured up to ₹5 lakh per bank.",
        "Do not put your emergency fund in a long deposit.",
      ],
      te: [
        "రిపీట్ డిపాజిట్ అదే విధంగా పనిచేస్తుంది, కానీ ప్రతి నెల చిన్న మొత్తం చెల్లిస్తుంది.",
        "బ్యాంక్ డిపాజిట్లు ఒక్కో బ్యాంకుకు ₹5లక్ష వరకు బీమా కవర్ చేస్తాయి.",
        "మీ అత్యవసర నిధిని దీర్ఘకాలిక డిపాజిట్‌లో ఉంచకండి.",
      ],
      hi: [
        "रिकॉरिंग डिपॉज़िट भी इसी तरह काम करता है, लेकिन हर महीने छोटी राशि देकर।",
        "बैंक डिपॉज़िट एक बैंक के लिए ₹5 लाख तक बीमाकृत होते हैं।",
        "अपना आपातकालीन फंड लंबे समय के डिपॉज़िट में न रखें।",
      ],
    },
  },
  {
    id: "mutual-fund",
    title: {
      en: "What is a Mutual Fund?",
      te: "మ్యూచువల్ ఫండ్ అంటే ఏమిటి?",
      hi: "म्यूचुअल फंड क्या है?",
    },
    summary: {
      en: "Many people's money invested together by a trained manager.",
      te: "శిక్షణ పొందిన నిర్వాహకుడు నిర్వహించే అనేక మంది వ్యక్తుల డబ్బుతో చేసే పెట్టుబడి.",
      hi: "कई लोगों का पैसा एक प्रशिक्षित मैनेजर द्वारा साथ निवेश किया जाता है।",
    },
    category: "investing",
    icon: "TrendingUp",
    explanation: {
      en: "A mutual fund collects small amounts from many people and invests the total in company shares or government bonds. A professional manages it. The value can go up or down, so it suits money you will not need for several years.",
      te: "మ్యూచువల్ ఫండ్ అనేక మంది నుంచి చిన్న మొత్తాలు సేకరించి, ఆ మొత్తాన్ని కంపెనీ షేర్లు లేదా ప్రభుత్వ బాండ్లలో పెట్టుబడి చేస్తుంది. దీన్ని ఒక వృత్తిపరమైన నిర్వాహకుడు నిర్వహిస్తాడు. విలువ పెరగవచ్చు లేదా తగ్గవచ్చు, కాబట్టి ఇది అనేక సంవత్సరాలు అవసరం లేని డబ్బుకు సరిపోతుంది.",
      hi: "म्यूचुअल फंड कई लोगों से छोटी-छोटी रकम इकट्ठी करता है और उसे कंपनी के शेयरों या सरकारी बॉन्ड में निवेश करता है। इसे एक प्रोफेशनल मैनेजर संभालता है। इसका मूल्य ऊपर-नीचे हो सकता है, इसलिए यह उन पैसों के लिए सही है जिनकी आपको कई वर्षों तक ज़रूरत नहीं होगी।",
    },
    example: {
      en: "Ten women each invest ₹500 a month. The fund invests the ₹5,000 together. Over years the value may grow more than a bank deposit - but in a bad year it may also fall.",
      te: "పది మహిళలు ప్రతి నెల ₹500 ఇన్వెస్ట్ చేస్తారు. ఫండ్ మొత్తం ₹5,000ను కలిసి పెడుతుంది. సంవత్సరాలు గడిచిన తర్వాత విలువ బ్యాంక్ డిపాజిట్ కంటే ఎక్కువ పెరగవచ్చు - కానీ చెడు సంవత్సరంలో తగ్గవచ్చు.",
      hi: "दस महिलाएँ हर महीने ₹500 निवेश करती हैं। फंड उस ₹5,000 को एक साथ लगाता है। वर्षों में इसका मूल्य बैंक डिपॉज़िट से ज्यादा बढ़ सकता है — लेकिन खराब साल में यह गिर भी सकता है।",
    },
    whyItMatters: {
      en: "Over long periods, investments have generally grown faster than inflation. But the value is not guaranteed, so this is for long-term money only.",
      te: "దీర్ఘకాలంలో పెట్టుబడులు సాధారణంగా ద్రవ్యోల్బణం కంటే వేగంగా పెరుగుతాయి. కానీ విలువకు హామీ ఉండదు, కాబట్టి చాలా సంవత్సరాలు అవసరం లేని డబ్బుతో మాత్రమే పెట్టుబడి చేయాలి.",
      hi: "लंबे समय में निवेश आमतौर पर महँगाई से तेज़ी से बढ़ते हैं। लेकिन इसकी कीमत की गारंटी नहीं होती, इसलिए इसमें केवल लंबे समय के लिए रखा पैसा लगाएँ।",
    },
    remember: {
      en: [
        "Returns are never guaranteed. Anyone promising fixed high returns is not being honest.",
        "Start only after your emergency fund exists.",
        "Invest only through SEBI-registered platforms or your bank.",
      ],
      te: [
        "రాబడి ఎప్పుడూ హామీ ఇవ్వబడదు. స్థిరంగా ఎక్కువ రాబడి ఇస్తామని చెప్పే వారు నిజమైనవారు కాదు.",
        "మీ అత్యవసర నిధి ఏర్పడిన తర్వాత మాత్రమే ప్రారంభించండి.",
        "SEBI-రిజిస్టర్డ్ ప్లాట్ఫారమ్స్ లేదా మీ బ్యాంక్ ద్వారా మాత్రమే పెట్టుబడి చేయండి.",
      ],
      hi: [
        "रिटर्न की कभी गारंटी नहीं होती। जो लोग पक्के और बहुत अधिक रिटर्न का वादा करते हैं, वे सच नहीं बोल रहे होते।",
        "अपना आपातकालीन फंड बन जाने के बाद ही शुरू करें।",
        "केवल SEBI-रजिस्टर प्लेटफ़ॉर्म या अपने बैंक के माध्यम से निवेश करें।",
      ],
    },
  },
  {
    id: "inflation",
    title: {
      en: "What is Inflation?",
      te: "ద్రవ్యోల్బణం అంటే ఏమిటి?",
      hi: "मुद्रास्फीति क्या है?",
    },
    summary: {
      en: "The same money buys less than it did before.",
      te: "అదే డబ్బు మునుపు కంటే తక్కువ వస్తువులను కొనుగోలు చేస్తుంది.",
      hi: "एक ही पैसा पहले की तुलना में कम चीज़ें खरीदता है।",
    },
    category: "basics",
    icon: "Flame",
    explanation: {
      en: "Inflation means prices rise over time. A kilo of rice that cost ₹40 five years ago may cost ₹55 today. Your money has not changed, but what it can buy has shrunk.",
      te: "ద్రవ్యోల్బణం అంటే ధరలు కాలక్రమేణా పెరగడం. ఐదు సంవత్సరాల క్రితం ₹40 వెలిసిన ఒక కిలో బియ్యం ఇప్పుడు ₹55 కావచ్చు. మీ డబ్బు మారలేదు, కానీ మీరు కొనగల వస్తువుల విలువ తగ్గింది.",
      hi: "मुद्रास्फीति का मतलब है कि कीमतें समय के साथ बढ़ती हैं। पाँच साल पहले ₹40 में मिलने वाली एक किलो चावल आज ₹55 की हो सकती है। आपका पैसा बदला नहीं है, लेकिन वह चीज़ें कम मिलती हैं जो वह खरीद सकता था।",
    },
    example: {
      en: "₹10,000 kept in a box at home for ten years is still ₹10,000 - but it may buy only half as much rice, oil and vegetables as it does today.",
      te: "ఇంట్లో 10 సంవత్సరాలు పెట్టిన ₹10,000 ఇప్పుడు కూడా ₹10,000 మాత్రమే — కానీ అది ఇప్పుడు కంటే అరకొంత బియ్యం, నూనె మరియు కూరగాయలు మాత్రమే కొనుగోలు చేయగలదు.",
      hi: "घर में 10 साल तक रखे ₹10,000 अभी भी ₹10,000 हैं — लेकिन आज की तुलना में यह आधा चावल, तेल और सब्ज़ियाँ ही खरीद सकता है।",
    },
    whyItMatters: {
      en: "Money kept idle quietly loses value. This is why savings should at least earn some interest.",
      te: "ఉపయోగించకుండా ఉంచిన డబ్బు నెమ్మదిగా విలువను కోల్పోతుంది. అందుకే పొదుపుపై కనీసం కొంత వడ్డీ రావాలి.",
      hi: "जिस पैसे को निष्क्रिय रखा जाता है, वह धीरे-धीरे कीमत खो देता है। इसलिए बचत को कम से कम कुछ ब्याज मिलना चाहिए।",
    },
    remember: {
      en: [
        "Cash at home loses value every year.",
        "Compare interest earned against rising prices.",
        "This is the main reason long-term savings should not sit in a box.",
      ],
      te: [
        "ఇంట్లో ఉన్న నగదు ప్రతి సంవత్సరం విలువను కోల్పోతుంది.",
        "పెరుగుతున్న ధరలతో సంపాదించిన వడ్డీని పోల్చండి.",
        "ఇదే కారణంగా దీర్ఘకాలిక పొదుపులను పెట్టెలో ఉంచకూడదు.",
      ],
      hi: [
        "घर में रखी नकदी हर साल कीमत खो देती है।",
        "बढ़ती कीमतों के मुकाबले मिले ब्याज को तुलना करें।",
        "इसलिए दीर्घकालिक बचत को बॉक्स में नहीं रखना चाहिए।",
      ],
    },
  },
  {
    id: "diversification",
    title: {
      en: "What is Diversification?",
      te: "వివిధీకరణ అంటే ఏమిటి?",
      hi: "विविधीकरण क्या है?",
    },
    summary: {
      en: "Do not keep all your money in one place.",
      te: "మీ డబ్బును ఒక్క చోట మాత్రమే ఉంచకండి.",
      hi: "अपना सारा पैसा एक ही जगह मत रखें।",
    },
    category: "investing",
    icon: "Layers",
    explanation: {
      en: "Diversification means spreading your money across different places - some in a savings account, some in a deposit, some in gold, some in an investment. If one loses value, the others protect you.",
      te: "వివిధీకరణ అంటే మీ డబ్బును వివిధ స్థలాల్లో పంచడం — కొంత సేవింగ్స్ అకౌంట్‌లో, కొంత డిపాజిట్‌లో, కొంత బంగారం‌లో, కొంత పెట్టుబడిలో. ఒకటి విలువ తగ్గితే, మిగిలినవి మీకు రక్షణ ఇస్తాయి.",
      hi: "विविधीकरण का मतलब है अपने पैसे को अलग-अलग जगहों पर बाँटना — कुछ बचत खाते में, कुछ डिपॉज़िट में, कुछ सोने में, कुछ निवेश में। अगर एक चीज़ की कीमत कम हो जाए तो दूसरी चीज़ आपको बचा लेती है।",
    },
    example: {
      en: "Instead of putting all ₹50,000 into one chit fund, keep ₹15,000 in the bank, ₹20,000 in a fixed deposit and ₹15,000 in a long-term investment.",
      te: "ఒక చిట్ ఫండ్‌లో మొత్తం ₹50,000 పెట్టడం కంటే, ₹15,000ను బ్యాంకులో, ₹20,000ను ఫిక్స్డ్ డిపాజిట్‌లో మరియు ₹15,000ను దీర్ఘకాలిక పెట్టుబడిలో ఉంచండి.",
      hi: "सारे ₹50,000 एक ही चिट फंड में रखने के बजाय, ₹15,000 बैंक में, ₹20,000 फिक्स्ड डिपॉज़िट में और ₹15,000 लंबे समय के निवेश में रखें।",
    },
    whyItMatters: {
      en: "Every family has heard of someone who lost everything in one scheme. Spreading money is the simplest protection there is.",
      te: "ప్రతీ కుటుంబం ఒక పథకంలో అన్నీ కోల్పోయిన వ్యక్తిని చూసింది. డబ్బును పంచుకోవడం అత్యంత సరళమైన రక్షణ.",
      hi: "हर परिवार ने किसी ऐसे व्यक्ति को देखा है जिसने एक ही योजना में सब कुछ खो दिया। पैसा बाँटना सबसे सरल सुरक्षा है।",
    },
    remember: {
      en: [
        "Never put all savings into one scheme, however trusted the person is.",
        "Keep some money easy to reach at all times.",
        "If a scheme promises to double money quickly, walk away.",
      ],
      te: [
        "సారూప్య వ్యక్తికి ఎంత నమ్మకం ఉన్నా మీ మొత్తం పొదుపును ఒక పథకంలో ఉంచకండి.",
        "కొంత డబ్బును ఎల్లప్పుడూ తక్షణంగా తీసుకువెళ్ళగలిగేలా ఉంచండి.",
        "ఒక పథకం త్వరగా డబ్బును రెట్టింపు చేస్తుందని వాగ్దానం చేస్తే, వెనక్కి వెళ్లండి.",
      ],
      hi: [
        "किसी भी व्यक्ति पर भरोसा क्यों न हो, सारी बचत एक ही योजना में मत रखें।",
        "कुछ पैसा हमेशा जल्दी निकालने योग्य रूप में रखें।",
        "अगर कोई योजना जल्दी पैसा दोगुना करने का वादा करे, तो उससे दूर रहें।",
      ],
    },
  },
  {
    id: "digital-banking-safety",
    title: {
      en: "How to Stay Safe with Digital Payments?",
      te: "డిజిటల్ చెల్లింపులతో ఎలా సురక్షితంగా ఉండాలి?",
      hi: "डिजिटल भुगतान में सुरक्षित कैसे रहें?",
    },
    summary: {
      en: "Simple habits to protect your money when using UPI and digital banking.",
      te: "UPI మరియు డిజిటల్ బ్యాంకింగ్ ఉపయోగిస్తున్నప్పుడు మీ డబ్బును రక్షించగల సులభ అలవాట్లు.",
      hi: "UPI और डिजिटल बैंकिंग का उपयोग करते समय अपने पैसे को सुरक्षित रखने के लिए सरल आदतें।",
    },
    category: "protection",
    icon: "Smartphone",
    explanation: {
      en: "Digital payments are convenient, but you should always check who you are paying before approving a payment. Your UPI PIN is used to send money, not to receive it. Never share your UPI PIN, ATM PIN, password or OTP with anyone.",
      te: "డిజిటల్ చెల్లింపులు సౌకర్యవంతంగా ఉన్నాయి, కానీ చెల్లింపు అనుమతించే ముందు ఎవరికి మీ డబ్బు పంపుతున్నారో ఎల్లప్పుడూ పరిశీలించండి. మీ UPI PIN డబ్బును పంపడానికి మాత్రమే ఉపయోగించబడుతుంది, అందుకోవడానికి కాదు. మీ UPI PIN, ATM PIN, పాస్వర్డ్ లేదా OTP ఏ ఒక్కరికీ ఇవ్వకండి.",
      hi: "डिजिटल भुगतान सुविधाजनक हैं, लेकिन भुगतान की पुष्टि करने से पहले हमेशा यह चेक करें कि आप किसे पैसे दे रहे हैं। आपका UPI PIN पैसे भेजने के लिए होता है, पाने के लिए नहीं। अपने UPI PIN, ATM PIN, पासवर्ड या OTP किसी के साथ भी शेयर न करें।",
    },
    example: {
      en: "Meena receives a message saying she has won ₹5,000 and must scan a QR code to receive the money. She does not scan it because scanning a payment QR code and entering a UPI PIN can send money from her account.",
      te: "మీనాకు ఒక సందేశం వస్తుంది: ఆమెకు ₹5,000 వచ్చింది, ఆ డబ్బును అందుకోవడానికి QR కోడ్ స్కాన్ చేయాల్సి ఉందని. ఆమె దాన్ని స్కాన్ చేయదు, ఎందుకంటే చెల్లింపు QR కోడ్ స్కాన్ చేసి UPI PINను నమోదు చేయడం ఆమె ఖాతా నుండి డబ్బును పంపివేయగలదు.",
      hi: "मीना को एक संदेश मिलता है कि उसे ₹5,000 मिल गए हैं और पैसे लेने के लिए QR कोड स्कैन करना होगा। वह ऐसा नहीं करती क्योंकि भुगतान QR कोड स्कैन करके UPI PIN डालने से उसके खाते से पैसा निकल सकता है।",
    },
    whyItMatters: {
      en: "A payment made using your PIN can be difficult to reverse. Taking a few seconds to check the name, amount and payment request can protect your savings.",
      te: "మీ PINతో చేసిన చెల్లింపు తిరిగి మార్చడం కష్టం కావచ్చు. పేరు, మొత్తం మరియు చెల్లింపు అభ్యర్థనను పరిశీలించడానికి కొన్ని సెకన్లు మాత్రమే కేటాయించడం మీ పొదుపును కాపాడుతుంది.",
      hi: "आपके PIN से किया गया भुगतान वापस लेना मुश्किल हो सकता है। नाम, राशि और भुगतान अनुरोध की जाँच करने में कुछ ही सेकंड लगते हैं, लेकिन ये आपके पैसे की सुरक्षा कर सकते हैं।",
    },
    remember: {
      en: [
        "Never share your UPI PIN, ATM PIN, password or OTP.",
        "A UPI PIN is used to send money, not to receive money.",
        "Check the recipient name and amount before approving a payment.",
        "Do not trust unknown links, QR codes or phone numbers claiming to be customer support.",
      ],
      te: [
        "మీ UPI PIN, ATM PIN, పాస్వర్డ్ లేదా OTP ఎప్పుడూ పంచుకోకండి.",
        "UPI PIN డబ్బు పంపడానికి మాత్రమే ఉపయోగిస్తారు, అందుకోవడానికి కాదు.",
        "చెల్లింపును ఆమోదించే ముందు గ్రహీత పేరును మరియు మొత్తాన్ని పరిశీలించండి.",
        "అజ్ఞాత లింక్లు, QR కోడ్లు లేదా కస్టమర్ సపోర్ట్‌గా చెప్పే ఫోన్ నంబర్లను విశ్వసించకండి.",
      ],
      hi: [
        "अपने UPI PIN, ATM PIN, पासवर्ड या OTP कभी साझा न करें।",
        "UPI PIN पैसे भेजने के लिए है, पैसे लेने के लिए नहीं।",
        "भुगतान स्वीकार करने से पहले प्राप्तकर्ता का नाम और राशि चेक करें।",
        "अज्ञात लिंक, QR कोड या फोन नंबर पर भरोसा न करें जो कस्टमर सपोर्ट बताकर आएं।",
      ],
    },
  },
];

export function getLesson(id: string): FinancialLesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
