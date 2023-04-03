import "react-native-gesture-handler";
import * as Font from "expo-font";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useRoute } from "./router";

const loadFonts = async () => {
  await Font.loadAsync({
    "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
  });
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const routing = useRoute(true);

  if (!isLoading) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsLoading(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <NavigationContainer>{routing}</NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
