import React from 'react';
import { getQuiz, advanceQuiz, getStatus } from './hostProvider'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom'

export const QuestionScreen = () => {
    const classes = useStyles()
    const history = useHistory();
    const { quizID, sessionID } = useParams()
    const [question, setQuestion] = React.useState(null)
    const [questionNumber, setQuestionNumber] = React.useState(0)
    const [totalQuestions, setTotalQuestions] = React.useState(0);
    const [endOfQuiz, setEnd] = React.useState(false);
    const [error, setError] = React.useState(false);
    let token = window.localStorage.getItem('token')
    if (!token) token = null
    React.useEffect(() => {
        (async () => {
            try {
                const status = await getStatus(token, sessionID);
                if (status.position === -1) {
                    advance();
                } else {
                    getQuizData();
                }
            } catch {
                setError(true)
            }
        })()
    })

    const getQuizData = () => {
        (async () => {
            try {
                console.log('trying to get quiz data')
                const quizData = await getQuiz(quizID, token);
                const status = await getStatus(token, sessionID);
                const stageInt = parseInt(status.position)
                const nQuestions = quizData.questions.length
                if (quizData && !isNaN(stageInt)) {
                    if (nQuestions > stageInt) {
                        setQuestionNumber(stageInt + 1)
                        setTotalQuestions(nQuestions);
                        setQuestion(quizData.questions[stageInt])
                    } else {
                        setEnd(true);
                    }
                } else {
                    setError(true);
                }
            } catch {
                setError(true);
            }
        })()
    }

    const advance = () => {
        (async () => {
            await advanceQuiz(token, quizID);
            getQuizData()
        })()
    }
    return (
        <div className={classes.root}>
            { error ? 'Could not get question' : (
                <div>
                {question === null ? 'Fetching question...' : (
                    <>
                    <Typography variant={'h5'}>
                        Question {questionNumber} of {totalQuestions}
                    </Typography>
                    <Typography variant={'h3'}>
                        {question.name}
                    </Typography>
                    </>
                )}
                <Button
                    className={classes.btn}
                    color={'primary'}
                    disabled={endOfQuiz}
                    variant={'contained'}
                    onClick={advance}
                >
                    Next question
                </Button>
                </div>
            )}
            {endOfQuiz && (
                <>
                <Button
                    className={classes.btn}
                    color={'primary'}
                    variant={'contained'}
                    onClick={() => {
                        history.push('/admin/results/' + quizID + '/' + sessionID);
                    }}
                >
                    View Results
                </Button>
                </>
            )}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    btn: {
        width: '100%',
        marginTop: '20px',
    }
}))
