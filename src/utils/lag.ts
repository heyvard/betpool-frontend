interface Lag {
    engelsk: string
    norsk: string
    flagg: string
}

const alle: Lag[] = [
    { engelsk: 'Argentina', norsk: 'Argentina', flagg: '🇺🇸' },
    {
        engelsk: 'Australia',
        norsk: 'Australia',
        flagg: '🇺🇸',
    },
    { engelsk: 'Belgium', norsk: 'Belgium', flagg: '🇺🇸' },
    {
        engelsk: 'Brazil',
        norsk: 'Brazil',
        flagg: '🇺🇸',
    },
    { engelsk: 'Cameroon', norsk: 'Cameroon', flagg: '🇺🇸' },
    {
        engelsk: 'Canada',
        norsk: 'Canada',
        flagg: '🇺🇸',
    },
    { engelsk: 'Costa Rica', norsk: 'Costa Rica', flagg: '🇺🇸' },
    {
        engelsk: 'Croatia',
        norsk: 'Croatia',
        flagg: '🇺🇸',
    },
    { engelsk: 'Denmark', norsk: 'Denmark', flagg: '🇺🇸' },
    {
        engelsk: 'Ecuador',
        norsk: 'Ecuador',
        flagg: '🇺🇸',
    },
    { engelsk: 'England', norsk: 'England', flagg: '🇺🇸' },
    {
        engelsk: 'France',
        norsk: 'France',
        flagg: '🇺🇸',
    },
    { engelsk: 'Germany', norsk: 'Germany', flagg: '🇺🇸' },
    {
        engelsk: 'Ghana',
        norsk: 'Ghana',
        flagg: '🇺🇸',
    },
    { engelsk: 'Iran', norsk: 'Iran', flagg: '🇺🇸' },
    {
        engelsk: 'Japan',
        norsk: 'Japan',
        flagg: '🇺🇸',
    },
    { engelsk: 'Korea Republic', norsk: 'Korea Republic', flagg: '🇺🇸' },
    {
        engelsk: 'Mexico',
        norsk: 'Mexico',
        flagg: '🇺🇸',
    },
    { engelsk: 'Morocco', norsk: 'Morocco', flagg: '🇺🇸' },
    {
        engelsk: 'Netherlands',
        norsk: 'Netherlands',
        flagg: '🇺🇸',
    },
    { engelsk: 'Poland', norsk: 'Poland', flagg: '🇺🇸' },
    {
        engelsk: 'Portugal',
        norsk: 'Portugal',
        flagg: '🇺🇸',
    },
    { engelsk: 'Qatar', norsk: 'Qatar', flagg: '🇺🇸' },
    {
        engelsk: 'Saudi Arabia',
        norsk: 'Saudi Arabia',
        flagg: '🇺🇸',
    },
    { engelsk: 'Senegal', norsk: 'Senegal', flagg: '🇺🇸' },
    {
        engelsk: 'Serbia',
        norsk: 'Serbia',
        flagg: '🇺🇸',
    },
    { engelsk: 'Spain', norsk: 'Spain', flagg: '🇺🇸' },
    {
        engelsk: 'Switzerland',
        norsk: 'Switzerland',
        flagg: '🇺🇸',
    },
    { engelsk: 'Uruguay', norsk: 'Uruguay', flagg: '🇺🇸' },
    {
        engelsk: 'USA',
        norsk: 'USA',
        flagg: '🇺🇸',
    },
    { engelsk: 'Wales', norsk: 'Wales', flagg: '🇺🇸' },
]

const engelskMap = new Map<string, Lag>()
const norsk = new Map<string, Lag>()

alle.forEach((l) => {
    engelskMap.set(l.engelsk, l)
    norsk.set(l.norsk, l)
})

export function hentFlag(engelskLag: string) {
    return engelskMap.get(engelskLag)?.flagg || '🤔'
}
