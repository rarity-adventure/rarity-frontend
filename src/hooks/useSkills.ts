import { useSkillsContract } from './useContract'

interface SkillsInterface {}

export default function useSkills(): SkillsInterface {
    const skills = useSkillsContract()
    console.log(skills)
    return {}
}
