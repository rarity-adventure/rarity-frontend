import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import Modal from '../index'
import { Item } from '../../../constants/codex/items'
import Loader from '../../Loader'
import { set } from 'immer/dist/utils/common'

interface CraftModalProps {
    open: boolean
    closeFunction: () => void
    success: boolean
    item: Item
    loading: boolean
}

export default function CraftResultModal({
    open,
    closeFunction,
    success,
    item,
    loading,
}: CraftModalProps): JSX.Element {
    const { i18n } = useLingui()

    const phrases = [
        'Adding goblin hair... ',
        'Looking for a griffin liver...',
        'Removing the goblin hair...',
        'Applying squid polish...',
        'Performing olfactory analysis...',
        'Adding Owlbear claws...',
        'Almost done...',
        "Oops, that doesn't go there...",
        'Improving durability...',
        'Feeding unicorns...',
    ]

    const [phrase, setPhrase] = useState<string>()

    function rand() {
        return Math.floor(Math.random() * 3)
    }

    useEffect(() => {
        setPhrase(phrases[rand()])
        const timer = setInterval(() => {
            setPhrase(phrases[rand()])
        }, 10000)

        return () => clearInterval(timer)
    }, [setPhrase])

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-card-bottom rounded-lg border-2 border-white">
                {loading ? (
                    <>
                        <ModalHeader title={i18n._(t`CRAFTING!`)} onClose={closeFunction} />
                        <div className="text-center flex flex-row justify-center mb-5">
                            <div className="flex flex-row">
                                <p className="text-white text-center">{phrase}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center mb-5">
                            <Loader size={'50'} />
                        </div>
                    </>
                ) : success ? (
                    <>
                        <ModalHeader title={i18n._(t`CONGRATULATIONS!`)} onClose={closeFunction} />
                        <div className="text-center p-2 mb-3 -mt-1 text-white">
                            <p className="text-center">{i18n._(t`You have successfully crafted`)}</p>
                            <p className="text-center uppercase mt-2">{item.name}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <ModalHeader title={i18n._(t`OH NO...`)} onClose={closeFunction} />
                        <div className="text-center p-2 mb-3 -mt-1 text-white">
                            <p>{i18n._(t`Your summoner messed up. `)}</p>
                            <p>{i18n._(t`Better luck next time!`)}</p>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
