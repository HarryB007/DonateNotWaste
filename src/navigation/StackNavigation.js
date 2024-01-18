import * as React from 'react';

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../screens/Landing/LandingScreen';
import LandingScreen1 from '../screens/Landing/LandingScreen1';
import LandingScreen2 from '../screens/Landing/LandingScreen2';
import LandingScreen3 from '../screens/Landing/LandingScreen3';
import StartScreen from '../screens/Landing/StartScreen';
import LandingPage from '../screens/LoginSignUp/LandingPage';
import LoginScreen from '../screens/LoginSignUp/LoginScreen';
import SignUpScreen from '../screens/LoginSignUp/SignUpScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import DonorHomePage from '../screens/Main/DonorHomePage';
import NeedyHomePage from '../screens/Main/NeedyHomePage';
import AddPost from '../screens/Main/AddPost';
import ViewPost from '../screens/Main/ViewPost';
import BottomTabNavigation from '../navigation/BottomTabNavigation';
import ForgotPassword from '../screens/LoginSignUp/ForgotPassword';
import FoodDetails from '../screens/Main/FoodDetails';
enableScreens();

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName="LandingScreen1">
            {/* <Stack.Screen name="LandingScreen1" component={LandingScreen1} />
            <Stack.Screen name="LandingScreen2" component={LandingScreen2} />
            <Stack.Screen name="LandingScreen3" component={LandingScreen3} /> */}
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
            <Stack.Screen name="DonorHomePage" component={DonorHomePage} />
            <Stack.Screen name="AddPost" component={AddPost} />
            <Stack.Screen name="ViewPost" component={ViewPost} />
            <Stack.Screen name="NeedyHomePage" component={NeedyHomePage} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="FoodDetails" component={FoodDetails} />
            {/* <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} /> */}
        </Stack.Navigator>
    );
}