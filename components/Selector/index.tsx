import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import React, { Fragment } from 'react'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { CLASSES_NAMES } from '../../constants/classes'

interface SelectorProps {
    summoners: SummonerFullData[]
    select: (s: SummonerFullData) => void
}

export default function Selector({ summoners, select }: SelectorProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        summoners.length > 0 && (
            <Menu as="div" className="relative text-right ml-3 mt-2 md:-mt-2">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="flex flex-row justify-end item-center w-full p-2 text-xs border-b-2 border-white font-bold text-white ">
                                <div className="h-full mr-1.5">
                                    <span className="uppercase">{i18n._(t`select summoner`)}</span>
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
                                <div>
                                    {summoners.map((s: SummonerFullData) => {
                                        return (
                                            <Menu.Item key={s.id}>
                                                {() => (
                                                    <button
                                                        onClick={() => select(s)}
                                                        className={
                                                            'group w-full hover:bg-background-start flex items-center border-white p-2 text-xs font-bold'
                                                        }
                                                    >
                                                        <span className="ml-2 uppercase whitespace-nowrap overflow-hidden overflow-ellipsis w-72">
                                                            {' '}
                                                            {s.base._name !== ''
                                                                ? s.base._name
                                                                : s.id.toString() +
                                                                  ' ' +
                                                                  i18n._(t`level`) +
                                                                  ' ' +
                                                                  s.base._level +
                                                                  ' ' +
                                                                  i18n._(CLASSES_NAMES[s.base._class.toString()])}
                                                        </span>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        )
    )
}
