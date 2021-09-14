import { SummonerFullData } from '../../state/summoners/hooks'
import { useLingui } from '@lingui/react'
import React, { Fragment, useState } from 'react'
import { t } from '@lingui/macro'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/classes'
import Loader from '../../components/Loader'
import { BigNumber } from 'ethers'
import StatsProfile from '../../components/ProfileCard/Stats'
import { Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import HeadlessUIModal from '../../components/Modal/HeadlessUIModal'
import ModalHeader from '../../components/Modal/ModalHeader'
import { isAddress } from '../../functions/validate'

export default function Profile(): JSX.Element {
    const { i18n } = useLingui()

    const [view, setView] = useState('level')
    return (
        <div className="w-full z-10">
            <div className="text-center mt-10">
                <h1 className="text-4xl uppercase">{i18n._(t`global analytics`)}</h1>
                <h2 className="text-lg mt-2">{i18n._(t`Real time information for Rarity`)}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
                <div>
                    <div className="border-white border-2 text-center text-xl rounded-t-xl p-2">
                        <span>{i18n._(t`Global Information`)}</span>
                    </div>
                    <div className="border-white border-l-2 border-r-2 border-b-2 rounded-bl-3xl p-2 px-4">
                        <div className="flex flex-row py-2 w-full uppercase">
                            <span>{i18n._(t`total summoners`)}:</span>
                        </div>
                        <div className="flex flex-row-reverse py-2 w-full text-xl">
                            <span>100000000000000000</span>
                        </div>
                        <div className="flex flex-row py-2 w-full uppercase">
                            <span>{i18n._(t`unique owners`)}:</span>
                        </div>
                        <div className="flex flex-row-reverse py-2 w-full text-xl">
                            <span>100000000000000000</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="border-white border-2 rounded-br-3xl rounded-t-3xl p-2 px-4">
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
                        {view === 'level' && <div />}
                        {view === 'class' && <div />}
                    </div>
                </div>
            </div>
        </div>
    )
}
