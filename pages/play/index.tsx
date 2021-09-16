import { useLingui } from '@lingui/react'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/classes'
import Loader from '../../components/Loader'
import StatsProfile from '../../components/ProfileCard/Stats'
import { Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import HeadlessUIModal from '../../components/Modal/HeadlessUIModal'
import ModalHeader from '../../components/Modal/ModalHeader'
import { isAddress } from '../../functions/validate'
import { useUserSelectedSummoner, useUserSelectSummoner, useUserSummoners } from '../../state/user/hooks'
import AdventureProfile from '../../components/ProfileCard/Adventure'
import SkillsProfile from '../../components/ProfileCard/Skills'
import CraftProfile from '../../components/ProfileCard/Craft'
import InventoryProfile from '../../components/ProfileCard/Inventory'
import { useSummonersData } from '../../state/summoners/hooks'
import useRarity from '../../hooks/useRarity'
import toast, { Toaster } from 'react-hot-toast'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { BURN_ADDRESS, RARITY_HELPER_ADDRESS } from '../../constants'
import useRarityHelper from '../../hooks/useRarityHelper'
import { utils } from 'ethers'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import useRarityDaycare from '../../hooks/useRarityDaycare'
import { ChevronLeft, ChevronRight } from 'react-feather'

enum View {
    stats,
    adventure,
    skills,
    inventory,
    crafting,
}

export default function Profile(): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const { transferFrom, isApprovedForAll, setApprovalForAll } = useRarity()

    const summoners = useUserSummoners()

    const summonersFullData = useSummonersData(summoners)

    const summonersForAdventure =
        Object.values(summonersFullData).length > 0
            ? Object.values(summonersFullData)
                  .filter((s) => parseInt(s.base._log.toString()) * 1000 < Date.now())
                  .map((s) => {
                      return s.id
                  })
            : []

    const summonersForLevel =
        Object.values(summonersFullData).length > 0
            ? Object.values(summonersFullData)
                  .filter(
                      (s) =>
                          parseInt(utils.formatUnits(s.base._xp, 'ether')) >=
                          calcXPForNextLevel(parseInt(s.base._level.toString()))
                  )
                  .map((s) => {
                      return s.id
                  })
            : []

    const summonersForClaim =
        Object.values(summonersFullData).length > 0
            ? Object.values(summonersFullData)
                  .filter((s) => parseInt(utils.formatUnits(s.gold.claimable.toString(), 'ether')) > 0)
                  .map((s) => {
                      return s.id
                  })
            : []

    const summonersForDungeon = []

    const stateSelectedSummoner = useUserSelectedSummoner()

    const storeStateSelectedSummoner = useUserSelectSummoner()

    const [modals, setModal] = useState<{ delete: boolean; transfer: boolean; daycare: boolean }>({
        delete: false,
        transfer: false,
        daycare: false,
    })

    const [selectedSummoner, setSelectedSummoner] = useState<string | undefined>(stateSelectedSummoner)

    useEffect(() => {
        if (!account) return
        if (!stateSelectedSummoner && summoners[0]) {
            setSelectedSummoner(summoners[0].id)
            storeStateSelectedSummoner(summoners[0].id)
        }
    }, [stateSelectedSummoner, summoners[0], account])

    useEffect(() => {
        storeStateSelectedSummoner(selectedSummoner)
    }, [selectedSummoner, account])

    const [view, setView] = useState<View>(View.stats)

    function deleteModal() {
        setModal({ delete: !modals.delete, transfer: false, daycare: false })
    }

    function transferModal() {
        setModal({ delete: false, transfer: !modals.transfer, daycare: false })
    }

    function daycareModal() {
        setModal({ delete: false, transfer: false, daycare: !modals.daycare })
    }

    const [transferAddress, setTransferAddress] = useState<{ input: boolean; address: string | boolean }>({
        input: false,
        address: false,
    })

    function transferAddressHandler(address: string) {
        if (address === '' || !address) {
            setTransferAddress({ input: false, address: false })
        } else {
            setTransferAddress({ input: true, address: isAddress(address) })
        }
    }

    const [dailyCareNewRegister, setDailyCareNewRegister] = useState(0)

    function daycareRegister(days: number) {
        setDailyCareNewRegister(days)
    }

    async function deleteConfirm() {
        setModal({ delete: false, transfer: false, daycare: false })
        await toast.promise(transferFrom(account, BURN_ADDRESS, selectedSummoner), {
            loading: <b>{i18n._(t`Deleting summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function transferConfirm() {
        setModal({ delete: false, transfer: false, daycare: false })
        const address = typeof transferAddress.address === 'string' ? transferAddress.address : ''
        await toast.promise(transferFrom(account, address, selectedSummoner), {
            loading: <b>{i18n._(t`Transferring summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    const { adventure, claim_gold, cellar, level_up } = useRarityHelper()

    async function sendAdventure() {
        await toast.promise(adventure(summonersForAdventure), {
            loading: <b>{i18n._(t`Sending summoners`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function sendLevelUP() {
        await toast.promise(level_up(summonersForLevel), {
            loading: <b>{i18n._(t`Sending summoners`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function sendDungeon() {
        await toast.promise(cellar(summonersForDungeon), {
            loading: <b>{i18n._(t`Sending summoners`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function sendClaimGold() {
        await toast.promise(claim_gold(summonersForClaim), {
            loading: <b>{i18n._(t`Sending summoners`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function approveHelper() {
        await toast.promise(setApprovalForAll(RARITY_HELPER_ADDRESS), {
            loading: <b>{i18n._(t`Approving helper contract`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    const [helperApproval, setHelperApproval] = useState(false)

    const fetch_approval = useCallback(async () => {
        const approved = await isApprovedForAll(account, RARITY_HELPER_ADDRESS)
        setHelperApproval(approved)
    }, [])
    useEffect(() => {
        if (!account) return
        fetch_approval()
    }, [isApprovedForAll, account])

    const [daycare, setDaycare] = useState(0)

    const { daysPaid, registerDaycare } = useRarityDaycare()

    const fetch_register = useCallback(async () => {
        const paid = await daysPaid(selectedSummoner)
        setDaycare(paid)
    }, [])

    useEffect(() => {
        fetch_register()
    }, [daysPaid])

    async function registerSingleSummoner() {
        setModal({ delete: false, transfer: false, daycare: false })
        await toast.promise(registerDaycare([selectedSummoner], dailyCareNewRegister), {
            loading: <b>{i18n._(t`Registering summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function registerAllSummoners() {
        setModal({ delete: false, transfer: false, daycare: false })
        await toast.promise(
            registerDaycare(
                summoners.map((s) => {
                    return s.id
                }),
                dailyCareNewRegister
            ),
            {
                loading: <b>{i18n._(t`Registering all summoners`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            }
        )
    }

    function selectPrevSummoner() {
        const currIndex = summoners
            .map((s) => {
                return s.id
            })
            .indexOf(selectedSummoner)
        if (currIndex !== 0) {
            const prevSummoner = summoners.map((s) => {
                return s.id
            })[currIndex - 1]
            setSelectedSummoner(prevSummoner)
        }
    }

    function selectNextSummoner() {
        const currIndex = summoners
            .map((s) => {
                return s.id
            })
            .indexOf(selectedSummoner)
        if (currIndex < summoners.length - 1) {
            const nextSummoner = summoners.map((s) => {
                return s.id
            })[currIndex + 1]
            setSelectedSummoner(nextSummoner)
        }
    }

    return (
        <div className="w-full z-25">
            <Toaster containerClassName="z-25" />
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
                                                {/*<button
                                                    onClick={() => setView(View.adventure)}
                                                    className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                                >
                                                    <span>{i18n._(t`adventure`)}</span>
                                                </button>*/}
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
                                                <Popover className="relative">
                                                    {({ open }) => (
                                                        <>
                                                            <Popover.Button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase text-center group">
                                                                <span>{i18n._(t`global`)}</span>
                                                            </Popover.Button>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-200"
                                                                enterFrom="opacity-0 translate-y-1"
                                                                enterTo="opacity-100 translate-y-0"
                                                                leave="transition ease-in duration-150"
                                                                leaveFrom="opacity-100 translate-y-0"
                                                                leaveTo="opacity-0 translate-y-1"
                                                            >
                                                                <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                                                                    <div className="overflow-hidden rounded-lg shadow-2xl ring-2 ring-white ring-opacity-5">
                                                                        <div className="relative grid gap-8 bg-background-contrast p-7 lg:grid-cols-2">
                                                                            <div>
                                                                                <h2 className="text-lg">
                                                                                    {i18n._(t`adventures`)}
                                                                                </h2>
                                                                                <h2 className="mt-1 text-center text-xs">
                                                                                    {i18n._(
                                                                                        t`summoners available for adventure`
                                                                                    )}
                                                                                </h2>
                                                                                {summonersForAdventure.length > 0 ? (
                                                                                    <div className="text-center">
                                                                                        {helperApproval ? (
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    sendAdventure()
                                                                                                }
                                                                                                className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                            >
                                                                                                {i18n._(t`send`)}{' '}
                                                                                                {
                                                                                                    summonersForAdventure.length
                                                                                                }{' '}
                                                                                                {i18n._(t`summoners`)}
                                                                                            </button>
                                                                                        ) : (
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    approveHelper()
                                                                                                }
                                                                                                className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                            >
                                                                                                {i18n._(t`approve`)}{' '}
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div>
                                                                                        <p className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2 opacity-50 text-center">
                                                                                            {i18n._(
                                                                                                t`No summoners available`
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div>
                                                                                <h2 className="text-lg">
                                                                                    {i18n._(t`level up`)}
                                                                                </h2>
                                                                                <h2 className="mt-1 text-center text-xs">
                                                                                    Summoners available for level up
                                                                                </h2>
                                                                                {summonersForLevel.length > 0 ? (
                                                                                    <div className="text-center">
                                                                                        {helperApproval ? (
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    sendLevelUP()
                                                                                                }
                                                                                                className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                            >
                                                                                                {i18n._(t`send`)}{' '}
                                                                                                {
                                                                                                    summonersForLevel.length
                                                                                                }{' '}
                                                                                                {i18n._(t`summoners`)}
                                                                                            </button>
                                                                                        ) : (
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    approveHelper()
                                                                                                }
                                                                                                className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                            >
                                                                                                {i18n._(t`approve`)}{' '}
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div>
                                                                                        <p className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2 opacity-50 text-center">
                                                                                            {i18n._(
                                                                                                t`No summoners available`
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div>
                                                                                <h2 className="text-lg">
                                                                                    {i18n._(t`claim gold`)}
                                                                                </h2>
                                                                                <p className="text-xs text-red">{i18n._(t`Warning: Claiming gold is gas expensive`)}</p>
                                                                                <h2 className="mt-1 text-center text-xs">
                                                                                    Summoners available for claim gold
                                                                                </h2>
                                                                                {summonersForClaim.length > 0 ? (
                                                                                    <div className="text-center">
                                                                                        {helperApproval ? (
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    sendClaimGold()
                                                                                                }
                                                                                                className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                            >
                                                                                                {i18n._(t`send`)}{' '}
                                                                                                {
                                                                                                    summonersForClaim.length
                                                                                                }{' '}
                                                                                                {i18n._(t`summoners`)}
                                                                                            </button>
                                                                                        ) : (
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    approveHelper()
                                                                                                }
                                                                                                className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                            >
                                                                                                {i18n._(t`approve`)}{' '}
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div>
                                                                                        <p className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2 opacity-50 text-center">
                                                                                            {i18n._(
                                                                                                t`No summoners available`
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div>
                                                                                <h2 className="text-lg">
                                                                                    {i18n._(t`dungeons`)}
                                                                                </h2>
                                                                                <h2 className="mt-1 text-center text-xs">
                                                                                    Summoners available for dungeons
                                                                                </h2>
                                                                                {summonersForDungeon.length > 0 ? (
                                                                                    <div className="text-center">
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                sendDungeon()
                                                                                            }
                                                                                            className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                        >
                                                                                            {i18n._(t`send`)}{' '}
                                                                                            {summonersForDungeon.length}{' '}
                                                                                            {i18n._(t`summoners`)}
                                                                                        </button>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div>
                                                                                        <p className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2 opacity-50 text-center">
                                                                                            {i18n._(
                                                                                                t`Coming soon`
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Popover>
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
                                    {/*<button
                                        onClick={() => setView(View.adventure)}
                                        className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase"
                                    >
                                        <span>{i18n._(t`adventure`)}</span>
                                    </button>*/}
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
                                    <Popover className="relative uppercase z-25">
                                        {({ open }) => (
                                            <>
                                                <Popover.Button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase text-center group">
                                                    <span>{i18n._(t`global`)}</span>
                                                </Popover.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0 translate-y-1"
                                                    enterTo="opacity-100 translate-y-0"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100 translate-y-0"
                                                    leaveTo="opacity-0 translate-y-1"
                                                >
                                                    <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                                                        <div className="overflow-hidden rounded-lg shadow-2xl ring-2 ring-white ring-opacity-5">
                                                            <div className="relative grid gap-8 bg-background-contrast p-7 lg:grid-cols-2">
                                                                <div>
                                                                    <h2 className="text-lg">
                                                                        {i18n._(t`adventures`)}
                                                                    </h2>
                                                                    <h2 className="mt-1 text-center text-xs">
                                                                        {i18n._(
                                                                            t`summoners available for adventure`
                                                                        )}
                                                                    </h2>
                                                                    {summonersForAdventure.length > 0 ? (
                                                                        <div className="text-center">
                                                                            {helperApproval ? (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        sendAdventure()
                                                                                    }
                                                                                    className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                >
                                                                                    {i18n._(t`send`)}{' '}
                                                                                    {
                                                                                        summonersForAdventure.length
                                                                                    }{' '}
                                                                                    {i18n._(t`summoners`)}
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        approveHelper()
                                                                                    }
                                                                                    className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                >
                                                                                    {i18n._(t`approve`)}{' '}
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <p className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2 opacity-50 text-center">
                                                                                {i18n._(
                                                                                    t`No summoners available`
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h2 className="text-lg">
                                                                        {i18n._(t`level up`)}
                                                                    </h2>
                                                                    <h2 className="mt-1 text-center text-xs">
                                                                        Summoners available for level up
                                                                    </h2>
                                                                    {summonersForLevel.length > 0 ? (
                                                                        <div className="text-center">
                                                                            {helperApproval ? (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        sendLevelUP()
                                                                                    }
                                                                                    className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                >
                                                                                    {i18n._(t`send`)}{' '}
                                                                                    {
                                                                                        summonersForLevel.length
                                                                                    }{' '}
                                                                                    {i18n._(t`summoners`)}
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        approveHelper()
                                                                                    }
                                                                                    className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                >
                                                                                    {i18n._(t`approve`)}{' '}
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <p className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2 opacity-50 text-center">
                                                                                {i18n._(
                                                                                    t`No summoners available`
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h2 className="text-lg">
                                                                        {i18n._(t`claim gold`)}
                                                                    </h2>
                                                                    <p className="text-xs text-red">{i18n._(t`Warning: Claiming gold is gas expensive`)}</p>
                                                                    <h2 className="mt-1 text-center text-xs">
                                                                        Summoners available for claim gold
                                                                    </h2>
                                                                    {summonersForClaim.length > 0 ? (
                                                                        <div className="text-center">
                                                                            {helperApproval ? (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        sendClaimGold()
                                                                                    }
                                                                                    className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                >
                                                                                    {i18n._(t`send`)}{' '}
                                                                                    {
                                                                                        summonersForClaim.length
                                                                                    }{' '}
                                                                                    {i18n._(t`summoners`)}
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        approveHelper()
                                                                                    }
                                                                                    className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                                >
                                                                                    {i18n._(t`approve`)}{' '}
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <p className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2 opacity-50 text-center">
                                                                                {i18n._(
                                                                                    t`No summoners available`
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h2 className="text-lg">
                                                                        {i18n._(t`dungeons`)}
                                                                    </h2>
                                                                    <h2 className="mt-1 text-center text-xs">
                                                                        Summoners available for dungeons
                                                                    </h2>
                                                                    {summonersForDungeon.length > 0 ? (
                                                                        <div className="text-center">
                                                                            <button
                                                                                onClick={() =>
                                                                                    sendDungeon()
                                                                                }
                                                                                className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2"
                                                                            >
                                                                                {i18n._(t`send`)}{' '}
                                                                                {summonersForDungeon.length}{' '}
                                                                                {i18n._(t`summoners`)}
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <p className="rounded-lg border-2 border-white p-2 uppercase text-xs mt-2 opacity-50 text-center">
                                                                                {i18n._(
                                                                                    t`Coming soon`
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>
                                </div>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>
                {Object.keys(summonersFullData).length > 0 && (
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
                                    <Menu.Items className="absolute max-h-96 overflow-scroll right-0 rounded-b-lg border-b-2 border-r-2 border-l-2 pb-0.5 border-white shadow-lg bg-background-end">
                                        <div>
                                            {Object.keys(summonersFullData).map((k: string) => {
                                                const data = summonersFullData[k]
                                                return (
                                                    <Menu.Item key={k}>
                                                        {() => (
                                                            <button
                                                                onClick={() => setSelectedSummoner(data.id)}
                                                                className={
                                                                    'group w-full hover:bg-background-start flex items-center border-white p-2 text-xs font-bold'
                                                                }
                                                            >
                                                                <span className="ml-2 uppercase whitespace-nowrap overflow-hidden overflow-ellipsis w-72">
                                                                    {' '}
                                                                    {data.base._name !== ''
                                                                        ? data.base._name
                                                                        : parseInt(k, 16) +
                                                                          ' ' +
                                                                          i18n._(t`level`) +
                                                                          ' ' +
                                                                          data.base._level +
                                                                          ' ' +
                                                                          i18n._(
                                                                              CLASSES_NAMES[data.base._class.toString()]
                                                                          )}
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
                )}

                {summonersFullData[selectedSummoner] && selectedSummoner ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-center py-4 md:py-20 gap-5">
                        <div className="text-center mx-auto">
                            <img
                                src={CLASSES_IMAGES[summonersFullData[selectedSummoner].base._class.toString()]}
                                alt={''}
                                className="h-24 mt-2 md:h-48 mx-auto"
                            />
                            <div className="flex flex-row items-center text-center justify-center uppercase text-lg md:text-3xl ">
                                <button onClick={() => selectPrevSummoner()}>
                                    <ChevronLeft />
                                </button>{' '}
                                <div className="w-32 md:w-60 overflow-x-hidden overflow-ellipsis">
                                    <span className="text-xs md:text-xl mx-2 overflow-hidden whitespace-nowrap">
                                        {summonersFullData[selectedSummoner].base._name !== ''
                                            ? summonersFullData[selectedSummoner].base._name
                                            : i18n._(t`unknown`)}
                                    </span>
                                </div>{' '}
                                <button onClick={() => selectNextSummoner()}>
                                    <ChevronRight />
                                </button>
                            </div>
                            <p className="mt-4 md:text-xl uppercase border-2 border-white rounded-3xl">
                                {i18n._(CLASSES_NAMES[summonersFullData[selectedSummoner].base._class.toString()])}
                            </p>
                        </div>
                        <div className="col-span-2">
                            {view === View.stats && (
                                <StatsProfile
                                    summoner={summonersFullData[selectedSummoner]}
                                    deleteModal={deleteModal}
                                    transferModal={transferModal}
                                    daycareModal={daycareModal}
                                />
                            )}
                            {view === View.adventure && (
                                <AdventureProfile summoner={summonersFullData[selectedSummoner]} />
                            )}
                            {view === View.skills && <SkillsProfile summoner={summonersFullData[selectedSummoner]} />}
                            {view === View.inventory && (
                                <InventoryProfile summoner={summonersFullData[selectedSummoner]} />
                            )}
                            {view === View.crafting && <CraftProfile summoner={summonersFullData[selectedSummoner]} />}
                        </div>
                    </div>
                ) : (
                    <div className="relative h-48">
                        <div className="absolute top-24 right-1/2 uppercase text-center">
                            <Loader className="animate-spin" size="40px" />
                        </div>
                    </div>
                )}
                <HeadlessUIModal
                    isOpen={modals.delete}
                    onDismiss={() => setModal({ delete: false, transfer: false, daycare: false })}
                >
                    <div className="bg-background-end rounded-lg border-2 border-white">
                        <ModalHeader
                            title={i18n._(t`delete summoner`)}
                            onClose={() => setModal({ delete: false, transfer: false, daycare: false })}
                        />
                        <div className="text-center text-white p-4 pb-8 gap-5">
                            <h2>{i18n._(t`Are you sure you want to delete this summoner?`)}</h2>
                            <h2>
                                <b>{i18n._(t`This action is IRREVERSIBLE.`)}</b>
                            </h2>
                            <h2>
                                <b>{i18n._(t`All items and experience will be lost.`)}</b>
                            </h2>
                        </div>
                        <div className="flex flex-row justify-center pb-8">
                            <div className="bg-background-middle hover:bg-background-start text-white border-white border-2 rounded-lg mx-4">
                                <button
                                    className="w-full uppercase px-2 py-1"
                                    onClick={() => setModal({ delete: false, transfer: false, daycare: false })}
                                >
                                    <h2>{i18n._(t`cancel`)}</h2>
                                </button>
                            </div>
                            <div className="bg-red hover:bg-red-hovered text-white border-white border-2 rounded-lg mx-4">
                                <button className="w-full uppercase px-2 py-1" onClick={() => deleteConfirm()}>
                                    <h2>{i18n._(t`confirm`)}</h2>
                                </button>
                            </div>
                        </div>
                    </div>
                </HeadlessUIModal>
                <HeadlessUIModal
                    isOpen={modals.transfer}
                    onDismiss={() => setModal({ delete: false, transfer: false, daycare: false })}
                >
                    <div className="bg-background-end rounded-lg border-2 border-white">
                        <ModalHeader
                            title={i18n._(t`transfer summoner`)}
                            onClose={() => setModal({ delete: false, transfer: false, daycare: false })}
                        />
                        <div className="text-center text-white p-4 pb-4 gap-5">
                            <h2>{i18n._(t`Write the address to transfer the summoner`)}</h2>
                        </div>
                        <div className="text-center text-white p-4 pb-8 gap-5">
                            <input
                                className="p-2 text-background-end"
                                onChange={(v) => transferAddressHandler(v.target.value)}
                            />
                        </div>
                        <div className="flex flex-row justify-center pb-8">
                            <div className=" text-white  mx-4">
                                {transferAddress.address ? (
                                    <button
                                        className="bg-red hover:bg-red-hovered border-white border-2 rounded-lg uppercase px-2 py-1"
                                        onClick={() => transferConfirm()}
                                    >
                                        <h2>{i18n._(t`confirm`)}</h2>
                                    </button>
                                ) : (
                                    <>
                                        {transferAddress.input && (
                                            <div className="opacity-80 bg-red-hovered text-white w-full mb-4 text-center rounded-lg text-xs">
                                                <h2 className="p-2 uppercase">{i18n._(t`invalid address`)}</h2>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </HeadlessUIModal>
                <HeadlessUIModal
                    isOpen={modals.daycare}
                    onDismiss={() => setModal({ delete: false, transfer: false, daycare: false })}
                >
                    <div className="bg-background-end rounded-lg border-2 border-white">
                        <ModalHeader
                            title={i18n._(t`summoner daily care`)}
                            onClose={() => setModal({ delete: false, transfer: false, daycare: false })}
                        />
                        <div className="text-center text-white p-4 pb-4 gap-5">
                            <h2>
                                {i18n._(t`The daily care is a community run system to take care of your summoners`)}
                            </h2>
                        </div>
                        <div className="text-center text-white p-4 pb-4 gap-5">
                            <h2>{i18n._(t`The service has a fee of 0.1 FTM for each summoner for each day.`)}</h2>
                        </div>
                        <div className="text-center text-white p-4 pb-4 gap-5">
                            <h2>
                                {i18n._(t`This summoner is registed for `)} <b>{daycare}</b>{' '}
                                {i18n._(t`days in the daily care. `)}
                            </h2>
                        </div>
                        <div className="text-center text-white p-4 pb-4 gap-5">
                            <h2>{i18n._(t`How many days do you want to register your summoner/s?`)}</h2>
                        </div>
                        <div className="text-center text-white p-4 pb-8 gap-5">
                            <input
                                type="number"
                                className="p-2 text-background-end"
                                onChange={(v) => daycareRegister(parseInt(v.target.value))}
                            />
                        </div>
                        <div className="flex flex-row justify-center pb-8">
                            <div className="bg-background-middle hover:bg-background-start text-white border-white border-2 rounded-lg mx-4">
                                <button
                                    className="w-full uppercase px-2 py-1"
                                    onClick={async () => await registerSingleSummoner()}
                                >
                                    <h2>{i18n._(t`register summoner`)}</h2>
                                </button>
                            </div>
                            <div className="bg-red hover:bg-red-hovered text-white border-white border-2 rounded-lg mx-4">
                                <button
                                    className="w-full uppercase px-2 py-1"
                                    onClick={async () => await registerAllSummoners()}
                                >
                                    <h2>{i18n._(t`register all summoners`)}</h2>
                                </button>
                            </div>
                        </div>
                    </div>
                </HeadlessUIModal>
            </div>
        </div>
    )
}
