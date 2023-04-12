import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  TouchableWithoutFeedback,
} from "react-native";
import { authSignUpUser } from "../../redux/auth/authOperations";

const widthDimensions = Dimensions.get("window").width;

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default RegistrationScreen = ({ navigation }) => {
  const [loginState, setLoginState] = useState(initialState);
  const [dimensions, setDimensions] = useState(widthDimensions);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();
  // const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };

    const listener = Dimensions.addEventListener("change", onChange);
    return () => {
      listener.remove();
    };
  }, []);

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener(
  //     "change",
  //     ({ window, screen }) => {
  //       setDimensions({ width: window.width, screen });
  //     }
  //   );
  //   return () => subscription?.remove();
  // }, []);

  const handleAuthSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(loginState));
    setLoginState(initialState);
    // setOnFocus(false);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container, width: dimensions }}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/BG-photo.png")}
        >
          <Text style={styles.title}>REGISTRATION</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-290}
          >
            <View
              style={{
                ...styles.registerForm,
                paddingBottom: isShowKeyboard ? 0 : 132,
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
                    setLoginState((prevState) => ({
                      ...prevState,
                      name: value,
                    }))
                  }
                  onFocus={() => setIsShowKeyboard(true)}
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
                    setLoginState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  onFocus={() => setIsShowKeyboard(true)}
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
                  onFocus={() => setIsShowKeyboard(true)}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                style={styles.registrationBtn}
                activeOpacity={0.8}
                onPress={handleAuthSubmit}
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
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
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
