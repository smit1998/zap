/* eslint-disable quote-props */

const url = 'http://localhost:5005/admin/'
export async function getQuiz(quizID, token) {
    try {
        const response = await fetch(url + 'quiz/' + quizID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            redirect: 'follow',
        })
        const result = await response.json()
        return result
    } catch {
        throw Error('Could not fetch quiz details');
    }
}

export async function getStatus(token, sessionID) {
    console.log(sessionID);
    try {
        const response = await fetch(url + 'session/' + sessionID + '/status', {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        return result.results
    } catch {
        throw Error('Could not get status')
    }
}

export async function stopQuiz(token, quizID) {
    try {
        await fetch(url + 'quiz/' + quizID + '/end', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
    } catch {
        throw Error('Could not stop game..');
    }
}

export async function advanceQuiz(token, quizID) {
    try {
        const response = await fetch(url + 'quiz/' + quizID + '/advance', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json();
        console.log(result);
        return result.stage;
    } catch {
        throw Error('Could not advance game..');
    }
}
