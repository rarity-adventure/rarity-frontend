import { useRarityLibContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'

export interface SummonerFullData {
    id: number
    ability_scores: {
        attributes: {
            _cha: number
            _con: number
            _dex: number
            _int: number
            _str: number
            _wis: number
        }
        created: boolean
        modifiers: {
            _cha: number
            _con: number
            _dex: number
            _int: number
            _str: number
            _wis: number
        }
        spent_points: number
        total_points: number
    }
    base: {
        _class: number
        _level: number
        _log: number
        _name: string
        _xp: number
    }
    gold: {
        balance: number
        claimable: number
        claimed: number
    }
    materials: {
        log: number
        balance: number
        scout: number
    }
    skills: {
        class_skills: boolean[]
        skills: number[]
        spent_points: number
        total_points: number
    }
    misc: {
        daycare_days_paid: number
    }
}

export interface ItemData {
    token_id: number
    base_type: number
    item_type: number
    crafted: number
    crafter: number
}

interface LibraryInterface {
    summoners_full: (ids: string[]) => Promise<SummonerFullData[]>
    items: (owner: string) => Promise<ItemData[]>
}

export default function useRarityLibrary(): LibraryInterface {
    const lib = useRarityLibContract()

    const summoners_full = useCallback(
        async (ids: string[]): Promise<SummonerFullData[]> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const summoners = await lib?.summoners_full(ids)
                    resolve(
                        summoners.map((value, i) => {
                            return {
                                id: parseInt(ids[i], 16),
                                ability_scores: {
                                    attributes: {
                                        _cha:
                                            value.ability_scores.attributes._cha === 0
                                                ? 8
                                                : value.ability_scores.attributes._cha,
                                        _con:
                                            value.ability_scores.attributes._con === 0
                                                ? 8
                                                : value.ability_scores.attributes._con,
                                        _dex:
                                            value.ability_scores.attributes._dex === 0
                                                ? 8
                                                : value.ability_scores.attributes._dex,
                                        _int:
                                            value.ability_scores.attributes._int === 0
                                                ? 8
                                                : value.ability_scores.attributes._int,
                                        _str:
                                            value.ability_scores.attributes._str === 0
                                                ? 8
                                                : value.ability_scores.attributes._str,
                                        _wis:
                                            value.ability_scores.attributes._wis === 0
                                                ? 8
                                                : value.ability_scores.attributes._wis,
                                    },
                                    created: value.ability_scores.created,
                                    modifiers: {
                                        _cha: value.ability_scores.modifiers._cha,
                                        _con: value.ability_scores.modifiers._con,
                                        _dex: value.ability_scores.modifiers._dex,
                                        _int: value.ability_scores.modifiers._int,
                                        _str: value.ability_scores.modifiers._str,
                                        _wis: value.ability_scores.modifiers._wis,
                                    },
                                    spent_points: parseInt(value.ability_scores.spent_points.toString()),
                                    total_points: parseInt(value.ability_scores.total_points.toString()),
                                },
                                base: {
                                    _class: parseInt(value.base.class.toString()),
                                    _level: parseInt(value.base.level.toString()),
                                    _log: parseInt(value.base.log.toString()),
                                    _name: value.base.name,
                                    _xp: parseInt(utils.formatUnits(value.base.xp.toString(), 'ether')),
                                },
                                gold: {
                                    balance: parseInt(utils.formatUnits(value.gold.balance, 'ether')),
                                    claimable: parseInt(utils.formatUnits(value.gold.claimable, 'ether')),
                                    claimed: parseInt(utils.formatUnits(value.gold.claimed, 'ether')),
                                },
                                materials: {
                                    balance: parseInt(value.materials[0].balance),
                                    scout: parseInt(value.materials[0].scout.toString()),
                                    log: parseInt(value.materials[0].log.toString()),
                                },
                                skills: {
                                    class_skills: value.skills.class_skills,
                                    skills: value.skills.skills,
                                    spent_points: parseInt(value.skills.spent_points.toString()),
                                    total_points: parseInt(value.skills.total_points.toString()),
                                },
                                misc: {
                                    daycare_days_paid: parseInt(value.misc.daycare_days_paid.toString()),
                                },
                            }
                        })
                    )
                } catch (e) {
                    reject()
                }
            })
        },
        [lib]
    )

    const items = useCallback(
        async (owner: string): Promise<ItemData[]> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const items = await lib?.items1(owner)
                    resolve(
                        items.map((value, i) => {
                            return {
                                token_id: parseInt(value.token_id.toString(), 10),
                                base_type: value.base_type,
                                item_type: value.item_type,
                                crafted: value.crafted,
                                crafter: parseInt(value.crafter.toString(), 10),
                            }
                        })
                    )
                } catch (e) {
                    reject()
                }
            })
        },
        [lib]
    )

    return { summoners_full, items }
}
