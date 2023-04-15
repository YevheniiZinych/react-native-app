import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/config";
import { authSignUpUser } from "../../redux/auth/authOperations";

const widthDimensions = Dimensions.get("window").width;

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export default RegistrationScreen = ({ navigation }) => {
  const [loginState, setLoginState] = useState(initialState);
  const [dimensions, setDimensions] = useState(widthDimensions);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { avatar } = loginState;

  console.log(avatar);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoad(true);
      try {
        if (Platform.OS !== "web") {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasPermission(status === "granted");
          if (status !== "granted") {
            console.log(
              "Sorry, we need camera roll permissions to make this work!"
            );
          }
          setLoad(false);
        }
      } catch (error) {
        setLoad(false);
        setError(error.message);
      }
    })();
  }, []);

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

  const uploadAvatarFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setLoginState((prevState) => ({
          ...prevState,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadAvatarToServer = async () => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();

      const avatarId = Date.now().toString();

      const storageRef = ref(storage, `avatars/${avatarId}`);
      await uploadBytes(storageRef, file);

      const avatarRef = await getDownloadURL(storageRef);

      return avatarRef;
    } catch (error) {
      console.log("Upload avatar to server error", error.message);
    }
  };

  const handleAuthSubmit = async () => {
    try {
      const avatarRef = await uploadAvatarToServer();
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      dispatch(authSignUpUser({ ...loginState, avatar: avatarRef }));
      setLoginState(initialState);
    } catch (error) {
      console.log("Upload avatar to server error", error.message);
    }
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
              <View style={styles.userImage}>
                {avatar && (
                  <Image
                    src={avatar}
                    alt="Your avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 16,
                    }}
                  />
                )}
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={uploadAvatarFromGallery}
                >
                  <AntDesign name="pluscircleo" size={24} color={"#FF6C00"} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>REGISTRATION</Text>
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
                      login: value,
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

  userImage: {
    position: "absolute",
    top: -120,
    right: Dimensions.get("window").width / 2 - 60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },

  btnAdd: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    maxWidth: 25,
  },
});
