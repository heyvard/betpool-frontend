import type { NextPage } from 'next'
import Head from 'next/head'

import { Typography, Container } from '@mui/material'
import { UseStats } from '../queries/useStats'
import { Spinner } from '../components/loading/Spinner'
import React from 'react'

const Home: NextPage = () => {
    const { data: stats } = UseStats()
    if (!stats) {
        return <Spinner></Spinner>
    }
    return (
        <>
            <Head>
                <title>Regler</title>
            </Head>
            <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
                <Typography variant="h4" component="h2">
                    Regler!
                </Typography>
                <h3>Innskudd</h3>
                Det koster 300 kr å delta.
                <br />
                Pengene må være overført innen første kamp på vipps til 467 90 000 . Riktig donasjon til Amnesty vippses
                videre.
                <h3>Premier</h3>
                Potten er på: {stats.pot} kr.
                <br />
                1. plass får 45% av potten: {stats.premier[0]} kr
                <br />
                2. plass får 25% av potten: {stats.premier[1]} kr
                <br />
                3. plass får 15% av potten: {stats.premier[2]} kr
                <br />
                4. plass får 10% av potten: {stats.premier[3]} kr
                <br />
                5. plass får 5% av potten: {stats.premier[4]} kr
                <br />
                <br />
                Hvis flere personer får like mange poeng så deles premiepottene for de aktuelle plassene.
                <br />
                <br />
                <i>Eksempel:</i>
                <br />
                To personer kommer på delt 2. plass.
                <br />
                Premien for 2. plass er 200 kr og 3. plass er 100 kr.
                <br />
                Begge får da 150 kr.
                <br />
                <br />
                <h3>Poengsystem</h3>
                Man får 1 poeng ganget med kampverdien for å gjette riktig utfall av kampen (hvem som vinner eller
                uavgjort).
                <br />
                <br />
                Treffer man riktig resultat får man 2-5 poeng avhengig av hvor mange andre som hadde riktig resultat.
                Dette ganges med kampverdien.
                <h2>Tidsfrister</h2>
                Du kan bette helt frem til kampstart. Bets sendt inn etter kampstart blir ikke lagret.
                <h3>Kampverdier</h3>
                <b>Gruppespill</b>
                <br />
                Kampverdien er 1 i runde 1 og 2. I runde 3 er kampverdien 3.
                <br />
                <br />
                <b>Sluttspill</b>
                <br />
                I sluttspillet tipper man på stillingen etter ordinær spilletid (90 min)
                <br />
                Kampverdier
                <ul>
                    <li>Åttenedelsfinaler: 4</li>
                    <li>Kvartfinaler: 5</li>
                    <li>Semifinaler: 7</li>
                    <li>Bronsefinale: 7</li>
                    <li>Finale: 10</li>
                </ul>
                Kampverdien økes til 2, I finalen er den 3<br />
                <br />
            </Container>
        </>
    )
}

export default Home
