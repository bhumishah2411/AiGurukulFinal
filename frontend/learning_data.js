const GITA_CHAPTERS = [
  { num:1, sanskrit:'अर्जुन विषाद योग', roman:'Arjuna Vishada Yoga', english:'The Yoga of Arjuna\'s Grief', shloka:'धृतराष्ट्र उवाच — धर्मक्षेत्रे कुरुक्षेत्रे...', shloka_trans:'"Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra?"', lesson:'Even the greatest warrior can be paralysed by emotion. Acknowledging grief is the first step to wisdom.', modern:'Arjuna shows classic symptoms of acute stress response — racing heart, trembling limbs, mental fog. Modern psychology calls this "crisis paralysis."', tags:['Grief','Duty','Paralysis'] },
  { num:2, sanskrit:'सांख्य योग', roman:'Sankhya Yoga', english:'The Yoga of Knowledge', shloka:'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।', shloka_trans:'"The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being."', lesson:'You are not your body. Fear of death dissolves when you know the self is eternal.', modern:'Relates to the psychological concept of "self-transcendence" — detaching identity from the physical and temporal.', tags:['Soul','Immortality','Knowledge'] },
  { num:3, sanskrit:'कर्म योग', roman:'Karma Yoga', english:'The Yoga of Action', shloka:'नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः।', shloka_trans:'"Do your duty. Action is better than inaction. Even the maintenance of your body would not be possible without action."', lesson:'Do your duty without craving results. Action done selflessly purifies the soul.', modern:'Behavioural science calls this "intrinsic motivation" — working for the work itself, not the reward.', tags:['Action','Duty','Selfless Work'] },
  { num:4, sanskrit:'ज्ञान कर्म संन्यास योग', roman:'Jnana Karma Sanyasa Yoga', english:'The Yoga of Knowledge & Renunciation', shloka:'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।', shloka_trans:'"Whenever there is decay of righteousness and rise of unrighteousness, I manifest myself."', lesson:'Knowledge liberates. God descends when dharma declines. Truth is cyclical, not linear.', modern:'Jungian psychology speaks of the "archetypal hero" who appears when society is in shadow — the same idea.', tags:['Knowledge','Incarnation','Dharma'] },
  { num:5, sanskrit:'कर्म संन्यास योग', roman:'Karma Sanyasa Yoga', english:'The Yoga of Renunciation of Action', shloka:'संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ।', shloka_trans:'"Both renunciation of action and action in devotion are good for liberation. But of the two, action in devotion is better."', lesson:'True renunciation is not running away — it is acting without ego.', modern:'Stoic philosophy mirrors this: "amor fati" — love of fate, acting fully while detached from outcome.', tags:['Renunciation','Ego','Liberation'] },
  { num:6, sanskrit:'आत्मसंयम योग', roman:'Atma Sanyam Yoga', english:'The Yoga of Self-Control & Meditation', shloka:'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।', shloka_trans:'"Lift yourself by yourself. Do not degrade yourself. The self is the friend of the self, and the self is also the enemy of the self."', lesson:'You are your own best friend and your own worst enemy. Discipline is self-love.', modern:'Self-determination theory in psychology: internal locus of control predicts wellbeing more than external factors.', tags:['Meditation','Self-Control','Mind'] },
  { num:7, sanskrit:'ज्ञान विज्ञान योग', roman:'Jnana Vijnana Yoga', english:'The Yoga of Knowledge & Realisation', shloka:'मनुष्याणां सहस्रेषु कश्चिद्यतति सिद्धये।', shloka_trans:'"Among thousands of men, scarcely one strives for perfection; and of those who strive and succeed, scarcely one knows Me in truth."', lesson:'Seeking truth is rare. Knowing truth is rarer still. Both are worth everything.', modern:'The Dunning-Kruger effect inverted — the truly wise know how little they know.', tags:['Wisdom','God','Reality'] },
  { num:8, sanskrit:'अक्षर ब्रह्म योग', roman:'Aksara Brahma Yoga', english:'The Yoga of the Imperishable Absolute', shloka:'अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्।', shloka_trans:'"Whoever remembers Me at the time of death, upon leaving the body, reaches My state. Of this there is no doubt."', lesson:'What you think at your last moment reflects your entire life\'s practice. Live accordingly.', modern:'Neurologically, the brain consolidates and replays our deepest habitual patterns at death — final thoughts mirror lifelong focus.', tags:['Death','Liberation','Consciousness'] },
  { num:9, sanskrit:'राज विद्या राज गुह्य योग', roman:'Raja Vidya Raja Guhya Yoga', english:'The Yoga of Royal Knowledge', shloka:'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।', shloka_trans:'"Those who worship Me with devotion, meditating on My transcendental form — I carry what they lack and preserve what they have."', lesson:'Surrender is not weakness. Total devotion to a higher purpose carries you through what effort alone cannot.', modern:'Flow state research shows that complete absorption in something beyond ego produces peak performance and wellbeing.', tags:['Devotion','Surrender','Grace'] },
  { num:10, sanskrit:'विभूति योग', roman:'Vibhuti Yoga', english:'The Yoga of Divine Manifestation', shloka:'अहमात्मा गुडाकेश सर्वभूताशयस्थितः।', shloka_trans:'"I am the Self, O Arjuna, dwelling in the heart of all beings. I am the beginning, middle, and end of all beings."', lesson:'The divine is not outside. It is the intelligence inside every atom, every life, every thought.', modern:'Panpsychism — the modern philosophy that consciousness is a fundamental feature of reality — echoes this ancient view.', tags:['Divine','Manifestation','Self'] },
  { num:11, sanskrit:'विश्वरूप दर्शन योग', roman:'Vishwarupa Darshana Yoga', english:'The Yoga of the Vision of the Cosmic Form', shloka:'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः।', shloka_trans:'"I am Time, the great destroyer of worlds, and I have come here to destroy all people."', lesson:'Time consumes everything. Act now. Every delay is a little death.', modern:'Terror Management Theory — awareness of death, paradoxically, is the greatest motivator for meaningful action.', tags:['Cosmic Form','Time','Destruction'] },
  { num:12, sanskrit:'भक्ति योग', roman:'Bhakti Yoga', english:'The Yoga of Devotion', shloka:'मय्येव मन आधत्स्व मयि बुद्धिं निवेशय।', shloka_trans:'"Fix your mind on Me alone, let your intellect dwell in Me. You shall live in Me hereafter. There is no doubt."', lesson:'Love is the shortest path. Devotion dissolves the ego faster than logic ever could.', modern:'Oxytocin — the bonding hormone — activates the brain\'s reward system. Devotion and love literally rewire neural pathways.', tags:['Devotion','Love','Bhakti'] },
  { num:13, sanskrit:'क्षेत्र क्षेत्रज्ञ विभाग योग', roman:'Kshetra Kshetragyna Vibhaga Yoga', english:'The Yoga of the Field and Its Knower', shloka:'इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते।', shloka_trans:'"This body, O son of Kunti, is called the field (kshetra). He who knows this is called the knower of the field."', lesson:'You are not your body. The body is the field; you are the farmer. Know the difference.', modern:'This maps directly onto the neuroscience of the "observer self" — the meta-awareness that watches thoughts without being them.', tags:['Body','Soul','Self-Knowledge'] },
  { num:14, sanskrit:'गुणत्रय विभाग योग', roman:'Gunatraya Vibhaga Yoga', english:'The Yoga of the Three Qualities', shloka:'सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः।', shloka_trans:'"Sattva, Rajas, and Tamas — these three qualities born of Nature bind the immortal soul to the body."', lesson:'Every action, food, thought, and person either raises your energy (Sattva), agitates it (Rajas), or dulls it (Tamas). Choose wisely.', modern:'Behavioural energy management — modern research on mental states maps closely onto the three gunas framework.', tags:['Sattva','Rajas','Tamas','Qualities'] },
  { num:15, sanskrit:'पुरुषोत्तम योग', roman:'Purushottama Yoga', english:'The Yoga of the Supreme Person', shloka:'ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम्।', shloka_trans:'"They speak of an eternal Ashvattha tree with its roots above and branches below, whose leaves are the Vedic hymns."', lesson:'Reality is an inverted tree — the roots are above in consciousness, the branches below in the material world.', modern:'The metaphor mirrors modern systems thinking — emergent complexity arising from invisible foundational principles.', tags:['Supreme Self','Reality','Consciousness'] },
  { num:16, sanskrit:'दैवासुर सम्पद विभाग योग', roman:'Daivāsura Sampad Vibhaga Yoga', english:'The Yoga of Divine & Demonic Qualities', shloka:'अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः।', shloka_trans:'"Fearlessness, purity of heart, steadfastness in knowledge and yoga, charity, self-control, sacrifice, study of scriptures..."', lesson:'Every human contains both divine and demonic tendencies. Awareness is what lets you choose.', modern:'Jungian shadow work — acknowledging the dark side of personality is the first step to integrating and transcending it.', tags:['Dharma','Character','Good vs Evil'] },
  { num:17, sanskrit:'श्रद्धात्रय विभाग योग', roman:'Shradhatraya Vibhaga Yoga', english:'The Yoga of the Threefold Faith', shloka:'त्रिविधा भवति श्रद्धा देहिनां सा स्वभावजा।', shloka_trans:'"The faith of each person is in accordance with their nature. A person is made of faith; whatever their faith is, that they are."', lesson:'You become what you believe. Faith is not religion — it is the direction your entire life points.', modern:'The placebo effect, self-fulfilling prophecy, and confirmation bias all prove that belief literally shapes reality.', tags:['Faith','Belief','Food','Worship'] },
  { num:18, sanskrit:'मोक्ष संन्यास योग', roman:'Moksha Sanyasa Yoga', english:'The Yoga of Liberation & Renunciation', shloka:'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।', shloka_trans:'"Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear."', lesson:'The final teaching: let go of everything — roles, duties, rules — and surrender completely. That is true freedom.', modern:'Psychologically, this maps onto unconditional positive regard and radical acceptance — the most advanced therapeutic states.', tags:['Liberation','Surrender','Final Teaching'] },
];

