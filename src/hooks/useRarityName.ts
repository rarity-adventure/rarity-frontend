import { useRarityNameContract } from './useContract'
import { useCallback } from 'react'

interface GoldInterface {
    summoner_name: (id: string) => Promise<string>
}

export default function useRarityName(): GoldInterface {
    const name = useRarityNameContract()

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

    return { summoner_name }
}
