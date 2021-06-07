/* eslint-disable react/prop-types */
import React from 'react'
import {
    Card,
    CardHeader,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Fade,
    CardContent,
    Button,
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/styles'
import { deleteGame, startGame } from './dashboardProvider'
import { useHistory } from 'react-router-dom'

// Card for each game in a dashboard
export const Quiz = ({ quiz, onDelete }) => {
    const history = useHistory()
    let token = window.localStorage.getItem('token')
    if (!token) token = null
    const dateOfCreation = new Date(quiz.createdAt).toDateString()
    const handleDelete = () => {
        onDelete()
        deleteGame(token, quiz.id)
    }
    const handleEdit = () => {
        history.push('/admin/game/edit/' + quiz.id)
    }
    const handleViewHistory = () => {
        history.push('/admin/game/results/' + quiz.id)
    }
    const handlePlay = () => {
        (async () => {
            console.log('starting game...')
            try {
                const sessionID = await startGame(token, quiz.id)
                history.push(
                    '/admin/game/play/' + quiz.id + '/session/' + sessionID
                    )
            } catch {
                alert('Could not start game');
            }
        })()
    }
    const [anchor, setAnchor] = React.useState(null)
    const openMenu = (event) => setAnchor(event.currentTarget)
    const closeMenu = () => setAnchor(null)
    const classes = useStyles()
    return (
        <Card className={classes.container}>
            <CardHeader
                action={
                    <IconButton
                        aria-controls="fade-menu"
                        aria-haspopup="true"
                        aria-label="settings"
                        onClick={openMenu}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography variant="h5">{quiz.name}</Typography>}
                subheader={dateOfCreation}
            />
            <Menu
                id="fade-menu"
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={closeMenu}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleViewHistory}>View History</MenuItem>
            </Menu>
            <CardContent>
                <Button
                    disabled={quiz.active !== null}
                    variant="contained"
                    color="primary"
                    style={{ width: '100%' }}
                    onClick={handlePlay}
                >
                    { quiz.active === null ? 'Play' : 'Quiz is already active'}
                </Button>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles(() => ({
    container: {
        margin: '20px',
        minWidth: '300px',
    },
}))
