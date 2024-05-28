import type { NextPage } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'

const Home: NextPage = () => {
    return (
        <Html lang={'no'}>
            <Head></Head>
            <body className={'bg-green-50'}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Home
