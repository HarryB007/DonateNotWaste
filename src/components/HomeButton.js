import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeButton = ({ iconName, placeholder, navigationTarget,navigation}) => {    
    return (
        <View>
            <View style={styles.button1}>
                <TouchableHighlight
                style={styles.OneButton}
                onPress={() => navigation.navigate(navigationTarget)}
                underlayColor="#ebf0f0"
                >
                <>
                    <View style={styles.child}>
                        <View style={styles.circle}>
                            {iconName && (
                            <Octicons
                                name={iconName}
                                size={23}
                                color="black"
                            />
                            )}
                        </View>
                        <Text style={styles.optionTitle}>{placeholder}</Text>
                    </View>
                    <Ionicons
                    name="chevron-forward-outline"
                    size={30}
                    color="#F86D3B"
                    />
                </>
                </TouchableHighlight>
            </View>
        </View>
        );
    };

    export default HomeButton;
    const styles = StyleSheet.create({
        button1: {
            alignItems: 'center',
            width: windowWidth * 1,
        },
        circle: {
            backgroundColor: '#F86D3B',
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        OneButton: {
            width: windowWidth * 0.85,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            borderRadius: 20,
            elevation: 7,
            paddingHorizontal: 10,
        },
        child: {
            width: '60%',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
        },
        optionTitle: {
            fontSize: 17,
            color: '#000',
            marginLeft:10,
        },
    });
    