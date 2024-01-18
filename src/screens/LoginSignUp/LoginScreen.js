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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
// import { LoginContext } from '../../context/Context'; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  // setLoader(true);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSignIn = async (email, password) => {
    try {
      setError('');
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userTypeSnapshot = await firestore().collection('users').doc(user.uid).get();
      const userType = userTypeSnapshot.data()?.userType;

      // Store user data in context
      setUserData({ ...userTypeSnapshot.data(), uid: user.uid });

      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
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
          default:
            console.warn(`Unknown user type: ${userType}`);
        }
      }, 2000); // Navigate to Home after 2 seconds
    } catch (error) {
      console.error('Error during sign in:', error.message);
      setError('Invalid email or password');
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
          <Header title={'Sign In'} showBackButton={true} />
          <View style={{ alignContent: 'center', marginTop: 40, marginHorizontal: 15 }}>
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
            <Text style={styles.text2} onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot Password ?
            </Text>

            <TouchableHighlight
              style={styles.button}
              onPress={handleSubmit}
              underlayColor="#F86D3B"
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>

            {successMessage !== '' && (
              <View style={styles.successMessageContainer}>
                <Text style={styles.successMessageText}>{successMessage}</Text>
              </View>
            )}

            {error !== '' && (
              <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessageText}>{error}</Text>
              </View>
            )}

            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <View style={styles.circleContainer}>
                <Text style={styles.circleText}>OR</Text>
              </View>
              <View style={styles.line} />
            </View>

            <TouchableHighlight
              style={styles.signupButton}
              onPress={() => navigation.navigate('SignUpScreen')}
              underlayColor="#FFFFFF"
            >
              <LottieView
                source={require('../../assets/Animation - 1702547131886.json')}
                autoPlay
                loop
              />
            </TouchableHighlight>
            <Text style={styles.text3}>
              Don’t have an account?
              <Text style={styles.text4} onPress={() => navigation.navigate('SignUpScreen')}>Sign Up</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 300,
    alignSelf: 'center',
    height: 49,
    fontSize: 13,
    elevation: 10,
    paddingLeft: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#6B6B6B',
  },
  icon: {
    position: 'relative',
    top: 34,
    marginLeft: 30,
    zIndex: 1,
  },
  text2: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 15,
    color: '#000',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#F86D3B',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width:300,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  line: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: '#6B6B6B',
  },
  circleContainer: {
    alignItems: 'center',
    borderRadius: 100,
  },
  circleText: {
    height: windowHeight * 0.07,
    width: windowHeight * 0.07,
    backgroundColor: '#F86D3B',
    borderRadius: 100,
    paddingHorizontal: 13,
    paddingVertical: 12,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  successMessageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: 300,
    alignSelf: 'center',
  },
  successMessageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorMessageContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: 300,
    alignSelf: 'center',
  },
  errorMessageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  text3: {
    alignSelf: 'center',
    marginBottom: -50,
    marginTop: 20,
    color: '#000',
  },
  text4: {
    color: '#F86D3B',
    fontWeight: 'bold'
  },
});

export default LoginScreen;
