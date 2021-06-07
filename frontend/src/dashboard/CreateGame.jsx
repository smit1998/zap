/* eslint-disable react/prop-types */
import React from 'react'
import {
    Modal,
    Fade,
    Backdrop,
    InputBase,
    Typography,
    Button,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { createGame } from './dashboardProvider'
import { makeStyles } from '@material-ui/styles'

export const CreateGame = ({ open, onClose }) => {
    const classes = useStyles()
    const history = useHistory()
    const token = window.localStorage.token
    const maxLength = 20
    const [name, setName] = React.useState('')

    const handleCreate = () => {
        (async () => {
            const newQuizID = await createGame(token, name)
            console.log(newQuizID)
            history.push('admin/game/edit/' + newQuizID)
        })()
        onClose()
    }
    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.modalContent}>
                    <Typography variant={'subtitle1'}>
                        Set Quiz name (Max. 20 characters)
                    </Typography>
                    <InputBase
                        value={name}
                        onChange={(e) => {
                            if (e.target.value.length <= maxLength) {
                                setName(e.target.value)
                            }
                        }}
                        inputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        className={classes.createBtn}
                        disabled={name.length === 0 || name.length >= maxLength}
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                </div>
            </Fade>
        </Modal>
    )
}

const useStyles = makeStyles(() => ({
    modalContent: {
        position: 'absolute',
        width: '80%',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '3px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    input: {
        height: 50,
        fontSize: 40,
        borderBottom: '1px solid #A545CC',
        border: 'none',
        flex: 1,
    },
    createBtn: {
        width: '100%',
    },
}))
