import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect, useState } from 'react'
import { fromWei } from 'web3-utils'
import useRarityAttributes from '../../hooks/useRarityAttributes'
import increase from '../../assets/images/increase_attribute.png'
import decrease from '../../assets/images/decrease_attribute.png'
import useGold from '../../hooks/useRarityGold'
import { calcAPCost } from '../../constants'

interface SummonerStatsCardProps {
    summoner: Summoner
}

export default function SummonerStatsCard({ summoner }: SummonerStatsCardProps): JSX.Element {
    const { exp } = useRarity()

    const { library, chainId } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const [state, setState] = useState<{ actual: string; nextLvl: string }>({ actual: '0', nextLvl: '0' })

    const fetch = useCallback(async () => {
        const experience = await exp(summoner.id, summoner._level)
        setState({ actual: fromWei(experience.actual.toString()), nextLvl: fromWei(experience.next.toString()) })
    }, [setState, exp, summoner])

    useEffect(() => {
        if (!library || !windowVisible || !chainId || !exp) return
        fetch()
    }, [library, chainId, windowVisible, exp, fetch])

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
        if (!library || !windowVisible || !chainId) return
        fetchAttributes()
    }, [library, chainId, windowVisible, fetchAttributes])

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
        if (!library || !windowVisible || !chainId) return
        fetchGold()
    }, [library, chainId, windowVisible, fetchGold])

    useEffect(() => {
        if (loaded) {
            setTempAttrs(currAttrs)
            setTempAP(availableAP)
        }
    })

    function calcTempAP() {
        let ap = availableAP;
        ap -= calcAPCost(tempAttrs['str'])
        ap -= calcAPCost(tempAttrs['dex'])
        ap -= calcAPCost(tempAttrs['con'])
        ap -= calcAPCost(tempAttrs['int'])
        ap -= calcAPCost(tempAttrs['wis'])
        ap -= calcAPCost(tempAttrs['cha'])
        setTempAP(ap)
    }

    function calcTempAPWithState(state: {[k: string]: number}): number {
        let ap = availableAP;
        ap -= calcAPCost(tempAttrs['str'])
        ap -= calcAPCost(tempAttrs['dex'])
        ap -= calcAPCost(tempAttrs['con'])
        ap -= calcAPCost(tempAttrs['int'])
        ap -= calcAPCost(tempAttrs['wis'])
        ap -= calcAPCost(tempAttrs['cha'])
        return ap
    }

    function handleAddition(attr: string) {
        const tempState = Object.assign({}, tempAttrs, { [attr]: tempAttrs[attr] + 1 })
        if (calcTempAPWithState(tempState) > 0) {
            const addition = (tempAttrs[attr] += 1)
            const newState = Object.assign({}, tempAttrs, { [attr]: addition })
            setTempAttrs(newState)
            calcTempAP()
        }
    }

    function handleSubstraction(attr: string) {
        if (currAttrs[attr] < tempAttrs[attr]) {
            const addition = (tempAttrs[attr] -= 1)
            const newState = Object.assign({}, tempAttrs, { [attr]: addition })
            setTempAttrs(newState)
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

    return (
        <div className="w-full border-custom-border border-8 p-4">
            <div className="grid grid-cols-1 gap-4">
                <div className="p-8">
                    <div className="bg-custom-green mb-4 border-8 border-custom-border h-40">
                        <img className="p-4 h-36 mx-auto" src={CLASSES[summoner._class].image} alt={'barbarian'} />
                    </div>
                    <div className="text-white bg-custom-blue py-1 px-2 text-2xl border-2 border-solid">
                        <h1>{CLASSES[summoner._class].name}</h1>
                    </div>
                </div>
                <div className="col-span-2 p-8 text-left text-white text-2xl font-bold">
                    <div className="flex justify-end">
                        <button
                            className="uppercase font-bold bg-custom-green border-white border-2 rounded-lg text-xs p-1"
                            onClick={() => {
                                reset()
                            }}
                        >
                            Reset
                        </button>
                    </div>
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
                        <span className="my-2">AP (Unassigned):</span>
                        <span>{tempAP}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">Gold:</span>
                        <div className="flex items-center">
                            <span>{gold.balance.toFixed(4)}</span>
                            {gold.canClaim > 0 ? (
                                <button
                                    className="ml-4 bg-custom-green p-2 text-sm rounded-md border-2 border-white"
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
                                <span className="my-2">{k.toUpperCase()}:</span>
                                <div className="flex items-center gap-2">
                                    {tempAttrs[k]}
                                    <button onClick={() => handleAddition(k)}>
                                        <img src={increase} width="25px" alt="increase attribute" />
                                    </button>
                                    <button onClick={() => handleSubstraction(k)}>
                                        <img src={decrease} width="25px" alt="decrease attribute" />
                                    </button>
                                    <span className="text-sm">{calcAPCost(tempAttrs[k])}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-center">
                    <button
                        className="text-white uppercase font-bold bg-custom-green border-white border-2 rounded-lg text-lg  p-1"
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
