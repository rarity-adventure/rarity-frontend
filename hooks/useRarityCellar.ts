import { useCallback } from 'react'
import { useRarityCellarContract, useRarityContract } from './useContract'

interface CellarInterface {
    adventure_cellar: (id: number) => Promise<void>
}

export default function useRarityCellar(): CellarInterface {
    const cellar = useRarityCellarContract()

    const adventure_cellar = useCallback(
        async (id: number): Promise<void> => {
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
