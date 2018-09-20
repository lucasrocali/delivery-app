export const AUTHENTIFICATION = 'AUTHENTIFICATION'

export function login(user) {
    return {
        type:AUTHENTIFICATION,
        payload: {
            login: true,
            user: user
        }
    }
}

export function signup(name, email, password, password_confirmation) {
    return {
        type: AUTHENTIFICATION,
        payload: {
            login: false,
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }
    }
}