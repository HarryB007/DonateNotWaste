import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import React from 'react';

const LandingPage = ({navigation}) => {
return (
    <View style={styles.parent}>
        <Image
            source={require('../../assets/images/Landing.png')}
            resizeMode="cover"
            style={styles.image}>    
        </Image>
        <View style={styles.line} />
        <View/>
        <View style={{marginTop: 150}}>
            <Text style={styles.text1}>
                Revolutionizing the Fight Against Food Waste and Enabling Communities
                to Thrive!
            </Text>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("LoginScreen")}>
                <Text style={styles.text2}>LogIn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={()=> navigation.navigate("SignUpScreen")}>
                <Text style={styles.text3}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
};

export default LandingPage;

const styles = StyleSheet.create({
    parent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFF',
    },
    image: {
        width: 300,
        alignSelf: 'center',
        height: 300,
    },
    text1:{
        textAlign: 'center',
        color:'#4D4D4D',
        fontSize:16,
        // fontWeight:'bold',
        width: 360,
        alignSelf:'center',
        marginTop:-90,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#F86D3B',
        padding: 18,
        width: 340,
        marginTop:40,
        borderRadius:15,
        alignSelf:'center'
    },
    button2: {
        alignItems: 'center',
        padding: 18,
        width: 340,
        borderColor:'#F86D3B',
        borderWidth:2,
        marginTop:18,
        borderRadius:15,
        alignSelf:'center'
    },
    text2:{
        color:'white',
        fontSize:26,
        fontWeight:'bold'
    },
    text3:{
        color:'#454545',
        fontSize:26,
        fontWeight:'bold',
    },
    line:{
        borderBottomColor: '#454545',
        borderBottomWidth: 1,
        width: 350,
        alignSelf: 'center',
        marginTop: 65,
        fontWeight:'bold',
    }
});