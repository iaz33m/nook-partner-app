import React from 'react';

import { connect } from "react-redux";
import { Icon } from 'native-base';

import { StyleSheet, Text, View, Image } from 'react-native';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import Swiper from 'react-native-swiper'
import Colors from '../../helper/Colors';
class GuideScreen extends React.Component {


  componentDidMount() {

    const { user, navigation } = this.props;

    const { navigate } = navigation;

    let screen = (!user) ? "HomeScreen" : "LoginScreen";

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <View style={styles.header}>
          <Icon name="arrow-back" />
        </View>
        <View style={styles.container}>
          <View style={styles.child}>
            <Swiper style={styles.wrapper} showsButtons={false}>
              <View style={styles.slide}>
                <TitleText style={{ marginTop: 30, fontWeight: 'bold', fontSize: 20, }} >Welcome Nook</TitleText>
                <TitleText style={{ margin: 20, marginBottom: 30, fontSize: 16, }}>Ut enim ad minim veniam, quis nostrud exercitant ullamco laboris nisi ut aliquip ex ea commodo consequat ut enim ad minim veniam.</TitleText>
                <Image style={styles.slideItem}
                  source={require('./../../../assets/logo.png')}
                />
              </View>
              <View style={styles.slide}>
                <TitleText style={{ marginTop: 30, fontWeight: 'bold', fontSize: 20, }} >Heading 2</TitleText>
                <TitleText style={{ margin: 20, marginBottom: 30, fontSize: 16, }}>Ut enim ad minim veniam, quis nostrud exercitant ullamco laboris nisi ut aliquip ex ea commodo consequat ut enim ad minim veniam. Ut enim ad minim veniam, quis nostrud exercitant ullamco laboris nisi ut aliquip ex ea commodo consequat ut enim ad minim veniam.</TitleText>
                <Image style={styles.slideItem}
                  source={require('./../../../assets/logo.png')}
                />
              </View>
              <View style={styles.slide}>
                <TitleText style={{ marginTop: 30, fontWeight: 'bold', fontSize: 20, }} >Heading 3</TitleText>
                <TitleText style={{ margin: 20, marginBottom: 30, fontSize: 16, }}>Ut enim ad minim veniam, quis nostrud exercitant ullamco laboris nisi ut aliquip ex ea commodo consequat ut enim ad minim veniam.</TitleText>
                <Image style={styles.slideItem}
                  source={require('./../../../assets/logo.png')}
                />
              </View>
            </Swiper>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    width: '80%',
    alignSelf: 'center',
    alignContent: 'center',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingStart: 25,
    paddingEnd: 25,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 25,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    // Android shadow
    elevation: 3
  },
  slideItem: {
    width: '60%',
    height: '30%',
    borderColor: '#000',
    borderWidth: 1,
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  container: {
    flex: 1, margin: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
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
    elevation: 3
  }

});

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user
  };
};

export default connect(
  mapStateToProps,
  null
)(GuideScreen);