import { useMutation, useQueryClient } from 'react-query'

import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'

export function UseMutateChat(message: string, successCallback: () => void) {
    const queryClient = useQueryClient()
    const [user] = useAuthState(firebase.auth())

    return useMutation<unknown, Error>(
        async () => {
            const idtoken = await user?.getIdToken()
            const responsePromise = await fetch(`https://betpool-2022-backend.vercel.app/api/v1/chat`, {
                method: 'POST',
                body: JSON.stringify({ message }),
                headers: { Authorization: `Bearer ${idtoken}` },
            })
            return responsePromise.json()
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('chat').then()
                successCallback()
            },
        },
    )
}
