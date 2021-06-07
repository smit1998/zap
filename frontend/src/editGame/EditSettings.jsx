/* eslint-disable react/prop-types */
import React from 'react'
import {
    InputBase,
    Typography,
    Button,
    Backdrop,
    Modal,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { updateQuestionSettings } from '../actions/quizActions'
import { makeStyles } from '@material-ui/styles'

// Assumes that question is never empty
export const EditSettings = ({ modalState, onClose, question }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [questionName, setQuestionName] = React.useState('')
    const [questionHelperText, setQuestionHelperText] = React.useState('')
    const [type, setType] = React.useState('')
    const [timeLimit, setTimeLimit] = React.useState('')
    const [points, setPoints] = React.useState('')
    // const [attachments, setAttachments] = React.useState('')
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        setQuestionName(question.name)
        setType(question.type)
        setTimeLimit(question.time_limit)
        setPoints(question.points)
        // setAttachments(question.attachments)
        setOpen(modalState)
    }, [question, modalState])

    const maxQuestionLength = 100
    const handleQuestionNameChange = (e) => {
        if (e.target.value === '') {
            setQuestionHelperText('Question cannot be empty')
        } else if (e.target.value.length === maxQuestionLength) {
            setQuestionHelperText('Max Limit Reached')
            return
        } else {
            setQuestionHelperText(
                maxQuestionLength - e.target.value.length + ' characters left'
            )
        }
        setQuestionName(e.target.value)
    }

    const hanldeTimeLimitChange = (e) => {
        setTimeLimit(e.target.value)
    }

    const handlePointsChoice = (e) => {
        setPoints(e.target.value)
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const handleSaveBtn = () => {
        dispatch(
            updateQuestionSettings({
                id: question.id,
                name: questionName,
                time_limit: timeLimit,
                points: points,
                type: type,
            })
        )
        console.log('Remember to do error handling here!')
        onClose()
    }

    const handleCancelBtn = () => {
        onClose()
    }
    return (
        <Backdrop open={open} className={classes.backdrop}>
            <Modal
                disableBackdropClick={true}
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className={classes.modalContent}>
                    <div className={classes.root}>
                        <div className={classes.questionName}>
                            <InputBase
                                value={questionName}
                                onChange={handleQuestionNameChange}
                                inputProps={{
                                    className: classes.questionInput,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Typography
                                className={classes.questionHelperText}
                                variant="subtitle1"
                            >
                                {questionHelperText}
                            </Typography>
                        </div>
                        <Typography variant="h5" style={{ color: '#A545CC' }}>
                            Settings
                        </Typography>
                        <Divider light />
                        <div className={classes.settingContainer}>
                            <TextField
                                className={classes.inputContainer}
                                size={'small'}
                                value={timeLimit}
                                onChange={(e) => hanldeTimeLimitChange(e)}
                                label="Time Limit"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                className={classes.inputContainer}
                                size={'small'}
                                value={points}
                                onChange={(e) => handlePointsChoice(e)}
                                label="Points worth"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <RadioGroup
                                className={classes.radioGroup}
                                value={type}
                                color="default"
                                onChange={(e) => handleTypeChange(e)}
                            >
                                <FormControlLabel
                                    value="SINGLE"
                                    control={<Radio />}
                                    label="Single Answer"
                                />
                                <FormControlLabel
                                    value="MULTIPLE"
                                    control={<Radio />}
                                    label="Multiple Answers"
                                />
                            </RadioGroup>
                        </div>
                        <div className={classes.actionContainer}>
                            <Button
                                variant={'contained'}
                                color={'secondary'}
                                onClick={handleSaveBtn}
                            >
                                Save
                            </Button>
                            <Button
                                style={{ marginLeft: '10px' }}
                                onClick={handleCancelBtn}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </Backdrop>
    )
}

const useStyles = makeStyles(() => ({
    questionName: {
        border: '1px solid #A545CC',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '10px',
        marginBottom: '20px',
    },
    questionHelperText: {
        position: 'absolute',
        top: '5px',
        right: '10px',
    },
    questionInput: {
        height: 50,
        fontSize: 40,
        borderBottom: 0,
        border: 'none',
    },
    modalContent: {
        position: 'absolute',
        width: '80%',
        height: '80%',
        backgroundColor: 'white',
        boxShadow: 5,
        padding: '20px',
        paddingLeft: '40px',
        paddingRight: '40px',
        display: 'flex',
        justifyContent: 'centre',
        flexDirection: 'column',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        overflowY: 'scroll',
    },
    backdrop: {
        zIndex: 10,
        color: '#fff',
    },
    settingContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '15px',
    },
    inputContainer: {
        margin: '5px',
        marginTop: '10px',
    },
    radioGroup: {
        paddingLeft: '10px',
    },
    actionContainer: {
        paddingTop: '20px',
    },
}))
