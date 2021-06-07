/* eslint-disable react/prop-types */
import React from 'react'
import { Countdown } from './Countdown'
import { Choice } from './Choice'
import { sendAnswer } from './playProvider'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export const QuestionScreen = ({ question, playerID }) => {
    const [showCorrect, setShow] = React.useState(false)
    const [selected, setSelected] = React.useState([])
    const classes = useStyles()
    const handleClick = (choiceID) => {
        (async () => {
            let newSelected = selected;
            if (choiceID in selected) {
                newSelected = selected.filter(el => el !== choiceID);
                setSelected(newSelected)
            } else {
                newSelected.push(choiceID)
            }
            await sendAnswer(playerID, newSelected);
        })();
    }
    return (
        <div className={classes.root}>
            {question ? (
                <>
                    <Typography variant={'h3'}>{question.name}</Typography>
                    <Countdown
                        from={question.isoTimeLastQuestionStarted}
                        duration={question.time_limit}
                        onTimeUp={() => setShow(true)}
                    />
                    {question.choices.map((choice) => {
                        return (
                            <Choice
                                onClick={() => handleClick(choice.id)}
                                choice={choice}
                                showCorrect={showCorrect}
                            />
                        )
                    })}
                </>
            ) : (
                <div>{'loading data'}</div>
            )}
        </div>
    )
}

const useStyles = makeStyles(() => ({}))
