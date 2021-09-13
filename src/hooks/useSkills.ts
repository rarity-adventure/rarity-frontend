import { useSkillsContract } from './useContract'
import { useCallback } from 'react'

interface SkillsInterface {
    get_skills: (id: string) => Promise<number[]>
    skills_per_level: (int: number, _class: string, level: string) => Promise<number>
    class_skills: (_class: string) => Promise<boolean[]>
    set_skills: (id: string, skills: number[]) => Promise<void>
}

export default function useSkills(): SkillsInterface {
    const skills = useSkillsContract()

    const get_skills = useCallback(
        async (id: string): Promise<number[]> => {
            try {
                return await skills?.get_skills(id)
            } catch (e) {
                return []
            }
        },
        [skills]
    )

    const skills_per_level = useCallback(
        async (int: number, _class: string, level: string): Promise<number> => {
            try {
                return await skills?.skills_per_level(int, _class, level)
            } catch (e) {
                return 0
            }
        },
        [skills]
    )

    const class_skills = useCallback(
        async (_class: string): Promise<boolean[]> => {
            try {
                return await skills?.class_skills(_class)
            } catch (e) {
                return []
            }
        },
        [skills]
    )

    const set_skills = useCallback(
        async (id: string, _skills: number[]): Promise<void> => {
            try {
                return await skills?.set_skills(id, _skills)
            } catch (e) {
                return
            }
        },
        [skills]
    )

    return { get_skills, skills_per_level, class_skills, set_skills }
}
