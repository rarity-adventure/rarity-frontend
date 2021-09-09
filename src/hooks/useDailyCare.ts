import { useCallback } from 'react'
import { useDailyCareContract } from './useContract'
import { toWei } from 'web3-utils'

interface DailyCareInterface {
    register: (ids: string[], days: number) => Promise<void>
    daysRegistered: (id: string) => Promise<number>
}

export default function useDailyCare(): DailyCareInterface {
    const care = useDailyCareContract()

    const daysRegistered = useCallback(
        async (id: string): Promise<number> => {
            try {
                const days = await care?.daysPaid(id)
                return parseInt(days.toString())
            } catch (e) {
                return 0
            }
        },
        [care]
    )

    const register = useCallback(
        async (ids: string[], days: number): Promise<void> => {
            try {
                const daysRegistry = Array(ids.length).fill(days, 0, ids.length)
                const fee = toWei((0.1 * ids.length * days).toString(), 'ether')
                await care?.registerDaycare(ids, daysRegistry, { value: fee })
                return
            } catch (e) {
                return
            }
        },
        [care]
    )

    return { daysRegistered, register }
}
