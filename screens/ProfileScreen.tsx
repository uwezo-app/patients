import React from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Title, Text } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../context/auth/context";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const authContext = React.useContext(AuthContext);

  const onPress = () => {
    navigation.navigate("EditProfileScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {authContext.User.NickName}
            </Title>
            <TouchableOpacity style={styles.row} onPress={onPress}>
              <AntDesign name="edit" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 10 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
  },
});
