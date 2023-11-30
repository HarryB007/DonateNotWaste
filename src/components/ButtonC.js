// ButtonC.js

import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ButtonC({ onPress, iconName }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.wrapperCustom,
          { backgroundColor: pressed || isPressed ? '#F86D3B' : '#FFFFFF' },
        ]}
        android_ripple={{ color: 'transparent', borderless: false }}
      >
        <Icon style={styles.icon} name={iconName} size={20} color={isPressed ? '#FFFFFF' : '#F86D3B'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: windowHeight * -0.03,
    justifyContent: 'center',
    paddingTop: windowHeight * 0.025,
    marginRight: windowWidth * 0.05,
  },
  icon: {
    alignSelf: 'center',
  },
  wrapperCustom: {
    height: windowHeight * 0.07,
    borderRadius: 100,
    width: windowWidth * 0.14,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
});