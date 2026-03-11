/* TwistEdClaude Emoji Picker — main.js
 * Inserts emojis at cursor position via a categorized picker panel.
 * Triggered by a side button in the Acode editor toolbar.
 */

(function () {

  /* ─────────────────────────────────────────
     EMOJI DATA — categories + emoji arrays
  ───────────────────────────────────────── */
  const EMOJI_DATA = {
    "😀 Smileys": [
      "😀","😁","😂","🤣","😃","😄","😅","😆","😉","🤓",
      "😋","😎","😍","🥰","😘","🤩","😗","😙","😚","🙂",
      "🤗","🤭","🤫","🤔","😐","😑","😶","🙄","😏","😣",
      "😥","😮","🤐","😯","😪","😫","🥱","😴","😌","😛",
      "😜","😝","🤤","😒","😓","😔","😕","🙃","🤑","😲",
      "☹️","🙁","😖","😞","😟","😤","😢","😭","😦","😧",
      "😨","😩","🤯","😬","😰","😱","🥵","🥶","😳","🤪",
      "😵","🥴","😠","😡","🤬","😷","🤒","🤕","🤢","🤮",
      "🤧","😇","🥳","🥸","🤠","🤡","🤥","🤫","🥺","😶‍🌫️"
    ],
    "👋 People": [
      "👋","🤚","🖐️","✋","🖖","👌","🤌","🤏","✌️","🤞",
      "🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍",
      "👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝",
      "🙏","✍️","💅","🤳","💪","🦵","🦶","👂","🦻","👃",
      "🧠","🫀","🫁","🦷","🦴","👀","👁️","👅","👄","🫦",
      "👶","🧒","👦","👧","🧑","👱","👨","🧔","👩","🧓",
      "👴","👵","🙍","🙎","🙅","🙆","💁","🙋","🧏","🙇",
      "🤦","🤷","💆","💇","🚶","🧍","🧎","🏃","💃","🕺"
    ],
    "🐶 Animals": [
      "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯",
      "🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊","🐔","🐧",
      "🐦","🐤","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄",
      "🐝","🪱","🐛","🦋","🐌","🐞","🐜","🪲","🦟","🦗",
      "🦂","🐢","🐍","🦎","🦖","🦕","🐙","🦑","🦐","🦞",
      "🦀","🐡","🐟","🐠","🐬","🐳","🐋","🦈","🐊","🐅",
      "🐆","🦓","🦍","🦧","🦣","🐘","🦛","🦏","🐪","🐫",
      "🦒","🦘","🦬","🐃","🐂","🐄","🐎","🐖","🐏","🐑"
    ],
    "🌸 Nature": [
      "🌸","🌼","🌻","🌹","🌺","🌷","💐","🪷","🌱","🌲",
      "🌳","🌴","🪵","🌵","🎋","🎍","🍀","🌿","☘️","🍃",
      "🍂","🍁","🪸","🍄","🌾","💧","💦","🌊","🌬️","🌀",
      "🌈","☀️","🌤️","⛅","🌦️","🌧️","⛈️","🌩️","🌨️","❄️",
      "☃️","⛄","🌬️","💨","🌪️","🌫️","🌡️","⚡","🔥","💥",
      "🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌙","🌚",
      "🌛","🌜","😶‍🌫️","⭐","🌟","💫","✨","🌠","☄️","🌌"
    ],
    "🍕 Food": [
      "🍏","🍎","🍐","🍊","🍋","🍌","🍍","🥭","🍓","🍇",
      "🍈","🍒","🍑","🥝","🍅","🫒","🥥","🥑","🍆","🥔",
      "🥕","🌽","🌶️","🫑","🥒","🥬","🥦","🧄","🧅","🍄",
      "🥜","🫘","🌰","🍞","🥐","🥖","🫓","🥨","🥯","🧀",
      "🥚","🍳","🧈","🥞","🧇","🥓","🥩","🍗","🍖","🌭",
      "🍔","🍟","🍕","🫔","🌮","🌯","🥙","🧆","🥚","🍱",
      "🍣","🍛","🍜","🍝","🍠","🍢","🍡","🍧","🍨","🍦",
      "🥧","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩"
    ],
    "⚽ Activities": [
      "⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱",
      "🏓","🏸","🏒","🏑","🥍","🏏","🪃","🥅","⛳","🪁",
      "🎣","🤿","🎽","🎿","🛷","🥌","🎯","🎱","🎮","🕹️",
      "🎲","♟️","🎭","🎨","🎬","🎤","🎧","🎼","🎵","🎶",
      "🎷","🪗","🎸","🎹","🎺","🎻","🥁","🪘","🎙️","🎚️",
      "🏆","🥇","🥈","🥉","🏅","🎖️","🎗️","🎫","🎟️","🎪",
      "🤹","🎠","🎡","🎢","🎭","🎨","🖼️","🎰","🚂","✈️"
    ],
    "🚗 Travel": [
      "🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐",
      "🛻","🚚","🚛","🚜","🦯","🦽","🦼","🛺","🚲","🛴",
      "🛵","🏍️","🚨","🚔","🚍","🚘","🚖","🛸","🚁","🛶",
      "⛵","🚤","🛥️","🛳️","⛴️","🚢","✈️","🛩️","🛫","🛬",
      "💺","🪂","🚀","🛸","🚉","🚊","🚞","🚝","🚄","🚅",
      "🚈","🚂","🚆","🚇","🚃","🚋","🚟","🚠","🚡","🚖",
      "🏠","🏡","🏢","🏣","🏤","🏥","🏦","🏨","🏩","🏪",
      "🏫","🏬","🏭","🏯","🏰","💒","🗼","🗽","⛪","🕌"
    ],
    "💡 Objects": [
      "⌚","📱","💻","⌨️","🖥️","🖨️","🖱️","🖲️","💽","💾",
      "💿","📀","📷","📸","📹","🎥","📽️","🎞️","📞","☎️",
      "📟","📠","📺","📻","🧭","⏱️","⏲️","⏰","🕰️","⌛",
      "⏳","📡","🔋","🔌","💡","🔦","🕯️","🪔","🧯","🛢️",
      "💵","💴","💶","💷","💸","💳","🪙","💰","💹","📈",
      "📉","📊","📋","📌","📍","✂️","🗃️","🗄️","🗑️","🔒",
      "🔓","🔏","🔐","🔑","🗝️","🔨","🪓","⛏️","⚒️","🛠️",
      "🗡️","⚔️","🛡️","🪚","🔧","🪛","🔩","⚙️","🗜️","🔗"
    ],
    "❤️ Symbols": [
      "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔",
      "❤️‍🔥","❤️‍🩹","💕","💞","💓","💗","💖","💘","💝","💟",
      "☮️","✝️","☪️","🕉️","☸️","✡️","🔯","🕎","☯️","☦️",
      "🛐","⛎","♈","♉","♊","♋","♌","♍","♎","♏",
      "♐","♑","♒","♓","🆔","⚛️","🈳","🈹","🈚","🈸",
      "🈺","🈷️","✴️","🆚","💮","🉐","㊙️","㊗️","🈴","🈵",
      "🔴","🟠","🟡","🟢","🔵","🟣","⚫","⚪","🟤","🔶",
      "🔷","🔸","🔹","🔺","🔻","💠","🔘","🔳","🔲","▪️"
    ],
    "🚩 Flags": [
      "🏁","🚩","🎌","🏴","🏳️","🏳️‍🌈","🏳️‍⚧️","🏴‍☠️",
      "🇺🇸","🇬🇧","🇨🇦","🇦🇺","🇩🇪","🇫🇷","🇯🇵","🇨🇳",
      "🇮🇳","🇧🇷","🇲🇽","🇷🇺","🇰🇷","🇮🇹","🇪🇸","🇵🇹",
      "🇳🇱","🇸🇪","🇳🇴","🇩🇰","🇫🇮","🇨🇭","🇦🇹","🇧🇪",
      "🇵🇱","🇨🇿","🇭🇺","🇷🇴","🇺🇦","🇹🇷","🇸🇦","🇦🇪",
      "🇮🇱","🇮🇷","🇮🇶","🇵🇰","🇧🇩","🇹🇭","🇻🇳","🇵🇭",
      "🇮🇩","🇲🇾","🇸🇬","🇳🇿","🇿🇦","🇳🇬","🇰🇪","🇪🇬",
      "🇦🇷","🇨🇱","🇵🇪","🇨🇴","🇻🇪","🇺🇾","🇵🇾","🇧🇴"
    ]
  };

  const EMOJI_KEYWORDS = {
    "😀": "grinning face smile happy",
    "😁": "beaming grin smile happy teeth",
    "😂": "tears joy laugh crying funny lol",
    "🤣": "rofl rolling floor laughing",
    "😃": "big eyes smile happy grin",
    "😄": "smile eyes happy grin",
    "😅": "sweat nervous smile awkward",
    "😆": "laugh grin squint smile",
    "😉": "wink face",
    "😊": "smile happy blush",
    "😋": "yum tongue food",
    "😎": "cool sunglasses smiling",
    "😍": "heart eyes love adore",
    "🥰": "hearts love smiling",
    "😘": "kiss face love blow",
    "🤩": "star eyes excited wow amazed",
    "😗": "kiss whistling",
    "😙": "kiss smiling",
    "😚": "kiss closed eyes",
    "🙂": "slightly smiling",
    "🤗": "hugging hug",
    "🤭": "hand over mouth giggle oops",
    "🤫": "shushing quiet ssh hush",
    "🤔": "thinking hmm ponder",
    "😐": "neutral expressionless",
    "😑": "expressionless blank",
    "😶": "no mouth silent",
    "🙄": "eye roll annoyed",
    "😏": "smirk sly",
    "😣": "persevering struggling",
    "😥": "sad relieved disappointed",
    "😮": "open mouth surprised wow",
    "🤐": "zipper mouth zip",
    "😯": "hushed surprised",
    "😪": "sleepy tired",
    "😫": "tired weary",
    "🥱": "yawn sleepy tired bored",
    "😴": "sleeping zzz tired",
    "😌": "relieved peaceful",
    "😛": "tongue out playful",
    "😜": "wink tongue playful",
    "😝": "tongue squint",
    "🤤": "drooling hungry",
    "😒": "unamused disapprove",
    "😓": "downcast sweat",
    "😔": "pensive sad",
    "😕": "confused worried",
    "🙃": "upside down silly sarcastic",
    "🤑": "money mouth rich",
    "😲": "astonished shocked wow",
    "☹️": "frowning sad unhappy",
    "🙁": "slightly frowning sad",
    "😖": "confounded frustrated",
    "😞": "disappointed sad",
    "😟": "worried concerned",
    "😤": "steam nose triumph angry",
    "😢": "crying sad tear",
    "😭": "loudly crying sob tears",
    "😦": "frowning open mouth",
    "😧": "anguished worried",
    "😨": "fearful scared afraid",
    "😩": "weary tired frustrated",
    "🤯": "exploding head mind blown",
    "😬": "grimacing nervous awkward",
    "😰": "anxious sweat cold",
    "😱": "screaming fear shocked horror",
    "🥵": "hot overheated sweating",
    "🥶": "cold freezing",
    "😳": "flushed embarrassed shocked",
    "🤪": "zany crazy wild",
    "😵": "dizzy knocked out",
    "🥴": "woozy dizzy drunk",
    "😠": "angry mad",
    "😡": "pouting rage angry red",
    "🤬": "swearing cursing angry",
    "😷": "mask sick medical",
    "🤒": "thermometer sick fever ill",
    "🤕": "bandage hurt injured",
    "🤢": "nauseated sick vomit",
    "🤮": "vomiting sick",
    "🤧": "sneezing sick cold",
    "😇": "halo angel innocent",
    "🥳": "partying celebration hat",
    "🥸": "disguise glasses",
    "🤠": "cowboy hat western",
    "🤡": "clown",
    "🤥": "lying pinocchio",
    "🥺": "pleading puppy eyes begging",
    "🤓": "nerd glasses smart studious geek",
    "👋": "wave hello goodbye hand",
    "🤚": "raised back hand",
    "🖐️": "hand fingers splayed",
    "✋": "raised hand stop",
    "🖖": "vulcan salute spock",
    "👌": "ok perfect",
    "🤌": "pinched fingers italian",
    "🤏": "pinching hand small",
    "✌️": "victory peace",
    "🤞": "crossed fingers luck",
    "🤟": "love you gesture",
    "🤘": "sign of horns rock metal",
    "🤙": "call me shaka hang loose",
    "👈": "pointing left backhand",
    "👉": "pointing right backhand",
    "👆": "pointing up",
    "🖕": "middle finger rude",
    "👇": "pointing down",
    "☝️": "pointing up index",
    "👍": "thumbs up like good yes",
    "👎": "thumbs down dislike no bad",
    "✊": "raised fist",
    "👊": "oncoming fist punch",
    "🤛": "left fist bump",
    "🤜": "right fist bump",
    "👏": "clapping applause",
    "🙌": "raising hands celebrate",
    "👐": "open hands",
    "🤲": "palms up together",
    "🤝": "handshake deal",
    "🙏": "folded hands pray please thank",
    "✍️": "writing pen",
    "💅": "nail polish manicure",
    "🤳": "selfie phone",
    "💪": "flexed muscle strong arm",
    "👶": "baby infant",
    "👦": "boy child",
    "👧": "girl child",
    "👨": "man adult",
    "👩": "woman adult",
    "👴": "old man elderly",
    "👵": "old woman elderly",
    "🐶": "dog face pet",
    "🐱": "cat face pet",
    "🐭": "mouse face",
    "🐹": "hamster pet",
    "🐰": "rabbit face bunny",
    "🦊": "fox",
    "🐻": "bear face",
    "🐼": "panda face",
    "🐨": "koala",
    "🐯": "tiger face",
    "🦁": "lion face",
    "🐮": "cow face",
    "🐷": "pig face",
    "🐸": "frog face",
    "🐵": "monkey face",
    "🙈": "see no evil monkey",
    "🙉": "hear no evil monkey",
    "🙊": "speak no evil monkey",
    "🐔": "chicken hen",
    "🐧": "penguin bird",
    "🐦": "bird",
    "🦆": "duck",
    "🦅": "eagle",
    "🦉": "owl",
    "🦇": "bat",
    "🐺": "wolf",
    "🐗": "boar pig wild",
    "🐴": "horse face",
    "🦄": "unicorn",
    "🐝": "bee honeybee",
    "🐛": "bug caterpillar",
    "🦋": "butterfly",
    "🐌": "snail slow",
    "🐞": "ladybug beetle",
    "🐜": "ant",
    "🐙": "octopus",
    "🦑": "squid",
    "🐬": "dolphin",
    "🐳": "whale",
    "🐋": "whale big",
    "🦈": "shark",
    "🐊": "crocodile",
    "🐅": "tiger",
    "🦒": "giraffe",
    "🐘": "elephant",
    "🐕": "dog",
    "🐈": "cat",
    "🐓": "rooster",
    "🦃": "turkey",
    "🦜": "parrot",
    "🐇": "rabbit bunny",
    "🐿️": "chipmunk squirrel",
    "🦔": "hedgehog",
    "🌸": "cherry blossom flower pink spring",
    "🌼": "blossom flower yellow",
    "🌻": "sunflower yellow",
    "🌹": "rose flower red love",
    "🌺": "hibiscus flower",
    "🌷": "tulip flower",
    "💐": "bouquet flowers",
    "🌱": "seedling plant sprout",
    "🌲": "evergreen tree pine",
    "🌳": "deciduous tree",
    "🌴": "palm tree tropical",
    "🌵": "cactus desert",
    "🍀": "four leaf clover lucky",
    "🌿": "herb plant green",
    "☘️": "shamrock clover lucky irish",
    "🍃": "leaf wind",
    "🍂": "fallen leaf autumn",
    "🍁": "maple leaf canada autumn fall",
    "🍄": "mushroom fungus",
    "🌾": "sheaf rice grain",
    "💧": "droplet water",
    "💦": "sweat droplets water splash",
    "🌊": "wave water ocean sea",
    "🌈": "rainbow",
    "☀️": "sun sunny bright",
    "⛅": "partly cloudy sun cloud",
    "🌧️": "rain cloud rainy",
    "⛈️": "thunder storm lightning",
    "❄️": "snowflake cold winter",
    "☃️": "snowman winter cold",
    "⛄": "snowman without snow",
    "🔥": "fire flame hot",
    "⚡": "lightning bolt electric",
    "🌙": "crescent moon night",
    "🌕": "full moon",
    "⭐": "star",
    "🌟": "glowing star",
    "✨": "sparkles magic",
    "🍎": "red apple fruit",
    "🍊": "tangerine orange fruit",
    "🍋": "lemon fruit sour",
    "🍌": "banana fruit",
    "🍍": "pineapple fruit tropical",
    "🍓": "strawberry fruit red",
    "🍇": "grapes fruit purple",
    "🍒": "cherries fruit red",
    "🍑": "peach fruit",
    "🥝": "kiwi fruit",
    "🍅": "tomato red",
    "🥑": "avocado",
    "🌽": "corn maize ear",
    "🌶️": "hot pepper chili spicy",
    "🥦": "broccoli vegetable",
    "🧄": "garlic",
    "🧅": "onion",
    "🍞": "bread loaf",
    "🥐": "croissant pastry french",
    "🧀": "cheese",
    "🥚": "egg",
    "🍳": "cooking fried egg pan",
    "🥞": "pancakes breakfast",
    "🥓": "bacon meat",
    "🍗": "poultry leg chicken",
    "🍖": "meat bone",
    "🌭": "hotdog sausage",
    "🍔": "hamburger burger",
    "🍟": "fries chips french",
    "🍕": "pizza slice",
    "🌮": "taco mexican",
    "🌯": "burrito wrap",
    "🍱": "bento box japanese",
    "🍣": "sushi japanese fish",
    "🍜": "steaming bowl noodles ramen",
    "🍝": "spaghetti pasta",
    "🧁": "cupcake cake sweet",
    "🍰": "cake slice birthday",
    "🎂": "birthday cake",
    "🍩": "donut doughnut sweet",
    "🍪": "cookie biscuit sweet",
    "🍫": "chocolate bar sweet candy",
    "🍬": "candy sweet",
    "🍭": "lollipop candy sweet",
    "🍺": "beer mug drink alcohol",
    "🍻": "clinking beer mugs cheers",
    "🍷": "wine glass drink",
    "🍸": "cocktail drink",
    "🍹": "tropical drink cocktail",
    "☕": "coffee hot drink",
    "🧃": "juice box drink",
    "🥤": "cup straw drink soda",
    "🧋": "bubble tea boba drink",
    "🍵": "teacup tea hot",
    "🥂": "clinking glasses champagne cheers toast",
    "🍾": "champagne bottle celebrate",
    "⚽": "soccer football sport",
    "🏀": "basketball sport",
    "🏈": "american football sport",
    "⚾": "baseball sport",
    "🎾": "tennis sport",
    "🏐": "volleyball sport",
    "🏉": "rugby football sport",
    "🎱": "pool billiards eight ball",
    "🏓": "ping pong table tennis",
    "🏸": "badminton sport",
    "🏒": "ice hockey sport",
    "⛳": "golf flag hole",
    "🎣": "fishing rod sport",
    "🤿": "diving mask snorkel",
    "🎽": "running shirt sport",
    "🎿": "skis snow winter sport",
    "🥌": "curling stone sport",
    "🎯": "bullseye target dart",
    "🎮": "video game controller gaming",
    "🕹️": "joystick game",
    "🎲": "dice game chance",
    "♟️": "chess pawn game",
    "🎭": "performing arts theatre drama",
    "🎨": "art palette painting",
    "🎬": "clapper film movie",
    "🎤": "microphone singing karaoke",
    "🎧": "headphones music audio",
    "🎼": "musical score sheet music",
    "🎵": "music note song",
    "🎶": "music notes song",
    "🎷": "saxophone jazz music",
    "🎸": "guitar music rock",
    "🎹": "piano keyboard music",
    "🎺": "trumpet music",
    "🎻": "violin music",
    "🥁": "drum music",
    "🏆": "trophy winner prize gold",
    "🥇": "gold medal first winner",
    "🥈": "silver medal second",
    "🥉": "bronze medal third",
    "🎖️": "military medal",
    "🎗️": "ribbon reminder",
    "🎫": "ticket admission",
    "🎟️": "admission ticket event",
    "🚗": "car automobile red",
    "🚕": "taxi cab",
    "🚙": "suv recreational vehicle",
    "🚌": "bus public transport",
    "🏎️": "racing car formula fast",
    "🚓": "police car",
    "🚑": "ambulance emergency medical",
    "🚒": "fire engine truck",
    "🚐": "minibus van",
    "🚲": "bicycle bike cycling",
    "🛴": "scooter kick",
    "🛵": "motor scooter moped",
    "🏍️": "motorcycle motorbike",
    "✈️": "airplane plane flight travel",
    "🚀": "rocket space launch",
    "🛸": "flying saucer ufo alien",
    "🚁": "helicopter",
    "⛵": "sailboat sailing",
    "🚢": "ship cruise boat",
    "🚉": "station train",
    "🚂": "locomotive steam train",
    "🚄": "bullet train high speed",
    "🚇": "metro subway underground",
    "🏠": "house home",
    "🏡": "house garden home",
    "🏢": "office building",
    "🏥": "hospital medical",
    "🏦": "bank money",
    "🏨": "hotel",
    "🏪": "convenience store shop",
    "🏫": "school education",
    "🏰": "european castle",
    "🗼": "tokyo tower japan",
    "🗽": "statue of liberty usa new york",
    "⛪": "church religious",
    "🕌": "mosque islam",
    "🌍": "globe earth europe africa",
    "🌎": "globe earth americas",
    "🌏": "globe earth asia australia",
    "🗺️": "world map",
    "🧭": "compass navigation",
    "🏔️": "mountain snow",
    "🌋": "volcano eruption",
    "🏕️": "camping tent outdoor",
    "🏖️": "beach umbrella sand",
    "🏝️": "desert island tropical",
    "⌚": "watch time wrist",
    "📱": "mobile phone smartphone",
    "💻": "laptop computer",
    "⌨️": "keyboard computer",
    "🖥️": "desktop computer monitor",
    "🖨️": "printer",
    "🖱️": "computer mouse",
    "💾": "floppy disk save",
    "💿": "optical disk cd",
    "📀": "dvd disc",
    "📷": "camera photo",
    "📸": "camera flash photo",
    "📹": "video camera",
    "🎥": "movie camera film",
    "📺": "television tv",
    "📻": "radio",
    "📡": "satellite dish",
    "🔋": "battery power",
    "🔌": "electric plug power",
    "💡": "light bulb idea",
    "🔦": "flashlight torch",
    "🕯️": "candle light",
    "💵": "dollar banknote money",
    "💰": "money bag rich",
    "💳": "credit card payment",
    "💹": "chart trending money",
    "📈": "chart increasing up growth",
    "📉": "chart decreasing down loss",
    "📊": "bar chart statistics",
    "📋": "clipboard notes",
    "📌": "pushpin location",
    "📍": "round pushpin location map",
    "✂️": "scissors cut",
    "🔒": "locked security closed",
    "🔓": "unlocked open security",
    "🔑": "key lock",
    "🗝️": "old key",
    "🔨": "hammer tool",
    "⚒️": "hammer pick tools",
    "🛠️": "hammer wrench tools",
    "🔧": "wrench tool repair",
    "🔩": "nut bolt",
    "⚙️": "gear settings",
    "🔗": "link chain",
    "📎": "paperclip",
    "📏": "ruler straight",
    "📐": "ruler triangle",
    "✏️": "pencil write edit",
    "✒️": "pen black nib write",
    "🖊️": "pen write",
    "📝": "memo note write",
    "📖": "open book read",
    "📚": "books library",
    "📰": "newspaper news",
    "🗞️": "newspaper rolled news",
    "📄": "page document",
    "📃": "page curl document",
    "📑": "bookmark tabs document",
    "🔖": "bookmark save",
    "🏷️": "label tag price",
    "💊": "pill medicine drug",
    "🩺": "stethoscope doctor medical",
    "🔬": "microscope science lab",
    "🔭": "telescope stars space",
    "🧪": "test tube science experiment",
    "🧫": "petri dish science",
    "🧬": "dna genetics science",
    "🩹": "bandage wound",
    "🩻": "xray medical",
    "🚿": "shower bath",
    "🛁": "bathtub bath",
    "🪥": "toothbrush dental",
    "🧴": "lotion bottle",
    "🧷": "safety pin",
    "🧹": "broom sweep clean",
    "🧺": "basket laundry",
    "🧻": "toilet paper roll",
    "🪣": "bucket",
    "🧼": "soap clean wash",
    "🫧": "bubbles soap",
    "🪒": "razor shave",
    "🧽": "sponge clean",
    "❤️": "red heart love",
    "🧡": "orange heart love",
    "💛": "yellow heart love",
    "💚": "green heart love",
    "💙": "blue heart love",
    "💜": "purple heart love",
    "🖤": "black heart love",
    "🤍": "white heart love",
    "🤎": "brown heart love",
    "💔": "broken heart sad",
    "❤️‍🔥": "heart on fire passion love",
    "💕": "two hearts love",
    "💞": "revolving hearts love",
    "💓": "beating heart love pulse",
    "💗": "growing heart love",
    "💖": "sparkling heart love",
    "💘": "heart arrow cupid love",
    "💝": "heart ribbon love gift",
    "☮️": "peace symbol",
    "✝️": "cross christian",
    "☪️": "star crescent islam",
    "🕉️": "om hindu",
    "✡️": "star of david jewish",
    "☯️": "yin yang balance",
    "🆘": "sos help emergency",
    "🆗": "ok button",
    "🆙": "up button",
    "🆕": "new button",
    "🆓": "free button",
    "🔴": "red circle",
    "🟠": "orange circle",
    "🟡": "yellow circle",
    "🟢": "green circle",
    "🔵": "blue circle",
    "🟣": "purple circle",
    "⚫": "black circle",
    "⚪": "white circle",
    "🟤": "brown circle",
    "🔶": "orange diamond large",
    "🔷": "blue diamond large",
    "🔸": "orange diamond small",
    "🔹": "blue diamond small",
    "🔺": "red triangle up",
    "🔻": "red triangle down",
    "💠": "diamond blue",
    "✅": "check mark button yes",
    "❎": "cross mark button no",
    "❓": "question red",
    "❗": "exclamation red",
    "💯": "hundred points perfect score",
    "🔞": "no one under eighteen adult",
    "📵": "no mobile phones",
    "🚫": "prohibited no forbidden",
    "⭕": "hollow red circle",
    "❌": "cross mark no wrong x",
    "🔱": "trident emblem",
    "⚜️": "fleur de lis",
    "🔰": "japanese symbol beginner",
    "♻️": "recycling environment green",
    "✔️": "check mark tick yes",
    "🔝": "top arrow",
    "🆒": "cool button",
    "🔔": "bell notification alert",
    "🔕": "bell with slash mute",
    "📣": "megaphone announcement",
    "📢": "loudspeaker announcement",
    "💬": "speech bubble chat",
    "💭": "thought balloon thinking",
    "🗯️": "anger bubble mad",
    "🌐": "globe internet world",
    "⚠️": "warning caution alert",
    "🚧": "construction warning",
    "🚦": "traffic light signal",
    "🚥": "horizontal traffic light",
    "🔁": "repeat loop",
    "🔂": "repeat single",
    "▶️": "play button start",
    "⏸️": "pause button",
    "⏹️": "stop button",
    "⏺️": "record button",
    "⏭️": "next track skip",
    "⏮️": "last track back",
    "🔀": "shuffle random",
    "🔃": "clockwise arrows refresh",
    "🔄": "counterclockwise refresh",
    "🔇": "muted speaker silent",
    "🔈": "speaker low volume",
    "🔉": "speaker medium volume",
    "🔊": "speaker high volume loud",
    "📳": "vibration mode phone",
    "📴": "mobile phone off",
  };



  /* ─────────────────────────────────────────
     STYLES
  ───────────────────────────────────────── */
  const STYLES = `
    #twisted-emoji-picker-overlay {
      position: fixed;
      inset: 0;
      z-index: 9998;
      background: transparent;
    }
    #twisted-emoji-picker-panel {
      position: fixed;
      bottom: 60px;
      right: 8px;
      width: min(360px, 96vw);
      max-height: 70vh;
      background: var(--secondary-color, #1e1e2e);
      border: 1px solid var(--border-color, #444);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      font-family: sans-serif;
      touch-action: none;
    }
    #tep-drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 7px 0 5px;
      cursor: grab;
      flex-shrink: 0;
      user-select: none;
      -webkit-user-select: none;
    }
    #tep-drag-handle:active { cursor: grabbing; }
    #tep-drag-pill {
      width: 36px;
      height: 4px;
      border-radius: 2px;
      background: var(--border-color, #555);
      opacity: 0.7;
    }
    #tep-header {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 2px 10px 6px;
      border-bottom: 1px solid var(--border-color, #444);
      flex-shrink: 0;
    }
    #tep-search {
      flex: 1;
      background: var(--primary-color, #111);
      border: 1px solid var(--border-color, #444);
      border-radius: 6px;
      padding: 5px 10px;
      color: var(--primary-text-color, #eee);
      font-size: 14px;
      outline: none;
    }
    #tep-search::placeholder { color: var(--secondary-text-color, #888); }
    #tep-close-btn {
      background: none;
      border: none;
      color: var(--primary-text-color, #eee);
      font-size: 18px;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      line-height: 1;
    }
    #tep-close-btn:active { background: var(--active-color, rgba(255,255,255,0.1)); }
    #tep-tabs {
      display: flex;
      overflow-x: auto;
      gap: 2px;
      padding: 4px 8px;
      border-bottom: 1px solid var(--border-color, #444);
      flex-shrink: 0;
      scrollbar-width: none;
    }
    #tep-tabs::-webkit-scrollbar { display: none; }
    .tep-tab {
      background: none;
      border: none;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 16px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background 0.15s;
      line-height: 1.3;
    }
    .tep-tab:active, .tep-tab.active {
      background: var(--accent-color, #6c63ff);
    }
    #tep-grid-wrapper {
      overflow-y: auto;
      flex: 1;
      padding: 6px 8px 8px;
    }
    #tep-category-label {
      font-size: 11px;
      color: var(--secondary-text-color, #888);
      padding: 4px 2px 2px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    #tep-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(38px, 1fr));
      gap: 2px;
    }
    .tep-emoji-btn {
      background: none;
      border: none;
      border-radius: 6px;
      font-size: 22px;
      cursor: pointer;
      padding: 4px 2px;
      text-align: center;
      line-height: 1.2;
      transition: background 0.1s, transform 0.1s;
      -webkit-tap-highlight-color: transparent;
    }
    .tep-emoji-btn:active {
      background: var(--accent-color, #6c63ff);
      transform: scale(1.3);
    }
    #tep-recent-section {
      margin-bottom: 4px;
    }
    #tep-recents-label {
      font-size: 11px;
      color: var(--secondary-text-color, #888);
      padding: 2px 2px 2px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    #tep-recents-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(38px, 1fr));
      gap: 2px;
      margin-bottom: 6px;
    }
    #tep-no-results {
      color: var(--secondary-text-color, #888);
      text-align: center;
      padding: 20px;
      font-size: 13px;
    }
  `;

  /* ─────────────────────────────────────────
     STATE
  ───────────────────────────────────────── */
  let panel = null;
  let overlay = null;
  let styleEl = null;
  let currentCategory = Object.keys(EMOJI_DATA)[0];
  let recents = [];
  let sideButtonInstance = null;

  /* ─────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────── */
  function insertEmoji(emoji) {
    const editor = editorManager.editor;
    if (!editor) return;
    editor.session.insert(editor.getCursorPosition(), emoji);
    editor.focus();
    // track recents (max 20, no dupes)
    recents = [emoji, ...recents.filter(e => e !== emoji)].slice(0, 20);
  }

  function buildEmojiButton(emoji, closeAfter = true) {
    const btn = document.createElement('button');
    btn.className = 'tep-emoji-btn';
    btn.textContent = emoji;
    btn.setAttribute('title', emoji);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      insertEmoji(emoji);
      if (closeAfter) hidePanel();
    });
    return btn;
  }

  function renderCategory(cat) {
    const wrapper = document.getElementById('tep-grid-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = '';

    // Recents strip
    if (recents.length > 0) {
      const sec = document.createElement('div');
      sec.id = 'tep-recent-section';
      const lbl = document.createElement('div');
      lbl.id = 'tep-recents-label';
      lbl.textContent = '🕐 Recently Used';
      const grid = document.createElement('div');
      grid.id = 'tep-recents-grid';
      recents.forEach(e => grid.appendChild(buildEmojiButton(e)));
      sec.appendChild(lbl);
      sec.appendChild(grid);
      wrapper.appendChild(sec);
    }

    const lbl = document.createElement('div');
    lbl.id = 'tep-category-label';
    lbl.textContent = cat;
    wrapper.appendChild(lbl);

    const grid = document.createElement('div');
    grid.id = 'tep-grid';
    (EMOJI_DATA[cat] || []).forEach(e => grid.appendChild(buildEmojiButton(e)));
    wrapper.appendChild(grid);
  }

  function renderSearch(query) {
    const wrapper = document.getElementById('tep-grid-wrapper');
    if (!wrapper) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      renderCategory(currentCategory);
      return;
    }

    // Search by keyword map first, then fall back to all emojis
    const allEmojis = Object.values(EMOJI_DATA).flat();
    const results = allEmojis.filter(e => {
      const keywords = EMOJI_KEYWORDS[e] || '';
      return keywords.toLowerCase().includes(q) || e.includes(q);
    });

    wrapper.innerHTML = '';
    if (results.length === 0) {
      wrapper.innerHTML = '<div id="tep-no-results">No emojis found 😢</div>';
      return;
    }

    const lbl = document.createElement('div');
    lbl.id = 'tep-category-label';
    lbl.textContent = `Results (${results.length})`;
    wrapper.appendChild(lbl);

    const grid = document.createElement('div');
    grid.id = 'tep-grid';
    results.forEach(e => grid.appendChild(buildEmojiButton(e)));
    wrapper.appendChild(grid);
  }

  /* ─────────────────────────────────────────
     PANEL BUILD / SHOW / HIDE
  ───────────────────────────────────────── */
  function buildPanel() {
    // Overlay (tap-outside to close)
    overlay = document.createElement('div');
    overlay.id = 'twisted-emoji-picker-overlay';
    overlay.addEventListener('click', hidePanel);

    // Panel shell
    panel = document.createElement('div');
    panel.id = 'twisted-emoji-picker-panel';
    panel.addEventListener('click', e => e.stopPropagation());

    // ── Drag handle ──
    const dragHandle = document.createElement('div');
    dragHandle.id = 'tep-drag-handle';
    const dragPill = document.createElement('div');
    dragPill.id = 'tep-drag-pill';
    dragHandle.appendChild(dragPill);

    // Drag logic (touch + mouse)
    let dragStartX = 0, dragStartY = 0, panelStartLeft = 0, panelStartTop = 0;

    function onDragStart(e) {
      const touch = e.touches ? e.touches[0] : e;
      dragStartX = touch.clientX;
      dragStartY = touch.clientY;
      const rect = panel.getBoundingClientRect();
      panelStartLeft = rect.left;
      panelStartTop = rect.top;
      // Switch from bottom/right anchoring to top/left so we can freely position
      panel.style.bottom = 'auto';
      panel.style.right = 'auto';
      panel.style.left = panelStartLeft + 'px';
      panel.style.top = panelStartTop + 'px';
      panel.style.transition = 'none';
      e.preventDefault();
    }

    function onDragMove(e) {
      const touch = e.touches ? e.touches[0] : e;
      const dx = touch.clientX - dragStartX;
      const dy = touch.clientY - dragStartY;
      const newLeft = Math.max(0, Math.min(window.innerWidth - 60, panelStartLeft + dx));
      const newTop = Math.max(0, Math.min(window.innerHeight - 60, panelStartTop + dy));
      panel.style.left = newLeft + 'px';
      panel.style.top = newTop + 'px';
      e.preventDefault();
    }

    function onDragEnd() {
      panel.style.transition = '';
    }

    dragHandle.addEventListener('touchstart', onDragStart, { passive: false });
    dragHandle.addEventListener('touchmove', onDragMove, { passive: false });
    dragHandle.addEventListener('touchend', onDragEnd);
    dragHandle.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', (e) => {
      if (panel && panel.style.transition === 'none') onDragMove(e);
    });
    document.addEventListener('mouseup', onDragEnd);

    // ── Header: search + close ──
    const header = document.createElement('div');
    header.id = 'tep-header';

    const searchInput = document.createElement('input');
    searchInput.id = 'tep-search';
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search emojis...';
    searchInput.autocomplete = 'off';
    searchInput.autocorrect = 'off';
    searchInput.spellcheck = false;
    searchInput.addEventListener('input', () => {
      renderSearch(searchInput.value);
    });

    const closeBtn = document.createElement('button');
    closeBtn.id = 'tep-close-btn';
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Close emoji picker');
    closeBtn.addEventListener('click', hidePanel);

    header.appendChild(searchInput);
    header.appendChild(closeBtn);

    // ── Category tabs ──
    const tabs = document.createElement('div');
    tabs.id = 'tep-tabs';

    Object.keys(EMOJI_DATA).forEach(cat => {
      const tab = document.createElement('button');
      tab.className = 'tep-tab' + (cat === currentCategory ? ' active' : '');
      tab.textContent = cat.split(' ')[0]; // just the emoji icon
      tab.setAttribute('title', cat);
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCategory = cat;
        searchInput.value = '';
        // update active tab
        tabs.querySelectorAll('.tep-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderCategory(cat);
      });
      tabs.appendChild(tab);
    });

    // ── Grid wrapper ──
    const gridWrapper = document.createElement('div');
    gridWrapper.id = 'tep-grid-wrapper';

    panel.appendChild(dragHandle);
    panel.appendChild(header);
    panel.appendChild(tabs);
    panel.appendChild(gridWrapper);

    document.body.appendChild(overlay);
    document.body.appendChild(panel);
  }

  function showPanel() {
    if (panel) { hidePanel(); return; } // toggle
    buildPanel();
    renderCategory(currentCategory);

    // small animation
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(12px)';
    requestAnimationFrame(() => {
      panel.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
    });
  }

  function hidePanel() {
    if (panel) {
      panel.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(10px)';
      setTimeout(() => {
        panel && panel.remove();
        overlay && overlay.remove();
        panel = null;
        overlay = null;
      }, 160);
    }
  }

  /* ─────────────────────────────────────────
     PLUGIN INIT / UNMOUNT
  ───────────────────────────────────────── */
  const PLUGIN_ID = 'com.twistedfish.emoji-picker';

  function initSideButton() {
    if (window.__tepSideButtonDone) return;
    window.__tepSideButtonDone = true;
    try {
      const SideButton = acode.require('sideButton');
      if (!SideButton) return;
      const opts = {
        text: '🤓\nPicker',
        icon: 'emoji_emotions',
        onclick: showPanel,
        title: 'Emoji Picker',
      };
      let instance;
      try { instance = new SideButton(opts); } catch (_) {}
      if (!instance) { try { instance = SideButton(opts); } catch (_) {} }
      if (!instance) return;
      sideButtonInstance = instance;
      if (typeof sideButtonInstance.show === 'function') sideButtonInstance.show();
      else if (typeof sideButtonInstance.add === 'function') sideButtonInstance.add();
    } catch (_) {}
  }

  try { acode.setPluginInit(PLUGIN_ID, (baseUrl, $page, cache) => {
    try {
      styleEl = document.createElement('style');
      styleEl.id = 'twisted-emoji-picker-styles';
      styleEl.textContent = STYLES;
      document.head.appendChild(styleEl);
    } catch (_) {}

    try {
      editorManager.editor.commands.addCommand({
        name: 'twistedfish-emoji-picker',
        bindKey: { win: 'Ctrl-Alt-E', mac: 'Command-Alt-E' },
        exec: showPanel,
      });
    } catch (_) {}

    // Defer sideButton one tick to keep it off the critical init path
    setTimeout(initSideButton, 0);
  }); } catch (_) {}

  try {
    acode.setPluginUnmount(PLUGIN_ID, () => {
      try { hidePanel(); } catch (_) {}
      window.__tepSideButtonDone = false;
      try { if (styleEl) { styleEl.remove(); styleEl = null; } } catch (_) {}
      try {
        if (sideButtonInstance) {
          if (typeof sideButtonInstance.hide === 'function') sideButtonInstance.hide();
          else if (typeof sideButtonInstance.remove === 'function') sideButtonInstance.remove();
        }
        sideButtonInstance = null;
      } catch (_) {}
      try { editorManager.editor.commands.removeCommand('twistedfish-emoji-picker'); } catch (_) {}
    });
  } catch (_) {}

})();
