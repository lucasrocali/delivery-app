import * as actionTypes from './actionType'
import { MapStore } from '../../constants/objects';
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
                    store: MapStore(store)
                }
            }
            return state
        case actionTypes.ADD_TO_CART:

            const { cart_product } = action
            let { cart_products } = state

            if (cart_product.id > 0) {

                var index = cart_products.map(cp => cp.id).indexOf(cart_product.id);
                cart_products[index] = cart_product

            } else {

                cart_product.id = cart_products.length + 1
                cart_products.push(cart_product)

            }
            return {
                ...state,
                cart_products
            }
        case actionTypes.REMOVE_PRODUCT:
            const { cart_product_id } = action
            return state
        default:
            return state
    }
}

