import {StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch3 = () => setIsEnabled2(previousState => !previousState);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: '#000',
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <View style={{marginHorizontal: 20}}>
        <View style={styles.row}>
          <FontAwesome5 name="users-cog" size={30} color="#F86D3B" />
          <Text style={styles.text1}>Account</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 10,
          }}
        />
        <View>
          <Text
            onPress={() => {
              console.log('clicked');
            }}
            style={styles.text2}>
            Edit Profile
          </Text>
          <Text
            onPress={() => {
              console.log('clicked');
            }}
            style={styles.text2}>
            Change Password
          </Text>
          <Text
            onPress={() => {
              console.log('clicked');
            }}
            style={styles.text2}>
            Privacy
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="bell-circle"
            size={35}
            color="#F86D3B"
          />
          <Text style={styles.text1}>Notifications</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 10,
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            onPress={() => {
              console.log('clicked');
            }}
            style={styles.text2}>
            Notifications
          </Text>
          <Switch
            trackColor={{false: '#767577', true: 'grey'}}
            thumbColor={isEnabled ? '#F86D3B' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            onPress={() => {
              console.log('clicked');
            }}
            style={styles.text2}>
            Updates
          </Text>
          <Switch
            trackColor={{false: '#f4f3f4', true: '#f4f3f4'}}
            thumbColor={isEnabled2 ? '#F86D3B' : 'grey'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],}}
          />
        </View>
        <View style={styles.row}>
          <Ionicons
            name="settings-outline"
            size={35}
            color="#F86D3B"
          />
          <Text style={styles.text1}>Others</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 10,
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            onPress={() => {
              console.log('clicked');
            }}
            style={styles.text2}>
            Dark/Light Mode
          </Text>
          <Switch
            trackColor={{false: '#f4f3f4', true: '#f4f3f4'}}
            thumbColor={isEnabled3 ? '#F86D3B' : 'grey'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isEnabled3}
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],}}
          />
        </View>
        
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 6,
    width: '100%',
    alignItems: 'center',
    height: 40,
  },
  text1: {
    fontSize: 21,
    fontWeight: 700,
    color: '#F86D3B',
    marginLeft: 10,
  },
  text2: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 6,
  },
});