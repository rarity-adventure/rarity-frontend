import { useFactionsContract } from './useContract'
import { useCallback, useEffect, useState } from 'react'
import { FACTIONS } from 'constants/factions'

export interface Faction {
    enrolled: { [faction: string]: number }
}

export interface useFactionsProps {
    enrolled?: { [faction: string]: number }
    factionChangeDelay?: number
    enrollment: (id: string) => Promise<{ faction: string; date: Date }>
    enroll: (id: string, faction: string) => Promise<void>
}

export default function useFactions(): useFactionsProps {
    const _factions = useFactionsContract()

    const [enrolled, setEnrolled] = useState<{ [faction: string]: number }>()
    const [factionChangeDelay, setFactionChangeDelay] = useState<number>()

    const fetchConstant = useCallback(async (): Promise<void> => {
        try {
            setFactionChangeDelay(await _factions?.factionChangeDelay())
        } catch (err) {
            setFactionChangeDelay(0)
        }
    }, [_factions])

    useEffect(() => {
        if (!_factions) return
        fetchConstant()
    }, [_factions, fetchConstant])

    const fetchEnrolled = useCallback(async (): Promise<void> => {
        const result: { [faction: string]: number } = {}
        for (const key of Object.keys(FACTIONS)) {
            try {
                const enrolled = await _factions?.enrolled(key)
                result[key] = enrolled.toNumber()
            } catch (e) {
                result[key] = 0
            }
        }

        setEnrolled(result)
    }, [_factions])

    useEffect(() => {
        if (!_factions) return
        fetchEnrolled()
    }, [_factions, fetchEnrolled])

    const enrollment = useCallback(
        async (id: string): Promise<{ faction: string; date: Date }> => {
            try {
                const [faction, date] = await _factions?.enrollments(id)
                return {
                    faction: faction.toString(),
                    date: new Date(date.toNumber() * 1000),
                }
            } catch (e) {
                return {
                    faction: '0',
                    date: new Date(0),
                }
            }
        },
        [_factions]
    )

    const enroll = useCallback(
        async (id: string, faction: string): Promise<void> => {
            await (await _factions?.enroll(id, faction)).wait()
            await fetchEnrolled()
        },
        [_factions, fetchEnrolled]
    )

    return {
        enrolled,
        factionChangeDelay,
        enrollment,
        enroll,
    }
}
