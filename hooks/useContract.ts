import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { getContract } from '../functions/getContract'
import useActiveWeb3React from './useActiveWeb3React'
import {
    MULTICALL2_ADDRESS,
    RARITY_ADDRESS,
    RARITY_ATTRIBUTES_ADDRESS,
    RARITY_GOLD_ADDRESS,
    RARITY_HELPER_ADDRESS,
    RARITY_LIB,
    RARITY_SKILLS_ADDRESS,
} from '../constants'
import MULTICALL2_ABI from '../constants/abis/multicall2.json'
import RARITY_ABI from '../constants/abis/rarity.json'
import RARITY_LIB_ABI from '../constants/abis/rarity_library.json'
import RARITY_GOLD_ABI from '../constants/abis/gold.json'
import RARITY_ATTRIBUTES_ABI from '../constants/abis/attributes.json'
import RARITY_HELPER_ABI from '../constants/abis/helper.json'
import RARITY_SKILLS_ABI from '../constants/abis/skills.json'

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

export function useRarityLibContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? RARITY_LIB : undefined, RARITY_LIB_ABI)
}

export function useRarityGoldContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? RARITY_GOLD_ADDRESS : undefined, RARITY_GOLD_ABI)
}

export function useRarityAttributesContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? RARITY_ATTRIBUTES_ADDRESS : undefined, RARITY_ATTRIBUTES_ABI)
}

export function useRarityHelperContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? RARITY_HELPER_ADDRESS : undefined, RARITY_HELPER_ABI)
}

export function useRaritySkillsContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? RARITY_SKILLS_ADDRESS : undefined, RARITY_SKILLS_ABI)
}
