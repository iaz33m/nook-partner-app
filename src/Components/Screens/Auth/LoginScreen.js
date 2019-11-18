import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Item, Input, Icon } from 'native-base';
import Button from './../../SeperateComponents/Button';
import InputField from './../../SeperateComponents/InputField';

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="home"
        size={30}
        color='white'
      />
    )
  })

  render() {
    return (

      <View style={{ flex: 1, }}>

        <View style={{ flex: 2, justifyContent: "flex-end", alignItems: "center" }}>
          <Image
            source={require('./../../../../assets/logo.png')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <InputField >Username</InputField>
          <InputField secureTextEntry>Password</InputField>
        </View>
        <View style={{ flex: 2, alignContent: "center", alignItems: "center" }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Button onPress={() => alert("Login")}  >Sign In</Button>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>Don't have an account? Signup!</Text>
          </View>
        </View>
      </View>
      

    );
  }
}


export default LoginScreen