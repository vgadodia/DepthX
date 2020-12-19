import React from "react";
import { StyleSheet, Platform, TouchableOpacity, View } from "react-native";
import AppLoading from 'expo-app-loading';
import AppText from "./AppText"
import {
  useFonts,
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat';
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons"
import Fist from "../svg/Fist"
import Pointer from "../svg/Pointer"
import Hand from "../svg/Hand"

export default function HowitworksRow({ children, style, title, subtitle, svgName, ...otherProps }) {

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (fontsLoaded){
    return (
      <View style={styles.container}>
        <View style={styles.svgFlex}>
          {svgName === "Fist" && <Fist />}
          {svgName === "Pointer" && <Pointer />}
          {svgName === "Hand" && <Hand />}
        </View>
        <View style={styles.textFlex}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subtitle}>{subtitle}</AppText>
        </View>
      </View>
    );
  }
  else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    height: '30%',
    flexDirection: 'row',
  },
  svgFlex: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFlex: {
    flex: 0.5,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#949494',
    paddingTop: 10
  }
});
