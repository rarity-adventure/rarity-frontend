import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import { useCallback, useEffect, useState } from 'react'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { fromWei } from 'web3-utils'
import { DUNGEONS, secondsToString } from '../../constants'
import useDungeon from '../../hooks/useDungeon'
import Transfer from './Transfer'
import useRarityName from '../../hooks/useRarityName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

interface SummonerCardProps {
    summoner: Summoner
}

export default function SummonerAdventureCard({ summoner }: SummonerCardProps): JSX.Element {
    const { exp, adventure, nextAdventure, levelUp } = useRarity()
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

    const [actions, setActions] = useState<{
        scout: {
            success: boolean
            info: string
        }
        explore: {
            success: boolean
            info: string
            loading: boolean
        }
    }>({
        scout: {
            success: false,
            info: '',
        },
        explore: {
            loading: false,
            success: false,
            info: '',
        },
    })
    const [dungeon, setDungeon] = useState('cellar')

    async function handleDungeonSelect(k: string) {
        setDungeon(k)
    }

    const { scout, explore, log } = useDungeon()

    const [dungeonAvailable, setDungeonAvailable] = useState<boolean>(false)

    const fetchLog = useCallback(async () => {
        const summonerLog = await log(summoner.id, dungeon)
        setDungeonAvailable(summonerLog * 1000 < Date.now())
    }, [log, summoner, dungeon])

    useEffect(() => {
        if (!library || !windowVisible || !chainId || !exp) return
        fetchLog()
    }, [library, chainId, windowVisible, exp, fetchLog])

    async function scoutFunc() {
        const scoutInfo = await scout(summoner.id, dungeon)
        const info = scoutInfo
            ? 'You look inside the ' +
              DUNGEONS[dungeon].name +
              ' and see a shiny box with ' +
              scoutInfo +
              ' pieces of an unknown crafting material.'
            : 'You look inside the ' + DUNGEONS[dungeon].name + ' but all you see is an empty box.'
        const newState = Object.assign({}, actions, { scout: { success: true, info: info } })
        setActions(newState)
    }

    async function exploreFunc() {
        let newState = Object.assign({}, actions, { explore: { loading: true } })
        setActions(newState)
        await explore(summoner.id, dungeon)
        const info = 'Explore success'
        newState = Object.assign({}, actions, { explore: { info, loading: false } })
        setActions(newState)
    }

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
                    <div className="flex flex-row mt-4 p-2 text-white text-sm bg-custom-selected text-center border-white border-2 rounded-lg justify-between">
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
                        {state.actual === state.nextLvl || parseInt(state.actual) >= parseInt(state.nextLvl) ? (
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
                    <div className="flex justify-between items-center">
                        <span className="my-2">Adventure:</span>
                        {state.nextAdventure * 1000 < Date.now() ? (
                            <button
                                className="bg-custom-green p-1 text-xs rounded-md border-2 border-white"
                                onClick={async () => await adventure(summoner.id)}
                            >
                                Adventure!
                            </button>
                        ) : (
                            <button
                                className="opacity-50 cursor-not-allowed bg-custom-green p-1 text-xs rounded-md border-2 border-white"
                                disabled
                            >
                                Adventure!
                            </button>
                        )}
                    </div>
                    {state.nextAdventure * 1000 > Date.now() ? (
                        <div className="text-center my-2">
                            <p className="text-xs my-1">Next adventure</p>
                            <p className="text-xs">
                                {secondsToString((state.nextAdventure * 1000 - Date.now()) / 1000)}
                            </p>
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
                <div className="bg-custom-green text-center text-white text-2xl font-bold p-1">
                    <h1>Dungeons</h1>
                </div>
                <div className="p-2 my-2 text-right">
                    <select
                        className="w-full p-2 text-center rounded-md"
                        onChange={(v) => handleDungeonSelect(v.target.value)}
                    >
                        {Object.keys(DUNGEONS).map((k) => {
                            return (
                                <option key={k} value={k}>
                                    {DUNGEONS[k].name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="mx-10 mb-5 flex justify-between items-center text-white">
                    {dungeonAvailable ? (
                        <button
                            className="bg-custom-green p-2 text-md rounded-md border-2 border-white"
                            onClick={async () => await scoutFunc()}
                        >
                            Scout
                        </button>
                    ) : (
                        <button className="opacity-50 cursor-not-allowed bg-custom-green p-2 text-md rounded-md border-2 border-white">
                            Scout
                        </button>
                    )}

                    {actions.scout.success && dungeonAvailable ? (
                        <button
                            className="bg-custom-green text-white p-2 text-md rounded-md border-2 border-white"
                            onClick={async () => await exploreFunc()}
                        >
                            Explore
                        </button>
                    ) : (
                        <button className="opacity-50 cursor-not-allowed bg-custom-green text-white p-2 text-md rounded-md border-2 border-white">
                            Explore
                        </button>
                    )}
                </div>
                <div className="mx-10 mb-5 p-3 text-center items-center text-white rounded-lg bg-custom-green">
                    {dungeonAvailable ? (
                        actions.explore.loading ? (
                            <span>Loading...</span>
                        ) : actions.explore.success ? (
                            <span>{actions.explore.info}</span>
                        ) : actions.scout.success ? (
                            <span>{actions.scout.info}</span>
                        ) : (
                            <span>Scout first to see your reward</span>
                        )
                    ) : (
                        <span>You cannot go to the cellar at the moment</span>
                    )}
                </div>
            </div>
        </div>
    )
}
