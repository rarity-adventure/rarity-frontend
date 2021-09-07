import stats from '../../assets/images/stats.png'
import title from '../../assets/images/stats_txt.png'
import pie from '../../assets/images/pie_chart.png'
import statsCenter from '../../assets/images/stats_center.png'
import SummonerStatsCard from '../../components/Summoner/Stats'
import { useUserSummoners } from '../../state/user/hooks'

export default function Stats(): JSX.Element | null {
    const summoners = useUserSummoners()

    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={stats} className="mx-auto w-16 mt-24 md:w-32" />
                <img alt="sword" src={title} className="mx-auto w-44 mt-4 md:w-1/4" />
            </div>
            <div className="w-full bg-custom-blue text-center pb-24">
                <img alt="sword" src={pie} className="mx-auto w-64 -m-32" />
                <img alt="sword" src={statsCenter} className="mx-auto w-64 mt-32 md:w-1/3 mb-8" />
                <span className="text-2xl text-white">Upgrade Your Attributes</span>
                {summoners ? (
                    summoners.length > 0 ? (
                        <div className="grid w-3/4 grid-cols-1 lg:grid-cols-2 mx-auto mt-10 gap-10">
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
