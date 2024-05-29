import type { NextPage } from 'next'

import { UseMyBets } from '../queries/useMyBets'
import { BetView } from '../components/bet/BetView'
import { Spinner } from '../components/loading/Spinner'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import React from 'react'
import { UseUser } from '../queries/useUser'
import { Link } from '@navikt/ds-react'

const Home: NextPage = () => {
    const { data: myBets } = UseMyBets()
    const { data: megselv } = UseUser()

    if (!myBets || !megselv) {
        return <Spinner />
    }

    return (
        <>
            <NextLink href={'/user/' + megselv.id}>
                <Link>Mine tidligere bets</Link>
            </NextLink>

            {myBets
                .filter((b) => dayjs(b.game_start).isAfter(dayjs()))
                .map((a) => (
                    <BetView key={a.bet_id} bet={a} matchside={false} />
                ))}
        </>
    )
}

export default Home
