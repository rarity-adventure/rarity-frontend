import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import Loader from '../../components/Loader'
import { Popover } from '@headlessui/react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { useSummoners } from '../../state/summoners/hooks'
import SummonerCraftCard from '../../components/Cards/Craft'
import SummonerSkillsCard from '../../components/Cards/Skills'
import SummonerStatsCard from '../../components/Cards/Stats'
import SummonerTransferCard from '../../components/Cards/Transfer'
import { useRouter } from 'next/router'
import TransferCoinModal from '../../components/Modal/modals/transfers/TransferCoin'
import { GoldImage, MaterialImage } from '../../constants/coins'
import SummonerSelector from '../../components/Selectors/Summoners'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/codex/classes'

enum View {
    stats,
    skills,
    crafting,
    transfer,
}

export default function Profile(): JSX.Element {
    const { i18n } = useLingui()

    const router = useRouter()

    const { query } = useRouter()

    const s = useSummoners()

    useEffect(() => {
        if (!s) return
        const index = s.map((s) => s.id).indexOf(parseInt(query.id as string))
        setSelected(s[index])
    }, [s, query])

    const [selected, setSelected] = useState<SummonerFullData | undefined>(undefined)

    useEffect(() => {}, [])

    const [view, setView] = useState<View>(View.stats)

    function selectPrevSummoner() {
        const currIndex = s.map((s) => s.id).indexOf(selected.id)
        if (currIndex !== 0) {
            router.push('/play/' + s[currIndex - 1].id)
        }
    }

    function selectNextSummoner() {
        const currIndex = s.map((s) => s.id).indexOf(selected.id)
        if (currIndex < s.length - 1) {
            router.push('/play/' + s[currIndex + 1].id)
        }
    }

    const [transferCoinModal, setTransferCoinModal] = useState({ open: false, coin: '' })

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
                                            <div className="flex flex-row justify-between w-full">
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
                                                        onClick={() => setView(View.crafting)}
                                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                                    >
                                                        <span>{i18n._(t`craft`)}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => setView(View.transfer)}
                                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                                    >
                                                        <span>{i18n._(t`transfer`)}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-row justify-between hidden sm:inline-flex">
                                            {selected && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            setTransferCoinModal({ open: true, coin: 'materials' })
                                                        }
                                                    >
                                                        <div className="flex flex-row items-center justify-between w-32 px-2 mx-2 bg-background-contrast border-white border-2 rounded-3xl">
                                                            <div className="py-1 w-2/3 text-center">
                                                                <p>{selected.materials.balance}</p>
                                                            </div>
                                                            <MaterialImage />
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setTransferCoinModal({ open: true, coin: 'gold' })
                                                        }
                                                    >
                                                        <div className="flex flex-row items-center justify-between w-32 px-2 mx-2 bg-background-contrast border-white border-2 rounded-3xl">
                                                            <div className="py-1 w-2/3 text-center">
                                                                <p>{selected.gold.balance}</p>
                                                            </div>
                                                            <GoldImage />
                                                        </div>
                                                    </button>
                                                </>
                                            )}
                                            <SummonerSelector
                                                summoners={s}
                                                select={async (s) => await router.push('/play/' + s.id)}
                                            />
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
                                <div className="sm:hidden mt-2 flex flex-row justify-between">
                                    {selected && (
                                        <button onClick={() => setTransferCoinModal({ open: true, coin: 'material' })}>
                                            <div className="flex flex-row items-center justify-between w-32 px-2 mx-2 bg-background-contrast border-white border-2 rounded-3xl">
                                                <div className="py-1 w-2/3 text-center">
                                                    <p>{selected.materials.balance}</p>
                                                </div>
                                                <MaterialImage />
                                            </div>
                                        </button>
                                    )}
                                    {selected && (
                                        <button onClick={() => setTransferCoinModal({ open: true, coin: 'gold' })}>
                                            <div className="flex flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                                <div className="py-1 w-2/3 text-center">
                                                    <p>{selected.gold.balance}</p>
                                                </div>
                                                <GoldImage />
                                            </div>
                                        </button>
                                    )}
                                </div>
                                <div className="sm:hidden">
                                    <SummonerSelector
                                        summoners={s}
                                        select={async (s) => await router.push('/play/' + s.id)}
                                    />
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
                                        onClick={() => setView(View.crafting)}
                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                    >
                                        <span>{i18n._(t`craft`)}</span>
                                    </button>
                                    <button
                                        onClick={() => setView(View.transfer)}
                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                    >
                                        <span>{i18n._(t`transfer`)}</span>
                                    </button>
                                </div>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>
                {selected ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-center py-4 md:py-20 gap-5">
                        <TransferCoinModal
                            open={transferCoinModal.open}
                            coin={transferCoinModal.coin}
                            closeFunction={() => setTransferCoinModal({ open: false, coin: '' })}
                            id={selected.id}
                            summoners={s}
                        />
                        <div className="text-center mx-auto  mt-2">
                            {CLASSES_IMAGES[selected.base._class.toString()]}
                            <div className="flex flex-row items-center text-center justify-center uppercase text-lg md:text-3xl ">
                                <button onClick={() => selectPrevSummoner()}>
                                    <ChevronLeft size="50px" />
                                </button>{' '}
                                <div className="w-32 md:w-60 overflow-x-hidden overflow-ellipsis">
                                    <span className="text-xs md:text-xl mx-2 overflow-hidden whitespace-nowrap">
                                        {selected.base._name !== '' ? selected.base._name : i18n._(t`unknown`)}
                                    </span>
                                </div>{' '}
                                <button onClick={() => selectNextSummoner()}>
                                    <ChevronRight size="50px" />
                                </button>
                            </div>
                            <p className="mt-4 md:text-xl uppercase border-2 border-white rounded-3xl">
                                {i18n._(CLASSES_NAMES[selected.base._class.toString()])}
                            </p>
                        </div>

                        <div className="col-span-2">
                            {view === View.stats && <SummonerStatsCard summoner={selected} />}
                            {view === View.skills && <SummonerSkillsCard summoner={selected} />}
                            {view === View.transfer && <SummonerTransferCard summoner={selected} summoners={s} />}
                            {view === View.crafting && <SummonerCraftCard summoner={selected} />}
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
