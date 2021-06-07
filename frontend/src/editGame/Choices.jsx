/* eslint-disable react/prop-types */
import React from 'react'
import { AddChoice } from './AddChoice'
import { Choice } from './Choice'
import {
    Button,
    // Typography
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { updateQuestionChoices, deleteQuestionChoice } from '../actions/quizActions';

export const Choices = ({ question }) => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const [choices, setChoices] = React.useState(question.choices)
    const [open, setOpen] = React.useState(false)
    // const [errorMsg, setError] = React.useState(false);

    React.useEffect(() => {
        setChoices(choices)
    }, [choices])

    const handleDelete = (index) => {
        console.log('running handle delete', index);
        const newChoices = choices;
        newChoices.slice(index, 1)
        setChoices(newChoices)
        dispatch(deleteQuestionChoice({
            id: question.id,
            index: index,
        }))
    }
    const handleNewChoice = (choice) => {
        const newChoices = choices
        newChoices.push(choice)
        dispatch(updateQuestionChoices({
            ...question,
            choices: newChoices
        }))
        setChoices(newChoices)
    }

    return (
        <div className={classes.root}>
            {choices.map((x, index) => (
                <Choice
                    value={x.value}
                    isCorrect={x.isCorrect}
                    // onDelete={() => console.log('wants to delete itself..')}
                    onDelete={() => handleDelete(index)}
                />
            ))}
            {/* Add new choice */}
            <Button
                className={classes.addBtn}
                variant="outlined"
                color="default"
                disable={choices.length === 6}
                onClick={() => setOpen(true)}
            >
                {choices.length === 6 ? 'Max 6 Answers' : 'Add'}
            </Button>
            <AddChoice
                open={open}
                onSubmit={(choice) => handleNewChoice(choice)}
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

const useStyles = makeStyles(() => ({
    addBtn: {
        marginTop: '15px',
        width: '100%',
    },
}))
