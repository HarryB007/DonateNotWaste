import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import {EditIcon, EditProfile} from '../../assets/images';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const MyProfile = ({route}) => {

  const {fname, lname, email, PhNumber, imageURL} = route.params;

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#e1e3e1',
      },
      headerTitleStyle: {
        color: '#000', // Set the title color to black
      },
      headerTintColor: '#000',
      headerTitle: 'My Profile',
      color: 'black',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={25}
            color="black"
            onPress={() => {
              /* Handle icon press */
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <View style={styles.container2}></View>
      <Image source={{uri: imageURL}} style={styles.logo1} />
      <Pressable
      onPress={()=> navigation.navigate('EditProfileScreen')}
        style={{
          backgroundColor: '#ebf0f0',
          borderRadius: 30,
          width: 50,
          height: 50,
          alignSelf: 'center',
          marginTop: -50,
          zIndex: 999,
          marginLeft: 90,
        }}>
        <Image source={EditIcon} style={styles.edit} ></Image>
      </Pressable>
      <View style={styles.textpart}>
        <Text style={styles.text1}>{fname + " " + lname}</Text>
        <Text numberOfLines={1}>{email} | {PhNumber.replace(0, "+92 ")}</Text>
      </View>

      <View style={styles.button1}>
        <TouchableHighlight
          style={styles.OneButton}
          onPress={()=> navigation.navigate('EditProfileScreen')}
          underlayColor="#ebf0f0">
          <>
            <View style={styles.child}>
              <View style={styles.circle}>
                <Octicons
                  name="pencil"
                  size={23}
                  color="black"
                  style={styles.logo}
                />
              </View>
              <Text style={styles.optionTitle}>Edit Profile</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={30}
              color="#F86D3B"
            />
          </>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.OneButton}
          onPress={() => navigation.navigate('ChangePas')}
          underlayColor="#ebf0f0">
          <>
            <View style={styles.child}>
              <View style={styles.circle}>
                <MaterialCommunityIcons
                  name="lock"
                  size={26}
                  color="#000"
                  
                />
              </View>
              <Text style={styles.optionTitle}>Change Password</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={30}
              color="#F86D3B"
            />
          </>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.OneButton}
          onPress={()=> navigation.navigate('My posts')}
          underlayColor="#ebf0f0">
          <>
            <View style={styles.child}>
              <View style={styles.circle}>
                <MaterialIcons
                  name="fastfood"
                  size={25}
                  color="#000"
                  style={{}}
                />
              </View>
              <Text style={styles.optionTitle}>My Posts</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={30}
              color="#F86D3B"
            />
          </>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container2: {
    width: '130%',
    alignSelf: 'center',
    height: '18%',
    borderBottomLeftRadius: 190,
    borderBottomRightRadius: 190,
    backgroundColor: '#e1e3e1',
    overflow: 'hidden',
  },
  logo1: {
    width: 150,
    height: 150,
    zIndex: 999,
    borderRadius: 600 / 2,
    alignSelf: 'center',
    marginTop: -70,
  },
  edit: {
    zIndex: 999,
    alignSelf: 'center',
    marginTop: 14,
  },
  textpart: {
    alignItems: 'center',
    marginTop: 5,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button1: {
    marginTop: 60,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#F86D3B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OneButton: {
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    elevation: 7,
    paddingHorizontal: 10,
  },
  child: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  optionTitle: {
    fontSize: 18,
    color: '#000',
    marginLeft:10,
  },
});
