import React from 'react';
import SplashScreen from "./Components/Screens/SplashScreen";
import HomeScreen from "./Components/Screens/HomeScreen";

import LoginScreen from "./Components/Screens/Auth/LoginScreen";
import RegisterScreen from "./Components/Screens/Auth/RegisterScreen";
import { StyleSheet, Text, View,Image } from 'react-native';
import {Icon} from "native-base";
import { createStackNavigator, createSwitchNavigator, createAppContainer,createDrawerNavigator,DrawerItems } from "react-navigation";

const DrawerContent = (props) => (
  
  <View>
    <View
      style={{
        backgroundColor: '#D3D3D3',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
    <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
       style={{width: 40, height: 40}} />
    </View>
    <DrawerItems {...props} />
    
  </View>
)

const appStackNavigator = createStackNavigator({HomeScreen},{
  navigationOptions:
  {
    title: 'Lobby',
    drawerIcon: ({ tintColor }) => (
      <Icon
      name="home"
      size={30}
      color='white'
      />
    ),
  },
})

const appDrawerNavigator = createDrawerNavigator({Home:appStackNavigator,Login:LoginScreen,Register:RegisterScreen},{
  contentComponent: DrawerContent,
})

const AppNavigator = createSwitchNavigator(
  {
    SplashScreen,
    HomeScreen:appDrawerNavigator,
    LoginScreen,
    RegisterScreen
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
 
  render() {
    return <AppContainer/>;
  }
}