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
} from 'react-native';
import { Formik } from 'formik';
import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/Header.js';
import Button from '../../components/Button.js';
import ButtonL from '../../components/ButtonL.js';
import ErrorMessage from '../../components/ErrorMessage';
import { Email, Group, Pen, Phone, address } from '../../assets/images';
import { RadioButton } from 'react-native-paper';
import Loader from '../../components/Loader.js';
import LoginContext from '../../context/Context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUpScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  // const [email, setEmail] = useState("");
  const handleSignUp = async (Email, Password, Name, PhoneNumber, City) => {
    try {
      setLoader(true);

      // Create a new user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(Email, Password);

      // User signed up successfully, save additional information to Firestore
      const user = userCredential.user;
      await saveUserInfo(user.uid, Name, Email, selectedValue, PhoneNumber, City);

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
      // Handle error, display an error message, etc.
    } finally {
      setLoader(false);
    }
  };

  const saveUserInfo = async (userId, Name, Email, userType, PhoneNumber, City) => {
    try {
      // Save user information to Firestore
      await firestore().collection('users').doc(userId).set({
        name: Name,
        email: Email,
        userType,
        phoneNumber: PhoneNumber,
        city: City,
      });
    } catch (error) {
      console.error('Error saving user info:', error.message);
      // Handle error, display an error message, etc.
    }
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
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
          <Header title={'Sign Up'} showBackButton={true}/>
          <View style={{ alignContent: 'center', marginTop: 50, marginHorizontal: 15 }}>
            <View style={styles.field}>
              <Image source={Pen} style={styles.icon} />
              <TextInput
                placeholder="Name"
                placeholderTextColor="#6B6B6B"
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.fname}
              />
              <ErrorMessage
                error={errors['name']}
                visible={touched['name']}
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
                error={errors['email']}
                visible={touched['email']}
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
                error={errors['password']}
                visible={touched['password']}
              />
            </View>
            <View style={{ marginTop: 1, marginLeft: 5 }}>
              <Image source={Group} style={styles.icon} />
              <TextInput
                placeholder="Re-enter Password"
                placeholderTextColor="#6B6B6B"
                secureTextEntry={true}
                style={styles.input}
                name='Email'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <ErrorMessage
                error={errors['password']}
                visible={touched['password']}
              />
            </View>
            <View>
              <RadioButton.Group onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', gap:5, marginTop:10, marginBottom:-10 }}>
                  <View>
                    <RadioButton value="donor" uncheckedColor='#C4C4C4' color='#F86D3B' />
                  </View>
                  <Text style={styles.radioText}>Donor</Text>
                  <View style={{ marginLeft: 20}}>
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
                value={values.code}
              />
              <ErrorMessage
                error={errors['phoneNumber']}
                visible={touched['phoneNumber']}
              />
            </View>
            <View style={styles.field}>
              <Image source={Pen} style={styles.icon} />
              <TextInput
                placeholder="Enter City"
                placeholderTextColor="#6B6B6B"
                style={styles.input}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.fname}
              />
              <ErrorMessage
                error={errors['city']}
                visible={touched['city']}
              />           
            </View>
            {/* <TouchableHighlight style={{ marginTop: 30 }} onPress={()=>navigation.navigate('HomeScreen')} underlayColor="#ffffff">
              <ButtonL title="Sign Up" style={styles.signup}/>
            </TouchableHighlight> */}
            <TouchableHighlight
              style={{ marginTop: 30 }}
              onPress={() =>
                handleSignUp(
                  values.email,
                  values.password,
                  values.name,
                  values.phoneNumber,
                  values.city
                )
              }
              underlayColor="#ffffff"
            >
              <ButtonL title="Sign Up" style={styles.signup} />
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
    paddingLeft: 60,
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
});

export default SignUpScreen;

