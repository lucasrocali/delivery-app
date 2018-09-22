/** @format */

import { AppRegistry } from 'react-native';
import App from './app/index.js';
import { name as appName } from './app.json';
console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => App);
