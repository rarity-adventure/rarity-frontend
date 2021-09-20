import { useRarityGoldContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'

interface GoldInterface {
    claim: (id: number) => Promise<void>
    gold_allowance: (from: number, spender: number) => Promise<number>
    gold_approve: (from: number, spender: number, amount: number) => Promise<void>
}

export default function useRarityGold(): GoldInterface {
    const gold = useRarityGoldContract()

    const claim = useCallback(
        async (id: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await gold?.claim(id)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [gold]
    )

    const gold_allowance = useCallback(
        async (from: number, spender: number): Promise<number> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const allowance = await gold?.allowance(from, spender)
                    resolve(parseInt(utils.formatUnits(allowance, 'ether')))
                } catch (e) {
                    reject()
                }
            })
        },
        [gold]
    )

    const gold_approve = useCallback(
        async (from: number, spender: number, amount: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await gold?.approve(from, spender, utils.parseUnits(amount.toString(), 'ether'))
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [gold]
    )

    return { claim, gold_allowance, gold_approve }
}
