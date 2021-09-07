import barbarian from '../assets/classes/barbarian.png'
import bard from '../assets/classes/bard.png'
import cleric from '../assets/classes/cleric.png'
import druid from '../assets/classes/druid.png'
import fighter from '../assets/classes/fighter.png'
import monk from '../assets/classes/monk.png'
import paladin from '../assets/classes/paladin.png'
import ranger from '../assets/classes/ranger.png'
import rogue from '../assets/classes/rogue.png'
import sorcerer from '../assets/classes/sorcerer.png'
import wizard from '../assets/classes/wizard.png'

export const CLASSES: { [k: string]: { name: string; image: any } } = {
    '1': { name: 'Barbarian', image: barbarian },
    '2': { name: 'Bard', image: bard },
    '3': { name: 'Cleric', image: cleric },
    '4': { name: 'Druid', image: druid },
    '5': { name: 'Fighter', image: fighter },
    '6': { name: 'Monk', image: monk },
    '7': { name: 'Paladin', image: paladin },
    '8': { name: 'Ranger', image: ranger },
    '9': { name: 'Rogue', image: rogue },
    '10': { name: 'Sorcerer', image: sorcerer },
    '11': { name: 'Wizard', image: wizard },
}
