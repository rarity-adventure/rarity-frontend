import { useCallback } from 'react'
import { useRarityCraftingContract, useRaritySkillsContract } from './useContract'

interface CraftingInterface {
    craft: (id: number, base_type: number, item_type: string, materials: number) => Promise<void>
    balanceOf: (account: string) => Promise<number>
    tokenURI: (id: number) => Promise<string>
    transferFrom: (from: string | null | undefined, to: string, id: number) => Promise<void>
}

export default function useRarityCrafting(): CraftingInterface {
    const crafting = useRarityCraftingContract()

    const balanceOf = useCallback(
        async (account: string): Promise<number> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const balance = await crafting?.balanceOf(account)
                    resolve(parseInt(balance.toString()))
                } catch (e) {
                    reject(0)
                }
            })
        },
        [crafting]
    )

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

    const tokenURI = useCallback(
        async (id: number): Promise<string> => {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await crafting?.tokenURI(id))
                } catch (e) {
                    reject(0)
                }
            })
        },
        [crafting]
    )

    const transferFrom = useCallback(
        async (from: string | null | undefined, to: string, id: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await crafting?.transferFrom(from, to, id)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [crafting]
    )

    return { craft, balanceOf, tokenURI, transferFrom }
}
