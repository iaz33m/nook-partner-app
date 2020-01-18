import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import Colors from '../../helper/Colors';

class ComplaintsScreen extends React.Component {

  render() {

    return (
      <View style={styles.container}>
        <Text>ComplaintsScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

});


export default ComplaintsScreen