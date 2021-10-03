import { useCallback } from 'react'
import { useRarityCraftingContract } from './useContract'

interface CraftingInterface {
    craft: (id: number, base_type: number, item_type: string, materials: number) => Promise<void>
    balanceOf: (account: string) => Promise<number>
    tokenURI: (id: number) => Promise<string>
    transferFrom: (from: string | null | undefined, to: string, id: number) => Promise<void>
    isApprovedForAll: (owner: string | null | undefined, operator: string) => Promise<boolean>
    setApprovalForAll: (operator: string) => Promise<void>
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
                    reject(e)
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
                    reject(e)
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
                    reject(e)
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
                    reject(e)
                }
            })
        },
        [crafting]
    )

    const isApprovedForAll = useCallback(
        async (owner: string | null | undefined, operator: string): Promise<boolean> => {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await crafting?.isApprovedForAll(owner, operator))
                } catch (e) {
                    reject(e)
                }
            })
        },
        [crafting]
    )

    const setApprovalForAll = useCallback(
        async (from: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await crafting?.setApprovalForAll(from, true)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })
        },
        [crafting]
    )

    return { craft, balanceOf, tokenURI, transferFrom, isApprovedForAll, setApprovalForAll }
}
