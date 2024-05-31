import { Bet } from '../../types/types'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { UseMutateBet } from '../../queries/mutateBet'
import { hentFlag, hentNorsk } from '../../utils/lag'
import NextLink from 'next/link'
import { rundeTilTekst } from '../../utils/rundeTilTekst'
import { BodyShort, Button, Link, TextField } from '@navikt/ds-react'
import { FloppydiskIcon } from '@navikt/aksel-icons'

export const BetView = ({ bet, matchside }: { bet: Bet; matchside: boolean }) => {
    const numberPropTilString = (prop: number | null) => {
        if (prop == null) {
            return ''
        }
        return `${prop}`
    }

    let hjemmescoreProp = numberPropTilString(bet.home_score)
    const [hjemmescore, setHjemmescore] = useState<string>(hjemmescoreProp)
    let bortescoreProp = numberPropTilString(bet.away_score)
    const [bortescore, setBortescore] = useState<string>(bortescoreProp)
    const [nyligLagret, setNyliglagret] = useState(false)
    const kampstart = dayjs(bet.game_start)

    const lagreCb = () => {
        setNyliglagret(true)
        setTimeout(() => {
            setNyliglagret(false)
        }, 2000)
    }

    const stringTilNumber = (prop: string): number | null => {
        if (prop == '') {
            return null
        }
        return Number(prop!)
    }

    const { mutate, isPending } = UseMutateBet(
        bet.bet_id,
        stringTilNumber(hjemmescore),
        stringTilNumber(bortescore),
        lagreCb,
    )

    const disabled = kampstart.isBefore(dayjs())
    const lagreknappSynlig = (hjemmescore !== hjemmescoreProp || bortescore !== bortescoreProp) && !nyligLagret
    const selectAllFocus = (e: any) => {
        e.target.select()
    }
    return (
        <div className={'my-2 p-4 shadow rounded-xl bg-white'}>
            <BodyShort className={'italic'}>
                {rundeTilTekst(bet.round) + ' ' + kampstart.format('dddd D MMM  HH:mm')}
            </BodyShort>
            <div className={'flex items-end mb-1'}>
                <BodyShort className={'w-36 font-bold text-xl'}>{fixLand(bet.home_team)}</BodyShort>
                <TextField
                    className={'w-12'}
                    type="text"
                    disabled={disabled}
                    error={lagreknappSynlig}
                    label={bet.home_team}
                    hideLabel={true}
                    inputMode={'numeric'}
                    size={'small'}
                    value={hjemmescore}
                    onFocus={selectAllFocus}
                    onChange={(e) => {
                        if (!e.currentTarget.value) {
                            setHjemmescore('')
                            return
                        }
                        const number = Number(e.currentTarget.value)
                        if (number >= 0 && number <= 99) {
                            setHjemmescore(String(number))
                        }
                    }}
                />
            </div>
            <div className={'flex items-end'}>
                <BodyShort className={'w-36 font-bold text-xl'}> {fixLand(bet.away_team)}</BodyShort>

                <TextField
                    className={'w-12'}
                    type={'number'}
                    disabled={disabled}
                    error={lagreknappSynlig}
                    value={bortescore}
                    size={'small'}
                    inputMode={'numeric'}
                    label={bet.away_team}
                    hideLabel={true}
                    onFocus={selectAllFocus}
                    onChange={(e) => {
                        if (!e.currentTarget.value) {
                            setBortescore('')
                            return
                        }
                        const number = Number(e.currentTarget.value)
                        if (number >= 0 && number <= 99) {
                            setBortescore(String(number))
                        }
                    }}
                />
            </div>
            {lagreknappSynlig && (
                <Button
                    size={'small'}
                    className={'mt-2'}
                    onClick={() => {
                        mutate()
                    }}
                    loading={isPending}
                    icon={<FloppydiskIcon />}
                >
                    Lagre
                </Button>
            )}
            {disabled && !matchside && (
                <NextLink href={'/match/' + bet.match_id}>
                    <Link>Se alles bets på denne kampen</Link>
                </NextLink>
            )}
        </div>
    )
}

export function fixLand(s: string): string {
    return hentFlag(s) + ' ' + hentNorsk(s)
}
