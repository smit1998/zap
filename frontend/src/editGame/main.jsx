import React from 'react'
import { useDispatch } from 'react-redux'
import { getGame } from './gameProvider'
import { EditGame } from './EditGame'
import { populateQuiz } from '../actions/quizActions'
import { useParams } from 'react-router-dom'

export const EditGamePage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    let token = window.localStorage.getItem('token')
    if (!token) token = null
    const [ready, setReady] = React.useState(false)
    React.useEffect(() => {
        (async () => {
            console.log('Loading main page');
            const data = await getGame(id, token)
            dispatch(populateQuiz(data))
            setReady(true)
        })()
    }, [])

    return (
        <div>
            {ready ? (
                <div>
                    <EditGame quizID={id} />
                </div>
            ) : (
                'Fetching data...'
            )}
        </div>
    )
}
