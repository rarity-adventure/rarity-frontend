import title from '../../assets/images/hero_title.png'

import { useMetadata } from '../../state/rarity/hooks'
import { CLASSES } from '../../constants/classes'
import useRarity from '../../hooks/useRarity'
import { useCallback, useEffect, useState } from 'react'

export default function GlobalStats(): JSX.Element | null {
    const metadata = useMetadata()

    const { nextSummoner } = useRarity()

    const [state, setState] = useState<{ synced: number }>({ synced: 0 })

    const calcSynced = useCallback(async () => {
        const lastSyncedString = await nextSummoner()
        const lastSynced = parseInt(lastSyncedString.toString())
        const currSynced = metadata.summoners
        const percentage = ((currSynced * 100) / lastSynced).toFixed(2)
        setState({ synced: parseFloat(percentage) })
    }, [setState, metadata, nextSummoner])

    useEffect(() => {
        calcSynced()
    }, [calcSynced])

    if (!metadata) return null

    return (
        <>
            <div className="w-full mb-20">
                <img alt="sword" src={title} className="mx-auto w-52 mt-4 md:w-1/3" />
                <h1 className="text-white text-4xl text-center mt-12">Global Statistics</h1>
            </div>
            <div className="w-full bg-custom-blue text-center pb-24">
                <div className="w-3/4 bg-custom-green border-custom-border border-8 mx-auto mt-10 p-8 text-xl text-white font-bold">
                    <div className="flex justify-between items-center mb-8">
                        <span className="my-2">Total Summoners:</span>
                        <span>{metadata.summoners}</span>
                    </div>
                    <div className="flex justify-between items-center mb-8">
                        <span>Synced Percentage:</span>
                        <span>{state.synced}%</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-3/4 mx-auto mt-10 gap-4">
                        <div className="border-white border-8 p-8">
                            <img className="w-24 mx-auto" src={CLASSES[1].image} alt={CLASSES[1].name} />
                            <span className="my-2">{CLASSES[1].name}</span>
                            <p>{((metadata.barbarians * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.barbarians}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[2].image} alt={CLASSES[2].name} />
                            <span className="my-2">{CLASSES[2].name}</span>
                            <p>{((metadata.bards * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.bards}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[3].image} alt={CLASSES[3].name} />
                            <span className="my-2">{CLASSES[3].name}</span>
                            <p>{((metadata.clerics * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.clerics}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[4].image} alt={CLASSES[4].name} />
                            <span className="my-2">{CLASSES[4].name}</span>
                            <p>{((metadata.druids * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.druids}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[5].image} alt={CLASSES[5].name} />
                            <span className="my-2">{CLASSES[5].name}</span>
                            <p>{((metadata.fighters * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.fighters}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[6].image} alt={CLASSES[6].name} />
                            <span className="my-2">{CLASSES[6].name}</span>
                            <p>{((metadata.monks * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.monks}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[7].image} alt={CLASSES[7].name} />
                            <span className="my-2">{CLASSES[7].name}</span>
                            <p>{((metadata.paladins * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.paladins}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[8].image} alt={CLASSES[8].name} />
                            <span className="my-2">{CLASSES[8].name}</span>
                            <p>{((metadata.rangers * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.rangers}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[9].image} alt={CLASSES[9].name} />
                            <span className="my-2">{CLASSES[9].name}</span>
                            <p>{((metadata.rogues * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.rogues}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[10].image} alt={CLASSES[10].name} />
                            <span className="my-2">{CLASSES[10].name}</span>
                            <p>{((metadata.sorcerers * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.sorcerers}</h1>
                        </div>
                        <div className="border-white border-8 p-8">
                            <img className={'w-24 mx-auto'} src={CLASSES[11].image} alt={CLASSES[11].name} />
                            <span className="my-2">{CLASSES[11].name}</span>
                            <p>{((metadata.wizards * 100) / metadata.summoners).toFixed(2)}%</p>
                            <h1>{metadata.wizards}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
