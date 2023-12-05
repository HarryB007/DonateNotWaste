import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';


const Request = ({ id, pid, image, name, reason, city }) => {


  const deletePost = (bool) => {
    if(!bool) return deleteRequest();
    firestore()
      .collection('posts')
      .doc(pid)
      .delete()
      .then(() => {
        deleteRequests();
      })
      .catch((error) => {
        alert(bool ? 'Error Accepting Request' : 'Error Rejecting Request')
        console.error('Error removing document: ', error);
      })
  };

  const deleteRequests = async () => {
    try {
      const querySnapshot = await firestore().collection('requests')
        .where('pid', '==', pid)
        .get();

      const deletePromises = [];

      querySnapshot.forEach((doc) => {
        deletePromises.push(doc.ref.delete());
      });

      Promise.all(deletePromises)
        .then(() => {
          alert('Request Accepted!')
        })
        .catch((err) => {
          console.log("Error deleting requests", err)
          alert('Error Accepting Request', err)
        })
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  };

  const deleteRequest = () => {
    firestore()
      .collection('requests')
      .doc(id)
      .delete()
      .then((doc) => {
        alert('Request Rejected!')
      })
      .catch((error) => {
        alert(bool ? 'Error Accepting Request' : 'Error Rejecting Request')
        console.error('Error removing document: ', error);
      })
  }


  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <Image source={{ uri: image }} style={styles.image} resizeMode='cover' />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1} >{name}</Text>
          <Text style={styles.location} numberOfLines={1} >{city}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText} numberOfLines={4} >{reason}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.logoContainer, { backgroundColor: '#22DD22', }]} onPress={() => deletePost(true)}>
            <Ionicons name='checkmark' size={30} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.logoContainer, { backgroundColor: 'red' }]} onPress={() => deletePost(false)}>
            <Ionicons name='close' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Request

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    height: 140,
    backgroundColor: '#C8C8C8',
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#000",
  },
  location: {
    color: '#737171',
  },
  child: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  descriptionText: {
    width: '70%',
    color: '#000',
  },
  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '25%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
})