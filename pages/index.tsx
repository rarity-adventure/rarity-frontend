export default function Home(): JSX.Element {
    return (
        <div className="w-full absolute top-0 bg-black">
            <div className=" h-screen z-0 w-full my-60">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:11/12 xl:w-9/12 mx-auto">
                    <div className="text-center col-span-1">
                        <h1 className="uppercase text-3xl md:text-3xl xl:text-6xl">RARITY ADVENTURE</h1>
                        <p className="text-sm m-3">A FREE-TO-MINT D&D Game from Fantom Network</p>
                        <p className="text-sm m-3">We are the ONE-STOP-SOLUTION for:</p>
                        <p className="text-sm m-3">USER STATS. ADVENTURE. MARKETPLACE.</p>
                    </div>
                    <div>
                        <img src="/img/sword.png" className="mx-auto w-64" />
                    </div>
                </div>
            </div>
        </div>
    )
}
