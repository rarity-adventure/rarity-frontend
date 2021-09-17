import { useRarityHelperContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'

interface HelperInterface {
    adventure: (ids: string[]) => Promise<void>
    adventure_donate: (ids: string[]) => Promise<void>
    cellar: (ids: string[], approval: string[]) => Promise<void>
    cellar_donate: (ids: string[], approval: string[]) => Promise<void>
    claim_gold: (ids: string[], approval: string[]) => Promise<void>
    claim_gold_donate: (ids: string[], approval: string[]) => Promise<void>
    level_up: (ids: string[]) => Promise<void>
    level_up_donate: (ids: string[]) => Promise<void>
    donate: (amount: string) => Promise<void>
    is_approved: (ids: string[]) => Promise<boolean[]>
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

    const adventure_donate = useCallback(
        async (ids: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.adventure(ids, { value: utils.parseUnits('0.1', 'ether') })
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
        async (ids: string[], approval: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.cellar(ids, approval)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const cellar_donate = useCallback(
        async (ids: string[], approval: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.cellar(ids, approval, { value: utils.parseUnits('0.1', 'ether') })
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
        async (ids: string[], approval: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.claim_gold(ids, approval)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const claim_gold_donate = useCallback(
        async (ids: string[], approval: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.claim_gold(ids, approval, { value: utils.parseUnits('0.1', 'ether') })
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

    const level_up_donate = useCallback(
        async (ids: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.level_up(ids, { value: utils.parseUnits('0.1', 'ether') })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const donate = useCallback(
        async (amount: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await helper?.approve_all([], { value: amount })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    const is_approved = useCallback(
        async (ids: string[]): Promise<boolean[]> => {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await helper?.is_approved(ids))
                } catch (e) {
                    reject()
                }
            })
        },
        [helper]
    )

    return {
        adventure,
        adventure_donate,
        cellar,
        cellar_donate,
        claim_gold,
        claim_gold_donate,
        level_up,
        level_up_donate,
        donate,
        is_approved,
    }
}
