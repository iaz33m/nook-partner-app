import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton } from 'native-base';
import Button from '../../SeperateComponents/Button';
import InputField from '../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import * as NavigationService from '../../../NavigationService';
import Colors from '../../../helper/Colors';
import * as actions from '../../../Store/Actions/AuthActions';

class NumberVerificationScreen extends React.Component {

  state = {
    view: 'sendCode',
    number: '',
    password: '',
    code: '',
  };

  sendCode = () => {
    const { sendNumberVerificationCode } = this.props;
    const { number } = this.state;
    if (!number) {
      return alert('Number is Required');
    }

    sendNumberVerificationCode({
      data: { number },
      onSuccess: (data) => {
        const { token } = data;
        this.setState({ view: 'verifyNumber', code: JSON.stringify(token) });
      },
      onError: alert
    });
  }

  verifyNumber = () => {
    const { verifyNumber } = this.props;
    const { code, password, number } = this.state;

    if (!code) {
      return alert('Code is Required');
    }
    if (!password) {
      return alert('Password is Required');
    }

    verifyNumber({
      data: { token: code, password, number },
      onSuccess: () => {
        NavigationService.navigateAndResetStack("LoginScreen");
        alert('Password Changed Successfully, you can login now');
      },
      onError: message => {
        alert(message);
      }
    });
  }


  renderView = () => {
    const { view, number, code, password } = this.state;

    if (view === 'sendCode') {
      return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
          <Header />
          <View style={styles.container}>
            <View style={styles.child}>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Forgot Password!</TitleText>
              <TitleText style={{ margin: 15, marginBottom: 0, fontSize: 16, }}>Enter your phone number (Required) </TitleText>
              <View style={{ marginTop: 30, marginStart: '5%', marginEnd: '5%' }}>
                <InputField iconName="md-phone-portrait" value={number} onChangeText={number => this.setState({ number })}>Number</InputField>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20, }}>
                <Button onPress={this.sendCode}  >Send Code</Button>
              </View>
            </View>
          </View>
        </View >
      );
    }
    if (view === 'verifyNumber') {
      return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
          <Header />
          <View style={styles.container}>
            <View style={styles.child}>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Forgot Password!</TitleText>
              <TitleText style={{ margin: 15, marginBottom: 0, fontSize: 16, }}>Enter Verification Code to reset your Password ! </TitleText>
              <View style={{ marginTop: 30, marginStart: '5%', marginEnd: '5%' }}>
                <InputField iconName="md-phone-portrait" value={code} onChangeText={code => this.setState({ code })}>Code</InputField>
                <InputField
                  iconName="eye"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  value={password}
                >New Password</InputField>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20, }}>
                <Button onPress={this.verifyNumber}  >Change Password</Button>
              </View>
            </View>
          </View>
        </View >
      );
    }
  }

  render() {
    return (
      this.renderView()
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
  {
    sendNumberVerificationCode: actions.sendNumberVerificationCode,
    verifyNumber: actions.verifyNumber,
  }
)(NumberVerificationScreen);