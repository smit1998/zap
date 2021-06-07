import React from 'react'
import { getGames } from './dashboardProvider'
import { Dashboard } from './Dashboard'

export const DashboardPage = () => {
    let token = window.localStorage.getItem('token')
    if (!token) token = null
    const [ready, setReady] = React.useState(false)
    const [quizes, setQuizes] = React.useState(null)
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        (async () => {
            const data = await getGames(token)
            if (data) {
                await setQuizes(data)
                setReady(true)
            } else {
                setError(true);
                console.log('Couldnt load data')
            }
        })()
    }, [ready])
    return (
        <div>
            {ready ? (
                <Dashboard
                    quizes={quizes}
                    onDeleteQuiz={() => setReady(false)}
                />
            ) : (
                <div>
                {error ? ('Could not load data') : ('Fetching data...')}
                </div>
            )}
        </div>
    )
}
