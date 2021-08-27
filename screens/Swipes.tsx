import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Alert } from "react-native";
import Constants from "expo-constants";

import SwipesBottomBar from "../components/SwipesBottomBar/SwipesBottomBar";
import Swipes from "../components/Swipes/Swipes";
import { useRoute } from "@react-navigation/native";

export default function SwipeScreen() {
	const swipesRef = useRef(null);
	const route = useRoute();

	function handleLike() {
		console.log("like");
	}

	function handlePass() {
		console.log("pass");
	}

	// function nextUser() {
	// 	const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1;
	// 	setCurrentIndex(nextIndex);
	// }

	function handleLikePress() {
		console.log("Pressed Like");
	}

	function handlePassPress() {
		console.log("Pressed Pass");
	}

	return (
		<View style={styles.container}>
			<View style={styles.swipes}>
				<Swipes
					ref={swipesRef}
					user={route.params?.psychologist}
					handleLike={handleLike}
					handlePass={handlePass}
				/>
			</View>
			<SwipesBottomBar user={route.params?.psychologist} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
	swipes: {
		flex: 1,
		padding: 10,
		paddingTop: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
	},
});
