import { useCallback } from 'react'
import { useRaritySkillsContract } from './useContract'

interface SkillsInterface {
    set_skills: (id: number, skills: number[]) => Promise<void>
}

export default function useRaritySkills(): SkillsInterface {
    const skills = useRaritySkillsContract()

    const set_skills = useCallback(
        async (id: number, _skills: number[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await skills?.set_skills(id, _skills)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [skills]
    )

    return { set_skills }
}
