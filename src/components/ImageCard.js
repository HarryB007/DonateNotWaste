import { View,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageCard = ({imageSource}) => {
    return (
        <View style={styles.imageContainer}>
        <Image
            source={imageSource}
            style={{ 
                resizeMode: 'cover',
                height: windowHeight * 0.52,
                width: windowWidth * 0.88,
                borderRadius: 50,
            }}
        />
    </View>
    );
};

export default ImageCard;

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
