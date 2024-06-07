import type { NextPage } from 'next'

import { Spinner } from '../../components/loading/Spinner'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { UseAllBets } from '../../queries/useAllBetsExtended'
import React from 'react'
import { PastBetView } from '../../components/bet/PastBetView'
import { fixLand } from '../../components/bet/BetView'
import NextLink from 'next/link'
import { Alert, Heading, Link } from '@navikt/ds-react'
import { BpCard } from '../../components/Card'

const Home: NextPage = () => {
    const { data, isLoading } = UseAllBets()

    const router = useRouter()
    const { id } = router.query
    if (!data || isLoading) {
        return <Spinner />
    }
    const user = data.users.find((a) => a.id == id)!

    return (
        <>
            <Heading level={'1'} size={'small'} align={'center'} spacing>
                {user.name} sine resultater
            </Heading>
            {user.winner && (
                <BpCard>
                    <NextLink href={'/winnerbets'}>
                        <Link>
                            Vinner: {fixLand(user.winner || '')} ({user.winnerPoints} poeng)
                        </Link>
                    </NextLink>
                    <br />
                    <NextLink href={'/toppscorer'}>
                        <Link>
                            Toppscorer: {user.topscorer} ({user.topscorerPoints} poeng)
                        </Link>
                    </NextLink>
                </BpCard>
            )}

            {data.bets.length == 0 && <Alert variant={'info'}>Ingen resultater</Alert>}
            {data.bets
                .filter((a) => a.user_id == id)
                .sort((b, a) => dayjs(a.game_start).unix() - dayjs(b.game_start).unix())
                .map((a) => ({
                    ...a,
                    bet_id: a.match_id + a.user_id,
                    user: data.users.find((u) => u.id == a.user_id)!,
                }))
                .map((a) => (
                    <PastBetView key={a.bet_id} bet={a} matchside={false} />
                ))}
        </>
    )
}

export default Home
