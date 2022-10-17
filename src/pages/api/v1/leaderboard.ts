import { getKnex } from '../../../knex'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAllBets } from '../../../bets/getAllBets'
import { matchResultScores } from '../../../bets/matchResultScores'
import { scoreCalculator } from '../../../bets/scoreCalculator'

async function getEmptyBoard() {
    return (
        await getKnex().raw(`
    SELECT u.id userid, u.name, 0.0 score
    FROM users u`)
    ).rows
}

function compare(a: any, b: any) {
    if (a.score < b.score) {
        return 1
    }
    if (a.score > b.score) {
        return -1
    }
    // a must be equal to b
    return a.name.localeCompare(b.name)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const allBets = await getAllBets()
    if (allBets.length === 0) {
        const emptyBoard = await getEmptyBoard()
        res.status(200).json(emptyBoard)

        return
    }

    const matchScoreMap = matchResultScores(allBets)

    const personMap = {}

    // @ts-ignore
    allBets.forEach((bet) => (personMap[bet.userid] = []))

    // @ts-ignore
    allBets.forEach((bet) => personMap[bet.userid].push(bet))

    const processedPersons = [] as any[]

    Object.keys(personMap).forEach(function (key) {
        // @ts-ignore
        const calculated = scoreCalculator(personMap[key], matchScoreMap)
        processedPersons.push(calculated)
        // key: the name of the object key
        // index: the ordinal position of the key within the object
    })

    const personsFlat = processedPersons.map(function (bets) {
        const person = { name: bets[0].name, userid: bets[0].userid, score: 0.0 }
        bets.forEach(function (bet: any) {
            person.score += bet.score
        })
        return person
    })

    personsFlat.sort(compare)

    res.status(200).json(personsFlat)
}
