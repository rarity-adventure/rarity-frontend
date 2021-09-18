import { useCallback } from 'react'
import { useRarityContract } from './useContract'

interface RarityInterface {
    summon: (_class?: string) => Promise<void>
    adventure: (id: number) => Promise<void>
    level_up: (id: number) => Promise<void>
    transferFrom: (from: string | null | undefined, to: string, id: number) => Promise<void>
    isApprovedForAll: (owner: string | null | undefined, operator: string) => Promise<boolean>
    setApprovalForAll: (operator: string) => Promise<void>
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

    const adventure = useCallback(
        async (id: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await rarity?.adventure(id)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [rarity]
    )

    const level_up = useCallback(
        async (id: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await rarity?.level_up(id)
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
        async (from: string | null | undefined, to: string, id: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await rarity?.transferFrom(from, to, id)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [rarity]
    )

    const isApprovedForAll = useCallback(
        async (owner: string | null | undefined, operator: string): Promise<boolean> => {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await rarity?.isApprovedForAll(owner, operator))
                } catch (e) {
                    reject(false)
                }
            })
        },
        [rarity]
    )

    const setApprovalForAll = useCallback(
        async (from: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await rarity?.setApprovalForAll(from, true)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [rarity]
    )

    return { summon, adventure, level_up, transferFrom, isApprovedForAll, setApprovalForAll }
}

function rand() {
    return Math.floor(Math.random() * 11) + 1
}
