const production = false;

var API = '';

const Accept = 'application/kids-places.v1+json';

const authHeader = () => {
    return {
        'Accept': Accept,
        'Content-Type': 'application/json'
    }
}

const header = (token) => {
    return {
        'Content-Type': 'application/json',
        'Accept': Accept,
        'Authorization': token
    }
}

if (!production) {
    API = 'http://192.168.1.104:3000';
}

function post(path, header, data) {
    const url = `${API}/${path}`
    console.log('post =>', url, header, data)
    return fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('post <=', url, data)
            return data
        })
        .catch((error) => { throw error });
}

export function loginRequest(user_login) {
    const post_data = {
        email: user_login.email.toLowerCase(),
        password: user_login.password,
        login_type: user_login.login_type,
        name: user_login.name,
        img_url: user_login.img_url,
        social_id: user_login.social_id
    }
    return post('auth/login', authHeader(), post_data)
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

export function getCategoriesRequest() {
    console.log('getCategoriesRequest')
    return fetch(`${API}/categories`, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => data)
        .catch((error) => { throw error });
}

export function getStoreRequest(store_id) {
    console.log('getStoreRequest')
    return fetch(`${API}/stores/${store_id}`, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => data)
        .catch((error) => { throw error });
}

