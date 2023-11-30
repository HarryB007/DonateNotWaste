import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ButtonR({ onPress, title }) {
    return (
        <View style={styles.container}>
        <Pressable
            onPress={onPress}
            style={[styles.wrapperCustom]}
            android_ripple={{ color: 'transparent', borderless: false }}>
            <Text style={styles.title}>
                {title}
            </Text>
        </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: windowHeight * -0.11,
    },
    title: {
        color: '#F86D3B',
        fontSize: 28,
        fontWeight: 'bold',
    },
    wrapperCustom: {
        height: windowHeight * 0.085,
        borderRadius: 100,
        width: windowWidth * 0.92,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
});
