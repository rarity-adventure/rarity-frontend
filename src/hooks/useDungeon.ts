import { useDungeonContract } from './useContract'
import { useCallback } from 'react'

interface DungeonInterface {
    scout: (id: string, dungeon: string) => Promise<number>
    explore: (id: string, dungeon: string) => Promise<void>
}

export default function useDungeon(): DungeonInterface {
    const d = useDungeonContract()

    const scout = useCallback(
        async (id: string, dungeon: string): Promise<number> => {
            try {
                const r = await d[dungeon]?.scout(id)
                return parseInt(r.toString())
            } catch (e) {
                console.log(e)
                return 0
            }
        },
        [d]
    )

    const explore = useCallback(
        async (id: string, dungeon: string): Promise<void> => {
            try {
                const tx = await d[dungeon]?.adventure(id);
                await tx.wait()
                return
            } catch (e) {
                console.log(e)
                return
            }
        },
        [d]
    )

    return { scout, explore }
}
