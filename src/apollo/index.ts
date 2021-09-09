import { gql } from '@apollo/client'

export const SUMMONERS = gql`
    query getSummoners($owner: String!) {
        summoners(first: 1000, where: { owner: $owner }) {
            id
            owner
            _class
            _level
        }
    }
`

export const METADATA = gql`
    query {
        metaDatas {
            summoners
            barbarians
            bards
            clerics
            druids
            fighters
            monks
            paladins
            rangers
            rogues
            sorcerers
            wizards
        }
    }
`
