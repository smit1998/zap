import React from 'react'
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField,
    Button,
    Typography,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles } from '@material-ui/styles'
import { registerUser } from './authHelpers'

export const RegisterPage = () => {
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [reveal, setReveal] = React.useState(false)
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [name, setName] = React.useState('')

    async function handleSignUp() {
        if (
            name === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            alert('You have empty fields')
        } else if (password.length <= 5) {
            alert('Password too short. Must have more than 5 characters')
        } else if (password !== confirmPassword) {
            alert('Passwords do not match')
        } else {
            const token = registerUser(email, password, name)
            if (token) {
                if (window.localStorage.getItem('token')) {
                    window.localStorage.removeItem('token')
                }
                window.localStorage.setItem('token', 'Bearer ' + token)
            }
        }
    }

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant={'h3'} style={{ marginBottom: '20px' }}>
                Welcome to ZAP!
            </Typography>
            <TextField
                className={classes.registerText}
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                className={classes.registerText}
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormControl className={classes.passwordInput} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    Password
                </InputLabel>
                <OutlinedInput
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    labelWidth={70}
                />
            </FormControl>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                </InputLabel>
                <OutlinedInput
                    className={classes.passwordInput}
                    type={reveal ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setReveal(!reveal)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                                {reveal ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    className={classes.registerButton}
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
            </FormControl>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    registerText: {
        marginBottom: '10px',
    },
    passwordInput: {
        marginBottom: '20px',
    },
})
