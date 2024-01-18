import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageModal, { uploadImage } from '../../components/ImageModal';

const AddPost = () => {
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState('');

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
        setSelectedDate(date);
        }
    };

  const getData = async () => {
    try {
      const email = firebase.auth().currentUser.email;
      await firestore()
        .collection('users')
        .where('email', '==', email)
        .get()
        .then((querySnapshot) => {
          setUser(querySnapshot.docs[0].data());
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    } catch (error) {
      alert('Error getting profile data');
      console.log('Error from account', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const uploadImageToStorage = async () => {
    setLoader(true);
    try {
      const reference = storage().ref(`images/${Date.now()}`);
      await reference.putFile(image.path);

      const url = await reference.getDownloadURL();
      return url;
    } catch (error) {
      console.log('Error uploading image', error);
      throw new Error('Error from uploadImage', error);
    }
  };

  const uploadImage = async () => {
    setLoader(true);
    let promise = new Promise(async (resolve, reject) => {
        try {
        const reference = storage().ref(image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length));
        const pathToFile = image.path;
        await reference.putFile(pathToFile);

        const url = await storage().ref(image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length)).getDownloadURL();
        if (url) console.log(url)
        resolve(url);

        } catch (error) {
        alert("Error uploading image")
        reject(error);
        throw new Error("Error from uploadImage", error)
        }
    });
    return promise;
    }

  const addData = async (values) => {
    try {
      const imageUrl = await uploadImageToStorage();
      const postData = {
        ...values,
        imageUrl,
        location: user.city,
        coordinates: { latitude: null, longitude: null }, // Add your logic to set coordinates
        email: user.email,
        expirationDate: selectedDate.toISOString(), 
      };

      await firestore().collection('posts').add(postData);
      alert('Post added successfully');
      setLoader(false);
      setImage(null);
    } catch (error) {
      console.log('Error adding post:', error);
      alert('Error adding post. Please try again.');
      setLoader(false);
    }
  };

  const onSubmitValue = (values, { resetForm }) => {
    if (!image) {
      alert('Please select an image');
      return;
    }

    values.date = selectedDate.toISOString();
    resetForm();
    addData(values);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    details: yup.string().min(10, 'Details must be at least 10 characters').required('Details is required'),
  });

  return (
    <>
      {loader && (
        <View style={styles.loader}>
          <ActivityIndicator size={30} color="#000" />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
        <Header title={'New Post'} showBackButton={true} />
        <Formik
          initialValues={{ name: '', details: '', date: '', location: '' }}
          onSubmit={onSubmitValue}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
            <View style={styles.container}>
              <View style={styles.box1}>
                <TextInput
                  placeholder="Name of the Food"
                  placeholderTextColor={'#B0B0B0'}
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <TextInput
                  placeholder="Description"
                  placeholderTextColor={'#B0B0B0'}
                  style={[styles.input, { height: 100 }]}
                  name="details"
                  multiline={true}
                  numberOfLines={undefined}
                  onChangeText={handleChange('details')}
                  onBlur={handleBlur('details')}
                  value={values.details}
                />
                <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#000', alignSelf: 'center', paddingTop: 15 }}>
                      {selectedDate.toLocaleDateString()}
                    </Text>
                    <Ionicons name="calendar" size={22} color="#000" />
                  </View>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    placeholderTextColor={'#B0B0B0'}
                    value={selectedDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
                <TouchableOpacity style={styles.input} onPress={() => setImageModalVisible(true)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#B0B0B0' }}>{image ? 'Image Selected' : 'Upload image'}</Text>
                    <Ionicons name="folder" size={22} color="#000" />
                  </View>
                </TouchableOpacity>
                <TouchableHighlight style={styles.press} onPress={handleSubmit} underlayColor="#B0B0B0">
                  <Text style={styles.text1}>Post</Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
        </Formik>
        <ImageModal modalVisible={imageModalVisible} setModalVisible={setImageModalVisible} setImage={setImage} image={image} setLoader={setLoader} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  box1: {
    backgroundColor: '#fff',
    width: '90%',
    height: '85%',
    alignSelf: 'center',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  input: {
    width: 330,
    alignSelf: 'center',
    height: 70,
    fontSize: 13,
    elevation: 4,
    paddingLeft: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    color: '#00437a',
    marginTop: 20,
  },
  press: {
    backgroundColor: '#F86D3B',
    width: 250,
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  text1: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  loader: {
    width: '100%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AddPost;
