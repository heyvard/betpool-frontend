import { MatchBet } from '../../queries/useAllBets'

export type Utfall = 'H' | 'U' | 'B'

export interface MatchPoeng {
    matchid: string
    riktigUtfall: number
    riktigResultat: number
    antallRiktigeSvar: number
    antallRiktigeUtfall: number
    andelRiktigeUtfall: number
    andelRiktigeResultat: number
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
                antallRiktigeUtfall: 0,
                andelRiktigeUtfall: 0,
                andelRiktigeResultat: 0,
                utfall: null,
            })
        } else {
            let riktigeSvar = 0
            let riktigeUtfall = 0
            let utfall = finnUtfall(homeResult, awayResult)

            const round = Number(bets[0].round)

            const finnVekting = () => {
                switch (round) {
                    case 4:
                        return 2
                    case 5:
                        return 2
                    case 6:
                        return 3
                    case 7:
                        return 3
                    case 8:
                        return 4
                }
                return 1
            }
            const vekting = finnVekting()
            let faktiskeBets = 0
            bets.forEach((b) => {
                const riktig = b.home_result == b.home_score && b.away_result == b.away_score
                if (riktig) {
                    riktigeSvar++
                }
                if (b.home_score && b.away_score) {
                    faktiskeBets++
                    const betUtfall = finnUtfall(b.home_score, b.away_score)
                    if (betUtfall == utfall) {
                        riktigeUtfall++
                    }
                }
            })

            const andelRiktigeResultat = riktigeSvar / faktiskeBets
            const andelRiktigeUtfall = riktigeUtfall / faktiskeBets
            const riktigResultat = () => {
                if (andelRiktigeResultat < 0.15) {
                    return vekting * 3
                }
                if (andelRiktigeResultat < 0.3) {
                    return vekting * 2
                }
                return vekting
            }

            const riktigUtfall = () => {
                if (andelRiktigeUtfall < 0.2) {
                    return vekting * 2
                }
                return vekting
            }

            res.push({
                matchid: match,
                riktigUtfall: riktigUtfall(),
                riktigResultat: riktigResultat(),
                antallRiktigeSvar: riktigeSvar,
                antallRiktigeUtfall: riktigeUtfall,
                andelRiktigeUtfall: andelRiktigeUtfall,
                andelRiktigeResultat: andelRiktigeResultat,
                utfall: utfall,
            })
        }
    })

    const mappet = new Map<string, MatchPoeng>()
    res.forEach((a) => {
        mappet.set(a.matchid, a)
    })
    return mappet
}
