import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import { useCallback, useEffect, useState } from 'react'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { fromWei } from 'web3-utils'
import { secondsToString } from '../../constants'

interface SummonerCardProps {
    summoner: Summoner
}

export default function SummonerAdventureCard({ summoner }: SummonerCardProps): JSX.Element {
    const { exp, adventure, nextAdventure } = useRarity()
    const { library, chainId } = useActiveWeb3React()
    const windowVisible = useIsWindowVisible()

    const [state, setState] = useState<{ actual: string; nextLvl: string; nextAdventure: number }>({
        actual: '0',
        nextAdventure: 0,
        nextLvl: '0',
    })

    const fetch = useCallback(async () => {
        const experience = await exp(summoner.id, summoner._level)
        const nextAdv = await nextAdventure(summoner.id)
        setState({
            actual: fromWei(experience.actual.toString()),
            nextAdventure: parseInt(nextAdv.toString()),
            nextLvl: fromWei(experience.next.toString()),
        })
    }, [nextAdventure, setState, exp, summoner])

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
                        <span className="my-2">Adventure:</span>
                        {state.nextAdventure * 1000 < Date.now() ? (
                            <button
                                className="bg-custom-green p-2 text-sm rounded-md border-2 border-white"
                                onClick={async () => await adventure(summoner.id)}
                            >
                                Go for adventure!
                            </button>
                        ) : (
                            <button
                                className="opacity-50 cursor-not-allowed bg-custom-green p-2 text-sm rounded-md border-2 border-white"
                                disabled
                            >
                                Go for adventure!
                            </button>
                        )}
                    </div>
                    {state.nextAdventure * 1000 > Date.now() ? (
                        <div className="flex justify-between items-center">
                            <span className="text-xs my-1">Next adventure in: </span>
                            <span className="text-xs">
                                {secondsToString((state.nextAdventure * 1000 - Date.now()) / 1000)}
                            </span>
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    )
}
