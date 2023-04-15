import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
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
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { selectAuth } from "../../redux/auth/authSelectors";
import { db, storage } from "../../firebase/config";

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
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const { userId, userName } = useSelector(selectAuth);
  const { location, name, photo, placeName } = state;

  // console.log(photo);
  // console.log(location);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log("status lib", status);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const postId = Date.now().toString();
    try {
      const { uri } = await photoRef.takePictureAsync();
      setState((prevState) => ({
        ...prevState,
        photo: uri,
        id: postId,
      }));
      let location = await Location.getCurrentPositionAsync({});
      setState((prevState) => ({
        ...prevState,
        location,
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);

      const file = await response.blob();
      const id = Date.now().toString();

      const pathReference = ref(storage, `images/${id}`);

      await uploadBytes(pathReference, file);

      const urlRef = await getDownloadURL(pathReference);

      return urlRef;
    } catch (error) {
      console.error(error.message);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const uploadPhoto = await uploadPhotoToServer();

      const collectionRef = doc(collection(db, "posts"));

      await setDoc(collectionRef, {
        photo: uploadPhoto,
        location,
        placeName: placeName,
        comments: 0,
        userId,
        userName,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log("upload post", error);
    }
  };

  const sendPhoto = () => {
    uploadPostToServer();

    navigation.navigate("DefaultScreen");
    setState(initialState);
  };

  const onFocus = () => {
    setIsShowKeyboard(true);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={style.container}>
        <Camera style={style.camera} ref={setPhotoRef}>
          {photo && (
            <View style={style.photoContainer}>
              <Image
                source={{ uri: photo }}
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
          <Text style={style.textBottom}>Edit photo</Text>
        ) : (
          <Text style={style.textBottom}>Download photo</Text>
        )}
        <View style={style.form}>
          <TextInput
            style={style.input}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, name: value }))
            }
            value={name}
            placeholder="Sign your photo"
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
            placeholder="Name your location"
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
    marginHorizontal: 16,
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
    marginTop: 10,
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
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderBottomColor: "#E8E8E8",
    marginBottom: 47,
    color: "#212121",
    fontSize: 16,
  },
});
