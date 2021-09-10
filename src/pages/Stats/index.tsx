import stats from '../../assets/images/stats.png'
import title from '../../assets/images/stats_txt.png'
import SummonerStatsCard from '../../components/Summoner/Stats'
import { useUserSummoners } from '../../state/user/hooks'

export default function Stats(): JSX.Element | null {
    const summoners = useUserSummoners()

    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={stats} className="mx-auto w-16 mt-4 md:w-32" />
                <img alt="sword" src={title} className="mx-auto w-52 mt-4 md:w-64" />
            </div>
            <h1 className="text-md md:text-2xl text-white -mt-32 mb-12 uppercase">Upgrade Your Attributes</h1>
            <div className="w-full bg-custom-blue text-center pb-24">
                {summoners ? (
                    summoners.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 xl:w-8/12 mx-auto mt-10 gap-4">
                            {summoners.map((summoner) => {
                                return <SummonerStatsCard key={summoner.id} summoner={summoner} />
                            })}
                        </div>
                    ) : (
                        <p className="text-white mt-10 text-2xl font-bold text-center">
                            To be able to manage stats you need to have a summoner
                        </p>
                    )
                ) : (
                    <div />
                )}
            </div>
        </>
    )
}
