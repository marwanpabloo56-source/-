export interface TranslationSet {
  // Brand & Top bar
  appName: string;
  appTagline: string;
  playNow: string;
  howToPlayNav: string;
  galleryNav: string;
  customCardsNav: string;
  newGameNav: string;

  // Hero Section
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaRules: string;
  quickStatPlayers: string;
  quickStatAge: string;
  quickStatTime: string;

  // How to play
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // Why families love it
  whyLoveTitle: string;
  whyLove1Title: string;
  whyLove1Desc: string;
  whyLove2Title: string;
  whyLove2Desc: string;
  whyLove3Title: string;
  whyLove3Desc: string;
  whyLove4Title: string;
  whyLove4Desc: string;

  // Testimonials / Quotes
  quoteTitle: string;
  quote1: string;
  quote1Author: string;
  quote2: string;
  quote2Author: string;

  // Lobby
  lobbyTitle: string;
  lobbySubtitle: string;
  playersCount: string;
  addPlayer: string;
  playerPlaceholder: string;
  minPlayersNotice: string;
  difficultyTitle: string;
  diffEasy: string;
  diffEasyDesc: string;
  diffNormal: string;
  diffNormalDesc: string;
  diffCrazy: string;
  diffCrazyDesc: string;
  roundsTitle: string;
  roundsCount: string;
  inventTimeTitle: string;
  startGameBtn: string;

  // Card Deal & Round Intro
  roundNum: string;
  dealHeading: string;
  dealInstruction: string;
  problemCardLabel: string;
  ingredientCardLabel: string;
  startInventingBtn: string;

  // Inventing Phase
  inventingHeading: string;
  secondsLeft: string;
  inventionNameLabel: string;
  inventionNamePlaceholder: string;
  sloganLabel: string;
  sloganPlaceholder: string;
  priceLabel: string;
  pricePlaceholder: string;
  featuresLabel: string;
  featuresPlaceholder: string;
  submitInvention: string;
  playerInventing: string;
  nextPlayerTurn: string;
  allDoneReadyToPitch: string;
  quickPitchTipsTitle: string;

  // Pitch Phase
  pitchHeading: string;
  pitchSubtitle: string;
  currentPitcher: string;
  pitchTimerLabel: string;
  startPitchTimer: string;
  pausePitchTimer: string;
  resetPitchTimer: string;
  soundboardTitle: string;
  applauseBtn: string;
  kachingBtn: string;
  bellBtn: string;
  boingBtn: string;
  nextPitcherBtn: string;
  goToVotingBtn: string;

  // Voting Phase
  votingHeading: string;
  votingSubtitle: string;
  voterPrompt: string;
  cantVoteSelfNotice: string;
  castVoteBtn: string;
  votesTallied: string;
  revealWinnerBtn: string;

  // Round Winner Reveal
  roundWinnerHeading: string;
  roundWinnerSubtitle: string;
  votesCountText: string;
  nextRoundBtn: string;
  seeFinalResultsBtn: string;
  saveToGalleryBtn: string;
  alreadySavedText: string;

  // Game Over
  gameOverHeading: string;
  championTitle: string;
  leaderboardTitle: string;
  hallOfFameTitle: string;
  playAgainSamePlayers: string;
  startFreshGame: string;

  // Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  emptyGalleryText: string;
  emptyGallerySub: string;
  deleteInvention: string;
  clearAllGallery: string;

  // Custom Cards
  customCardsTitle: string;
  customCardsSubtitle: string;
  addProblemBtn: string;
  addIngredientBtn: string;
  customCardTextLabel: string;
  customCardPlaceholder: string;
  categoryLabel: string;
  saveCardBtn: string;
  cancelBtn: string;
  existingCustomCards: string;
  noCustomCardsYet: string;
  deleteCard: string;

  // Rules Modal
  rulesModalTitle: string;
  rulesSalesSecretTitle: string;
}

