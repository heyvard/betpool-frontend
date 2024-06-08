import type { NextPage } from 'next'

import { UseStats } from '../queries/useStats'
import { Spinner } from '../components/loading/Spinner'
import React from 'react'
import { BodyLong, List, BodyShort, Heading } from '@navikt/ds-react'

const Regler: NextPage = () => {
    const { data: stats } = UseStats()
    if (!stats) {
        return <Spinner></Spinner>
    }
    return (
        <div className={'bg-white p-4 rounded-xl mb-8'}>
            <Heading size="small" level={'1'}>
                Innskudd
            </Heading>
            <BodyShort>Det koster 300 kr å delta.</BodyShort>
            <BodyShort spacing>Pengene må være vippset innen start på første kamp til 918 65 052.</BodyShort>
            <Heading size="small" level={'1'}>
                Premier
            </Heading>
            <BodyShort spacing>Potten er på: {stats.pot} kr.</BodyShort>
            <BodyShort spacing>
                1. plass får 50% av potten: {stats.premier[0]} kr
                <br />
                2. plass får 30% av potten: {stats.premier[1]} kr
                <br />
                3. plass får 20% av potten: {stats.premier[2]} kr
            </BodyShort>
            <BodyShort spacing>
                Hvis flere personer får like mange poeng så deles premiepottene for de aktuelle plassene.
            </BodyShort>

            <BodyShort spacing>
                <span className={'italic'}>Eksempel:</span>
                <br />
                To personer kommer på delt 2. plass.
                <br />
                Premien for 2. plass er 200 kr og 3. plass er 100 kr.
                <br />
                Begge får da 150 kr.
            </BodyShort>

            <Heading size="small" level={'1'}>
                Poengsystem
            </Heading>
            <BodyShort spacing>
                Man får 1 poeng ganget med kampverdien for å gjette riktig utfall av kampen (hvem som vinner eller
                uavgjort). Dette ganges med kampverdien. Denne verdien dobles dersom antallet spillere som har riktig
                utfall er under 20%.
            </BodyShort>
            <BodyShort spacing>
                Treffer man riktig resultat får man 1-3 poeng avhengig av hvor mange andre som hadde riktig resultat.
                Hvis under 15% har riktig resultat får man 3 poeng. Under 30% så får man to poeng, ellers 1 poseng.
                Dette ganges med kampverdien.
            </BodyShort>
            <Heading size="small" level={'1'}>
                Tidsfrister
            </Heading>
            <BodyShort spacing>
                Du kan bette helt frem til kampstart. Bets sendt inn etter kampstart blir ikke lagret.
            </BodyShort>

            <Heading size="small" level={'2'}>
                Poeng i gruppespillet
            </Heading>
            <BodyShort spacing>Kampverdien er 1 i gruppespillet.</BodyShort>

            <Heading size="small" level={'2'}>
                Poeng i sluttspillet
            </Heading>
            <BodyShort spacing>
                I sluttspillet tipper man på stillingen etter ordinær spilletid (90 min + overtid)
            </BodyShort>

            <List className={'mb-4'} as="ul" size="small" title={'Kampverdier'}>
                <List.Item>Åttendedelsfinaler: 2</List.Item>
                <List.Item>Kvartfinaler: 2</List.Item>
                <List.Item>Semifinaler: 3</List.Item>
                <List.Item>Finale: 4</List.Item>
            </List>

            <Heading size="small" level={'1'}>
                Vinner
            </Heading>
            <BodyLong spacing>
                Du kan endre bet hele første runde av gruppespillet, deretter er det låst. Det deles ut totalt{' '}
                {stats.deltakere * 3} poeng. Disse splittes på alle som har riktig svar, men begrenset til maks 15 poeng
                per spiller. Summen er antall deltagere ganger 3.
            </BodyLong>
            <Heading size="small" level={'1'}>
                Toppscorer
            </Heading>
            <BodyLong spacing>
                Du kan endre bet hele første runde av gruppespillet, deretter er det låst. Det deles ut totalt{' '}
                {stats.deltakere * 3} poeng. Disse splittes på alle som har riktig svar, men begrenset til maks 15 poeng
                per spiller. Summen er antall deltagere ganger 3.
            </BodyLong>
        </div>
    )
}

export default Regler
