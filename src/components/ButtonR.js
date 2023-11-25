import React from 'react';
import {Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ButtonC ({onPress, title}){
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                style={[styles.wrapperCustom]}
                android_ripple={{color: 'transparent', borderless: false}}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: windowHeight * -0.03,
        justifyContent: 'center',
        paddingTop:windowHeight * 0.07,
    },
    title: {
        alignSelf: 'center',
        color: '#F86D3B',
        fontSize: 26,
        fontWeight: 'bold',
    },
    wrapperCustom: {
        height: windowHeight * 0.085,
        borderRadius: 100,
        width: windowWidth * 0.85,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
});
