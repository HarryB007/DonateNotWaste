import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

const Post = ({ pid, image, title, location, description, email, contact, coordinates }) => {

  const navigation = useNavigation();

  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate('Post Detail', { pid, image, description, location, title, email, contact, coordinates })}>
      <SharedElement id={'image'+pid} style={styles.image}>
        <Image source={{ uri: image }} style={[styles.image, {height: '100%'}]} resizeMode='cover' />
      </SharedElement>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1} >{title}</Text>
        <Text style={styles.description} numberOfLines={2} >{description}</Text>
        <Text style={styles.location} numberOfLines={1} >Location: {location}</Text>
      </View>
    </Pressable>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#C8C8C8',
    height: 270,
    marginTop: 20,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
  },
  info: {
    width: '100%',
    height: '30%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#000",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
  },
  location: {
    fontSize: 12,
  }
})