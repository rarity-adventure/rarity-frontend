import { Contract } from '@ethersproject/contracts'
import useActiveWeb3React from './useActiveWeb3React'
import { useMemo } from 'react'
import { ethers } from 'ethers'
import { getContract } from '../utils'
import RARITY_ABI from '../constants/abis/rarity.json'
import GOLD_ABI from '../constants/abis/gold.json'
import ATTRIBUTES_ABI from '../constants/abis/attributes.json'
import MULTIADVENTURE_ABI from '../constants/abis/multiadventure.json'
import DAILYCARE_ABI from '../constants/abis/daycare.json'
import DUNGEON_ABI from '../constants/abis/dungeon.json'

import {
    ATTRIBUTES_CONTRACT,
    DAILYCARE_CONTRACT,
    DUNGEONS,
    GOLD_CONTRACTS,
    MULTIADVENTURE_CONTRACT,
    RARITY_CONTRACTS,
} from '../constants'

export function useContract(
    address: string | undefined,
    ABI: ethers.ContractInterface,
    withSignerIfPossible = true
): Contract | null {
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

export function useRarityContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? RARITY_CONTRACTS[chainId] : undefined, RARITY_ABI)
}

export function useRarityGoldContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? GOLD_CONTRACTS[chainId] : undefined, GOLD_ABI)
}

export function useRarityAttributesContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? ATTRIBUTES_CONTRACT[chainId] : undefined, ATTRIBUTES_ABI)
}

export function useMultiAdventureContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? MULTIADVENTURE_CONTRACT[chainId] : undefined, MULTIADVENTURE_ABI)
}

export function useDailyCareContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? DAILYCARE_CONTRACT[chainId] : undefined, DAILYCARE_ABI)
}

export function useDungeonContract(): { [k: string]: Contract | null } {
    const { library, account } = useActiveWeb3React()
    let dungeons: { [k: string]: Contract | null } = {}
    if (!library) return dungeons
    Object.keys(DUNGEONS).map((k) => {
        dungeons[k] = getContract(DUNGEONS[k].contract, DUNGEON_ABI, library, account ? account : undefined)
    })
    return dungeons
}
