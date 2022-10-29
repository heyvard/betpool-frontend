import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import { Bet } from '../../types/types'
import dayjs from 'dayjs'

export const BetView = ({ bet }: { bet: Bet }) => {
    // const [hjemmescore, setHjemmescore] = useState<number | undefined>(bet.home_score)
    // const [bortescore, setBortescore] = useState<number | undefined>(bet.home_score)

    const kampstart = dayjs(bet.game_start)

    function fixLand(s: string): string {
        const split = s.split(' ')
        if (split.length == 2) {
            return split[1] + ' ' + split[0]
        }
        return s
    }

    let disabled = kampstart.isBefore(dayjs())
    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {kampstart.toString()}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={100}> {fixLand(bet.home_team)}</Typography>
                    <TextField
                        disabled={disabled}
                        variant="standard"
                        sx={{
                            width: { sm: 50, md: 50 },
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={100}> {fixLand(bet.away_team)}</Typography>

                    <TextField
                        disabled={disabled}
                        variant="standard"
                        sx={{
                            width: { sm: 50, md: 50 },
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}
