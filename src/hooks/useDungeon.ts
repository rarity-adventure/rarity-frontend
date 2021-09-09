import { useDungeonContract } from './useContract'
import { useCallback } from 'react'

interface DungeonInterface {
    scout: (id: string, dungeon: string) => Promise<number>
    explore: (id: string, dungeon: string) => Promise<void>
    log: (id: string, dungeon: string) => Promise<number>
}

export default function useDungeon(): DungeonInterface {
    const d = useDungeonContract()

    const scout = useCallback(
        async (id: string, dungeon: string): Promise<number> => {
            try {
                const r = await d[dungeon]?.scout(id)
                return parseInt(r.toString())
            } catch (e) {
                return 0
            }
        },
        [d]
    )

    const explore = useCallback(
        async (id: string, dungeon: string): Promise<void> => {
            try {
                const tx = await d[dungeon]?.adventure(id)
                await tx.wait()
                return
            } catch (e) {
                return
            }
        },
        [d]
    )

    const log = useCallback(
        async (id: string, dungeon: string): Promise<number> => {
            try {
                const log = await d[dungeon]?.adventurers_log(id)
                return parseInt(log.toString())
            } catch (e) {
                return 0
            }
        },
        [d]
    )

    return { scout, explore, log }
}
