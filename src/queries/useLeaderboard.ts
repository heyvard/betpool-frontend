import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { LeaderboardLinje } from '../domain/leaderboard'

export function UseLeaderboard() {
    const [user] = useAuthState(firebase.auth())

    return useQuery<LeaderboardLinje[], Error>('leaderboard', async () => {
        const idtoken = await user?.getIdToken()
        let responsePromise = await fetch('/api/v1/leaderboard', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        return responsePromise.json()
    })
}
