import { useCallback } from 'react'
import { useRarityCraftingContract, useRaritySkillsContract } from './useContract'

interface CraftingInterface {}

export default function useRarityCrafting(): CraftingInterface {
    const crafting = useRarityCraftingContract()

    return {}
}
