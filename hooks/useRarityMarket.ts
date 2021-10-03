import { useRarityMarketContract, useRarityStarterPackContract } from './useContract'
import { useCallback } from 'react'
import { utils } from 'ethers'

interface MarketInterface {}

export default function useRarityMarket(): MarketInterface {
    const market = useRarityMarketContract()

    return {}
}
