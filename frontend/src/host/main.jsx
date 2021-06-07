import React from 'react'
import { Button } from '@material-ui/core'
import { WaitingScreen } from './WaitingScreen'
import { QuestionScreen } from './QuestionScreen'
import {
    getStatus,
    stopQuiz
} from './hostProvider'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

// PATH: /admin/game/play/:quizID/session/:sessionID
export const HostGame = () => {
    const classes = useStyles();
    const history = useHistory();
    const { quizID, sessionID } = useParams()
    console.log(sessionID);
    let token = window.localStorage.getItem('token')
    if (!token) token = null
    const [state, setState] = React.useState('WAITING')
    const [players, setPlayers] = React.useState([])

    React.useEffect(() => {
        (async () => {
            const status = await getStatus(token, sessionID);
            if (status.position === -1) {
                setState('WAITING')
                getStatusCallBack();
            } else {
                setState('QUESTIONS');
            }
        })();
    }, [])

    const getStatusCallBack = () => {
        (async () => {
            const result = await getStatus(token, sessionID)
            setPlayers(result.players);
        })();
        if (state === 'WAITING') {
            console.log('RUnning get status');
            setTimeout(() => getStatus(), 5000)
        }
    }

    const handleStartQuiz = () => {
            setState('QUESTIONS');
    }
    const handleStopQuiz = () => {
        (async () => {
            await stopQuiz(token, quizID);
        })();
    }
    return (
        <div className={classes.root}>
            {state === 'WAITING' && players && (
                <div>
                    <WaitingScreen sessionID={sessionID} players={players} />
                    <Button
                        className={classes.startBtn}
                        variant={'contained'}
                        color={'primary'}
                        onClick={handleStartQuiz}>
                        Start Quiz
                    </Button>
                </div>
            )}
            {state === 'QUESTIONS' && (
                <QuestionScreen />
            )}
            <Button
                className={classes.stopBtn}
                variant={'outlined'}
                onClick={() => {
                    handleStopQuiz();
                    history.push('/')
                }}
            >
                Back to dashboard
            </Button>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
    },
    stopBtn: {
        marginTop: '15px',
        width: '100%'
    },
    startBtn: {
        marginTop: '40px',
        width: '100%'
    }
}))
