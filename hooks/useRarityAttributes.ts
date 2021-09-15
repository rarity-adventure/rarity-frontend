import { useCallback } from 'react'
import { useRarityAttributesContract } from './useContract'

interface AttributesInterface {
    point_buy: (
        id: string,
        str: number,
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number
    ) => Promise<void>
}

export default function useRarityAttributes(): AttributesInterface {
    const attributes = useRarityAttributesContract()

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

    return { point_buy }
}
