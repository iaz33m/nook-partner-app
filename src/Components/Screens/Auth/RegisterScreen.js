import React from 'react';
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

class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    };
  }

  handleSignup = () => {
    console.log(this.state);
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    });

    if (this.state.username.length < 5 || this.state.username.length > 50) {
      this.setState({
        usernameError: "Username must be greater than 5 and less than 50."
      });
      return;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      this.setState({
        emailError: "Email is not correct."
      });
      return;
    }

    if (this.state.password.length < 6 || this.state.password.length > 50) {
      this.setState({
        passwordError: "Password must be greater than 6 and less than 50."
      });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "Please type same password in both fields."
      });
      return;
    }
  }

  render() {
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
                  onChangeText={username => this.setState({ username })}
                  iconName="person"
                  value={this.state.username}
                  errorMessage={this.state.usernameError}
                >User Name</InputField>
                <InputField
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  iconName="mail"
                  errorMessage={this.state.emailError}
                >Email Address</InputField>
                <InputField
                  iconName="eye"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  errorMessage={this.state.passwordError}
                >Password</InputField>
                <InputField
                  iconName="eye"
                  secureTextEntry
                  onChangeText={confirmPassword => this.setState({ confirmPassword })}
                  errorMessage={this.state.confirmPasswordError}
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

export default RegisterScreen;