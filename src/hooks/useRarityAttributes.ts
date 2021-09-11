import { useRarityAttributesContract } from './useContract'
import { useCallback } from 'react'
import { calcAPCost } from '../constants'

interface AttributesInterface {
    scores: (id: string) => Promise<{
        str: number
        dex: number
        con: number
        int: number
        wis: number
        cha: number
    }>
    calcAP: (id: string, lvl: string) => Promise<number>
    point_buy: (
        id: string,
        str: number,
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number
    ) => Promise<void>
    character_created: (id: string) => Promise<boolean>
}

export default function useRarityAttributes(): AttributesInterface {
    const attributes = useRarityAttributesContract()

    const scores = useCallback(
        async (
            id: string
        ): Promise<{
            str: number
            dex: number
            con: number
            int: number
            wis: number
            cha: number
        }> => {
            try {
                const attr = await attributes?.ability_scores(id)
                return {
                    str: attr.strength === 0 ? 8 : attr.strength,
                    dex: attr.dexterity === 0 ? 8 : attr.dexterity,
                    con: attr.constitution === 0 ? 8 : attr.constitution,
                    int: attr.intelligence === 0 ? 8 : attr.intelligence,
                    wis: attr.wisdom === 0 ? 8 : attr.wisdom,
                    cha: attr.charisma === 0 ? 8 : attr.charisma,
                }
            } catch (e) {
                return {
                    str: 0,
                    dex: 0,
                    con: 0,
                    int: 0,
                    wis: 0,
                    cha: 0,
                }
            }
        },
        [attributes]
    )

    const calcAP = useCallback(
        async (id: string, lvl: string): Promise<number> => {
            try {
                const base = 32
                const lvlAP = parseInt((await attributes?.abilities_by_level(lvl)).toString(), 16)
                const lvlAPNum = parseInt(lvlAP.toString())
                const totalAP = base - lvlAPNum
                const scores = await attributes?.ability_scores(id)
                let spent = 0
                spent += calcAPCost(scores.strength === 0 ? 8 : scores.strength)
                spent += calcAPCost(scores.dexterity === 0 ? 8 : scores.dexterity)
                spent += calcAPCost(scores.constitution === 0 ? 8 : scores.constitution)
                spent += calcAPCost(scores.intelligence === 0 ? 8 : scores.intelligence)
                spent += calcAPCost(scores.wisdom === 0 ? 8 : scores.wisdom)
                spent += calcAPCost(scores.charisma === 0 ? 8 : scores.charisma)
                return totalAP - spent
            } catch (e) {
                return 0
            }
        },
        [attributes]
    )

    const point_buy = useCallback(
        async (
            id: string,
            str: number,
            dex: number,
            con: number,
            int: number,
            wis: number,
            cha: number
        ): Promise<void> => {
            try {
                await attributes?.point_buy(id, str, dex, con, int, wis, cha)
                return
            } catch (e) {
                return
            }
        },
        [attributes]
    )

    const character_created = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                return await attributes?.character_created(id)
            } catch (e) {
                return false
            }
        },
        [attributes]
    )
    return { scores, calcAP, point_buy, character_created }
}
