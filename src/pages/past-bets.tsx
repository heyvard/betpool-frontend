import type { NextPage } from 'next'

import { UseMyBets } from '../queries/useBets'
import { Container } from '@mui/system'
import { BetView } from '../components/bet/BetView'
import { Spinner } from '../components/loading/Spinner'
import dayjs from 'dayjs'

const Home: NextPage = () => {
    const { data: myBets } = UseMyBets()
    if (!myBets) {
        return <Spinner />
    }
    return (
        <>
            <Container maxWidth="md" sx={{ mt: 2 }}>
                {myBets
                    .filter((b) => dayjs(b.game_start).isBefore(dayjs()))
                    .sort((b, a) => dayjs(a.game_start).unix() - dayjs(b.game_start).unix())
                    .map((a) => (
                        <BetView key={a.bet_id} bet={a} />
                    ))}
            </Container>
        </>
    )
}

export default Home
