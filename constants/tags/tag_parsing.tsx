import { Skill } from '../codex/skills'

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
    } else if (tag === 'price') {
        return 'price_approx'
    } else if (tag === 'materials') {
        return 'cellar'
    } else if (tag === 'gold') {
        return 'gold_approx'
    } else {
        return tag
    }
}

export const TAG_VALUE_COMPARISONS: string[] = ['>', '<', '>=', '=>', '<=', '=<', '=', '==']

export const COMP_TO_POSTGRES: { [k: string]: string } = {
    '>': '_gt',
    '>=': '_gte',
    '=>': '_gte',
    '<': '_lt',
    '<=': '_lte',
    '=<': '_lte',
    '=': '_eq',
    '==': '_eq',
}
