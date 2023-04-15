import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  SafeAreaView,
  FlatList,
  Item,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  selectUserName,
  selectUserId,
  selectAvatar,
} from "../../redux/auth/authSelectors";
import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const [text, setText] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comments, setComments] = useState([]);

  const { postId, photo } = route.params;

  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);

  const sendComment = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    try {
      const dbRef = doc(db, "posts", postId);

      console.log(dbRef);
      const commentUploadObject = {
        text: text,
        date: date,
        time: time,
        userId: userId,
        userName: userName,
      };
      await updateDoc(dbRef, { comments: comments.length + 1 });
      await addDoc(collection(dbRef, "comments"), commentUploadObject);
    } catch (error) {
      console.log("SendComment Error", error.message);
    }
  };

  const createPost = () => {
    sendComment();
    setText("");

    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const fetchComments = async () => {
    try {
      const dbRef = doc(db, "posts", postId);
      onSnapshot(collection(dbRef, "comments"), (docSnap) => {
        const allCommSnap = docSnap.docs;
        const allComm = allCommSnap.map((doc) => ({ ...doc.data() }));
        setComments(allComm);
      });
    } catch (error) {
      console.log("fetchComments Error", error.message);
      setError(`fetchComments Error ${error.message}`);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={style.container}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={{ uri: photo }} />
        </View>
        <SafeAreaView>
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View style={style.commentContainer}>
                <Text> {item.text} </Text>
                <Text style={style.commentTime}>
                  {item.date} | {item.time}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <View style={style.form}>
          <TextInput
            style={{ ...style.input }}
            onChangeText={setText}
            value={text}
            placeholder="Your comment"
          />
          <TouchableOpacity style={style.sendBtn} onPress={createPost}>
            <MaterialCommunityIcons
              name="send-circle"
              size={38}
              color="#FF6C00"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 16,
  },

  sendBtn: {
    position: "absolute",
    top: 6,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "100%",
  },

  input: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
  },

  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240,
    width: "100%",
    marginTop: 32,
  },

  image: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },

  commentContainer: {
    padding: 16,
    marginBottom: 24,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    maxWidth: Dimensions.get("window").width - 76,
  },
  commentTime: {
    borderRightColor: "#BDBDBD",
    paddingRight: 2,
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
});

export default CommentsScreen;
