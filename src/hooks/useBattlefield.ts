import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useBattlefieldContract } from './useContract'
import { ethers } from 'ethers'
import { useUserSummoners } from 'state/user/hooks'
import useFactions from './useFactions'
import { Summoner } from 'state/user/actions'
import useRarity from './useRarity'

export interface BattlefieldFaction {
    power: number
    members: number
    treasury: number
}

export interface useBattlefieldProps {
    tribute?: number
    clashDelay?: number
    faction: (faction: string) => Promise<BattlefieldFaction>
    participants: (faction: string) => Promise<{ idle: Summoner[] | undefined; sent: Summoner[] | undefined }>
    claimableTribute: (id: string) => Promise<number>
    powerIncrease: (id: string) => Promise<number>
    nextClashDate: () => Promise<Date>
    readySummoners: (ids: string[]) => Promise<void>
    retrieveSummoners: (ids: string[]) => Promise<void>
    startClash: () => Promise<void>
    retrieveShares: (ids: string[]) => Promise<void>
}

export default function useBattlefield(battlefieldKey: string): useBattlefieldProps {
    const { account } = useWeb3React()
    const { summoner } = useRarity()
    const battlefield = useBattlefieldContract(battlefieldKey)
    const summoners = useUserSummoners()
    const { enrollment } = useFactions()

    const [tribute, setTribute] = useState<number>()
    const [clashDelay, setClashDelay] = useState<number>()

    const fetchConstant = useCallback(async (): Promise<void> => {
        setTribute(Number(ethers.utils.formatEther(await battlefield?.tribute())))
        setClashDelay((await battlefield?.clashDelay()).toNumber())
    }, [battlefield])

    useEffect(() => {
        if (!battlefield) return
        fetchConstant()
    }, [battlefield, fetchConstant])

    const faction = useCallback(
        async (faction): Promise<BattlefieldFaction> => {
            try {
                const power = await battlefield?.factionPower(faction)
                const members = await battlefield?.numberOfMembersReady(faction)
                const treasury = await battlefield?.treasury(faction)
                console.log(faction, battlefield, power, members, treasury)
                return {
                    power: power.toNumber(),
                    members: members.toNumber(),
                    treasury: Number(ethers.utils.formatEther(treasury)),
                }
            } catch (e) {
                console.log(faction, e)
                return { power: 0, members: 0, treasury: 0 }
            }
        },
        [battlefield]
    )

    const participants = useCallback(
        async (faction: string) => {
            try {
                const sent: Summoner[] = [],
                    idle: Summoner[] = []

                if (account) {
                    const sentCount = await battlefield?.getOwnedSummoners(account)
                    for (let i = 0; i < sentCount; i++) {
                        const id = await battlefield?.getOwnedSummonerAtIndex(account, i)
                        const { faction: f } = await enrollment(id)
                        if (faction === f) {
                            const s = await summoner(id)
                            if (s) sent.push(s)
                        }
                    }
                }

                for (const summoner of summoners.filter((s) => !sent.map(e => e.id).includes(s.id))) {
                    const { faction: summonerFaction } = await enrollment(summoner.id)

                    if (summonerFaction === faction) {
                        idle.push(summoner)
                    }
                }

                console.log("fetched", sent, idle)
                return { idle, sent }
            } catch (e) {
                console.log(e, "participants")
                return { idle: undefined, sent: undefined }
            }
        },
        [account, battlefield, enrollment, summoner, summoners]
    )

    const claimableTribute = useCallback(
        async (id: string) => {
            try {
                const amount = await battlefield?.availableToCollect(id)
                return Number(ethers.utils.formatEther(amount.toString()))
            } catch (e) {
                console.log(e)
                return 0
            }
        },
        [battlefield]
    )

    const powerIncrease = useCallback(
        async (id: string) => {
            try {
                const amount = await battlefield?.powerIncrease(id)
                return amount.toNumber()
            } catch (e) {
                console.log(e)
                return 0
            }
        },
        [battlefield]
    )

    const nextClashDate = useCallback(async (): Promise<Date> => {
        try {
            const next = await battlefield?.nextClash()
            return new Date(next.toNumber() * 1000)
        } catch (e) {
            return new Date()
        }
    }, [battlefield])

    const readySummoners = useCallback(
        async (ids: string[]): Promise<void> => {
            if (!tribute) return
            if (ids.length === 0) {
                await battlefield?.readyOneSummoners(ids[0], { value: ethers.BigNumber.from(10).pow(17) })
            } else if (ids.length > 0) {
                await battlefield?.readyManySummoners(ids, {
                    value: ethers.BigNumber.from(10).pow(17).mul(ids.length),
                })
            }
        },
        [battlefield, tribute]
    )

    const retrieveSummoners = useCallback(
        async (ids: string[]): Promise<void> => {
            if (ids.length === 0) {
                await battlefield?.retrieveOneSummoners(ids[0])
            } else if (ids.length > 0) {
                await battlefield?.retrieveManySummoners(ids)
            }
        },
        [battlefield]
    )

    const startClash = useCallback(async () => {
        await battlefield?.startClash()
    }, [battlefield])

    const retrieveShares = useCallback(
        async (ids: string[]): Promise<void> => {
            if (ids.length === 0) {
                await battlefield?.readyOneSummoners(ids[0])
            } else if (ids.length > 0) {
                await battlefield?.readyManySummoners(ids)
            }
        },
        [battlefield]
    )

    return {
        faction,
        tribute,
        clashDelay,
        participants,
        claimableTribute,
        powerIncrease,
        nextClashDate,
        readySummoners,
        retrieveSummoners,
        startClash,
        retrieveShares,
    }
}
