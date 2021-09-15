import { SummonerFullData } from '../../state/summoners/hooks'
import { t } from '@lingui/macro'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import { SKILL_URL, SKILLS } from '../../constants/codex/skills'
import HeadlessUIModal from '../Modal/HeadlessUIModal'
import ModalHeader from '../Modal/ModalHeader'
import { use } from 'ast-types'
import { add } from 'cheerio/lib/api/traversing'

interface SkillProfileProps {
    summoner: SummonerFullData
}

function SkillsProfile({ summoner }: SkillProfileProps): JSX.Element {
    const { i18n } = useLingui()

    const [skill, setSkill] = useState(1)
    const [modal, setModalOpen] = useState(false)

    const [availableSP, setAvailableSP] = useState(128)

    const [additions, setAdditions] = useState<{ [k: string]: number }>({})

    function handleAddition(id: string) {
        const addition = additions[id] ? additions[id] + 1 : 1
        const newState = Object.assign({}, additions, { [id]: addition })
        setAdditions(newState)
    }

    function handleSubstraction(id: string) {
        if (additions[id]) {
            const addition = additions[id] - 1
            const newState = Object.assign({}, additions, { [id]: addition })
            setAdditions(newState)
            console.log(newState)
        }
    }

    return (
        <div className="max-w-screen-md mx-auto">
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
                <div className="grid grid-cols-1 w-full px-2 md:mt-1 divide-white divide-y-2 overflow-scroll overflow-hidden h-60">
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
                                            <img src={'/img/skills/' + data.id + '.png'} alt={data.name} />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="uppercase text-sm md:text-lg">{i18n._(data.name)}</p>
                                        <p className="text-xs">
                                            {i18n._(t`SP cost`)}: 2 {i18n._(t`Max lvl`)}: 4
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
                <div className="hover:bg-card-content text-lg hover:text-grey focus:animate-bounce col-span-2 bg-card-bottom bg-background-cards border-2 rounded-b-2xl md:rounded-br-2xl text-center border-whiter">
                    <button className="w-full p-2">
                        <span className="uppercase">{i18n._(t`assign points`)}</span>
                    </button>
                </div>
            </div>
            <HeadlessUIModal isOpen={modal} onDismiss={() => setModalOpen(false)}>
                <div className="bg-background-end rounded-lg border-2 border-white">
                    <ModalHeader title={i18n._(SKILLS[skill].name)} onClose={() => setModalOpen(false)} />
                    <div>
                        <h1 className="text-md uppercase text-white mt-2 text-center">{i18n._(t`skill check`)}</h1>
                    </div>
                    <div className="text-justify text-white p-4 pb-8 gap-5">
                        <h2>{i18n._(SKILLS[skill].check)}</h2>
                    </div>
                    <div>
                        <h1 className="text-md uppercase text-white mt-2 text-center">{i18n._(t`skill action`)}</h1>
                    </div>
                    <div className="text-justify text-white p-4 pb-8 gap-5">
                        <h2>{i18n._(SKILLS[skill].action)}</h2>
                    </div>
                    <div className="flex flex-row justify-center pb-8">
                        <a
                            className="uppercase border-white border-2 border-round text-white p-2 rounded-lg"
                            target="_blank"
                            rel="noreferrer"
                            href={SKILL_URL(SKILLS[skill].name.toLowerCase())}
                        >
                            <h2>{i18n._(t`read more`)}</h2>
                        </a>
                    </div>
                </div>
            </HeadlessUIModal>
        </div>
    )
}

export default SkillsProfile
