const production = false;

var API = '';

const Accept = 'application/mediteme-places.v1+json';

function authHeader() {
    return {
        'Accept': Accept,
        'Content-Type': 'application/json'
    }
}

function header(token) {
    return {
        'Content-Type': 'application/json',
        'Accept': Accept,
        'Authorization': token
    }
}

if (!production) {
    API = 'http://10.0.0.102:3000';
}

export function loginRequest(user_login) {
    return fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            email: user_login.email.toLowerCase(),
            password: user_login.password,
            login_type: user_login.login_type,
            name: user_login.name,
            img_url: user_login.img_url,
            social_id: user_login.social_id
        })
    })
        .then(response => response.json())
        .then(data => data)
        .catch((error) => { throw error });
}

export function signupRequest(user_signup) {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            email: user_signup.email,
            password: user_signup.password,
            password_confirmation: user_signup.password_confirmation,
            name: user_signup.name,
        })
    })
        .then(response => response.json())
        .then(data => data)
        .catch((error) => { throw error });
}

export function getCategoriesRequest(token) {
    return fetch(`${API}/categories`, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => data)
        .catch((error) => { throw error });
}
