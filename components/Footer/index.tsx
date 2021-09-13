const Footer = () => {
    return (
        <footer className="flex-shrink-0 w-full text-xs mt-40">
            <div className="w-full p-5">
                <div className="grid grid-cols-1 md:grid-cols-4 w-full lg:w-6/12 xl:w-5/12 p-1 md:divide-x-2 md:divide-white gap-1">
                    <div>
                        <h2>CREATED BY:</h2>
                        <a target="_blank" rel="noreferrer" href="https://twitter.com/andrecronje">
                            <h2>@ANDRECRONJE</h2>
                        </a>
                    </div>
                    <div className="col-span-2">
                        <h2 className="md:ml-4">BUILT BY:</h2>
                        <a className="md:ml-4" target="_blank" rel="noreferrer" href="https://twitter.com/0xberrueta">
                            <span style={{ fontFamily: 'Regular' }}>@0xKronos</span>
                        </a>
                        <span className="md:mx-2" style={{ fontFamily: 'Regular' }}>
                            and
                        </span>
                        <a target="_blank" rel="noreferrer" href="https://twitter.com/andrecronje">
                            <span style={{ fontFamily: 'Regular' }}>@MAT_NADLER</span>
                        </a>
                    </div>
                    <div>
                        <h2 className="md:ml-4">DESIGNED BY:</h2>
                        <a className="md:ml-4" target="_blank" rel="noreferrer" href="https://twitter.com/andrecronje">
                            <span style={{ fontFamily: 'Regular' }}>@0xLUCID</span>
                        </a>
                    </div>
                </div>
                <div className="flex flex-row p-1">
                    <h2>
                        Disclaimer: rarity.game is a non-commercial platform to access the public blockchain-based
                        rarity game.
                    </h2>
                </div>
                <div className="flex flex-row p-1">
                    <h2>
                        All ragnarok-related graphics and materials are copyright © 2002-2021 Gravity Co., Ltd. Logo
                        Gravity Co., Ltd. & Lee Myoungjin.
                    </h2>
                </div>
            </div>
        </footer>
    )
}

export default Footer
