/* eslint-disable react/prop-types */
import React from 'react'
import { Typography } from '@material-ui/core'
export const WaitingScreen = ({ sessionID }) => {
    return (
        <>
            <Typography variant={'h3'}>Session ID: {sessionID}</Typography>
            <Typography variant={'h5'}>
                Waiting for the session to start ...
            </Typography>
        </>
    )
}
