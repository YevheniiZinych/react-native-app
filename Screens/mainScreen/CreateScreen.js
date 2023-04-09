import * as Location from "expo-location";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";

const initialState = {
  placeName: "",
  location: "",
  name: "",
  photo: null,
  comments: 0,
  id: "",
};

export default function CreateScreen({ navigation }) {
  const [photoRef, setPhotoRef] = useState(null);
  const [prevPhoto, setPrevPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [photoSend, setPhotoSend] = useState("");
  const [state, setState] = useState(initialState);
  const { location, name, photo, placeName } = state;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const postId = Date.now().toString();
    try {
      const photo = await photoRef.takePictureAsync();
      setState((prevState) => ({
        ...prevState,
        photo,
        id: postId,
      }));
      let location = await Location.getCurrentPositionAsync({});
      setState((prevState) => ({
        ...prevState,
        location,
      }));
      // console.log("latitude", location.coords.latitude);
      // console.log("longitude", location.coords.longitude);

      const { uri } = photo;
      setPrevPhoto(uri);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    navigation.navigate("DefaultScreen", { photoSend });
  }, [photoSend]);

  const sendPhoto = () => {
    setPhotoSend(prevPhoto);
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const onFocus = () => {
    setIsShowKeyboard(true);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={style.container}>
        <Camera style={style.camera} ref={setPhotoRef}>
          {prevPhoto && (
            <View style={style.photoContainer}>
              <Image
                source={{ uri: prevPhoto }}
                style={{
                  height: 150,
                  width: 150,
                }}
              />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto} style={style.snapContainer}>
            <Text style={style.snap}>SNAP</Text>
          </TouchableOpacity>
        </Camera>
        {photo ? (
          <Text style={style.textBottom}>Редактировать фото</Text>
        ) : (
          <Text style={style.textBottom}>Загрузите фото</Text>
        )}
        <View style={style.form}>
          <TextInput
            style={style.input}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, name: value }))
            }
            value={name}
            placeholder="Название..."
            placeholderColor="#BDBDBD"
            onFocus={onFocus}
          />

          <TextInput
            style={{ ...style.input, marginBottom: 32 }}
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                placeName: value,
              }))
            }
            value={placeName}
            placeholder="Местность..."
            onFocus={onFocus}
          />
        </View>
        <TouchableOpacity onPress={sendPhoto} style={style.sendBtn}>
          <Text>SEND</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    height: "40%",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  snapContainer: {
    marginBottom: 30,
    width: 70,
    height: 70,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#0BD7F3",
    borderRadius: 50,
  },

  snap: {
    color: "#fff",
  },

  photoContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    borderColor: "#fff",
    borderWidth: 1,
  },

  sendBtn: {
    marginLeft: 145,
    marginTop: 10,
    width: 110,
    height: 50,

    backgroundColor: "#0BD7F3",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#0BD7F3",
    borderRadius: 50,
  },

  textBottom: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 48,
  },

  form: {
    width: "100%",
  },

  input: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: "#E8E8E8",
    backgroundColor: "#ffffff",
    marginBottom: 47,
    color: "#212121",
    fontSize: 16,
  },
});
