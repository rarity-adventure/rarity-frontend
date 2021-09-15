export const ATTRIBUTES: { [k: string]: { name: string; description: string; url: string } } = {
    str: {
        name: 'strength',
        description:
            'Strength measures your character’s muscle and physical power. This ability is especially important for fighters, barbarians, paladins, rangers, and monks because it helps them prevail in combat.',
        url: 'https://www.d20srd.org/srd/theBasics.htm#strengthStr',
    },
    dex: {
        name: 'dexterity',
        description:
            'Dexterity measures hand-eye coordination, agility, reflexes, and balance. This ability is the most important one for rogues, but it’s also high on the list for characters who typically wear light or medium armor (rangers and barbarians) or no armor at all (monks, wizards, and sorcerers), and for anyone who wants to be a skilled archer.',
        url: 'https://www.d20srd.org/srd/theBasics.htm#dexterityDex',
    },
    con: {
        name: 'constitution',
        description:
            'Constitution represents your character’s health and stamina. A Constitution bonus increases a character’s hit points, so the ability is important for all classes.',
        url: 'https://www.d20srd.org/srd/theBasics.htm#constitutionCon',
    },
    int: {
        name: 'intelligence',
        description:
            'Intelligence determines how well your character learns and reasons. This ability is important for wizards because it affects how many spells they can cast, how hard their spells are to resist, and how powerful their spells can be. It’s also important for any character who wants to have a wide assortment of skills.',
        url: 'https://www.d20srd.org/srd/theBasics.htm#intelligenceInt',
    },
    wis: {
        name: 'wisdom',
        description:
            'Wisdom describes a character’s willpower, common sense, perception, and intuition. While Intelligence represents one’s ability to analyze information, Wisdom represents being in tune with and aware of one’s surroundings. Wisdom is the most important ability for clerics and druids, and it is also important for paladins and rangers. If you want your character to have acute senses, put a high score in Wisdom. Every creature has a Wisdom score.',
        url: 'https://www.d20srd.org/srd/theBasics.htm#wisdomWis',
    },
    cha: {
        name: 'charisma',
        description:
            'Charisma measures a character’s force of personality, persuasiveness, personal magnetism, ability to lead, and physical attractiveness. This ability represents actual strength of personality, not merely how one is perceived by others in a social setting. Charisma is most important for paladins, sorcerers, and bards. It is also important for clerics, since it affects their ability to turn undead. Every creature has a Charisma score.',
        url: 'https://www.d20srd.org/srd/theBasics.htm#charismaCha',
    },
}
