import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FACTIONS } from '../../constants/factions'
import { secondsToString } from '../../constants'
import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import useBattlefield, { BattlefieldFaction } from '../../hooks/useBattlefield'
import useFactions from 'hooks/useFactions'
import useRarity from 'hooks/useRarity'
import { BATTLEFIELDS } from 'constants/battlefields'

interface SummonerBattlefieldCardProps {
    battlefield: string
    faction: string
}

export default function SummonerBattlefieldCard({ battlefield, faction }: SummonerBattlefieldCardProps): JSX.Element {
    const { approve, allowance } = useRarity()
    const { enrolled } = useFactions()
    const {
        faction: getFaction,
        participants,
        nextClashDate,
        claimableTribute,
        powerIncrease,
        startClash,
        readySummoners,
        retrieveSummoners,
    } = useBattlefield(battlefield)

    const { library, chainId, account } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const [approved, setApproved] = useState<boolean>(false)
    const [tempSummoner, setTempSummoner] = useState<Summoner>()
    const [factionInfo, setFactionInfo] = useState<BattlefieldFaction>()
    const [nextClash, setNextClash] = useState<Date>()
    const [claimable, setClaimable] = useState<{ [id: string]: number }>()
    const [powerIfAdded, setPowerIfAdded] = useState<{ [id: string]: number }>()
    const [sentMembers, setSentMembers] = useState<Summoner[]>()
    const [idleMembers, setIdleMembers] = useState<Summoner[]>()

    const fetchParticipants = useCallback(async () => {
        const { idle, sent } = await participants(faction)
        setSentMembers(sent)
        setIdleMembers(idle)
    }, [faction, participants])

    useEffect(() => {
        if(sentMembers && idleMembers) return
        fetchParticipants()
    }, [sentMembers, idleMembers, fetchParticipants])

    const allMembers = useMemo(() => {
        if (!idleMembers || !sentMembers) return []
        return idleMembers.concat(sentMembers)
    }, [idleMembers, sentMembers])

    const fetchClaimable = useCallback(async () => {
        if (!tempSummoner || !idleMembers || !sentMembers) return
        const newClaimable: { [id: string]: number } = {}
        for (const key of idleMembers) {
            newClaimable[key.id] = 0
        }
        for (const key of sentMembers) {
            newClaimable[key.id] = await claimableTribute(tempSummoner.id)
        }
        setClaimable(newClaimable)
    }, [tempSummoner, idleMembers, sentMembers, claimableTribute])

    const fetchPowerIfAdded = useCallback(async () => {
        if (!faction || !idleMembers || !sentMembers) return
        const newPowers: { [id: string]: number } = {}
        for (const key of idleMembers) {
            newPowers[key.id] = await powerIncrease(key.id)
        }
        for (const key of sentMembers) {
            newPowers[key.id] = await powerIncrease(key.id)
        }
        setPowerIfAdded(newPowers)
    }, [faction, idleMembers, sentMembers, setPowerIfAdded, powerIncrease])

    useEffect(() => {
        if (!faction) return
        fetchClaimable()
        fetchPowerIfAdded()
    }, [faction, fetchClaimable, fetchPowerIfAdded])

    const fetch = useCallback(async () => {
        setFactionInfo(await getFaction(faction))
        setNextClash(await nextClashDate())
        if (!account || !battlefield || !chainId) return
        setApproved(await allowance(account, BATTLEFIELDS[chainId][battlefield].address))
        fetchParticipants()
    }, [account, battlefield, chainId, faction, allowance, getFaction, fetchParticipants, nextClashDate])

    useEffect(() => {
        if (!library || !windowVisible || !chainId) return
        fetch()
    }, [library, chainId, windowVisible, fetch])

    const handleApprove = useCallback(async () => {
        if (!chainId || !battlefield) return

        await approve(BATTLEFIELDS[chainId][battlefield].address)
        await fetch()
    }, [approve, battlefield, chainId, fetch])

    const handleRetrieve = useCallback(async () => {
        if (!tempSummoner) return

        await retrieveSummoners([tempSummoner.id])
        await fetch()
    }, [retrieveSummoners, fetch, tempSummoner])

    const handleSend = useCallback(async () => {
        if (!tempSummoner) return

        await readySummoners([tempSummoner.id])
        await fetch()
    }, [readySummoners, fetch, tempSummoner])

    function summonerDataToString(summoner: Summoner): string {
        return (
            parseInt(summoner.id).toString() +
            ' Level ' +
            summoner._level +
            ' ' +
            CLASSES[summoner._class].name +
            ((sentMembers || []).includes(summoner) ? ', Sent' : ', Available')
        )
    }

    console.log(faction, factionInfo, claimable, powerIfAdded, allMembers)

    return (
        <div className="min-w-max p-4 border-custom-border border-8">
            <div className="grid grid-cols-1 gap-">
                <div className="p-4">
                    <div className="bg-white mb-4 border-8 border-custom-border h-42 w-48 mx-auto">
                        <img className="p-4 h-40 mx-auto" src={FACTIONS[faction].image} alt={FACTIONS[faction].name} />
                    </div>
                    <div className="text-white bg-custom-blue px-2 text-xl border-2 border-solid w-48 mx-auto">
                        <h1>{FACTIONS[faction].name}</h1>
                    </div>
                </div>

                <div className="px-8 text-left text-white text-md font-bold">
                    {factionInfo && (
                        <>
                            <div className="flex justify-between items-center my-2">
                                <span>Enrolled:</span>
                                <span>{(enrolled && enrolled[faction]) || 0}</span>
                            </div>
                            <div className="flex justify-between items-center my-2">
                                <span>On the field:</span>
                                <span>{factionInfo.members}</span>
                            </div>
                            <div className="flex justify-between items-center my-2">
                                <span>Treasury:</span>
                                <span>{factionInfo.treasury}</span>
                            </div>
                            <div className="flex justify-between items-center my-2">
                                <span>Power:</span>
                                <span>{factionInfo.power}</span>
                            </div>
                        </>
                    )}
                    {nextClash && (
                        <div className="flex justify-between items-center my-2">
                            <span>Next clash in:</span>
                            {nextClash.valueOf() - Date.now() > 0 ? (
                                <span>{secondsToString((nextClash?.valueOf() - Date.now()) / 1000)}</span>
                            ) : (
                                <button
                                    className="bg-custom-green border-2 rounded-md text-xs p-1"
                                    onClick={async () => {
                                        await startClash()
                                    }}
                                >
                                    Start Clash
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {allMembers.length > 0 ? (
                    <div className="w-100 my-4">
                        <p className="w-full text-x text-white my-4">Select a summoner</p>
                        <select
                            className="w-50 p-2 border-custom-green border-4 rounded-lg"
                            onChange={(v) => {
                                setTempSummoner(JSON.parse(v.target.value))
                            }}
                        >
                            <option selected disabled hidden>
                                Select a summoner...
                            </option>
                            {allMembers.map((summoner) => {
                                return (
                                    <option key={summoner.id} value={JSON.stringify(summoner)}>
                                        {summonerDataToString(summoner)}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                ) : (
                    <span className="w-full text-x text-white my-4">
                        You don&apos;t have summoners enrolled in this faction
                    </span>
                )}
                {tempSummoner && (
                    <div className="w-full justify-center text-center mb-4">
                        <div className="bg-custom-green mb-4 border-8 border-custom-border h-30 w-32 mx-auto">
                            <img
                                className="p-4 h-24 mx-auto"
                                src={CLASSES[tempSummoner._class].image}
                                alt={CLASSES[tempSummoner._class].name}
                            />
                        </div>
                        <div className="px-8 text-left text-white text-md font-bold">
                            <div className="flex justify-between items-center my-2">
                                <span>Claimable tribute:</span>
                                <span>{claimable ? claimable[tempSummoner.id] : 0}</span>
                            </div>
                        </div>
                        <div className="px-8 text-left text-white text-md font-bold">
                            <div className="flex justify-between items-center my-2">
                                <span>Power increase if added:</span>
                                <span>{powerIfAdded ? powerIfAdded[tempSummoner.id] : 0}</span>
                            </div>
                        </div>
                        <div className="px-3 mx-auto">
                            {approved ? (
                                (idleMembers || []).map((e) => e.id).includes(tempSummoner.id) ? (
                                    <button
                                        className="m-2 bg-custom-green border-4 border-white text-white p-2 text-xs rounded-lg"
                                        onClick={() => {
                                            handleSend()
                                        }}
                                    >
                                        Send Summoner
                                    </button>
                                ) : (
                                    <button
                                        className="m-2 bg-custom-green border-4 border-white text-white p-2 text-xs rounded-lg"
                                        onClick={() => {
                                            handleRetrieve()
                                        }}
                                    >
                                        Retrieve Summoner
                                    </button>
                                )
                            ) : (
                                <button
                                    className="m-2 bg-custom-green border-4 border-white text-white p-2 text-xs rounded-lg"
                                    onClick={() => {
                                        handleApprove()
                                    }}
                                >
                                    Approve
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
