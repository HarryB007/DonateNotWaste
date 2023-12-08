import { StyleSheet, Text, View, FlatList, BackHandler, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Request from '../../components/Request';
import firebase from '@react-native-firebase/app';


const Requests = ({ navigation }) => {

  const [requests, setRequests] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);


  const getData = async () => {
    setIsRefreshing(true)
    const snapshot = await firebase.firestore().collection('requests').where('postEmail', '==', firebase.auth().currentUser.email).get()
    let documents = [];
    snapshot.forEach(doc => {
      const document = doc.data();
      document.id = doc.id;
      documents.push(document);
      setIsRefreshing(false)
    });
    setRequests(documents)
    setIsRefreshing(false)
  }

  

  const onRefresh = () => {
    setIsRefreshing(true)
    getData();
  }

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  }


  useEffect(() => {
    getData();
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item, index) => Math.random().toString()}
        // renderItem={({ item }) => requests.length == 0 ? <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>No Requests</Text> : <Request id={item.id} image={item.personImage} name={item.name} reason={item.reason} city={item.city} />}
        renderItem={({ item }) => <Request id={item.id} pid={item.pid} image={item.personImage} name={item.name} reason={item.reason} city={item.city} onRefresh={onRefresh} />}
        style={styles.list}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </View>
  )
}

export default Requests

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#F86D3B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    height: '100%',
    padding: 10,
  }
})