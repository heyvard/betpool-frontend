interface Lag {
    engelsk: string
    norsk: string
    flagg: string
}

export const alleLag: Lag[] = [
    { engelsk: 'Belgium', norsk: 'Belgia', flagg: '🇧🇪' },

    {
        engelsk: 'Croatia',
        norsk: 'Kroatia',
        flagg: '🇭🇷',
    },
    { engelsk: 'Denmark', norsk: 'Danmark', flagg: '🇩🇰' },

    { engelsk: 'England', norsk: 'England', flagg: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    {
        engelsk: 'France',
        norsk: 'Frankrike',
        flagg: '🇫🇷',
    },
    { engelsk: 'Germany', norsk: 'Tyskland', flagg: '🇩🇪' },

    {
        engelsk: 'Netherlands',
        norsk: 'Nederland',
        flagg: '🇳🇱',
    },
    { engelsk: 'Poland', norsk: 'Polen', flagg: '🇵🇱' },
    {
        engelsk: 'Portugal',
        norsk: 'Portugal',
        flagg: '🇵🇹',
    },

    { engelsk: 'Senegal', norsk: 'Senegal', flagg: '🇸🇳' },
    {
        engelsk: 'Serbia',
        norsk: 'Serbia',
        flagg: '🇷🇸',
    },
    { engelsk: 'Spain', norsk: 'Spania', flagg: '🇪🇸' },
    {
        engelsk: 'Switzerland',
        norsk: 'Sveits',
        flagg: '🇨🇭',
    },
    { engelsk: 'Wales', norsk: 'Wales', flagg: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    { engelsk: 'Scotland', norsk: 'Skottland', flagg: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    { engelsk: 'Hungary', norsk: 'Ungarn', flagg: '🇭🇺' },
    { engelsk: 'Italy', norsk: 'Italia', flagg: '🇮🇹' },
    { engelsk: 'Albania', norsk: 'Albania', flagg: '🇦🇱' },
    { engelsk: 'Slovenia', norsk: 'Slovenia', flagg: '🇸🇮' },
    { engelsk: 'Ukraine', norsk: 'Ukraina', flagg: '🇺🇦' },
    { engelsk: 'Slovakia', norsk: 'Slovakia', flagg: '🇸🇰' },
    { engelsk: 'Romania', norsk: 'Romania', flagg: '🇷🇴' },
    { engelsk: 'Georgia', norsk: 'Georgia', flagg: '🇬🇪' },
    { engelsk: 'Czechia', norsk: 'Tsjekkia', flagg: '🇨🇿' },
    { engelsk: 'Türkiye', norsk: 'Tyrkia', flagg: '🇹🇷' },
]

const engelskMap = new Map<string, Lag>()
const norsk = new Map<string, Lag>()

alleLag.forEach((l) => {
    engelskMap.set(l.engelsk, l)
    norsk.set(l.norsk, l)
})

export function hentFlag(engelskLag: string) {
    return engelskMap.get(engelskLag)?.flagg || '🤔'
}

export function hentNorsk(engelskLag: string) {
    return engelskMap.get(engelskLag)?.norsk || engelskLag
}

export const alleLagSortert = alleLag.sort((a, b) => a.norsk.localeCompare(b.norsk))
