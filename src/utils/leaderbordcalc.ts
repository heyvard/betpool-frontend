import { AllBets } from '../queries/useAllBets'

interface Plassering {
    userid: string
    name: string
    picture: string | null
    score: number
}

export function hentLeaderboard(allBets: AllBets): Plassering[] {
    if (allBets.bets.length == 0) {
        return allBets.users.map((u) => ({
            userid: u.id,
            name: u.name,
            picture: u.picture,
            score: 0,
        }))
    }
    return []
}
