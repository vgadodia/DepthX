import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SvgComponent from "../svg/SvgComponent";
import AppText from "../components/AppText";
import SigninButton from "../components/SigninButton";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { AuthSession } from "expo";

const client_id = "b8d9a9d5e7d5441690edf7f26f137b82";
const client_secret = "bab57308756c485097e18fa5561fd00f";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function Signin() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: client_id,
      response_type: "token",
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "app-remote-control",
        "user-modify-playback-state",
        "user-read-playback-state",
        "streaming",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      show_dialog: true,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: "exp://192.168.1.16:19000",
      }),
    },
    discovery
  );

  const handleAccessToken = (code) => {
    fetch("https://reqbin.com/echo/get/json", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      // fetch("https://accounts.spotify.com/api/token", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     client_id: client_id,
      //     client_secret: client_secret,
      //     code: code,
      //     grant_type: "authorization_code",
      //     redirect_uri: makeRedirectUri(),
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data);
      //   });

      // AsyncStorage.setItem("token", JSON.stringify(code));
      // navigation.navigate("PhoneScreen");
    }
    // console.log(makeRedirectUri());
  }, [response]);

  const handleSpotify = () => {
    console.log("Handle spotify");
    promptAsync();
  };

  const handleHowitworks = () => {
    console.log("How it works");
  };

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
        <SigninButton
          handlePress={handleSpotify}
          icon="spotify"
          iconType="Material"
        >
          Sign in with Spotify
        </SigninButton>
        <SigninButton
          handlePress={handleHowitworks}
          icon="questioncircle"
          iconType="AntDesign"
        >
          How it works
        </SigninButton>
      </View>
      <View style={styles.bottomFlex}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyFlex: {
    flex: 0.15,
  },
  svgFlex: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  titleFlex: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 32,
  },
  buttonsFlex: {
    flex: 0.22,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottomFlex: {
    flex: 0.13,
  },
});
