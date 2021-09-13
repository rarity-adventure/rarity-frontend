import React from 'react'
import { ChainId, FANTOM_NETWORK, NetworkContextName } from '../../constants'
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
import { useSwitchOrAddChain } from '../../hooks/useSwitchOrAddChain'

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
        return <Web3Connect style={{ paddingTop: '6px', paddingBottom: '6px' }} />
    }
}

export default function Web3Status() {
    const { active, account, connector, activate, error, chainId } = useWeb3React()

    const open = useModalOpen(ApplicationModal.WALLET)

    const toggleModal = useWalletModalToggle()

    const switchOrAddChain = useSwitchOrAddChain()

    const contextNetwork = useWeb3React(NetworkContextName)

    if (!contextNetwork.active && !active) {
        return null
    }

    const tryActivation = async (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => {
        console.log('Try activation')
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
                        switchOrAddChain(FANTOM_NETWORK).then((success) => {
                            if (!success) {
                                // When pending error UI is implemented: setPendingError(true)
                                activate(conn)
                            }
                        })
                    } else {
                        // When pending error UI is implemented: setPendingError(true)
                    }
                })
    }

    return (
        <>
            <Web3StatusInner />
            {account && <div />}
            {!account && (
                <HeadlessUIModal isOpen={open} onDismiss={toggleModal}>
                    <div className="bg-gradient-to-b from-background-start via-background-middle to-background-end rounded-lg border-2 border-white">
                        <ModalHeader title="Choose a wallet" onClose={toggleModal} />
                        <div className="grid grid-cols-1 text-white p-4 gap-5">
                            {Object.keys(SUPPORTED_WALLETS).map((k) => {
                                const option = SUPPORTED_WALLETS[k]
                                return (
                                    <button
                                        onClick={() => {
                                            if (option) {
                                                ;(option.connector !== connector || chainId !== ChainId.MAINNET) &&
                                                    !option.href &&
                                                    option &&
                                                    tryActivation(option.connector)
                                            }
                                        }}
                                        className="uppercase border-2 border-white rounded-md mx-5 hover:bg-background-end"
                                    >
                                        <div className="flex flex-row justify-between items-center p-2 md:mx-16">
                                            <h1>{option.name}</h1>
                                            <img
                                                src={'/img/wallets/' + option.iconName}
                                                alt={option.name}
                                                className="h-12"
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
