import { useRarityContract } from './useContract'
import { useCallback } from 'react'

interface RarityInterface {
    img: (id: string) => Promise<string>
    mint: (_class?: string) => Promise<void>
    exp: (id: string, lvl: string) => Promise<{ actual: string; next: string }>
    adventure: (id: string) => Promise<void>
    nextAdventure: (id: string) => Promise<string>
    nextSummoner: () => Promise<string>
    approve: (spender: string) => Promise<void>
    allowance: (owner: string | null | undefined, spender: string) => Promise<boolean>
    levelUp: (id: string) => Promise<void>
    transfer: (from: string | null | undefined, to: string, id: string) => Promise<void>
}

export default function useRarity(): RarityInterface {
    const rarity = useRarityContract()

    const img = useCallback(
        async (id: string): Promise<string> => {
            try {
                return await rarity?.tokenURI(id)
            } catch (e) {
                return ''
            }
        },
        [rarity]
    )

    const mint = useCallback(
        async (_class?: string): Promise<void> => {
            try {
                const selectedClass = _class ? _class : rand()
                await rarity?.summon(selectedClass)
            } catch (e) {
                return
            }
        },
        [rarity]
    )

    const exp = useCallback(
        async (id: string, lvl: string): Promise<{ actual: string; next: string }> => {
            try {
                const actual = await rarity?.xp(id)
                const next = await rarity?.xp_required(lvl)
                return { actual, next }
            } catch (e) {
                return { actual: '0', next: '0' }
            }
        },
        [rarity]
    )

    const nextAdventure = useCallback(
        async (id: string): Promise<string> => {
            try {
                return await rarity?.adventurers_log(id)
            } catch (e) {
                return '0'
            }
        },
        [rarity]
    )

    const adventure = useCallback(
        async (id: string): Promise<void> => {
            try {
                return await rarity?.adventure(id)
            } catch (e) {
                return
            }
        },
        [rarity]
    )

    const nextSummoner = useCallback(async (): Promise<string> => {
        try {
            return await rarity?.next_summoner()
        } catch (e) {
            return ''
        }
    }, [rarity])

    const approve = useCallback(
        async (spender: string): Promise<void> => {
            try {
                return await rarity?.setApprovalForAll(spender, true)
            } catch (e) {
                return
            }
        },
        [rarity]
    )

    const allowance = useCallback(
        async (owner: string | null | undefined, spender: string): Promise<boolean> => {
            try {
                return await rarity?.isApprovedForAll(owner, spender)
            } catch (e) {
                return false
            }
        },
        [rarity]
    )

    const levelUp = useCallback(
        async (id: string): Promise<void> => {
            try {
                return await rarity?.level_up(id)
            } catch (e) {
                return
            }
        },
        [rarity]
    )

    const transfer = useCallback(
        async (from: string | null | undefined, to: string, id: string) => {
            try {
                return await rarity?.transferFrom(from, to, id)
            } catch (e) {
                return
            }
        },
        [rarity]
    )

    return { img, mint, exp, nextAdventure, adventure, nextSummoner, approve, allowance, levelUp, transfer }
}

function rand() {
    return Math.floor(Math.random() * 11) + 1
}
