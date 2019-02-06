
import * as actionTypes from './actionType'
import { MapCategory, MapStore } from '../../constants/objects';

const initialState = {
    loading: false,
    categories: [],
    selected_category_id: null,
    searchingText: '',
    stores: [],
    current_store: null,
}

export default function storesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_STORES:
            const { category_id, searchingText } = action
            return {
                ...state,
                selected_category_id: category_id,
                searchingText
            }
        case actionTypes.STORES_LOADING:
            const { loading } = action
            return {
                ...state,
                loading
            }
        case actionTypes.LOAD_CATEGORIES_SUCCESS:
            var categories = action.categories ? action.categories.map(category => MapCategory(category)) : []
            return {
                ...state,
                loading: false,
                categories
            }
        case actionTypes.LOAD_STORES_SUCCESS:
            const stores = action.stores ? action.stores.map(store => MapStore(store)) : []
            return {
                ...state,
                loading: false,
                stores
            }
        case actionTypes.LOAD_STORE:
            if (!state.current_store || (state.current_store.id != action.store.id)) {
                return {
                    ...state,
                    current_store: MapStore(action.store, false)
                }
            }
            return state
        case actionTypes.LOAD_STORE_SUCCESS:
            const store = action.store
            return {
                ...state,
                loading: false,
                current_store: {
                    ...state.current_store,
                    ...MapStore(store, true)
                }
            }
        default:
            return state
    }
}

