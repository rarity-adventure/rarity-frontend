import { t } from '@lingui/macro'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { SKILL_URL, SKILLS } from '../../constants/codex/skills'
import { RefreshIcon } from '@heroicons/react/outline'
import useRaritySkills from '../../hooks/useRaritySkills'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import Image from 'next/image'
import SkillModal from '../Modal/modals/info/Skill'
import { CLASS_SKILLS } from '../../constants/codex/classes'
import { sendToast } from '../../functions/toast'

function SummonerSkillsCard({ summoner }: { summoner: SummonerFullData }): JSX.Element {
    const { i18n } = useLingui()

    const [skill, setSkill] = useState(1)
    const [modal, setModalOpen] = useState(false)

    const [availableSP, setAvailableSP] = useState(0)

    useEffect(() => {
        const points = summoner.skills.total_points - summoner.skills.spent_points
        setAvailableSP(points)
    }, [summoner])

    const [additions, setAdditions] = useState<{ [k: string]: number }>({})

    function handleAddition(id: string) {
        const addition = additions[id] ? additions[id] + 1 : 1
        const nextValue = summoner.skills.skills[parseInt(id) - 1] + addition
        const newState = Object.assign({}, additions, { [id]: addition })
        const sp = calcAvailableSP(newState)
        if (nextValue <= maxLevel(id) && sp >= 0) {
            setAdditions(newState)
            setAvailableSP(sp)
        }
    }

    function handleSubstraction(id: string) {
        if (additions[id]) {
            const addition = additions[id] - 1
            const newState = Object.assign({}, additions, { [id]: addition })
            const sp = calcAvailableSP(newState)
            setAdditions(newState)
            setAvailableSP(sp)
        }
    }

    function maxLevel(id: string): number {
        return CLASS_SKILLS[summoner.base._class.toString()][parseInt(id) - 1]
            ? summoner.base._level + 3
            : Math.floor((summoner.base._level + 3) / 2)
    }

    function spCost(id: string): number {
        return CLASS_SKILLS[summoner.base._class.toString()][parseInt(id) - 1] ? 1 : 2
    }

    function calcAvailableSP(state: { [k: string]: number }): number {
        let sp = summoner.skills.total_points - summoner.skills.spent_points
        Object.keys(state).map((k) => {
            CLASS_SKILLS[summoner.base._class.toString()][parseInt(k) - 1] ? (sp -= state[k]) : (sp -= state[k] * 2)
        })
        return sp
    }

    function reset() {
        setAdditions({})
        setAvailableSP(summoner.skills.total_points - summoner.skills.spent_points)
    }

    const { set_skills } = useRaritySkills()

    async function assignSkills() {
        const nextSkills = [...summoner.skills.skills]
        Object.keys(additions).map((k) => {
            nextSkills[parseInt(k) - 1] += additions[k]
        })
        await sendToast(set_skills(summoner.id, nextSkills), i18n._(t`Assigning skill`))
    }

    return (
        <div className="max-w-screen-md mx-auto z-20">
            <div className="flex flex-row w-full items-center">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 w-full">
                    <div className="bg-card-top col-span-3 md:p-2 p-1 bg-background-cards border-white border-2 rounded-t-2xl md:rounded-tl-2xl md:rounded-tr-none text-left">
                        <span className="ml-1.5 uppercase">{i18n._(t`skills`)}</span>
                    </div>
                    <div className="w-full mt-3 md:mt-0 md:p-2 p-1 bg-card-button col-span-2 bg-background-cards border-white border-2 md:rounded-tr-2xl text-center">
                        <span className="uppercase">
                            {i18n._(t`SP`)}: {availableSP}
                        </span>
                    </div>
                </div>
            </div>
            <div className="border-white border-2 my-3 bg-background-cards w-full bg-card-content">
                <div className="grid grid-cols-1 w-full px-2 md:mt-1 divide-white divide-y-2 scrollbar-hide overflow-scroll overflow-hidden h-60">
                    {Object.keys(SKILLS).map((k, i) => {
                        const data = SKILLS[k]
                        return (
                            <div key={k} className="flex flex-row items-center justify-between">
                                <div className="flex flex-row justify-start items-center p-2">
                                    <div className="text-xl mr-2">
                                        <button
                                            onClick={() => {
                                                setSkill(parseInt(k))
                                                setModalOpen(true)
                                            }}
                                        >
                                            <Image
                                                src={'/img/skills/' + data.id + '.png'}
                                                width={32}
                                                height={32}
                                                alt={data.name}
                                            />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="uppercase text-sm md:text-lg">{i18n._(data.name)}</p>
                                        <p className="text-xs">
                                            {i18n._(t`SP cost`)}: {spCost(k)} {i18n._(t`Max lvl`)}: {maxLevel(k)}
                                            {}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <div className="text-lg md:text-xl my-auto mr-10">
                                        <p>
                                            {additions[k] !== undefined
                                                ? summoner.skills.skills[i] + additions[k]
                                                : summoner.skills.skills[i]}
                                        </p>
                                    </div>
                                    <div className="mt-1">
                                        <button
                                            className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                            onClick={() => handleSubstraction(k)}
                                        >
                                            <MinusIcon width={18} />
                                        </button>
                                    </div>
                                    <div className="mt-1">
                                        <button
                                            className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                            onClick={() => handleAddition(k)}
                                        >
                                            <PlusIcon width={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-row justify-end w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-2 w-full">
                    <div className="hover:bg-card-content text-lg hover:text-grey bg-card-bottom w-full bg-red bg-background-cards border-white border-2 md:rounded-b-2xl mb-3 md:mb-0 text-left">
                        <button className="w-full md:p-1" onClick={() => reset()}>
                            <div className="flex flex-row p-1 justify-center items-center">
                                <RefreshIcon width={30} />
                            </div>
                        </button>
                    </div>
                    <div />
                    <div className="hover:bg-card-content text-lg col-span-2 hover:text-grey focus:animate-bounce col-span-2 bg-card-bottom bg-background-cards border-2 rounded-b-2xl md:rounded-br-2xl text-center border-whiter">
                        <button
                            className="w-full p-2"
                            onClick={async () => {
                                await assignSkills()
                            }}
                        >
                            <span className="uppercase">{i18n._(t`assign points`)}</span>
                        </button>
                    </div>
                </div>
            </div>
            <SkillModal open={modal} closeFunction={() => setModalOpen(false)} skill={skill} />
        </div>
    )
}

export default SummonerSkillsCard
