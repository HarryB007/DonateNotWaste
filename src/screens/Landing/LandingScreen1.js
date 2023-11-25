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

const LandingScreen1 = ({navigation}) => {
    const handlePress = () =>{
        navigation.navigate('LandingScreen2');
    }
    const textContent = "You have two hands\none to help yourself,\nthe second to help\n others."
    return (
        <View style={styles.container}>
            <ImageCard imageSource={require('../../assets/images/donate.png')}/>
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
        padding: windowHeight * 0.095,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    text: {
        color: 'white',
        marginBottom: 12,
        fontFamily:'Poppins',
        textAlign:'center',
        fontWeight: 'bold',
        fontSize:20,
    },
});

export default LandingScreen1;
