import React from 'react';

import { connect } from "react-redux";

import { StyleSheet, Text, View,Image } from 'react-native';

class SplashScreen extends React.Component {


  componentDidMount(){
    
    const {user,navigation} = this.props;

    const {navigate} = navigation;

    let screen = (!user) ? "HomeScreen":"LoginScreen";
    
    setTimeout(()=>{
      navigate(screen);
    }, 2000); // 2 sec

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