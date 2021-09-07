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

    const [attributes, setAttributes] = useState<{
        strength: number
        dexterity: number
        constitution: number
        intelligence: number
        wisdom: number
        charisma: number
    }>({
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
    })

    const { scores } = useRarityAttributes()

    const fetchAttributes = useCallback(async () => {
        const attributes = await scores(summoner.id)
        setAttributes(attributes)
    }, [scores, summoner])

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
                        <span className="my-2">AP:</span>
                        <span>0</span>
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
                    <div className="flex justify-between items-center">
                        <span className="my-2">STR:</span>
                        <div className="flex items-center gap-2">
                            <span className="mr-10">{attributes.strength}</span>
                            <img src={increase} width="25px" alt="increase attribute" />
                            <img src={decrease} width="25px" alt="decrease attribute" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">DEX:</span>
                        <div className="flex items-center gap-2">
                            <span className="mr-10">{attributes.dexterity}</span>
                            <img src={increase} width="25px" alt="increase attribute" />
                            <img src={decrease} width="25px" alt="decrease attribute" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">CON:</span>
                        <div className="flex items-center gap-2">
                            <span className="mr-10">{attributes.constitution}</span>
                            <img src={increase} width="25px" alt="increase attribute" />
                            <img src={decrease} width="25px" alt="decrease attribute" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">INT:</span>
                        <div className="flex items-center gap-2">
                            <span className="mr-10">{attributes.intelligence}</span>
                            <img src={increase} width="25px" alt="increase attribute" />
                            <img src={decrease} width="25px" alt="decrease attribute" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">WIS:</span>
                        <div className="flex items-center gap-2">
                            <span className="mr-10">{attributes.wisdom}</span>
                            <img src={increase} width="25px" alt="increase attribute" />
                            <img src={decrease} width="25px" alt="decrease attribute" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="my-2">CHA:</span>
                        <div className="flex items-center gap-2">
                            <span className="mr-10">{attributes.charisma}</span>
                            <img src={increase} width="25px" alt="increase attribute" />
                            <img src={decrease} width="25px" alt="decrease attribute" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
