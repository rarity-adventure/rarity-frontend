import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { CoinData, GAME_COINS } from '../../constants'

interface CoinSelectorProps {
    select: (c: CoinData) => void
    selected: CoinData | undefined
}

export default function CoinSelector({ select, selected }: CoinSelectorProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        <Menu as="div" className="text-center mt-2">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="flex flex-row justify-center items-center w-full p-2 text-xs font-bold text-white ">
                            <div className="h-full mr-1.5">
                                <span className="uppercase">{i18n._(t`select a coin`)}</span>
                            </div>
                            <div>
                                <ChevronDownIcon width={16} aria-hidden="true" />
                            </div>
                            {selected && (
                                <div className="ml-2 rounded-lg border-2 border-white bg-green text-white uppercase p-1">
                                    {selected.name}
                                </div>
                            )}
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
                        <Menu.Items className="absolute inline-block max-h-32 z-30 text-center overflow-scroll mt-2 rounded-b-lg border-2 pb-0.5 border-white shadow-lg bg-background-end">
                            <div>
                                {Object.values(GAME_COINS).map((c: CoinData) => {
                                    return (
                                        <Menu.Item key={c.name}>
                                            {() => (
                                                <button
                                                    onClick={() => select(c)}
                                                    className={
                                                        'group w-full hover:bg-background-start flex items-center border-white p-2 text-xs font-bold'
                                                    }
                                                >
                                                    <div className="flex flex-row items-center justify-between w-32 px-2 text-white">
                                                        <div className="py-1 w-2/3 text-center">{c.name}</div>
                                                        {c.image}
                                                    </div>
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
}
