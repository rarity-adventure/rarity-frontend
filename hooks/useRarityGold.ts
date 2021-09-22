import { useRarityGoldContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'

interface GoldInterface {
    claim: (id: number) => Promise<void>
    gold_allowance: (from: number, spender: number) => Promise<number>
    gold_approve: (from: number, spender: number, amount: number) => Promise<void>
    gold_balance: (id: number) => Promise<number>
    transferFrom: (executor: number, from: number, to: number, amount: string) => Promise<void>
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

    const gold_balance = useCallback(
        async (id: number): Promise<number> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const balance = await gold?.balanceOf(id)
                    resolve(parseInt(utils.formatUnits(balance, 'ether')))
                } catch (e) {
                    reject()
                }
            })
        },
        [gold]
    )

    const transferFrom = useCallback(
        async (executor: number, from: number, to: number, amount: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await gold?.transferFrom(executor, from, to, utils.parseEther(amount))
                    await tx.wait()
                    resolve()
                } catch (e) {
                    console.log(e)
                    reject()
                }
            })
        },
        [gold]
    )

    return { claim, gold_allowance, gold_approve, gold_balance, transferFrom }
}
