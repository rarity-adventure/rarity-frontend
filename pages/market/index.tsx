import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import Link from 'next/link'
import Image from 'next/image'

export default function Market(): JSX.Element {
    const { i18n } = useLingui()

    return (
        <div className="w-full z-25">
            <div className="md:m-10 z-10">
                <div className="flex flex-row justify-center">
                    <h1 className="uppercase text-4xl font-bold">{i18n._(t`marketplace`)}</h1>
                </div>
                <div className="flex flex-row justify-center">
                    <h1 className="uppercase text-sm font-bold">{i18n._(t`spend & trade`)}</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5 mt-10 p-5">
                    <div className="mx-auto">
                        <Link passHref href="/market/names">
                            <div className="uppercase cursor-pointer text-center">
                                <Image
                                    className="mx-auto"
                                    src="/img/market/name_shop.png"
                                    width="150px"
                                    height="150px"
                                />
                                <div className="bg-card-bottom border-2 border-white p-3 mt-3 rounded-lg">
                                    <span>{i18n._(t`rarity names shop`)}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="mx-auto">
                        <Link passHref href="/market/summoners">
                            <div className="uppercase cursor-pointer text-center">
                                <Image
                                    className="mx-auto"
                                    src="/img/market/summoners_shop.png"
                                    width="150px"
                                    height="150px"
                                />
                                <div className="bg-card-bottom border-2 border-white p-3 mt-3 rounded-lg">
                                    <span>{i18n._(t`rarity summoners market`)}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
