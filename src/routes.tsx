import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Daily from './pages/Daily'
import Stats from './pages/Stats'
import Adventure from './pages/Adventure'
import Skills from './pages/Skills'

function Routes(): JSX.Element {
    return (
        <Switch>
            <Route exact strict path="/" component={Home} />
            <Route exact strict path="/daily" component={Daily} />
            <Route exact strict path="/stats" component={Stats} />
            <Route exact strict path="/adventures" component={Adventure} />
            <Route exact strict path="/skills" component={Skills} />
        </Switch>
    )
}

export default Routes
