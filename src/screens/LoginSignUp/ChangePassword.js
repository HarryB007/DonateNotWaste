import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,Pressable,
    ScrollView,
    KeyboardAvoidingView,
  } from 'react-native';
  import React from 'react';
  import {Email} from '../../assets/images';
  import * as yup from 'yup';
  import {Formik} from 'formik';
  import Button from '../../components/Button.js';
  import ErrorMessage from '../../components/ErrorMessage';
  import { Group } from '../../assets/images';
  const ChangePassword = () => {
    const onSubmitValue = (values, {resetForm}) => {
      console.log('abc');
      resetForm();
      console.log(values);
    };
    const validationSchema = yup.object().shape({
      cpassword: yup.string().min(8).required('Password is required'),
      password: yup.string().min(8).required('Password is required'),
    });
    return (
      <Formik
        initialValues={{password: '', cpassword:''}}
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%', height: '200%'}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <View style={styles.container}>
                 
                  <View style={styles.container2}>
                   
                    <View>
                    
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
                       <Pressable style={{marginTop: 40}} onPress={handleSubmit}>
                        <Button title="Submitt " />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        )}
      </Formik>
    );
  };
  
  export default ChangePassword;
  
  const styles = StyleSheet.create({
      container:{
          backgroundColor: 'white', height: '100%'
      },
      container2:{marginTop: 300, marginHorizontal: 32},
    input: {
      width: 300,
      alignSelf: 'center',
      height: 49,
      fontSize: 13,
      elevation: 4,
      margin:-1,
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
  