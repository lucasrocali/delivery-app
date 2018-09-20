import { connect } from 'react-redux';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { AppNavigator } from './Routers'

export const navReducer = createNavigationReducer(AppNavigator);

export const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
