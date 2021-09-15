import { useCallback } from 'react'
import { utils } from 'ethers'
import { useRarityDaycareContract } from './useContract'

interface DailyCareInterface {
    registerDaycare: (ids: string[], days: number) => Promise<void>
    daysPaid: (id: string) => Promise<number>
}

export default function useRarityDaycare(): DailyCareInterface {
    const daycare = useRarityDaycareContract()
    console.log(daycare)
    const daysPaid = useCallback(
        async (id: string): Promise<number> => {
            try {
                const days = await daycare?.daysPaid(id)
                return parseInt(days.toString())
            } catch (e) {
                console.log(e)
                return 0
            }
        },
        [daycare]
    )

    const registerDaycare = useCallback(
        async (ids: string[], days: number): Promise<void> => {
            try {
                const daysRegistry = Array(ids.length).fill(days, 0, ids.length)
                const fee = utils.parseUnits((0.1 * ids.length * days).toString(), 'ether')
                const tx = await daycare?.registerDaycare(ids, daysRegistry, { value: fee })
                return await tx.wait()
            } catch (e) {
                console.log(e)
                return
            }
        },
        [daycare]
    )

    return { daysPaid, registerDaycare }
}
