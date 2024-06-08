import type { NextPage } from 'next'

import { fixLand } from '../../components/bet/BetView'
import { Spinner } from '../../components/loading/Spinner'
import { useRouter } from 'next/router'
import { UseAllBets } from '../../queries/useAllBets'
import React from 'react'
import { PastBetView } from '../../components/bet/PastBetView'
import { rundeTilTekst } from '../../utils/rundeTilTekst'
import { BodyShort, Heading } from '@navikt/ds-react'

const Home: NextPage = () => {
    const { data, isLoading } = UseAllBets()

    const router = useRouter()
    const { id } = router.query
    if (!data || isLoading) {
        return <Spinner />
    }

    const match = data.bets.find((a) => a.match_id == id)!

    return (
        <>
            <Heading level={'1'} size={'large'} align={'center'}>
                {fixLand(match.home_team)} vs {fixLand(match.away_team)}
            </Heading>
            <BodyShort align={'center'}>{rundeTilTekst(match.round)}</BodyShort>{' '}
            <BodyShort align={'center'}>
                {match.home_result} - {match.away_result}
            </BodyShort>
            <div className={'mb-4'}>
                <BodyShort>{match.matchpoeng.antallRiktigeSvar + ' hadde helt rett'} </BodyShort>
                <BodyShort>{match.matchpoeng.antallRiktigeUtfall + ' hadde riktig utfall'} </BodyShort>
                <BodyShort>{match.matchpoeng.riktigResultat + ' poeng for riktig resultat'} </BodyShort>
                <BodyShort>{match.matchpoeng.riktigUtfall + ' poeng for riktig utfall'} </BodyShort>
            </div>
            {data.bets
                .filter((a) => a.match_id == id)
                .map((a) => ({
                    ...a,
                    bet_id: a.match_id + a.user_id,
                    user: data.users.find((u) => u.id == a.user_id)!,
                }))
                .filter((a) => a.user)
                .sort((b, a) => b.user.name.localeCompare(a.user.name))
                .sort((b, a) => a.poeng - b.poeng)
                .map((a) => (
                    <PastBetView key={a.bet_id} bet={a} matchside={true} navn={a.user.name} />
                ))}
        </>
    )
}

export default Home
