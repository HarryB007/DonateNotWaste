import { Text, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';

const ButtonL = (props) => {
  const { title, customStyle } = props;

  return (
    <View style={[styles.press, customStyle]} underlayColor="#ffffff">
      <Text style={styles.text1}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  press: {
    backgroundColor: '#F86D3B',
    width: 250,
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  text1: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins',
    alignSelf: 'center',
  },
});

export default ButtonL;
