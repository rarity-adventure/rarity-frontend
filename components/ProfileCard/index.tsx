import { t } from '@lingui/macro'
import { CLASSES_NAMES } from '../../constants/classes'
import Loader from '../Loader'
import { useLingui } from '@lingui/react'
import { useEffect, useState } from 'react'
import { SummonerFullData } from '../../state/summoners/hooks'

enum View {
    stats,
    skills,
    inventory,
    crafting,
}

interface ProfileCardProps {
    summoners: { [k: string]: SummonerFullData }
}

function ProfileCard({ summoners }: ProfileCardProps): JSX.Element {


    return (
        
    )
}

export default ProfileCard
