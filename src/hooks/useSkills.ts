import { useSkillsContract } from './useContract'
import { useCallback } from 'react'

interface SkillsInterface {
    get_skills: (id: string) => Promise<number[]>
}

export default function useSkills(): SkillsInterface {
    const skills = useSkillsContract()

    const get_skills = useCallback(
        async (id: string): Promise<number[]> => {
            try {
                return await skills?.get_skills(id)
            } catch (e) {
                console.log(e)
                return []
            }
        },
        [skills]
    )

    return { get_skills }
}
