import { combineReducers } from 'redux';

import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import storesReducer from './stores/reducer';
import cartReducer from './cart/reducer';
import { navReducer } from '../navigation/RootNavigation';

const rootReducer = combineReducers({
    app_reducer: appReducer,
    auth_reducer: authReducer,
    stores_reducer: storesReducer,
    cart_reducer: cartReducer,
    nav: navReducer,
});

export default rootReducer;
