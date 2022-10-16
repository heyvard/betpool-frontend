import firebase from 'firebase/app'
import { UseUser } from '../queries/useUser'

export const UserContext = (props: { children: React.ReactNode; user: firebase.User }) => {
    console.log('Usercontext ')

    const { data, isLoading } = UseUser()

    if (data) {
        console.log('Henta data ' + data)
    }

    return <>{props.children}</>
}
