import React from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Categories } from "../../types";
import styles from "./styles";

export type CategoryListItemProps = {
	categories: Categories;
};

const CategoryListItem = (props: CategoryListItemProps) => {
	const { categories } = props;
	const navigation = useNavigation();

	const onClick = () => {
		console.log(categories.category);
		navigation.navigate("Psychs", { category: categories.category });
	};

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image
						source={{ uri: categories.imageUri as any }}
						style={styles.avatar}
					/>

					<View style={styles.midContainer}>
						<Text style={styles.username}>{categories.category}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CategoryListItem;
