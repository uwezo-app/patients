import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

import PsychsListItem from "../components/PsychsListItem";

export default function Psychologists() {
	const r = useRoute();
	const [psychs, setpsychs] = useState([]);

	React.useEffect(() => {
		async function fetchPsychs() {
			const response = await fetch(
				`${process.env.REACT_NATIVE_GC_APP_URL}/psychologists?category=${r.params?.category}`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
					},
				}
			);

			if (response.ok && response.status === 200) {
				const data = await response.json();
				setpsychs(data);
			} else {
				console.log(response.statusText);
			}
		}

		fetchPsychs();
	}, [psychs]);

	return (
		<View style={styles.container}>
			<FlatList
				style={{ width: "100%" }}
				data={psychs}
				renderItem={({ item }) => <PsychsListItem psychologist={item} />}
				keyExtractor={(item) => item.ID.toString()}
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
