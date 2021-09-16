import { useRarityGoldContract, useRarityHelperContract } from './useContract'
import { useCallback } from 'react'

interface HelperInterface {
    adventure: (ids: string[]) => Promise<void>
    cellar: (ids: string[]) => Promise<void>
    claim_gold: (ids: string[]) => Promise<void>
    level_up: (ids: string[]) => Promise<void>
}

export default function useRarityHelper(): HelperInterface {
    const helper = useRarityHelperContract()

    const adventure = useCallback(
        async (ids: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.adventure(ids)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const cellar = useCallback(
        async (ids: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.cellar(ids)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const claim_gold = useCallback(
        async (ids: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.claim_gold(ids)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const level_up = useCallback(
        async (ids: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.level_up(ids)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    return { adventure, cellar, claim_gold, level_up }
}
