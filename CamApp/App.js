import React from "react";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import PrintPhotosPage from "./screens/PrintPhotosPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PrintPhotosPage" component={PrintPhotosPage} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <StripeProvider
        publishableKey={process.env.STRIPE_PUBLISHABLE_KEY}
        merchantIdentifier="merchant.com.camapp"
      >
        <App />
      </StripeProvider>
    </NavigationContainer>
  );
};
