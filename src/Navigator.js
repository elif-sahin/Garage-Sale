import { createStackNavigator, createAppNavigator } from 'react-navigation';
const MainNavigator = createStackNavigator({
    Login: { screen: LoginScreen },
    HomeScreen: { screen: HomeScreen },
});