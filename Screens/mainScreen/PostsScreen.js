import { Text, View, StyleSheet } from "react-native";

export default function PostsScreen({ route }) {
  console.log(route);
  return (
    <View style={style.container}>
      <Text>PostsScreen</Text>
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
