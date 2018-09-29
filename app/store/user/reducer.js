import * as actionTypes from './actionType'
import { MapUser, MapAddress } from '../../constants/objects'

const initialState = {
    loading: false,
    user: {},
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
        default:
            return state
    }
}

