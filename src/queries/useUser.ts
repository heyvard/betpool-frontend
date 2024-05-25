import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'
import { useQuery } from '@tanstack/react-query'

export function UseUser() {
    const [user] = useAuthState(getFirebaseAuth())

    return useQuery({
        queryKey: ['user-me'],

        queryFn: async () => {
            const idtoken = await user?.getIdToken()
            let responsePromise = await fetch('https://betpool-2022-backend.vercel.app/api/v1/me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${idtoken}` },
            })
            return responsePromise.json()
        },
    })
}
