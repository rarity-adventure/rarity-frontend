export const TAGS_WITH_VALUE: string[] = [
    'ID',
    'Price',
    'Level',
    'XP',
    'Str',
    'Dex',
    'Con',
    'Int',
    'Wis',
    'Cha',
    'Gold',
    'Materials',
]

export const TAGS_CLASSES: string[] = [
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Wizard',
]

export const TAG_SUGGESTIONS: string[] = TAGS_CLASSES.concat(TAGS_WITH_VALUE)

export function tag_to_variable(tag) {
    if (tag === 'id') {
        return 'summoner'
    } else if (tag === 'materials') {
        return 'cellar'
    } else {
        return tag
    }
}

export const TAG_VALUE_COMPARISONS: string[] = ['>', '<', '>=', '=>', '<=', '=<', '=']
