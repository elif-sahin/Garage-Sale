/**
 * @format
 */

import { AppRegistry, StyleSheet, Text, View, Navigator } from 'react-native';
import GarApp from './src/Home'; //'./works/App1' './application/App'
import Login from "./src/Login";
import { name as appName } from './app.json';



AppRegistry.registerComponent(appName, () => GarApp);
