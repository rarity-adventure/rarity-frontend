import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import useRarityStarterPack from '../../../hooks/useRarityStarterPack'
import useRarity from '../../../hooks/useRarity'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { RARITY_PACK_ADDRESS } from '../../../constants'

interface BurnModalProps {
    open: boolean
    closeFunction: () => void
    summoner: SummonerFullData
}

export default function SellModal({ open, closeFunction, summoner }: BurnModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { sell_summoners } = useRarityStarterPack()

    const { account } = useActiveWeb3React()

    const { isApprovedForAll, setApprovalForAll } = useRarity()

    const [approved, setApproved] = useState(false)

    const fetch_approval = useCallback(async () => {
        const approved = await isApprovedForAll(account, RARITY_PACK_ADDRESS)
        setApproved(approved)
    }, [isApprovedForAll])

    useEffect(() => {
        if (!account) return
        fetch_approval()
    }, [account, fetch_approval])

    async function sellConfirm() {
        await toast.promise(sell_summoners([summoner.id]), {
            loading: <b>{i18n._(t`Selling summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
        closeFunction()
    }

    async function approvePack() {
        toast
            .promise(setApprovalForAll(RARITY_PACK_ADDRESS), {
                loading: <b>{i18n._(t`Approving`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
            .then(() => setApproved(true))
    }

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`sell summoner`)} onClose={closeFunction} />
                {approved ? (
                    <>
                        <div className="text-center text-white p-4 pb-8 gap-5">
                            <h2>{i18n._(t`Are you sure you want to sell this summoner?`)}</h2>
                            <h2>
                                <b>{i18n._(t`This action is IRREVERSIBLE.`)}</b>
                            </h2>
                            <h2>
                                <b>{i18n._(t`All items and experience will be lost and you will receive 0.6 FTM.`)}</b>
                            </h2>
                        </div>
                        <div className="flex flex-row justify-center pb-8">
                            <div className="bg-background-middle hover:bg-background-start text-white border-white border-2 rounded-lg mx-4">
                                <button className="w-full uppercase px-2 py-1" onClick={closeFunction}>
                                    <h2>{i18n._(t`cancel`)}</h2>
                                </button>
                            </div>
                            <div className="bg-red hover:bg-red-hovered text-white border-white border-2 rounded-lg mx-4">
                                <button className="w-full uppercase px-2 py-1" onClick={() => sellConfirm()}>
                                    <h2>{i18n._(t`confirm`)}</h2>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-row justify-center mb-20 mt-20">
                        <button
                            className="uppercase bg-green text-white text-center border-white border-2 rounded-lg px-2 py-1 text-2xl"
                            onClick={async () => approvePack()}
                        >
                            {i18n._(t`Approve`)}
                        </button>
                    </div>

                )}
            </div>
        </HeadlessUIModal>
    )
}
