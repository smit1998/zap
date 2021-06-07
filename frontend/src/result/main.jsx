import React from 'react'
import { getResults, getQuiz } from './resultProvider'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import { stopQuiz } from '../host/hostProvider'

// PATH: /admin/results/:quizID/:sessionID
export const ResultPage = () => {
    const history = useHistory();
    const { quizID, sessionID } = useParams()
    const [playerRankings, setRankings] = React.useState(null)
    const [error, setError] = React.useState(false);
    const [quizName, setQuizName] = React.useState(null)
    let token = window.localStorage.getItem('token')
    if (!token) token = null
    React.useEffect(() => {
        (async () => {
            try {
                const quiz = await getQuiz(token, quizID);
                const points = quiz.questions.map(question => question.points)
                const timeLimits = quiz.questions.map(question => question.time_limit)
                const rankings = await getResults(token, sessionID, points, timeLimits);
                console.log(rankings);
                if (rankings) {
                    setRankings(rankings);
                } else {
                    setError(true)
                }
                setQuizName(quiz.name);
            } catch {
                setError(true)
            }
        })();
    }, [])
    return (
        <div>
            <Button
                style={{ marginBottom: '10px' }}
                variant={'outlined'}
                onClick={() => {
                    (async () => {
                        history.push('/');
                        await stopQuiz(token, quizID);
                    })();
                }}
            >
                Back
            </Button>
            {error ? <div>{'Sorry, we couldn\'t fetch the results for this session'}</div> : (
                <div>
                    {playerRankings === null || quizName === null ? (<div>{'Fetching results'}</div>) : (
                        <div>
                            <Typography variant={'h4'}>
                                {quizName} (SessionID: {sessionID})
                            </Typography>
                            { playerRankings.length === 0 ? (

                                <Typography>{'There weren\'t any winners in your quiz :('}</Typography>
                            ) : (
                                <>
                                <Typography variant={'h5'}>
                                Results
                                </Typography>
                                <ol>
                                    {playerRankings.map(player => {
                                        return <li> {player.name} {player.score}</li>
                                    })}
                                </ol>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
