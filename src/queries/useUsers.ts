import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'
import { useQuery } from '@tanstack/react-query'
import { UserForAdmin } from '../types/types'

export function UseUsers() {
    const [user] = useAuthState(getFirebaseAuth())

    return useQuery<UserForAdmin[]>({
        queryKey: ['users'],

        queryFn: async () => {
            const idtoken = await user?.getIdToken()
            const responsePromise = await fetch('/api/v1/users', {
                method: 'GET',
                headers: { Authorization: `Bearer ${idtoken}` },
            })
            return await responsePromise.json()
        },
    })
}
