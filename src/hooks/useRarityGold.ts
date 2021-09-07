import { useRarityGoldContract } from './useContract'
import { useCallback } from 'react'
import { fromWei } from 'web3-utils'

interface GoldInterface {
    claim: (id: string) => Promise<void>
    claimed: (id: string) => Promise<number>
    claimable: (id: string) => Promise<number>
    balance: (address: string | null | undefined) => Promise<number>
}

export default function useGold(): GoldInterface {
    const gold = useRarityGoldContract()

    const claim = useCallback(
        async (id: string): Promise<void> => {
            try {
                return await gold?.claim(id)
            } catch (e) {
                return
            }
        },
        [gold]
    )

    const claimed = useCallback(
        async (id: string): Promise<number> => {
            try {
                const b = await gold?.claimed(id)
                const n = fromWei(b.toString())
                return parseFloat(n)
            } catch (e) {
                return 0
            }
        },
        [gold]
    )

    const claimable = useCallback(
        async (id: string): Promise<number> => {
            try {
                const b = await gold?.claimable(id)
                const n = fromWei(b.toString())
                return parseFloat(n)
            } catch (e) {
                return 0
            }
        },
        [gold]
    )

    const balance = useCallback(
        async (address: string | null | undefined): Promise<number> => {
            try {
                const b = await gold?.balanceOf(address)
                const n = fromWei(b.toString())
                return parseFloat(n)
            } catch (e) {
                return 0
            }
        },
        [gold]
    )

    return { claim, claimed, claimable, balance }
}
