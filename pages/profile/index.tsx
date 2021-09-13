import { useUserSummoners } from '../../state/user/hooks'
import { useSummonersData } from '../../state/summoners/hooks'

export default function Profile(): JSX.Element {
    const summoners = useUserSummoners()

    const summoners_full = useSummonersData(summoners)
    console.log(summoners_full)

    return <div className="w-full z-10"></div>
}
