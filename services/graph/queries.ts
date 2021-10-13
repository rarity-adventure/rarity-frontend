import gql from 'graphql-tag'

export const getSummoners = gql`
    query getSummoners($first: Int! = 1000, $owner: String!) {
        summoners(first: $first, where: { owner: $owner }, orderBy: id, orderDirection: desc) {
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

export const getMarketSummonersDefault = gql`
    query getMarketSummoners($limit: Int! = 20, $offset: Int!) {
        summoners(limit: $limit, offset: $offset, where: { price_approx: { _gt: "0" } }) {
            summoner
            class
            xp
            level
            id
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

            gold_approx
            gold_exact

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

export function getMarketSummonersQuery(data: string): string {
    return `
    query getMarketSummoners($limit: Int! = 20, $offset: Int!) { 
                summoners(limit:$limit, offset: $offset, ${data}) {
                    summoner
                    class
                    xp
                    level
                    id
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
                    
                    gold_approx
                    gold_exact
                    
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
}

export const getMarketSummonersCount = gql`
    query getMarketSummoners {
        summoners_aggregate(where: { price_exact: { _gt: "0" } }) {
            aggregate {
                count
            }
        }
    }
`

export const getMarketSummonersForLister = gql`
    query getMarketSummonersForLister($lister: String!) {
        summoners(where: { lister: { _eq: $lister } }) {
            summoner
            price_exact
        }
    }
`

export const getMarketStats = gql`
    query getMarketStats($first: Int! = 20, $offset: Int!) {
        sales(first: $first, skip: $offset, orderBy: timestamp, orderDirection: desc) {
            id
            summoner
            txid
            timestamp
            seller
            buyer
            price
            fee
        }
    }
`

export const getMarketGlobalStats = gql`
    query getMarketGlobalStats {
        globals {
            id
            volume
            fees
            trades
        }
    }
`

export const marketLatestSale = gql`
    query getMarketLatestSale {
        sales(first: 1, orderBy: timestamp, orderDirection: desc) {
            id
            timestamp
        }
    }
`

export const marketBiggestSale = gql`
    query getMarketLatestSale {
        sales(first: 1, orderBy: price, orderDirection: desc) {
            id
            price
        }
    }
`
