import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ChatListItem from "../components/ChatListItem";

import chatRooms from "../data/ChatRooms";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chatRooms.Users}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
