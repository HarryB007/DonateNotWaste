import React from 'react';
import {Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ButtonC ({onPress}){
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                style={[styles.wrapperCustom]}
                android_ripple={{color: 'transparent', borderless: false}}>
                <Icon style={styles.icon} name="arrow-right" size={35} color="#000" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: windowHeight * -0.03,
        justifyContent: 'center',
        paddingTop:windowHeight * 0.06,
    },
    icon: {
        alignSelf: 'center',
    },
    wrapperCustom: {
        height: windowHeight * 0.09,
        borderRadius: 100,
        width: windowWidth * 0.18,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 2,
    },
});
