import React from 'react';
import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ButtonC = ({text, onPress}) => {
    return (
        <View style={styles.container}>
        <Pressable
            onPress={onPress}
            style={[styles.wrapperCustom]}
            android_ripple={{color: '#CFB997', borderless: false}}>
            {/* <Text style={styles.text}>{text}</Text> */}
        </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: windowHeight * -0.03,
        justifyContent: 'center',
    },
    // text: {
    //     fontSize: 26,
    //     color: '#FAD6A5',
    // },
    wrapperCustom: {
        height: windowHeight * 0.09,
        borderRadius: 100,
        width: windowWidth * 0.18,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#8FE1D7',
    },
});

export default ButtonC;