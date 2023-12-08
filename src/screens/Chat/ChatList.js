import { StyleSheet, Text, View, FlatList, BackHandler, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';

const ChatList = ({ navigation }) => {

    const handleBackPress = () => {
        navigation.goBack();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        }
    })

    const data = [
        {
            id: 1,
            // image: require('../../assets/temp_images/p1.jpg'),
            name: 'Meverik',
            status: 'Offline',
            description: 'Always Available',
        },
        {
            id: 2,
            // image: require('../../assets/temp_images/p2.jpg'),
            name: 'Naim ahmad',
            status: 'Online',
            description: 'Life is short Enjoy it!',
        },
    ]
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Chats</Text>
            </View>
            {/* <Request image={data[0].image} name={data[0].name} location={data[0].location} description={data[0].description} /> */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.containerC}>
                            <View style={styles.child}>
                                <View style={styles.left}>
                                    {/* <Image source={require('../../assets/temp_images/girl.png')} style={styles.image} resizeMode='cover' /> */}
                                    <View style={{ marginLeft: 10, }}>
                                        <Text style={styles.name} numberOfLines={1} >{item.name}</Text>
                                        <Text style={styles.location} numberOfLines={1} >{item.description}</Text>
                                    </View>
                                </View>
                                <Text style={styles.location}>11:59am</Text>
                            </View>
                        </View>
                    )
                }}
                style={styles.list}
            />
        </View>
    )
}

export default ChatList

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        // flex:1
    },
    containerC: {
        width: '100%',
        marginTop: 20,
        height: 80,
        backgroundColor: '#C8C8C8',
        padding: 10,
        borderRadius: 20,
    },
    header: {
        width: '100%',
        height: '8%',
        backgroundColor: '#F86D3B',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#fff',
    },
    logoContainer: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    list: {
        width: '100%',
        height: '90%',
        padding: 10,
    },
    child: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        color: "#000",
    },
    location: {
        color: '#737171',
    },
    left: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    locationBtn: {
        backgroundColor: '#F86D3B',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },

})