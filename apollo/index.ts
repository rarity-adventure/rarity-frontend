import { gql } from '@apollo/client'

export const SUMMONERS = gql`
    query getSummoners($owner: String!) {
        summoners(first: 1000, where: { owner: $owner }) {
            id
        }
    }
`