export const TRANSLATIONS: Record<'ar' | 'en', TranslationSet> = {
  ar: {
    appName: 'اخترعها!',
    appTagline: 'لعبة بيع الهوا في إزايز لأشطر وأخف عيلة دم!',
    playNow: 'يلا نلعب!',
    howToPlayNav: 'إزاي نلعب؟',
    galleryNav: 'معرض الافتكاسات',
    customCardsNav: 'كروت العيلة',
    newGameNav: 'لعبة جديدة',

    // Hero
    heroTitle1: 'اخترع أي فنكوش..',
    heroTitleHighlight: 'وبيعه للعيلة وكأنك بياع تلفزيون!',
    heroSubtitle: 'كارت مشكلة تقطم الضهر + مكونين أعجب من بعض = افتكاسة مفيش منها اتنين! عندك 60 ثانية تخترع المنتج، تحط له سعر وشعار يرن، وتبيعه بأعلى صوت عشان تلم أصوات الحبايب!',
    heroCtaPrimary: 'ابدأ اللمة واللعب حالاً',
    heroCtaRules: 'كتالوج القواعد والأسرار',
    quickStatPlayers: '3 إلى 8 لاعبين',
    quickStatAge: 'من سن 8 سنين لفوق',
    quickStatTime: '15-20 دقيقة ضحك متواصل',

    // How to play
    howItWorksTitle: 'إزاي بنلعب في 3 خطوات بسيطة؟',
    howItWorksSubtitle: 'مفيش تعقيد ولا وجع دماغ.. افتح اللعبة على الموبايل أو شاشة التلفزيون وعيش الجو!',
    step1Title: '1. اسحب كارت الورطة والمكونات',
    step1Desc: 'كل جولة بيطلع كارت مشكلة مستفزة (زي ضياع فردة الشراب) ومعاها مكونين عشوائيين ملهمش علاقة ببعض (زي موزة مستوية وصاروخ فضائي)!',
    step2Title: '2. دقيقة واحدة لافتكاس المنتج',
    step2Desc: 'العداد 60 ثانية شغال.. فكر في اسم عبقري، شعار يكسر الدنيا، وسعر يخطف الجيب. جهز كلامك المقنع!',
    step3Title: '3. بيع وجمع الأصوات يا فالح',
    step3Desc: 'ادخل استوديو التسوق، احلف واشرح مميزات اختراعك زي بياعين قنوات الإعلانات. بعدين الكل يصوّت لصاحب أحسن افتكاسة!',

    // Why love it
    whyLoveTitle: 'ليه كل قعدة عيلة محتاجة لعبة "اخترعها!"؟',
    whyLove1Title: 'ضحك عائلي نقي من القلب',
    whyLove1Desc: 'محتوى مصري فرفوش ومحترم، خالي تماماً من أي إسفاف، مناسب للأطفال والأجداد وكل العمارة.',
    whyLove2Title: 'تطلق خيال الأطفال والكبار',
    whyLove2Desc: 'بتخلي أصغر طفل يتشجع ويتكلم ويقنعك تشتري منه شبشب بالبلوتوث بـ 5000 جنيه!',
    whyLove3Title: 'شاشة واحدة لجمعة الكل',
    whyLove3Desc: 'مش محتاجين 10 أجهزة وتنزيل برامج.. موبايل واحد في إيد العيلة أو معروض على شاشة التلفزيون يكفي.',
    whyLove4Title: 'أكتر من 100 كارت ومقالب مابتخلصش',
    whyLove4Desc: 'مئات التركيبات المستحيلة، مع إمكانية إضافة مشاكل ومواقف خاصة بعيلتكم تضحكوا عليها سوا!',

    // Quotes
    quoteTitle: 'آراء ناس افتكست وباعت قبلك',
    quote1: '«أمي باعتلنا مروحة سقف بتعصر ليمون بـ 3 مليون جنيه، ومن كتر الضحك كلنا صوتنا لها!»',
    quote1Author: 'المهندس كريم وأسرته · المعادي',
    quote2: '«الولاد سابوا التابلت وقعدوا 3 ساعات يخترعوا حلول لخبطة صباع الرجل في الكومودينو!»',
    quote2Author: 'مدام نشوى · الإسكندرية',

    // Lobby
    lobbyTitle: 'ظبط القعدة واللاعبين',
    lobbySubtitle: 'اختاروا شخصياتكم، حددوا مستوى الجنان، ويلا نسخن!',
    playersCount: 'اللاعبين في القعدة',
    addPlayer: 'ضيف فتك جديد',
    playerPlaceholder: 'اسم اللاعب (مثلاً: حمادة، نوجا، كابتن برعي)',
    minPlayersNotice: 'محتاجين على الأقل 3 لاعبين عشان اللعبة تسخن والتصويت يظبط!',
    difficultyTitle: 'مستوى الافتكاسات',
    diffEasy: 'على قد الإيد (أطفال)',
    diffEasyDesc: 'مشاكل كيوت ومكونات بسيطة ولطيفة للأطفال',
    diffNormal: 'فزلكة عادية (عائلي)',
    diffNormalDesc: 'مواقف ومشاكل يومية مصرية مضحكة لكل الأعمار',
    diffCrazy: 'جنان رسمي ومستعجل',
    diffCrazyDesc: 'مشاكل كوارث ومكونات سريالية هتخليكم تعيطوا من الضحك',
    roundsTitle: 'عدد الجولات',
    roundsCount: 'جولات',
    inventTimeTitle: 'وقت الافتكاس لكل لاعب',
    startGameBtn: 'يا فتاح يا عليم.. ابدأ اللعب!',

    // Round deal
    roundNum: 'الجولة',
    dealHeading: 'كروت الجولة نزلت يا رجالة!',
    dealInstruction: 'اقروا الورطة والمكونات كويس.. دي الخامات اللي هتعملوا بيها المستحيل!',
    problemCardLabel: 'كارت الورطة والمشكلة',
    ingredientCardLabel: 'المكون الإجباري',
    startInventingBtn: 'جاهزين؟ شغل عداد الـ 60 ثانية!',

    // Inventing
    inventingHeading: 'الورشة شغالة.. اخترع الفنكوش!',
    secondsLeft: 'ثانية متبقية',
    inventionNameLabel: 'اسم الاختراع العبقري',
    inventionNamePlaceholder: 'مثلاً: شبشب الصاروخ المضاد للكسل',
    sloganLabel: 'شعار بيعي يكسر الدنيا',
    sloganPlaceholder: 'مثلاً: مع شبشب الصاروخ.. مش هتقوم من الكنبة تاني!',
    priceLabel: 'السعر بالجنيه (أو الفكة)',
    pricePlaceholder: 'مثلاً: 199 جنيه و3 أكياس شيبسي',
    featuresLabel: 'الميزة الخارقة وطريقة الاستعمال',
    featuresPlaceholder: 'اشرح في سطرين إزاي المكونين دول بيحلوا الورطة.. بهّر العيلة!',
    submitInvention: 'تمام.. سجل افتكاستي!',
    playerInventing: 'دور المخترع:',
    nextPlayerTurn: 'سلمه للمخترع اللي بعده:',
    allDoneReadyToPitch: 'كده الكل اخترع وسجل! جاهزين للاستوديو والبيع؟',
    quickPitchTipsTitle: 'نصيحة بياع التلفزيون:',

    // Pitch
    pitchHeading: 'استوديو بياع التلفزيون',
    pitchSubtitle: 'كل مخترع معاه المايك.. اقنع العيلة واكسب أصواتهم!',
    currentPitcher: 'على الهواء مباشرة المخترع:',
    pitchTimerLabel: 'وقت البيع والشرح',
    startPitchTimer: 'ابدأ الكلام',
    pausePitchTimer: 'وقف مؤقتاً',
    resetPitchTimer: 'إعادة ضبط',
    soundboardTitle: 'لوحة المؤثرات الصوتية للاستوديو',
    applauseBtn: 'تصفيق حار 👏',
    kachingBtn: 'كاشير فلوس 💰',
    bellBtn: 'جرس تنبيه 🔔',
    boingBtn: 'زامور الضحك 🤣',
    nextPitcherBtn: 'المخترع اللي بعده 👉',
    goToVotingBtn: 'خلصنا البيع.. نروح لصندوق الانتخابات! 🗳️',

    // Voting
    votingHeading: 'صندوق التصويت والتقييم',
    votingSubtitle: 'مين اللي أقنعكم بجد وخلاكم تموتوا من الضحك؟ صوّت للفتك الأفضل!',
    voterPrompt: 'مين اللي بيصوّت دلوقتي؟',
    cantVoteSelfNotice: 'ممنوع تصوّت لنفسك يا معلم.. الأمانة سر النجاح!',
    castVoteBtn: 'اعتمد الصوت ده!',
    votesTallied: 'الأصوات اتجمعت بالتمام والكمال!',
    revealWinnerBtn: 'اكشف الفائز بالجولة دي! 🏆',

    // Round reveal
    roundWinnerHeading: 'بطل الجولة دي هو:',
    roundWinnerSubtitle: 'أقوى افتكاسة كسبت قلوب وجيوب العيلة!',
    votesCountText: 'أصوات نالها الاختراع',
    nextRoundBtn: 'الجولة اللي بعدها 🚀',
    seeFinalResultsBtn: 'شوف النتيجة النهائية وتتويج الملك! 👑',
    saveToGalleryBtn: 'احفظ الاختراع في المعرض 💾',
    alreadySavedText: 'اتحفظ في المعرض بنجاح! ⭐',

    // Game Over
    gameOverHeading: 'انتهت المعركة.. مبروك لزعيم الافتكاسات!',
    championTitle: 'ملك الفتاكة والاختراعات بلا منازع',
    leaderboardTitle: 'ترتيب الحريفة النهائي',
    hallOfFameTitle: 'افتكاسة الليلة الحاصلة على أعلى تقييم',
    playAgainSamePlayers: 'العب تاني بنفس اللمة 🔄',
    startFreshGame: 'لعبة جديدة ولاعبين جداد 👥',

    // Gallery
    galleryTitle: 'معرض افتكاسات العيلة',
    gallerySubtitle: 'كل الاختراعات العبقرية والمضحكة اللي اتسجلت في قعداتكم!',
    emptyGalleryText: 'المعرض لسه فاضي..',
    emptyGallerySub: 'العبوا جولة واحفظوا أحلى افتكاسات عشان تلاقوها هنا دايماً!',
    deleteInvention: 'مسح',
    clearAllGallery: 'تفريغ المعرض كله',

    // Custom Cards
    customCardsTitle: 'كروت ومقالب العيلة الخاصة',
    customCardsSubtitle: 'ضيفوا مشاكل حقيقية ومكونات من بيتكم عشان تخلوا اللعب شخصي وموت من الضحك!',
    addProblemBtn: 'ضيف كارت ورطة جديدة 💥',
    addIngredientBtn: 'ضيف كارت مكون عجيب 🧪',
    customCardTextLabel: 'نص الكارت باللهجة المصرية الفرفوشة',
    customCardPlaceholder: 'مثلاً: بابا بينام قدام نشرة الأخبار ويقول: أنا سامع متقفلوش!',
    categoryLabel: 'المستوى',
    saveCardBtn: 'احفظ الكارت في المجموعة',
    cancelBtn: 'إلغاء',
    existingCustomCards: 'كروت العيلة المضافة حالياً:',
    noCustomCardsYet: 'لسه ما ضيفتوش كروت مخصصة.. ضيفوا أول كارت دلوقتي!',
    deleteCard: 'حذف',

    // Rules
    rulesModalTitle: 'كتالوج اللعبة وأسرار النجاح',
    rulesSalesSecretTitle: 'أسرار بياع التلفزيون المحترف:'
  },

  en: {
    appName: 'Invent It!',
    appTagline: 'The hilarious family pitching game where you sell wacky contraptions!',
    playNow: 'Play Now!',
    howToPlayNav: 'How to Play',
    galleryNav: 'Invention Gallery',
    customCardsNav: 'Custom Cards',
    newGameNav: 'New Game',

    // Hero
    heroTitle1: 'Invent any ridiculous gadget..',
    heroTitleHighlight: 'And pitch it to the family like a TV salesperson!',
    heroSubtitle: '1 crazy problem card + 2 bizarre ingredient cards = an unforgettable invention! You have 60 seconds to invent, name, price, and pitch your ridiculous product to win family votes!',
    heroCtaPrimary: 'Start Playing Now',
    heroCtaRules: 'Rules & Pitch Tips',
    quickStatPlayers: '3 to 8 Players',
    quickStatAge: 'Ages 8 & Up',
    quickStatTime: '15-20 Min Fun',

    // How to play
    howItWorksTitle: 'How to Play in 3 Simple Steps',
    howItWorksSubtitle: 'Zero complicated setup. Play on one phone or mirror to your big screen TV!',
    step1Title: '1. Deal the Cards',
    step1Desc: 'Each round reveals a funny everyday problem (like disappearing socks) and 2 random ingredients (like an overripe banana and a toy rocket)!',
    step2Title: '2. 60 Seconds to Invent',
    step2Desc: 'Beat the clock! Craft a ridiculous product name, a catchy slogan, an outrageous price, and describe how your gadget miraculously works.',
    step3Title: '3. Pitch Like a TV Pro & Vote',
    step3Desc: 'Take the floor and pitch with full theatrical flair. Then everyone casts their secret votes for the funniest, smartest pitch!',

    // Why love it
    whyLoveTitle: 'Why Families & Friends Love "Invent It!"',
    whyLove1Title: '100% Wholesome Family Laughs',
    whyLove1Desc: 'Witty, clean humor tailored for all generations from kids to grandparents.',
    whyLove2Title: 'Unlocks Pure Creativity',
    whyLove2Desc: 'Encourages kids and adults alike to practice quick speaking, improv, and hilarious persuasion.',
    whyLove3Title: 'Single Shared Device Mode',
    whyLove3Desc: 'No complicated app downloads or multiple accounts. One phone passed around or on TV works magic.',
    whyLove4Title: 'Over 100+ Cards & Endless Replay',
    whyLove4Desc: 'Dozens of problems and ingredients create thousands of combinations, plus custom family card support!',

    // Quotes
    quoteTitle: 'What Happy Inventors Are Saying',
    quote1: '“My mom pitched a ceiling fan that squeezes lemons for $3,000,000, and we literally cried laughing!”',
    quote1Author: 'Karim & Family · Cairo',
    quote2: '“The kids put down their tablets and spent 3 hours inventing solutions for nightstand toe-stubbing!”',
    quote2Author: 'Nashwa · Alexandria',

    // Lobby
    lobbyTitle: 'Game Lobby & Player Setup',
    lobbySubtitle: 'Pick your avatars, choose your difficulty, and let the invention battle begin!',
    playersCount: 'Players in the Room',
    addPlayer: 'Add New Inventor',
    playerPlaceholder: 'Player Name (e.g., Mom, Captain Tom, Sally)',
    minPlayersNotice: 'At least 3 players are recommended for great voting and spirited pitches!',
    difficultyTitle: 'Wackiness Level',
    diffEasy: 'Kid Friendly (Easy)',
    diffEasyDesc: 'Cute everyday problems and simple tangible ingredients',
    diffNormal: 'Family Classic (Normal)',
    diffNormalDesc: 'Relatable daily hassles and delightfully weird items',
    diffCrazy: 'Pure Lunacy (Crazy)',
    diffCrazyDesc: 'Sci-fi mishaps and surreal components for maximum laughs',
    roundsTitle: 'Number of Rounds',
    roundsCount: 'Rounds',
    inventTimeTitle: 'Inventing Timer Per Turn',
    startGameBtn: 'Let the Games Begin!',

    // Round deal
    roundNum: 'Round',
    dealHeading: 'Round Cards Dealt!',
    dealInstruction: 'Study the problem and the 2 required ingredients. Combine them into something genius!',
    problemCardLabel: 'Problem to Solve',
    ingredientCardLabel: 'Required Ingredient',
    startInventingBtn: 'Ready? Start 60s Timer!',

    // Inventing
    inventingHeading: 'The Lab is Open.. Invent It!',
    secondsLeft: 'seconds left',
    inventionNameLabel: 'Invention Product Name',
    inventionNamePlaceholder: 'e.g., Anti-Laziness Rocket Slipper',
    sloganLabel: 'Catchy Sales Slogan',
    sloganPlaceholder: 'e.g., Never get off your couch again!',
    priceLabel: 'Price (and currency)',
    pricePlaceholder: 'e.g., $19.99 + 2 bags of chips',
    featuresLabel: 'Super Features & How It Works',
    featuresPlaceholder: 'Explain in two lines how your ingredients solve the problem. Dazzle the crowd!',
    submitInvention: 'Lock In My Invention!',
    playerInventing: 'Current Inventor:',
    nextPlayerTurn: 'Pass device to:',
    allDoneReadyToPitch: 'All inventions drafted! Ready for the TV Sales Pitch?',
    quickPitchTipsTitle: 'Sales Pitch Pro Tip:',

    // Pitch
    pitchHeading: 'TV Shopping Network Live',
    pitchSubtitle: 'Each inventor takes the spotlight. Pitch your contraption and win the family votes!',
    currentPitcher: 'Live on Air — Inventor:',
    pitchTimerLabel: 'Pitch Countdown',
    startPitchTimer: 'Start Pitch',
    pausePitchTimer: 'Pause',
    resetPitchTimer: 'Reset',
    soundboardTitle: 'Studio Soundboard',
    applauseBtn: 'Applause 👏',
    kachingBtn: 'Cha-ching 💰',
    bellBtn: 'Ding Ding 🔔',
    boingBtn: 'Cartoon Boing 🤣',
    nextPitcherBtn: 'Next Pitcher 👉',
    goToVotingBtn: 'All Pitches Done.. Go to Voting! 🗳️',

    // Voting
    votingHeading: 'The Voting Booth',
    votingSubtitle: 'Who pitched the most convincing or hilarious contraption? Cast your vote!',
    voterPrompt: 'Who is voting right now?',
    cantVoteSelfNotice: 'You cannot vote for your own invention! Fair play wins the crown.',
    castVoteBtn: 'Cast This Vote!',
    votesTallied: 'All votes have been recorded!',
    revealWinnerBtn: 'Reveal the Round Champion! 🏆',

    // Round reveal
    roundWinnerHeading: 'The Round Winner is:',
    roundWinnerSubtitle: 'The invention that captured the hearts and wallets of the family!',
    votesCountText: 'votes received',
    nextRoundBtn: 'Next Round 🚀',
    seeFinalResultsBtn: 'See Grand Champion Leaderboard! 👑',
    saveToGalleryBtn: 'Save to Invention Gallery 💾',
    alreadySavedText: 'Saved to Gallery! ⭐',

    // Game Over
    gameOverHeading: 'The Tournament is Complete!',
    championTitle: 'Grand Master Inventor & Ultimate Salesperson',
    leaderboardTitle: 'Final Standings',
    hallOfFameTitle: 'Invention of the Night (Highest Voted)',
    playAgainSamePlayers: 'Rematch (Same Players) 🔄',
    startFreshGame: 'New Game (New Players) 👥',

    // Gallery
    galleryTitle: 'Family Invention Hall of Fame',
    gallerySubtitle: 'All the wacky, hilarious contraptions saved from your game nights!',
    emptyGalleryText: 'Your gallery is empty right now..',
    emptyGallerySub: 'Play a game and click "Save to Gallery" on your favorite inventions!',
    deleteInvention: 'Delete',
    clearAllGallery: 'Clear All Gallery',

    // Custom Cards
    customCardsTitle: 'Custom Family Cards',
    customCardsSubtitle: 'Add your own family inside jokes, real household problems, and funny items!',
    addProblemBtn: 'Add Custom Problem Card 💥',
    addIngredientBtn: 'Add Custom Ingredient 🧪',
    customCardTextLabel: 'Card text in your own words',
    customCardPlaceholder: 'e.g., Dad falls asleep watching news and says: "I’m listening!"',
    categoryLabel: 'Category',
    saveCardBtn: 'Save Card to Deck',
    cancelBtn: 'Cancel',
    existingCustomCards: 'Existing Custom Cards:',
    noCustomCardsYet: 'No custom cards yet. Add your first family inside joke!',
    deleteCard: 'Delete',

    // Rules
    rulesModalTitle: 'Game Rules & Pitching Secrets',
    rulesSalesSecretTitle: 'TV Salesperson Secrets:'
  }
};
