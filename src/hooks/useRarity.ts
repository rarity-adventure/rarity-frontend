import { useMulticall2Contract, useRarityContract } from './useContract'
import { useCallback } from 'react'
import { BigNumber } from '@ethersproject/bignumber'

interface RarityInterface {
    img: (id: string) => Promise<string>
    mint: (_class?: string) => Promise<void>
    exp: (id: string, lvl: string) => Promise<{ actual: string; next: string }>
    adventure: (id: string) => Promise<void>
    next_adventure: (id: string) => Promise<string>
    next_summoner: () => Promise<string>
    approve: (spender: string) => Promise<void>
    allowance: (owner: string | null | undefined, spender: string) => Promise<boolean>
    level_up: (id: string) => Promise<void>
    transfer: (from: string | null | undefined, to: string, id: string) => Promise<void>
    multicall_next_adventure: (ids: string[]) => Promise<{ id: string; next: BigNumber }[]>
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

    const next_adventure = useCallback(
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

    const next_summoner = useCallback(async (): Promise<string> => {
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

    const level_up = useCallback(
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

    const multicall = useMulticall2Contract()

    const multicall_next_adventure = useCallback(
        async (ids: string[]): Promise<{ id: string; next: BigNumber }[]> => {
            try {
                const fragment = rarity?.interface?.getFunction('adventurers_log')
                if (fragment) {
                    const call = ids.map((id) => {
                        return {
                            target: rarity?.address,
                            callData: rarity?.interface.encodeFunctionData(fragment, [id]),
                        }
                    })
                    const result = await multicall?.callStatic.tryAggregate(true, call)
                    return result.map((r: any, i: number) => {
                        return { id: ids[i], next: rarity?.interface.decodeFunctionResult(fragment, r.returnData)[0] }
                    })
                } else {
                    return []
                }
            } catch (e) {
                return []
            }
        },
        [rarity, multicall]
    )

    return {
        img,
        mint,
        exp,
        next_adventure,
        adventure,
        next_summoner,
        approve,
        allowance,
        level_up,
        transfer,
        multicall_next_adventure,
    }
}

function rand() {
    return Math.floor(Math.random() * 11) + 1
}
