import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Donate
                <Text style={styles.text1}>
                    NotWaste
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:windowWidth*0.09,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        color: '#717B56',
        fontWeight: 'bold',
        fontFamily:'Poppins',
    },
    text1: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        fontFamily:'Poppins',
    }
});

