var horoscopeSignsOrdered = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
];

var horoscopeDates = {
    Aries: {
        start: new Date(1970, 2, 20),
        end: new Date(1970, 3, 20)
    },
    Taurus: {
        start: new Date(1970, 3, 20),
        end: new Date(1970, 4, 21)
    },
    Gemini: {
        start: new Date(1970, 4, 21),
        end: new Date(1970, 5, 21)
    },
    Cancer: {
        start: new Date(1970, 5, 21),
        end: new Date(1970, 6, 23)
    },
    Leo: {
        start: new Date(1970, 6, 23),
        end: new Date(1970, 7, 23)
    },
    Virgo: {
        start: new Date(1970, 7, 23),
        end: new Date(1970, 8, 23)
    },
    Libra: {
        start: new Date(1970, 8, 23),
        end: new Date(1970, 9, 23)
    },
    Scorpio: {
        start: new Date(1970, 9, 23),
        end: new Date(1970, 10, 22)
    },
    Sagittarius: {
        start: new Date(1970, 10, 22),
        end: new Date(1970, 11, 22)
    },
    Capricorn: {
        start: new Date(1970, 11, 22),
        end: new Date(1971, 0, 20)
    },
    Aquarius: {
        start: new Date(1970, 0, 20),
        end: new Date(1970, 1, 18)
    },
    Pisces: {
        start: new Date(1970, 1, 18),
        end: new Date(1970, 2, 20)
    }
}

