
export const MapAddress = (raw) => {
    return {
        id: 6,
        name: raw.name ? raw.name : '',
        state: raw.state ? raw.state : '',
        city: raw.city ? raw.city : '',
        neighborhood: raw.neighborhood ? raw.neighborhood : '',
        street: raw.street ? raw.street : '',
        zipcode: raw.zipcode ? raw.zipcode : '',
        number: raw.number ? raw.number : '',
        complement: raw.complement ? raw.complement : '',
        reference: raw.reference ? raw.reference : '',
        lat: raw.lat ? raw.lat : '',
        lng: raw.lng ? raw.lng : '',
    }
}

export const MapUser = (raw) => {
    return {
        id: raw.id ? raw.id : 0,
        email: raw.email ? raw.email : '',
        auth_token: raw.auth_token ? raw.auth_token : '',
        name: raw.name ? raw.name : '',
        user_type: raw.user_type ? raw.user_type : '',
        addresses: raw.addresses ? raw.addresses.map(address => MapAddress(address)) : [],
        orders: raw.orders ? raw.orders : [], //Map Orders
    }
}

export const MapCategory = (raw) => {
    return {
        id: raw && raw.id ? raw.id : '',
        name: raw && raw.name ? raw.name : '',
        foo: 'category',
        stores: raw && raw.stores ? raw.stores.map(store => MapStore(store)) : []
    }
}

export const MapStore = (raw) => {
    return {
        id: raw && raw.id ? raw.id : '',
        name: raw && raw.name ? raw.name : '',
        foo: 'store',
        img_url: raw && raw.img_url ? raw.img_url : '',
        price_type: raw && raw.price_type ? raw.price_type : '',
        delivery_estimation: raw && raw.delivery_estimation ? raw.delivery_estimation : '',
        menus: raw && raw.menus ? raw.menus.map(menu => MapMenu(menu)) : []
    }
}

export const MapMenu = (raw) => {
    return {
        id: raw && raw.id ? raw.id : '',
        name: raw && raw.name ? raw.name : '',
        foo: 'menu',
        products: raw && raw.products ? raw.products.map(product => MapProduct(product)) : []
    }
}

export const MapProduct = (raw) => {
    return {
        id: raw && raw.id ? raw.id : '',
        name: raw && raw.name ? raw.name : '',
        descp: raw && raw.descp ? raw.descp : '',
        foo: 'product',
        price: raw && raw.price ? raw.price : '',
        promo_price: raw && raw.promo_price ? raw.promo_price : '',
        price_text: raw && raw.price ? `R$ ${raw.price}` : '',
        img_url: raw && raw.img_url ? raw.img_url : '',
        options: raw && raw.options ? raw.options.map(option => MapOption(option)) : []
    }
}

export type Option = {
    id: number,
    name: string,
    min: number,
    max: number
}

export const MapOption = (raw) => {
    return {
        id: raw && raw.id ? raw.id : '',
        name: raw && raw.name ? raw.name : '',
        foo: 'option',
        min: raw && raw.min ? raw.min : 0,
        max: raw && raw.max ? raw.max : 0,
        sub_options: raw && raw.sub_options ? raw.sub_options.map(sub_option => MapSubOption(sub_option)) : []
    }
}

export const MapSubOption = (raw) => {
    return {
        id: raw && raw.id ? raw.id : '',
        name: raw && raw.name ? raw.name : '',
        foo: 'sub_option',
        price: raw && raw.price ? raw.price : 0,
        price_text: raw && raw.price ? `R$ ${raw.price}` : '',
    }
}

export const MapMenuSection = (store) => {
    return store && store.menus ? store.menus.map(menu => {
        return {
            ...menu,
            data: menu.products
        }
    })
        : []
}

export const MapOptionsSection = (product) => {
    return product && product.options ? product.options.map(option => {
        return {
            ...option,
            data: option.sub_options
        }
    })
        : []
}