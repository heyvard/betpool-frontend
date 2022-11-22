import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import { default as MUILink } from '@mui/material/Link/Link'
import { MatchBetMedScore } from '../../queries/useAllBetsExtended'
import { fixLand } from './BetView'

export const PastBetView = ({ bet, matchside }: { bet: MatchBetMedScore; matchside: boolean }) => {
    const kampstart = dayjs(bet.game_start)

    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {kampstart.format('ddd, D MMM  HH:mm')}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={140}> {fixLand(bet.home_team)}</Typography>
                    <TextField
                        type="text"
                        variant="standard"
                        inputProps={{
                            inputmode: 'numeric',
                            pattern: '[0-9]*',
                        }}
                        InputProps={{
                            sx: {
                                '& input': {
                                    textAlign: 'center',
                                },
                            },
                        }}
                        sx={{ width: 40 }}
                        value={bet.home_score}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={140}> {fixLand(bet.away_team)}</Typography>

                    <TextField
                        type={'text'}
                        variant="standard"
                        inputProps={{
                            inputmode: 'numeric',
                            pattern: '[0-9]*',
                        }}
                        InputProps={{
                            sx: {
                                '& input': {
                                    textAlign: 'center',
                                },
                            },
                        }}
                        sx={{ width: 40 }}
                        value={bet.away_score}
                    />
                </Box>
                <Typography sx={{ mt: 1 }}>{bet.poeng} poeng</Typography>
                {!matchside && (
                    <Link href={'/match/' + bet.match_id}>
                        <MUILink underline={'hover'} sx={{ cursor: 'pointer' }}>
                            Se alles bets på denne kampen
                        </MUILink>
                    </Link>
                )}
            </CardContent>
        </Card>
    )
}