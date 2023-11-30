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
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('LoginScreen')}>
                <Text style={styles.text2}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={()=> navigation.navigate('SignUpScreen')}>
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
        width: 320,
        alignSelf: 'center',
        height: 260,
    },
    text1:{
        textAlign: 'center',
        color:'#4D4D4D',
        fontSize:14,
        width: 320,
        alignSelf:'center',
        marginTop: -105,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#F86D3B',
        padding: 12,
        width: 300,
        marginTop:35,
        borderRadius:15,
        alignSelf:'center'
    },
    button2: {
        alignItems: 'center',
        padding: 12,
        width: 300,
        borderColor:'#F86D3B',
        borderWidth:2,
        marginTop:18,
        borderRadius:15,
        alignSelf:'center'
    },
    text2:{
        color:'white',
        fontSize:24,
        fontWeight:'bold'
    },
    text3:{
        color:'#454545',
        fontSize:24,
        // fontWeight:'bold',
    },
    line:{
        borderBottomColor: '#454545',
        borderBottomWidth: 1,
        width: 300,
        alignSelf: 'center',
        marginTop: 45,
        fontWeight:'bold',
    }
});