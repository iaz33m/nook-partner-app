import React from 'react';

import { connect } from "react-redux";

import { StyleSheet, Text, View, Image } from 'react-native';
import * as NavigationService from '../../NavigationService'

class SplashScreen extends React.Component {


  componentDidMount() {

    const { user, navigation } = this.props;


    let screen = (user) ? "HomeScreen" : "LoginScreen";
    // let screen = (user) ? "HomeScreen" : "RegisterScreen";

    setTimeout(() => {
      console.log("load done")
      NavigationService.navigateAndResetStack(screen);
    }, 0); // 2 sec

  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./../../../assets/logo.png')}
        />
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

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user
  };
};

export default connect(
  mapStateToProps,
  null
)(SplashScreen);