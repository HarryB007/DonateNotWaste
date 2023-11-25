import React from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    Dimensions 
} from 'react-native';
import ButtonR from '../../components/ButtonR';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StartScreen = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('LandingPage');
    };
    
    const textContent = "Waste Not, Donate!";
    
    return (
        <View style={styles.container}>
            <View style={styles.logoSpace}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.orangeContainer}>
                <Text style={styles.text}>{textContent}</Text>
                <ButtonR onPress={handlePress} title={'Get Started!'}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoSpace:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50,
        marginBottom: 70,
    },
    logo: {
        width: 300,
        height: 300,
    },
    orangeContainer: {
        backgroundColor: '#F86D3B',
        padding: windowHeight * 0.18,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        color: 'white',
        marginBottom: 60,
        fontFamily:'Poppins',
        width: windowWidth * 0.85,
        textAlign:'center',
        fontWeight: 'bold',
        fontSize:32,
    },
});
