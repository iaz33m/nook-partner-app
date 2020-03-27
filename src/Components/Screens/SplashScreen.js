import React from 'react';

import { connect } from "react-redux";

import { StyleSheet, View, Image } from 'react-native';
import * as NavigationService from '../../NavigationService'
import * as actions from '../../Store/Actions/AuthActions';

class SplashScreen extends React.Component {


  componentDidMount() {
    const { syncWithAsyncStorage } = this.props;
    syncWithAsyncStorage({
      onSuccess: ({user, skiped}) => {
        if(user !== undefined){
          let screen = (user || skiped === 'true') ? "TabScreens" : "LoginScreen";
          NavigationService.navigateAndResetStack(screen);
        }
      }
    });
  }

  render() {
    
    return (
      <View style={styles.container}>
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
    user: state.AuthReducer.user,
    skiped: state.AuthReducer.skiped,
  };
};

export default connect(
  mapStateToProps,
  { syncWithAsyncStorage: actions.syncWithAsyncStorage }
)(SplashScreen);