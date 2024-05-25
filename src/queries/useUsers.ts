import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'
import { UserForAdmin } from '../types/types'

export function UseUsers() {
    const [user] = useAuthState(getFirebaseAuth())

    return useQuery<UserForAdmin[], Error>('users', async () => {
        const idtoken = await user?.getIdToken()
        const responsePromise = await fetch('https://betpool-2022-backend.vercel.app/api/v1/users', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        return await responsePromise.json()
    })
}
