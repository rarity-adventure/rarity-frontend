import React from 'react'
import { Popover } from '@headlessui/react'
import Web3Status from '../Web3Status'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../state/wallet/hooks'
import LangSwitcher from '../LanguageSwitch'

function AppBar(): JSX.Element {
    const { account, chainId } = useActiveWeb3React()

    const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

    return (
        <header className="flex-shrink-0 w-full z-20">
            <Popover as="nav" className="w-full bg-transparent header-border-b">
                {({ open }) => (
                    <>
                        <div className="px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center z-20">
                                    <div className="uppercase text-center tracking-widest text-2xl ">
                                        <h1>RARITY</h1>
                                        <h1>Adventure</h1>
                                    </div>
                                    <div className="hidden md:block sm:ml-4">
                                        <div className="flex space-x-2 uppercase">
                                            <a
                                                href="#"
                                                className="hover:border-white border-transparent border-2 rounded-3xl py-1 px-2"
                                            >
                                                <h2>Adventure</h2>
                                            </a>
                                            <a
                                                href="#"
                                                className="hover:border-white border-transparent border-2 rounded-3xl py-1 px-2"
                                            >
                                                <h2>Profile</h2>
                                            </a>
                                            <a
                                                href="#"
                                                className="hover:border-white border-transparent border-2 rounded-3xl py-1 px-2"
                                            >
                                                <h2>Analytics</h2>
                                            </a>
                                            <a
                                                href="#"
                                                className="hover:border-white border-transparent border-2 rounded-3xl py-1 px-2"
                                            >
                                                <h2>Marketplace</h2>
                                            </a>
                                            <a
                                                href="#"
                                                className="border-contrast border-transparent border-2 rounded-3xl py-1 px-2"
                                            >
                                                <h2>Donate</h2>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="fixed bottom-0 right-0 z-20 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-black lg:relative lg:p-0 lg:bg-transparent">
                                    <div className="flex items-center justify-between w-full space-x-2 sm:justify-end ">
                                        <div className="w-auto mx-auto flex items-center rounded p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                                            <LangSwitcher />
                                            {account && chainId && userEthBalance && (
                                                <>
                                                    <div className="px-3 mx-3 py-2 text-primary text-bold border-white border-2 rounded-lg">
                                                        <h2>{userEthBalance} FTM</h2>
                                                    </div>
                                                </>
                                            )}
                                            <Web3Status />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mr-2 md:hidden">
                                    <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                                        <span className="sr-only">Open menu</span>
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

                        <Popover.Panel className="sm:hidden">
                            <div className="flex flex-col px-4 pt-2 pb-3 space-y-1 text-center">
                                <a
                                    href="#"
                                    className="hover:border-white border-transparent border-2 rounded-3xl py-1 px-2"
                                >
                                    <h2>Adventure</h2>
                                </a>
                                <a
                                    href="#"
                                    className="hover:border-white border-transparent border-2 rounded-3xl py-1 px-2"
                                >
                                    <h2>Profile</h2>
                                </a>
                                <a
                                    href="#"
                                    className="hover:border-white border-transparent border-2 rounded-3xl py-1 px-2"
                                >
                                    <h2>Analytics</h2>
                                </a>
                                <a
                                    href="#"
                                    className="hover:border-white border-transparent border-2 rounded-3xl py-1 px-2"
                                >
                                    <h2>Marketplace</h2>
                                </a>
                                <a
                                    href="#"
                                    className="border-contrast border-transparent border-2 rounded-3xl py-1 px-2"
                                >
                                    <h2>Donate</h2>
                                </a>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </header>
    )
}

export default AppBar
