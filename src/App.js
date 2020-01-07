import React from 'react';

import SplashScreen from "./Components/Screens/SplashScreen";
import GuideScreen from "./Components/Screens/GuideScreen";
import HomeScreen from "./Components/Screens/HomeScreen";
import VisitsScreen from "./Components/Screens/VisitsScreen";
import ComplaintsScreen from "./Components/Screens/ComplaintsScreen";
import NotificationScreen from "./Components/Screens/NotificationScreen";
import AddNookScreen from "./Components/Screens/AddNookScreen";
import ProfileSecurityScreen from "./Components/Screens/ProfileSecurityScreen";
import ProfileScreen from "./Components/Screens/ProfileScreen";

import LoginScreen from "./Components/Screens/Auth/LoginScreen";
import RegisterScreen from "./Components/Screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "./Components/Screens/Auth/ForgotPasswordScreen";
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from "native-base";
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import * as NavigationService from './NavigationService';
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
      <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
        style={{ width: 40, height: 40 }} />
    </View>
    <DrawerItems {...props} />

  </View>
)

const renderNav = (routeName, name, tintColor, focused) => (
  <View style={{ flex: 1, alignItems: 'center', borderBottomColor: focused ? tintColor : '', borderBottomWidth: focused ? 4 : 0 }}>
    <Icon name={name} color={tintColor} size={12} style={{ paddingBottom: 4, paddingTop: 10 }} />
    <Text style={{ paddingBottom: 8 }}>{routeName}</Text>
  </View>
)

const customTabs = ({ navigation }) => ({
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    const { routeName } = navigation.state;
    if (routeName === 'Profile') {
      return renderNav(routeName, 'person', tintColor, focused);
    } else if (routeName === 'Home') {
      return renderNav(routeName, 'home', tintColor, focused);
    } else if (routeName === 'Notification') {
      return renderNav(routeName, 'notifications', tintColor, focused);
    } else if (routeName === 'Visits') {
      return renderNav(routeName, 'home', tintColor, focused);
    } else if (routeName === 'Complaints') {
      return renderNav(routeName, 'home', tintColor, focused);
    }
  }
});

const TabScreens = createBottomTabNavigator(
  {
    // other screens
    Profile: {
      screen: ProfileScreen
    },
    Notification: {
      screen: NotificationScreen,
    },
    Home: {
      screen: HomeScreen
    },
    Complaints: {
      screen: ComplaintsScreen
    },
    Visits: {
      screen: VisitsScreen
    },
  },
  {
    defaultNavigationOptions: customTabs,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#6C1D7C',
      inactiveTintColor: 'rgba(0,0,0,0.6)',
      showLabel: false,
      style: {
        shadowColor: 'rgba(58,55,55,0.1)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 3,
        borderTopColor: 'transparent',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 70
      },
      activeTabStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 4,
        borderColor: '#6C1D7C'
      }
    },
  }
);

const appStackNavigator = createStackNavigator({ HomeScreen }, {
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

const appDrawerNavigator = createDrawerNavigator({ Home: appStackNavigator, Login: LoginScreen, Register: RegisterScreen }, {
  contentComponent: DrawerContent,
})

const AppNavigator = createStackNavigator(
  {
    SplashScreen,
    LoginScreen,
    TabScreens,
    AddNookScreen,
    GuideScreen,
    ForgotPasswordScreen,
    ProfileSecurityScreen,
    RegisterScreen
  }, {
  initialRouteName: "TabScreens",
  headerMode: 'none'
}
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    return <AppContainer ref={navigatorRef => {
      this.navigator = navigatorRef;
    }} />;
  }
}