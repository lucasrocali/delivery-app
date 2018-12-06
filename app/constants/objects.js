import { getCartProductOptionTotal, getCartProductSubOptionsText, getCartProductTotal, getCartTotal } from './functions'


export const MapAddress = (raw) => {
    return {
        id: raw.id ? raw.id : null,
        name: raw.name ? raw.name : '',
        state: raw.state ? raw.state : '',
        city: raw.city ? raw.city : '',
        neighborhood: raw.neighborhood ? raw.neighborhood : '',
        street: raw.street ? raw.street : '',
        zipcode: raw.zipcode ? raw.zipcode.toString() : '',
        number: raw.number ? raw.number.toString() : '',
        complement: raw.complement ? raw.complement : '',
        reference: raw.reference ? raw.reference : '',
        latitude: raw.lat ? parseFloat(raw.lat) : raw.latitude ? parseFloat(raw.latitude) : '',
        longitude: raw.lng ? parseFloat(raw.lng) : raw.longitude ? parseFloat(raw.longitude) : '',
    }
}

export const MapOrder = (raw) => {
    return {
        id: raw.id ? raw.id : null,
        token: raw.token ? raw.token : '',
        store: raw.store ? MapStore(raw.store) : {},
        address: raw.address ? MapAddress(raw.address) : {},
        status: raw.status ? raw.status : 0,
        total: raw.total ? raw.total : 0,
        total_text: MapPrice(raw.total ? raw.total : 0),
        driver_id: raw.driver_id ? raw.driver_id : '',
        order_products: raw.order_products ? raw.order_products.map(order_product => MapOrderProduct(order_product)) : [],
        order_statuses: raw.order_statuses ? raw.order_statuses.map(order_status => MapOrderStatus(order_status)) : [],
    }
}

export const MapOrderStatus = (raw) => {
    return {
        status: raw.status ? raw.status : '',
        updated_at: raw.updated_at ? raw.updated_at : '',
    }
}

// {
//     "id": 1,
//     "store": {
//         "id": 1,
//         "establishment_id": 1,
//         "address_id": 2,
//         "name": "Salty Steakhouse",
//         "cnpj": "",
//         "img_url": "http://loremflickr.com/100/100/food",
//         "price_type": null,
//         "phone_number": "611.796.5619",
//         "delivery_estimation": "34",
//         "delivery_price": 2,
//         "delivery_min_price": 36,
//         "delivery_zero_price": 95,
//         "delivery_max_distance": 101,
//         "created_at": "2018-09-30T02:20:54.887Z",
//         "updated_at": "2018-09-30T02:20:54.887Z"
//     },
//     "address": {
//         "id": 1,
//         "name": null,
//         "state": "Kentucky",
//         "city": "West Arlinda",
//         "neighborhood": "",
//         "street": "Brendan Throughway",
//         "zipcode": 90308,
//         "number": 709,
//         "complement": "Apt. 226",
//         "reference": "",
//         "lat": "-22.73201",
//         "lng": "-43.3603",
//         "created_at": "2018-09-30T02:20:54.598Z",
//         "updated_at": "2018-09-30T02:20:54.598Z"
//     },
//     "status": null,
//     "order_products": [
//         {
//             "id": 1,
//             "product": {
//                 "id": 1,
//                 "establishment_id": 1,
//                 "name": "Ricotta Stuffed Ravioli",
//                 "descp": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
//                 "img_url": "",
//                 "price": 95,
//                 "stock": 18,
//                 "expiration": "",
//                 "promo_price": 42,
//                 "promo_stock": 49,
//                 "promo_expiration": "",
//                 "created_at": "2018-09-30T02:20:54.958Z",
//                 "updated_at": "2018-09-30T02:20:54.958Z"
//             },
//             "quantity": 1
//         },
//         {
//             "id": 2,
//             "product": {
//                 "id": 1,
//                 "establishment_id": 1,
//                 "name": "Ricotta Stuffed Ravioli",
//                 "descp": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
//                 "img_url": "",
//                 "price": 95,
//                 "stock": 18,
//                 "expiration": "",
//                 "promo_price": 42,
//                 "promo_stock": 49,
//                 "promo_expiration": "",
//                 "created_at": "2018-09-30T02:20:54.958Z",
//                 "updated_at": "2018-09-30T02:20:54.958Z"
//             },
//             "quantity": 2
//         }
//     ]
// }

export const MapUser = (raw) => {
    return {
        id: raw.id ? raw.id : null,
        email: raw.email ? raw.email : '',
        auth_token: raw.auth_token ? raw.auth_token : '',
        name: raw.name ? raw.name : '',
        user_type: raw.user_type ? raw.user_type : '',
        addresses: raw.addresses ? raw.addresses.map(address => MapAddress(address)) : [],
        orders: raw.orders ? raw.orders.map(order => MapOrder(order)) : [],
    }
}

