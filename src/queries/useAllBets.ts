import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'

export interface OtherUser {
    id: string
    name: string
    picture: string | null
}

export interface MatchBet {
    user_id: string
    match_id: string
    game_start: string
}
export interface AllBets {
    users: OtherUser[]
    bets: MatchBet[]
}

export function UseAllBets() {
    const [user] = useAuthState(firebase.auth())

    return useQuery<AllBets, Error>('all-bets', async () => {
        const idtoken = await user?.getIdToken()
        const responsePromise = await fetch('https://betpool-2022-backend.vercel.app/api/v1/bets', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        return responsePromise.json()
    })
}
