// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from '../Screens/Main/Home';
// import PostDetail from '../Screens/Main/PostDetail';
// import SendRequest from '../Screens/Main/SendRequest';
// import Chat from '../Screens/Chat/Chat';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

// const Stack = createSharedElementStackNavigator();

// const PostNavigation = () => {

//   return (
//     <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerStyle: { backgroundColor: '#F86D3B' }, headerTintColor: '#fff', headerTitleAlign: 'center' }}>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Post Detail" component={PostDetail}
//         sharedElements={(route, otherRoute, showing) => {
//           return ['image'+route.params.pid];
//         }}
//       />
//       <Stack.Screen name="Send Request" component={SendRequest} />
//       <Stack.Screen name="Chat" component={Chat} />
//     </Stack.Navigator>
//   )
// }

// export default PostNavigation

// const styles = StyleSheet.create({})