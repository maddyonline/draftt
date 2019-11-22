import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import tcomb from 'tcomb-form-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons'



// tcomb form library vars
const Form = tcomb.form.Form;

const signup = tcomb.struct({
    name : tcomb.String,
    email : tcomb.String,
    password : tcomb.String,
    confirmpassword : tcomb.String
});

const options = {
    auto : 'placeholders',
    fields : {
        email : {
            placeholder : 'Email Address',
            label : null
        },
        password : {
            placeholder : 'Password',
            label : null,
            password : true,
            secureTextEntry: true
        },
        confirmpassword : {
            placeholder : 'Confirm Password',
            label : null,
            password : true,
            secureTextEntry: true
        }
    }
};


const SignupScreen = () => {
    return (
        <View style={styles.containerStyle}>

            <View style={styles.backArrowStyle}>
                <TouchableOpacity style={styles.arrowButtonStyle}>
                    <AntDesign name="arrowleft" size={40} color="#fefffe" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.logoContainerStyle}>
                <Image source={require('../../assets/logo/Logo_NoBG.png')} style={styles.logoStyle} />
            </View>

            <View style={styles.outerFormContainerStyle}>
                <Text style={styles.formHeaderStyle}>Sign up</Text>
                <View>
                    <Form type={signup} options={options} />
                </View>
            </View>

            <View style={styles.confirmSignupStyle}>
                <TouchableOpacity style={styles.arrowButtonStyle}>
                    <AntDesign name="arrowright" size={40} color="#fefffe" />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    containerStyle : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor : '#fefffe',
        borderWidth : 1
    },

    backArrowStyle : {
        flex : 1,
        alignSelf : 'flex-start',
        paddingTop : hp(5),
        paddingHorizontal : wp(3),
        // borderWidth : 1
    },

    arrowButtonStyle : {
        backgroundColor : '#fd7719',
        borderRadius : 100,
        width : wp(15),
        height : wp(15),
        alignItems : 'center',
        justifyContent : 'center'
    },

    logoContainerStyle : {
        flex : 2,
        justifyContent : "center",
        alignItems : 'center',
        width : wp('50%'),
        height : hp('50%'),
        // borderWidth : 1
    },

    logoStyle : {
        flex : 1,
        width : '100%' ,
        height : '100%',
        resizeMode : 'contain'
    },

    outerFormContainerStyle : {
        flex : 5,
        width : wp(80),
        // borderWidth : 1
    },

    formHeaderStyle : {
        fontSize : hp(4),
        alignSelf : 'center',
        padding : hp(5)
    },

    confirmSignupStyle : {
        flex : 1,
        alignItems : 'flex-end',
        paddingHorizontal : wp(3),
        alignSelf : 'flex-end'
    }


});


export default SignupScreen;