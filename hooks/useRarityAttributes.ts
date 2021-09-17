import { useCallback } from 'react'
import { useRarityAttributesContract } from './useContract'

interface AttributesInterface {
    point_buy: (
        id: number,
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
            id: number,
            str: number,
            dex: number,
            con: number,
            int: number,
            wis: number,
            cha: number
        ): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await attributes?.point_buy(id, str, dex, con, int, wis, cha)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [attributes]
    )

    return { point_buy }
}
