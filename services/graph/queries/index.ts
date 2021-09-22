import gql from 'graphql-tag'

export const getSummoners = gql`
    query getSummoners($first: Int! = 1000, $owner: String!) {
        summoners(first: $first, where: { owner: $owner }) {
            id
        }
    }
`

export const global_data = gql`
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
