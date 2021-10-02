export const FEATS = {
    '1': {
        name: 'Acrobat',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Jump checks and Tumble checks.',
    },
    '2': {
        name: 'Agile',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Balance checks and Escape Artist checks.',
    },
    '3': {
        name: 'Alertness',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Listen checks and Spot checks.',
    },
    '4': {
        name: 'Animal Affinity',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Handle Animal checks and Ride checks.',
    },
    '5': {
        name: 'Armor Proficiency (Light)',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you wear a type of armor with which you are proficient, the armor check penalty for that armor applies only to Balance, Climb, Escape Artist, Hide, Jump, Move Silently, Sleight of Hand, and Tumble checks.',
    },
    '6': {
        name: 'Armor Proficiency (Medium)',
        prerequisites: true,
        prerequisites_feat: 5,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you wear a type of armor with which you are proficient, the armor check penalty for that armor applies only to Balance, Climb, Escape Artist, Hide, Jump, Move Silently, Sleight of Hand, and Tumble checks.',
    },
    '7': {
        name: 'Armor Proficiency (Heavy)',
        prerequisites: true,
        prerequisites_feat: 6,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you wear a type of armor with which you are proficient, the armor check penalty for that armor applies only to Balance, Climb, Escape Artist, Hide, Jump, Move Silently, Sleight of Hand, and Tumble checks.',
    },
    '8': {
        name: 'Athletic',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Climb checks and Swim checks.',
    },
    '9': {
        name: 'Spell Focus',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1614,
        prerequisites_level: 0,
        benefit:
            'Add +1 to the Difficulty Class for all saving throws against spells from the school of magic you select.',
    },
    '10': {
        name: 'Augment Summoning',
        prerequisites: true,
        prerequisites_feat: 9,
        prerequisites_class: 1614,
        prerequisites_level: 0,
        benefit:
            'Each creature you conjure with any summon spell gains a +4 enhancement bonus to Strength and Constitution for the duration of the spell that summoned it.',
    },
    '11': {
        name: 'Blind-Fight',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'In melee, every time you miss because of concealment, you can reroll your miss chance percentile roll one time to see if you actually hit. An invisible attacker gets no advantages related to hitting you in melee. That is, you dont lose your Dexterity bonus to Armor Class, and the attacker doesnt get the usual +2 bonus for being invisible. The invisible attackers bonuses do still apply for ranged attacks, however. You take only half the usual penalty to speed for being unable to see. Darkness and poor visibility in general reduces your speed to three-quarters normal, instead of one half.',
    },
    '12': {
        name: 'Brew Potion',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 3,
        benefit:
            'You can create a potion of any 3rd level or lower spell that you know and that targets one or more creatures. Brewing a potion takes one day. When you create a potion, you set the caster level, which must be sufficient to cast the spell in question and no higher than your own level. The base price of a potion is its spell level * its caster level * 50 gp. To brew a potion, you must spend 1/25 of this base price in XP and use up raw materials costing one half this base price. When you create a potion, you make any choices that you would normally make when casting the spell. Whoever drinks the potion is the target of the spell. Any potion that stores a spell with a costly material component or an XP cost also carries a commensurate cost. In addition to the costs derived from the base price, you must expend the material component or pay the XP when creating the potion.',
    },
    '13': {
        name: 'Power Attack',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'On your action, before making attack rolls for a round, you may choose to subtract a number from all melee attack rolls and add the same number to all melee damage rolls. This number may not exceed your base attack bonus. The penalty on attacks and bonus on damage apply until your next turn.',
    },
    '14': {
        name: 'Cleave',
        prerequisites: true,
        prerequisites_feat: 13,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'If you deal a creature enough damage to make it drop (typically by dropping it to below 0 hit points or killing it), you get an immediate, extra melee attack against another creature within reach. You cannot take a 5-foot step before making this extra attack. The extra attack is with the same weapon and at the same bonus as the attack that dropped the previous creature. You can use this ability once per round.',
    },
    '15': {
        name: 'Combat Casting',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You get a +4 bonus on Concentration checks made to cast a spell or use a spell-like ability while on the defensive or while you are grappling or pinned.',
    },
    '16': {
        name: 'Combat Expertise',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you use the attack action or the full attack action in melee, you can take a penalty of as much as -5 on your attack roll and add the same number (+5 or less) as a dodge bonus to your Armor Class. This number may not exceed your base attack bonus. The changes to attack rolls and Armor Class last until your next action.',
    },
    '17': {
        name: 'Combat Reflexes',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You may make a number of additional attacks of opportunity equal to your Dexterity bonus. With this feat, you may also make attacks of opportunity while flat-footed.',
    },
    '18': {
        name: 'Craft Magic Arms And Armor',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 5,
        benefit:
            'You can create any magic weapon, armor, or shield whose prerequisites you meet. Enhancing a weapon, suit of armor, or shield takes one day for each 1,000 gp in the price of its magical features. To enhance a weapon, suit of armor, or shield, you must spend 1/25 of its features total price in XP and use up raw materials costing one-half of this total price. The weapon, armor, or shield to be enhanced must be a masterwork item that you provide. Its cost is not included in the above cost. You can also mend a broken magic weapon, suit of armor, or shield if it is one that you could make. Doing so costs half the XP, half the raw materials, and half the time it would take to craft that item in the first place.',
    },
    '19': {
        name: 'Craft Rod',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 9,
        benefit:
            'You can create any rod whose prerequisites you meet. Crafting a rod takes one day for each 1,000 gp in its base price. To craft a rod, you must spend 1/25 of its base price in XP and use up raw materials costing one-half of its base price. Some rods incur extra costs in material components or XP, as noted in their descriptions. These costs are in addition to those derived from the rods base price.',
    },
    '20': {
        name: 'Craft Staff',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 12,
        benefit:
            'You can create any staff whose prerequisites you meet. Crafting a staff takes one day for each 1,000 gp in its base price. To craft a staff, you must spend 1/25 of its base price in XP and use up raw materials costing one-half of its base price. A newly created staff has 50 charges. Some staffs incur extra costs in material components or XP, as noted in their descriptions. These costs are in addition to those derived from the staffs base price.',
    },
    '21': {
        name: 'Craft Wand',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 5,
        benefit:
            'You can create a wand of any 4th-level or lower spell that you know. Crafting a wand takes one day for each 1,000 gp in its base price. The base price of a wand is its caster level * the spell level * 750 gp. To craft a wand, you must spend 1/25 of this base price in XP and use up raw materials costing one half of this base price. A newly created wand has 50 charges. Any wand that stores a spell with a costly material component or an XP cost also carries a commensurate cost. In addition to the cost derived from the base price, you must expend fifty copies of the material component or pay fifty times the XP cost.',
    },
    '22': {
        name: 'Craft Wondrous Item',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 3,
        benefit:
            'You can create any wondrous item whose prerequisites you meet. Enchanting a wondrous item takes one day for each 1,000 gp in its price. To enchant a wondrous item, you must spend 1/25 of the items price in XP and use up raw materials costing half of this price. You can also mend a broken wondrous item if it is one that you could make. Doing so costs half the XP, half the raw materials, and half the time it would take to craft that item in the first place. Some wondrous items incur extra costs in material components or XP, as noted in their descriptions. These costs are in addition to those derived from the items base price. You must pay such a cost to create an item or to mend a broken one.',
    },
    '23': {
        name: 'Deceitful',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Disguise checks and Forgery checks.',
    },
    '24': {
        name: 'Improved Unarmed Strike',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You are considered to be armed even when unarmed that is, you do not provoke attacks or opportunity from armed opponents when you attack them while unarmed. However, you still get an attack of opportunity against any opponent who makes an unarmed attack on you. In addition, your unarmed strikes can deal lethal or nonlethal damage, at your option.',
    },
    '25': {
        name: 'Deflect Arrows',
        prerequisites: true,
        prerequisites_feat: 24,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You must have at least one hand free (holding nothing) to use this feat. Once per round when you would normally be hit with a ranged weapon, you may deflect it so that you take no damage from it. You must be aware of the attack and not flat-footed. Attempting to deflect a ranged weapon doesnt count as an action. Unusually massive ranged weapons and ranged attacks generated by spell effects cant be deflected.',
    },
    '26': {
        name: 'Deft Hands',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Sleight of Hand checks and Use Rope checks.',
    },
    '27': {
        name: 'Endurance',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You gain a +4 bonus on the following checks and saves: Swim checks made to resist nonlethal damage, Constitution checks made to continue running, Constitution checks made to avoid nonlethal damage from a forced march, Constitution checks made to hold your breath, Constitution checks made to avoid nonlethal damage from starvation or thirst, Fortitude saves made to avoid nonlethal damage from hot or cold environments, and Fortitude saves made to resist damage from suffocation. Also, you may sleep in light or medium armor without becoming fatigued.',
    },
    '28': {
        name: 'Diehard',
        prerequisites: true,
        prerequisites_feat: 27,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When reduced to between -1 and -9 hit points, you automatically become stable. You dont have to roll d% to see if you lose 1 hit point each round. When reduced to negative hit points, you may choose to act as if you were disabled, rather than dying. You must make this decision as soon as you are reduced to negative hit points (even if it isnt your turn). If you do not choose to act as if you were disabled, you immediately fall unconscious. When using this feat, you can take either a single move or standard action each turn, but not both, and you cannot take a full round action. You can take a move action without further injuring yourself, but if you perform any standard action (or any other action deemed as strenuous, including some free actions, swift actions, or immediate actions, such as casting a quickened spell) you take 1 point of damage after completing the act. If you reach -10 hit points, you immediately die.',
    },
    '29': {
        name: 'Diligent',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Appraise checks and Decipher Script checks.',
    },
    '30': {
        name: 'Dodge',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'During your action, you designate an opponent and receive a +1 dodge bonus to Armor Class against attacks from that opponent. You can select a new opponent on any action. A condition that makes you lose your Dexterity bonus to Armor Class (if any) also makes you lose dodge bonuses. Also, dodge bonuses stack with each other, unlike most other types of bonuses.',
    },
    '31': {
        name: 'Empower Spell',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1614,
        prerequisites_level: 0,
        benefit:
            'All variable, numeric effects of an empowered spell are increased by one-half. Saving throws and opposed rolls are not affected, nor are spells without random variables. An empowered spell uses up a spell slot two levels higher than the spells actual level.',
    },
    '32': {
        name: 'Enlarge Spell',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1614,
        prerequisites_level: 0,
        benefit:
            'You can alter a spell with a range of close, medium, or long to increase its range by 100%. An enlarged spell with a range of close now has a range of 50 ft. + 5 ft./level, while medium-range spells have a range of 200 ft. + 20 ft./level and long-range spells have a range of 800 ft. + 80 ft./level. An enlarged spell uses up a spell slot one level higher than the spells actual level. Spells whose ranges are not defined by distance, as well as spells whose ranges are not close, medium, or long, do not have increased ranges.',
    },
    '33': {
        name: 'Eschew Materials',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You can cast any spell that has a material component costing 1 gp or less without needing that component. (The casting of the spell still provokes attacks of opportunity as normal.) If the spell requires a material component that costs more than 1 gp, you must have the material component at hand to cast the spell, just as normal.',
    },
    '34': {
        name: 'Exotic Weapon Proficiency',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You make attack rolls with the weapon normally.',
    },
    '35': {
        name: 'Extend Spell',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1614,
        prerequisites_level: 0,
        benefit:
            'An extended spell lasts twice as long as normal. A spell with a duration of concentration, instantaneous, or permanent is not affected by this feat. An extended spell uses up a spell slot one level higher than the spells actual level.',
    },
    '36': {
        name: 'Extra Turning',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 68,
        prerequisites_level: 0,
        benefit:
            'Each time you take this feat, you can use your ability to turn or rebuke creatures four more times per day than normal. If you have the ability to turn or rebuke more than one kind of creature each of your turning or rebuking abilities gains four additional uses per day.',
    },
    '37': {
        name: 'Point Blank Shot',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'On your action, before making attack rolls for a round, you may choose to subtract a number from all melee attack rolls and add the same number to all melee damage rolls. This number may not exceed your base attack bonus. The penalty on attacks and bonus on damage apply until your next turn.',
    },
    '38': {
        name: 'Far Shot',
        prerequisites: true,
        prerequisites_feat: 37,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you use a projectile weapon, such as a bow, its range increment increases by one-half (multiply by 1.5). When you use a thrown weapon, its range increment is doubled.',
    },
    '39': {
        name: 'Forge Ring',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 12,
        benefit:
            'You can create any ring whose prerequisites you meet. Crafting a ring takes one day for each 1,000 gp in its base price. To craft a ring, you must spend 1/25 of its base price in XP and use up raw materials costing one-half of its base price. You can also mend a broken ring if it is one that you could make. Doing so costs half the XP, half the raw materials, and half the time it would take to forge that ring in the first place. Some magic rings incur extra costs in material components or XP, as noted in their descriptions. You must pay such a cost to forge such a ring or to mend a broken one.',
    },
    '40': {
        name: 'Great Cleave',
        prerequisites: true,
        prerequisites_feat: 14,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'This feat works like Cleave, except that there is no limit to the number of times you can use it per round.',
    },
    '41': {
        name: 'Great Fortitude',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Fortitude saving throws.',
    },
    '42': {
        name: 'Greater Spell Focus',
        prerequisites: true,
        prerequisites_feat: 9,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'Add +1 to the Difficulty Class for all saving throws against spells from the school of magic you select. This bonus stacks with the bonus from Spell Focus.',
    },
    '43': {
        name: 'Spell Penetration',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You get a +2 bonus on caster level checks (1d20 + caster level) made to overcome a creatures spell resistance.',
    },
    '44': {
        name: 'Greater Spell Penetration',
        prerequisites: true,
        prerequisites_feat: 43,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You get a +2 bonus on caster level checks (1d20 + caster level) made to overcome a creatures spell resistance. This bonus stacks with the one from Spell Penetration.',
    },
    '45': {
        name: 'Two-Weapon Fighting',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'Your penalties on attack rolls for fighting with two weapons are reduced. The penalty for your primary hand lessens by 2 and the one for your off hand lessens by 6. See the Two-Weapon Fighting special attack.',
    },
    '46': {
        name: 'Improved Two-Weapon Fighting',
        prerequisites: true,
        prerequisites_feat: 45,
        prerequisites_class: 2047,
        prerequisites_level: 6,
        benefit:
            'In addition to the standard single extra attack you get with an off-hand weapon, you get a second attack with it, albeit at a -5 penalty. See the Two-Weapon Fighting special attack.',
    },
    '47': {
        name: 'Greater Two-Weapon Fighting',
        prerequisites: true,
        prerequisites_feat: 46,
        prerequisites_class: 2047,
        prerequisites_level: 11,
        benefit:
            'You get a third attack with your off-hand weapon, albeit at a -10 penalty. See the Two-Weapon Fighting special attack.',
    },
    '48': {
        name: 'Weapon Focus',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You gain a +1 bonus on all attack rolls you make using the selected weapon.',
    },
    '49': {
        name: 'Greater Weapon Focus',
        prerequisites: true,
        prerequisites_feat: 48,
        prerequisites_class: 16,
        prerequisites_level: 8,
        benefit:
            'You gain a +1 bonus on all attack rolls you make using the selected weapon. This bonus stacks with other bonuses on attack rolls, including the one from Weapon Focus (see below).',
    },
    '50': {
        name: 'Weapon Specialization',
        prerequisites: true,
        prerequisites_feat: 48,
        prerequisites_class: 16,
        prerequisites_level: 4,
        benefit: 'You gain a +2 bonus on all damage rolls you make using the selected weapon.',
    },
    '51': {
        name: 'Greater Weapon Specialization',
        prerequisites: true,
        prerequisites_feat: 49,
        prerequisites_class: 16,
        prerequisites_level: 12,
        benefit:
            'You gain a +2 bonus on all damage rolls you make using the selected weapon. This bonus stacks with other bonuses on damage rolls, including the one from Weapon Specialization (see below).',
    },
    '52': {
        name: 'Heighten Spell',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 0,
        benefit:
            'A heightened spell has a higher spell level than normal (up to a maximum of 9th level). Unlike other metamagic feats, Heighten Spell actually increases the effective level of the spell that it modifies. All effects dependent on spell level (such as saving throw DCs and ability to penetrate a lesser globe of invulnerability) are calculated according to the heightened level. The heightened spell is as difficult to prepare and cast as a spell of its effective level.',
    },
    '53': {
        name: 'Improved Bull Rush',
        prerequisites: true,
        prerequisites_feat: 13,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you perform a bull rush you do not provoke an attack of opportunity from the defender. You also gain a +4 bonus on the opposed Strength check you make to push back the defender.',
    },
    '54': {
        name: 'Improved Counterspell',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 0,
        benefit:
            'When counterspelling, you may use a spell of the same school that is one or more spell levels higher than the target spell.',
    },
    '55': {
        name: 'Improved Critical',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 465,
        prerequisites_level: 8,
        benefit: 'When using the weapon you selected, your threat range is doubled.',
    },
    '56': {
        name: 'Improved Disarm',
        prerequisites: true,
        prerequisites_feat: 16,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You do not provoke an attack of opportunity when you attempt to disarm an opponent, nor does the opponent have a chance to disarm you. You also gain a +4 bonus on the opposed attack roll you make to disarm your opponent.',
    },
    '57': {
        name: 'Improved Feint',
        prerequisites: true,
        prerequisites_feat: 16,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You can make a Bluff check to feint in combat as a move action.',
    },
    '58': {
        name: 'Improved Grapple',
        prerequisites: true,
        prerequisites_feat: 24,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You do not provoke an attack of opportunity when you make a touch attack to start a grapple. You also gain a +4 bonus on all grapple checks, regardless of whether you started the grapple.',
    },
    '59': {
        name: 'Improved Initiative',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +4 bonus on initiative checks.',
    },
    '60': {
        name: 'Improved Overrun',
        prerequisites: true,
        prerequisites_feat: 13,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you attempt to overrun an opponent, the target may not choose to avoid you. You also gain a +4 bonus on your Strength check to knock down your opponent.',
    },
    '61': {
        name: 'Precise Shot',
        prerequisites: true,
        prerequisites_feat: 37,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You can shoot or throw ranged weapons at an opponent engaged in melee without taking the standard -4 penalty on your attack roll.',
    },
    '62': {
        name: 'Improved Precise Shot',
        prerequisites: true,
        prerequisites_feat: 61,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'Your ranged attacks ignore the AC bonus granted to targets by anything less than total cover, and the miss chance granted to targets by anything less than total concealment. Total cover and total concealment provide their normal benefits against your ranged attacks. In addition, when you shoot or throw ranged weapons at a grappling opponent, you automatically strike at the opponent you have chosen.',
    },
    '63': {
        name: 'Shield Proficiency',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You can use a shield and take only the standard penalties.',
    },
    '64': {
        name: 'Improved Shield Bash',
        prerequisites: true,
        prerequisites_feat: 64,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'When you perform a shield bash, you may still apply the shields shield bonus to your AC.',
    },
    '66': {
        name: 'Improved Sunder',
        prerequisites: true,
        prerequisites_feat: 13,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you strike at an object held or carried by an opponent (such as a weapon or shield), you do not provoke an attack of opportunity. You also gain a +4 bonus on any attack roll made to attack an object held or carried by another character.',
    },
    '67': {
        name: 'Improved Trip',
        prerequisites: true,
        prerequisites_feat: 16,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You do not provoke an attack of opportunity when you attempt to trip an opponent while you are unarmed. You also gain a +4 bonus on your Strength check to trip your opponent. If you trip an opponent in melee combat, you immediately get a melee attack against that opponent as if you hadnt used your attack for the trip attempt.',
    },
    '68': {
        name: 'Improved Turning',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 68,
        prerequisites_level: 0,
        benefit:
            'You turn or rebuke creatures as if you were one level higher than you are in the class that grants you the ability.',
    },
    '69': {
        name: 'Investigator',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Gather Information checks and Search checks.',
    },
    '70': {
        name: 'Iron Will',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Will saving throws.',
    },
    '71': {
        name: 'Lightning Reflexes',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Reflex saving throws.',
    },
    '72': {
        name: 'Magical Aptitude',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Spellcraft checks and Use Magic Device checks.',
    },
    '73': {
        name: 'Rapid Shot',
        prerequisites: true,
        prerequisites_feat: 37,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You can get one extra attack per round with a ranged weapon. The attack is at your highest base attack bonus, but each attack you make in that round (the extra one and the normal ones) takes a -2 penalty. You must use the full attack action to use this feat.',
    },
    '74': {
        name: 'Manyshot',
        prerequisites: true,
        prerequisites_feat: 73,
        prerequisites_class: 2047,
        prerequisites_level: 6,
        benefit:
            'As a standard action, you may fire two arrows at a single opponent within 30 feet. Both arrows use the same attack roll (with a -4 penalty) to determine success and deal damage normally (but see Special). For every five points of base attack bonus you have above +6, you may add one additional arrow to this attack, to a maximum of four arrows at a base attack bonus of +16. However, each arrow after the second adds a cumulative -2 penalty on the attack roll (for a total penalty of -6 for three arrows and -8 for four).',
    },
    '75': {
        name: 'Martial Weapon Proficiency',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You make attack rolls with the selected weapon normally.',
    },
    '76': {
        name: 'Maximize Spell',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 1614,
        prerequisites_level: 0,
        benefit:
            'All variable, numeric effects of a spell modified by this feat are maximized. Saving throws and opposed rolls are not affected, nor are spells without random variables. A maximized spell uses up a spell slot three levels higher than the spells actual level.',
    },
    '77': {
        name: 'Mobility',
        prerequisites: true,
        prerequisites_feat: 30,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You get a +4 dodge bonus to Armor Class against attacks of opportunity caused when you move out of or within a threatened area. A condition that makes you lose your Dexterity bonus to Armor Class (if any) also makes you lose dodge bonuses.',
    },
    '78': {
        name: 'Mounted Combat',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'Once per round when your mount is hit in combat, you may attempt a Ride check (as a reaction) to negate the hit. The hit is negated if your Ride check result is greater than the opponents attack roll. (Essentially, the Ride check result becomes the mounts Armor Class if its higher than the mounts regular AC.)',
    },
    '79': {
        name: 'Mounted Archery',
        prerequisites: true,
        prerequisites_feat: 78,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'The penalty you take when using a ranged weapon while mounted is halved: -2 instead of -4 if your mount is taking a double move, and -4 instead of -8 if your mount is running.',
    },
    '80': {
        name: 'Negotiator',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Diplomacy checks and Sense Motive checks.',
    },
    '81': {
        name: 'Nimble Fingers',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Disable Device checks and Open Lock checks',
    },
    '82': {
        name: 'Persuasive',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Bluff checks and Intimidate checks.',
    },
    '83': {
        name: 'Quick Draw',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You can draw a weapon as a free action instead of as a move action. You can draw a hidden weapon (see the Sleight of Hand skill) as a move action.',
    },
    '84': {
        name: 'Quicken Spell',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'Casting a quickened spell is an swift action. You can perform another action, even casting another spell, in the same round as you cast a quickened spell. You may cast only one quickened spell per round. A spell whose casting time is more than 1 full round action cannot be quickened. A quickened spell uses up a spell slot four levels higher than the spells actual level. Casting a quickened spell doesnt provoke an attack of opportunity.',
    },
    '85': {
        name: 'Rapid Reload',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'The time required for you to reload your chosen type of crossbow is reduced to a free action (for a hand or light crossbow) or a move action (for a heavy crossbow). Reloading a crossbow still provokes an attack of opportunity. If you have selected this feat for hand crossbow or light crossbow, you may fire that weapon as many times in a full attack action as you could attack if you were using a bow.',
    },
    '86': {
        name: 'Ride-By Attack',
        prerequisites: true,
        prerequisites_feat: 78,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When you are mounted and use the charge action, you may move and attack as if with a standard charge and then move again (continuing the straight line of the charge). Your total movement for the round cant exceed double your mounted speed. You and your mount do not provoke an attack of opportunity from the opponent that you attack.',
    },
    '87': {
        name: 'Run',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When running, you move five times your normal speed (if wearing medium, light, or no armor and carrying no more than a medium load) or four times your speed (if wearing heavy armor or carrying a heavy load). If you make a jump after a running start (see the Jump skill description), you gain a +4 bonus on your Jump check. While running, you retain your Dexterity bonus to AC.',
    },
    '88': {
        name: 'Scribe Scroll',
        prerequisites: true,
        prerequisites_feat: 0,
        prerequisites_class: 1540,
        prerequisites_level: 0,
        benefit:
            'You can create a scroll of any spell that you know. Scribing a scroll takes one day for each 1,000 gp in its base price. The base price of a scroll is its spell level x its caster level x 25 gp. To scribe a scroll, you must spend 1/25 of this base price in XP and use up raw materials costing one-half of this base price.',
    },
    '89': {
        name: 'Self-Sufficient',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Heal checks and Survival checks.',
    },
    '90': {
        name: 'Silent Spell',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'A silent spell can be cast with no verbal components. Spells without verbal components are not affected. A silent spell uses up a spell slot one level higher than the spells actual level.',
    },
    '91': {
        name: 'Simple Weapon Proficiency',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You make attack rolls with simple weapons normally.',
    },
    '92': {
        name: 'Spell Penetration',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You get a +2 bonus on caster level checks (1d20 + caster level) made to overcome a creatures spell resistance.',
    },
    '93': {
        name: 'Stealthy',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You get a +2 bonus on all Hide checks and Move Silently checks.',
    },
    '94': {
        name: 'Still Spell',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'A stilled spell can be cast with no somatic components.',
    },
    '95': {
        name: 'Toughness',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You gain +3 hit points.',
    },
    '96': {
        name: 'Tower Shield Proficiency',
        prerequisites: true,
        prerequisites_feat: 63,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit: 'You can use a tower shield and suffer only the standard penalties.',
    },
    '97': {
        name: 'Two-Weapon Defense',
        prerequisites: true,
        prerequisites_feat: 45,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'When wielding a double weapon or two weapons (not including natural weapons or unarmed strikes), you gain a +1 shield bonus to your AC. See the Two-Weapon Fighting special attack. When you are fighting defensively or using the total defense action, this shield bonus increases to +2.',
    },
    '98': {
        name: 'Weapon Finesse',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'With a light weapon, rapier, whip, or spiked chain made for a creature of your size category, you may use your Dexterity modifier instead of your Strength modifier on attack rolls. If you carry a shield, its armor check penalty applies to your attack rolls.',
    },
    '99': {
        name: 'Widen Spell',
        prerequisites: false,
        prerequisites_feat: 0,
        prerequisites_class: 2047,
        prerequisites_level: 0,
        benefit:
            'You can alter a burst, emanation, line, or spread shaped spell to increase its area. Any numeric measurements of the spells area increase by 100%.A widened spell uses up a spell slot three levels higher than the spells actual level.',
    },
}

