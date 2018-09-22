
import * as actionTypes from './actionType'
import { MapCategory, MapStore } from '../../constants/objects';

const initialState = {
    categories: [],
    current_store: null
}

export default function storesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_CATEGORIES_SUCCESS:
            var categories = action.categories ? action.categories.map(category => MapCategory(category)) : []
            return {
                ...state,
                categories
            }
        case actionTypes.LOAD_STORE:
            return {
                ...state,
                current_store: MapStore(action.store)
            }
        case actionTypes.LOAD_STORE_SUCCESS:
            const store = action.store
            return {
                ...state,
                current_store: {
                    ...state.current_store,
                    ...MapStore(store)
                }
            }
        default:
            return state
    }
}