var horoscopesText = {
    "Aquarius": [
        "_____s don't like labels, and may shy away from any adjective - even the good ones you might bestow upon them. ",
        "_____s have a strong sense of social justice and making the world a better place, and see themselves as just one link in an endless human chain.",
        "_____ is intellectual and analytical, but don't mistake these attributes for aloofness. _____s have deep passion, but they know jumping into something too quickly can cause more harm than good.",
        "_____s have energy, warmth, and a deep desire to get things done. They feel they're on the planet to change the world and they will do so. _____s are idealistic, and will never accept \"good enough\" until they truly believe it's good enough.",
        "_____s can sometimes seem as if they don't care about their individual relationships, or they are holding something else at a higher value. It's not personal, and it's not a bad thing.",
        "A _____ will never doubt you, even when you doubt yourself. Their ability to see the best in all people, even if people don't see those qualities in themselves. _____s can lift people up, lightening the mood in the process.",
    ],
    "Aries": [
        "_____ are the trailblazers. Passionate and independent, _____ will never do something just because everyone else is doing it - a _____ needs to be 100 percent committed to the task at hand. ",
        "Competitive to the max, the best way to motivate a _____ is to turn something into a contest. _____ will put everything they have (and then some) into winning.",
        "A _____ will always tell you what they're thinking, with a frankness that may occasionally border on rudeness. But even if a _____ seems overly blunt with their opinion, that's only because _____s value honesty above all else. ",
        "When it comes to love, _____ are all about initial attraction. They can sense chemistry in the first sentence uttered by a potential partner.",
        "Forthright and unabashed, a _____ will do everything in their power to go after someone they want. Sometimes, they need to learn how to slow down and foster long-term connections.",
        "Whether it's backpacking around the world, launching a business, or training for a marathon, once a _____ sets a goal, they will achieve it. They don't care what anyone else thinks, and can tune into their intuition and dreams in a heartbeat.",
        "_____s never need a plus one - they love their own company, and consider going solo to the movies a rare treat.",
        "The world according to a _____ makes so much sense that they have a hard time listening to, much less accepting, alternative viewpoints. Slowing down is also tough.",
        "Strong, adamant, and forged in fire, it's fitting that _____'s secret weapon is iron, one of the strongest elements. Weld, cast, machine, forge, temper, harden, or anneal it, iron can take on a seemingly limitless range of shapes and qualities.",
    ],
    "Cancer": [
        "_____s may seem prickly and standoffish at first meeting, once they make the decision to become friends with someone, that person has a friend for life.",
        "Most _____s have been called psychic at some point, and with good reason - _____ can often intuit relationships, ideas, and motivations before anyone has actually spoken.",
        "The _____ is above mind games and hates the thrill of the chase - if you love someone, why not say it now? It's not uncommon for _____ to fall into committed love after just a few days or weeks, and even though that decision is sudden, it can easily last a lifetime.",
        "_____ loves creating and needs some type of creative outlet, whether it's painting, writing, or even just reading. _____ also loves connecting to a higher power, and may find comfort in religion or spiritual practices.",
        "_____ is incredibly loyal, sometimes to a fault. _____s will go to the ends of the earth and even against their own beliefs to help someone they love.",
        "Learning how to step up for what they believe in - even if it means turning down or against a friend - is a lifelong lesson for _____.",
        "With off-the-charts emotional intelligence, _____ quickly cuts through the BS and noise to the heart of an issue. _____s don't need all the facts and figures to know the right course of action, and their ability to trust intuition without judgment can aid them well.",
        "While _____ easily and accurately reads situations when they're presented, he or she may not share those opinions with others. Speaking up is key, because turning inward with emotions means that those emotions may erupt unexpectedly.",
        "While many _____s probably get the message to \"be less emotional,\" the huge range and depths of _____s' emotions may in fact be their secret weapon.",
    ],
    "Capricorn": [
        "Smart, hardworking, and fully in control of their destiny, a _____ will always get what they set their mind to, in both personal and professional life - no excuses.",
        "Natural rule-followers, _____s thrive on order and love strict rules, hierarchies, and set ways to do things. Can a _____ think outside the box? Yes, they can, but they prefer when they have strict boundaries to constrain against.",
        "_____ needs to find a firm sense of self beyond how others perceive them, and recognize that racking up achievements is only one small part of their personality.",
        "_____s are loyal friends, and have a funny and sly sense of humor when you get to know them - it is fun drawing them out of their shells.",
        "_____ is intelligent, detail-oriented, and will not take no for an answer when they want something. Their hard working attitude is an inspiration to all, and they truly believe they can achieve anything with hard work.",
        "_____s can be incredibly hard on themselves, and just as hard on other people. They can hold grudges and hold other people in their lives to impossible standards.",
        "They believe that they truly can do anything, and they will dig in and get it done, no matter how exhausting or tedious the task. _____ will stay up all night if necessary and are almost superhuman in terms of being able to ignore exhaustion and laser focus on the task at hand.",
    ],
    "Gemini": [
        "Smart, passionate, and dynamic, _____ is known for having two different sides they can display to the world. Expert communicators, _____ is adept at blending into different groups based on the vibe and energy they perceive.",
        "Energetic and quick-witted, _____ never gets stuck in the past and doesn't ruminate on what might have been. Instead, they move forward with glass-half-full optimism and an ability to always look on the bright side - and land on their feet - in nearly any situation.",
        "_____ are in love with love, and they adore the ritual of it all, from those \"do they like me?\" butterflies to the anticipation of a back-and-forth text volley.",
        "Despite their unfair rep for being two-faced, once a _____ is in your life, they're loyal for life - but they aren't afraid to voice their opinion if they feel you're doing something they disagree with or if they perceive you as not being loyal to them.",
        "And even though _____ is easily the life of the party without trying, the _____ also have a deep emotional side that needs care and feeding.",
        "Equipped with almost uncanny emotional intelligence, _____ can easily read a room and know exactly what other people want to hear from them. They can easily shift their personality depending on mood, going from Friday night life of the party to Monday morning office superstar.",
        "That social chameleon rep can sometimes earn _____ a reputation as two-faced. Sometimes a _____ is more likely to talk to others about a conflict instead of approaching the person who's actually causing it.",
        "_____ is quick-witted and can read a room or situation in an almost supernatural way. Without saying very many words, a _____ soon knows who has an agenda, who's a good ally, and who may need someone to bolster them up.",
    ],
    "Leo": [
        "Bold, intelligent, warm, and courageous, _____ is a natural leader, ready to blaze a trail, vanquish injustice, and make a name for themselves along the way. Blessed with high self-esteem, _____s know that they possess enviable traits - and they're proud of them.",
        "But it's not all hard work for _____s. Intense and energetic, _____s thrive on social interactions and have no problem making friends - although pinning them down to spend time with you is another story.",
        "_____s are passionate in all pursuits, including relationships, and take it upon themselves to be the best partner you've ever had. They love grand gestures, and they want to show the world how attentive and caring they can be.",
        "Benevolent with their time and attention, _____s are never cliquey, always showing friendliness and politeness to everyone.",
        "A natural leader, _____'s very presence inspires others to be the best they can be. But with great power comes great responsibility. _____s love the pull of the limelight, and they're occasionally swayed by what other people want (or expect) them to do.",
        "_____s are well known for their loud roar. But learning to quiet down and listen is essential for _____s to reach their peak power - especially when they're hearing a voice that doesn't match their confidence and certainty.",
        "A giving nature. Most people assume that _____s are all about themselves. But appearances are deceiving. A _____'s secret weapon is his or her boundless capacity for love, affection, and generosity.",
    ],
    "Libra": [
        "Intelligent, kind, and always willing to put others before themselves, _____s value harmony in all forms. _____ adores a life that looks good.",
        "Working with detail-oriented signs can help _____s actually manifest their dreams into reality, especially in the workspace. But don't call out _____s for daydreaming - their imagination is one of their biggest assets.",
        "_____s believe that they're directing their own lives, and they take a big-picture approach in making that life look and feel the best it can be.",
        "When _____ falls in love, he or she falls hard, but this sign also recognizes that there's room for more than one grand love in his or her life. The Scales are pragmatic about love, realizing that different relationships often have different seasons.",
        "Although _____ appears self-confident to outsiders, he or she might struggle with insecurity, especially as it relates to personal identity, which sometimes feels mutable. This sign's lifelong question is: \"Who am I?\"",
        "_____ is fiercely attracted to intelligence, which is just as important as appearance when it comes to the partners they end up falling for.",
        "_____'s everyday vibe is this gentle reminder: \"Let's just all get along.\" For this sign, compromise is key.",
        "_____ is great at making everyone happy - but what good is that if _____s themselves don't feel fulfilled? They sometimes ignore what they want in favor of what makes everyone else happy - and this habit ends up backfiring in the long run.",
        "This sign has weaponized their imagination in the service of good. _____s' imagination is unmatched, and they can always come up with a new way of looking at an issue.",
    ],
    "Pisces": [
        "Smart, creative, and deeply intuitive, _____ can be close to psychic. _____ feel things deeply, and have incredibly strong gut reactions. A _____ \"knows\" things from deep within, and can often judge whether a person or situation is good or bad.",
        "_____ are sensitive, and get along well in small groups of people. Sometimes, a _____ may feel like they have an internal and external self, and they may need to spend a lot of time solo to recalibrate those two halves of themselves.",
        "_____ may seem quiet but they are incredibly strong and have a very strong sense of right and wrong. Their moral compass, along with their gut, guides them well. When a _____ speaks up, people listen.",
        "A _____ has a great gut and great intuition, which can guide them well, and help them make creative or intellectual leaps other people might not be able to see or consider.",
        "_____ can sometimes spend too much time in their heads, getting overly wrapped up in a problem and assuming there's no solution. _____ are always one of the first signs to lend an ear to others, but when it comes to asking for help, _____ can sometimes wall themselves off.",
        "The realization that life is so much more than what we see. _____ is in tune with the magic of everyday existence and can find beauty in all situations, even ones that may cause tears."
    ],
    "Sagittarius": [
        "Independent and strong-willed, _____ personalities are all about going off the beaten path. _____ isn't afraid to step away from the pack, and is a natural born leader who goes after what he or she wants, regardless of what other people think.",
        "_____ is open-hearted, generous, and big-spirited, but _____ is always truthful. Because of this, they may hurt others' feelings, or may be called out for not having tact or empathy. ",
        "In bed and in relationships, _____s are adventurous and giving, able to adeptly try new things or break down barriers. In bed, _____s love trying new positions, new toys, and making everything an adventure.",
        "_____ is a steadfast friend and a creative thinker; a great person to have on a work team, as they have infectious energy and enthusiasm. They aren't looking for constant feedback, and can take a project and run with it.",
        "_____ is adept at blazing their own paths, and can always go it alone. _____ doesn't need a roadmap, and can easily conceptualize ideas and opportunities that others may not easily see.",
        "_____ can sometimes be far too blunt, and put their own needs above others. You don't need to veer from your values, but sometimes, a white lie saves all. It can also be helpful to be part of the pack now and then.",
        "Their independence. _____s don't need other people's approval, opinions, or advice. A _____ loves hanging out with herself, and feels like doing things solo can only help her connect more to her deepest self.",
    ],
    "Scorpio": [
        "Passionate, independent, and unafraid to blaze their own trail no matter what others think, _____s make a statement wherever they go. They love debates, aren't afraid of controversy, and won't back down from a debate.",
        "A _____ can seem intimidating and somewhat closed off to those who don't know them well. But what people don't realize is that even though _____ may seem brusque, they also are very in tune with their emotions, and sometimes may find themselves caught up in their feelings.",
        "This leads to _____'s central conflict: Their feelings are what drives them and strengthens them, but their mutability can scare them and make them feel vulnerable and out of control.",
        "But once people get beyond the shell, they find a loyal, loving person whose passion knows no bounds. _____ dives into all life has to offer with 110% enthusiasm.",
        "In love, _____ can seem cautious at first, and may set up a series of \"tests\" for their potential partner, deciding to cross them off their list if they don't meet their demands.",
        "Blessed with a deep sense of self, _____ is always able to say exactly what's on their mind, even if it's not what people want to hear. _____ is forthright and honest, and those two characteristics commandeer a ton of respect, both at home and at work.",
        "_____ tries to hard to seem tough that they sometimes cut off their vulnerable side entirely, seeming prickly, uncaring, and cold to outsiders.",
        "It may not seem this way at first glance, watchful _____ can read a room very quickly and can clue into how everyone else is feeling.",
    ],
    "Taurus": [
        "Amazing friends, colleagues, and partners, _____s value honesty above all else and are proud that their personal relationships tend to be drama free. _____s get the reputation of being stubborn, but they're not always stuck in their ways.",
        "A _____ is never afraid to roll up those sleeves and get to work, and won't blink an eye at pulling an all-nighter to get the job done. But it's not all work for _____.",
        "When it comes to love, _____s are all about honesty, which is why a first date with a _____ may resemble a job interview. They're not being rude - they're built for partnerships and are simply trying to see if you're a good fit at the start.",
        "While _____ has an intense internal drive, they sometimes have trouble respecting authority, especially if asked to do something they think is pointless or should be done differently. Learning to be flexible and go with the flow can be an advantage to _____.",
        "Persistent and hardworking, once a _____ sets a goal, it will get done - despite any obstacles that may come up. While becoming friends with a _____ can be tough since they're so particular about who they want in their social circle, once you're in, you're in for life.",
        "Because _____s are so driven by their own internal compass, they sometimes have trouble pivoting to fulfill someone else's demands, which can lead to tough times at work or school. Learning to consider others' viewpoints is a lifelong lesson for all _____s.",
    ],
    "Virgo": [
        "Smart, sophisticated, and kind, _____ gets the job done without complaining. _____s are amazing friends, always there to lend a hand and also lend advice.",
        "_____ has a rich inner life, and can sometimes seem shy at first meeting. A _____ won't spill secrets right away, and it's important to earn a _____'s trust. But once you do, that _____ will be a friend for life.",
        "_____s expect perfection from themselves, and they may project those high standards on the other people in their life. A _____ hates when someone lets him or her down, even if it's minor and unavoidable, like a last-minute cancellation.",
        "_____s love and are inspired by beauty. They consider what they wear and how they decorate their house to be an extension of their personality.",
        "Intelligent and a lifelong learner, _____ loves trying new things, reading books, and learning about the world. They'll happily sign up for an adult-education course, and they consider an afternoon in bed with a book pretty much ideal.",
        "Graceful, harmonious, and obsessed with making things the very best they can be, _____ is notorious for being type A but that's only because this sign knows that everything good can be made great, and that everything great can be perfect.",
        "_____'s desire to have everything be perfect can manifest in frustration when things don't live up to those (sometimes unrealistic) expectations.",
        "_____ is incredibly hard working. When this sign wants something, they'll work for it. They're also good at making the most of things friends look to them to help them with a DIY project or redecorate their home.",
    ]
}