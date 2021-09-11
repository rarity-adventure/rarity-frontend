import './styles/index.css'
import './styles/styles.css'
import 'react-tabs/style/react-tabs.css'
import ReactGA from 'react-ga';

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

require('dotenv').config()

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false
}

const id = process.env.REACT_APP_TRACKING_ID || ""

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

ReactGA.initialize(id);

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
