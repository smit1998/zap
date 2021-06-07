const url = 'http://localhost:5005'
export async function join(sessionID, name) {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            name: name,
        }),
        redirect: 'follow',
    }

    const response = await fetch(
        url + '/play/join/' + sessionID,
        requestOptions
    )
    const result = await response.json()
    return result.playerId
}
