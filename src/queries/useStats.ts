import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'

type Stats = {
    pot: number
    deltakere: number
    premier: number[]
}

export function UseStats() {
    const [user] = useAuthState(getFirebaseAuth())

    return useQuery<Stats, Error>('stats', async () => {
        const idtoken = await user?.getIdToken()
        let responsePromise = await fetch('https://betpool-2022-backend.vercel.app/api/v1/stats', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        let stats = (await responsePromise.json()) as object[]

        const pot = stats.length * 300
        const deltakere = stats.length
        return {
            pot,
            deltakere,
            premier: [Math.round(pot * 0.5), Math.round(pot * 0.3), Math.round(pot * 0.2)],
        }
    })
}
