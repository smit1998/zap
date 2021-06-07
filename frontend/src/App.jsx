import React from 'react'
import { Header } from './components/Header'
import { LoginPage } from './auth/LoginPage'
import { DashboardPage } from './dashboard/main'
import { RegisterPage } from './auth/RegisterPage'
import { JoinPage } from './join/JoinPage'
import { EditGamePage } from './editGame/main'
import { Error404Page } from './error/Error404Page'
import { PlayerScreen } from './play/main'
import { HostGame } from './host/main'
import { ProtectedComponent } from './routing/ProtectedComponent'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { ResultPage } from './result/main'

const App = () => {
    const classes = useStyle()
    const token = window.localStorage.getItem('token');
    console.log('Refreshed app ', token);
    return (
        <Router>
            {window.location.pathname !== '/' && <Header />}
            <div className={classes.root}>
                <Switch>
                    <Route exact path="/">
                        {token ? <DashboardPage /> : <LoginPage />}
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/dashboard">
                        <ProtectedComponent>
                            <DashboardPage />
                        </ProtectedComponent>
                    </Route>
                    <Route exact path="/admin/game/edit/:id">
                        <ProtectedComponent>
                            <EditGamePage />
                        </ProtectedComponent>
                    </Route>
                    <Route exact path="/admin/game/play/:quizID/session/:sessionID">
                        <ProtectedComponent>
                            <HostGame />
                        </ProtectedComponent>
                    </Route>
                    <Route exact path="/admin/results/:quizID/:sessionID">
                        <ProtectedComponent>
                            <ResultPage />
                        </ProtectedComponent>
                    </Route>
                    <Route exact path="/play/:sessionID/player/:playerID">
                        <PlayerScreen />
                    </Route>
                    <Route path="/play/:sessionID">
                        <JoinPage />
                    </Route>
                    <Route path="/play">
                        <JoinPage />
                    </Route>
                    <Route path="*">
                        <Error404Page />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

const useStyle = makeStyles({
    root: {
        position: 'relative',
        padding: '20px',
    },
})
export default App
