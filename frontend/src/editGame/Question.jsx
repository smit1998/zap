/* eslint-disable react/prop-types */
import React from 'react'
import { EditSettings } from './EditSettings'
import { Choices } from './Choices'
import { useDispatch } from 'react-redux'
import { deleteQuestion } from '../actions/quizActions'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Divider,
    IconButton,
} from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import EditIcon from '@material-ui/icons/Edit'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import GradeIcon from '@material-ui/icons/Grade'
import { makeStyles } from '@material-ui/styles'

export const Question = ({ question, index }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    return (
        <div className={classes.root}>
            {question && (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                    >
                        <Typography className={classes.heading}>
                            {index + 1}. {question.name}
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails className={classes.content}>
                        <div className={classes.settingsContainer}>
                            <div className={classes.chipsContainer}>
                                <Chip
                                    className={classes.chipStyle}
                                    avatar={<AccessTimeIcon />}
                                    label={question.time_limit + ' sec. timer'}
                                    variant="outlined"
                                />
                                <Chip
                                    className={classes.chipStyle}
                                    avatar={<GradeIcon />}
                                    label={question.points + ' points'}
                                    variant="outlined"
                                />
                                <Chip
                                    className={classes.chipStyle}
                                    avatar={
                                        question.type === 'SINGLE' ? (
                                            <DoneIcon />
                                        ) : (
                                            <DoneAllIcon />
                                        )
                                    }
                                    label={
                                        question.type === 'SINGLE'
                                            ? 'Single Answer'
                                            : 'Multiple Answers'
                                    }
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.settingActions}>
                                <IconButton
                                    className={classes.editBtn}
                                    color={'primary'}
                                    onClick={() => setOpen(true)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color={'secondary'}
                                    onClick={() =>
                                        dispatch(deleteQuestion(question.id))
                                    }
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </div>
                        </div>
                        <Divider />
                        <Choices question={question} />
                        <EditSettings
                            modalState={open}
                            onClose={() => setOpen(false)}
                            question={question}
                        />
                    </AccordionDetails>
                </Accordion>
                // Modal to edit settings
            )}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        marginTop: '10px',
    },
    heading: {
        fontSize: 20,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    questionNameInput: {
        height: 30,
        fontSize: 20,
        margin: 0,
        borderBottom: 0,
        border: 'none',
    },
    settingsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chipsContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    chipStyle: {
        marginRight: '5px',
    },
    editBtn: {
        height: '45px',
    },
}))
