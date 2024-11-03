import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../LoginScreen/LoginScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import SignupScreen from "../SignupScreen/SignupScreen";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

export default function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
