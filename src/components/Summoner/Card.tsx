import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import { useCallback, useEffect, useState } from 'react'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { fromWei } from 'web3-utils'
import useDailyCare from '../../hooks/useDailyCare'

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
    const { exp } = useRarity()

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

    return (
        <div className="w-full border-custom-border border-8">
            <div className="grid grid-cols-1 gap-4">
                <div className="p-8">
                    <div className="bg-custom-green mb-4 border-8 border-custom-border h-40">
                        <img className="p-4 h-36 mx-auto" src={CLASSES[summoner._class].image} alt={'barbarian'} />
                    </div>
                    <div className="text-white bg-custom-blue py-1 px-2 text-2xl border-2 border-solid">
                        <h1>{CLASSES[summoner._class].name}</h1>
                    </div>
                </div>
                <div className="p-8 text-left text-white text-2xl font-bold">
                    <div className="flex justify-between items-center">
                        <span className="my-2">Summoner ID:</span>
                        <span>{parseInt(summoner.id, 16)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">Level:</span>
                        <span>
                            {parseInt(summoner._level, 16)}{' '}
                            <span className="text-sm">
                                ({state.actual}/{state.nextLvl})
                            </span>
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">Days:</span>
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
                                        className="bg-custom-green p-2 text-sm rounded-md border-2 border-white"
                                        onClick={async () => await registerFunc([summoner.id], registry)}
                                    >
                                        Register
                                    </button>
                                ) : (
                                    <button
                                        className="bg-custom-green p-2 text-sm rounded-md border-2 border-white"
                                        onClick={async () => await approveFunc()}
                                    >
                                        Approve
                                    </button>
                                )
                            ) : (
                                <button className="opacity-50 cursor-not-allowed bg-custom-green p-2 text-sm rounded-md border-2 border-white">
                                    Register
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row-reverse items-center">
                        <span className="text-xs my-1">Registered for: {state.registered} Days</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
