// Api calls to get dashboard data
const url = 'http://localhost:5005/admin/quiz/'
export async function getGames(token) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        })
        const result = await response.json()
        console.log(result)
        return result.quizzes
    } catch {
        console.log('Error fetching games for dashboard')
    }
}

export async function deleteGame(token, quizID) {
    try {
        const response = await fetch(url + `/${quizID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        })
        const result = await response.json()
        return result
    } catch {
        console.log('Error deleting a game')
    }
}

export async function createGame(token, quizName) {
    try {
        const response = await fetch(url + 'new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                name: quizName,
            }),
        })
        const result = await response.json()
        console.log(result.quizId)
        return result.quizId
    } catch {
        console.log('Error creating a game')
    }
}

export async function getSessionID(quizID, token) {
    try {
        const response = await fetch(url + quizID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            redirect: 'follow',
        })
        const result = await response.json()
        if (!result.active) {
            throw Error('Game is not active, could not get game')
        }
        return result.active
    } catch {
        throw Error('Could not get game')
    }
}

export async function startGame(token, quizID) {
    try {
        const response = await fetch(url + quizID + '/start', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        console.log('Result from starting ame', result)

        if ('error' in result) {
            throw Error('Could not start game error in call')
        }

        // Call get game to get the session id
        const sessionID = await getSessionID(quizID, token)
        return sessionID
    } catch (e) {
        throw Error('Cannot start game')
    }
}
