import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    TextInput,
    Pressable,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
    } from 'react-native';
    import * as yup from 'yup';
    import { Formik } from 'formik';
    import ErrorMessage from '../../components/ErrorMessage';
    import React, { useEffect, useState } from 'react';
    import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
    import Ionicons from 'react-native-vector-icons/Ionicons';
    import MapsModal from '../../components/MapsModal.js';
    import ImageModal, { uploadImage } from '../../components/ImageModal.js';
    import firestore from '@react-native-firebase/firestore';
    import storage from '@react-native-firebase/storage';
    import firebase from '@react-native-firebase/app';
    // import ImagePicker from 'react-native-image-crop-picker';
    import Header from '../../components/Header';
    import DatePicker from 'react-native-datepicker';
    import DateTimePicker from '@react-native-community/datetimepicker';
    
    const AddPost = () => {
        const [showDatePicker, setShowDatePicker] = useState(false);
        const [selectedDate, setSelectedDate] = useState(new Date());
    
        const [modalVisible, setModalVisible] = useState(false);
        const [imageModalVisible, setImageModalVisible] = useState(false);
    
        const [latitude, setLatitude] = useState(null);
        const [longitude, setLongitude] = useState(null);
    
        const [image, setImage] = useState(null);
        const [loader, setLoader] = useState(false);
    
        const [user, setUser] = useState('');
    
        const handleDateChange = (event, date) => {
            setShowDatePicker(false);
            if (date) {
                setSelectedDate(date);
                setValues({ ...values, date: date.toISOString() });
            }
        };

        const getData = async () => {
        try {
            const email = firebase.auth().currentUser.email;
            await firestore().collection('users').where("email", "==", email).get()
            .then((querySnapshot) => {
                setUser(querySnapshot.docs[0].data());
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        } catch (error) {
            alert("Error getting profile data");
            console.log("Error from account", error);
        }
        }
    
    
        useEffect(() => {
        getData();
    
        }, []);
    
    
        const uploadImage = async () => {
        setLoader(true);
        let promise = new Promise(async (resolve, reject) => {
            try {
            const reference = storage().ref(image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length));
            const pathToFile = image.path;
            await reference.putFile(pathToFile);
    
            const url = await storage().ref(image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length)).getDownloadURL();
            if (url) console.log(url)
            resolve(url);
    
            } catch (error) {
            alert("Error uploading image")
            reject(error);
            throw new Error("Error from uploadImage", error)
            }
        });
        return promise;
        }
    
        const addData = (values) => {
        console.log("From add data", values)
        uploadImage()
        .then((url) => {
            values.imageUrl = url
            // values.location = user.city
            firestore()
            .collection('posts')
            .add(values)
            .then(() => {
                alert('Post added successfully');
                setLoader(true)
                setImage(null)
                setLatitude(null)
                setLongitude(null)
            })
            .catch((error) => {
                console.log("from add data:", error);
                throw new Error("SignUp failed");
            });
        })
        }
        const onSubmitValue = (values, { resetForm }) => {
        // if (!latitude) return alert("Please select your location");
        if (!image) return alert("Please select image");
        values.location = user.city;
        values.email = user.email;
        values.coordinates = {latitude, longitude};
        resetForm();
        addData(values)
        };
    
    
        const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('name is required'),
        details: yup
            .string()
            .min(10, "Please write proper details")
            .required('details is required'),
        date: yup
            .string()
            .min(11)
            .required("Expiration date is required"),
        });
    
    
    
        return (
        <>
            {loader ? <View style={styles.loader}>
            <ActivityIndicator size={30} color="#000" />
            </View> : ""}
            <Formik
            initialValues={{ name: "", details: "", date: "", location: "" }}
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
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }} contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <Header title={'Post'} showBackButton={true}/>
                    <View style={styles.box1}>
                    <View style={{ marginTop: 1 }}>
                        <TextInput
                        placeholder="Name of the Food"
                        placeholderTextColor={"#B0B0B0"}
                        style={styles.input}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        />
                        <ErrorMessage
                        error={errors['name']}
                        visible={touched['name']}
                        />
                    </View>
                    <View>
                        <TextInput
                        placeholder="Description"
                        placeholderTextColor={"#B0B0B0"}
                        style={[styles.input, { height: 100 }]}
                        name='details'
                        onChangeText={handleChange('details')}
                        onBlur={handleBlur('details')}
                        value={values.details}
                        />
                        <ErrorMessage
                        error={errors['details']}
                        visible={touched['details']}
                        />
                    </View>
                    
                    <View>
                        <TouchableOpacity
                        style={styles.input}
                        onPress={() => setShowDatePicker(true)}
                        >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{ color: '#000', alignSelf:'center',paddingTop:15 }}>
                            {selectedDate.toLocaleDateString()}
                            </Text>
                            <Ionicons name="calendar" size={22} color="#000" />
                        </View>
                        </TouchableOpacity>

                        {showDatePicker && (
                        <DateTimePicker
                            placeholderTextColor={"#B0B0B0"}
                            value={selectedDate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChange}
                        />
                        )}
                    </View>
    
                    {/* <TouchableOpacity style={styles.input} onPress={() => setModalVisible(!modalVisible)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#B0B0B0' }}>{latitude ? "Location selected" : "Add your location"}</Text>
                        <MaterialIcons name="location-on" size={30} color="#000" />
                        </View>
                        {latitude ? "" : <Text style={{ color: 'red', fontSize: 13 }}>Select location in map</Text>}
                        <ErrorMessage
                        error={errors['imageUrl']}
                        visible={touched['imageUrl']}
                        />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.input} onPress={() => setModalVisible(!modalVisible)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#B0B0B0' }}>{latitude ? `Location: ${user.city}` : "Add your location"}</Text>
                            <MaterialIcons name="location-on" size={30} color="#000" />
                        </View>
                        {latitude ? "" : <Text style={{ color: 'red', fontSize: 13 }}>Select in map</Text>}
                        <ErrorMessage
                            error={errors['location']}
                            visible={touched['location']}
                        />
                    </TouchableOpacity> */}

    
                    <TouchableOpacity style={styles.input} onPress={() => setImageModalVisible(!imageModalVisible)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#B0B0B0' }} >{image ? "Image Selected" : "Upload image"}</Text>
                        <Ionicons name="folder" size={22} color="#000" />
                        </View>
                        <ErrorMessage
                        error={errors['imageUrl']}
                        visible={touched['imageUrl']}
                        />
                    </TouchableOpacity>
    
    
                    <TouchableHighlight style={styles.press} onPress={handleSubmit} underlayColor="#B0B0B0">
                        <Text style={styles.text1}>Post</Text>
                    </TouchableHighlight>
    
    
                    </View>
                </KeyboardAvoidingView>
                </ScrollView>
            )}
            </Formik>
            {/* <Modal
            animationType='slide'
            visible={modalVisible}
            >
            <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                latitude: 33.68569082450017,
                longitude: 73.04829455193457,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            >
                <Marker
                coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                }}
                image={require('../../assets/images/map_marker.png')}
                />
    
    
    
            </MapView>
                <TouchableOpacity style={styles.locationBtn}>
                <MaterialIcons name="my-location" size={30} color="#fff" onPress={getLocation} />
                </TouchableOpacity>
                <AntDesign name="closecircle" size={30} color="#000" style={styles.closeIcon} onPress={() => setModalVisible(!modalVisible)} />
            </Modal> */}
            {/* <MapsModal latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
            <ImageModal modalVisible={imageModalVisible} setModalVisible={setImageModalVisible} setImage={setImage} image={image} setLoader={setLoader} />
    
        </>
        );
    };
    
    const styles = StyleSheet.create({
        container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
        },
        header: {
        width: '100%',
        height: '8%',
        alignItems: 'center',
        backgroundColor: '#F86D3B',
        //   marginTop:-180,
    
        },
        text1: {
        color: 'white',
        fontSize: 32,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        },
        box1: {
        backgroundColor: '#fff',
        width: '90%',
        height: '85%',
        alignSelf: 'center',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        },
        logo1: {
        width: 130,
        height: 130,
        zIndex: 999,
        borderRadius: 400 / 2,
        alignSelf: 'center',
        marginTop: 50,
        },
        input: {
        width: 330,
        alignSelf: 'center',
        height: 70,
        fontSize: 13,
        elevation: 4,
        paddingLeft: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        color: '#00437a',
        marginTop: 20,
        },
        icon: {
        position: 'relative',
        top: 45,
        marginLeft: 20,
        zIndex: 1,
    
        },
        text2: {
        alignSelf: 'flex-end', marginRight: 20, marginTop: 5
        },
        text3: {
        marginBottom: -50, marginTop: 20
        },
        text4: {
        color: '#F86D3B', fontWeight: 'bold'
        },
        btn: {
        flexDirection: 'row',
        },
        locationBtn: {
        backgroundColor: '#F86D3B',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        },
        closeIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        },
        press: {
        backgroundColor: '#F86D3B',
        width: 250,
        padding: 10,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 20,
        },
        text1: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        },
        loader: {
        width: '100%',
        height: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        }
    });
    
    export default AddPost;