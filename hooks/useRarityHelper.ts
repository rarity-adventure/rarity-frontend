import { useRarityHelperContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'
import useActiveWeb3React from './useActiveWeb3React'

interface HelperInterface {
    adventure: (ids: number[]) => Promise<void>
    adventure_donate: (ids: number[]) => Promise<void>
    cellar: (ids: number[]) => Promise<void>
    cellar_donate: (ids: number[]) => Promise<void>
    claim_gold: (ids: number[]) => Promise<void>
    claim_gold_donate: (ids: number[]) => Promise<void>
    level_up: (ids: number[]) => Promise<void>
    level_up_donate: (ids: number[]) => Promise<void>
}

export default function useRarityHelper(): HelperInterface {
    const helper = useRarityHelperContract()

    const adventure = useCallback(
        async (ids: number[]): Promise<void> => {
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
        async (ids: number[]): Promise<void> => {
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
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const approval = await helper?.is_approved(ids)
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
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const approval = await helper?.is_approved(ids)
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
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const approval = await helper?.is_approved(ids)
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
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const approval = await helper?.is_approved(ids)
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
        async (ids: number[]): Promise<void> => {
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
        async (ids: number[]): Promise<void> => {
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

    return {
        adventure,
        adventure_donate,
        cellar,
        cellar_donate,
        claim_gold,
        claim_gold_donate,
        level_up,
        level_up_donate,
    }
}
