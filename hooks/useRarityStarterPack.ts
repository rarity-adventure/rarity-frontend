import { useRarityStarterPackContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'

interface StarterPackInterface {
    buy_pack: () => Promise<void>
    packs_available: () => Promise<number>
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

    return { buy_pack, packs_available }
}
