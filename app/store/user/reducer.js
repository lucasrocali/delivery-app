import * as actionTypes from './actionType'
import { MapUser, MapAddress, MapOrder, MapCard } from '../../constants/objects'

const initialState = {
    loading: false,
    user: {},
    search_address: {},
    selected_address_id: '',
    selected_order_id: '',
    selected_card_id: ''
}

const getLastAddressId = (addresses) => {
    return addresses && addresses.length > 0 ? addresses[addresses.length - 1].id : 0
}

const getLastCardId = (cards) => {
    return cards && cards.length > 0 ? cards[cards.length - 1].id : 0
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USER_LOADING:
            const { loading } = action
            return {
                ...state,
                loading
            }
        case actionTypes.AUTHENTICATE_SUCCESS:
            const { user } = action
            const mapped_user = MapUser(user)
            const first_address_id = getLastAddressId(mapped_user.addresses)
            return {
                ...state,
                loading: false,
                user: mapped_user,
                selected_address_id: first_address_id
            }
        case actionTypes.LOGOUT:
            return {
                user: {},
            }
        case actionTypes.LOAD_ORDERS_SUCCESS:
            const orders = action.response
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    orders: orders.map(order => MapOrder(order))
                },
            }
        case actionTypes.LOAD_ORDER_SUCCESS:
            const updated_order = action.response
            const updated_orders = state.user.orders.map(order => {
                if (order.id == updated_order.id) {
                    return MapOrder(updated_order)
                }
                return order
            })
            return {
                ...state,
                user: {
                    ...state.user,
                    orders: updated_orders
                }
            }
        case actionTypes.LOAD_ADDRESSES_SUCCESS:
            const addresses = action.response
            const sel_address_id = getLastAddressId(addresses)
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    addresses: addresses.map(address => MapAddress(address))
                },
                selected_address_id: sel_address_id
            }
        case actionTypes.LOAD_ADDRESS_INFO_SUCCESS:
            const address = action.response
            return {
                ...state,
                search_address: MapAddress(address)
            }
        case actionTypes.SELECTED_ADDRESS:
            const { address_id } = action
            return {
                ...state,
                selected_address_id: address_id
            }
        case actionTypes.SELECTED_ORDER:
            const { selected_order_id } = action
            return {
                ...state,
                selected_order_id
            }
        case actionTypes.LOAD_CARDS_SUCCESS:
            const cards = action.response
            const sel_card_id = state.selected_card_id != '' ? state.selected_card_id : getLastCardId(cards)
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    cards: cards.map(card => MapCard(card))
                },
                selected_card_id: sel_card_id
            }
        case actionTypes.SELECTED_CARD:
            const { card_id } = action
            return {
                ...state,
                selected_card_id: card_id
            }
        default:
            return state
    }
}

