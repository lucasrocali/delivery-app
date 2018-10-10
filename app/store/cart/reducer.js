import * as actionTypes from './actionType'
import { MapStore, MapOrder, MapLocation } from '../../constants/objects';
const initialState = {
    store: null,
    order_products: [],
    opened_order: null,
    driver_location: null
}

// const initialState = {
//     "store": {
//         "id": 1,
//         "name": "S1",
//         "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
//         "price_type": "$$",
//         "delivery_estimation": "30 min",
//     },
//     "order_products": [
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
        case actionTypes.CLEAR_CART:
            return {
                ...state,
                store: null,
                order_products: []
            }
        case actionTypes.SELECT_STORE:
            if (state.order_products.length == 0) {
                const { store } = action
                return {
                    ...state,
                    store: MapStore(store)
                }
            }
            return state
        case actionTypes.ADD_TO_CART:

            const { order_product, remove } = action
            let { order_products } = state

            if (order_product.id) {

                if (remove) {
                    order_products = order_products.filter(cp => cp.id !== order_product.id);
                } else {

                    var index = order_products.map(cp => cp.id).indexOf(order_product.id);
                    order_products[index] = order_product
                }

            } else {

                order_product.id = order_products.length + 2
                order_products.push(order_product)

            }
            return {
                ...state,
                order_products
            }
        case actionTypes.SET_OPENED_ORDER:
            const { order } = action
            return {
                ...state,
                opened_order: order ? MapOrder(order) : order
            }
        case actionTypes.SYNC_ORDER_SUCCESS:
            const opened_order = state.opened_order
            const f_updated_order = action.response
            return {
                ...state,
                opened_order: MapOrder({
                    ...opened_order,
                    ...f_updated_order
                })
            }
        case actionTypes.SYNC_DRIVER_SUCCESS:
            const driver_location = action.response
            if (driver_location) {
                return {
                    ...state,
                    driver_location: MapLocation(driver_location)
                }
            }
            return state
        default:
            return state
    }
}

