import { Match } from '../../types/types'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { alleLagSortert } from '../../utils/lag'
import { useAuthState } from 'react-firebase-hooks/auth'
import { rundeTilTekst } from '../../utils/rundeTilTekst'
import { getFirebaseAuth } from '../../auth/clientApp'
import { useQueryClient } from '@tanstack/react-query'
import { BpCard } from '../Card'
import { BodyShort, Select } from '@navikt/ds-react'
import nb from 'dayjs/locale/nb'

export const SluttspillView = ({ match }: { match: Match }) => {
    const kampstart = dayjs(match.game_start)

    const [lagrer, setLagrer] = useState(false)
    const [user] = useAuthState(getFirebaseAuth())
    const queryClient = useQueryClient()

    function endreHjemmelag(lag: 'home_team' | 'away_team') {
        function value() {
            if (
                alleLagSortert
                    .map((l) => {
                        return l.engelsk
                    })
                    .includes(match[lag])
            ) {
                return match[lag]
            } else {
                return 'To be announced'
            }
        }

        return (
            <Select
                disabled={lagrer}
                id={match.id + lag}
                label={lag === 'home_team' ? 'Hjemmelag' : 'Bortelag'}
                value={value()}
                onChange={async (e) => {
                    let team = e.target.value

                    try {
                        setLagrer(true)
                        const idtoken = await user?.getIdToken()
                        const value = {} as Record<string, string>
                        value[lag] = team
                        const responsePromise = await fetch(`/api/v1/matches/${match.id}`, {
                            method: 'PUT',
                            body: JSON.stringify(value),
                            headers: { Authorization: `Bearer ${idtoken}` },
                        })
                        if (!responsePromise.ok) {
                            window.alert('oops, feil ved lagring')
                        }
                        queryClient.invalidateQueries({ queryKey: ['matches'] }).then()
                    } finally {
                        setLagrer(false)
                    }
                }}
            >
                {alleLagSortert.map((l) => {
                    return (
                        <option key={l.engelsk} value={l.engelsk}>
                            {l.flagg + ' ' + l.norsk}
                        </option>
                    )
                })}
                <option value="To be announced">TBA</option>
            </Select>
        )
    }

    return (
        <BpCard>
            <BodyShort spacing>{rundeTilTekst(match.round)}</BodyShort>
            <BodyShort spacing className={'italic text-sm '}>
                {kampstart.locale(nb).format('dddd D MMM  HH:mm')}
            </BodyShort>

            {endreHjemmelag('home_team')}
            {endreHjemmelag('away_team')}
        </BpCard>
    )
}
