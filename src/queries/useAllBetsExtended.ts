import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { finnUtfall, MatchPoeng, regnUtScoreForKamp } from '../components/results/matchScoreCalculator'
import { stringTilNumber } from '../utils/stringnumber'

export interface OtherUser {
    id: string
    name: string
    picture: string | null
    winner?: string
    topscorer?: string
}

export interface MatchBet {
    user_id: string
    match_id: string
    game_start: string
    away_score: string | null
    away_team: string
    home_score: string | null
    away_result: string | null
    home_result: string | null
    home_team: string
    round: string
}

export interface MatchBetMedScore {
    user_id: string
    match_id: string
    game_start: string
    away_score: number | null
    away_team: string
    home_score: number | null
    away_result: string | null
    home_result: string | null
    home_team: string
    round: string
    poeng: number
    riktigUtfall: boolean
    riktigResultat: boolean
    matchpoeng: MatchPoeng
}

export interface AllBets {
    users: OtherUser[]
    bets: MatchBet[]
}
export interface AllBetsExtended {
    users: OtherUser[]
    bets: MatchBetMedScore[]
}

export function UseAllBets() {
    const [user] = useAuthState(firebase.auth())

    return useQuery<AllBetsExtended, Error>('all-bets', async () => {
        const idtoken = await user?.getIdToken()
        const responsePromise = await fetch('https://betpool-2022-backend.vercel.app/api/v1/bets', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        let allBets = (await responsePromise.json()) as AllBets
        let scoreForKamp = regnUtScoreForKamp(allBets.bets)
        const betsMedScore = allBets.bets.map((b): MatchBetMedScore => {
            if (b.home_score == null || b.away_score == null) {
                return {
                    ...b,
                    away_score: stringTilNumber(b.away_score),
                    home_score: stringTilNumber(b.home_score),
                    poeng: 0,
                    riktigResultat: false,
                    riktigUtfall: false,
                    matchpoeng: scoreForKamp.get(b.match_id)!,
                }
            } else {
                const utfall = finnUtfall(b.home_score, b.away_score)
                const riktigResultat = b.home_result == b.home_score && b.away_result == b.away_score
                let poeng = 0
                let riktigUtfall = utfall == scoreForKamp.get(b.match_id)!.utfall
                if (riktigUtfall) {
                    poeng = poeng + scoreForKamp.get(b.match_id)!.riktigUtfall
                }
                if (riktigResultat) {
                    poeng = poeng + scoreForKamp.get(b.match_id)!.riktigResultat
                }
                return {
                    ...b,
                    away_score: stringTilNumber(b.away_score),
                    home_score: stringTilNumber(b.home_score),
                    poeng: poeng,
                    riktigResultat: riktigResultat,
                    riktigUtfall: riktigUtfall,
                    matchpoeng: scoreForKamp.get(b.match_id)!,
                }
            }
        })
        return {
            users: allBets.users,
            bets: betsMedScore,
        }
    })
}
