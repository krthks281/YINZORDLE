// Sports Word Database
const SPORTS_WORDS = {
    // Ice Hockey themed 5-letter words
    HOCKEY: [
        // Equipment
        "PUCKS", "STICK", "SKATE", "BLADE", "GLOVE", "VISOR", "STRAP", "LACES", "SHAFT",
        // Game Terms
        "GOALS", "SCORE", "SHOTS", "SAVES", "BLOCK", "CHECK", "ICING", "BENCH", "BOARD",
        "GLASS", "ZONES", "LINES", "SHIFT", "FIGHT", "BRAWL",
        // Positions & Players
        "TEAMS", "DRAFT", "TRADE", "COACH", "SQUAD", "DEPTH",
        // Actions
        "SNIPE", "SLAPS", "WRIST", "CLAPS", "DUMPS", "CHASE", "CLEAR", "CYCLE", "CRASH",
        "GRIND", "PINCH", "SPEED", "TWINE", "MITTS", "WHEEL", "FLOAT", "FLICK",
        // Rink & Arena
        "ARENA", "PAINT", "POSTS", "PIPES", "POINT", "SLOTS",
        // Penalties
        "MINOR", "MAJOR", "SLASH", "CROSS", "ROUGH", "DELAY", "HOLDS", "TRIPS",
        // Leagues & Events
        "FINAL", "ROUND", "CHAMP", "TITLE", "CROWN", "GAMES", "RANKS", "STATS",
        // Hockey Culture
        "CELLY", "CHIRP", "SAUCE", "SNIPS",
        // Misc Hockey Terms
        "EXTRA", "EMPTY", "SPLIT", "POWER", "PLAYS", "SHORT", "DRAWS", "LOOSE", "STEEL",
        "SHARP", "EDGES", "PIVOT", "STOPS"
    ],

    // NFL (American Football) themed 5-letter words
    NFL: [
        // Positions
        "BACKS", "GUARD", "TIGHT", "WIDES", "PUNTS", "KICKS",
        // Actions
        "THROW", "CATCH", "BLOCK", "BLITZ", "SACKS", "HIKES", "SNAPS", "FAKES", "JUMPS",
        "DROPS", "SPINS", "JUKE", "STIFF", "STRIP",
        // Game Terms
        "DOWNS", "YARDS", "FIELD", "PLAYS", "DRIVE", "SCORE", "POINT", "EXTRA", "SPOTS",
        "FLAGS", "CLOCK", "ZONES", "GOALS", "TOUCH", "SUPER", "BOWLS",
        // Equipment
        "CLEATS", "PADS", "BALLS", "CHAIN", "POSTS", "GRASS", "TURF",
        // Formations
        "SHOTGUN", "TRIPS", "EMPTY", "SPLIT", "BUNCH",
        // Strategy
        "BLUFF", "COVER", "PRESS", "SWEEP", "ROUTE", "SLANT", "FLATS", "SEAMS", "CURLS",
        // Culture
        "DRAFT", "TRADE", "COACH", "BENCH", "SQUAD", "TEAMS", "CHAMP", "TITLE", "FINAL",
        "SUPER", "STATS", "RANKS", "CROWN", "GAMES",
        // Penalties
        "HOLDS", "CLIPS", "DELAY", "OFFSIDES", "ROUGH", "FALSE",
        // Misc
        "CLOCK", "SPIKE", "KNEEL", "AUDIBLE", "HURRY", "QUICK", "POWER", "FORCE", "SPEED"
    ],

    // NBA (Basketball) themed 5-letter words
    NBA: [
        // Positions
        "GUARD", "POINT", "WINGS", "POSTS", "BENCH",
        // Actions
        "SHOOT", "DUNK", "BLOCK", "STEAL", "DRIVE", "CROSS", "JUMPS", "DUNKS", "SHOOT",
        "SWISH", "BRICK", "CLANK", "DRAIN", "BANKS", "ALLEY", "DROPS", "SPINS",
        // Game Terms
        "SCORE", "FOUL", "FOULS", "THREE", "LAYUP", "COURT", "HOOP", "HOOPS", "PAINT",
        "LANES", "ZONES", "CLOCK", "BONUS", "PLAYS", "GAMES", "TRIPS",
        // Equipment
        "BALLS", "SHOES", "KICKS", "FLOOR", "GLASS", "BOARD", "RIMS",
        // Strategy
        "PRESS", "TRAPS", "PICKS", "ROLLS", "FLARE", "CURLS", "SLASH", "SPACE", "TEMPO",
        "POSTS", "ELBOW", "SWING",
        // Culture
        "DRAFT", "TRADE", "COACH", "SQUAD", "TEAMS", "CHAMP", "TITLE", "FINAL", "RINGS",
        "STATS", "RANKS", "CROWN", "GAMES", "ARENA",
        // Positions/Roles
        "SIXTH", "STARS", "VETS",
        // Misc
        "QUICK", "SPEED", "POWER", "FORCE", "EURO", "FLOAT", "TOUCH", "RANGE", "CLUTCH"
    ],

    // FA (Football/Soccer) themed 5-letter words
    FA: [
        // Positions
        "BACKS", "WINGS", "MIDS", "GOALIE",
        // Actions
        "KICKS", "HEADS", "VOLLEY", "PASS", "CROSS", "SHOOT", "SCORE", "SAVES", "DIVES",
        "SLIDE", "BLOCK", "CLEAR", "CHIPS", "CURLS", "BENDS", "LOBS",
        // Game Terms
        "GOALS", "FOULS", "CARDS", "OFFSIDE", "THROW", "KICKS", "PITCH", "FIELD", "POSTS",
        "NETS", "GRASS", "TURF", "HALFS", "EXTRA", "DRAWS", "MATCH",
        // Equipment
        "BALLS", "BOOTS", "CLEATS", "STUDS", "KITS", "PADS", "GLOVE",
        // Strategy
        "PRESS", "TRAP", "SPACE", "WIDTH", "DEPTH", "TEMPO", "BUILD", "HOLD", "PARKS",
        // Culture
        "DERBY", "FINAL", "SEMIS", "CHAMP", "TITLE", "CROWN", "LEAGUE", "CUPS", "SQUAD",
        "TEAMS", "COACH", "BENCH", "SUBS", "DRAFT", "LOANS", "TRADE",
        // Formations
        "FLATS", "HIGHS", "PIVOT",
        // Misc
        "QUICK", "SPEED", "POWER", "SKILL", "TOUCH", "VISION", "CLASS", "WORLD", "PRIME",
        "STATS", "RANKS", "GAMES", "ARENA", "FANS", "ULTRA"
    ]
};

