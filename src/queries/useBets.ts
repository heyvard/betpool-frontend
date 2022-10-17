import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { Bet } from '../types/types'

export function UseMyBets() {
    const [user] = useAuthState(firebase.auth())

    return useQuery<Bet[], Error>('my-bets', async () => {
        const idtoken = await user?.getIdToken()
        let responsePromise = await fetch('/api/v1/me/bets', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        return responsePromise.json()
    })
}
