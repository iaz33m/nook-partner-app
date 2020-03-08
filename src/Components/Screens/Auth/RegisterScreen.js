import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton } from 'native-base';
import Button from './../../SeperateComponents/Button';
import InputField from './../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import * as NavigationService from '../../../NavigationService';
import Colors from '../../../helper/Colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as actions from '../../../Store/Actions/AuthActions';

class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      password: '',
      confirmPassword: '',
      nameError: '',
      numberError: '',
      passwordError: '',
      confirmPasswordError: ''
    };
  }

  handleSignup = () => {
    this.setState({
      nameError: '',
      numberError: '',
      passwordError: '',
      confirmPasswordError: ''
    });

    const { register } = this.props;

    const { name, number, password, confirmPassword } = this.state;

    if (name.length < 5 || name.length > 50) {
      return this.setState({
        nameError: "Name must be greater than 5 and less than 50."
      });
    }

    if (!number) {
      return this.setState({
        numberError: "Number is required."
      });
    }

    if (password.length < 6 || password.length > 50) {
      return this.setState({
        passwordError: "Password must be greater than 6 and less than 50."
      });
    }

    if (password !== confirmPassword) {
      return this.setState({
        confirmPasswordError: "Please type same password in both fields."
      });
    }
    
    register({
      data: { name, number, password },
      onSuccess: () => {
        NavigationService.navigateAndResetStack("NumberVerificationScreen");
      },
      onError: message => {
        alert(message);
      }
    });

  }

  socialLogin = (provider) => {
    const {socialLogin} = this.props;
    socialLogin({
      data: { provider },
      onSuccess: (user) => {
        // this.moveToHome();
        console.log({user});
      },
      onError: alert
    });
  };

  render() {

    const {
      name,
      number,
      password,
      confirmPassword,
      nameError,
      numberError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header backButton={true} />
        <View style={styles.container}>
          <View style={styles.child}>

            <KeyboardAwareScrollView>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Sign Up</TitleText>
              <TitleText style={{ margin: 15, marginBottom: 10, fontSize: 16, }}>Sign up to continue Nook </TitleText>
              <View style={{ marginStart: '5%', marginEnd: '5%' }}>
                <InputField
                  onChangeText={name => this.setState({ name })}
                  iconName="person"
                  value={name}
                  errorMessage={nameError}
                >Name</InputField>
                <InputField
                  onChangeText={number => this.setState({ number })}
                  value={number}
                  iconName="md-phone-portrait"
                  errorMessage={numberError}
                >Number</InputField>
                <InputField
                  iconName="eye"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  errorMessage={passwordError}
                >Password</InputField>
                <InputField
                  iconName="eye"
                  secureTextEntry
                  onChangeText={confirmPassword => this.setState({ confirmPassword })}
                  errorMessage={confirmPasswordError}
                >Confirm Password</InputField>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Button onPress={this.handleSignup}>Sign Up</Button>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                <Text>Already have an account? </Text><Text style={{
                  textDecorationLine: 'underline',
                }} onPress={() => NavigationService.goBack()}>Login!</Text>
              </View>
              <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', alignSelf: 'center', }}>
                <Image style={{ marginEnd: 20, width: 40, height: 40 }}
                  source={require('./../../../../assets/facebook.png')}
                />
                <Image style={{ marginEnd: 20, width: 40, height: 40 }}
                  source={require('./../../../../assets/google.png')}
                />
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
  { register: actions.register }
)(RegisterScreen);