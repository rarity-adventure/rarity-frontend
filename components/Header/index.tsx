import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import Web3Status from '../Web3Status'
import LangSwitcher from '../Language'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'

function AppBar({ supporter }: { supporter: boolean }): JSX.Element {
    const { i18n } = useLingui()

    function summoners(): JSX.Element {
        return (
            <Link href="/summoners" passHref={true}>
                <div className="cursor-pointer hover:border-white border-transparent border-2 rounded-xl py-1 px-2">
                    <h2>{i18n._(t`Summoners`)}</h2>
                </div>
            </Link>
        )
    }

    function stats(): JSX.Element {
        return (
            <Link href="/stats" passHref>
                <div className="cursor-pointer hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1">
                    <h2>{i18n._(t`stats`)}</h2>
                </div>
            </Link>
        )
    }

    function names(): JSX.Element {
        return (
            <Link href="https://names.rarity.game" passHref={true}>
                <div className="cursor-pointer hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1">
                    <h2>{i18n._(t`names`)}</h2>
                </div>
            </Link>
        )
    }

    function inventory(): JSX.Element {
        return (
            <Link href="/inventory" passHref={true}>
                <div className="cursor-pointer hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1">
                    <h2>{i18n._(t`inventory`)}</h2>
                </div>
            </Link>
        )
    }

    function supporterBadge(): JSX.Element {
        return (
            <div>
                <Image src="/img/badge.png" width="80" height="80" alt="Rarity Game Supporter Badge" />
            </div>
        )
    }

    const [showBadge, setShowBadge] = useState(false)

    useEffect(() => {
        setShowBadge(supporter)
    }, [supporter])

    const [modal, setModal] = useState(false)

    function close() {
        setModal(false)
    }

    function socials() {
        return (
            <div className="text-white text-3xl gap-x-3 flex flex-row mr-5">
                <a href="https://discord.com/invite/NUrfGsUkmd">
                    <FontAwesomeIcon icon={faDiscord} />
                </a>
                <a href="https://twitter.com/RarityGame">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
            </div>
        )
    }

    return (
        <header className="flex-shrink-0 w-full z-30">
            <Popover as="nav" className="w-full bg-transparent header-border-b">
                {({ open }) => (
                    <>
                        <div className="px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center z-10 cursor-pointer">
                                    <Link href="/" passHref={true}>
                                        {showBadge ? (
                                            supporterBadge()
                                        ) : (
                                            <div className="uppercase cursor-pointer text-center tracking-widest text-xl">
                                                <h1>RARITY</h1>
                                                <h1>Adventure</h1>
                                            </div>
                                        )}
                                    </Link>
                                    <div className="hidden md:block sm:ml-2">
                                        <div className="flex uppercase">
                                            {summoners()}
                                            {inventory()}
                                            {names()}
                                            {stats()}
                                        </div>
                                    </div>
                                </div>
                                <div className="fixed bottom-0 right-0 z-40 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-black lg:relative lg:p-0 lg:bg-transparent">
                                    <div className="flex items-center justify-between w-full space-x-2 sm:justify-end z-20">
                                        <div className="w-auto mx-auto flex items-center rounded p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto z-20">
                                            {socials()}
                                            <div className="hidden md:inline-block mx-2">
                                                <LangSwitcher />
                                            </div>
                                            <Web3Status />
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

                        <Popover.Panel className="sm:hidden uppercase">
                            <div className="flex flex-col px-4 pt-2 pb-3 space-y-1 text-center">
                                {summoners()}
                                {inventory()}
                                {names()}
                                {stats()}
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </header>
    )
}

export default AppBar
