import { Text, View, StyleSheet } from "react-native";

export default function CreateScreen() {
  return (
    <View style={style.container}>
      <Text>CreateScreen</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
