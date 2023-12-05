import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const ImageModal = ({ modalVisible, setModalVisible, setImage, setLoader, image }) => {
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } else {
        const result = await check(PERMISSIONS.IOS.CAMERA);
        if (result === RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const TakePhotoFromCamera = () => {
    try {
      ImagePicker.openCamera({
        width: 400,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7,
      }).then((imageG) => {
        setImage(imageG);
        setModalVisible(!modalVisible);
      });
    } catch (error) {
      alert('Error uploading image');
      console.log('Error from TakePhotoFromCamera', error);
    }
  };

  const ChoosePhotoFromGallery = () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
        mediaType: 'photo',
      }).then((imageG) => {
        setModalVisible(!modalVisible);
        setImage(imageG);
      });
    } catch (error) {
      alert('Error uploading image');
      console.log('Error from ChoosePhotoFromGallery', error);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <View style={{ alignItems: 'flex-end' }}>
            <MaterialCommunityIcons
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              name="close"
              size={30}
              color="#000"
              style={{ marginTop: 10 }}
            />
          </View>
          <TouchableHighlight style={{ marginTop: 15 }} onPress={TakePhotoFromCamera} underlayColor="#ffffff00">
            <Text style={styles.btn}>Open camera</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{ marginTop: 15 }} onPress={ChoosePhotoFromGallery} underlayColor="#ffffff00">
            <Text style={styles.btn}>Choose Image</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '70%',
    height: '30%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#F86D3B',
    textAlign: 'center',
    padding: 10,
    borderRadius: 20,
  },
});

export default ImageModal;
