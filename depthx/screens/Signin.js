import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SvgComponent from "../svg/SvgComponent";
import AppText from "../components/AppText";
import SigninButton from "../components/SigninButton";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Haptics from 'expo-haptics';

import { AuthSession } from "expo";

// console.disableYellowBox = true;

const client_id = "b8d9a9d5e7d5441690edf7f26f137b82";
const client_secret = "bab57308756c485097e18fa5561fd00f";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function Signin({navigation}) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: client_id,
      response_type: "code",
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
    var details = {
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: makeRedirectUri(),
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          console.log(data.access_token);
        }
      });
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleAccessToken(code);

      // AsyncStorage.setItem("token", JSON.stringify(code));
      // navigation.navigate("PhoneScreen");
    }
  }, [response]);

  const handleSpotify = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    promptAsync();
  };

  const handleHowitworks = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    navigation.navigate("HowitworksScreen")
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
    fontSize: 24,
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
