import React, { Component } from 'react';
import { View, Text } from 'react-native';



export default class Login extends Component {

    render() {
        return (
            <View>
                <Text>al sana login</Text>
                <Text onPress={() => this.props.navigation.navigate("HomeScreen")} title="Home">Go Home</Text>
            </View >
        );

    }
}