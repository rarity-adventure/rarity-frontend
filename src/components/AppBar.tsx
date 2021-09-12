import { useActiveWeb3React } from '../hooks/useActiveWeb3React'
import Web3Network from './Web3Network'
import Web3Status from './Web3Status'
import { Popover } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

function AppBar(): JSX.Element {
    const { library } = useActiveWeb3React()

    return (
        <header className="flex-shrink-0 w-full text-white">
            <Popover as="nav" className="z-10 w-full bg-transparent header-border-b">
                {({ open }) => (
                    <>
                        <div className="px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center uppercase">
                                    <a
                                        href={'/'}
                                        className="uppercase text-xl p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                                    >
                                        <h1>Rarity adventure</h1>{' '}
                                    </a>

                                    <div className="hidden sm:block sm:ml-4 text-sm">
                                        <div className="flex space-x-1">
                                            <a
                                                href={'/daily'}
                                                className="uppercase py-3 px-1 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                                            >
                                                <h1>Daycare</h1>
                                            </a>
                                            <a
                                                href={'/stats'}
                                                className="uppercase py-3 px-1 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                                            >
                                                <h1>Stats</h1>
                                            </a>
                                            <a
                                                href={'/adventures'}
                                                className="uppercase py-3 px-1 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                                            >
                                                <h1>Adventures</h1>
                                            </a>
                                            <a
                                                href={'/skills'}
                                                className="uppercase py-3 px-1 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                                            >
                                                <h1>Skills</h1>
                                            </a>
                                            <a
                                                rel="noreferrer"
                                                target="_blank"
                                                href="https://names.rarity.game"
                                                className="uppercase py-3 px-1 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                                            >
                                                <h1>Names</h1>
                                            </a>
                                            <a
                                                rel="noreferrer"
                                                target="_blank"
                                                href="https://analytics.rarity.game"
                                                className="uppercase py-3 px-1 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap"
                                            >
                                                <h1>Analytics</h1>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-custom-background lg:relative lg:p-0 lg:bg-transparent">
                                    <a
                                        className="p-2 mx-2 bg-custom-selected border-white border-2 hidden sm:block"
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://ftmscan.com/address/0x5eC86d4d826bF3e12Ee2486B9dF01d7CFa99B6Ca"
                                    >
                                        Donate
                                    </a>
                                    <a className="mx-2 text-3xl" href="https://twitter.com/RarityGame">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a className="mx-2 text-3xl" href="https://discord.gg/NUrfGsUkmd">
                                        <FontAwesomeIcon icon={faDiscord} />
                                    </a>
                                    <a className="mx-2 text-3xl" href="https://github.com/rarity-adventure">
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                    <div className="flex items-center justify-between w-full space-x-2 sm:justify-end">
                                        {library && library.provider.isMetaMask && (
                                            <div className="hidden sm:inline-block">
                                                <Web3Network />
                                            </div>
                                        )}

                                        <div className="w-auto flex items-center rounded bg-custom-background p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                                            <Web3Status />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mr-2 sm:hidden">
                                    <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
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
                            <div className="flex flex-col px-4 pt-2 pb-3 space-y-1 uppercase font-bold">
                                <a
                                    className="p-2 mx-2 bg-custom-selected border-white border-2"
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://ftmscan.com/address/0x5eC86d4d826bF3e12Ee2486B9dF01d7CFa99B6Ca"
                                >
                                    Donate
                                </a>
                                <a
                                    href={'/daily'}
                                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                                >
                                    Daycare
                                </a>
                                <a
                                    href={'stats'}
                                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                                >
                                    Stats
                                </a>
                                <a
                                    href={'/adventures'}
                                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                                >
                                    Adventures
                                </a>
                                <a
                                    href={'/skills'}
                                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                                >
                                    Skills
                                </a>
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href="https://names.rarity.game"
                                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                                >
                                    Names
                                </a>
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href="https://analytics.rarity.game"
                                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                                >
                                    Analytics
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
