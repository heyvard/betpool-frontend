import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { UserCharity } from '../types/types'

export function UseStats() {
    const [user] = useAuthState(firebase.auth())

    return useQuery<UserCharity[], Error>('stats', async () => {
        const idtoken = await user?.getIdToken()
        let responsePromise = await fetch('https://betpool-2022-backend.vercel.app/api/v1/stats', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        return responsePromise.json()
    })
}
