import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import Colors from '../../helper/Colors';
import Header from '../SeperateComponents/Header';
import * as NavigationService from '../../NavigationService';

class ComplaintsScreen extends React.Component {


  componentDidMount(){
    const {user} = this.props;
    if(!user){
      NavigationService.navigateAndResetStack('LoginScreen');
    }
  }

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



const mapStateToProps = state => {
  return {
      user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps
)(ComplaintsScreen);