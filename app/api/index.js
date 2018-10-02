import queryString from 'query-string';

const production = true;

var API = 'https://young-shelf-65999.herokuapp.com';

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
    API = 'http://192.168.1.102:3000';
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

function put(path, header, data) {
    const url = `${API}/${path}`
    console.log('put =>', url, header, data)
    return fetch(url, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(data)
    })
        .then(data => {
            console.log('put <=', url, data)
            return data
        })
        .catch((error) => { throw error });
}

function get(path, header, query_data = {}) {
    const url = `${API}/${path}?${queryString.stringify(query_data)}`
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
    return post('signup', header(), sign_data)
}

export function getCategoriesRequest() {
    return get('categories', header())
}

export function getStoresRequest() {
    return get('stores', header())
}

export function getStoreRequest(store_id) {
    return get(`stores/${store_id}`, header())
}

export function postAddressRequest(auth_token, address) {
    if (address.id && address.id > 0) {
        return put(`addresses/${address.id}`, authHeader(auth_token), address)
    }
    return post('addresses', authHeader(auth_token), address)
}

export function getAddressRequest(auth_token) {
    return get('addresses', authHeader(auth_token))
}

export function getAddressByZipcodeRequest(auth_token, address) {
    return get(`zip_codes`, authHeader(auth_token), address)
}

export function postOrderRequest(auth_token, cart) {
    return post('orders', authHeader(auth_token), cart)
}

export function getOrdersRequest(auth_token) {
    return get('orders', authHeader(auth_token))
}