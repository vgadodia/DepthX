import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signin from "./screens/Signin"

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Signin />
    </>
  );
}