// Sport configuration
const SPORT_CONFIG = {
    HOCKEY: {
        name: "Ice Hockey",
        icon: "🏒",
        apiQuery: "hockey+ice+puck+rink",
        subtitle: "Guess the 5-letter ice hockey word!"
    },
    NFL: {
        name: "NFL",
        icon: "🏈",
        apiQuery: "football+nfl+touchdown+quarterback",
        subtitle: "Guess the 5-letter football word!"
    },
    NBA: {
        name: "NBA",
        icon: "🏀",
        apiQuery: "basketball+nba+dunk+court",
        subtitle: "Guess the 5-letter basketball word!"
    },
    FA: {
        name: "Football",
        icon: "⚽",
        apiQuery: "soccer+football+goal+pitch",
        subtitle: "Guess the 5-letter football word!"
    }
};

// Current sport (default to Hockey)
let currentSport = localStorage.getItem('yinzordle-sport') || 'HOCKEY';

// Filter words to only 5-letter words
function getFilteredWords(sport) {
    return SPORTS_WORDS[sport]
        .map(word => word.toUpperCase().trim())
        .filter(word => word.length === 5 && /^[A-Z]+$/.test(word));
}

// Initialize word lists for current sport
let VALID_WORDS = getFilteredWords(currentSport);
let ANSWER_WORDS = [...VALID_WORDS];

// Function to switch sport
function switchSport(sport) {
    if (!SPORTS_WORDS[sport]) return;

    currentSport = sport;
    localStorage.setItem('yinzordle-sport', sport);

    VALID_WORDS = getFilteredWords(sport);
    ANSWER_WORDS = [...VALID_WORDS];

    // Fetch additional words from API
    fetchWordsFromAPI(sport);

    // Update subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.textContent = SPORT_CONFIG[sport].subtitle;
    }

    return SPORT_CONFIG[sport];
}

