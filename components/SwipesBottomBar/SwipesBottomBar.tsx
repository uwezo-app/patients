import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import WSContext from "../../context/websocket/context";
import AuthContext from "../../context/auth/context";
import ButtonWithSpinner from "../ButtonWithSpinner/ButtonWithSpinner";

export default function SwipesBottomBar({ user }: { user: any }) {
	const navigation = useNavigation();
	const wsContext = React.useContext(WSContext);
	const authContext = React.useContext(AuthContext);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleLikePress = () => {
		navigation.navigate("Psychs");
	};

	const handlePassPress = async () => {
		console.log("Request Sent!");
		if (!isLoading) {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_NATIVE_GC_APP_URL}/chats/pair`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						PatientID: authContext.User.ID,
						PsychologistID: user.ID,
						EncryptionKey: "a%&$$smLPHbGDWW)",
						PairedAt: new Date(Date.now()).toISOString(),
					}),
				}
			);

			if (response.ok && response.status === 201) {
				const data = await response.json();
				console.log(data);
				wsContext.setwsInfoState({
					ConversationID: data.ConversationID,
					UserID: user.ID,
					UserName: user.FirstName + " " + user.LastName,
					UserAvatar: user.Profile.Image,
				});
				console.log(wsContext.wsInfo);
				navigation.navigate("ChatRoom", { connectionInfo: wsContext.wsInfo });
			} else {
				if (response.status === 404)
					Alert.alert("Error!", "Psychologist not connected");
			}
		}
		setIsLoading(false);
	};

	return (
		<View style={styles.container}>
			<View />
			<TouchableOpacity style={styles.button} onPress={handleLikePress}>
				<AntDesign name="back" size={27} color="#64EDCC"></AntDesign>
			</TouchableOpacity>
			<ButtonWithSpinner
				styles={styles.button}
				isSubmitting={isLoading}
				onPress={handlePassPress}
			>
				<Entypo name="message" size={27} color="#12AD2B"></Entypo>
			</ButtonWithSpinner>

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
