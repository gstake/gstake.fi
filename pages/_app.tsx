import App, { AppProps, AppContext } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import nookies from 'nookies'

import { appWithTranslation } from 'next-i18next'

import { AuthProvider } from 'utils/auth-context'
// import { WsProvider } from 'utils/wsContext'
import theme from 'utils/theme'
import 'public/static/app.css'
import Head from 'next/head'

declare const window: any

function MyApp({ Component, pageProps }: AppProps) {
    const { _nextI18Next = {} } = pageProps

    useEffect(() => {
        if (_nextI18Next.initialLocale) {
            let _lang = _nextI18Next.initialLocale
            const { pathname } = window.location
            const _urlLang = pathname.split('/')[0]

            if (_lang.toUpperCase() !== _urlLang.toUpperCase()) {
                if (['EN', 'ZH-CN', 'ZH-HK'].indexOf(_urlLang.toUpperCase()) > -1) {
                    _lang = _urlLang
                }
            }
            nookies.set(null, 'NEXT_LOCALE', _lang, {
                path: '/',
                maxAge: 30 * 24 * 60 * 60,
            })
        }
    }, [_nextI18Next.initialLocale])

    return (
        <AuthProvider>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-QK8SYPQEZB"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-QK8SYPQEZB');
                        `,
                    }}
                ></script>

                <script
                    src="https://my.hellobar.com/bbc56b30dd2317a03b4618a011abbf443312bf77.js"
                    type="text/javascript"
                    async
                ></script>
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthProvider >
    )
}

MyApp.getStaticProps = async ({ locale }) => {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch(`https://.../posts?locale=${locale}`)
    const posts = await res.json()

    if (posts.length === 0) {
        return {
            notFound: true,
        }
    }

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)
    const { router, ctx } = appContext

    if (ctx.req) {
        const { __NEXT_INIT_QUERY, cookies } = ctx.req as any
        const { lng } = __NEXT_INIT_QUERY || {}
        const { NEXT_LOCALE } = cookies || {}
        const { asPath, locale, defaultLocale } = router || {}

        const desiredLocale = lng || locale || NEXT_LOCALE
        if (desiredLocale !== NEXT_LOCALE) {
            const Location = `${defaultLocale === desiredLocale ? '' : `/${desiredLocale}`}${asPath}`
            ctx.res.setHeader('Location', Location)
            ctx.res.setHeader('Set-Cookie', `NEXT_LOCALE=${desiredLocale}; Max-Age=31556952; Path=/`)
            ctx.res.statusCode = 302
        }
    }

    return { ...appProps }
}

export default appWithTranslation(MyApp)