// Fetch additional words from Datamuse API for the selected sport
async function fetchWordsFromAPI(sport) {
    try {
        const query = SPORT_CONFIG[sport]?.apiQuery || "sports";
        const response = await fetch(`https://api.datamuse.com/words?ml=${query}&max=200`);
        const data = await response.json();

        const newWords = data
            .map(item => item.word.toUpperCase().trim())
            .filter(word => word.length === 5 && /^[A-Z]+$/.test(word));

        // Add new words that aren't already in our list
        const uniqueNewWords = newWords.filter(word => !VALID_WORDS.includes(word));

        if (uniqueNewWords.length > 0) {
            VALID_WORDS = [...new Set([...VALID_WORDS, ...uniqueNewWords])];
            ANSWER_WORDS = [...VALID_WORDS];
            console.log(`Added ${uniqueNewWords.length} new ${sport} words from API:`, uniqueNewWords);
        }
    } catch (error) {
        console.log('Could not fetch additional words from API:', error.message);
    }
}

// Fetch words on load for current sport
fetchWordsFromAPI(currentSport);

// Additional common 5-letter words for valid guesses (players can type these)
const COMMON_WORDS = [
    "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT",
    "AFTER", "AGAIN", "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT",
    "ALIEN", "ALIGN", "ALIKE", "ALIVE", "ALLOW", "ALONE", "ALONG", "ALTER",
    "AMONG", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "APPLY", "ARENA",
    "ARGUE", "ARISE", "ARRAY", "ASIDE", "ASSET", "AUDIO", "AUDIT", "AVOID",
    "AWARD", "AWARE", "BADLY", "BASIC", "BASIS", "BEACH", "BEGAN", "BEGIN",
    "BEING", "BELOW", "BENCH", "BIRTH", "BLACK", "BLAME", "BLANK", "BLAST",
    "BLEND", "BLESS", "BLIND", "BLOCK", "BLOOD", "BOARD", "BOOST", "BOOTH",
    "BOUND", "BRAIN", "BRAND", "BRAVE", "BREAD", "BREAK", "BREED", "BRICK",
    "BRIEF", "BRING", "BROAD", "BROKE", "BROWN", "BUILD", "BUILT", "BUYER",
    "CABLE", "CALIF", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR", "CHART",
    "CHASE", "CHEAP", "CHECK", "CHEST", "CHIEF", "CHILD", "CHINA", "CHOSE",
    "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLIMB", "CLOCK", "CLOSE",
    "CLOTH", "CLOUD", "COACH", "COAST", "COULD", "COUNT", "COURT", "COVER",
    "CRACK", "CRAFT", "CRASH", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN",
    "CURVE", "CYCLE", "DAILY", "DANCE", "DATED", "DEALT", "DEATH", "DEBUT",
    "DELAY", "DEPTH", "DOING", "DOUBT", "DOZEN", "DRAFT", "DRAIN", "DRAMA",
    "DRANK", "DRAWN", "DREAM", "DRESS", "DRINK", "DRIVE", "DROPS", "DROVE",
    "DRUGS", "DYING", "EARLY", "EARTH", "EIGHT", "ELECT", "ELITE", "EMPTY",
    "ENEMY", "ENJOY", "ENTER", "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY",
    "EXACT", "EXIST", "EXTRA", "FAITH", "FALSE", "FAULT", "FEVER", "FIBER",
    "FIELD", "FIFTH", "FIFTY", "FIGHT", "FINAL", "FIRST", "FIXED", "FLASH",
    "FLEET", "FLOOR", "FLUID", "FOCUS", "FORCE", "FORTH", "FORUM", "FOUND",
    "FRAME", "FRANK", "FRAUD", "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY",
    "GIANT", "GIVEN", "GLASS", "GLOBE", "GOING", "GRACE", "GRADE", "GRAND",
    "GRANT", "GRASS", "GRAVE", "GREAT", "GREEN", "GROSS", "GROUP", "GROWN",
    "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY", "HARRY", "HEART", "HEAVY",
    "HENCE", "HENRY", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL", "IMAGE",
    "INDEX", "INNER", "INPUT", "ISSUE", "JAPAN", "JIMMY", "JOINT", "JONES",
    "JUDGE", "JUICE", "KNOWN", "LABEL", "LABOR", "LARGE", "LASER", "LATER",
    "LAUGH", "LAYER", "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL", "LEVEL",
    "LEWIS", "LIGHT", "LIMIT", "LINKS", "LIVES", "LOCAL", "LOOSE", "LOWER",
    "LUCKY", "LUNCH", "LYING", "MAGIC", "MAJOR", "MAKER", "MARCH", "MARIA",
    "MATCH", "MAYOR", "MEANT", "MEDIA", "METAL", "MIGHT", "MINOR", "MINUS",
    "MIXED", "MODEL", "MONEY", "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE",
    "MOUTH", "MOVED", "MOVIE", "MUSIC", "NEEDS", "NERVE", "NEVER", "NIGHT",
    "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE", "OCCUR", "OCEAN", "OFFER",
    "OFTEN", "ORDER", "OTHER", "OUGHT", "PAINT", "PANEL", "PAPER", "PARTY",
    "PEACE", "PETER", "PHASE", "PHONE", "PHOTO", "PIECE", "PILOT", "PITCH",
    "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "PLAYS", "PLAZA", "POINT",
    "POUND", "POWER", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR",
    "PRIZE", "PROOF", "PROUD", "PROVE", "QUEEN", "QUICK", "QUIET", "QUITE",
    "RADIO", "RAISE", "RANGE", "RAPID", "RATIO", "REACH", "READY", "REFER",
    "REIGN", "RELAX", "REPLY", "RIGHT", "RIVAL", "RIVER", "ROBIN", "ROGER",
    "ROMAN", "ROUGH", "ROUND", "ROUTE", "ROYAL", "RURAL", "SCALE", "SCENE",
    "SCOPE", "SCORE", "SENSE", "SERVE", "SEVEN", "SHALL", "SHAPE", "SHARE",
    "SHARP", "SHEET", "SHELF", "SHELL", "SHIFT", "SHIRT", "SHOCK", "SHOOT",
    "SHORT", "SHOWN", "SIGHT", "SINCE", "SIXTH", "SIXTY", "SIZED", "SKILL",
    "SLEEP", "SLIDE", "SMALL", "SMART", "SMILE", "SMITH", "SMOKE", "SOLID",
    "SOLVE", "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED",
    "SPEND", "SPENT", "SPLIT", "SPOKE", "SPORT", "STAFF", "STAGE", "STAKE",
    "STAND", "START", "STATE", "STEAM", "STEEL", "STEEP", "STICK", "STILL",
    "STOCK", "STONE", "STOOD", "STORE", "STORM", "STORY", "STRIP", "STUCK",
    "STUDY", "STUFF", "STYLE", "SUGAR", "SUITE", "SUPER", "SWEET", "TABLE",
    "TAKEN", "TASTE", "TAXES", "TEACH", "TEETH", "TERRY", "TEXAS", "THANK",
    "THEFT", "THEIR", "THEME", "THERE", "THESE", "THICK", "THING", "THINK",
    "THIRD", "THOSE", "THREE", "THREW", "THROW", "TIGHT", "TIMES", "TIRED",
    "TITLE", "TODAY", "TOKEN", "TOOTH", "TOPIC", "TOTAL", "TOUCH", "TOUGH",
    "TOWER", "TRACK", "TRADE", "TRAIN", "TRASH", "TREAT", "TREND", "TRIAL",
    "TRIBE", "TRICK", "TRIED", "TRIES", "TRUCK", "TRULY", "TRUMP", "TRUST",
    "TRUTH", "TWICE", "UNDER", "UNDUE", "UNION", "UNITY", "UNTIL", "UPPER",
    "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO", "VIGOR",
    "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WHEEL",
    "WHERE", "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE", "WOMAN", "WOMEN",
    "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD", "WOUND", "WRITE",
    "WRONG", "WROTE", "YIELD", "YOUNG", "YOUTH", "ZONES"
];

// Combine all valid words for guess validation
const ALL_VALID_WORDS = [...new Set([...VALID_WORDS, ...COMMON_WORDS])];

// Function to get all valid words (including common words)
function getAllValidWords() {
    return [...new Set([...VALID_WORDS, ...COMMON_WORDS])];
}
