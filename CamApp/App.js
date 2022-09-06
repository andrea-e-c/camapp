import React from "react";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

function App () {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='login'>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export default () => {
    return (
        <NavigationContainer>
            <App />
        </NavigationContainer>
    )
}