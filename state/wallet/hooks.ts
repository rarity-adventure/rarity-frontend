import { BigNumber } from 'ethers'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { isAddress } from '../../functions/validate'
import { useMulticall2Contract } from '../../hooks/useContract'
import { useSingleContractMultipleData } from '../multicall/hooks'

export function useETHBalances(uncheckedAddresses?: (string | undefined)[]): {
    [address: string]: BigNumber
} {
    const { chainId } = useActiveWeb3React()
    const multicallContract = useMulticall2Contract()

    const addresses: string[] = useMemo(
        () =>
            uncheckedAddresses
                ? uncheckedAddresses
                      .map(isAddress)
                      .filter((a): a is string => a !== false)
                      .sort()
                : [],
        [uncheckedAddresses]
    )

    const results = useSingleContractMultipleData(
        multicallContract,
        'getEthBalance',
        addresses.map((address) => [address])
    )

    return useMemo(
        () =>
            addresses.reduce<{ [address: string]: BigNumber }>((memo, address, i) => {
                const value = results?.[i]?.result?.[0]
                console.log(value)
                if (value && chainId) memo[address] = value
                return memo
            }, {}),
        [addresses, chainId, results]
    )
}
