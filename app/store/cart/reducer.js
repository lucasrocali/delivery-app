import * as actionTypes from './actionType'

const initialState = {
    store: null,
    cart_products: []
}

// const initialState = {
//     "store": {
//         "id": 1,
//         "name": "S1",
//         "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
//         "price_type": "$$",
//         "delivery_estimation": "30 min",
//     },
//     "cart_products": [
//         {
//             "product": {
//                 "id": 1,
//                 "name": "P2",
//                 "descp": "Descp ...",
//                 "foo": "product",
//                 "price": 10,
//                 "promo_price": 10,
//                 "price_text": "R$ 10",
//                 "img_url": "",
//                 "options": [

//                 ]
//             },
//             "quantity": 3,
//             "selected_options": {

//             }
//         },
//         {
//             "product": {
//                 "id": 1,
//                 "name": "P1",
//                 "descp": "",
//                 "foo": "product",
//                 "price": 10,
//                 "promo_price": 10,
//                 "price_text": "R$ 10",
//                 "img_url": "",
//                 "options": [
//                     {
//                         "id": 1,
//                         "name": "O1",
//                         "foo": "option",
//                         "min": 0,
//                         "max": 1,
//                         "sub_options": [
//                             {
//                                 "id": 1,
//                                 "name": "SO1",
//                                 "foo": "sub_option",
//                                 "price": 5,
//                                 "price_text": "R$ 5,00"
//                             }
//                         ]
//                     }
//                 ]
//             },
//             "quantity": 1,
//             "selected_options": {
//                 "1": [
//                     {
//                         "id": 1,
//                         "name": "SO1",
//                         "foo": "sub_option",
//                         "price": 5,
//                         "price_text": "R$ 5,00"
//                     }
//                 ]
//             }
//         }
//     ]
// }

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SELECT_STORE:
            if (state.cart_products.length == 0) {
                const { store } = action
                return {
                    ...state,
                    store
                }
            }
            return state
        case actionTypes.ADD_TO_CART:
            const { store_id, product, quantity, selected_options } = action
            let { cart_products } = state
            cart_products.push({
                product,
                quantity,
                selected_options
            })
            if (state.store.id == store_id) {
                return {
                    ...state,
                    cart_products
                }
            }
            return state

        default:
            return state
    }
}

