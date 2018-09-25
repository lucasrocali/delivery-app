import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import storesReducer from './stores/reducer';
import cartReducer from './cart/reducer';
import { navReducer } from '../navigation/RootNavigation';

const rootReducer = combineReducers({
    auth_reducer: authReducer,
    stores_reducer: storesReducer,
    cart_reducer: cartReducer,
    nav: navReducer,
});

export default rootReducer;
