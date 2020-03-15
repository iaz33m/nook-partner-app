import React from 'react';
import { connect } from "react-redux";
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from './../../SeperateComponents/Button';
import InputField from './../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import * as NavigationService from '../../../NavigationService';
import Colors from '../../../helper/Colors';
import { AsyncStorage } from 'react-native';
import * as actions from '../../../Store/Actions/AuthActions';

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

  socialLogin = (provider) => {
    const {socialLogin} = this.props;
    socialLogin({
      data: { provider },
      onSuccess: () => {
        this.moveToHome();
      },
      onError: alert
    });
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
       this.moveToHome();
      },
      onError: alert
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
            <KeyboardAwareScrollView>
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
            <View style={{ flex: 1, alignContent: "center", alignItems: "center", marginBottom:70 }}>
              <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center', marginTop: 10, textAlign: 'center', width: '100%', }}>
                  <Button onPress={this.login}>Sign In</Button>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>or continue with</Text>
                </View>
              </View>
              <View style={{ flex: 1, alignContent: "center", alignItems: "center", marginTop: 10 }}>
                <View style={{ flexDirection: 'row', width: '40%', alignSelf: 'center', }}>
                  <TouchableOpacity onPress={() => this.socialLogin('facebook')}>
                  <Image style={{ marginEnd: 20, width: 40, height: 40 }}
                    source={require('./../../../../assets/facebook.png')}
                  />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.socialLogin('google')}>
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
            </KeyboardAwareScrollView>
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
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.08,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    // Android shadow
    elevation: 3
  }
})



export default connect(
  null,
  { 
    login: actions.login,
    socialLogin: actions.socialLogin,
  }
)(LoginScreen);
