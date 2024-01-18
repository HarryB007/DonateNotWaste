import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({ title, showBackButton,style }) {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.container,style]}>
            {showBackButton && (
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Image
                    source={require('../assets/images/back.png')}
                    style={styles.backIcon}
                />
                </TouchableOpacity>
            )}
            <Text style={styles.text}>{title}</Text>
            <View style={{ flex: 1 }} />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: windowWidth* 1.2,
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        fontFamily:'Poppins',
        fontWeight: 'bold',
        marginLeft: 45,
    },
    backButton: {
        padding: 10,
    },
    backIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#000',
        marginLeft: 8,
    },
});
