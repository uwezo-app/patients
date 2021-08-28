import React from "react";
import {
	Text,
	ActivityIndicator,
	GestureResponderEvent,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

interface ButtonWithSpinnerProps {
	children?: JSX.Element;
	isSubmitting: boolean;
	styles?: any;
	onPress: (event: GestureResponderEvent) => void;
}

export default (props: ButtonWithSpinnerProps) => {
	return (
		<View>
			<TouchableOpacity
				style={props.styles ? props.styles : styles.commandButton}
				disabled={props.isSubmitting}
				onPress={props.onPress}
			>
				{props.isSubmitting ? (
					<ActivityIndicator animating={props.isSubmitting} color="#00ff00" />
				) : props.children ? (
					props.children
				) : (
					<Text style={styles.panelButtonTitle}>Submit</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	commandButton: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: "#12AD2B",
		alignItems: "center",
		marginTop: 10,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: "bold",
		color: "white",
	},
});
