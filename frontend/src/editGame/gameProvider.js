// API Calls to get information about a game
const url = 'http://localhost:5005/admin/quiz/'

export async function getGame(quizID, token) {
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
        return result
    } catch {
        throw Error('Could not fetch quiz details');
    }
}

export async function updateGame(quizID, quizName, quizQuestions, token) {
    // Manipulate the questions so they contain and id
    for (let i = 0; i < quizQuestions.length; ++i) {
        const question = quizQuestions[i];
        for (let j = 0; j < question.choices.length; ++j) {
            question.choices[j].id = j;
        }
    }
    console.log(quizQuestions);
    try {
        const response = await fetch(url + quizID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                name: quizName,
                questions: quizQuestions,
            }),
            redirect: 'follow',
        })
        const result = await response.json()
        console.log(result)
        return result
    } catch {
        console.log('Could not update quiz data')
    }
}
