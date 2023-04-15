import * as Font from "expo-font";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";

import Main from "./Components/Main/Main";
import { store } from "./redux/store";

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
    <View style={styles.container}>
      <Provider store={store}>
        <Main />
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
