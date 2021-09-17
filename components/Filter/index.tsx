import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import React, { Fragment } from 'react'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

interface SelectorProps {
    summoners: SummonerFullData[]
    filteredSummoners: (s: SummonerFullData[]) => void
}

export default function Filter({ summoners, filteredSummoners }: SelectorProps): JSX.Element {
    const { i18n } = useLingui()

    function filterByLevel() {}

    return (
        <Menu as="div" className="relative text-right ml-3 mt-2 md:-mt-2">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="flex flex-row justify-end item-center w-full p-2 text-xs border-b-2 border-white font-bold text-white ">
                            <div className="h-full mr-1.5">
                                <span className="uppercase">{i18n._(t`order summoners`)}</span>
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
                        <Menu.Items className="absolute max-h-96 z-30 overflow-scroll right-0 rounded-b-lg border-b-2 border-r-2 border-l-2 pb-0.5 border-white shadow-lg bg-background-end">
                            <Menu.Item>
                                <button
                                    onClick={() => filterByLevel()}
                                    className={
                                        'group w-full hover:bg-background-start flex items-center border-white p-2 text-xs font-bold'
                                    }
                                >
                                    <span className="ml-2 uppercase whitespace-nowrap overflow-hidden overflow-ellipsis">
                                        By LEVEL
                                    </span>
                                </button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}
