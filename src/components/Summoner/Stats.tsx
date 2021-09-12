import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCallback, useEffect, useState } from 'react'
import { fromWei } from 'web3-utils'
import useRarityAttributes from '../../hooks/useRarityAttributes'
import increase from '../../assets/images/increase_attribute.png'
import decrease from '../../assets/images/decrease_attribute.png'
import useGold from '../../hooks/useRarityGold'
import { calcAPCost } from '../../constants'
import Transfer from './Transfer'
import useRarityName from '../../hooks/useRarityName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

interface SummonerStatsCardProps {
    summoner: Summoner
}

export default function SummonerStatsCard({ summoner }: SummonerStatsCardProps): JSX.Element {
    const { exp, levelUp } = useRarity()

    const { library, chainId } = useActiveWeb3React()

    const [state, setState] = useState<{ actual: string; nextLvl: string }>({ actual: '0', nextLvl: '0' })

    const fetch = useCallback(async () => {
        const experience = await exp(summoner.id, summoner._level)
        setState({ actual: fromWei(experience.actual.toString()), nextLvl: fromWei(experience.next.toString()) })
    }, [setState, exp, summoner])

    useEffect(() => {
        if (!library || !chainId || !exp) return
        fetch()
    }, [library, chainId, exp, fetch])

    const { scores, calcAP, point_buy } = useRarityAttributes()

    const [availableAP, setAvailableAP] = useState(0)

    const [tempAP, setTempAP] = useState(0)

    const [loaded, setLoaded] = useState(false)

    const [currAttrs, setCurrAttrs] = useState<{
        [k: string]: number
    }>({
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    })

    const [tempAttrs, setTempAttrs] = useState<{
        [k: string]: number
    }>({
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    })

    const fetchAttributes = useCallback(async () => {
        const attr = await scores(summoner.id)
        const AP = await calcAP(summoner.id, summoner._level)
        setCurrAttrs(attr)
        setAvailableAP(AP)
        setLoaded(true)
    }, [scores, calcAP, summoner])

    useEffect(() => {
        if (!library || !chainId) return
        fetchAttributes()
    }, [library, chainId, fetchAttributes])

    const [gold, setGold] = useState<{
        hasClaimed: number
        canClaim: number
        balance: number
    }>({
        hasClaimed: 0,
        canClaim: 0,
        balance: 0,
    })

    const { claim, claimed, claimable, balance } = useGold()

    const fetchGold = useCallback(async () => {
        const hasClaimed = await claimed(summoner.id)
        const canClaim = await claimable(summoner.id)
        const b = await balance(summoner.id)
        setGold({ hasClaimed: hasClaimed, canClaim: canClaim, balance: b })
    }, [summoner, claimed, balance, claimable])

    useEffect(() => {
        if (!library || !chainId) return
        fetchGold()
    }, [library, chainId, fetchGold])

    useEffect(() => {
        if (loaded) {
            setTempAttrs(currAttrs)
            setTempAP(availableAP)
        }
    }, [setTempAttrs, loaded, setTempAP, currAttrs, availableAP])

    function calcTempAP() {
        let ap = availableAP
        ap -= calcAPCost(tempAttrs['str'])
        ap -= calcAPCost(tempAttrs['dex'])
        ap -= calcAPCost(tempAttrs['con'])
        ap -= calcAPCost(tempAttrs['int'])
        ap -= calcAPCost(tempAttrs['wis'])
        ap -= calcAPCost(tempAttrs['cha'])
        setTempAP(ap)
    }

    function calcTempAPWithState(state: { [k: string]: number }): number {
        let ap = availableAP
        ap -= calcAPCost(state['str'])
        ap -= calcAPCost(state['dex'])
        ap -= calcAPCost(state['con'])
        ap -= calcAPCost(state['int'])
        ap -= calcAPCost(state['wis'])
        ap -= calcAPCost(state['cha'])
        return ap
    }

    function handleAddition(attr: string) {
        const tempState = Object.assign({}, tempAttrs, { [attr]: tempAttrs[attr] + 1 })
        if (calcTempAPWithState(tempState) >= 0) {
            const addition = (tempAttrs[attr] += 1)
            const newState = Object.assign({}, tempAttrs, { [attr]: addition })
            setTempAttrs(newState)
            calcTempAP()
        }
    }

    function handleSubstraction(attr: string) {
        if (currAttrs[attr] <= tempAttrs[attr] - 1) {
            tempAttrs[attr] -= 1
            setTempAttrs(tempAttrs)
            calcTempAP()
        }
    }

    function reset() {
        const newState = Object.assign(tempAttrs, currAttrs)
        setTempAttrs(newState)
        setTempAP(availableAP)
    }

    async function assign() {
        await point_buy(
            summoner.id,
            tempAttrs['str'],
            tempAttrs['dex'],
            tempAttrs['con'],
            tempAttrs['int'],
            tempAttrs['wis'],
            tempAttrs['cha']
        )
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
        if (!library || !chainId) return
        fetch_name()
    }, [fetch_name, chainId, library])

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
                <div>
                    {availableAP > 0 ? (
                        <button
                            className="text-xs bg-custom-green border-2 rounded-lg border-white p-1 text-white"
                            onClick={() => reset()}
                        >
                            Reset
                        </button>
                    ) : (
                        <div />
                    )}
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
                    <div className="flex justify-between items-center">
                        <span className="my-2">
                            AP <span className="text-xs">(Unassigned):</span>
                        </span>
                        <span>{tempAP}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">Gold:</span>
                        <div className="flex items-center">
                            <span>{gold.balance.toFixed(4)}</span>
                            {gold.canClaim > 0 ? (
                                <button
                                    className="ml-4 bg-custom-green p-1 text-xs rounded-md border-2 border-white"
                                    onClick={async () => {
                                        await claim(summoner.id)
                                    }}
                                >
                                    Claim
                                </button>
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                    {Object.keys(tempAttrs).map((k) => {
                        return (
                            <div key={k} className="flex justify-between items-center">
                                <span className="my-1">{k.toUpperCase()}:</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">{tempAttrs[k]}</span>
                                    <button onClick={() => handleAddition(k)}>
                                        <img src={increase} width="20px" alt="increase attribute" />
                                    </button>
                                    <button onClick={() => handleSubstraction(k)}>
                                        <img src={decrease} width="20px" alt="decrease attribute" />
                                    </button>
                                    <span className="text-sm w-4">{calcAPCost(tempAttrs[k])}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-center">
                    <button
                        className="m-4 text-white uppercase font-bold bg-custom-green border-white border-2 rounded-lg text-lg  p-1"
                        onClick={() => {
                            assign()
                        }}
                    >
                        Assign Points
                    </button>
                </div>
            </div>
        </div>
    )
}
