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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header />
        <View style={styles.container}>
          <View style={styles.child}>

            <KeyboardAwareScrollView>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Sign Up</TitleText>
              <TitleText style={{ margin: 15, marginBottom: 0, fontSize: 16, }}>Sign up to continue Nook </TitleText>
              <View style={{ marginStart: '5%', marginEnd: '5%' }}>
                <InputField iconName="person">User Name</InputField>
                <InputField iconName="mail" >Email Address</InputField>
                <InputField iconName="eye" secureTextEntry>Password</InputField>
                <InputField iconName="eye" secureTextEntry>Confirm Password</InputField>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Button onPress={() => alert("Login")}>Sign Up</Button>
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