const PANCHA_BOOKS = [
  {
    num:1, title:'मित्रभेद', roman:'Mitra Bheda', english:'The Loss of Friends',
    desc:'The longest and most famous book. About how trusted friends can be separated by scheming enemies. The frame story follows a lion named Pingalaka and his bull friend Sanjeevaka, manipulated apart by the jackal Damanaka.',
    moral:'A clever tongue can destroy what years of friendship built.',
    stories:[
      { title:'The Monkey and the Crocodile', summary:'A crocodile\'s jealous wife demands the monkey\'s heart. The wise monkey escapes by outwitting the crocodile.', lesson:'Greed destroys even the strongest friendship.' },
      { title:'The Blue Jackal', summary:'A jackal falls into indigo dye and pretends to be a divine animal to rule over others — until rain reveals his true colour.', lesson:'False identity cannot survive scrutiny.' },
      { title:'The Lion and the Hare', summary:'A tiny hare defeats a powerful lion by showing him his own reflection in a well as a "rival lion."', lesson:'Wit defeats strength every time.' },
    ]
  },
  {
    num:2, title:'मित्रसम्प्राप्ति', roman:'Mitra Samprapti', english:'The Gaining of Friends',
    desc:'About how unlikely allies — a crow, a mouse, a tortoise, and a deer — form a deep friendship through mutual help. The story teaches the value of diverse alliances.',
    moral:'Friends who are different from you complete your weaknesses.',
    stories:[
      { title:'The Crow, Mouse, Tortoise and Deer', summary:'Four very different animals save each other from hunters using their unique skills.', lesson:'Each person\'s strength protects the group\'s weakness.' },
      { title:'The Weaver Who Loved a Princess', summary:'A weaver disguises himself as Vishnu to win a princess, and the king allows it believing it to be divine will.', lesson:'Bold pretence sometimes succeeds where honest effort fails.' },
    ]
  },
  {
    num:3, title:'काकोलूकीयम्', roman:'Kakolukiyam', english:'Of Crows and Owls',
    desc:'A dark book about war, peace, and diplomacy between hereditary enemies — crows and owls. Teaches the six strategies of foreign policy (shadgunya) through animal politics.',
    moral:'Never trust an enemy who says they have changed, without proof.',
    stories:[
      { title:'The Crow Who Fooled the Owls', summary:'A crow pretends to be banished by his own flock to infiltrate the owl kingdom and learn their weaknesses.', lesson:'Intelligence gathering is the first weapon of war.' },
      { title:'The Story of the Cave That Spoke', summary:'A wise crow saves the king by making a cave "speak" — scaring away enemies.', lesson:'Illusion, used wisely, is a weapon of the weak against the strong.' },
    ]
  },
  {
    num:4, title:'लब्धप्रणाश', roman:'Labdhapranasha', english:'Loss of Gains',
    desc:'Short, sharp book warning against greed — about the foolishness of losing what you already have by grasping for more.',
    moral:'Contentment is the greatest wealth. Greed destroys even secured gains.',
    stories:[
      { title:'The Monkey and the Wedge', summary:'A curious monkey meddles with a half-split log, gets his tail trapped, and is crushed.', lesson:'Do not interfere in what is not your business.' },
      { title:'The Brahmin\'s Dream', summary:'A brahmin fantasises about wealth from a pot of rice flour, knocks it over, and loses everything.', lesson:'Daydreaming about what is not yet yours destroys what you have.' },
    ]
  },
  {
    num:5, title:'अपरीक्षितकारकम्', সংক্ষিপ্ত:'Aparikshitakarakam', english:'Ill-Considered Action',
    desc:'Stories about the consequences of acting without thinking. The most famous story in all of Panchatantra — the Brahmin and the mongoose — lives here.',
    moral:'Act only after full inquiry. Haste is the father of regret.',
    stories:[
      { title:'The Brahmin and the Mongoose', summary:'A brahmin kills his loyal mongoose thinking it harmed his son — but the mongoose had actually saved the child from a snake.', lesson:'Never act on assumption. Investigate before you destroy.' },
      { title:'The Four Scholars and the Lion', summary:'Four scholars revive a dead lion to prove their learning. The one without "book knowledge" — common sense — escapes. The others are devoured.', lesson:'Practical wisdom outweighs academic knowledge every time.' },
    ]
  },
];

