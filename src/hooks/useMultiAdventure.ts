import { useMultiAdventureContract } from './useContract'
import { useCallback } from 'react'

interface MultiAdventure {
    at: (id: string[]) => Promise<void>
}

export default function useMultiAdventure(): MultiAdventure {
    const at = useMultiAdventureContract()

    const call = useCallback(
        async (ids: string[]): Promise<void> => {
            try {
                return await at?.adventureTime(ids)
            } catch (e) {
                return
            }
        },
        [at]
    )

    return { at: call }
}
