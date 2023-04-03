import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  ImageBackground,
  Button,
} from "react-native";

const widthDimensions = Dimensions.get("window").width;

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default RegistrationScreen = ({ navigation }) => {
  const [loginState, setLoginState] = useState(initialState);
  const [dimensions, setDimensions] = useState({
    width: widthDimensions,
  });
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, _ }) => {
        setDimensions({ width: window.width });
      }
    );
    return () => subscription?.remove();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();

    setLoginState(initialState);
    setOnFocus(false);
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../../assets/BG-photo.png")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>REGISTRATION</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.registerForm,
              width: dimensions.width - 16 * 2,
              marginBottom: onFocus ? 20 : 113,
            }}
          >
            <View
              style={{
                marginTop: 33,
              }}
            >
              <TextInput
                value={loginState.name}
                onChangeText={(value) =>
                  setLoginState((prevState) => ({ ...prevState, name: value }))
                }
                onFocus={() => setOnFocus(true)}
                placeholder="Enter your name"
                textAlign={"center"}
                style={styles.input}
              />
            </View>
            <View
              style={{
                marginTop: 16,
              }}
            >
              <TextInput
                value={loginState.email}
                onChangeText={(value) =>
                  setLoginState((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={() => setOnFocus(true)}
                placeholder="Email address"
                textAlign={"center"}
                style={styles.input}
              />
            </View>
            <View
              style={{
                marginTop: 16,
              }}
            >
              <TextInput
                value={loginState.password}
                onChangeText={(value) =>
                  setLoginState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
                onFocus={() => setOnFocus(true)}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              style={styles.registrationBtn}
              activeOpacity={0.8}
              onPress={keyboardHide}
            >
              <Text style={styles.btnText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.text}>Are you have account? Enter</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  registerForm: {
    marginHorizontal: 16,
  },

  title: {
    fontFamily: "Lobster-Regular",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
  },

  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",

    height: 50,
    borderRadius: 8,

    textAlign: "center",
  },

  registrationBtn: {
    height: 51,
    marginTop: 43,

    borderRadius: 100,

    backgroundColor: "#FF6C00",

    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    fontFamily: "Lobster-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },

  text: {
    textAlign: "center",
    marginTop: 16,

    color: "#FF6C00",
  },
});
