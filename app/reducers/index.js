import { combineReducers } from 'redux';

import reducers from './reducers';
import { navReducer } from '../navigation/RootNavigation'

const rootReducer = combineReducers({
    reducers,
    nav: navReducer,
});

export default rootReducer;
