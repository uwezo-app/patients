import React from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

export type PsychsListItemProps = {
	psychologist: any;
};

const PsychsListItem = (props: PsychsListItemProps) => {
	const { psychologist } = props;

	const navigation = useNavigation();

	const onClick = () => {
		navigation.navigate("Swipe", { psychologist: psychologist });
	};

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image
						source={{ uri: psychologist.Profile.Image as any }}
						style={styles.avatar}
					/>

					<View style={styles.midContainer}>
						<Text style={styles.username}>
							{psychologist.FirstName + " " + psychologist.LastName}
						</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default PsychsListItem;
