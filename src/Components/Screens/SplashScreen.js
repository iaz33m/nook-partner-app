import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Button, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as NavigationService from '../../NavigationService'
import * as actions from '../../Store/Actions/AuthActions';
import { AsyncStorage } from 'react-native';

class SplashScreen extends React.Component {

  state = {
    expoPushToken: '',
    notification: {},
  };

  async componentDidMount() {
    const { syncWithAsyncStorage } = this.props;
    // await this.registerForPushNotificationsAsync();
    // this._notificationSubscription = Notifications.addListener(this._handleNotification);
    syncWithAsyncStorage({
      onSuccess: ({user, skiped, welcome}) => {
        if(welcome !== 'true'){
          AsyncStorage.setItem('welcome','true');
          return NavigationService.navigateAndResetStack('GuideScreen');
        }

        let screen = (user || skiped === 'true') ? "TabScreens" : "LoginScreen";
        NavigationService.navigateAndResetStack(screen);
      }
    });
  }

  
  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };
  
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log({token});
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  render() {
    
    return (
      <View style={styles.container}>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
    skiped: state.AuthReducer.skiped,
    welcome: state.AuthReducer.welcome,
  };
};

export default connect(
  mapStateToProps,
  { syncWithAsyncStorage: actions.syncWithAsyncStorage }
)(SplashScreen);