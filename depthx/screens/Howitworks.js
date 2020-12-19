import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import SvgComponent from "../svg/SvgComponent"
import AppText from "../components/AppText"
import HowitworksRow from "../components/HowitworksRow"
import { Ionicons } from "@expo/vector-icons"

export default function Howitworks() {
  return (
    <View style={styles.container}>
        <View style={styles.emptyFlex}>
            <Ionicons 
              name="arrow-back-circle" 
              size={45}
              color="#39B3BB"
              onPress={() => console.log("bruh")}
            />
        </View>
        <View style={styles.titleFlex}>
          <AppText style={styles.text}>How it works</AppText>
        </View>
        <View style={styles.outerFlex}>
          <HowitworksRow svgName="Fist" title="Pause" subtitle="Make a fist to pause the song that is currently playing." />
          <HowitworksRow svgName="Hand" title="Play" subtitle="Make a high-five to play a song that is currenly paused."/>
          <HowitworksRow svgName="Pointer" title="Skip" subtitle="Stick out your index finger to skip to the next song."/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyFlex: {
    flex: 0.12,
    justifyContent: 'flex-end',
    paddingLeft: '5%'
  },
  titleFlex: {
    flex: 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32
  },
  outerFlex: {
    flex: 0.65,
    justifyContent: 'space-between',
  }
});
