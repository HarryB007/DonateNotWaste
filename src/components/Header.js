import React from 'react';
import { View,
    Text, 
    StyleSheet, 
    Dimensions 
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({title}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:25,
    },
    text: {
        fontSize: 26,
        color: '#000',
        fontWeight: 'bold',
        fontFamily:'Poppins',
    },
});

