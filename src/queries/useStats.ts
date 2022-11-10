import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { UserCharity } from '../types/types'

type Stats = {
    charity: number
    pot: number
    premier: number[]
}

export function UseStats() {
    const [user] = useAuthState(firebase.auth())

    return useQuery<Stats, Error>('stats', async () => {
        const idtoken = await user?.getIdToken()
        let responsePromise = await fetch('https://betpool-2022-backend.vercel.app/api/v1/stats', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        let stats = (await responsePromise.json()) as UserCharity[]

        const charity = stats.map((a) => (a.charity / 100.0) * 300).reduce((partialSum, a) => partialSum + a, 0)
        const pot = stats.length * 300 - charity

        return {
            charity,
            pot,
            premier: [
                Math.round(pot * 0.45),
                Math.round(pot * 0.25),
                Math.round(pot * 0.15),
                Math.round(pot * 0.1),
                Math.round(pot * 0.05),
            ],
        }
    })
}
