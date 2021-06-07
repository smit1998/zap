/* eslint-disable react/prop-types */
import React from 'react'
import { Typography, IconButton, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
export const Choice = ({ value, isCorrect, onDelete }) => {
    const classes = useStyle()
    return (
        <div>
                <div className={classes.root}>
                    <div className={classes.content}>
                        <Typography
                            variant={'subtitle1'}
                            style={{ marginTop: '10px' }}
                        >
                            {value}
                        </Typography>
                        {isCorrect && (
                            <Chip
                                style={{
                                    marginTop: '10px',
                                    marginLeft: '10px',
                                }}
                                size={'small'}
                                variant={'outlined'}
                                label={'Correct'}
                            />
                        )}
                    </div>
                    <IconButton onClick={() => onDelete()}>
                        <HighlightOffIcon />
                    </IconButton>
                </div>
        </div>
    )
}
const useStyle = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '5px',
        borderBottom: '1px solid #E0E0E0',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    input: {
        height: 17,
        fontSize: 16,
        borderBottom: 0,
        border: 'none',
        display: 'inline-flex',
    },
}))
