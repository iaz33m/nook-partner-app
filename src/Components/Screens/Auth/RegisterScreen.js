import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icon} from 'native-base';

class RegisterScreen extends React.Component {
  static navigationOptions = ({  navigation }) => ({
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
      <View style={styles.container}>
        <Text>RegisterScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


export default RegisterScreen