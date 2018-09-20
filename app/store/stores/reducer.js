
import * as actionTypes from './actionType'

const initialState = {
    categories: []
}

export default function storesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_CATEGORIES_SUCCESS:
            var categories = action.response ? action.response : []
            return {
                ...state,
                categories
            }
        default:
            return state
    }
}

