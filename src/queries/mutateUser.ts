import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'
import { useMutation, useQueryClient } from '@tanstack/react-query'


interface MuteteUserReq {
    id: string,
    request: {
        paid?: boolean,
        admin?: boolean,
        active?: boolean,
    }
}

export function UseMutateUser() {
    const queryClient = useQueryClient()
    const [user] = useAuthState(getFirebaseAuth())

    return useMutation<any, unknown, MuteteUserReq>({
        mutationFn: async (req) => {
            const idtoken = await user?.getIdToken()
            const responsePromise = await fetch(`https://betpool-2022-backend.vercel.app/api/v1/users/${req.id}`, {
                method: 'PUT',
                body: JSON.stringify(req.request),
                headers: { Authorization: `Bearer ${idtoken}` },
            })
            return responsePromise.json()
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] }).then()
            queryClient.invalidateQueries({ queryKey: ['all-bets'] }).then()

        },
    })
}
