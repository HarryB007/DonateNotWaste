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
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header.js';
import Button from '../../components/Button.js';
import ButtonL from '../../components/ButtonL.js';
import ErrorMessage from '../../components/ErrorMessage';
import { Email, Group } from '../../assets/images';
import Loader from '../../components/Loader.js';
// import { auth } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const handleSignIn = async (email, password) => {
    try {
      setLoader(true);

      // Sign in user with email and password
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      // Get the signed-in user
      const user = userCredential.user;

      // Retrieve user type from Firestore
      const userTypeSnapshot = await firestore().collection('users').doc(user.uid).get();
      const userType = userTypeSnapshot.data()?.userType;

      // Navigate to the appropriate home screen based on user type
      switch (userType) {
        case 'donor':
          navigation.navigate('DonorHomePage');
          break;
        case 'needy':
          navigation.navigate('NeedyHomePage');
          break;
        case 'rider':
          navigation.navigate('RiderHomePage');
          break;
        // Add more cases for other user types if needed
        default:
          console.warn(`Unknown user type: ${userType}`);
      }
    } catch (error) {
      console.error('Error during sign in:', error.message);
      // Handle error, display an error message, etc.
    } finally {
      setLoader(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      onSubmit={(values) => handleSignIn(values.email, values.password)}
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
          <Header title={'Sign In'} showBackButton={true}/>
          <View style={{ alignContent: 'center', marginTop: 80, marginHorizontal: 15 }}>
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
            <Text style={styles.text2} onPress={() => navigation.navigate('Forgot Password')}>
              Forgot Password ?
            </Text>

            <TouchableHighlight style={{ marginTop: 30 }} onPress={handleSubmit} underlayColor="#ffffff">
              <Button title="Login" />
            </TouchableHighlight>
            
            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <View style={styles.circleContainer}>
                <Text style={styles.circleText}>OR</Text>
              </View>
              <View style={styles.line} />
            </View>

            <TouchableHighlight style={{ marginTop: 80 }} onPress={() => navigation.navigate('SignUpScreen')} underlayColor="#ffffff">
              <ButtonL title="Sign Up" style={styles.signup}/>
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  signup:{
  
  }
});

export default LoginScreen;
