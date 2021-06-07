const url = 'http://localhost:5005/admin/'
console.log(url)
export async function getQuiz(token, quizID) {
    console.log(token, quizID);
    try {
        const response = await fetch(url + 'quiz/' + quizID, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        return result
    } catch {
        throw Error('Could not fetch quiz')
    }
}

export async function getResults(token, sessionID, points, timeLimits) {
    try {
        const response = await fetch(url + 'session/' + sessionID + '/results', {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json()
        console.log(result);
        const playerRanking = []
        // Iterate through the players
        for (let i = 0; i < result.length; ++i) {
            const player = result[i]
            const playerName = player.name
            let playerScore = 0

            // Check the length and make sure they match
            if (points.length !== player.answers.length) {
                continue;
            }

            // Iterate through the questions
            for (let j = 0; j < player.answers.length; ++j) {
                console.log(player.answers[j])
                // // Only add points if they got it correct
                if (player.answers[j].correct === true) {
                    playerScore += points[j]
                    // Calculate time bonus
                    const answeredAt = new Date(
                        player.answers[j].answeredAt
                    ).getTime()
                    const startedAt = new Date(
                        player.answers[j].questionStartedAt
                    ).getTime()
                    const timeTaken = answeredAt - startedAt
                    if (timeTaken > 0) {
                        // Bonus marks calculated a a percentage
                        console.log(
                            Math.ceil(timeTaken / (timeLimits[j] * 1000)) * 1000
                        )
                        playerScore +=
                            Math.ceil(timeTaken / (timeLimits[j] * 1000))
                    }
                }
            }

            // Add player to map
            playerRanking.push({
                name: playerName,
                score: playerScore
            })
        }
        playerRanking.sort((a, b) => {
            return (a.score < b.score) ? 1 : -1
        });

        // Only showing top 5 contestants
        playerRanking.slice(0, 4);
        return playerRanking;
    } catch (e) {
        console.log(e);
        throw Error('Could not fetch results')
    }
}
