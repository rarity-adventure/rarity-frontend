import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import React from 'react'

export function StatsLoader() {
    const { i18n } = useLingui()
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-10 mx-10 animate-pulse">
            <div>
                <div className="border-white border-2 text-center text-sm lg:text-xl rounded-t-xl p-2">
                    <span>{i18n._(t`Global Information`)}</span>
                </div>
                <div className="border-white border-l-2 border-r-2 border-b-2 rounded-bl-3xl p-2 px-4">
                    <div className="flex flex-row py-2 w-full text-sm lg:text-xl uppercase">
                        <span>{i18n._(t`total summoners`)}:</span>
                    </div>
                    <div className="flex flex-row-reverse py-2 w-full text-xl lg:text-3xl">
                        <div className="opacity-50 bg-white w-48 h-9 rounded-lg" />
                    </div>
                    <div className="flex flex-row py-2 w-full text-sm lg:text-xl  uppercase">
                        <span>{i18n._(t`unique owners`)}:</span>
                    </div>
                    <div className="flex flex-row-reverse py-4 w-full text-xl lg:text-3xl">
                        <div className="opacity-50 bg-white w-48 h-9 rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <div className="border-white border-2 rounded-br-3xl rounded-t-3xl p-2 px-4 h-full">
                    <div className="opacity-50 bg-white mt-4 ml-2 w-28 h-7 rounded-lg" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-5 pb-4">
                        <div>
                            <div className="border-white text-xs w-32 bg-card-bottom px-2 py-1 text-center border-2 rounded-2xl h-8 opacity-50" />
                            <div className="mt-2 text-xs">
                                <div className="opacity-50 bg-white w-32 h-4 rounded-lg" />
                            </div>
                            <div className="mt-1 text-xs">
                                <div className="opacity-50 bg-white w-28 h-4 rounded-lg" />
                            </div>
                        </div>
                        <div>
                            <div className="border-white text-xs w-32 bg-card-bottom px-2 py-1 text-center border-2 rounded-2xl h-8 opacity-50" />
                            <div className="mt-2 text-xs">
                                <div className="opacity-50 bg-white w-32 h-4 rounded-lg" />
                            </div>
                            <div className="mt-1 text-xs">
                                <div className="opacity-50 bg-white w-28 h-4 rounded-lg" />
                            </div>
                        </div>
                        <div>
                            <div className="border-white text-xs w-32 bg-card-bottom px-2 py-1 text-center border-2 rounded-2xl h-8 opacity-50" />
                            <div className="mt-2 text-xs">
                                <div className="opacity-50 bg-white w-32 h-4 rounded-lg" />
                            </div>
                            <div className="mt-1 text-xs">
                                <div className="opacity-50 bg-white w-28 h-4 rounded-lg" />
                            </div>
                        </div>
                        <div>
                            <div className="border-white text-xs w-32 bg-card-bottom px-2 py-1 text-center border-2 rounded-2xl h-8 opacity-50" />
                            <div className="mt-2 text-xs">
                                <div className="opacity-50 bg-white w-32 h-4 rounded-lg" />
                            </div>
                            <div className="mt-1 text-xs">
                                <div className="opacity-50 bg-white w-28 h-4 rounded-lg" />
                            </div>
                        </div>
                        <div>
                            <div className="border-white text-xs w-32 bg-card-bottom px-2 py-1 text-center border-2 rounded-2xl h-8 opacity-50" />
                            <div className="mt-2 text-xs">
                                <div className="opacity-50 bg-white w-32 h-4 rounded-lg" />
                            </div>
                            <div className="mt-1 text-xs">
                                <div className="opacity-50 bg-white w-28 h-4 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