export function feats_per_level(_level) {
    return _level / 3 + 1
}

export function feats_per_class(_class, _level) {
    let amount = feats_per_level(_level)
    if (_class === 1) {
        amount += 5
    } else if (_class === 2) {
        amount += 4
    } else if (_class === 3) {
        amount += 5
    } else if (_class === 4) {
        amount += 4
    } else if (_class === 5) {
        amount += 7
    } else if (_class === 6) {
        amount += 2
    } else if (_class === 7) {
        amount += 6
    } else if (_class === 8) {
        amount += 4
    } else if (_class === 9) {
        amount += 3
    } else if (_class === 10) {
        amount += 1
    } else if (_class === 11) {
        amount += 2
    }

    if (_class === 5) {
        amount += _level / 2 + 1
    } else if (_class === 6) {
        if (_level >= 6) {
            amount += 3
        } else if (_level >= 2) {
            amount += 2
        } else {
            amount += 1
        }
    } else if (_class === 11) {
        amount += _level / 5
    }
    return amount
}

export function get_base_class_feats(_class) {
    let _feats
    if (_class === 1) {
        _feats = [91, 75, 5, 6, 63]
    } else if (_class === 2) {
        _feats = [91, 75, 5, 63]
    } else if (_class === 3) {
        _feats = [91, 5, 6, 7, 63]
    } else if (_class === 4) {
        _feats = [91, 5, 6, 63]
    } else if (_class === 5) {
        _feats = [91, 75, 5, 6, 7, 63, 96]
    } else if (_class === 6) {
        _feats = [34, 24]
    } else if (_class === 7) {
        _feats = [91, 75, 5, 6, 7, 63]
    } else if (_class === 8) {
        _feats = [91, 75, 5, 63]
    } else if (_class === 9) {
        _feats = [91, 75, 5]
    } else if (_class === 10) {
        _feats = [91]
    } else if (_class === 11) {
        _feats = [91, 88]
    }
    return _feats
}
