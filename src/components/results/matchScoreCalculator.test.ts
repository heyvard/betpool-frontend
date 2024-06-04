import { regnUtScoreForKamp } from './matchScoreCalculator'
import { expect } from '@jest/globals'

describe('Tester match score calculator', () => {
    it('Tom input', () => {
        const res = regnUtScoreForKamp([])
        expect(res.size).toEqual(0)
    })
})
