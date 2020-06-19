import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logoSrc from 'assets/logo/Logo_NoBG.png';

const Home = ({ navigation }) => (
  <View style={styles.containerStyle}>
    <View style={styles.logoContainerStyle}>
      <Image
        source={logoSrc}
        style={styles.logoStyle}
      />
    </View>
    <Text style={styles.titleTextStyle}>Home Screen</Text>
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => {
        navigation.navigate('Tester');
      }}
    >
      <Text style={{ fontSize: 15, color: 'white' }}>
        Go to tester
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fefffe',
  },

  buttonStyle: {
    backgroundColor: '#fd7719',
    borderRadius: 10,
    padding: hp(2),
    margin: hp(2),
    color: 'black',
  },

  titleTextStyle: {
    flex: 1,
    fontSize: hp(3),
  },

  logoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    width: wp('50%'),
    height: hp('50%'),
    // borderWidth : 1
  },

  logoStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Home;
