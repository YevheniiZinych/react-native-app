import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const signOut = () => {
    console.log("exit");
    dispatch(authSignOutUser());
  };
  return (
    <View style={style.container}>
      <Text>ProfileScreen</Text>
      <TouchableOpacity style={style.logOutIcon} onPress={signOut}>
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logOutIcon: {
    width: 24,
    height: 24,
    marginLeft: "auto",
    marginRight: 16,
    marginTop: 16,
  },
});
