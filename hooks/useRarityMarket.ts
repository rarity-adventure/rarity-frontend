import { useRarityMarketContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'

interface MarketInterface {
    list: (id: number, price: number) => Promise<void>
    unlist: (id: number) => Promise<void>
    buy: (id: number, price: string) => Promise<void>
}

export default function useRarityMarket(): MarketInterface {
    const market = useRarityMarketContract()

    const list = useCallback(
        async (id: number, price: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await market?.list(id, utils.parseEther(price.toString()))
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })
        },
        [market]
    )

    const unlist = useCallback(
        async (id: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await market?.unlist(id)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })
        },
        [market]
    )

    const buy = useCallback(
        async (id: number, price: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await market?.buy(id, { value: price })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })
        },
        [market]
    )

    return { list, unlist, buy }
}
