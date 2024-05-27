import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'
import { useQuery } from '@tanstack/react-query'
import { Bet } from '../types/types'

export function UseMyBets() {
    const [user] = useAuthState(getFirebaseAuth())

    return useQuery<Bet[]>({
        queryKey: ['my-bets'],

        queryFn: async () => {
            const idtoken = await user?.getIdToken()
            const responsePromise = await fetch('/api/v1/me/bets', {
                method: 'GET',
                headers: { Authorization: `Bearer ${idtoken}` },
            })
            return responsePromise.json()
        },
    })
}
