import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {Formik} from 'formik';
import Button from '../../components/Button.js';
import ErrorMessage from '../../components/ErrorMessage';
import {Group} from '../../assets/images';
const ChangePas = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        color: '#000',
      },
      headerTintColor: '#000',
      headerTitle: 'Change Password',
      color: 'black',
    });
  }, [navigation]);

  const onSubmitValue = (values, {resetForm}) => {
    console.log('abc');
    resetForm();
    console.log(values);
  };
  const validationSchema = yup.object().shape({
    ppassword: yup.string().min(8).required('Password is required'),
    cpassword: yup.string().min(8).required('Password is required'),
    password: yup.string().min(8).required('Password is required'),
  });
  return (
    <Formik
      initialValues={{password: '', cpassword: ''}}
      validateOnMount={true}
      onSubmit={onSubmitValue}
      validationSchema={validationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              style={{width: '100%', height: '100%'}}
              contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.container}>
                <View style={styles.container2}>
                  <View>
                    <Image source={Group} style={styles.icon} />
                    <TextInput
                      placeholder="Enter Previous Password"
                      placeholderTextColor={'black'}
                      secureTextEntry={true}
                      style={styles.input}
                      onChangeText={handleChange('ppassword')}
                      onBlur={handleBlur('ppassword')}
                      value={values.ppassword}
                    />
                    <ErrorMessage
                      error={errors['password']}
                      visible={touched['password']}
                    />

                    <Image source={Group} style={styles.icon} />
                    <TextInput
                      placeholder="Enter new Password"
                      placeholderTextColor={'black'}
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

                    <Image source={Group} style={styles.icon} />
                    <TextInput
                      placeholder="Re-enter new Password"
                      secureTextEntry={true}
                      placeholderTextColor={'black'}
                      style={styles.input}
                      onChangeText={handleChange('cpassword')}
                      onBlur={handleBlur('cpassword')}
                      value={values.cpassword}
                    />
                    <ErrorMessage
                      error={errors['cpassword']}
                      visible={touched['cpassword']}
                    />
                    <Pressable style={{marginTop: 80}} onPress={handleSubmit}>
                      <Button title="Submit " />
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </Formik>
  );
};

export default ChangePas;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  container2: {marginTop: 170, marginHorizontal: 32},
  input: {
    width: 300,
    alignSelf: 'center',
    height: 49,
    fontSize: 13,
    elevation: 4,
    margin: -1,
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
});