const AYURVEDA_HERBS = [
  { name:'अश्वगंधा', roman:'Ashwagandha', english:'Indian Ginseng / Winter Cherry', latin:'Withania somnifera', when:'Stress, fatigue, low immunity, poor sleep, anxiety', how:'½ tsp powder in warm milk at night OR capsule form', dosage:'300–500mg extract or 1–2 tsp root powder daily', warning:'Avoid in pregnancy. Not with thyroid medication without advice.', science:'Clinical trials show it reduces cortisol by 27% and improves VO₂max. Adaptogen — helps the body resist physical and mental stress.', rasa:'Bitter, Astringent', guna:'Heavy, Oily', effect:'Vata-Kapha balancing', tags:['Stress','Sleep','Immunity','Strength'] },
  { name:'तुलसी', roman:'Tulsi', english:'Holy Basil', latin:'Ocimum sanctum', when:'Cold, cough, fever, anxiety, low energy, respiratory issues', how:'5–10 fresh leaves in hot water as tea. Morning on empty stomach is ideal.', dosage:'2–3 cups tulsi tea daily or 300mg capsule', warning:'Avoid in large doses during pregnancy. May slow blood clotting.', science:'Contains eugenol, rosmarinic acid, and ursolic acid — proven anti-inflammatory, antibacterial, and adaptogenic compounds.', rasa:'Pungent, Bitter', guna:'Light, Dry', effect:'Vata-Kapha reducing', tags:['Cold','Immunity','Stress','Respiratory'] },
  { name:'हरिद्रा', roman:'Haridra', english:'Turmeric', latin:'Curcuma longa', when:'Inflammation, joint pain, poor digestion, skin issues, low immunity', how:'Golden milk: ½ tsp in warm milk with black pepper (pepper increases absorption 2000%).', dosage:'500–1000mg curcumin daily. Always with black pepper (piperine).', warning:'Avoid high doses with blood thinners. Not before surgery.', science:'Curcumin is one of the most studied natural compounds — 12,000+ research papers. Reduces NF-κB inflammatory pathway.', rasa:'Pungent, Bitter, Astringent', guna:'Light, Dry', effect:'Tridoshic (balances all 3)', tags:['Inflammation','Joints','Digestion','Skin'] },
  { name:'त्रिफला', roman:'Triphala', english:'Three Fruits', latin:'Terminalia chebula + Terminalia bellerica + Phyllanthus emblica', when:'Constipation, poor digestion, detox, eye health, weight management', how:'1 tsp powder in warm water at bedtime. Or 2 capsules before sleep.', dosage:'3–6g powder or 500mg extract at night', warning:'May cause loose stool initially. Start small. Avoid during pregnancy.', science:'Contains 5x the Vitamin C of oranges. Proven prebiotic — feeds beneficial gut bacteria. 600+ research papers.', rasa:'All 6 tastes except salty', guna:'Light, Dry', effect:'Tridoshic', tags:['Digestion','Detox','Eyes','Anti-aging'] },
  { name:'ब्राह्मी', roman:'Brahmi', english:'Water Hyssop / Bacopa', latin:'Bacopa monnieri', when:'Poor memory, brain fog, anxiety, ADHD, slow learning, exam stress', how:'2–4 fresh leaves daily OR ½ tsp powder in ghee/milk. Brahmi oil for head massage.', dosage:'300mg standardised extract twice daily with food', warning:'May cause nausea on empty stomach. Avoid with sedatives.', science:'Bacosides (active compounds) repair damaged neurons and enhance synaptic communication. Proven to improve memory consolidation in 12-week trials.', rasa:'Bitter, Astringent', guna:'Light', effect:'Tridoshic — especially Vata-Pitta', tags:['Memory','Brain','Anxiety','Focus'] },
  { name:'आमलकी', roman:'Amalaki', english:'Indian Gooseberry / Amla', latin:'Phyllanthus emblica', when:'Low immunity, hair fall, acidity, vitamin C deficiency, aging, eye weakness', how:'Fresh juice (30ml) in morning. Or 1–2 dried amla. Chyawanprash contains amla as base.', dosage:'1–3g amla powder or 20–30ml fresh juice daily', warning:'Avoid at night. May increase cold sensation. Not with antacids.', science:'Highest natural source of Vitamin C (600mg per 100g). Extremely heat-stable unlike synthetic Vit C. Potent antioxidant.', rasa:'All 6 tastes — predominantly sour', guna:'Heavy, Cold, Moist', effect:'Tridoshic — especially Pitta reducing', tags:['Immunity','Hair','Vitamin C','Anti-aging'] },
  { name:'नीम', roman:'Neem', english:'Indian Lilac', latin:'Azadirachta indica', when:'Skin problems, blood purification, diabetes (blood sugar), dental issues, infections', how:'Neem water for skin wash. 3–5 leaves chewed on empty stomach. Neem twig for teeth.', dosage:'500mg extract capsule OR 4–5 leaves fresh on empty stomach', warning:'Never give to children under 2. Avoid in fertility treatment.', science:'Contains nimbidin and nimbin — proven antibacterial against 14 bacterial strains including MRSA. Azadirachtin disrupts insect hormone systems.', rasa:'Bitter', guna:'Light, Dry', effect:'Reduces Pitta and Kapha', tags:['Skin','Blood','Diabetes','Antibacterial'] },
  { name:'शतावरी', roman:'Shatavari', english:'Asparagus Root', latin:'Asparagus racemosus', when:'Hormonal balance (women), low energy, dryness, lactation support, menopause', how:'1 tsp powder in warm milk with honey. Morning or evening.', dosage:'500mg–2g powder daily in milk or water', warning:'Avoid with diuretics. May cause bloating initially.', science:'Steroidal saponins (shatavarin I–IV) demonstrate phytoestrogen activity — helps balance hormones naturally in clinical studies.', rasa:'Sweet, Bitter', guna:'Heavy, Oily, Cold', effect:'Vata-Pitta balancing', tags:['Women','Hormones','Energy','Lactation'] },
  { name:'गुग्गुल', roman:'Guggul', english:'Indian Bdellium / Myrrh tree', latin:'Commiphora wightii', when:'High cholesterol, joint pain, obesity, thyroid issues, arthritis', how:'Tablet/capsule form with warm water after meals. Often combined in Yogaraj Guggulu or Triphala Guggulu.', dosage:'500mg–1g purified guggul extract twice daily', warning:'Avoid in pregnancy. May interact with thyroid and blood-thinning medications.', science:'Guggulsterone blocks FXR (farnesoid X receptor) — the same target as modern cholesterol drugs. Multiple human trials confirm lipid-lowering effect.', rasa:'Bitter, Pungent, Astringent', guna:'Light, Dry', effect:'Reduces Kapha and Vata', tags:['Cholesterol','Joints','Weight','Thyroid'] },
  { name:'यष्टिमधु', roman:'Yashtimadhu', english:'Licorice Root', latin:'Glycyrrhiza glabra', when:'Cough, sore throat, acidity, ulcers, adrenal fatigue, skin darkening', how:'½ tsp powder in honey for throat. In milk for gastric issues. Herbal tea for respiratory.', dosage:'1–3g root powder or 200–600mg extract daily. Do not use more than 4–6 weeks continuously.', warning:'High doses raise blood pressure. Avoid in hypertension and kidney disease.', science:'Glycyrrhizin has proven anti-viral activity against herpes, hepatitis C, and SARS. Also inhibits H. pylori bacteria (cause of ulcers).', rasa:'Sweet', guna:'Heavy, Oily', effect:'Vata-Pitta balancing', tags:['Throat','Acidity','Ulcer','Skin'] },
  { name:'गिलोय', roman:'Giloy', english:'Heart-Leaved Moonseed / Guduchi', latin:'Tinospora cordifolia', when:'Fever, dengue, chikungunya, low immunity, diabetes, liver problems', how:'Fresh stem juice (30ml) or 1–2 inch stem boiled in water. Capsule form available.', dosage:'300–500mg extract twice daily or 30ml fresh juice', warning:'May lower blood sugar too much if combined with diabetes medication.', science:'Proven immunomodulator — increases macrophage activity by 40–60%. Used in COVID recovery protocols in India. Alkaloids berberine and tinosporine are active compounds.', rasa:'Bitter, Astringent', guna:'Heavy, Oily', effect:'Tridoshic', tags:['Fever','Immunity','Diabetes','Liver'] },
  { name:'शंखपुष्पी', roman:'Shankhpushpi', english:'Bindweed / Morning Glory', latin:'Convolvulus pluricaulis', when:'Anxiety, insomnia, poor memory, mental exhaustion, epilepsy support', how:'1 tsp syrup (available as Shankhpushpi syrup) OR ½ tsp powder in milk at bedtime.', dosage:'250–500mg extract or 1–2 tsp syrup twice daily', warning:'Avoid with anti-epileptic drugs (phenytoin). May potentiate sedatives.', science:'Scopoletin and convolvine are active alkaloids that modulate GABA-A receptors — same receptor targeted by anti-anxiety drugs but via a gentler mechanism.', rasa:'Bitter, Astringent, Sweet', guna:'Oily, Slimy', effect:'Reduces Vata and Pitta', tags:['Anxiety','Sleep','Memory','Brain'] },
];

