import quizReducer from './quizReducer'
import { combineReducers } from 'redux'
const allReducers = combineReducers({
    quiz: quizReducer,
})

export default allReducers
