import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({ title, showBackButton }) {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
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
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 26,
        color: '#000',
        fontFamily:'Poppins',
        fontWeight: 'bold',
        marginLeft: 60,
    },
    backButton: {
        padding: 10,
    },
    backIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#000',
        marginLeft: 15,
    },
});
