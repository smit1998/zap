const url = 'http://localhost:5005'

// Function to ensure that values have been set
// so they are never undefined when accessed immediately after sorage
export const asyncSetToken = (token) => {
    return Promise.resolve().then(() => {
        window.localStorage.setItem('token', 'Bearer ' + token)
    })
}

// this function is for register page's sign up button
export async function registerUser(email, password, name) {
    const registerBody = JSON.stringify({ email, password, name })
    try {
        const response = await fetch(url + '/admin/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: registerBody,
        })
        if (response.status !== 200) {
            alert('Invalid details, please check them again')
        } else {
            const result = await response.json()
            return result.token
        }
    } catch {
        console.log('Couldnt sign user up')
    }
}

// This function is for Login Page's login button
export async function fetchToken(email, password) {
    console.log(
        JSON.stringify({
            email: email,
            password: password,
        })
    )
    try {
        const response = await fetch(url + '/admin/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })

        if (response.status !== 200) {
            alert('Incorrect Login Details!')
        } else {
            const result = await response.json()
            return result.token
        }
    } catch {
        console.log('Couldnt log user in.')
    }
}
