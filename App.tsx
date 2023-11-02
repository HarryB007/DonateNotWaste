import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//Import local  components here
import Header from './src/components/Header';
import ImageCard from './src/components/ImageCard';
import ButtonC from './src/components/ButtonC';

export default function WelcomeApp() {
  return (
    <View style={styles.container}>
        <Header/>
        <ImageCard/>
        <ButtonC text={undefined} onPress={undefined}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
