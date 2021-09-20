import { useCallback } from 'react'
import { useRarityCraftingContract, useRarityNamesContract, useRaritySkillsContract } from './useContract'

interface NamesInterface {

}

export default function useRarityNames(): NamesInterface {
    const names = useRarityNamesContract()


    return {  }
}
