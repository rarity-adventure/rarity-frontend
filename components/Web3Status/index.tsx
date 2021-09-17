import React from 'react'
import { NetworkContextName } from '../../constants'
import Web3Connect from '../Web3Connect'
import { shortenAddress } from '../../functions/format'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { ApplicationModal } from '../../state/application/actions'
import HeadlessUIModal from '../Modal/HeadlessUIModal'
import ModalHeader from '../Modal/ModalHeader'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { SUPPORTED_WALLETS } from '../../config/wallets'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Image from 'next/image'

function Web3StatusInner() {
    const { account } = useWeb3React()

    const toggleWalletModal = useWalletModalToggle()

    if (account) {
        return (
            <div
                id="web3-status-connected"
                className="flex items-center px-3 py-2 border-white border-2 rounded-lg text-sm rounded-lg text-secondary"
                onClick={toggleWalletModal}
            >
                <div className="mr-2 ">
                    <h2>{shortenAddress(account)}</h2>
                </div>
            </div>
        )
    } else {
        return <Web3Connect />
    }
}

export default function Web3Status() {
    const { i18n } = useLingui()

    const { active, account, connector, activate, error } = useWeb3React()

    const open = useModalOpen(ApplicationModal.WALLET)

    const toggleModal = useWalletModalToggle()

    const contextNetwork = useWeb3React(NetworkContextName)

    if (!contextNetwork.active && !active) {
        return null
    }

    const tryActivation = async (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => {
        let name = ''
        let conn = typeof connector === 'function' ? await connector() : connector

        Object.keys(SUPPORTED_WALLETS).map((key) => {
            if (connector === SUPPORTED_WALLETS[key].connector) {
                return (name = SUPPORTED_WALLETS[key].name)
            }
            return true
        })

        if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.wc?.uri) {
            conn.walletConnectProvider = undefined
        }

        conn &&
            activate(conn, undefined, true)
                .then(toggleModal)
                .catch((error) => {
                    if (error instanceof UnsupportedChainIdError) {
                        activate(conn)
                    }
                })
    }

    return (
        <>
            <Web3StatusInner />
            {account && <div />}
            {!account && !error && (
                <HeadlessUIModal isOpen={open} onDismiss={toggleModal}>
                    <div className="bg-background-end rounded-lg border-2 border-white">
                        <ModalHeader title={i18n._(t`choose a wallet`)} onClose={toggleModal} />
                        <div className="grid grid-cols-1 text-white p-4 pb-8 gap-5">
                            {Object.keys(SUPPORTED_WALLETS).map((k) => {
                                const option = SUPPORTED_WALLETS[k]
                                return (
                                    <button
                                        key={option.name}
                                        onClick={() => {
                                            if (option) {
                                                option.connector !== connector &&
                                                    !option.href &&
                                                    option &&
                                                    tryActivation(option.connector)
                                            }
                                        }}
                                        className="uppercase border-2 border-white rounded-md mx-5 hover:bg-background-start"
                                    >
                                        <div className="flex flex-row justify-between items-center p-2 md:mx-16">
                                            <h1>{option.name}</h1>
                                            <Image
                                                src={'/img/wallets/' + option.iconName}
                                                alt={option.name}
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </HeadlessUIModal>
            )}
        </>
    )
}
