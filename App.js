import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

const loadFonts = async () => {
  await Font.loadAsync({
    "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
  });
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

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
        <ImageBackground
          style={styles.image}
          source={require("./assets/BG-photo.png")}
        >
          {/* <LoginScreen /> */}
          {/* <RegistrationScreen /> */}
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
