import type { NextPage } from 'next'

import { Spinner } from '../components/loading/Spinner'
import dayjs from 'dayjs'
import { UseMatches } from '../queries/useMatches'
import React from 'react'
import { SluttspillView } from '../components/resultatservice/SluttspillView'
import { Heading } from '@navikt/ds-react'

const Home: NextPage = () => {
    const { data: matches } = UseMatches()
    if (!matches) {
        return <Spinner />
    }
    matches.sort((b, a) => dayjs(b.game_start).unix() - dayjs(a.game_start).unix())

    return (
        <>
            <Heading size={'medium'} align={'center'}>
                Rediger sluttspill
            </Heading>
            {matches
                .filter((b) => dayjs(b.game_start).isAfter(dayjs()))
                .filter((b) => Number(b.round) > 3)
                .map((a) => (
                    <SluttspillView key={a.id} match={a} />
                ))}
        </>
    )
}

export default Home
