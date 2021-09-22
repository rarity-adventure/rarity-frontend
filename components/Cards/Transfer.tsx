import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import TransferMaterialModal from '../Modal/modals/TransferMaterial'
import Image from 'next/image'
import TransferGoldModal from '../Modal/modals/TransferGold'

function SummonerTransferCard({
    summoner,
    summoners,
}: {
    summoner: SummonerFullData
    summoners: SummonerFullData[]
}): JSX.Element {
    const { i18n } = useLingui()

    const [transferGoldModal, setTransferGoldModal] = useState(false)

    function closeGoldModal() {
        setTransferGoldModal(false)
    }

    const [transferMaterialModal, setTransferMaterialModal] = useState(false)

    function closeMaterialModal() {
        setTransferMaterialModal(false)
    }

    return (
        <div className="max-w-screen-md mx-auto">
            <TransferMaterialModal
                open={transferMaterialModal}
                closeFunction={closeMaterialModal}
                id={summoner.id}
                summoners={summoners}
            />
            <TransferGoldModal
                open={transferGoldModal}
                closeFunction={closeGoldModal}
                id={summoner.id}
                summoners={summoners}
            />
            <div className="flex flex-row w-full items-center">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 w-full">
                    <div className="bg-card-top col-span-3 md:p-2 p-1 bg-background-cards border-white border-2 rounded-t-2xl md:rounded-tl-2xl md:rounded-tr-none text-left">
                        <span className="ml-1.5 uppercase">
                            {i18n._(t`ID`)} {summoner.id}
                        </span>
                    </div>
                    <div className="w-full mt-3 md:mt-0 md:p-2 p-1 bg-card-button col-span-2 bg-background-cards border-white border-2 md:rounded-tr-2xl text-center">
                        <span className="uppercase">{i18n._(t`transfer`)}</span>
                    </div>
                </div>
            </div>
            <div className="border-white border-2 rounded-b-2xl my-3 bg-background-cards w-full bg-card-content">
                <div className="p-4  text-center">
                    <p className="text-lg text-left">{i18n._(t`What do you want to transfer?`)}</p>
                    <div className="mt-8">
                        <button onClick={() => setTransferMaterialModal(true)}>
                            <div className="flex flex-row items-center justify-between w-60 px-2 bg-background-contrast border-white border-2 rounded-lg">
                                <Image src="/img/coins/material.png" width={40} height={40} />
                                <div className="px-5 py-2 text-center">
                                    <p className="uppercase text-2xl">{i18n._(t`material`)}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="mt-8 mb-8">
                        <button onClick={() => setTransferGoldModal(true)}>
                            <div className="flex flex-row items-center justify-between w-60 px-2 bg-background-contrast border-white border-2 rounded-lg">
                                <Image src="/img/coins/gold.png" width={50} height={40} />
                                <div className="pr-16 py-2 text-center">
                                    <p className="uppercase text-2xl">{i18n._(t`gold`)}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummonerTransferCard
