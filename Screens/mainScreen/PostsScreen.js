import { StyleSheet } from "react-native";
// import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPost";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/ComentsScreens";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   if (
  //     !route.params ||
  //     route.params.photo === "" ||
  //     route.params.photo === null
  //   ) {
  //     return;
  //   }
  //   setPosts((prevState) => [...prevState, route.params]);
  // }, [route.params]);
  // return (
  //   <View style={style.container}>
  //     <FlatList
  //       data={posts}
  //       keyExtractor={(item, index) => index.toString()}
  //       renderItem={({ item }) => (
  //         <View>
  //           <Image
  //             source={{ uri: item.photo }}
  //             style={{
  //               marginHorizontal: 10,
  //               height: 150,
  //               width: 250,
  //               marginTop: 10,
  //             }}
  //           />
  //         </View>
  //       )}
  //     />
  //   </View>
  // );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
