import * as actionTypes from './actionType'
import { MapUser, MapAddress } from '../../constants/objects'

const initialState = {
    loading: false,
    user: {},
    search_address: {},
    selected_address_id: 0
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
            return {
                loading: false,
                user: MapUser(user)
            }
        case actionTypes.LOGOUT:
            return {
                user: {},
            }
        case actionTypes.LOAD_ADDRESSES_SUCCESS:
            const addresses = action.response
            return {
                ...state,
                user: {
                    ...state.user,
                    addresses: addresses.map(address => MapAddress(address))
                }
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
        default:
            return state
    }
}
