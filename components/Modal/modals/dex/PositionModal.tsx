import { t } from '@lingui/macro'
import React, { useMemo } from 'react'
import { useLingui } from '@lingui/react'
import Image from 'next/image'
import Modal from '../../Modal'

export interface Position {
    tokenA: string
    tokenB: string
    amount: number
    tokenAPool: number
    tokenBPool: number
}

interface PositionModalProps {
    open: boolean
    position?: Position
    supplyFunction: () => void
    withdrawFunction: () => void
    dismissFunction: () => void
}

export default function PositionModal({
    open,
    position,
    supplyFunction,
    withdrawFunction,
    dismissFunction,
}: PositionModalProps): JSX.Element {
    const { i18n } = useLingui()

    const shareOfPool = useMemo(() => {
        if (!position) return
        return ((position.amount * 100) / (position.tokenAPool + position.tokenBPool)).toFixed(2)
    }, [position])

    return (
        <Modal isOpen={open} onDismiss={dismissFunction}>
            {open && (
                <div className="bg-card-bottom rounded-lg p-8 text-white border-2 border-white">
                    <div className="flex justify-between text-base work-sans border-b pb-4 mb-4 border-white">
                        <div className="flex items-center">
                            <Image
                                src={`/img/coins/${position.tokenA.toLowerCase()}.png`}
                                width={24}
                                height={24}
                                alt={position.tokenA}
                            />
                            <Image
                                src={`/img/coins/${position.tokenB.toLowerCase()}.png`}
                                width={24}
                                height={24}
                                alt={position.tokenA}
                            />
                            <span className="ml-2">{`${position.tokenA}-${position.tokenB}`}</span>
                        </div>
                        <div>{position.amount}</div>
                    </div>
                    <div className="text-sm capitalize">
                        <div className="flex justify-between mb-2">
                            <span>{i18n._(t`pooled`) + ' ' + position.tokenA}</span>
                            <div className="flex items-center justify-center">
                                <span className="mr-2">{position.tokenAPool}</span>
                                <Image
                                    src={`/img/coins/${position.tokenA.toLowerCase()}.png`}
                                    width={20}
                                    height={20}
                                    alt={position.tokenA}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>{i18n._(t`pooled`) + ' ' + position.tokenB}</span>
                            <div className="flex items-center justify-center">
                                <span className="mr-2">{position.tokenBPool}</span>
                                <Image
                                    src={`/img/coins/${position.tokenB.toLowerCase()}.png`}
                                    width={20}
                                    height={20}
                                    alt={position.tokenB}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>{i18n._(t`share of pool`)}</span>
                            <span className="mr-4">{shareOfPool}%</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 px-40">
                        <button
                            className="uppercase border-2 border-white bg-green rounded-full px-4"
                            onClick={supplyFunction}
                        >
                            {i18n._(t`supply`)}
                        </button>
                        <button
                            className="uppercase border-2 border-white bg-green rounded-full px-4"
                            onClick={withdrawFunction}
                        >
                            {i18n._(t`withdraw`)}
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}
