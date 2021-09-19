import { useCallback } from 'react'
import { useRarityCellarContract, useRarityContract } from './useContract'
import { utils } from 'ethers'

interface CellarInterface {
    adventure_cellar: (id: number) => Promise<void>
    material_allowance: (from: number, spender: number) => Promise<number>
    material_approve: (from: number, spender: number, amount: number) => Promise<void>
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

    const material_allowance = useCallback(
        async (from: number, spender: number): Promise<number> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const allowance = await cellar?.allowance(from, spender)
                    resolve(parseInt(allowance.toString()))
                } catch (e) {
                    reject()
                }
            })
        },
        [cellar]
    )

    const material_approve = useCallback(
        async (from: number, spender: number, amount: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await cellar?.approve(from, spender, amount)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [cellar]
    )

    return { adventure_cellar, material_allowance, material_approve }
}
