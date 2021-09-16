import { useCallback } from 'react'
import { utils } from 'ethers'
import { useRarityDaycareContract } from './useContract'

interface DailyCareInterface {
    registerDaycare: (ids: string[], days: number) => Promise<void>
    daysPaid: (id: string) => Promise<number>
}

export default function useRarityDaycare(): DailyCareInterface {
    const daycare = useRarityDaycareContract()
    const daysPaid = useCallback(
        async (id: string): Promise<number> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const days = await daycare?.daysPaid(id)
                    resolve(parseInt(days.toString()))
                } catch (e) {
                    reject(0)
                }
            })
        },
        [daycare]
    )

    const registerDaycare = useCallback(
        async (ids: string[], days: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const daysRegistry = Array(ids.length).fill(days, 0, ids.length)
                    const fee = utils.parseUnits((0.1 * ids.length * days).toString(), 'ether')
                    const tx = await daycare?.registerDaycare(ids, daysRegistry, { value: fee })
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject()
                }
            })
        },
        [daycare]
    )

    return { daysPaid, registerDaycare }
}
