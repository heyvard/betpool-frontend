import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirebaseAuth } from '../auth/clientApp'
import { Match } from '../types/types'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'

export function UseMatches() {
    const [user] = useAuthState(getFirebaseAuth())

    return useQuery({
        queryKey: ['matches'],

        queryFn: async () => {
            const idtoken = await user?.getIdToken()
            const responsePromise = await fetch('/api/v1/matches', {
                method: 'GET',
                headers: { Authorization: `Bearer ${idtoken}` },
            })
            let matchene: Match[] = await responsePromise.json()
            matchene.sort((a, b) => dayjs(b.game_start).unix() - dayjs(a.game_start).unix())
            return matchene
        },
    })
}
