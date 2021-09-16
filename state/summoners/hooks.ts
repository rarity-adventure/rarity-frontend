import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useRarityLibContract } from '../../hooks/useContract'
import { useMemo } from 'react'
import { useSingleContractMultipleData } from '../multicall/hooks'
import { BigNumber } from 'ethers'

export interface SummonerFullData {
    id: string
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
        spent_points: BigNumber
        total_points: BigNumber
    }
    base: {
        _class: BigNumber
        _level: BigNumber
        _log: BigNumber
        _name: string
        _xp: BigNumber
    }
    gold: {
        balance: BigNumber
        claimable: BigNumber
        claimed: BigNumber
    }
    materials: {
        log: BigNumber
        balance: BigNumber
        scout: BigNumber
    }
    skills: {
        class_skills: boolean[]
        skills: number[]
        spent_points: BigNumber
        total_points: BigNumber
    }
}

export function useSummonersData(summoners: { id: string }[]): {
    [id: string]: SummonerFullData
} {
    const { chainId } = useActiveWeb3React()

    const lib = useRarityLibContract()

    const results = useSingleContractMultipleData(
        lib,
        'summoner_full',
        summoners.map((s) => [s.id])
    )

    return useMemo(
        () =>
            summoners.reduce<{ [id: string]: SummonerFullData }>((memo, s, i) => {
                const value = results?.[i]?.result?.[0]
                if (value && chainId) {
                    memo[s.id] = {
                        id: s.id,
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
                            spent_points: value.ability_scores.spent_points,
                            total_points: value.ability_scores.total_points,
                        },
                        base: {
                            _class: value.base.class,
                            _level: value.base.level,
                            _log: value.base.log,
                            _name: value.base.name,
                            _xp: value.base.xp,
                        },
                        gold: {
                            balance: value.gold.balance,
                            claimable: value.gold.claimable,
                            claimed: value.gold.claimed,
                        },
                        materials: {
                            balance: value.materials[0].balance,
                            scout: value.materials[0].scout,
                            log: value.materials[0].log,
                        },
                        skills: {
                            class_skills: value.skills.class_skills,
                            skills: value.skills.skills,
                            spent_points: value.skills.spent_points,
                            total_points: value.skills.total_points,
                        },
                    }
                }
                return memo
            }, {}),
        [summoners, chainId, results]
    )
}
