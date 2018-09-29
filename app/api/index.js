const production = false;

var API = '';

const Accept = 'application/kids-places.v1+json';

const header = () => {
    return {
        'Accept': Accept,
        'Content-Type': 'application/json'
    }
}

const authHeader = (token) => {
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

function get(path, header, query_data = {}) {
    const url = `${API}/${path}`
    console.log('get =>', url, header, query_data)
    return fetch(url, {
        method: 'GET',
        headers: header,

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
    return post('auth/login', header(), post_data)
}

export function signupRequest(user_signup) {
    const sign_data = {
        email: user_signup.email,
        password: user_signup.password,
        password_confirmation: user_signup.password_confirmation,
        name: user_signup.name,
    }
    return post('auth/login', header(), sign_data)
}

export function getCategoriesRequest() {
    return get('categories', header())
}

export function getStoreRequest(store_id) {
    return get(`stores/${store_id}`, header())
}

export function postAddressRequest(address) {
    const sign_data = {
        name: address.name,
        zipcode: address.zipcode,
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        state: address.state,
        reference: address.reference,
    }
    return post('addresses', header(), sign_data)
}

