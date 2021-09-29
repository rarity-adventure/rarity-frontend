import { useRarityStarterPackContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'

interface StarterPackInterface {
    buy_pack: () => Promise<void>
    packs_available: () => Promise<number>
    packs_opened: () => Promise<number>
    balanceOf: (owner: string) => Promise<number>
    filter_needed_summoners: (ids: number[]) => Promise<number[]>
    sell_summoners: (ids: number[]) => Promise<void>
    sell_items: (ids: number[]) => Promise<void>
    get_sellable_items_between_ids: (account: string, min_id: number, max_id: number) => Promise<number[]>
}

export default function useRarityStarterPack(): StarterPackInterface {
    const pack = useRarityStarterPackContract()

    const buy_pack = useCallback(async (): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                const tx = await pack?.buy_pack({ value: utils.parseUnits('35', 'ether') })
                await tx.wait()
                resolve()
            } catch (e) {
                reject()
            }
        })
    }, [pack])

    const packs_available = useCallback(async (): Promise<number> => {
        return new Promise(async (resolve, reject) => {
            try {
                const packs = await pack?.packs_available()
                resolve(parseInt(packs.toString()))
            } catch (e) {
                reject()
            }
        })
    }, [pack])

    const packs_opened = useCallback(async (): Promise<number> => {
        return new Promise(async (resolve, reject) => {
            try {
                const supply = await pack?.packs_opened()
                resolve(parseInt(supply.toString()))
            } catch (e) {
                reject()
            }
        })
    }, [pack])

    const balanceOf = useCallback(
        async (owner: string): Promise<number> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const b = await pack?.balanceOf(owner)
                    resolve(parseInt(b.toString()))
                } catch (e) {
                    reject()
                }
            })
        },
        [pack]
    )

    const filter_needed_summoners = useCallback(
        async (ids: number[]): Promise<number[]> => {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await pack?.filter_needed_summoners(ids))
                } catch (e) {
                    reject()
                }
            })
        },
        [pack]
    )

    const sell_summoners = useCallback(
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await pack?.sell_summoners(ids)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [pack]
    )

    const sell_items = useCallback(
        async (ids: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await pack?.sell_items(ids)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [pack]
    )

    const get_sellable_items_between_ids = useCallback(
        async (account: string, min_id: number, max_id: number): Promise<number[]> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const sellable = await pack?.get_sellable_items_between_ids(account, min_id, max_id)
                    resolve(sellable.map((s) => parseInt(s.toString())))
                } catch (e) {
                    reject()
                }
            })
        },
        [pack]
    )

    return {
        buy_pack,
        packs_available,
        packs_opened,
        balanceOf,
        filter_needed_summoners,
        sell_summoners,
        sell_items,
        get_sellable_items_between_ids,
    }
}
