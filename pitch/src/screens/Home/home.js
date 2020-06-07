import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Home = () => {
	return (
		<View style={styles.containerStyle}>
			<View style={styles.logoContainerStyle}>
				<Image
					source={require("assets/logo/Logo_NoBG.png")}
					style={styles.logoStyle}
				/>
			</View>
			<Text style={styles.titleTextStyle}>Home Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#fefffe",
	},

	titleTextStyle: {
		flex: 1,
		fontSize: hp(3),
	},

	logoContainerStyle: {
		flex: 1,
		justifyContent: "center",
		width: wp("50%"),
		height: hp("50%"),
		// borderWidth : 1
	},

	logoStyle: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
});

export default Home;
