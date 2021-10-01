import { ChevronDoubleDownIcon } from '@heroicons/react/outline'
import useRarity from '../hooks/useRarity'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Image from 'next/image'
import Link from 'next/link'
import { CLASSES_IMAGES } from '../constants/classes'
import { sendToast } from '../functions/toast'

export default function Home(): JSX.Element {
    const { summon } = useRarity()
    const { i18n } = useLingui()

    return (
        <div className="w-full z-10">
            <div>
                <div className="hero-bg w-full z-0" />
                <div className="classes-bg w-full z-0" />
            </div>
            <div className="w-full mt-24 lg:mt-48 rounded-b-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:11/12 xl:w-9/12 mx-auto">
                    <div className="text-center col-span-3">
                        <h1 className="uppercase text-3xl md:text-3xl xl:text-6xl">RARITY ADVENTURE</h1>
                        <p className="text-sm m-3">{i18n._(t`A FREE-TO-MINT D&D Game in the Fantom Network`)}</p>
                        <p className="text-sm m-3">{i18n._(t`We are the ONE-STOP-SOLUTION for`)}:</p>
                        <p className="text-sm m-3">{i18n._(t`SUMMONER MANAGE. ADVENTURE. GLOBAL STATS`)}.</p>
                    </div>
                    <div className="col-span-2 mx-auto">
                        <Image src="/img/sword.png" width={256} height={208} alt="Rarity Adventure" />
                    </div>
                </div>
                <div className="flex flex-row justify-center mx-auto w-full text-center  mt-10 lg:mt-28">
                    <a href="#mint">
                        <ChevronDoubleDownIcon className="animate-bounce h-16 mx-2" />
                    </a>
                </div>
            </div>
            <div id="mint" />
            <div className="w-full mt-48 rounded-b-3xl text-center">
                <Link href={'/pack'} passHref>
                    <div className="cursor-pointer">
                        <p className="pt-2">{i18n._(t`Get your Rarity Starter Pack!`)}</p>
                        <Image
                            src="/img/pack.png"
                            width={386}
                            height={386}
                            alt="rarity starter pack"
                            className="mt-4"
                        />
                        <p className="py-2">{i18n._(t`Supporter NFT Badges included!`)}</p>
                    </div>
                </Link>

                <p className="py-4 uppercase">{i18n._(t`or`)}</p>

                <h1 className="uppercase text-3xl py-4 md:text-3xl xl:text-6xl">{i18n._(t`MINT A CLASS`)}</h1>
                <button
                    className="animate-bounce h-6"
                    onClick={async () =>
                        await sendToast(
                            summon(),
                            i18n._(t`Summoning random class`),
                            i18n._(t`SUCCESS`),
                            i18n._(t`FAILED`)
                        )
                    }
                >
                    <div className="flex flex-row w-full mx-auto text-center justify-center my-3">
                        <ChevronDoubleDownIcon className="w-6 h-6 mx-2" />
                        <span>{i18n._(t`Click here to mint random classes`)}</span>
                        <ChevronDoubleDownIcon className="w-6 h-6 mx-2" />
                    </div>
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-16 mx-auto w-full lg:w-3/4 gap-10">
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('1'),
                                i18n._(t`Summoning barbarian`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['1']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`barbarian`)}</span>
                        </div>
                    </button>
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('2'),
                                i18n._(t`Summoning Bard`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['2']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`bard`)}</span>{' '}
                        </div>
                    </button>
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('3'),
                                i18n._(t`Summoning Cleric`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['3']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`cleric`)}</span>{' '}
                        </div>
                    </button>
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('4'),
                                i18n._(t`Summoning Druid`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['4']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`druid`)}</span>{' '}
                        </div>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-12 lg:mt-16 mx-auto w-full lg:w-3/4 gap-10">
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('5'),
                                i18n._(t`Summoning Fighter`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['5']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`fighter`)}</span>{' '}
                        </div>
                    </button>
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('6'),
                                i18n._(t`Summoning Monk`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto text-center">{CLASSES_IMAGES['6']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`monk`)}</span>{' '}
                        </div>
                    </button>
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('7'),
                                i18n._(t`Summoning Paladin`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['7']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`paladin`)}</span>{' '}
                        </div>
                    </button>
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('8'),
                                i18n._(t`Summoning Ranger`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['8']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`ranger`)}</span>{' '}
                        </div>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-12 lg:mt-16 mx-auto w-full lg:w-3/4 gap-10">
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('9'),
                                i18n._(t`Summoning Rogue`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['9']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`rogue`)}</span>{' '}
                        </div>
                    </button>
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('10'),
                                i18n._(t`Summoning Sorcerer`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['10']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`sorcerer`)}</span>{' '}
                        </div>
                    </button>
                    <button
                        className="hover:animate-pulse"
                        onClick={async () =>
                            await sendToast(
                                summon('11'),
                                i18n._(t`Summoning Wizard`),
                                i18n._(t`SUCCESS`),
                                i18n._(t`FAILED`)
                            )
                        }
                    >
                        <div className="mx-auto">{CLASSES_IMAGES['11']}</div>
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`wizard`)}</span>{' '}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
