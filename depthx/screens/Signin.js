import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SvgComponent from "./SvgComponent"
import AppText from "../components/AppText"
import SigninButton from "../components/SigninButton"

export default function Signin() {
  const handleSpotify = () => {
    console.log("Handle spotify")
  }

  const handleHowitworks = () => {
    console.log("How it works")
  }

  return (
    <View style={styles.container}>
      <View style={styles.emptyFlex}></View>
      <View style={styles.svgFlex}>
        <SvgComponent />
      </View>
      <View style={styles.titleFlex}>
        <AppText style={styles.titleText}>Let’s get started.</AppText>
      </View>
      <View style={styles.buttonsFlex}>
        <SigninButton handlePress={handleSpotify} icon="spotify" iconType="Material">Sign in with Spotify</SigninButton>
        <SigninButton handlePress={handleHowitworks} icon="questioncircle" iconType="AntDesign">How it works</SigninButton>
      </View>
      <View style={styles.bottomFlex}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyFlex: {
    flex: 0.15
  },
  svgFlex: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleFlex: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 32,
  },
  buttonsFlex: {
    flex: 0.22,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  bottomFlex: {
    flex: 0.13,
  }
});
