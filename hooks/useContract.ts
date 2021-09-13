import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { getContract } from '../functions/getContract'
import useActiveWeb3React from './useActiveWeb3React'
import { MULTICALL2_ADDRESS, RARITY_ADDRESS } from '../constants'
import MULTICALL2_ABI from '../constants/abis/multicall2.json'
import RARITY_ABI from '../constants/abis/rarity.json'

export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account } = useActiveWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export function useMulticall2Contract() {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId && MULTICALL2_ADDRESS, MULTICALL2_ABI, false)
}

export function useRarityContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? RARITY_ADDRESS : undefined, RARITY_ABI)
}
