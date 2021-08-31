import React from "react";
import { StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import SwipeableImage from "../SwipeableImage/SwipeableImage";

type SwipeableProps = {
	user: any;
	swipesRef?: React.LegacyRef<Swipeable> | undefined;
	handleLike: () => void;
	handlePass: () => void;
};

function Swipes(myProp: SwipeableProps) {
	const renderLeftActions = () => {
		return (
			<RectButton style={styles.container}>
				<SwipeableImage user={myProp.user}></SwipeableImage>
			</RectButton>
		);
	};
	const renderRightActions = () => {
		return (
			<RectButton style={styles.container}>
				<SwipeableImage user={myProp.user}></SwipeableImage>
			</RectButton>
		);
	};

	return (
		<Swipeable
			ref={myProp.swipesRef}
			friction={2}
			leftThreshold={40}
			rightThreshold={40}
			renderLeftActions={renderLeftActions}
			renderRightActions={renderRightActions}
			onSwipeableLeftOpen={() => {
				myProp.handleLike();
			}}
			onSwipeableRightOpen={() => {
				myProp.handlePass();
			}}
		>
			<SwipeableImage user={myProp.user} />
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default React.forwardRef((props: SwipeableProps, ref: any) => (
	<Swipes swipesRef={ref} {...props} />
));
