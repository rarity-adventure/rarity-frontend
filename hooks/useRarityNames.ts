import { useCallback } from 'react'
import { useRarityCraftingContract, useRarityNamesContract, useRaritySkillsContract } from './useContract'

interface NamesInterface {
    validate_name: (name: string) => Promise<boolean>
    is_name_claimed: (name: string) => Promise<boolean>
    claim: (name: string, summoner: string) => Promise<void>
}

export default function useRarityNames(): NamesInterface {
    const names = useRarityNamesContract()

    const validate_name = useCallback(
        async (_name: string): Promise<boolean> => {
            try {
                return await names?.validate_name(_name)
            } catch (e) {
                return false
            }
        },
        [names]
    )

    const is_name_claimed = useCallback(
        async (_name: string): Promise<boolean> => {
            try {
                return await names?.is_name_claimed(_name)
            } catch (e) {
                return false
            }
        },
        [names]
    )

    const claim = useCallback(
        async (_name: string, summoner): Promise<void> => {
            try {
                const tx = await names?.claim(_name, summoner)
                return await tx.wait()
            } catch (e) {
                return
            }
        },
        [names]
    )

    return { validate_name, is_name_claimed, claim }
}
