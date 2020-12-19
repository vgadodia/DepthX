import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

export default function AppText({ children, style, ...otherProps }) {

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_900Black,
  });

  if (fontsLoaded){
    return (
      <Text style={[styles.text, style]} {...otherProps}>
        {children}
      </Text>
    );
  }
  else {
    return <AppLoading />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    // fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontFamily: "Montserrat_400Regular",
  },
});
