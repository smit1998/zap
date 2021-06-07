/* eslint-disable react/prop-types */
import React from 'react'
import { CreateGame } from './CreateGame'
import { Quiz } from './Quiz'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export const Dashboard = ({ quizes, onDeleteQuiz }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    return (
        <div className={classes.container}>
            <div>
                {quizes.length === 0 && (
                    <div className={classes.emptyGames}>
                        You have not created any games
                    </div>
                )}
                <div className={classes.quizContainer}>
                    {quizes.map((quiz, i) => (
                        <Quiz
                            key={i}
                            quiz={quiz}
                            onDelete={() => onDeleteQuiz()}
                        />
                    ))}
                </div>
            </div>
            <Button
                className={classes.createBtn}
                variant={'outlined'}
                color={'secondary'}
                onClick={() => setOpen(true)}
            >
                Create a new game
            </Button>
            <CreateGame open={open} onClose={() => setOpen(false)} />
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    quizContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    emptyGames: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    createBtn: {
        margin: '20px',
    },
})
