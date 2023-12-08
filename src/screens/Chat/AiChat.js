import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import axios from 'axios'; 
import { REACT_APP_DEV_MODE } from "@env"
import {View,Text,StyleSheet, FlatList, Dimensions, Image, TextInput, TouchableOpacity} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const logo = require('../../assets/images/robot.png');
const YOUR_API_KEY = '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'

export default function AiChat(props) {
  const [messages, setMessages] = useState([]);

  const firstMessage = () =>{
    setMessages([
      {
        _id: 1,
        text: 'Hello! Welcome to the help and support section,  I am your chef, Please tell how me can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot GPT',
          avatar: logo,
        },
      },
    ]);
  };
  useEffect(() => {
    firstMessage();
  }, []);


  const handleSend = async (newMessages = []) => {
    try{
      const userMessage = newMessages[0];

      setMessages(previousMessages => GiftedChat.append(previousMessages,userMessage));
      const messageText = userMessage.text.toLowerCase();
      const keywords = ['recipe', 'food', 'diet', 'method', 'menu'];
      
      if(!keywords.some(keyword => messageText.includes(keyword))){
        const botMessage = {
          _id : new Date().getTime()+1,
          text : 'Please enter food related queries!',
          createdAt :new Date(),
          user : {
            _id : 2,
            name : 'food bot',
            avatar: logo,
            color:'black'
          }
        };
        setMessages(previousMessages=>GiftedChat.append(previousMessages,botMessage));
        return;
      }
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: `get me a recipe for ${messageText}`,
        max_tokens: 1200,
        temperature: 0.2,
        n:1,
      }, {
        headers:{
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${YOUR_API_KEY}`,
        }
      });
      console.log(response.data);

      const recipe = response.data.choices[0].text.trim();
      const botMessage = {
        _id : new Date().getTime()+1,
        text : recipe,
        createdAt :new Date(),
        user : {
          _id : 2,
          name : 'food bot',
          avatar: logo,

        }
      };
      setMessages(previousMessages=>GiftedChat.append(previousMessages,botMessage));

    }
    catch(error){
      console.log(error)
    }
  };

 
  return (
    
    <View style={styles.body}>
    <SafeAreaView style={{flex: 1,backgroundColor:'white'}}>
   <View style={styles.header}>
    <Image
        style={styles.logo}
        source={require('../../assets/images/robot.png')}
      />
    <Text style = {styles.headerText}>Help and Support Chatbot</Text>
    </View>
         
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
      
    </SafeAreaView>
    </View>
  );
}

  const styles = StyleSheet.create({
    body: {
      width: '100%',
      height: '100%',
      backgroundColor:'white'
    },


    header: {
      backgroundColor: '#F86D3B',   
      flexDirection: 'row',
      height:windowHeight*0.09,
      width:windowWidth,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'flex-start',
    },

    headerText:{
      fontSize:18,
      fontWeight:'bold',
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      color:'white',
    },
    logo:{
      width:55,
      height:55,
      alignSelf:'center',
    },
    logo1:{
      width:80,
      height:80,
      marginLeft:8,
    },

    bot:{
      fontSize:16,
    },
    input:{
      borderWidth:1,
      borderColor:'black',
      width:'60%',
      height:50,
      marginBottom:10,
      borderRadius:10,
      color:'black',
      marginLeft:-12,
    },
    button:{
      backgroundColor:'yellow',
    },

    buttonText:{
      fontSize:25,
      fontWeight:'bold',
    }

  });


