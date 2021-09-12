import './styles/index.css'
import './styles/styles.css'
import 'react-tabs/style/react-tabs.css'

import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './pages/App'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import UserUpdater from './state/user/updater'
import getLibrary from './utils/getLibrary'
import { NetworkContextName } from './connectors'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import ReactGA from 'react-ga4'
import { isMobile } from 'react-device-detect'

require('dotenv').config()

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false
}

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)
    ReactGA.set({
        customBrowserType: !isMobile
            ? 'desktop'
            : 'web3' in window || 'ethereum' in window
            ? 'mobileWeb3'
            : 'mobileRegular',
    })
}

function Updaters() {
    return (
        <>
            <ApplicationUpdater />
            <UserUpdater />
        </>
    )
}

const client = new ApolloClient({
    uri: 'https://api.rarity.game/subgraphs/name/rarity',
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <Provider store={store}>
                    <ApolloProvider client={client}>
                        <Updaters />
                        <Router>
                            <App />
                        </Router>
                    </ApolloProvider>
                </Provider>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    </StrictMode>,
    document.getElementById('root')
)
