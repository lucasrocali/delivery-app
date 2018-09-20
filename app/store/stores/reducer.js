
import * as actionTypes from './actionType'

const initialState = {
    foo: {}
}

export default function storesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_CATEGORIES:

            return state
        default:
            return state
    }
}

