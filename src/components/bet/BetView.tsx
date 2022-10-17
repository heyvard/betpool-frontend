import { Card, CardContent } from '@mui/material'
import { Bet } from '../../types/types'

export const BetView = ({ bet }: { bet: Bet }) => {
    return (
        <Card sx={{ m: '20px' }}>
            <CardContent>
                {bet.home_team} - {bet.away_team}
            </CardContent>
        </Card>
    )
}
