import { t } from '@lingui/macro'
import React, { Fragment, useState } from 'react'
import { useLingui } from '@lingui/react'
import useRarityNames, { NameData } from '../../hooks/useRarityNames'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { sendToast } from '../../functions/toast'

function SummonerIDSelector({
    summoners,
    select,
    selected,
}: {
    summoners: number[]
    select: (id) => void
    selected: number | undefined
}): JSX.Element {
    const { i18n } = useLingui()

    return (
        summoners.length > 0 && (
            <Menu as="div" className="relative text-right ml-3 mt-2">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="flex flex-row justify-center item-center w-full p-2 text-xs border-white font-bold text-white ">
                                <div className="h-full mr-1.5">
                                    {selected ? (
                                        <span className="uppercase">{selected}</span>
                                    ) : (
                                        <span className="uppercase">{i18n._(t`select id`)}</span>
                                    )}
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
                            <Menu.Items className="absolute scrollbar-hide w-full max-h-48 md:max-h-72 mx-auto z-30 overflow-scroll right-0 mt-2 rounded-b-lg border-2 pb-0.5 border-white shadow-lg bg-background-end">
                                <div>
                                    {summoners.map((id) => {
                                        return (
                                            <Menu.Item key={id}>
                                                {() => (
                                                    <button
                                                        onClick={() => select(id)}
                                                        className={
                                                            'group w-full text-left hover:bg-background-start flex items-center border-white p-2 text-xs font-bold'
                                                        }
                                                    >
                                                        <span className="ml-2 uppercase whitespace-nowrap overflow-hidden overflow-ellipsis w-72 text-white">
                                                            {id}
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

function NameCard({ name, summoners }: { name: NameData; summoners: number[] }): JSX.Element {
    const { i18n } = useLingui()

    const [selected, setSelected] = useState<number | undefined>(undefined)

    const { assign_name } = useRarityNames()

    return (
        <div className="mx-auto w-64 md:w-64 lg:w-48 xl:w-64">
            <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                <div className="flex flex-row justify-between p-2 text-xs">
                    <p className="uppercase">
                        {i18n._(t`id`)}: {name.id}
                    </p>
                </div>
                <div className="px-3 text-white pb-5">
                    <div className="text-center overflow-scroll scrollbar-hide bg-card-button mt-2 border-2 border-white rounded-lg">
                        <p className="text-center p-2">{name.name}</p>
                    </div>
                    <div className="text-center mt-5 uppercase">{i18n._(t`assigned to`)}</div>
                    <div className="text-center mt-2 uppercase overflow-scroll scrollbar-hide border-2 border-white rounded-lg bg-card-button">
                        <p className="p-2">{name.assigned}</p>
                    </div>
                    <div className="text-center mt-5 uppercase">{i18n._(t`assign summoner`)}</div>
                    <SummonerIDSelector summoners={summoners} select={(id) => setSelected(id)} selected={selected} />
                    {selected ? (
                        <div className="text-center mt-5">
                            <button
                                onClick={() => sendToast(assign_name(name.id, selected), i18n._(t`Assigning name`))}
                                className="uppercase bg-green p-2 border-2 border-white rounded-lg text-xs"
                            >
                                {i18n._(t`assign`)}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <button className="opacity-50 uppercase bg-green p-2 border-2 border-white rounded-lg text-xs">
                                {i18n._(t`assign`)}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NameCard
