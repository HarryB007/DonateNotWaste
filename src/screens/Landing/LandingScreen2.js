import React from 'react';
import { View,
    StyleSheet, 
    Text, 
    Dimensions 
} from 'react-native';
import ImageCard from '../../components/ImageCard';
import ButtonC from '../../components/ButtonC';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LandingScreen2 = ({navigation}) => {
    const handlePress = () =>{
        navigation.navigate('LandingScreen3');
    }
    const textContent = "If you can't feed a hundred people\nthen just feed one. "
    return (
        <View style={styles.container}>
            <ImageCard imageSource={require('../../assets/images/donate-1.png')}/>
            <View style={styles.orangeContainer}>
                <Text style={styles.text}>{textContent}</Text>
                <ButtonC onPress={handlePress}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    orangeContainer: {
        backgroundColor: '#F86D3B',
        padding: windowHeight * 0.125,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        color: 'white',
        marginBottom: 12,
        fontFamily:'Poppins',
        width: windowWidth * 0.85,
        textAlign:'center',
        fontWeight: 'bold',
        fontSize:20,
    },
});

export default LandingScreen2;