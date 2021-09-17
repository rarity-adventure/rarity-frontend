import { useLingui } from '@lingui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useQuery } from '@apollo/client'
import { GLOBAL_DATA } from '../../apollo'
import Loader from '../../components/Loader'

export default function Profile(): JSX.Element {
    const { i18n } = useLingui()

    const { data, loading, error } = useQuery(GLOBAL_DATA)

    const [globalData, setGlobalData] = useState<{
        classes: { id: string; count: number }[]
        levels: { id: string; count: number }[]
        globals: { owners: string; summoners: string }[]
    }>({ classes: [], levels: [], globals: [] })

    useEffect(() => {
        if (loading || error) return
        setGlobalData(data)
    }, [data, loading, error])

    const [view, setView] = useState('level')
    return (
        <div className="w-full z-10">
            <div className="text-center mt-10">
                <h1 className="text-4xl uppercase">{i18n._(t`global analytics`)}</h1>
                <h2 className="text-lg mt-2">{i18n._(t`Real time information for Rarity`)}</h2>
            </div>
            {globalData.globals[0] ? (
                <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-10 mx-10">
                    <div>
                        <div className="border-white border-2 text-center text-sm lg:text-xl rounded-t-xl p-2">
                            <span>{i18n._(t`Global Information`)}</span>
                        </div>
                        <div className="border-white border-l-2 border-r-2 border-b-2 rounded-bl-3xl p-2 px-4">
                            <div className="flex flex-row py-2 w-full text-sm lg:text-xl uppercase">
                                <span>{i18n._(t`total summoners`)}:</span>
                            </div>
                            <div className="flex flex-row-reverse py-2 w-full text-xl lg:text-3xl">
                                <span>{globalData.globals[0].summoners}</span>
                            </div>
                            <div className="flex flex-row py-2 w-full text-sm lg:text-xl  uppercase">
                                <span>{i18n._(t`unique owners`)}:</span>
                            </div>
                            <div className="flex flex-row-reverse py-4 w-full text-xl lg:text-3xl">
                                <span>{globalData.globals[0].owners}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="border-white border-2 rounded-br-3xl rounded-t-3xl p-2 px-4 h-full">
                            <Menu as="div" className="relative text-right ml-3 mt-2 z-0">
                                {({ open }) => (
                                    <>
                                        <div>
                                            <Menu.Button className="flex flex-row justify-start item-center p-2 text-xs font-bold border-b-2 text-white border-white">
                                                <div className="h-full mr-1.5">
                                                    <span className="uppercase">
                                                        {view === 'class' ? i18n._(t`by class`) : i18n._(t`by level`)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <ChevronDownIcon width={16} aria-hidden="true" />
                                                </div>
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute left-0 rounded-b-lg border-b-2 border-r-2 border-l-2 pb-0.5 border-white shadow-lg bg-background-end">
                                                <Menu.Item>
                                                    <button
                                                        onClick={() => setView('class')}
                                                        className={
                                                            'group w-full hover:bg-background-start flex items-center border-white p-2 text-xs font-bold'
                                                        }
                                                    >
                                                        <span className="ml-2 uppercase overflow-x-hidden">
                                                            {i18n._(t`by class`)}
                                                        </span>
                                                    </button>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <button
                                                        onClick={() => setView('level')}
                                                        className={
                                                            'group w-full hover:bg-background-start flex items-center border-white p-2 text-xs font-bold'
                                                        }
                                                    >
                                                        <span className="ml-2 uppercase overflow-x-hidden">
                                                            {i18n._(t`by level`)}
                                                        </span>
                                                    </button>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>
                            {view === 'level' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-5 pb-4">
                                    {globalData.levels.map((level) => {
                                        return (
                                            <div key={level.id}>
                                                <div className="border-white text-xs w-32  bg-card-bottom px-2 py-1 text-center border-2 rounded-2xl">
                                                    <span className="uppercase">
                                                        {i18n._(t`level`)} {level.id}
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-xs">
                                                    <span className="uppercase">{i18n._(t`summoners`)} </span>
                                                    <span className="ml-3.5">: </span>
                                                    <span>{level.count}</span>
                                                </div>
                                                <div className="mt-1 text-xs">
                                                    <span className="uppercase">{i18n._(t`percentage`)}</span>
                                                    <span className="ml-3">: </span>
                                                    <span>
                                                        {(
                                                            (level.count * 100) /
                                                            parseInt(globalData.globals[0].summoners)
                                                        ).toFixed(2)}
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            {view === 'class' && (
                                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 mt-4 gap-5 pb-4">
                                    {globalData.classes.map((_class) => {
                                        return (
                                            <div key={_class.id}>
                                                <div className="border-white text-xs w-32  bg-card-bottom px-2 py-1 text-center border-2 rounded-2xl">
                                                    <span className="uppercase">{_class.id}</span>
                                                </div>
                                                <div className="mt-2 text-xs">
                                                    <span className="uppercase">{i18n._(t`summoners`)} </span>
                                                    <span className="ml-3.5">: </span>
                                                    <span>{_class.count}</span>
                                                </div>
                                                <div className="mt-1 text-xs">
                                                    <span className="uppercase">{i18n._(t`percentage`)}</span>
                                                    <span className="ml-3">: </span>
                                                    <span>
                                                        {(
                                                            (_class.count * 100) /
                                                            parseInt(globalData.globals[0].summoners)
                                                        ).toFixed(2)}
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex mt-10 justify-center">
                    <Loader size={'50px'} />
                </div>
            )}
        </div>
    )
}
