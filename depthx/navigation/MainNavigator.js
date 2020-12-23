import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Signin from "../screens/Signin";
import Howitworks from "../screens/Howitworks";
import Howitworks2 from "../screens/Howitworks2";
import CameraScreen from "../screens/CameraScreen"

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SigninScreen"
      component={Signin}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="HowitworksScreen"
      component={Howitworks}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="HowitworksScreen2"
      component={Howitworks2}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CameraScreen"
      component={CameraScreen}
      options={{ headerShown: false, gestureEnabled: false }}
    />
  </Stack.Navigator>
);

export default MainNavigator;
