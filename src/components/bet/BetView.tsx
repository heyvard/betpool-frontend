import { Card, CardContent } from '@mui/material'
import { Bet } from '../../types/types'

export const BetView = ({ bet }: { bet: Bet }) => {
    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {bet.home_team} - {bet.away_team}
            </CardContent>
        </Card>
    )
}
