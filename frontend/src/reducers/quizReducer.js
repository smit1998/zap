const quizReducer = (state = null, action) => {
    console.log('This is the quiz store', state)
    if (action.type === 'DELETE') {
        const id = action.payload
        const newQuestions = state.questions.filter((x) => x.id !== id)
        return {
            ...state,
            questions: newQuestions,
        }
    } else if (action.type === 'CREATE') {
        const newQuestions = state.questions
        const newEmptyQ = {
            id: null,
            name: 'New Question Name',
            type: 'SINGLE',
            time_limit: 20,
            points: 200,
            attachments: null,
            choices: [],
        };

        newEmptyQ.name = 'New Question name'
        newQuestions.push(newEmptyQ);
        for (let i = 0; i < newQuestions.length; ++i) {
            newQuestions[i].id = i;
        }

        const newState = ({
            ...state,
            questions: newQuestions
        })
        return newState;
        // Passes in action.payload.[id, name, type, time_limit, points]
    } else if (action.type === 'UPDATE_QUESTION_SETTINGS') {
        // Get the question and update the settings
        const newQuestion = state.questions.find(
            (el) => el.id === action.payload.id
        )
        newQuestion.name = action.payload.name
        newQuestion.type = action.payload.type
        newQuestion.time_limit = action.payload.time_limit
        newQuestion.points = action.payload.points

        // Filter out old question and add new question
        const newQuestions = state.questions.filter(
            (el) => el.id !== action.payload.id
        )
        newQuestions.push(newQuestion)
        return {
            ...state,
            questions: newQuestions,
        }
        // Passes in action.payload[id, choices]
    } else if (action.type === 'UPDATE_QUESTION_CHOICES') {
        return {
            ...state,
            questions: state.questions,
        }
    } else if (action.type === 'DELETE_QUESTION_CHOICE') {
        const newQuestions = state.questions;
        for (let i = 0; i < newQuestions.length; ++i) {
            if (newQuestions[i].id === action.payload.id) {
                let newQuestion = newQuestions[i]
                const newChoices = newQuestion.choices;
                newChoices.splice(action.payload.index, 1);
                newQuestion = {
                    ...newQuestion,
                    choices: newChoices
                }
                newQuestions[i] = newQuestion;
                break;
            }
        }
        return {
            ...state,
            questions: newQuestions
        }
    } else if (action.type === 'UPDATE_NAME') {
        return {
            ...state,
            name: action.payload,
        }
    } else if (action.type === 'POPULATE') {
        return action.payload
    }
    return state
}

export default quizReducer
