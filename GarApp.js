import { Text } from 'react-native';
import Home from './src/Home'; //'./works/App1' './application/App'
import Login from './src/Login';
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


const AppNavigator = createStackNavigator({
    LoginScreen: { screen: Login },
    HomeScreen: { screen: Home }
})
const AppContainer = createAppContainer(AppNavigator);
export default class GarApp extends Component {

    render() {
        return (
            <AppContainer />


        );
    }
}

