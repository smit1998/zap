import React from 'react'
import { Button } from '@material-ui/core'
import logo from '../assets/zap-pink-1.png'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
export const Header = () => {
    const history = useHistory()
    let token = window.localStorage.getItem('token')
    if (!token) token = null
    const handleLogout = () => {
        window.localStorage.removeItem('token')
        if (window.localStorage.getItem('token') !== null) {
            throw Error('Error! Could not log out')
        }
        alert('You have logged out')
        setTimeout(() => history.push('/login'), 1000)
    }

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.logoContainer}>
                <img className={classes.img} src={logo} alt="Logo" />
            </div>
            {token && (
                <div className={classes.options}>
                    <Button
                        size={'small'}
                        variant={'outlined'}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            )}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#FFE1E1',
        width: '100%',
        height: '70px',
        marginBottom: '40px',
        position: 'relative',
    },
    logoContainer: {
        position: 'absolute',
        margin: '7px',
        height: '60px',
        width: '60px',
    },
    img: {
        width: '100%',
    },
    options: {
        position: 'absolute',
        right: '10px',
        top: '15px',
        display: 'flex',
        flexDirection: 'row',
    },
    avatar: {
        marginRight: '10px',
        backgroundColor: '#F50057',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionInput: {
        height: 160,
        fontSize: '5em',
    },
}))
