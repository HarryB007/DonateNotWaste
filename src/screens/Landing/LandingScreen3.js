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

const LandingScreen3 = ({navigation}) => {
    const handlePress = () =>{
        navigation.navigate('StartScreen');
    }
    const textContent = "Giving is not just about\nmaking a donation, it is about\nmaking a difference."
    return (
        <View style={styles.container}>
            <ImageCard imageSource={require('../../assets/images/donate-2.png')}/>
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
        backgroundColor:'#fff',
    },
    orangeContainer: {
        backgroundColor: '#F86D3B',
        padding: windowHeight * 0.11,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        color: 'white',
        marginBottom: 12,
        fontFamily:'Poppins-SemiBold',
        width: windowWidth * 0.80,
        textAlign:'center',
        fontSize:18,
    },
});

export default LandingScreen3;