/* eslint-disable react/prop-types */
import { Typography } from '@material-ui/core'
import React from 'react'
export const Countdown = ({ from, duration, onTimeUp }) => {
    const calculateTimeLeft = () => {
        const fromTime = new Date(from).getTime()
        const currTime = new Date().getTime()
        return Math.max(duration * 1000 - (currTime - fromTime), 0)
    }
    const [timeLeft, setTimeLeft] = React.useState(null)

    // Refresh
    React.useEffect(() => {
        setTimeLeft(calculateTimeLeft())
    }, [from, duration])

    React.useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        if (timeLeft === 0) {
            onTimeUp()
        }
    })

    return (
        <div>
            {timeLeft !== null && (
                <Typography variant={'h5'}>
                    {timeLeft === 0 ? "Time's up!" : Math.ceil(timeLeft / 1000)}
                </Typography>
            )}
        </div>
    )
}
