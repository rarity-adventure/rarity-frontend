import sword from '../../assets/images/sword.png'
import title from '../../assets/images/hero_title.png'
import grand from '../../assets/images/grand_wizard.png'
import mintImg from '../../assets/images/mint.png'

import useRarity from '../../hooks/useRarity'
import { CLASSES } from '../../constants/classes'

export default function Home(): JSX.Element | null {
    const rarity = useRarity()

    if (!rarity) return null

    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={sword} className="mx-auto w-16 mt-4 md:w-32" />
                <img alt="sword" src={title} className="mx-auto w-52 mt-4 md:w-64" />
            </div>
            <div className="w-full bg-custom-blue text-center pb-24">
                <img alt="sword" src={grand} className="mx-auto w-52 -m-32" />
                <img alt="sword" src={mintImg} className="mx-auto w-52 mt-32 md:w-1/4 mb-8" />
                <div className="flex justify-center mt-6">
                    <button
                        className="text-white bg-custom-green py-4 px-10 text-xl md:text-xl border-8 border-custom-border border-solid"
                        onClick={() => rarity.mint()}
                    >
                        Mint a random class
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-3/4 xl:w-2/4 mx-auto mt-10">
                    {Object.keys(CLASSES).map((k) => {
                        return (
                            <button key={k} className="m-4 mx-auto" onClick={() => rarity.mint(k)}>
                                <div
                                    className="bg-custom-green mb-4 border-8 border-custom-border"
                                    style={{ height: '140px', width: '140px' }}
                                >
                                    <img
                                        className="p-4 h-28 mx-auto my-auto mt-2"
                                        src={CLASSES[k].image}
                                        alt={'barbarian'}
                                    />
                                </div>
                                <div className="text-white bg-custom-blue py-1 px-2 text-2xl border-2 border-solid">
                                    <h1>{CLASSES[k].name}</h1>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
