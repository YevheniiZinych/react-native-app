import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

export default function CreateScreen({ navigation }) {
  const [photoRef, setPhotoRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  console.log(photo);

  const takePhoto = async () => {
    const photo = await photoRef.takePictureAsync();

    const { uri } = photo;

    setPhoto(uri);
  };

  const sendPhoto = () => {
    // console.log(navigation);
    navigation.navigate("Posts", { photo });
  };

  return (
    <View style={style.container}>
      <Camera style={style.camera} ref={setPhotoRef}>
        {photo && (
          <View style={style.photoContainer}>
            <Image
              source={{ uri: photo }}
              style={{
                height: 250,
                width: 250,
              }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={style.snapContainer}>
          <Text style={style.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity onPress={sendPhoto} style={style.sendBtn}>
        <Text style={style}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    height: "80%",
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
});
