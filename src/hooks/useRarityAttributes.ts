import { useRarityAttributesContract } from './useContract'
import { useCallback } from 'react'

interface AttributesInterface {
    scores: (id: string) => Promise<{
        strength: number
        dexterity: number
        constitution: number
        intelligence: number
        wisdom: number
        charisma: number
    }>
}

export default function useRarityAttributes(): AttributesInterface {
    const attributes = useRarityAttributesContract()

    const scores = useCallback(
        async (
            id: string
        ): Promise<{
            strength: number
            dexterity: number
            constitution: number
            intelligence: number
            wisdom: number
            charisma: number
        }> => {
            try {
                const attr = await attributes?.ability_scores(id)
                return {
                    strength: attr.strength,
                    dexterity: attr.dexterity,
                    constitution: attr.constitution,
                    intelligence: attr.intelligence,
                    wisdom: attr.wisdom,
                    charisma: attr.charisma,
                }
            } catch (e) {
                return {
                    strength: 0,
                    dexterity: 0,
                    constitution: 0,
                    intelligence: 0,
                    wisdom: 0,
                    charisma: 0,
                }
            }
        },
        [attributes]
    )

    return { scores }
}
