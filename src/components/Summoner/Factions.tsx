import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect, useState } from 'react'
import { fromWei } from 'web3-utils'
import Transfer from './Transfer'
import useRarityAttributes from '../../hooks/useRarityAttributes'
import useFactions from '../../hooks/useFactions'
import { FACTIONS } from '../../constants/factions'
import { secondsToString } from '../../constants'

interface SummonerFactionsCardProps {
    summoner: Summoner
}

export default function SummonerFactionsCard({ summoner }: SummonerFactionsCardProps): JSX.Element {
    const { exp, levelUp } = useRarity()
    const { calcAP } = useRarityAttributes()
    const { enrolled, factionChangeDelay, enrollment, enroll } = useFactions()

    const { library, chainId } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const [state, setState] = useState<{ actual: string; nextLvl: string }>({ actual: '0', nextLvl: '0' })
    const [charactedCreated, setCharacterCreated] = useState<boolean>()
    const [summonerFaction, setSummonerFaction] = useState<string>()
    const [tempFaction, setTempFaction] = useState<string>()
    const [nextPossibleEnrollment, setNextPossibleEnrollment] = useState<Date>()

    const fetch = useCallback(async () => {
        const experience = await exp(summoner.id, summoner._level)
        setState({ actual: fromWei(experience.actual.toString()), nextLvl: fromWei(experience.next.toString()) })

        const tempAttrs = await calcAP(summoner.id, summoner._level)
        setCharacterCreated(tempAttrs !== 32)

        const { faction, date } = await enrollment(summoner.id)
        setSummonerFaction(faction)
        if (factionChangeDelay) setNextPossibleEnrollment(new Date(date.valueOf() + factionChangeDelay * 1000))
    }, [enrollment, factionChangeDelay, setState, exp, calcAP, summoner])

    useEffect(() => {
        if (!library || !windowVisible || !chainId || !exp) return
        fetch()
    }, [library, chainId, windowVisible, exp, fetch])

    const handleChangeFaction = useCallback(async () => {
        if (!tempFaction) return

        await enroll(Number(summoner.id).toString(), tempFaction)
        await fetch()
    }, [enroll, fetch, tempFaction, summoner])

    return (
        <div className="w-full border-custom-border border-8">
            <div className="grid grid-cols-1 gap-">
                <div className="p-4">
                    <div className="bg-custom-green mb-4 border-8 border-custom-border h-30 w-32 mx-auto">
                        <img
                            className="p-4 h-24 mx-auto"
                            src={CLASSES[summoner._class].image}
                            alt={CLASSES[summoner._class].name}
                        />
                    </div>
                    <div className="text-white bg-custom-blue px-2 text-xl border-2 border-solid w-32 mx-auto">
                        <h1>{CLASSES[summoner._class].name}</h1>
                    </div>
                </div>
                <Transfer summoner={summoner} />
                <div className="px-8 text-left text-white text-md font-bold">
                    <div className="flex justify-between items-center my-2">
                        <span>Summoner:</span>
                        <span>{parseInt(summoner.id, 16)}</span>
                    </div>
                    <div className="flex justify-between items-center my-2">
                        <span>Level:</span>
                        <span>
                            {parseInt(summoner._level, 16)}{' '}
                            <span className="text-xs">
                                ({state.actual}/{state.nextLvl})
                            </span>
                        </span>
                        {parseInt(state.actual) >= parseInt(state.nextLvl) ? (
                            <button
                                className="bg-custom-green border-2 rounded-md text-xs p-1"
                                onClick={async () => {
                                    await levelUp(summoner.id)
                                }}
                            >
                                Level UP
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="flex justify-between items-center my-2">
                        {summonerFaction && summonerFaction !== '0' ? (
                            <>
                                <span>Faction:</span>
                                <div className="flex">
                                    <span className="my-auto align-middle">{FACTIONS[summonerFaction].name}</span>
                                    <img
                                        className="p-4 h-20 mx-auto mr-0"
                                        src={FACTIONS[summonerFaction].image}
                                        alt={FACTIONS[summonerFaction].name}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <span>Faction:</span>
                                <span>Undefined</span>
                            </>
                        )}
                    </div>
                </div>
                {charactedCreated ? (
                    Date.now() > (nextPossibleEnrollment?.valueOf() || 0) ? (
                        <div className="w-full justify-center text-center mb-4">
                            <p className="w-full text-x text-white my-4">Select a faction</p>
                            <select
                                className="p-2 border-custom-green border-4 rounded-lg"
                                onChange={(v) => {
                                    setTempFaction(v.target.value)
                                }}
                            >
                                <option selected disabled hidden>
                                    Select a faction
                                </option>
                                {Object.entries(FACTIONS).map(([key, value]) => {
                                    return (
                                        <option key={value.name} value={key}>
                                            {value.name}
                                        </option>
                                    )
                                })}
                            </select>
                            {tempFaction && (
                                <>
                                    <div className="bg-white m-4 border-8 border-custom-border h-48 w-48 mx-auto">
                                        <img
                                            className="p-4 h-48 mx-auto"
                                            src={FACTIONS[tempFaction].image}
                                            alt={FACTIONS[tempFaction].name}
                                        />
                                    </div>
                                    {enrolled && (
                                        <div className="px-8 text-left text-white text-md font-bold">
                                            <div className="flex justify-between items-center my-2">
                                                <span>Enrolled:</span>
                                                <span>{enrolled[tempFaction]}</span>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        className="m-2 bg-custom-green border-4 border-white text-white p-2 text-xs rounded-lg"
                                        onClick={() => {
                                            handleChangeFaction()
                                        }}
                                    >
                                        Choose Faction
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="w-full justify-center text-white items-center my-2">
                            <span>Change faction in: </span>
                            <span>
                                {nextPossibleEnrollment
                                    ? secondsToString((nextPossibleEnrollment?.valueOf() - Date.now()) / 1000)
                                    : '???'}
                            </span>
                        </div>
                    )
                ) : (
                    <a href="/stats" className="text-custom-red p-4">
                        <span>You need to set the stats for this summoner before joining a faction</span>
                    </a>
                )}
            </div>
        </div>
    )
}
