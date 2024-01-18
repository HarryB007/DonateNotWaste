import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ViewPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection('posts').get();
        const postList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts: ', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostPress = (selectedPost) => {
    // Navigate to the FoodDetailsScreen and pass the selected post details
    navigation.navigate('FoodDetails', { post: selectedPost });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Header title="View Post" showBackButton={true} />
      </View>
      {posts.length === 0 ? (
        <Text>No posts available</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePostPress(item)} // Pass the selected post to the function
              style={styles.postContainer}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.details}</Text>
                <Text style={styles.location}>Location: {item.location}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  container1: {
    justifyContent: 'flex-start',
    width: windowWidth * 1.2,
    marginBottom: windowHeight * 0.08,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
    fontFamily: 'Poppins',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: 'gray',
  },
  location: {
    fontStyle: 'italic',
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default ViewPost;