const ARTHA_BOOKS = [
  { num:1, title:'Vinayādhikaraṇa', sanskrit:'विनयाधिकरण', topic:'Training of the King', desc:'How a ruler must discipline himself — morning routine, education, control of senses. A king who cannot rule himself cannot rule a kingdom.', sutra:'"In the happiness of his subjects lies the king\'s happiness; in their welfare his welfare."', modern:'Leadership psychology: self-regulation and emotional intelligence are the #1 predictors of leadership effectiveness.' },
  { num:2, title:'Adhyaksha Pracharanam', sanskrit:'अध्यक्षप्रचारणम्', topic:'Activities of Departments', desc:'Complete system for government departments — finance, treasury, agriculture, mines, trade. Essentially the world\'s first civil service manual.', sutra:'"Government servants shall be paid adequately so they do not steal. Underpaid officials are the source of all corruption."', modern:'Modern public administration theory independently arrived at the same conclusion 2300 years later.' },
  { num:3, title:'Dharmasthiya', sanskrit:'धर्मस्थीय', topic:'Law & Civil Courts', desc:'Civil law — contracts, property, marriage, inheritance, debt. Remarkably modern: includes rules on evidence, burden of proof, and protection of women\'s property rights.', sutra:'"A contract made by fraud, fear, or intoxication is void."', modern:'Contract law principles here predate Roman law by centuries.' },
  { num:4, title:'Kantaka Shodhana', sanskrit:'कण्टकशोधन', topic:'Removal of Thorns', desc:'Criminal law and police work. How to identify, infiltrate, and neutralise criminal networks. Includes guidelines for undercover agents.', sutra:'"The king should identify enemies not by what they say but by what they do."', modern:'Modern counterintelligence methodology independently mirrors Chanakya\'s methods.' },
  { num:5, title:'Yoga Vrittam', sanskrit:'योगवृत्तम्', topic:'Secret Conduct', desc:'Intelligence operations — spies, double agents, propaganda, secret communications. The world\'s first systematic intelligence manual.', sutra:'"A king\'s eye is his spy network. Without eyes, a king is blind."', modern:'Sun Tzu and Machiavelli cover similar territory, but Arthashastra is more systematic and predates both.' },
  { num:6, title:'Mandala Yoga', sanskrit:'मण्डलयोग', topic:'Circle of States', desc:'Foreign policy theory. The "Mandala" concept: your neighbour is your natural enemy; your neighbour\'s neighbour is your natural ally.', sutra:'"The enemy of my enemy is my friend."', modern:'Realpolitik and balance-of-power theory in modern international relations directly echoes Chanakya\'s mandala.' },
  { num:7, title:'Shadgunya', sanskrit:'षाड्गुण्य', topic:'Six Foreign Policies', desc:'Six strategies for dealing with other states: peace, war, neutrality, marching, alliance, duplicity. The state uses whichever is most advantageous at a given moment.', sutra:'"There is no permanent friend or enemy in statecraft — only permanent interests."', modern:'Henry Kissinger and Metternich described statecraft using identical frameworks 2300 years later.' },
  { num:8, title:'Vyasanādhikaraṇa', sanskrit:'व्यसनाधिकरण', topic:'Troubles of the State', desc:'How kings destroy themselves: wine, gambling, women, hunting, harsh speech. Internal collapse precedes external defeat.', sutra:'"A king who is a slave to his pleasures will be exploited by his ministers, his wives, and his enemies."', modern:'Organisational collapse research confirms: leadership failure begins internally — hubris, addiction, loss of discipline.' },
  { num:9, title:'Abhiyāsika', sanskrit:'अभियासिक', topic:'Work of an Invading King', desc:'Military strategy before invasion — intelligence, sabotage, weakening enemy from within before a single soldier crosses the border.', sutra:'"A war that can be won by diplomacy should not be won by arms."', modern:'The CIA\'s covert operations playbook and modern hybrid warfare doctrine follow this exact sequence.' },
  { num:10, title:'Yuddha Vishayah', sanskrit:'युद्धविषयः', topic:'War', desc:'Open warfare — battle formations, troop movements, terrain selection, timing of attacks. The Arthashastra is the original combined arms doctrine.', sutra:'"Fight only when the chance of victory exceeds the cost of fighting."', modern:'Cost-benefit analysis in modern military strategy is exactly this calculation formalised.' },
  { num:11, title:'Sangha Vrittam', sanskrit:'संघवृत्तम्', topic:'Corporations & Oligarchies', desc:'How to deal with republics and oligarchic confederacies — different from kingdoms. How to keep alliances intact using shared interest.', sutra:'"United they stand; divided they can be destroyed one by one."', modern:'Coalition warfare and alliance management in NATO and UN are structured on identical principles.' },
  { num:12, title:'Abala Vijayi', sanskrit:'अबलविजयी', topic:'Conquest of a Strong Enemy', desc:'How to defeat a stronger enemy using cunning: subversion, fomenting internal rebellion, economic strangulation, seducing the enemy\'s allies.', sutra:'"Never fight a stronger enemy with strength. Fight them with their own weaknesses."', modern:'Asymmetric warfare, economic sanctions, and "gray zone" conflict are all documented here first.' },
  { num:13, title:'Durga Labhopaya', sanskrit:'दुर्गलाभोपाय', topic:'Capture of Forts', desc:'Siege warfare, capture of fortified cities. Also covers how to build an impregnable city. The Arthashastra spec for a capital city includes sewers, emergency food stores, and fire prevention.', sutra:'"A fort is useless without a garrison loyal to its king, not to its walls."', modern:'Urban planning, disaster preparedness, and urban warfare doctrine all trace principles to texts like this.' },
  { num:14, title:'Aupanishadika', sanskrit:'औपनिषदिक', topic:'Secret & Mystical Means', desc:'Morale warfare, psychological operations, religious propaganda, and omens. How beliefs and fear can be weaponised strategically.', sutra:'"What cannot be achieved by force can often be achieved by belief."', modern:'Psychological operations (PsyOps) and information warfare in modern militaries.', },
  { num:15, title:'Tantrasamgraha', sanskrit:'तन्त्रसंग्रह', topic:'Summary of Methodology', desc:'The methodology of the text itself — how Chanakya compiled it, his sources, and the science of writing a treatise on statecraft.', sutra:'"This science has been composed by bringing together, as many sciences treating of the subject as possible."', modern:'Systems thinking and meta-analysis — the Arthashastra is self-aware about being a synthesis of prior knowledge.' },
];

