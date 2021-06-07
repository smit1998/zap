const url = 'http://localhost:5005/play/'

export async function checkStatus(playerID) {
    try {
        const response = await fetch(url + playerID + '/status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        if ('error' in result) {
            throw Error('Session Inactive')
        }
        return result.started
    } catch {
        throw Error('Session Inactive')
    }
}

export async function getQuestion(playerID) {
    try {
        const response = await fetch(url + playerID + '/question', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        console.log(result)
        if ('error' in result) {
            throw Error('Game has finished')
        }
        return result.question
    } catch {
        throw Error('Game has finished')
    }
}

export async function getResults(playerID) {
    try {
        const response = await fetch(url + playerID + '/results', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        if ('error' in result) {
            throw Error('Session is not active anymore')
        }
        console.log(result);
        return result
    } catch {
        throw Error('Session is not active anymore')
    }
}

export async function sendAnswer(playerID, answerIDs) {
    try {
        await fetch(url + playerID + '/play', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answerIds: answerIDs
            })
        })
    } catch {
        throw Error('Could not send user response');
    }
}
