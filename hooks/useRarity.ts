import { useCallback } from 'react'
import { useRarityContract } from './useContract'

interface RarityInterface {
    summon: (_class?: string) => Promise<void>
    transferFrom: (from: string | null | undefined, to: string, id: string) => Promise<void>
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

    const transferFrom = useCallback(
        async (from: string | null | undefined, to: string, id: string) => {
            try {
                const tx = await rarity?.transferFrom(from, to, id)
                return await tx.wait()
            } catch (e) {
                return
            }
        },
        [rarity]
    )

    return { summon, transferFrom }
}

function rand() {
    return Math.floor(Math.random() * 11) + 1
}
