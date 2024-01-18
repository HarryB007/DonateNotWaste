import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import { Email } from '../../assets/images';
import * as yup from 'yup';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import Button from '../../components/Button.js';
import ErrorMessage from '../../components/ErrorMessage';
import Header from '../../components/Header';

const ForgotPassword = () => {
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onSubmitValue = async (values, { resetForm }) => {
    try {
      await auth().sendPasswordResetEmail(values.email);
      resetForm();
      setIsSuccessVisible(true);
      fadeIn();
      setTimeout(() => {
        setIsSuccessVisible(false);
        fadeOut();
      }, 3000); // Hide the success message after 3 seconds
      console.log('Password reset email sent successfully!');
    } catch (error) {
      console.error('Error sending reset password email:', error.message);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
  });

  return (
    <Formik
      initialValues={{ email: '' }}
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', height: '200%' }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}
            >
              <View style={styles.container}>
                <Header title={'Forgot Password'} showBackButton={true} />
                <View style={styles.container2}>
                  <Text style={styles.text1}>
                    Enter your email address to receive a link to reset your password
                  </Text>
                  <View>
                    <Image source={Email} style={styles.icon} />
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholderTextColor={'black'}
                      keyboardType="email-address"
                    />
                    <ErrorMessage
                      error={errors['email']}
                      visible={touched['email']}
                    />
                    <Pressable
                      style={{ marginTop: 40 }}
                      onPress={() => {
                        handleSubmit();
                        fadeIn();
                      }}
                    >
                      <Button title="Get Link" />
                    </Pressable>
                  </View>
                  {isSuccessVisible && (
                    <Animated.View
                      style={[styles.successMessage, { opacity: opacity }]}
                    >
                      <Text style={styles.successMessageText}>
                        Password reset link sent successfully! Check your mailbox.
                      </Text>
                    </Animated.View>
                  )}
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  container2: { marginTop: 150, marginHorizontal: 32 },
  input: {
    width: 300,
    alignSelf: 'center',
    height: 49,
    fontSize: 13,
    elevation: 4,
    paddingLeft: 60,
    backgroundColor: '#ffffff',
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
  text1: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  successMessage: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  successMessageText: {
    color: 'white',
    textAlign: 'center',
  },
});