function buildGitaCards() {
  const grid = document.getElementById('gita-cards');
  if(!grid) return;
  grid.innerHTML = GITA_CHAPTERS.map((c,i) => `
    <div class="learn-card" style="animation-delay:${i*0.04}s" onclick="window.toggleDetail(this)">
      <div class="card-num">Chapter ${c.num} of 18</div>
      <div class="card-sanskrit">${c.sanskrit}</div>
      <div class="card-roman">${c.roman}</div>
      <div class="card-divider"></div>
      <div class="card-english"><strong>${c.english}</strong></div>
      <div class="card-tags">${c.tags.map(t=>`<span class="card-tag">${t}</span>`).join('')}</div>
      <div class="card-detail">
        <div class="detail-label">Key Shloka</div>
        <div class="detail-shloka">${c.shloka}</div>
        <div class="detail-shloka-trans">${c.shloka_trans}</div>
        <div class="detail-label">Core Lesson</div>
        <div class="detail-text">${c.lesson}</div>
        <div class="detail-label">Modern Connection</div>
        <div class="detail-text">${c.modern}</div>
      </div>
      <button class="toggle-btn">▾ Read shloka & lesson</button>
    </div>
  `).join('');
}

function buildPanchaCards() {
  const grid = document.getElementById('pancha-cards');
  if(!grid) return;
  grid.innerHTML = PANCHA_BOOKS.map((b,i) => `
    <div class="learn-card" style="animation-delay:${i*0.08}s;grid-column:span 1" onclick="window.toggleDetail(this)">
      <div class="story-num">${b.num}</div>
      <div class="card-num">Book ${b.num} of 5</div>
      <div class="card-sanskrit">${b.title}</div>
      <div class="card-roman">${b.roman}</div>
      <div class="card-divider"></div>
      <div class="card-english"><strong>${b.english}</strong></div>
      <p style="font-size:13px;color:var(--text-dim);margin-top:8px;line-height:1.6">${b.desc}</p>
      <div class="card-detail">
        <div class="detail-label">Core Moral</div>
        <div class="detail-shloka" style="font-family:'Lato',sans-serif;font-size:14px">"${b.moral}"</div>
        <div class="detail-label" style="margin-top:12px">Key Stories</div>
        ${b.stories.map(s=>`
          <div style="margin-bottom:12px;padding:12px;background:var(--bg2);border-radius:var(--r-sm);border:1px solid var(--gold-border)">
            <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px">${s.title}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;line-height:1.6">${s.summary}</div>
            <div style="font-size:11px;color:var(--gold-dim);font-style:italic">💡 ${s.lesson}</div>
          </div>
        `).join('')}
      </div>
      <button class="toggle-btn">▾ Read stories & moral</button>
    </div>
  `).join('');
}

