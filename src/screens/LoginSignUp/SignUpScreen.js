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

import Header from '../../components/Header.js';
import Button from '../../components/Button.js';
import ButtonL from '../../components/ButtonL.js';
import ErrorMessage from '../../components/ErrorMessage';
import { Email, Group, Pen } from '../../assets/images';
import Loader from '../../components/Loader.js';
import LoginContext from '../../context/Context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUpScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false);

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
          <Header title={'Sign Up'}/>
          <View style={{ alignContent: 'center', marginTop: 80, marginHorizontal: 15 }}>
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
            <View style={{ marginTop: 1, marginLeft: 5 }}>
  <Image source={Group} style={styles.icon} />
  <TextInput
    placeholder="6 Digit Code"
    placeholderTextColor="#6B6B6B"
    keyboardType="numeric"
    style={styles.input}
    onChangeText={handleChange('code')}
    onBlur={handleBlur('code')}
    value={values.code}
  />
  <ErrorMessage
    error={errors['code']}
    visible={touched['code']}
  />
</View>


            {/* <Text style={styles.text3}>
              Don’t have an account?
              <Text style={styles.text4} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
            </Text> */}

            <TouchableHighlight style={{ marginTop: 30 }} onPress={handleSubmit} underlayColor="#ffffff">
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
});

export default SignUpScreen;

