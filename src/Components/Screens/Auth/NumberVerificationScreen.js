import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View } from 'react-native';
import Button from '../../SeperateComponents/Button';
import InputField from '../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import * as NavigationService from '../../../NavigationService';
import Colors from '../../../helper/Colors';
import * as actions from '../../../Store/Actions/AuthActions';

class NumberVerificationScreen extends React.Component {

  state = {
    code: '',
  };

  componentDidMount = () => {
    this.sendCode();
  }

  sendCode = () => {
    const {
      sendNumberVerificationCode,
      user: {
        access_token: token
      }
    } = this.props;

    sendNumberVerificationCode({
      token,
      onError: alert
    });
  }

  verifyNumber = () => {

    const {
      verifyNumber,
      user: {
        access_token: token
      }
    } = this.props;

    const { code } = this.state;

    if (!code) {
      return alert('Code is Required');
    }

    verifyNumber({
      data: { code },
      token,
      onSuccess: () => {
        NavigationService.navigateAndResetStack("TabScreens");
      },
      onError: alert
    });
  }

  render() {
    const { code } = this.state;
    const { user: { number } } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header />
        <View style={styles.container}>
          <View style={styles.child}>
            <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Verify Number!</TitleText>
            <TitleText style={{ margin: 15, marginBottom: 0, fontSize: 16, }}>Number Verification code is send to your number {number}</TitleText>
            <View style={{ marginTop: 30, marginStart: '5%', marginEnd: '5%' }}>
              <InputField iconName="md-phone-portrait" value={code} onChangeText={code => this.setState({ code })}>Code</InputField>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20, }}>
              <Button onPress={this.verifyNumber}  >Verify Number</Button>
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

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps,
  {
    sendNumberVerificationCode: actions.sendNumberVerificationCode,
    verifyNumber: actions.verifyNumber,
  }
)(NumberVerificationScreen);