import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import Image from 'next/image'
import Modal from '../../Modal'
import ModalHeader from '../../ModalHeader'
import { SKILL_URL, SKILLS } from '../../../../constants/codex/skills'

interface SkillModalProps {
    open: boolean
    closeFunction: () => void
    skill: number
}

export default function SkillModal({ open, closeFunction, skill }: SkillModalProps): JSX.Element {
    const { i18n } = useLingui()

    function skillUrl(skill: number) {
        const name = SKILLS[skill].name.toLowerCase()
        const split = name.split(' ')
        if (split.length === 1) return SKILL_URL(name)
        if (split.length === 2) return SKILL_URL(split[0] + split[1][0].toUpperCase() + split[1].substring(1))
        if (split.length === 3)
            return SKILL_URL(
                split[0] +
                    split[1][0].toUpperCase() +
                    split[1].substring(1) +
                    split[2][0].toUpperCase() +
                    split[2].substring(1)
            )

        return
    }

    return (
        <Modal isOpen={open} onDismiss={() => closeFunction()}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(SKILLS[skill].name)} onClose={() => closeFunction()} />
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
                        href={skillUrl(skill)}
                    >
                        <h2>{i18n._(t`read more`)}</h2>
                    </a>
                </div>
            </div>
        </Modal>
    )
}
