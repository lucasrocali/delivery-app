import * as actionTypes from './actionType'
import { MapUser } from '../../constants/objects'

const initialState = {
    loading: false,
    user: {},
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_LOADING:
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
        default:
            return state
    }
}

