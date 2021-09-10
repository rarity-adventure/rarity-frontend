import { Summoner } from '../../state/user/actions'
import { Dispatch, SetStateAction } from 'react'

interface SummonersOrderingProps {
    summoners: Summoner[]
    stateFunc: Dispatch<SetStateAction<Summoner[]>>
}
export default function SummonersOrdering({ summoners, stateFunc }: SummonersOrderingProps): JSX.Element {
    return (
        <div>
            <div>Sort summoners</div>
            <div>Filter by class</div>
        </div>
    )
}
