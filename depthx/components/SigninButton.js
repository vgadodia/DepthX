import React from "react";
import { StyleSheet, Platform, TouchableOpacity, View } from "react-native";
import AppLoading from 'expo-app-loading';
import AppText from "./AppText"
import {
  useFonts,
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat';
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons"

export default function SigninButton({ children, style, icon, iconType, handlePress, ...otherProps }) {

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (fontsLoaded){
    return (
      <TouchableOpacity 
        // disabled={!request} 
        onPress={() => {
          handlePress()
          // promptAsync();
        }}
      >
        <View style={styles.googleSignUp}>
          <View style={styles.iconContainer}>
            {iconType === "Material" ? 
              <MaterialCommunityIcons
              name={icon}
              size={40}
              color="#39B3BB"
            />:
            <AntDesign
              name={icon}
              size={35}
              color="#39B3BB"
            />}
          </View>
          <View style={styles.textContainer}>
            <AppText style={styles.text}>{children}</AppText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  else {
    return null
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: '#39B3BB'
  },
  iconContainer: {
    width: 80,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    width: 220,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    left: 10,
  },
  googleSignUp: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#4DBFB8",
    borderRadius: 12,
    height: 65,
  },
});
