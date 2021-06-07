import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField,
    Typography,
    Button,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles } from '@material-ui/styles'
import { fetchToken, asyncSetToken } from './authHelpers'

export const LoginPage = () => {
    const history = useHistory()
    const [reveal, setReveal] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    async function login() {
        // Check empty
        if (email === '' || password === '') {
            alert('Your input is empty')
        } else {
            const token = await fetchToken(email, password)
            if (token) {
                asyncSetToken(token).then(() => history.push('/dashboard'))
            }
        }
    }

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant={'h2'}>ZAP!</Typography>
            <TextField
                className={classes.loginText}
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl className={classes.passwordInput} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    Password
                </InputLabel>
                <OutlinedInput
                    className={classes.loginText}
                    type={reveal ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
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
                    className={classes.actionBtn}
                    variant={'contained'}
                    color={'primary'}
                    onClick={login}
                >
                    Log In
                </Button>
                <Button
                    variant={'outlined'}
                    className={classes.actionBtn}
                    type="button"
                    onClick={() => {
                        history.push('/register')
                    }}
                >
                    Sign up
                </Button>
            </FormControl>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '25px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        width: '400px',
        backgroundColor: 'white',
        marginBottom: '5px',
    },
    actionBtn: {
        margin: '5px',
    },
})
