import gql from 'graphql-tag'

export const getSummoners = gql`
    query getSummoners($first: Int! = 1000, $owner: String!) {
        summoners(first: $first, where: { owner: $owner }) {
            id
        }
    }
`

export const getGlobalData = gql`
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

export const getMarketSummoners = gql`
    query getMarketSummoners($limit: Int! = 10, $offset: Int!) {
        summoners(limit: $limit, offset: $offset, where: { price_exact: { _gt: "0" } }) {
            summoner
            class
            xp
            level
            id
            name
            lister
            price_approx
            price_exact

            cha
            con
            dex
            wis
            str
            int

            cellar

            unclaimed_gold_exact
            unclaimed_gold_approx
            gold_approx
            gold_exact
        }
    }
`

export const getMarketSummonerSkills = gql`
    query getMarketSummoners($id: String!) {
        summoners(id: $id) {
            skill0
            skill1
            skill2
            skill3
            skill4
            skill5
            skill6
            skill7
            skill8
            skill9
            skill10
            skill11
            skill12
            skill13
            skill14
            skill15
            skill16
            skill17
            skill18
            skill19
            skill20
            skill21
            skill22
            skill23
            skill24
            skill25
            skill26
            skill27
            skill28
            skill29
            skill30
            skill31
            skill32
            skill33
            skill34
            skill35
        }
    }
`

export const getMarketSummonerFeats = gql`
    query getMarketSummoners($id: String!) {
        summoners(id: $id) {
            feat1
            feat2
            feat3
            feat4
            feat5
            feat6
            feat7
            feat8
            feat9
            feat10
            feat11
            feat12
            feat13
            feat14
            feat15
            feat16
            feat17
            feat18
            feat19
            feat20
            feat21
            feat22
            feat23
            feat24
            feat25
            feat26
            feat27
            feat28
            feat29
            feat30
            feat31
            feat32
            feat33
            feat34
            feat35
            feat36
            feat37
            feat38
            feat39
            feat40
            feat41
            feat42
            feat43
            feat44
            feat45
            feat46
            feat47
            feat48
            feat49
            feat50
            feat51
            feat52
            feat53
            feat54
            feat55
            feat56
            feat57
            feat58
            feat59
            feat60
            feat61
            feat62
            feat63
            feat64
            feat65
            feat66
            feat67
            feat68
            feat69
            feat70
            feat71
            feat72
            feat73
            feat74
            feat75
            feat76
            feat77
            feat78
            feat79
            feat80
            feat81
            feat82
            feat83
            feat84
            feat85
            feat86
            feat87
            feat88
            feat89
            feat90
            feat91
            feat92
            feat93
            feat95
            feat94
            feat96
            feat97
            feat98
            feat99
        }
    }
`

export const getMarketSummonersCount = gql`
    query getMarketSummoners {
        summoners_aggregate(where: { price_exact: { _gt: "0" } }) {
            aggregate {
                count
            }
        }
    }
`
