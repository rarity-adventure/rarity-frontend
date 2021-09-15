const img_path = (name: string) => '/img/classes/' + name + '.png'

export const ATTRIBUTES: { [k: string]: { name: string; description: string; url: string } } = {
    str: { name: 'strength', description: '', url: '' },
    dex: { name: 'dexterity', description: '', url: '' },
    con: { name: 'constitution', description: '', url: '' },
    int: { name: 'intelligence', description: '', url: '' },
    wis: { name: 'wisdom', description: '', url: '' },
    cha: { name: 'charisma', description: '', url: '' },
}
export const CLASSES_NAMES: { [k: string]: string } = {
    '1': 'barbarian',
    '2': 'bard',
    '3': 'cleric',
    '4': 'druid',
    '5': 'fighter',
    '6': 'monk',
    '7': 'paladin',
    '8': 'ranger',
    '9': 'rogue',
    '10': 'sorcerer',
    '11': 'wizard',
}
export const CLASSES_IMAGES: { [k: string]: string } = {
    '1': img_path('barbarian'),
    '2': img_path('bard'),
    '3': img_path('cleric'),
    '4': img_path('druid'),
    '5': img_path('fighter'),
    '6': img_path('monk'),
    '7': img_path('paladin'),
    '8': img_path('ranger'),
    '9': img_path('rogue'),
    '10': img_path('sorcerer'),
    '11': img_path('wizard'),
}
