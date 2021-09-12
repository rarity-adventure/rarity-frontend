import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import ReactGA from 'react-ga4'
import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import DefaultLayout from '../layouts/Default'
import store, { persistor } from '../state'
import { Fragment, FunctionComponent } from 'react'
import Web3ReactManager from '../components/Web3ReactManager'
import { Web3ReactProvider } from '@web3-react/core'
import { NextComponentType, NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import getLibrary from '../functions/getLibrary'
import Dots from '../components/Dots'
import ApplicationUpdater from '../state/application/updater'
import MulticallUpdater from '../state/multicall/updater'
import Head from 'next/head'

const Web3ProviderNetwork = dynamic(() => import('../components/Web3ProviderNetwork'), { ssr: false })

const client = new ApolloClient({
    uri: 'https://api.rarity.game/subgraphs/name/rarity-adventure/rarity',
    cache: new InMemoryCache(),
})

if (typeof window !== 'undefined' && !!window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false
}

export default function MyApp({
    Component,
    pageProps,
}: AppProps & {
    Component: NextComponentType<NextPageContext> & {
        Guard: FunctionComponent
        Layout: FunctionComponent
        Provider: FunctionComponent
    }
}) {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
            ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)
        }
    }, [])

    // Allows for conditionally setting a provider to be hoisted per page
    const Provider = Component.Provider || Fragment

    // Allows for conditionally setting a layout to be hoisted per page
    const Layout = Component.Layout || DefaultLayout

    // Allows for conditionally setting a guard to be hoisted per page
    const Guard = Component.Guard || Fragment

    return (
        <Fragment>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <title key="title">Rarity Game | Analytics</title>

                <meta key="description" name="description" content="Explore rarity" />

                <meta name="application-name" content="Rarity Game | Analytics" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="Rarity Game | Analytics" />

                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#3E4A94" />

                <meta key="twitter:card" name="twitter:card" content="app" />
                <meta key="twitter:title" name="twitter:title" content="Rarity Game | Analytics" />
                <meta key="twitter:url" name="twitter:url" content="https://analytics.rarity.game" />
                <meta key="twitter:description" name="twitter:description" content="Explore rarity" />
                <meta
                    key="twitter:image"
                    name="twitter:image"
                    content="https://analytics.rarity.game/manifest-icon-192.png"
                />
                <meta key="twitter:creator" name="twitter:creator" content="@RarityGame" />
                <meta key="og:type" property="og:type" content="website" />
                <meta key="og:site_name" property="og:site_name" content="Rarity Game | Analytics" />
                <meta key="og:url" property="og:url" content="https://analytics.rarity.game" />
                <meta key="og:image" property="og:image" content="https://analytics.rarity.game/apple-icon-180.png" />
                <meta key="og:description" property="og:description" content="Explore rarity" />
            </Head>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Web3ProviderNetwork getLibrary={getLibrary}>
                    <Web3ReactManager>
                        <ReduxProvider store={store}>
                            <PersistGate loading={<Dots>loading</Dots>} persistor={persistor}>
                                <>
                                    <ApplicationUpdater />
                                    <MulticallUpdater />
                                </>
                                <Provider>
                                    <Layout>
                                        <Guard>
                                            <Component {...pageProps} />
                                        </Guard>
                                    </Layout>
                                </Provider>
                            </PersistGate>
                        </ReduxProvider>
                    </Web3ReactManager>
                </Web3ProviderNetwork>
            </Web3ReactProvider>
        </Fragment>
    )
}
