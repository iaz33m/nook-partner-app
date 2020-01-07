import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton } from 'native-base';
import Button from './../../SeperateComponents/Button';
import InputField from './../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import * as NavigationService from '../../../NavigationService';

class LoginScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, }}>
        <Header />
        <View style={styles.container}>
          <View style={styles.child}>
            <View style={{ flex: 1, }}>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Login</TitleText>
              <TitleText style={{ margin: 15, marginBottom: 0, fontSize: 16, }}>Login to continue Nook </TitleText>
              <View style={{ flex: 1, marginTop: '5%' }}>
                <InputField iconName="mail">Username</InputField>
                <InputField iconName="eye" secureTextEntry>Password</InputField>
              </View>
              <Text onPress={() => NavigationService.navigate("ForgotPasswordScreen")} style={{ marginTop: '5%', textDecorationLine: 'underline', alignSelf: 'flex-end', marginEnd: 30 }}>
                Forgot password?
                </Text>

            </View>
            <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
              <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <Button onPress={() => NavigationService.navigateAndResetStack("TabScreens")}  >Sign In</Button>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>or continue with</Text>
                </View>
              </View>
              <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: 'row', width: '40%', alignSelf: 'center', }}>
                  <Icon name='home' style={{ marginEnd: 20 }} />
                  <Icon name='home' style={{ marginStart: 20 }} />
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

export default LoginScreen;