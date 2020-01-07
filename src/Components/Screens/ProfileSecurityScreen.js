import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton } from 'native-base';
import Button from '../SeperateComponents/Button';
import InputField from '../SeperateComponents/InputField';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import * as NavigationService from '../../NavigationService';

class ProfileSecurityScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, }}>
        <Header />
        <View style={styles.container}>
          <View style={styles.child}>
            <ScrollView>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >User Profile</TitleText>
              <TitleText style={{ alignSelf: 'flex-start', margin: 15, fontWeight: 'bold', marginBottom: 0, fontSize: 18, }}>Security</TitleText>
              <View style={{ marginTop: 15, marginBottom: 5, }}>
                <InputField iconName="eye" secureTextEntry>Password</InputField>
                <InputField iconName="eye" secureTextEntry>Confrim Password</InputField>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 20, }}>
                <Button onPress={() => alert("Login")}  >Submit</Button>
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

export default ProfileSecurityScreen;