function buildAyurCards() {
  const grid = document.getElementById('ayur-cards');
  if(!grid) return;
  grid.innerHTML = AYURVEDA_HERBS.map((h,i) => `
    <div class="learn-card" style="animation-delay:${i*0.04}s;border-left:3px solid #3A9B8C" onclick="window.toggleDetail(this)">
      <div class="card-num" style="color:#3A9B8C">${h.latin}</div>
      <div class="card-sanskrit">${h.name}</div>
      <div class="card-roman">${h.roman}</div>
      <div class="card-divider"></div>
      <div class="card-english"><strong>${h.english}</strong></div>
      <div style="font-size:12px;color:var(--text-dim);margin:8px 0 4px">
        <span style="color:#3A9B8C">Taste:</span> ${h.rasa} &nbsp;·&nbsp; <span style="color:#3A9B8C">Effect:</span> ${h.effect}
      </div>
      <div class="card-tags">${h.tags.map(t=>`<span class="card-tag" style="border-color:rgba(58,155,140,0.3);color:#3A9B8C">${t}</span>`).join('')}</div>
      <div class="card-detail">
        <div class="detail-label">When to Use</div>
        <div class="detail-text">${h.when}</div>
        <div class="detail-label">How to Use</div>
        <div class="detail-shloka" style="font-family:'Lato',sans-serif;font-size:13px;border-left-color:#3A9B8C">${h.how}</div>
        <div class="detail-label">Dosage</div>
        <div class="detail-text">${h.dosage}</div>
        <div class="detail-label">⚠️ Caution</div>
        <div class="detail-text" style="color:#E24B4A">${h.warning}</div>
        <div class="detail-label">Modern Science</div>
        <div class="detail-text">${h.science}</div>
      </div>
      <button class="toggle-btn" style="color:#3A9B8C">▾ How to use & science</button>
    </div>
  `).join('');
}

