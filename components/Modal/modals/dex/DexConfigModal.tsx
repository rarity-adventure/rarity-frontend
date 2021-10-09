import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import { Switch } from '@headlessui/react'
import Modal from '../../Modal'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'

export interface Config {
    slippageTolerance: number
    txDeadlineMins: number
    expertMode: boolean
    disableMultihops: boolean
}

interface DexConfigModalProps {
    open: boolean
    config?: Config
    dismissFunction: () => void
}

export default function DexConfigModal({ open, config, dismissFunction }: DexConfigModalProps): JSX.Element {
    const { i18n } = useLingui()

    const [expertModeSwitch, setExpertModeSwitch] = useState(false)
    const [disableMultiHopSwitch, setDisableMultiHopSwitch] = useState(false)

    return (
        <Modal isOpen={open} onDismiss={dismissFunction}>
            <div className="bg-card-bottom rounded-lg p-8 text-white border-2 border-white work-sans">
                <div className="w-1/2 m-auto">
                    <div className="flex mb-2">
                        <span className="mr-1 capitalize text-lg">{i18n._(t`transaction settings`)}</span>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <span className="mr-1 capitalize">{i18n._(t`slippage tolerance`)}</span>
                            <QuestionMarkCircleIcon width={16} />
                        </div>
                        <input className="rounded bg-background-end px-2 mr-2" type="number" />
                        <span>%</span>
                    </div>
                    <div className="mb-6">
                        <div className="flex">
                            <span className="mr-1 capitalize">{i18n._(t`transaction deadline`)}</span>
                            <QuestionMarkCircleIcon width={16} />
                        </div>
                        <input className="rounded bg-background-end px-2 mr-2" type="number" />
                        <span>minutes</span>
                    </div>
                    <div className="flex mb-2">
                        <span className="mr-1 capitalize text-lg">{i18n._(t`interface settings`)}</span>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <span className="mr-1 capitalize">{i18n._(t`toggle expert mode`)}</span>
                            <QuestionMarkCircleIcon width={16} />
                        </div>
                        <Switch
                            checked={expertModeSwitch}
                            onChange={setExpertModeSwitch}
                            className={`${
                                expertModeSwitch ? 'bg-green' : 'bg-red'
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                        >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${
                                    expertModeSwitch ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                        </Switch>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <span className="mr-1 capitalize">{i18n._(t`disable multihops`)}</span>
                            <QuestionMarkCircleIcon width={16} />
                        </div>
                        <Switch
                            checked={disableMultiHopSwitch}
                            onChange={setDisableMultiHopSwitch}
                            className={`${
                                disableMultiHopSwitch ? 'bg-green' : 'bg-red'
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                        >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${
                                    disableMultiHopSwitch ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
