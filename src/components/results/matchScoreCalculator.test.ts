import { regnUtScoreForKamp } from './matchScoreCalculator'
import { expect } from '@jest/globals'
import { skapMatchBetArray } from './testdatahelper'

describe('Tester match score calculator', () => {
    it('Tom input', () => {
        const res = regnUtScoreForKamp([])
        expect(res.size).toEqual(0)
    })

    it('Gruppespill kamp 10 spillere 1 helt rett', () => {
        const res = regnUtScoreForKamp(
            skapMatchBetArray({
                runde: '1',
                antallHeltRiktig: 1,
                antallRiktigUtfall: 0,
                antallFeil: 8,
            }),
        )
        expect(res.size).toEqual(1)
        expect(res.get('match_id_1')).toEqual({
            antallRiktigeSvar: 1,
            antallRiktigeUtfall: 1,
            matchid: 'match_id_1',
            riktigResultat: 5,
            riktigUtfall: 1,
            utfall: 'B',
        })
    })

    it('Finale kamp 10 spillere 1 helt rett', () => {
        const res = regnUtScoreForKamp(
            skapMatchBetArray({
                runde: '7',
                antallHeltRiktig: 1,
                antallRiktigUtfall: 0,
                antallFeil: 8,
            }),
        )
        expect(res.size).toEqual(1)
        expect(res.get('match_id_1')).toEqual({
            antallRiktigeSvar: 1,
            antallRiktigeUtfall: 1,
            matchid: 'match_id_1',
            riktigResultat: 15,
            riktigUtfall: 6,
            utfall: 'B',
        })
    })
})