function buildArthaCards() {
  const grid = document.getElementById('artha-cards');
  if(!grid) return;
  grid.innerHTML = ARTHA_BOOKS.map((b,i) => `
    <div class="learn-card" style="animation-delay:${i*0.04}s;border-left:3px solid #C46B3A" onclick="window.toggleDetail(this)">
      <div class="card-num" style="color:#C46B3A">Book ${b.num} of 15</div>
      <div class="card-sanskrit">${b.sanskrit}</div>
      <div class="card-roman">${b.title}</div>
      <div class="card-divider"></div>
      <div class="card-english"><strong>${b.topic}</strong></div>
      <p style="font-size:13px;color:var(--text-dim);margin-top:8px;line-height:1.6">${b.desc.substring(0,100)}…</p>
      <div class="card-detail">
        <div class="detail-text">${b.desc}</div>
        <div class="detail-label">Chanakya Sutra</div>
        <div class="detail-shloka" style="font-family:'Lato',sans-serif;font-size:14px;border-left-color:#C46B3A">"${b.sutra}"</div>
        <div class="detail-label">Modern Parallel</div>
        <div class="detail-text">${b.modern}</div>
      </div>
      <button class="toggle-btn" style="color:#C46B3A">▾ Read sutra & details</button>
    </div>
  `).join('');
}

window.toggleDetail = function toggleDetail(card) {
  const detail = card.querySelector('.card-detail');
  const btn = card.querySelector('.toggle-btn');
  const isOpen = detail.classList.contains('open');
  detail.classList.toggle('open', !isOpen);
  btn.textContent = isOpen ? '▾ Read more' : '▴ Close';
};

window.showTopic = function showTopic(id, btn) {
  document.querySelectorAll('.topic-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  btn.classList.add('active');
};

document.getElementById('learn-back-btn').addEventListener('click', () => actions.goTo('landing'));



buildGitaCards();
buildPanchaCards();
buildAyurCards();
buildArthaCards();
