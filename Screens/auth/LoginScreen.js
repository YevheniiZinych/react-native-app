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
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const widthDimensions = Dimensions.get("window").width;

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [loginState, setLoginState] = useState(initialState);
  const [dimensions, setDimensions] = useState(widthDimensions);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmitLogin = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(loginState));
    setLoginState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container, width: dimensions }}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/BG-photo.png")}
        >
          <Text style={styles.title}>SIGN IN</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-150}
          >
            <View
              style={{
                ...styles.formLogin,
                paddingBottom: isShowKeyboard ? 0 : 132,
              }}
            >
              <View
                style={{
                  marginTop: 33,
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
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                style={styles.SignInBtn}
                activeOpacity={0.8}
                onPress={handleSubmitLogin}
              >
                <Text style={styles.btnText}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.text}>No account? Registration</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "flex-end",
    // marginBottom: 144,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formLogin: {
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

  SignInBtn: {
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
