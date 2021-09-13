import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useMulticall2Contract, useRarityLibContract } from '../../hooks/useContract'
import { useMemo } from 'react'
import { isAddress } from '../../functions/validate'
import { useSingleContractMultipleData } from '../multicall/hooks'
import { utils } from 'ethers'

export function useSummonersData(summoners: { id: string }[]): {
    [id: string]: any
} {
    const { chainId } = useActiveWeb3React()

    const lib = useRarityLibContract()

    console.log(summoners.map((s) => [s.id]))
    const results = useSingleContractMultipleData(
        lib,
        'summoner_full',
        summoners.map((s) => [s.id])
    )

    console.log(results)
    return useMemo(
        () =>
            summoners.reduce<{ [id: string]: any }>((memo, s, i) => {
                const value = results?.[i]?.result?.[0]
                if (value && chainId) {
                    memo[s.id] = value
                }

                return memo
            }, {}),
        [summoners, chainId, results]
    )
}
