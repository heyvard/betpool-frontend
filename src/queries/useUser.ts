import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'
import { useQuery } from '@tanstack/react-query'
import { User } from '../types/user'

export function UseUser() {
    const [user] = useAuthState(getFirebaseAuth())

    return useQuery<User>({
        queryKey: ['user-me'],
        enabled: !!user,
        queryFn: async () => {
            const idtoken = await user?.getIdToken()
            if (!idtoken) {
                throw new Error('No idtoken')
            }
            let responsePromise = await fetch('/api/v1/me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${idtoken}` },
            })
            return responsePromise.json()
        },
    })
}
