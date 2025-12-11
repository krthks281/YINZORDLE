// Ice Hockey themed 5-letter words
let HOCKEY_WORDS = [
    // Equipment
    "PUCKS",
    "STICK",
    "SKATE",
    "BLADE",
    "GLOVE",
    "VISOR",
    "STRAP",
    "LACES",
    "SHAFT",
    "TAPE",

    // Game Terms
    "GOALS",
    "SCORE",
    "SHOTS",
    "SAVES",
    "BLOCK",
    "CHECK",
    "ICING",
    "CREASE",
    "BENCH",
    "BOARD",
    "GLASS",
    "ZONES",
    "LINES",
    "SHIFT",
    "FIGHT",
    "BRAWL",

    // Positions & Players
    "WINGER",
    "GOALIE",
    "TEAMS",
    "DRAFT",
    "TRADE",
    "COACH",
    "SQUAD",
    "DEPTH",

    // Actions
    "DEKE",
    "SNIPE",
    "SAUCER",
    "SLAPS",
    "WRIST",
    "CLAPS",
    "DUMPS",
    "CHASE",
    "CLEAR",
    "CYCLE",
    "CRASH",
    "GRIND",
    "PINCH",
    "SPEED",
    "SKATES",
    "TWINE",
    "MITTS",
    "WHEEL",
    "FLOAT",
    "FLICK",

    // Rink & Arena
    "ARENA",
    "PAINT",
    "POSTS",
    "PIPES",
    "POINT",
    "SLOTS",
    "CIRCLE",

    // Penalties
    "MINOR",
    "MAJOR",
    "HOOKING",
    "SLASH",
    "CROSS",
    "ROUGH",
    "DELAY",
    "HOLDS",
    "TRIPS",

    // Leagues & Events
    "FINAL",
    "ROUND",
    "CHAMP",
    "TITLE",
    "CROWN",
    "GAMES",
    "RANKS",
    "STATS",

    // Hockey Culture
    "CELLY",
    "CHIRP",
    "SAUCE",
    "SNIPS",
    "DANGLE",
    "FLOW",
    "MULLET",
    "BEARD",
    "BENDER",

    // Misc Hockey Terms
    "EXTRA",
    "EMPTY",
    "SPLIT",
    "POWER",
    "PLAYS",
    "SHORT",
    "DRAWS",
    "POKE",
    "REBOUND",
    "LOOSE",
    "STEEL",
    "SHARP",
    "EDGES",
    "PIVOT",
    "STOPS",
    "STARTS"
];

// Filter to only 5-letter words and uppercase
let VALID_WORDS = HOCKEY_WORDS
    .map(word => word.toUpperCase().trim())
    .filter(word => word.length === 5);

// Words that can be answers (subset of valid words)
let ANSWER_WORDS = [...VALID_WORDS];

// Fetch additional hockey words from Datamuse API
async function fetchHockeyWordsFromAPI() {
    try {
        const response = await fetch('https://api.datamuse.com/words?ml=hockey+ice+puck+rink&max=200');
        const data = await response.json();

        const newWords = data
            .map(item => item.word.toUpperCase().trim())
            .filter(word => word.length === 5 && /^[A-Z]+$/.test(word));

        // Add new words that aren't already in our list
        const uniqueNewWords = newWords.filter(word => !VALID_WORDS.includes(word));

        if (uniqueNewWords.length > 0) {
            HOCKEY_WORDS = [...HOCKEY_WORDS, ...uniqueNewWords];
            VALID_WORDS = [...new Set([...VALID_WORDS, ...uniqueNewWords])];
            ANSWER_WORDS = [...VALID_WORDS];
            console.log(`Added ${uniqueNewWords.length} new words from API:`, uniqueNewWords);
        }
    } catch (error) {
        console.log('Could not fetch additional words from API:', error.message);
    }
}

// Fetch words on load
fetchHockeyWordsFromAPI();

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
