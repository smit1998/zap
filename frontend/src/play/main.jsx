/* eslint-disable react/prop-types */
import React from 'react'
import { WaitingScreen } from './WaitingScreen'
import { QuestionScreen } from './QuestionScreen'
import { ResultScreen } from './ResultScreen'
import { checkStatus, getQuestion } from './playProvider'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

// PATH: /play/:sessionID/player/:playerID
export const PlayerScreen = () => {
    const history = useHistory()
    const classes = useStyles()
    const [state, setState] = React.useState('WAITING')
    const [data, setData] = React.useState(null)
    const { sessionID, playerID } = useParams()

    React.useEffect(() => {
        console.log('setting state to be ', state);
        setState(state);
    }, [state]);

    const fetchStatus = () => {
        (async () => {
            try {
                const started = await checkStatus(playerID)
                if (started) {
                    setState('QUESTIONS')
                    console.log('setting state')
                    fetchQuestion()
                } else {
                    // Why does this run twice?
                    console.log('Runs twice..')
                    setTimeout(() => fetchStatus(), 5000)
                }
            } catch {
                alert('Session is not active anymore. Redirecting...')
                history.push('/play')
            }
        })()
    }

    const fetchQuestion = () => {
        (async () => {
            try {
                const question = await getQuestion(playerID)
                if (question) {
                    const timeStarted = new Date(
                        question.isoTimeLastQuestionStarted
                    ).getTime()
                    const currTime = new Date().getTime()
                    const timeLimitMilliSeconds = question.time_limit * 1000
                    let timeOut = timeLimitMilliSeconds
                    if (currTime - timeStarted >= timeLimitMilliSeconds) {
                        timeOut = 3000
                    }

                    await setData(question)
                    setTimeout(() => fetchQuestion(), timeOut)
                }
            } catch {
                setState('RESULTS')
            }
        })()
    }
    if (state === 'WAITING') fetchStatus()
    return (
        <div className={classes.root}>
            {state === 'WAITING' && <WaitingScreen sessionID={sessionID} />}
            {state === 'QUESTIONS' && <QuestionScreen playerID={playerID} question={data} />}
            {state === 'RESULTS' && <ResultScreen playerID={playerID} />}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        padding: '20px',
    },
}))
