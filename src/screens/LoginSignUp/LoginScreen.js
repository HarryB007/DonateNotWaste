import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    TextInput,
    TouchableHighlight,
  } from 'react-native';
  import * as yup from 'yup';
  import { Formik } from 'formik';
  import auth from '@react-native-firebase/auth';
  import asyncStorage from '@react-native-async-storage/async-storage';
  
  import Button from '../../components/Button.js';
  import ErrorMessage from '../../components/ErrorMessage';
  import React, { useContext, useEffect, useState } from 'react';
  import { Background1 } from '../../assets/images';
  import { logo } from '../../assets/images';
  import { Email, Group } from '../../assets/images';
  import Loader from '../../components/Loader.js';
  import firestore from '@react-native-firebase/firestore';
  import LoginContext from '../../context/Context';
  
  
  const Login = ({ navigation }) => {
  
  
    const [loader, setLoader] = useState(false);
    const {userData, setUser, setUserData} = useContext(LoginContext);
  
    useEffect(() => {
      asyncStorage.setItem("start", "true");
    });
  
    const getData = async (email) => {
      try {
        await firestore().collection('users').where("email", "==", email).get()
          .then((querySnapshot) => {
            setUserData(querySnapshot.docs[0].data());
          }).catch((error) => {
            console.log("Error getting documents: ", error);
          });
      } catch (error) {
        alert("Error getting profile data from login:", error);
        console.log("Error from account", error);
      }
    }
  
    const onSubmitValue = async (values, { resetForm }) => {
  
      setLoader(true);
      resetForm();
  
      try {
        const user = await auth().signInWithEmailAndPassword(values.email, values.password);
        if (user) {
          setLoader(false);
        }
        if (user.user.emailVerified) {
          console.log(user.user);
          await getData(user.user.email);
          navigation.navigate('Home');
  
        } else {
          setLoader(true);
          auth().currentUser.sendEmailVerification()
            .then(() => {
              setLoader(false);
              alert("Email not verified. Please verify your email address. An email has been sent to your email address")
              navigation.navigate('Login');
            })
        }
  
      } catch (error) {
        setLoader(false)
        console.log("Error", error);
        alert("Invalid email/password")
      }
    };
  
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required('Email is required'),
      password: yup
        .string()
        .min(6)
        .required('Password is required'),
    });
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnMount={true}
        onSubmit={onSubmitValue}
        validationSchema={validationSchema}
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
          <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }} contentContainerStyle={{ flexGrow: 1 }}>
            {loader ? <Loader size="large" color="#F86D3B" /> : ""}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}>
  
              <ImageBackground
                source={Background1}
                resizeMode="cover"
                style={styles.image}>
                <Text style={styles.text1}>Login</Text>
                <Image source={logo} style={styles.logo1} />
  
  
                <View style={styles.box1}>
                  <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }} contentContainerStyle={{ flexGrow: 1 }}>
                    {loader ? <Loader size="large" color="#F86D3B" /> : ""}
                    <View style={{ alignContent: 'center', marginTop: 100, marginHorizontal: 15, }}>
  
  
                      <View style={{ marginTop: 1, marginLeft: 5 }}>
                        <Image source={Email} style={styles.icon} />
                        <TextInput
                          placeholder="Email"
                          style={styles.input}
                          png={Email}
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
  
                      <TouchableHighlight style={{ marginTop: 30 }} onPress={handleSubmit} underlayColor="#ffffff00">
                        <Button title="Login" />
                      </TouchableHighlight>
  
                      <Text style={styles.text3}>
                        Don’t have an account?
                        <Text style={styles.text4} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
                      </Text>
                    </View>
                  </ScrollView>
                </View>
  
              </ImageBackground>
            </KeyboardAvoidingView>
          </ScrollView>
        )}
      </Formik>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    text1: {
      color: 'white',
      fontSize: 32,
      marginTop: 40,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    box1: {
      backgroundColor: '#fff',
      width: '80%',
      height: '60%',
      borderWidth: 1,
      alignSelf: 'center',
      marginTop: -70,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo1: {
      width: 130,
      height: 130,
      zIndex: 1,
      borderRadius: 400 / 2,
      alignSelf: 'center',
      marginTop: 50,
    },
    input: {
      width: 250,
      alignSelf: 'center',
      height: 49,
      fontSize: 13,
  
      elevation: 4,
      paddingLeft: 60,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 15,
      color: '#00437a',
    },
    icon: {
      position: 'relative',
      top: 35,
      marginLeft: 20,
      zIndex: 1,
  
    },
    text2: {
      alignSelf: 'flex-end',
      marginRight: 10,
      marginTop: 5
    },
    text3: {
      alignSelf: 'center',
      marginBottom: -50,
      marginTop: 20
    },
    text4: {
      color: '#F86D3B',
      fontWeight: 'bold'
    },
  });
  
  export default Login;