import { useCallback } from 'react'
import { useRarityContract } from './useContract'
import { rejects } from 'assert'

interface RarityInterface {
    summon: (_class?: string) => Promise<void>
}

export default function useRarity(): RarityInterface {
    const rarity = useRarityContract()

    const summon = useCallback(
        async (_class?: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const selectedClass = _class ? _class : rand()
                    const tx = await rarity?.summon(selectedClass)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [rarity]
    )

    return { summon }
}

function rand() {
    return Math.floor(Math.random() * 11) + 1
}
