import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton } from 'native-base';
import Button from './../../SeperateComponents/Button';
import InputField from './../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import * as NavigationService from '../../../NavigationService';

class RegisterScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, }}>
        <Header />
        <View style={styles.container}>
          <View style={styles.child}>
            <ScrollView>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Sign Up</TitleText>
              <TitleText style={{ margin: 15, marginBottom: 0, fontSize: 16, }}>Sign up to continue Nook </TitleText>
              <InputField iconName="person">User Name</InputField>
              <InputField iconName="mail" >Email Address</InputField>
              <InputField iconName="eye" secureTextEntry>Password</InputField>
              <InputField iconName="eye" secureTextEntry>Confirm Password</InputField>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Button onPress={() => alert("Login")}>Sign Up</Button>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                <Text>Already have an account? </Text><Text style={{
                  textDecorationLine: 'underline',
                }} onPress={() => NavigationService.goBack()}>Login!</Text>
              </View>
              <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', alignSelf: 'center', }}>
                <Icon name='home' style={{ marginEnd: 20 }} />
                <Icon name='home' style={{ marginStart: 20 }} />
              </View>
            </ScrollView>
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