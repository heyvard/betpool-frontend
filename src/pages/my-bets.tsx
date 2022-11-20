import type { NextPage } from 'next'

import { UseMyBets } from '../queries/useMyBets'
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
                    .filter((b) => dayjs(b.game_start).isAfter(dayjs()))
                    .map((a) => (
                        <BetView key={a.bet_id} bet={a} matchside={false} />
                    ))}
            </Container>
        </>
    )
}

export default Home
