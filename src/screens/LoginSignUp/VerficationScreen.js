


import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    TextInput,
    Pressable,
  } from 'react-native';
  import React from 'react';
  import * as yup from 'yup';
  import {Formik} from 'formik';
  import Button from '../../components/Button.js';
  import ErrorMessage from '../../components/ErrorMessage';
  import Background from '../../components/Background.js';
  import {Email} from '../../assets/images';
  import { logo } from '../../assets/images';
  const VerficationScreen = () => {
    const onSubmitValue = (values, {resetForm}) => {
      resetForm();
      console.log(values);
    };
    const validationSchema = yup.object().shape({
        code: yup
        .string()
        .required('       Code is required'),
    });
    return (
      <Formik
        initialValues={{code: ''}}
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
            style={{width: '100%', height: '100%'}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <Background>
                <Image source={logo} style={styles.logo1} />
                  <View style={styles.box1}>
                    
                    <View>
                      <View style={styles.field}>
                          <Text style={styles.text2}>A Verification Code has been sent to your Email, Enter the Code to Complete your Sign up.</Text>
                        <TextInput
                          placeholder="Enter Code"
                          style={styles.input}
                          onChangeText={handleChange('code')}
                          onBlur={handleBlur('code')}
                          value={values.code}
                          keyboardType="numeric"
                        />
                        <ErrorMessage
                          error={errors['code']}
                          visible={touched['code']}
                        />
                      </View>
                      <Pressable style={{marginTop: 30}} onPress={handleSubmit}>
                        <Button title="Enter Code " />
                      </Pressable>
                    </View>
                  </View>
                </Background>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        )}
      </Formik>
    );
  };
    
  const styles = StyleSheet.create({
      container: {
          flex: 1,
        },
        box1: {
          backgroundColor: 'white',
          width: 300,
          height: 320,
          marginTop: 10,
          marginLeft:30,
          borderWidth: 2,
          borderRadius: 9,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        },
        text2:{
            marginTop:80, marginBottom:10, marginLeft:20, marginRight:20, color:'black'
        },
        logo1: {
          width: 130,
          height: 130,
          zIndex: 999,
          borderRadius: 400 / 2,
          alignSelf:'center',
          marginTop: 270,
          marginBottom:-80,
          marginLeft:30,
        },
        field:{marginTop:-10},
        input: {
          width: 250,
          alignSelf: 'center',
          height: 49,
          fontSize: 13,
          elevation: 4,
          paddingLeft: 40,
          backgroundColor: '#ffffff',
          padding: 10,
          borderRadius: 15,
          color: '#00437a',
        },
  });
  

  export default VerficationScreen;
