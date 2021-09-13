import { ChevronDoubleDownIcon } from '@heroicons/react/outline'

export default function Home(): JSX.Element {
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
                        <p className="text-sm m-3">A FREE-TO-MINT D&D Game from Fantom Network</p>
                        <p className="text-sm m-3">We are the ONE-STOP-SOLUTION for:</p>
                        <p className="text-sm m-3">USER STATS. ADVENTURE. MARKETPLACE.</p>
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
                <h1 className="uppercase text-3xl md:text-3xl xl:text-6xl">MINT A CLASS</h1>
                <button className="animate-bounce h-6">
                    <div className="flex flex-row w-full mx-auto text-center justify-center my-10">
                        <ChevronDoubleDownIcon className="w-6 h-6 mx-2" />
                        <span>Click Here to Mint Random Classes</span>
                        <ChevronDoubleDownIcon className="w-6 h-6 mx-2" />
                    </div>
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-16 mx-auto w-full lg:w-3/4 gap-5">
                    <button>
                        <img src="/img/classes/barbarian.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">BARBARIAN</span>
                        </div>
                    </button>
                    <button>
                        <img src="/img/classes/bard.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">BARD</span>
                        </div>
                    </button>
                    <button>
                        <img src="/img/classes/cleric.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">CLERIC</span>
                        </div>
                    </button>
                    <button>
                        <img src="/img/classes/druid.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">DRUID</span>
                        </div>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-16 mx-auto w-full lg:w-3/4 gap-5">
                    <button className="hover:animate-pulse">
                        <img src="/img/classes/fighter.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">FIGHTER</span>
                        </div>
                    </button>
                    <button className="hover:animate-pulse">
                        <img src="/img/classes/monk.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">MONK</span>
                        </div>
                    </button>
                    <button className="hover:animate-pulse">
                        <img src="/img/classes/paladin.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">PALADIN</span>
                        </div>
                    </button>
                    <button className="hover:animate-pulse">
                        <img src="/img/classes/ranger.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-2/3 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">RANGER</span>
                        </div>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-16 mx-auto w-full lg:w-3/4 gap-5">
                    <button className="hover:animate-pulse">
                        <img src="/img/classes/rogue.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">ROGUE</span>
                        </div>
                    </button>
                    <button className="hover:animate-pulse">
                        <img src="/img/classes/sorcerer.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">SORCERER</span>
                        </div>
                    </button>
                    <button className="hover:animate-pulse">
                        <img src="/img/classes/wizard.png" className="h-44 mx-auto" />
                        <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl">
                            <span className="py-2 px-4 ">WIZARD</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
