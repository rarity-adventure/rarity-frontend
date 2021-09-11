import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import { useCallback, useEffect, useState } from 'react'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { fromWei } from 'web3-utils'
import useDailyCare from '../../hooks/useDailyCare'
import Transfer from './Transfer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import useRarityName from '../../hooks/useRarityName'

interface SummonerCardProps {
    summoner: Summoner
    approved: boolean
    approveFunc: () => Promise<void>
    registerFunc: (ids: string[], days: number) => Promise<void>
}

export default function SummonerCard({
    summoner,
    approved,
    approveFunc,
    registerFunc,
}: SummonerCardProps): JSX.Element {
    const { exp, levelUp } = useRarity()

    const { daysRegistered } = useDailyCare()

    const { library, chainId } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const [registry, setRegistry] = useState(0)

    const [state, setState] = useState<{ registered: number; actual: string; nextLvl: string }>({
        actual: '0',
        nextLvl: '0',
        registered: 0,
    })

    const fetch = useCallback(async () => {
        const experience = await exp(summoner.id, summoner._level)
        const days = await daysRegistered(summoner.id)
        setState({
            registered: days,
            actual: fromWei(experience.actual.toString()),
            nextLvl: fromWei(experience.next.toString()),
        })
    }, [setState, exp, summoner, daysRegistered])

    useEffect(() => {
        if (!library || !windowVisible || !chainId || !exp) return
        fetch()
    }, [library, chainId, windowVisible, exp, fetch])

    const { summoner_name } = useRarityName()

    const [name, setName] = useState('')

    const fetch_name = useCallback(async () => {
        const summonerName = await summoner_name(summoner.id)
        if (!summonerName || summonerName === '') {
            setName('Unknown')
        } else {
            setName(summonerName)
        }
    }, [summoner, summoner_name])

    useEffect(() => {
        if (!library || !windowVisible || !chainId) return
        fetch_name()
    }, [fetch_name, library, windowVisible, chainId])

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
                <div className="m-2 flex flex-row mt-4 p-2 text-white text-sm bg-custom-selected text-center border-white border-2 rounded-lg justify-between">
                    <div />
                    <div>
                        <span>{name}</span>
                    </div>
                    <div>
                        <a rel="noreferrer" target="_blank" href="https://names.rarity.game">
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </a>
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
                        <span className="my-1">Days:</span>
                        <div className="flex items-center">
                            <input
                                className="mr-2 w-16 bg-custom-green border-2 border-white rounded text-center"
                                type="number"
                                onChange={(v) => {
                                    setRegistry(parseInt(v.target.value))
                                }}
                            />
                            {registry && registry !== 0 ? (
                                approved ? (
                                    <button
                                        className="bg-custom-green p-1 text-xs rounded-md border-2 border-white"
                                        onClick={async () => await registerFunc([summoner.id], registry)}
                                    >
                                        Register
                                    </button>
                                ) : (
                                    <button
                                        className="bg-custom-green p-1 text-xs rounded-md border-2 border-white"
                                        onClick={async () => await approveFunc()}
                                    >
                                        Approve
                                    </button>
                                )
                            ) : (
                                <button className="opacity-50 cursor-not-allowed bg-custom-green p-1 text-xs rounded-md border-2 border-white">
                                    Register
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="text-center py-2">
                        <span className="text-xs my-1">Registered for: {state.registered} Days</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
