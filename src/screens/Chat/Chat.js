import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import LoginContext from '../../context/Context';

const Chat = ({route}) => {

    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);

    const { user } = useContext(LoginContext);
    console.log(user.uid, route.params.id)

    useEffect(() => {
        navigation.setOptions({
            tabBarstyle: {display: 'none'}
        })
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = messages => {
        console.log(messages)
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: route.params.id,
                }}
                renderBubble={props => {
                    return <Bubble {...props} wrapperStyle={{
                        right: {
                            backgroundColor: '#F86D3B',
                        },
                    }} />
                }}
            />
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})