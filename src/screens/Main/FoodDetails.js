import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this package
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

const FoodDetails = ({ route }) => {
  const { post } = route.params;
  const [donorData, setDonorData] = useState(null);

  useEffect(() => {
    const getDonorData = async () => {
      try {
        const donorSnapshot = await firestore().collection('users').doc(post.email).get();
        setDonorData(donorSnapshot.data());
      } catch (error) {
        console.error('Error fetching donor data:', error);
      }
    };

    getDonorData();
  }, [post.email]);

  const handleCallPress = () => {
    // Replace this with the logic to get the phone number from the post
    let phoneNumber = donorData ? donorData.phone : '+923035676641'; // Default phone if donor data is not available
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleLocationPress = () => {
    // Logic to handle location press, potentially opening maps
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Food Details</Text>
          <TouchableOpacity>
            <Icon name="account-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: post.imageUrl }}
          style={styles.foodImage}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.foodTitle}>{post.name}</Text>
          <Text style={styles.foodDescription}>{post.details}</Text>
          <Text style={styles.expirationDate}>Expiration date - {post.expirationDate}</Text>

          {donorData && (
            <>
              <View style={styles.userContainer}>
                <Icon name="account-circle" size={24} color="#000" />
                <Text style={styles.userName}>{donorData.name}</Text>
                <TouchableOpacity onPress={handleLocationPress}>
                  <Icon name="map-marker-radius" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <Text style={styles.userAddress}>{donorData.city}</Text>

              <View style={styles.callContainer}>
                <Text>You can also call at</Text>
                <TouchableOpacity onPress={handleCallPress}>
                  <Text style={styles.phoneNumber}>{donorData.phone}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
            <Text style={styles.locationButtonText}>Show location on maps</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    foodImage: {
        width: '100%',
        height: 300, // You can adjust the height
    },
    contentContainer: {
        padding: 15,
    },
    foodTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000000',
    },
    foodDescription: {
        fontSize: 16,
        marginVertical: 10,
        color: '#000000',
    },
    expirationDate: {
        fontSize: 14,
        marginBottom: 20,
        color: '#000000',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        color: '#000000',
    },
    userName: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    userAddress: {
        fontSize: 16,
        color: '#555',
        color: '#000000',
    },
    locationButton: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    locationButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    callContainer: {
        alignItems: 'center',
        marginBottom: 20,
        color: '#000000',
    },
    phoneNumber: {
        color: 'blue',
        textDecorationLine: 'underline',
        
    },
  
});

export default FoodDetails;
