/* eslint-disable react/prop-types */
import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { makeStyles } from '@material-ui/styles'
export const WaitingScreen = ({ sessionID, players }) => {
    const classes = useStyles();
    console.log(players)
    return (
        <div>
            <div className={classes.sessionContainer}>
                <Typography variant={'h2'}>
                    Session ID: {sessionID}
                </Typography>
                <IconButton
                    onClick={() => navigator.clipboard.writeText('http://localhost:3000/play/' + sessionID)}
                >
                    <FileCopyIcon />
                </IconButton>
            </div>
            <Typography variant={'h5'}>
                Players:
            </Typography>
            <ul>
                {players.map(player =>
                    <li>
                        <Typography
                            className={classes.player}
                            variant={'subtitle1'}>
                            {player}
                        </Typography>
                    </li>
                )}
            </ul>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    sessionContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    playerContainer: {
        margin: '5px',
    }
}))
