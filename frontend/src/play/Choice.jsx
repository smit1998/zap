/* eslint-disable react/prop-types */
import React from 'react'
import DoneIcon from '@material-ui/icons/Done'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export const Choice = ({ choice, showCorrect }) => {
    const classes = useStyles()
    const [selected, setSelected] = React.useState(false)
    console.log(showCorrect)
    return (
        <div className={classes.root}>
            <Button
                className={classes.btn}
                color={'primary'}
                variant={selected ? 'contained' : 'outlined'}
                onClick={() => {
                    if (!showCorrect) {
                        setSelected(!selected)
                    }
                }}
            >
                {choice.value}
                {showCorrect && choice.isCorrect && (
                    <DoneIcon style={{ color: 'limegreen' }} />
                )}
            </Button>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    btn: {
        width: '100%',
        margin: '10px',
        justifyContent: 'space-between',
    },
}))
