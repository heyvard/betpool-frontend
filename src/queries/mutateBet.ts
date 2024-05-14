import { useMutation, useQueryClient } from 'react-query'

import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'

export function UseMutateBet(
    id: string,
    homeScore: number | null,
    awayScore: number | null,
    successCallback: () => void,
) {
    const queryClient = useQueryClient()
    const [user] = useAuthState(getFirebaseAuth())

    return useMutation<unknown, Error>(
        async () => {
            const idtoken = await user?.getIdToken()
            const responsePromise = await fetch(`https://betpool-2022-backend.vercel.app/api/v1/me/bets/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ home_score: homeScore, away_score: awayScore }),
                headers: { Authorization: `Bearer ${idtoken}` },
            })
            return responsePromise.json()
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('my-bets').then()
                successCallback()
            },
        },
    )
}
