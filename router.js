import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, Platform, View } from "react-native";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import CreateScreen from "./Screens/mainScreen/CreateScreen";
import Home from "./Screens/mainScreen/Home";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      barStyle={{ paddingBottom: 34 }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          borderRadius: 15,
          backgroundColor: "#fff",
          ...Platform.select({
            android: {
              height: 65,
              bottom: 0,
            },
            ios: {
              height: 83,
              bottom: 25,
            },
          }),
          ...styles.shadow,
        },
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons
              name="grid"
              size={24}
              color={focused ? color : "rgba(33, 33, 33, 0.8)"}
            />
          ),
        }}
        name="Posts"
        component={Home}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {!focused ? (
                <View
                  style={{
                    width: 70,
                    height: 40,
                    backgroundColor: "#FF6C00",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather name="plus" size={24} color="#ffffff" />
                </View>
              ) : (
                <View
                  style={{
                    width: 70,
                    height: 40,
                    backgroundColor: "#F6F6F6",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={24}
                    color="#DADADA"
                  />
                </View>
              )}
            </View>
          ),
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? color : "rgba(33, 33, 33, 0.8)"}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
