/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App'; //'./works/App1' './application/App'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
