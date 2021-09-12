import { Summoner } from '../../state/user/actions'
import { CLASS_SKILLS, CLASSES, intModifierForSkills } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useCallback, useEffect, useState } from 'react'
import { fromWei } from 'web3-utils'
import Transfer from './Transfer'
import { SKILLS } from '../../constants/codex'
import useSkills from '../../hooks/useSkills'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faQuestionCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import useRarityAttributes from '../../hooks/useRarityAttributes'
import useRarityName from '../../hooks/useRarityName'

interface SummonerStatsCardProps {
    summoner: Summoner
}

export default function SummonerSkillsCard({ summoner }: SummonerStatsCardProps): JSX.Element {
    const { library, chainId, account } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const { exp, levelUp } = useRarity()

    const [expState, setExpState] = useState<{ actual: string; nextLvl: string }>({ actual: '0', nextLvl: '0' })

    const fetchExp = useCallback(async () => {
        const experience = await exp(summoner.id, summoner._level)
        setExpState({ actual: fromWei(experience.actual.toString()), nextLvl: fromWei(experience.next.toString()) })
    }, [exp, setExpState, summoner])

    useEffect(() => {
        if (!library || !windowVisible || !chainId || !account) return
        fetchExp()
    }, [library, windowVisible, chainId, account, fetchExp])

    const { get_skills, skills_per_level, set_skills } = useSkills()

    const [currSkills, setCurrSkills] = useState<{ [k: string]: number }>({})

    const [tempSkills, setTempSkills] = useState<{ [k: string]: number }>({})

    const { scores, character_created } = useRarityAttributes()

    const [availableSP, setavailableSP] = useState<number>(0)

    const [tempSP, setTempSp] = useState<number>(0)

    const [classSkills, setClassSkills] = useState<{ [k: string]: boolean }>({})

    const [isCreated, setIsCreated] = useState<boolean>(false)

    const fetchSkills = useCallback(async () => {
        const created = await character_created(summoner.id)
        setIsCreated(created)
        if (created) {
            const skills = await get_skills(summoner.id)
            const skillsObj: { [k: string]: number } = {}
            for (let i = 0; i < skills.length; i++) {
                skillsObj[i + 1] = skills[i]
            }
            setCurrSkills(skillsObj)
            setTempSkills(skillsObj)

            const attributes = await scores(summoner.id)
            const skillsPL = await skills_per_level(
                intModifierForSkills(attributes['int']),
                summoner._class,
                summoner._level
            )
            const availableSP = parseInt(skillsPL.toString()) - skills.reduce((x, y) => x + y)
            setavailableSP(availableSP)
            setTempSp(availableSP)
        }
    }, [get_skills, setCurrSkills, setTempSkills, summoner, skills_per_level, scores, character_created])

    useEffect(() => {
        if (!library || !chainId || !account) return
        fetchSkills()
    }, [library, chainId, account, fetchSkills])

    useEffect(() => {
        if (!library || !windowVisible || !chainId || !account) return
        const classSkills = CLASS_SKILLS[summoner._class]
        const classSkillsObj: { [k: string]: boolean } = {}
        for (let i = 0; i < classSkills.length; i++) {
            classSkillsObj[i + 1] = classSkills[i]
        }
        setClassSkills(classSkillsObj)
    }, [library, windowVisible, chainId, account, summoner])

    function calcTempSPWithState(state: { [k: string]: number }): number {
        return availableSP - Object.values(state).reduce((x, y) => x + y)
    }

    function handleAssign(skill: number) {
        const tempState = Object.assign({}, { [skill]: tempSkills[skill] + 1 })
        if (calcTempSPWithState(tempState) >= 0 && tempState[skill] <= calcMaxSkillLvl(skill)) {
            const addition = (tempSkills[skill] += 1)
            const newState = Object.assign({}, tempSkills, { [skill]: addition })
            setTempSkills(newState)
            calcTempSP()
        }
    }

    function handleReduce(skill: number) {
        const tempState = Object.assign({}, { [skill]: tempSkills[skill] - 1 })
        if (currSkills[skill] <= tempState[skill] + 1) {
            const addition = (tempSkills[skill] -= 1)
            const newState = Object.assign({}, tempSkills, { [skill]: addition })
            setTempSkills(newState)
            calcTempSP()
        }
    }

    function calcTempSP() {
        let sp = availableSP
        sp -= Object.keys(tempSkills)
            .map((k: string) => {
                return classSkills[parseInt(k)] ? tempSkills[parseInt(k)] : tempSkills[parseInt(k)] * 2
            })
            .reduce((x, y) => x + y)
        setTempSp(sp)
    }

    function calcMaxSkillLvl(skill: number): number {
        const classLvl = parseInt(summoner._level) + 3
        return classSkills[skill] ? classLvl : Math.floor(classLvl / 2)
    }

    async function assignSkills() {
        await set_skills(summoner.id, Object.values(tempSkills))
    }

    function reset() {
        const newState = Object.assign(tempSkills, currSkills)
        setTempSkills(newState)
        setTempSp(availableSP)
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
    }, [fetch_name, chainId, library, windowVisible])

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
                                ({expState.actual}/{expState.nextLvl})
                            </span>
                        </span>
                        {parseInt(expState.actual) >= parseInt(expState.nextLvl) ? (
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
                    {isCreated ? (
                        <>
                            <div className="mt-8 text-lg text-center">
                                <p>Available SP</p>
                            </div>
                            <div className="my-2 text-xl text-center">
                                <p>{tempSP}</p>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => reset()}
                                    className="text-center text-xs bg-custom-green text-white rounded-lg border-2 border-white p-2"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full mx-auto mt-10  gap-5 mb-10">
                                {Object.keys(SKILLS).map((k) => {
                                    if (classSkills[parseInt(k)]) {
                                        return (
                                            <div
                                                key={k}
                                                className={
                                                    'static border-white bg-custom-selected text-white w-full text-center py-1 px-2 text-xs border-2 border-solid'
                                                }
                                            >
                                                <div>
                                                    <a
                                                        className="-ml-8"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href={
                                                            'https://www.d20srd.org/srd/skills/' +
                                                            SKILLS[k].name.toLowerCase() +
                                                            '.htm'
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faQuestionCircle} />
                                                    </a>
                                                    <span className="ml-4 text-sm">{SKILLS[k].name}</span>
                                                </div>
                                                <div className="flex flex-row justify-between items-center">
                                                    <button onClick={() => handleReduce(parseInt(k))}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <span>{tempSkills[parseInt(k)]}</span>
                                                    <button onClick={() => handleAssign(parseInt(k))}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                                <div className="flex mx-auto items-center justify-between w-3/4">
                                                    <span>Cost: 1</span>&nbsp;
                                                    <span>Max: {calcMaxSkillLvl(parseInt(k))}</span>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div
                                                key={k}
                                                className={
                                                    'bg-custom-green text-white w-full text-center py-1 px-2 text-xs border-2 border-solid'
                                                }
                                            >
                                                <div>
                                                    <a
                                                        className="-ml-8"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href={
                                                            'https://www.d20srd.org/srd/skills/' +
                                                            SKILLS[k].name.toLowerCase() +
                                                            '.htm'
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faQuestionCircle} />
                                                    </a>
                                                    <span className="ml-4 text-sm">{SKILLS[k].name}</span>
                                                </div>
                                                <div className="flex flex-row justify-between items-center">
                                                    <button onClick={() => handleReduce(parseInt(k))}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <span>{tempSkills[parseInt(k)]}</span>
                                                    <button onClick={() => handleAssign(parseInt(k))}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                                <div className="flex mx-auto items-center justify-between w-3/4">
                                                    <span>Cost: 2</span>&nbsp;
                                                    <span>Max: {calcMaxSkillLvl(parseInt(k))}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <div className="w-full my-6 text-center">
                                {tempSP === 0 ? (
                                    <button
                                        onClick={async () => await assignSkills()}
                                        className="bg-custom-green p-2 border-white border-4 rounded-lg text-2xl"
                                    >
                                        Assign Skills
                                    </button>
                                ) : (
                                    <button className="opacity-50 cursor-not-allowed bg-custom-green p-2 border-white border-4 rounded-lg text-2xl">
                                        Assign Skills
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-10">
                            <span>The choose your summoner skills you need to have your attributes defined</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
