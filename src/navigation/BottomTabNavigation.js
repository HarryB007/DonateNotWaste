// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react';
// import Foundation from 'react-native-vector-icons/Foundation';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Feather from 'react-native-vector-icons/Feather';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Requests from '../screens/Main/Requests';
// import PostNavigation from './PostNavigation';
// import AccountNavigation from './AccountNavigation';
// import AddPost from '../screens/Main/AddPost';
// import ChatList from '../screens/Chat/ChatList';
// import Chat from '../screens/Chat/Chat';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigation = () => {
//     return (
//         <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F86D3B' }, headerShadowVisible: false, headerTintColor: '#fff', headerTitleAlign: 'center', tabBarStyle: { padding: 3 }, tabBarHideOnKeyboard: true }}>
//         <Tab.Screen name="HomeScreen" component={PostNavigation} options={({ route }) => ({
//             tabBarIcon: ({ focused }) => (
//             focused ? <Foundation name="home" size={30} color="#F86D3B" /> : <Octicons name="home" size={30} color="#737171" />
//             ),
//             headerShown: false,
//             tabBarLabel: "Home",
//             tabBarActiveTintColor: '#F86D3B',
//             tabBarInactiveTintColor: '#737171',
//             tabBarStyle: ((route) => {
//             const routeName = getFocusedRouteNameFromRoute(route) ?? ""
//             if (routeName === 'Chat') {
//                 return { display: "none" }
//             }
//             return
//             })(route),
//         })} />
//         <Tab.Screen name="Requests" component={Requests} options={{
//             tabBarIcon: ({ focused }) => (
//             <Feather name="edit" size={30} color={focused ? "#F86D3B" : '#737171'} />
//             ),
//             tabBarActiveTintColor: '#F86D3B',
//             tabBarInactiveTintColor: '#737171',
//         }} />
//         <Tab.Screen name="New Post" component={AddPost} options={{
//             tabBarIcon: () => (
//             <View
//                 style={{
//                 top: -20,
//                 width: 60,
//                 height: 60,
//                 borderRadius: 30,
//                 backgroundColor: '#F86D3B',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 }}>
//                 <Octicons
//                 name="plus-circle"
//                 size={35}
//                 color="#fff"
//                 />
//             </View>
//             ),
//             tabBarLabel: '',
//         }} />
//         <Tab.Screen name="ChatList" component={ChatList} options={{
//             tabBarIcon: ({ focused }) => (
//             focused ? <MaterialIcons name="chat-bubble" size={30} color="#F86D3B" /> : <MaterialIcons name="chat-bubble-outline" size={30} color="#737171" />
//             ),
//             headerShown: false,
//             tabBarActiveTintColor: '#F86D3B',
//             tabBarInactiveTintColor: '#737171',
//             // tabBarStyle: { display: 'none'},
//         }} />
//         <Tab.Screen name="AccountScreen" component={AccountNavigation} options={{
//             tabBarIcon: ({ focused }) => (
//             focused ? <MaterialCommunityIcons name="account-circle" size={30} color="#F86D3B" /> : <MaterialCommunityIcons name="account-circle-outline" size={30} color="#737171" />
//             ),
//             headerShown: false,
//             tabBarLabel: "Account",
//             tabBarActiveTintColor: '#F86D3B',
//             tabBarInactiveTintColor: '#737171',
//         }} />
//         </Tab.Navigator>
//     )
// }

// export default BottomTabNavigation

// const styles = StyleSheet.create({})