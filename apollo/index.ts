import { gql } from '@apollo/client'

export const SUMMONERS = gql`
    query getSummoners($owner: String!) {
        summoners(first: 1000, where: { owner: $owner }) {
            id
        }
    }
`

export const GLOBAL_DATA = gql`
    query data {
        globals {
            summoners
            owners
        }
        classes {
            id
            count
        }
        levels {
            id
            count
        }
    }
`