export const MapCategory = (raw) => {
    return {
        id: raw && raw.id ? raw.id : null,
        name: raw && raw.name ? raw.name : '',
        foo: 'category',
        stores: raw && raw.stores ? raw.stores.map(store => MapStore(store)) : []
    }
}

export const MapStore = (raw, full) => {
    return {
        id: raw && raw.id ? raw.id : null,
        name: raw && raw.name ? raw.name : '',
        foo: 'store',
        img_url: raw && raw.img_url ? raw.img_url : '',
        price_type: raw && raw.price_type ? raw.price_type : '$',
        phone_number: raw && raw.phone_number ? raw.phone_number : '',
        delivery_estimation: raw && raw.delivery_estimation ? `${raw.delivery_estimation} mins` : '',
        delivery_price: raw && raw.delivery_price ? raw.delivery_price : '',
        delivery_min_price: raw && raw.delivery_min_price ? raw.delivery_min_price : '',
        delivery_zero_price: raw && raw.delivery_zero_price ? raw.delivery_zero_price : '',
        menus: raw && raw.menus ? raw.menus.map(menu => MapMenu(menu)) : [],
        full: full
    }
}

export const MapMenu = (raw) => {
    return {
        id: raw && raw.id ? raw.id : null,
        name: raw && raw.name ? raw.name : '',
        foo: 'menu',
        products: raw && raw.products ? raw.products.map(product => MapProduct(product)) : []
    }
}

export const MapProduct = (raw) => {
    return {
        id: raw && raw.id ? raw.id : null,
        name: raw && raw.name ? raw.name : '',
        descp: raw && raw.descp ? raw.descp : '',
        foo: 'product',
        current_price: raw ? raw.promo_price < raw.price ? raw.promo_price : raw.price : 0,
        price: raw && raw.price ? raw.price : '',
        price_text: raw && raw.price ? MapPrice(raw.price) : '',
        promo_price: raw && raw.promo_price ? raw.promo_price : '',
        promo_price_text: raw && raw.promo_price ? MapPrice(raw.promo_price) : '',
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
        id: raw && raw.id ? raw.id : null,
        name: raw && raw.name ? raw.name : '',
        foo: 'option',
        min: raw && raw.min ? raw.min : 0,
        max: raw && raw.max ? raw.max : 0,
        sub_options: raw && raw.sub_options ? raw.sub_options.map(sub_option => MapSubOption(sub_option)) : []
    }
}

export const MapSubOption = (raw) => {
    return {
        id: raw && raw.id ? raw.id : null,
        name: raw && raw.name ? raw.name : '',
        foo: 'sub_option',
        price: raw && raw.price ? raw.price : 0,
        price_text: raw && raw.price ? MapPrice(raw.price) : '',
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


export const MapPrice = (price) => {
    return `R$ ${price}`
}

export const MapCart = (cart, address, card) => {
    console.log('MapCart', cart)
    return {
        store_id: cart.store.id,
        address_id: address.id,
        total: getCartTotal(cart.order_products),
        payment_method_id: card.id,
        order_products_attributes: cart.order_products.map(order_product => MapCartOrderProduct(order_product))
    }
}

export const MapOrderProduct = (raw) => {
    console.log('MapOrderProduct', raw)
    return {
        product: raw.product ? MapProduct(raw.product) : {},
        quantity: raw.quantity ? raw.quantity : 0,
        sub_options_txt: raw.sub_options_txt ? raw.sub_options_txt : '',
        sub_options_total: raw.sub_options_total ? raw.sub_options_total : 0,
        product_total: raw.product_total ? raw.product_total : 0,
    }
}

export const MapCartOrderProduct = (raw) => {
    console.log('MapOrderProduct', raw)
    return {
        product_id: raw.product ? raw.product.id : 0,
        quantity: raw.quantity ? raw.quantity : 0,
        sub_options_txt: raw ? getCartProductSubOptionsText(raw) : '',
        sub_options_total: raw ? getCartProductOptionTotal(raw) : 0,
        product_total: raw ? getCartProductTotal(raw) : 0
    }
}

export const MapLocation = (raw) => {
    return {
        latitude: raw.lat ? parseFloat(raw.lat) : raw.latitude ? parseFloat(raw.latitude) : '',
        longitude: raw.lng ? parseFloat(raw.lng) : raw.longitude ? parseFloat(raw.longitude) : '',
        created_at: raw && raw.created_at ? raw.created_at : '',
    }
}

export const MapCard = (raw) => {
    return {
        id: raw && raw.id ? raw.id : '',
        brand: raw && raw.brand ? raw.brand : '',
        description: raw && raw.description ? raw.description : '',
        display_number: raw && raw.display_number ? raw.display_number : '',
    }
}