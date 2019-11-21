import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";


const HomeScreen = () => {

    return (
    <View style={styles.container}>
        <View style={styles.logoContainerStyle}>
            <Image source={require("../../assets/logo/Logo_NoBG.png")} style={styles.logoStyle} />
        </View>
        <Text style={styles.titleTextStyle}>Home Screen</Text>
    </View>
    );

};


const styles = StyleSheet.create({
    
    container : {
        flex : 1,
        alignItems : 'center'
    },
    
    titleTextStyle : {
        flex : 1,
        fontSize : 30
    },

    logoStyle : {
        width : 150,
        height : 150
    },

    logoContainerStyle : {
        flex : 1,
        justifyContent : "center"
    }

});

export default HomeScreen;
