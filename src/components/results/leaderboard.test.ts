import { expect } from '@jest/globals'
import { calculateLeaderboard } from './calculateAllScores'
import { vm22testdata } from './vm22testdata'
import { calculateAllBetsExtended } from './calculateAllBetsExtended'

describe('Tester leaderboard beregning på 2022 data', () => {
    it('skal være riktig ', () => {
        const allBets = calculateAllBetsExtended(vm22testdata)
        const res = calculateLeaderboard(allBets.bets, allBets.users)
        expect(res.length).toEqual(13)
        expect(res).toEqual([
            {
                poeng: 87,
                userName: 'AÅ',
                userid: '6d0e825f-798d-4587-9125-0b4fca2f8d0f',
            },
            {
                poeng: 80,
                userName: 'HK',
                userid: 'b9c7be8a-f4e9-41a4-b33b-aa9f5a5ba72f',
            },
            {
                poeng: 69,
                userName: 'RDK',
                userid: '944a114f-f68d-4b33-bab3-be106a7c3617',
            },
            {
                poeng: 68,
                userName: 'SA',
                userid: '41896186-17d9-484e-a960-af691ae5eb81',
            },
            {
                poeng: 62,
                userName: 'JM',
                userid: '2c717f6a-4241-4d71-aef1-1aed94f4c6a7',
            },
            {
                poeng: 61,
                userName: 'BH',
                userid: '0e8223eb-81f5-412e-8f8b-2b66af508fbf',
            },
            {
                poeng: 58,
                userName: 'HA',
                userid: 'ff2e0098-8de5-4835-bc0e-1e3369bee618',
            },
            {
                poeng: 56,
                userName: 'HD',
                userid: '5f6b537e-7ae5-4c15-b148-972ebc2f5df0',
            },
            {
                poeng: 52,
                userName: 'PB',
                userid: 'bdedf830-eb24-4a73-b810-8d5d79f10bdf',
            },
            {
                poeng: 48,
                userName: 'TSB',
                userid: '8a604853-66ed-4cee-96c8-e16e81e06d19',
            },
            {
                poeng: 48,
                userName: 'FS',
                userid: '8e087c26-ede0-4141-a5a0-9640a6eec7a3',
            },
            {
                poeng: 43,
                userName: 'SØ',
                userid: 'a41b1d2d-2612-4f8a-ab56-f34752c7d3b8',
            },
            {
                poeng: 10,
                userName: 'NJ',
                userid: '1a89f92c-3457-4c78-afed-aa5e3e055260',
            },
        ])
    })
})
