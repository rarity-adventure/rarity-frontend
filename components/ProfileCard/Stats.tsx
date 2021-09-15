import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../state/summoners/hooks'
import { TrashIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from '@heroicons/react/solid'
import { utils } from 'ethers'
interface StatsProfileProps {
    summoner: SummonerFullData
    deleteModal: () => void
    transferModal: () => void
}

function StatsProfile({ summoner, deleteModal, transferModal }: StatsProfileProps): JSX.Element {
    console.log(summoner)
    const { i18n } = useLingui()

    return (
        <div>
            <div className="flex flex-row w-full items-center">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 w-full">
                    <div className="bg-card-top col-span-3 md:p-2 p-1 bg-background-cards border-white border-2 rounded-t-2xl md:rounded-tl-2xl text-left">
                        <span className="ml-1.5">
                            {i18n._(t`ID`)}: {parseInt(summoner.id, 16)}
                        </span>
                    </div>
                    <div className="w-full mt-3 md:mt-0 hover:bg-card-content md:p-2 p-1 hover:text-grey bg-card-button col-span-2 bg-background-cards border-white border-2 md:rounded-tr-2xl text-center">
                        <button className="w-full" onClick={transferModal}>
                            <span className="uppercase">{i18n._(t`transfer`)}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-white border-2 my-3 bg-background-cards w-full bg-card-content">
                <div className="flex flex-row w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 mt-2">
                        <div>
                            <span className="uppercase">{i18n._(t`level`)}</span>
                            <span className="text-transparent -ml-1 md:ml-2">&nbsp;</span>:
                            <span className="ml-1.5">{summoner.base._level.toString()}</span>
                        </div>
                        <div>
                            <span className="uppercase">{i18n._(t`ap`)}</span>
                            <span className="text-transparent ml-8 md:ml-8">&nbsp;</span>:
                            <span className="ml-1.5">{summoner.base._level.toString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 md:mt-2">
                        <div>
                            <span className="uppercase">{i18n._(t`xp`)}</span>
                            <span className="text-transparent ml-8 md:ml-11">&nbsp;</span>:
                            <span className="ml-1.5">
                                {parseInt(utils.formatUnits(summoner.base._xp, 'ether')).toFixed(0)}
                            </span>
                        </div>
                        <div>
                            <span className="uppercase">{i18n._(t`gold`)}</span>
                            <span className="text-transparent ml-2 md:ml-2">&nbsp;</span>:
                            <span className="ml-1.5">
                                {utils.formatUnits(summoner.gold.balance.toString(), 'ether').toString()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full my-4">
                    <span className="w-full mx-10 border-white border-b-2" />
                </div>
                <div className="flex flex-row w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 mt-2">
                        <div className="flex flex-row justify-between">
                            <div>
                                <span className="uppercase">{i18n._(t`str`)}</span>
                                <span className="text-transparent ml-5 md:ml-8">&nbsp;</span>:
                                <span className="ml-1.5">{summoner.ability_scores.attributes._str}</span>
                            </div>
                            <div className="flex flex-row justify-between mr-10">
                                <PlusIcon width={25} /> <PlusIcon width={25} />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                <span className="uppercase">{i18n._(t`int`)}</span>
                                <span className="text-transparent ml-6 md:ml-6">&nbsp;</span>:
                                <span className="ml-1.5">{summoner.ability_scores.attributes._int}</span>
                            </div>
                            <div className="flex flex-row justify-between mr-10">
                                <PlusIcon width={25} /> <PlusIcon width={25} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 md:mt-2">
                        <div className="flex flex-row justify-between">
                            <div>
                                <span className="uppercase">{i18n._(t`dex`)}</span>
                                <span className="text-transparent ml-5 md:ml-8">&nbsp;</span>:
                                <span className="ml-1.5">{summoner.ability_scores.attributes._dex}</span>
                            </div>
                            <div className="flex flex-row justify-between mr-10">
                                <PlusIcon width={25} /> <PlusIcon width={25} />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                <span className="uppercase">{i18n._(t`wis`)}</span>
                                <span className="text-transparent ml-6 md:ml-6">&nbsp;</span>:
                                <span className="ml-1.5">{summoner.ability_scores.attributes._wis}</span>
                            </div>
                            <div className="flex flex-row justify-between mr-10">
                                <PlusIcon width={25} /> <PlusIcon width={25} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 md:mt-2">
                        <div className="flex flex-row justify-between">
                            <div>
                                <span className="uppercase">{i18n._(t`con`)}</span>
                                <span className="text-transparent ml-5 md:ml-8">&nbsp;</span>:
                                <span className="ml-1.5">{summoner.ability_scores.attributes._con}</span>
                            </div>
                            <div className="flex flex-row justify-between mr-10">
                                <PlusIcon width={25} /> <PlusIcon width={25} />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                <span className="uppercase">{i18n._(t`cha`)}</span>
                                <span className="text-transparent ml-5 md:ml-5">&nbsp;</span>:
                                <span className="ml-1.5">{summoner.ability_scores.attributes._cha}</span>
                            </div>
                            <div className="flex flex-row justify-between mr-10">
                                <PlusIcon width={25} /> <PlusIcon width={25} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 w-full">
                    <div className="hover:bg-red-hovered hover:text-grey w-full bg-red col-span-1 bg-background-cards border-white border-2 md:rounded-bl-2xl mb-3 md:mb-0 text-left">
                        <button className="w-full md:p-1" onClick={() => deleteModal()}>
                            <div className="flex flex-row p-1 justify-center items-center">
                                <TrashIcon width={30} />
                            </div>
                        </button>
                    </div>
                    <div className="hover:bg-card-content text-lg hover:text-grey bg-card-bottom col-span-2 bg-background-cards border-white border-2 mb-3 md:mb-0 md:rounded-bl-2xl text-center">
                        <button className="w-full p-2">
                            <span className="uppercase">{i18n._(t`claim gold`)}</span>
                        </button>
                    </div>
                    <div className="hover:bg-card-content text-lg hover:text-grey focus:animate-bounce col-span-2 bg-card-bottom bg-background-cards border-2 rounded-b-2xl md:rounded-br-2xl text-center border-whiter">
                        <button className="w-full p-2">
                            <span className="uppercase">{i18n._(t`assign points`)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsProfile
