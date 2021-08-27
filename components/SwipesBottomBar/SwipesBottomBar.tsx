import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import WSContext from "../../context/websocket/context";

export default function SwipesBottomBar({ user }: { user: any }) {
	const navigation = useNavigation();
	const wSContext = React.useContext(WSContext);

	const handleLikePress = () => {
		navigation.navigate("Psychs");
	};
	const handlePassPress = () => {
		console.log("Request Sent!");
		wSContext.send(
			JSON.stringify({
				Flag: "connectMe",
				RecipientID: user.ID,
			})
		);
	};
	return (
		<View style={styles.container}>
			<View />
			<TouchableOpacity style={styles.button} onPress={handleLikePress}>
				<AntDesign name="back" size={27} color="#64EDCC"></AntDesign>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={handlePassPress}>
				<Entypo name="message" size={27} color="#12AD2B"></Entypo>
			</TouchableOpacity>
			<View />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 75,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	button: {
		width: 50,
		height: 50,
		backgroundColor: "white",
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.15,
		shadowRadius: 6.46,
		elevation: 9,
	},
});
