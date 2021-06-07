import React from 'react'
import { join } from './joinProvider'
import { Button, TextField } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

// Page to join a game
export const JoinPage = () => {
    const history = useHistory()
    const { sessionID } = useParams();
    const [id, setID] = React.useState('');
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        if (sessionID) {
            setID(sessionID);
        }
    })
    console.log(sessionID, id)
    const joinGame = (sessionID, name) => {
        (async () => {
            const playerID = await join(sessionID, name)
            if (playerID) {
                console.log(playerID)
                history.push('/play/' + sessionID + '/player/' + playerID)
            } else {
                alert('Invalid Session')
            }
        })()
    }

    const classes = useStyles()
    return (
        <div className={classes.container}>
            <TextField
                className={classes.item}
                label="Zap Session ID"
                variant="outlined"
                value={id}
                onChange={(e) => setID(e.target.value)}
            />
            <TextField
                className={classes.item}
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button
                className={classes.item}
                variant={'contained'}
                color={'primary'}
                disabled={id === '' || name === ''}
                onClick={() => joinGame(id, name)}
            >
                Join
            </Button>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        margin: '5px',
    },
})
