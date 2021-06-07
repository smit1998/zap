export const deleteQuestion = (payload) => {
    return {
        type: 'DELETE',
        payload: payload,
    }
}
export const createQuestion = () => {
    return {
        type: 'CREATE',
    }
}
export const updateQuestionChoices = (payload) => {
    return {
        type: 'UPDATE_QUESTION_CHOICES',
        payload: payload,
    }
}
export const deleteQuestionChoice = (payload) => {
    return {
        type: 'DELETE_QUESTION_CHOICE',
        payload: payload,
    }
}
export const updateQuestionSettings = (payload) => {
    return {
        type: 'UPDATE_QUESTION_SETTINGS',
        payload: payload,
    }
}
export const updateQuizName = (payload) => {
    return {
        type: 'UPDATE_NAME',
        payload: payload,
    }
}
export const populateQuiz = (payload) => {
    return {
        type: 'POPULATE',
        payload: payload,
    }
}
