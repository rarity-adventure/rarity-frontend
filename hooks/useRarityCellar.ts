import { useCallback } from 'react'
import { useRarityCellarContract, useRarityContract } from './useContract'

interface RarityInterface {
    adventure_cellar: (id: string) => Promise<void>
}

export default function useRarity(): RarityInterface {
    const cellar = useRarityCellarContract()

    const adventure_cellar = useCallback(
        async (id: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await cellar?.adventure(id)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [cellar]
    )

    return { adventure_cellar }
}

