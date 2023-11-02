import { View,
    Text,
    Image,
    Dimensions,
    StyleSheet 
} from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageCard = () => {
    return (
    <View style={styles.container}>
        <Image
            source={require('../assets/images/donate.png')}
            style={{
                height: windowHeight*0.38, 
                width: windowWidth * 0.85,
                borderRadius: 40,
            }}
            resizeMode="cover"
        />
        <Text style={styles.text}>
            You have two hands, {'\n'}
            one to help yourself,{'\n'}
            the second to help others.
        </Text>    
    </View>
    )
}

export default ImageCard;

const styles = StyleSheet.create({
    container: {
        padding:windowWidth*0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 17.6,
        color: 'black',
        fontWeight: 'bold',
        fontFamily:'Poppins',
        textAlign:'center',
        padding: windowWidth*0.1,
    }
});    