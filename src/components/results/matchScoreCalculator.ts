import { MatchBet } from '../../queries/useAllBets'

export type Utfall = 'H' | 'U' | 'B'

export interface MatchPoeng {
    matchid: string
    riktigUtfall: number
    riktigResultat: number
    antallRiktigeSvar: number
    utfall: Utfall | null
}

export function finnUtfall(home: String, away: String): Utfall {
    const tallHome = Number(home)
    const tallAway = Number(away)
    if (tallHome > tallAway) {
        return 'H'
    }
    if (tallHome < tallAway) {
        return 'B'
    }
    return 'U'
}

export function regnUtScoreForKamp(bets: MatchBet[]): Map<string, MatchPoeng> {
    const matchMap = new Map<string, MatchBet[]>()

    bets.forEach((bet) => matchMap.set(bet.match_id, []))
    bets.forEach((bet) => matchMap.get(bet.match_id)?.push(bet))

    const res = [] as MatchPoeng[]
    matchMap.forEach((bets, match) => {
        const homeResult = bets[0].home_result
        const awayResult = bets[0].away_result

        if (homeResult == null || awayResult == null) {
            res.push({
                matchid: match,
                riktigUtfall: 0,
                riktigResultat: 0,
                antallRiktigeSvar: 0,
                utfall: null,
            })
        } else {
            let riktigeSvar = 0

            const vekting = 1 //TODO endres senere

            bets.forEach((b) => {
                const riktig = b.home_result == b.home_score && b.away_result == b.away_score
                if (riktig) {
                    riktigeSvar++
                }
            })

            const riktigResultat = () => {
                if (riktigeSvar <= 1) {
                    return 5
                }
                if (riktigeSvar <= 2) {
                    return 4
                }
                if (riktigeSvar <= 3) {
                    return 3
                }
                if (riktigeSvar <= 5) {
                    return 2
                }
                return 1
            }

            res.push({
                matchid: match,
                riktigUtfall: vekting,
                riktigResultat: riktigResultat() * vekting,
                antallRiktigeSvar: riktigeSvar,
                utfall: finnUtfall(homeResult, awayResult),
            })
        }
    })

    const mappet = new Map<string, MatchPoeng>()
    res.forEach((a) => {
        mappet.set(a.matchid, a)
    })
    return mappet
}
