import React from 'react';
import { connect } from "react-redux";
import {StyleSheet, View, Image, ScrollView, TouchableOpacity} from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton } from 'native-base';
import Button from './../../SeperateComponents/Button';
import InputField from './../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import * as NavigationService from '../../../NavigationService';
import Colors from '../../../helper/Colors';
import { AsyncStorage } from 'react-native';
import * as actions from '../../../Store/Actions/AuthActions';
// import styles from "../Home/styles";
import * as Google from "expo-google-app-auth";
import Expo from 'expo';
import {CLIENT_IDS} from "../../../helper/Constants"
import * as Facebook from 'expo-facebook';
const FACEBOOK_CLIENT_ID =
    CLIENT_IDS._facebook;
const ANDROID_CLIENT_ID =
    CLIENT_IDS._google;
class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number: '',
      password: ''
    };
  }


  moveToHome = () => {
    NavigationService.navigateAndResetStack("TabScreens");
  };
  signInWithGoogle = async () => {
    console.log('google login pressed');
    try {
      const result = await Google.logInAsync({
        // iosClientId: IOS_CLIENT_ID,
        issuer: 'https://accounts.google.com',
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("USERNAME: ", result.user.givenName);
        console.log('signInAsync', result);
        NavigationService.navigateAndResetStack("TabScreens");

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      const message = 'Google Login Error: '+ e;
      console.log('Google Login Error: ', e);
      alert(message);
      return { error: true };
    }
  };




  signInWithFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_CLIENT_ID, {
        permissions: ["public_profile"]
      });

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
        );
        console.log("Logged in!", `Hi ${(await response.json()).name}!`);
        NavigationService.navigateAndResetStack("TabScreens");
      } else {
        alert(`Facebook Login Error: Cancelled`);
      }
    } catch ({ message }) {
      console.error(`Facebook Login Error: ${message}`);
      alert(`Facebook Login Error: ${message}`);
    }
  };

  login = () => {
    const { login } = this.props;

    const { number, password } = this.state;
    if (!number) {
      return alert('Number is required.');
    }

    if (!password) {
      return alert('Password is required.');
    }

    login({
      data: { number, password },
      onSuccess: () => {
        NavigationService.navigateAndResetStack("TabScreens");
      },
      onError: message => {
        alert(message);
      }
    });

  }
//TODO add touchable opacity on partner app home screen icon
  render() {

    const { number, password } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header skipButton={() => {
          AsyncStorage.setItem('skiped', 'true').then(() => {
            this.moveToHome();
          });
        }} />
        <View style={styles.container}>
          <View style={styles.child}>
            <View style={{ flex: 1, }}>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Login</TitleText>
              <TitleText style={{ margin: 15, marginBottom: 0, fontSize: 16, }}>Login to continue Nook </TitleText>
              <View style={{ flex: 1, marginTop: '5%', marginStart: '5%', marginEnd: '5%' }}>
                <InputField
                  iconName="md-phone-portrait"
                  value={number}
                  textContentType="telephoneNumber"
                  onChangeText={number => this.setState({ number })}
                >Number</InputField>
                <InputField
                  iconName="eye"
                  secureTextEntry
                  value={password}
                  onChangeText={password => this.setState({ password })}
                >Password</InputField>
              </View>

              <Text onPress={() => NavigationService.navigate("ForgotPasswordScreen")} style={{ marginTop: 30, textDecorationLine: 'underline', alignSelf: 'flex-end', marginEnd: 30 }}>
                Forgot password?
              </Text>

            </View>
            <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
              <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <Button onPress={this.login}  >Sign In</Button>
                </View>
                {/* <View style={{ marginTop: 10 }}>
                  <Text>or continue with</Text>
                </View> */}
              </View>
              <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: 'row', width: '40%', alignSelf: 'center', }}>
                  <TouchableOpacity onPress={() => this.signInWithFacebook()}>
                  <Image style={{ marginEnd: 20, width: 40, height: 40 }}
                    source={require('./../../../../assets/facebook.png')}
                  />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.signInWithGoogle()}>
                  <Image style={{ marginEnd: 20, width: 40, height: 40 }}
                    source={require('./../../../../assets/google.png')}
                  />
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row' }} >
                  <Text>Don't have an account? </Text><Text style={{
                    textDecorationLine: 'underline',
                  }} onPress={() => NavigationService.navigate("RegisterScreen")}>Signup!</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, margin: 25,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15
  },
  child: {
    flex: 1,
    borderRadius: 15,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 4
  }
})

export default connect(
  null,
  { login: actions.login }
)(LoginScreen);
