import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'

export function UseUser() {
    const [user] = useAuthState(firebase.auth())
    if (!user) {
        throw Error('Skal ikke kalles før man er innlogget')
    }
    return useQuery<any, Error>('user', async () => {
        const idtoken = await user.getIdToken()
        return fetch('/api/v1/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
    })
}
