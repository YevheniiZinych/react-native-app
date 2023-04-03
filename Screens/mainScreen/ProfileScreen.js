import { Text, View, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={style.container}>
      <Text>ProfileScreen</Text>
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
