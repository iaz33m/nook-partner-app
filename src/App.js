import React from 'react';

import SplashScreen from "./Components/Screens/SplashScreen";
import GuideScreen from "./Components/Screens/GuideScreen";
import ManageNooks from "./Components/Screens/ManageNooks";
import NookListScreen from "./Components/Screens/NookListScreen";
import VisitsScreen from "./Components/Screens/Visits/VisitsScreen";
import ComplaintsScreen from "./Components/Screens/ComplaintsScreen";
import NotificationsScreen from "./Components/Screens/NotificationsScreen";
import ShiftsScreen from "./Components/Screens/ShiftsScreen";
import RoomShiftsScreen from "./Components/Screens/RoomShiftsScreen";
import BookingsScreen from "./Components/Screens/BookingsScreen";
import NoticesScreen from "./Components/Screens/NoticesScreen";
import MyNookScreen from "./Components/Screens/MyNookScreen";
import AddNookScreen from "./Components/Screens/AddNookScreen";
import UpdateNookScreen from "./Components/Screens/UpdateNookScreen";
import PaymentsScreen from "./Components/Screens/Payments/PaymentsScreen";
import ReceiptsScreen from "./Components/Screens/Receipts/ReceiptsScreen";
import ReceiptDetailsScreen from "./Components/Screens/Receipts/ReceiptDetailsScreen";
import ProfileScreen from "./Components/Screens/ProfileScreen";
import LoginScreen from "./Components/Screens/Auth/LoginScreen";
import RegisterScreen from "./Components/Screens/Auth/RegisterScreen";
import GooglePlacesInput from "./Components/Screens/AutoComplete";
import ForgotPasswordScreen from "./Components/Screens/Auth/ForgotPasswordScreen";
import NumberVerificationScreen from "./Components/Screens/Auth/NumberVerificationScreen";
import { View, Image } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as NavigationService from './NavigationService';
import PaymentScreen from './Components/Screens/PaymentScreen';
import HomeScreen from './Components/Screens/Home/HomeScreen';
import NookDetailScreen from './Components/Screens/NookDetail/NookDetailScreen';
import ComplainsDetailScreen from './Components/Screens/Partner/ComplainsDetailScreen'
import VisitsNookScreen from './Components/Screens/Partner/VisitsScreen';


const customTabs = ({ navigation }) => ({
  tabBarIcon: ({ focused, tintColor }) => {
    
    const { routeName } = navigation.state;
    
    const tabStyle = { flex: 1, alignItems: 'center', borderBottomColor: focused ? tintColor : '', borderBottomWidth: focused ? 4 : 0 };
    
    if (routeName === 'Profile') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/profile.png')}
        />
      </View>;
    }

    if (routeName === 'Home') {
      return <View style={tabStyle}>
        <Image style={{ width: 40, height: 45 }}
          source={require('./../assets/home.png')}
        />
      </View>;
    }

    if (routeName === 'MyNook') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/N.png')}
        />
      </View>;
    }

    if (routeName === 'Visits') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/visits.png')}
        />
      </View>;
    }


    if (routeName === 'Complaints') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/complaints.png')}
        />
      </View>;
    }

    if (routeName === 'Notices') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/complaints.png')}
        />
      </View>;
    }

    if (routeName === 'Bookings') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/complaints.png')}
        />
      </View>;
    }

    if (routeName === 'Shifts') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/complaints.png')}
        />
      </View>;
    }

    if (routeName === 'Payment') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/payments.png')}
        />
      </View>;
    }
    if (routeName === 'Receipts') {
      return <View style={tabStyle}>
        <Image style={{ width: 20, height: 25, marginTop: 15 }}
          source={require('./../assets/payments.png')}
        />
      </View>;
    }
  }
});

const TabScreens = createBottomTabNavigator(
  {
    // other screens
    Profile: {
      screen: ProfileScreen
    },
    Complaints: {
      screen: ComplaintsScreen
    },
    // Shifts: {
    //   screen: ShiftsScreen,
    // },
    // Payment: {
    //   screen: PaymentScreen,
    // },
    // Receipts: {
    //   screen: ReceiptsScreen,
    // },
    // Notices: {
    //   screen: NoticesScreen
    // },
    Home: {
      screen: HomeScreen
    },
    Bookings: {
      screen: BookingsScreen,
    },
    Visits: {
      screen: VisitsNookScreen
    },
  },
  {
    defaultNavigationOptions: customTabs,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#E59413',
      inactiveTintColor: 'rgba(0,0,0,0.6)',
      showLabel: true,
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
        height: 60
      },
      activeTabStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 4,
        borderColor: '#6C1D7C'
      }
    },
  }
);

const AppNavigator = createStackNavigator(
  {
    GuideScreen,
    NookDetailScreen,
    VisitsNookScreen,
    ComplainsDetailScreen,
    SplashScreen,
    LoginScreen,
    ProfileScreen,
    TabScreens,
    ComplaintsScreen,
    NotificationsScreen,
    ReceiptsScreen,
    PaymentsScreen,
    NoticesScreen,
    ShiftsScreen,
    RoomShiftsScreen,
    PaymentScreen,
    AddNookScreen,
    UpdateNookScreen,
    ManageNooks,
    ForgotPasswordScreen,
    NumberVerificationScreen,
    RegisterScreen,
    GooglePlacesInput,
    ReceiptDetailsScreen,
    NookListScreen
  }, {
  // initialRouteName: "LoginScreen",
  initialRouteName: "SplashScreen",
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
