import { useMulticall2Contract, useRarityNameContract } from './useContract'
import { useCallback } from 'react'

interface GoldInterface {
    summoner_name: (id: string) => Promise<string>
    multicall_summoner_name: (ids: string[]) => Promise<string[]>
}

export default function useRarityName(): GoldInterface {
    const name = useRarityNameContract()

    const multicall = useMulticall2Contract()

    const summoner_name = useCallback(
        async (id: string): Promise<string> => {
            try {
                return await name?.summoner_name(id)
            } catch (e) {
                return ''
            }
        },
        [name]
    )

    const multicall_summoner_name = useCallback(
        async (ids: string[]): Promise<string[]> => {
            try {
                const fragment = name?.interface?.getFunction('summoner_name')
                if (fragment) {
                    const call = ids.map((id) => {
                        return {
                            address: name?.address,
                            callData: name?.interface.encodeFunctionData(fragment, [id]),
                        }
                    })
                    return await multicall?.tryAggregate(true, call)
                } else {
                    return []
                }
            } catch (e) {
                return []
            }
        },
        [name, multicall]
    )

    return { summoner_name, multicall_summoner_name }
}
