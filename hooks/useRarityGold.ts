import { useRarityGoldContract } from './useContract'
import { useCallback } from 'react'

interface GoldInterface {
    claim: (id: string) => Promise<void>
}

export default function useRarityGold(): GoldInterface {
    const gold = useRarityGoldContract()

    const claim = useCallback(
        async (id: string): Promise<void> => {
            try {
                const tx = await gold?.claim(id)
                return await tx.wait()
            } catch (e) {
                return
            }
        },
        [gold]
    )

    return { claim }
}
