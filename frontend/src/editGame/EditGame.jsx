/* eslint-disable react/prop-types */
import React from 'react'
import { Question } from './Question'
import { InputBase, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { createQuestion, updateQuizName } from '../actions/quizActions'
import { updateGame } from './gameProvider'
import { useHistory } from 'react-router'

export const EditGame = ({ quizID }) => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    let token = window.localStorage.getItem('token')
    if (!token) token = null
    const quizData = useSelector((state) => state.quiz)
    const [name, setName] = React.useState(quizData.name)
    // const [thumbnail, setThumbnail] = React.useState('');
    const [nameHelperText, setNameHelperText] = React.useState('Max. 20')
    const maxNameLength = 20

    const handleNameOnChange = (e) => {
        if (e.target.value === '') {
            setNameHelperText('Game has to have a name')
        } else if (e.target.value.length === maxNameLength) {
            setNameHelperText('Max Limit Reached')
            return
        } else {
            setNameHelperText(
                maxNameLength - e.target.value.length + ' characters left'
            )
        }
        dispatch(updateQuizName(e.target.value))
        setName(e.target.value)
    }

    const handleSave = () => {
        updateGame(quizID, name, quizData.questions, token)
        history.push('/dashboard')
    }
    return (
        <div className={classes.root}>
            {quizData !== null ? (
                <div>
                    {/* Game Name */}
                    <div className={classes.actions}>
                        <Button
                            variant={'contained'}
                            style={{ marginRight: '10px' }}
                            onClick={() => {
                                history.push('/dashboard')
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            className={classes.saveBtn}
                            onClick={handleSave}
                        >
                            Save Changes
                        </Button>
                    </div>
                    <div className={classes.gameName}>
                        <InputBase
                            value={name}
                            onChange={(e) => handleNameOnChange(e)}
                            inputProps={{
                                className: classes.gameNameInput,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Typography
                            className={classes.gameNameHelperText}
                            variant="subtitle1"
                        >
                            {nameHelperText}
                        </Typography>
                    </div>
                    {/* <img src={data.thumbnail} /> */}
                    {[...Object.keys(quizData.questions)].map(
                        (questionID, index) => {
                            return (
                                <Question
                                    question={quizData.questions[questionID]}
                                    index={index}
                                />
                            )
                        }
                    )}
                    {/* Option to add a question */}
                    <Button
                        className={classes.addQuestionBtn}
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                            dispatch(createQuestion())
                        }}
                    >
                        Create a new question
                    </Button>
                </div>
            ) : (
                <div>Loading data...</div>
            )}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '20px',
    },
    gameName: {
        border: '1px solid #A545CC',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '10px',
        marginBottom: '20px',
    },
    gameNameHelperText: {
        position: 'absolute',
        top: '5px',
        right: '10px',
    },
    gameNameInput: {
        height: 100,
        fontSize: 60,
        borderBottom: 0,
        border: 'none',
    },
    addQuestionBtn: {
        width: '100%',
        marginTop: '20px',
    },
    actions: {
        marginBottom: '15px',
    },
}))
