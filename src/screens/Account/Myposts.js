import { StyleSheet, Text, View, TouchableHighlight, Image, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import LoginContext from '../../context/Context';

const Myposts = ({ route }) => {

  const { userData } = useContext(LoginContext);
  const [post, setPost] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true)
    getFoodData();
  }

  const getFoodData = async () => {
    setIsRefreshing(true)
    try {
      await firestore()
        .collection('posts')
        .where('email', '==', userData.email)
        .get()
        .then(querySnapshot => {
          let documents = [];
          querySnapshot.forEach(doc => {
            const document = doc.data();
            documents.push(document);
          });
          setPost(documents);
          setIsRefreshing(false)
        })
        .catch(error => {
          console.log('Error getting documents: ', error);
        });
    } catch (error) {
      alert('Error getting profile data');
      console.log('Error from account', error);
    }
  };
  useEffect(() => {
    getFoodData();
  }, []);

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: '#000',
      headerRight: () => (
        <MaterialCommunityIcons
          name="account-circle"
          size={30}
          color="black"
          onPress={() => navigation.navigate('Account')}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={post}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        keyExtractor={() => Math.random().toString()}
        renderItem={({ item }) => {
          return (
            post.length === 0 ? <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>No Posts</Text>
            :
            <View style={styles.OneButton} underlayColor="#ebf0f0">
              <>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={{ width: '50%' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 300, color: 'black' }}>
                    {item.details}
                  </Text>
                </View>
              </>
            </View>
          )
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Myposts;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  OneButton: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    elevation: 4,
    paddingHorizontal: 10,
  },
  image: {
    width: 130,
    borderRadius: 20,
    height: 130,
    marginVertical: 10,
  },
  list: {
    width: '90%',
    height: '100%',
  },
});