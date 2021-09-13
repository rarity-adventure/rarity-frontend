import { ChevronDoubleDownIcon } from '@heroicons/react/outline'
import useRarity from '../hooks/useRarity'
import toast, { Toaster } from 'react-hot-toast'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export default function Home(): JSX.Element {
    const { summon } = useRarity()
    const { i18n } = useLingui()

    async function summonClass(_class?: string) {
        await toast.promise(summon(_class), {
            loading: <b>{i18n._(t`Summoning character`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    return (
        <div className="w-full z-10">
            <div>
                <div className="hero-bg w-full z-0" />
                <div className="classes-bg w-full z-0" />
                <Toaster containerClassName="z-30" />
            </div>
            <div className="w-full mt-24 lg:mt-48 rounded-b-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:11/12 xl:w-9/12 mx-auto">
                    <div className="text-center col-span-3">
                        <h1 className="uppercase text-3xl md:text-3xl xl:text-6xl">RARITY ADVENTURE</h1>
                        <p className="text-sm m-3">{i18n._(t`A FREE-TO-MINT D&D Game from Fantom Network`)}</p>
                        <p className="text-sm m-3">{i18n._(t`We are the ONE-STOP-SOLUTION for`)}:</p>
                        <p className="text-sm m-3">{i18n._(t`USER STATS. ADVENTURE. MARKETPLACE`)}.</p>
                    </div>
                    <div className="col-span-2">
                        <img src="/img/sword.png" className="mx-auto w-64" alt="Rarity Adventure" />
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
                <h1 className="uppercase text-3xl md:text-3xl xl:text-6xl">{i18n._(t`MINT A CLASS`)}</h1>
                <button className="animate-bounce h-6" onClick={async () => await summonClass()}>
                    <div className="flex flex-row w-full mx-auto text-center justify-center my-10">
                        <ChevronDoubleDownIcon className="w-6 h-6 mx-2" />
                        <span>{i18n._(t`Click here to mint random classes`)}</span>
                        <ChevronDoubleDownIcon className="w-6 h-6 mx-2" />
                    </div>
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-16 mx-auto w-full lg:w-3/4 gap-10">
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('1')}>
                        <img src="/img/classes/barbarian.png" className="h-44 mx-auto" alt={'barbarian'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`barbarian`)}</span>
                        </div>
                    </button>
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('2')}>
                        <img src="/img/classes/bard.png" className="h-44 mx-auto" alt={'bard'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`bard`)}</span>{' '}
                        </div>
                    </button>
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('3')}>
                        <img src="/img/classes/cleric.png" className="h-44 mx-auto" alt={'cleric'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`cleric`)}</span>{' '}
                        </div>
                    </button>
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('4')}>
                        <img src="/img/classes/druid.png" className="h-44 mx-auto" alt={'druid'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`druid`)}</span>{' '}
                        </div>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-12 lg:mt-16 mx-auto w-full lg:w-3/4 gap-10">
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('5')}>
                        <img src="/img/classes/fighter.png" className="h-44 mx-auto" alt={'fighter'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`fighter`)}</span>{' '}
                        </div>
                    </button>
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('6')}>
                        <img src="/img/classes/monk.png" className="h-44 mx-auto" alt={'monk'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`monk`)}</span>{' '}
                        </div>
                    </button>
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('7')}>
                        <img src="/img/classes/paladin.png" className="h-44 mx-auto" alt={'paladin'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`paladin`)}</span>{' '}
                        </div>
                    </button>
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('8')}>
                        <img src="/img/classes/ranger.png" className="h-44 mx-auto" alt={'ranger'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`ranger`)}</span>{' '}
                        </div>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-12 lg:mt-16 mx-auto w-full lg:w-3/4 gap-10">
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('9')}>
                        <img src="/img/classes/rogue.png" className="h-44 mx-auto" alt={'rogue'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`rogue`)}</span>{' '}
                        </div>
                    </button>
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('10')}>
                        <img src="/img/classes/sorcerer.png" className="h-44 mx-auto" alt={'sorcerer'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`sorcerer`)}</span>{' '}
                        </div>
                    </button>
                    <button className="hover:animate-pulse" onClick={async () => await summonClass('11')}>
                        <img src="/img/classes/wizard.png" className="h-44 mx-auto" alt={'wizard'} />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 uppercase">{i18n._(t`wizard`)}</span>{' '}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
