import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

import Header from '../../components/Header.js';
import ButtonL from '../../components/ButtonL.js';
import ErrorMessage from '../../components/ErrorMessage';
import { Email, Group, Pen, Phone, address } from '../../assets/images';
import { RadioButton } from 'react-native-paper';
import Loader from '../../components/Loader.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'];

const SignUpScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const [selectedValue, setSelectedValue] = useState();
  const [selectedCity, setSelectedCity] = useState('');
  const buttonOpacity = new Animated.Value(1);

  const handleSignUp = async (email, password, name, phoneNumber, city) => {
    try {
      setLoader(true);
      setLoading(true); // Show loader

      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();

      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email address');
      }

      // Validate password length
      if (!password || password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      // Validate phone number format
      if (!phoneNumber || !/^\d{11}$/.test(phoneNumber)) {
        throw new Error('Invalid phone number (11 digits required)');
      }

      // Validate city
      if (!city) {
        throw new Error('City is required');
      }

      // Create a new user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // User signed up successfully, save additional information to Firestore
      const user = userCredential.user;
      await saveUserInfo(user.uid, name, email, selectedValue, phoneNumber, city);

      alert('Your account has been created!');
      // Navigate to the desired screen based on the selected radio button
      if (selectedValue === 'donor') {
        navigation.navigate("DonorHomePage");
      } else if (selectedValue === 'needy') {
        navigation.navigate('NeedyHomePage');
      } else if (selectedValue === 'rider') {
        navigation.navigate('RiderHomePage');
      }
    } catch (error) {
      console.error('Error during sign up:', error.message);
      // Display Yup validation errors and alert messages
      alert(error.message);
    } finally {
      setLoader(false);
      setLoading(false); // Hide loader
    }
  };

  const saveUserInfo = async (userId, name, email, userType, phoneNumber, city) => {
    try {
      // Save user information to Firestore
      await firestore().collection('users').doc(userId).set({
        name: name,
        email: email,
        userType: userType,
        phoneNumber: phoneNumber,
        city: city,
      });
    } catch (error) {
      console.error('Error saving user info:', error.message);
      // Handle error, display an error message, etc.
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phoneNumber: '',
        city: '',
      }}
      validateOnMount={false}
      validationSchema={yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        name: yup.string().required('Name is required'),
        city: yup.string().required('City is required'),
        phoneNumber: yup.string().matches(/^\d{11}$/, 'Invalid phone number (11 digits required)').required('Phone number is required'),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Header style={styles.header} title={'Sign Up'} showBackButton={true}/>
          <View style={{ alignContent: 'center', marginTop: 5, marginHorizontal: 15 }}>
            <View style={styles.field}>
              <Image source={Pen} style={styles.icon} />
              <TextInput
                placeholder="Name"
                placeholderTextColor="#6B6B6B"
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <ErrorMessage
                error={errors.name}
                visible={touched.name}
              />
            </View>
            <View style={{ marginTop: 1, marginLeft: 5 }}>
              <Image source={Email} style={styles.icon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#6B6B6B"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <ErrorMessage
                error={errors.email}
                visible={touched.email}
              />
            </View>
            <View style={{ marginTop: 1, marginLeft: 5 }}>
              <Image source={Group} style={styles.icon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#6B6B6B"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <ErrorMessage
                error={errors.password}
                visible={touched.password}
              />
            </View>
            <View style={{ marginTop: 1, marginLeft: 5 }}>
              <Image source={Group} style={styles.icon} />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#6B6B6B"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              <ErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
            </View>
            <View>
              <RadioButton.Group onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', gap:5, marginTop:10, marginBottom:-10 }}>
                  <View>
                    <RadioButton value="donor" uncheckedColor='#C4C4C4' color='#F86D3B' />
                  </View>
                  <Text style={styles.radioText}>Donor</Text>
                  <View style={{ marginLeft: 20 }}>
                    <RadioButton value="needy" uncheckedColor='#C4C4C4' color='#F86D3B' />
                  </View>
                  <Text style={styles.radioText}>Needy</Text>
                  <View style={{ marginLeft: 20 }}>
                    <RadioButton value="rider" uncheckedColor='#C4C4C4' color='#F86D3B' />
                  </View>
                  <Text style={styles.radioText}>Rider</Text>
                </View>
              </RadioButton.Group>
            </View>
            <View style={{ marginTop: 1, marginLeft: 5 }}>
              <Image source={Phone} style={styles.icon} />
              <TextInput
                placeholder="Enter Phone Number"
                placeholderTextColor="#6B6B6B"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />
              <ErrorMessage
                error={errors.phoneNumber}
                visible={touched.phoneNumber}
              />
            </View>
            <View style={styles.field}>
              <Image source={require("../../assets/images/maps.png")} style={styles.image} />
              <Picker
                selectedValue={selectedCity}
                style={[styles.picker]}
                onValueChange={(itemValue) => setSelectedCity(itemValue)}
              >
                <Picker.Item label="Select City" value="" />
                {cities.map((city, index) => (
                  <Picker.Item key={index} label={city} value={city} />
                ))}
              </Picker>
              <ErrorMessage
                error={!selectedCity ? 'City is required' : ''}
                visible={!selectedCity && touched.city}
              />
            </View>
            <TouchableHighlight
              style={{ marginTop: 30 }}
              onPress={() => handleSignUp(values.email, values.password, values.name, values.phoneNumber, selectedCity)}
              underlayColor="#ffffff"
            >
              <Animated.View style={[styles.button, { opacity: buttonOpacity }]}>
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Sign Up</Text>
                )}
              </Animated.View>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor:'#fff',
  },
  input: {
    width: 280,
    alignSelf: 'center',
    height: 49,
    fontSize: 13,
    elevation: 10,
    paddingLeft: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    color: '#6B6B6B',
  },
  icon: {
    position: 'relative',
    top: 35,
    marginLeft: 20,
    zIndex: 1,
  },
  image:{
    position: 'relative',
    top: 33,
    marginLeft: 250,
    zIndex: 1,
  },
  text2: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 15,
    color:'#000',
  },
  text3: {
    alignSelf: 'center',
    marginBottom: -50,
    marginTop: 20,
  },
  text4: {
    color: '#F86D3B',
    fontWeight: 'bold',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:30,
  },
  line: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: '#6B6B6B',

  },
  circleContainer: {
    alignItems: 'center',
    borderRadius:100,
    
  },
  circleText: {
    height: windowHeight * 0.07,
    width:windowHeight * 0.07,
    backgroundColor: '#F86D3B',
    borderRadius: 100,
    paddingHorizontal: 17,
    paddingVertical: 17,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignItems:'center',
  },
  radioText:{
    fontFamily: 'Poppins',
    color:'#4D4D4D',
  },
  header:{
    marginLeft: 80,
    paddingRight: 40,
  },
  button:{
    backgroundColor:'#F86D3B',
    width:300,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 10,
    marginTop: -10,
    height: 49,
    fontSize:2,
  },
  picker: {
    height: 49,
    width: 280,
    color: '#6B6B6B',
    fontSize: 13,
    elevation: 10,
    paddingLeft: 50,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: -10,
  },
  // field: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
});

export default SignUpScreen;