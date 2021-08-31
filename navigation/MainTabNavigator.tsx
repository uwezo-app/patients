/**
 * Learn more about createMainTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Category from "../screens/Category";

import ChatScreen from "../screens/ChatScreen";
import { MainTabParamList, ChatParamList, CategoryParamList } from "../types";

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <MainTab.Navigator initialRouteName="Chats">
      <MainTab.Screen name="Chats" component={ChatScreen} />
      <MainTab.Screen name="Psychologists" component={Category} />
    </MainTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ChatStack = createStackNavigator<ChatParamList>();

function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
    </ChatStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<CategoryParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name="Category" component={Category} />
    </TabTwoStack.Navigator>
  );
}
