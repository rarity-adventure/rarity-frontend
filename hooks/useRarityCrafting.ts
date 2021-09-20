import { useCallback } from 'react'
import { useRarityCraftingContract, useRaritySkillsContract } from './useContract'

interface CraftingInterface {
    craft: (id: number, base_type: number, item_type: string, materials: number) => Promise<void>
    balanceOf: (account: string) => Promise<number>
}

export default function useRarityCrafting(): CraftingInterface {
    const crafting = useRarityCraftingContract()

    const balanceOf = (account: string): Promise<number> => {
        return new Promise(async (resolve, reject) => {
            try {
                const balance = await crafting?.balanceOf(account)
                resolve(parseInt(balance.toString()))
            } catch (e) {
                reject(0)
            }
        })
    }

    const craft = useCallback(
        async (id: number, base_type: number, item_type: string, materials: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await crafting?.craft(id, base_type, item_type, materials, { gasLimit: '500000' })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject(0)
                }
            })
        },
        [crafting]
    )

    return { craft, balanceOf }
}
