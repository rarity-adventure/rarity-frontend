import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/classes'
import Loader from '../../components/Loader'
import { Popover } from '@headlessui/react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import Selector from '../../components/Selector'
import { useSummoners } from '../../state/summoners/hooks'
import SummonerCraftCard from '../../components/Cards/Craft'
import SummonerInventoryCard from '../../components/Cards/Inventory'
import SummonerSkillsCard from '../../components/Cards/Skills'
import SummonerStatsCard from '../../components/Cards/Stats'

enum View {
    stats,
    skills,
    inventory,
    crafting,
}

export default function Profile(): JSX.Element {
    const { i18n } = useLingui()

    const s = useSummoners()

    const [summoners, setSummoners] = useState<SummonerFullData[]>(s)

    useEffect(() => {
        setSummoners(s)
    }, [s])

    const [selectedSummoner, setSelectedSummoner] = useState<SummonerFullData | undefined>(undefined)

    useEffect(() => {
        if (summoners.length > 0) {
            setSelectedSummoner(summoners[0])
        }
    }, [summoners])

    const [view, setView] = useState<View>(View.stats)

    function selectPrevSummoner() {
        const currIndex = summoners.map((s) => s.id).indexOf(selectedSummoner.id)
        if (currIndex !== 0) {
            setSelectedSummoner(summoners[currIndex - 1])
        }
    }

    function selectNextSummoner() {
        const currIndex = summoners.map((s) => s.id).indexOf(selectedSummoner.id)
        if (currIndex < summoners.length - 1) {
            setSelectedSummoner(summoners[currIndex + 1])
        }
    }

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10">
                <Popover as="nav" className="w-full bg-transparent header-border-b">
                    {({ open }) => (
                        <>
                            <div className="py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center z-20 uppercase">
                                        <h1 className="text-3xl">{i18n._(t`play`)}</h1>
                                        <div className="hidden md:block sm:ml-2 text-xs">
                                            <div className="flex uppercase">
                                                <button
                                                    onClick={() => setView(View.stats)}
                                                    className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                                >
                                                    <span>{i18n._(t`stats`)}</span>
                                                </button>
                                                <button
                                                    onClick={() => setView(View.skills)}
                                                    className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                                >
                                                    <span>{i18n._(t`skills`)}</span>
                                                </button>
                                                <button
                                                    onClick={() => setView(View.inventory)}
                                                    className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                                >
                                                    <span>{i18n._(t`inventory`)}</span>
                                                </button>
                                                <button
                                                    onClick={() => setView(View.crafting)}
                                                    className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                                >
                                                    <span>{i18n._(t`craft`)}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex -mr-2 md:hidden">
                                        <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                                            <span className="sr-only">{i18n._(t`Open Menu`)}</span>
                                            {open ? (
                                                <svg
                                                    className="block w-6 h-6"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="block w-6 h-6"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 6h16M4 12h16M4 18h16"
                                                    />
                                                </svg>
                                            )}
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>

                            <Popover.Panel className="md:hidden">
                                <div className="flex flex-col px-4 pt-2 pb-3 space-y-1 text-center text-sm">
                                    <button
                                        onClick={() => setView(View.stats)}
                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                    >
                                        <span>{i18n._(t`stats`)}</span>
                                    </button>
                                    <button
                                        onClick={() => setView(View.skills)}
                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                    >
                                        <span>{i18n._(t`skills`)}</span>
                                    </button>
                                    <button
                                        onClick={() => setView(View.inventory)}
                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                    >
                                        <span>{i18n._(t`inventory`)}</span>
                                    </button>
                                    <button
                                        onClick={() => setView(View.crafting)}
                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                    >
                                        <span>{i18n._(t`craft`)}</span>
                                    </button>
                                </div>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>
                <Selector summoners={summoners} select={setSelectedSummoner} />
                {selectedSummoner ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-center py-4 md:py-20 gap-5">
                        <div className="text-center mx-auto  mt-2">
                            {CLASSES_IMAGES[selectedSummoner.base._class.toString()]}
                            <div className="flex flex-row items-center text-center justify-center uppercase text-lg md:text-3xl ">
                                <button onClick={() => selectPrevSummoner()}>
                                    <ChevronLeft />
                                </button>{' '}
                                <div className="w-32 md:w-60 overflow-x-hidden overflow-ellipsis">
                                    <span className="text-xs md:text-xl mx-2 overflow-hidden whitespace-nowrap">
                                        {selectedSummoner.base._name !== ''
                                            ? selectedSummoner.base._name
                                            : i18n._(t`unknown`)}
                                    </span>
                                </div>{' '}
                                <button onClick={() => selectNextSummoner()}>
                                    <ChevronRight />
                                </button>
                            </div>
                            <p className="mt-4 md:text-xl uppercase border-2 border-white rounded-3xl">
                                {i18n._(CLASSES_NAMES[selectedSummoner.base._class.toString()])}
                            </p>
                        </div>
                        <div className="col-span-2">
                            {view === View.stats && <SummonerStatsCard summoner={selectedSummoner} />}
                            {view === View.skills && <SummonerSkillsCard summoner={selectedSummoner} />}
                            {view === View.inventory && <SummonerInventoryCard summoner={selectedSummoner} />}
                            {view === View.crafting && <SummonerCraftCard summoner={selectedSummoner} />}
                        </div>
                    </div>
                ) : (
                    <div className="relative h-48">
                        <div className="absolute top-24 right-1/2 uppercase text-center">
                            <Loader size="40px" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
