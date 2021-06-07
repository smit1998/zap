/* eslint-disable react/prop-types */
import React from 'react'
import { Backdrop, Modal, Button, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export const AddChoice = ({ open, onSubmit, onClose }) => {
    const classes = useStyle()
    const [input, setInput] = React.useState('Edit answer here!')
    const [inputError, setError] = React.useState(false)
    const [correct, setCorrect] = React.useState(false)

    const handleInputChange = (e) => {
        if (e.target.value === '') {
            setError(true)
        } else {
            setError(false)
            setInput(e.target.value)
        }
    }

    return (
        <Backdrop open={open} className={classes.backdrop}>
            <Modal open={open} onClose={onClose}>
                <div className={classes.modalContent}>
                    <div className={classes.content}>
                        <InputBase
                            style={
                                inputError
                                    ? {
                                          border: '1px solid red',
                                          borderRadius: '3px',
                                      }
                                    : {}
                            }
                            value={input}
                            onChange={handleInputChange}
                            inputProps={{
                                className: classes.input,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => setCorrect(!correct)}
                            style={
                                correct
                                    ? {
                                          border: '2px solid limegreen',
                                          color: 'limegreen',
                                      }
                                    : {}
                            }
                        >
                            {correct ? 'Correct' : 'Make Correct'}
                        </Button>
                    </div>
                    <Button
                        className={classes.submitBtn}
                        variant={'contained'}
                        color={'primary'}
                        onClick={() => {
                            onSubmit({
                                value: input,
                                isCorrect: correct,
                            })
                            console.log('remember to handle error states here')
                            onClose()
                        }}
                    >
                        Add
                    </Button>
                </div>
            </Modal>
        </Backdrop>
    )
}
const useStyle = makeStyles(() => ({
    root: {
        margin: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5px',
        paddingBottom: '10px',
        borderBottom: '1px solid #E0E0E0',
    },
    input: {
        height: 40,
        fontSize: 24,
        display: 'inline-flex',
        borderBottom: '1px solid #A545CC',
        padding: '5px',
        marginRight: '15px',
    },
    modalContent: {
        position: 'absolute',
        width: '80%',
        backgroundColor: 'white',
        boxShadow: 5,
        padding: '40px',
        display: 'flex',
        justifyContent: 'centre',
        flexDirection: 'column',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
    },
    backdrop: {
        zIndex: 10,
        color: '#fff',
    },
    submitBtn: {
        marginTop: '20px',
        width: '100%',
    },
}))
