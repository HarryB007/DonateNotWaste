import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
// import BottomTabNavigation from './src/navigation/BottomTabNavigation';

// Import Firebase and its modules
import  firebase  from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/auth'; 

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const App = () => {
  useEffect(() => {
    // Additional initialization code or side effects can go here
  }, []);

  return (
    <NavigationContainer>
      <StackNavigation />
      {/* <BottomTabNavigation /> */}
    </NavigationContainer>
  );
};

export default App;

