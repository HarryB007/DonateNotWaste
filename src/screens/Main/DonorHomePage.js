import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeButton from '../../components/HomeButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DonorHomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.drawerIcon}>
                <MaterialIcons name="menu" size={35} color="black" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome, Donor!</Text>
                <TouchableOpacity onPress={navigation} style={styles.notificationIcon}>
                <Ionicons name="notifications" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.centerContent}>
                <Text style={styles.centerText}>Welcome, Donor!</Text>
            </View>
            <View style={styles.container1}>
                <HomeButton
                    iconName="pencil"
                    placeholder="Post a Donation"
                    navigationTarget="AddPost"
                    navigation={navigation}
                />
                <HomeButton
                    iconName="pencil"
                    placeholder="View Posts"
                    navigationTarget=""
                    navigation={navigation}
                />
                <HomeButton
                    iconName="pencil"
                    placeholder="Donation Request"
                    navigationTarget=""
                    navigation={navigation}
                />
                <HomeButton
                    iconName="pencil"
                    placeholder="Track Delivery"
                    navigationTarget=""
                    navigation={navigation}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container1: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: windowHeight * 0.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    drawerIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    notificationIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontSize: 24,
        marginTop: 20,
        fontFamily:"Poppins-SemiBold",
        color: "#000000",
        height: windowHeight * 0.1,
    },
});

export default DonorHomePage;
