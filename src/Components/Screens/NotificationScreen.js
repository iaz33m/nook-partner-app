import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView,TouchableOpacity } from 'react-native';
import { Text, Button as NativeButton } from 'native-base';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import Colors from '../../helper/Colors'
import { IconButton } from 'react-native-paper';
import * as NavigationService from '../../NavigationService';

class NotificationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     isDialogVisible: false,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (!user) {
      NavigationService.navigateAndResetStack('LoginScreen');
    }
  }

  render() {

    return (

      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={true} optionButton={true} />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 25 }}>
            <View style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View style={styles.childItem}>
                  <View
                    style={{
                      borderBottomColor: Colors.black,
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text
                    style={{ color: Colors.textGray,  fontSize: 15, marginTop:10 }}>
                    Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  pickerStyle: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10, marginTop: 10,
  },
  childItem: {
    padding: 20,
  },
  container: {
    flex: 1,
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
    elevation: 4,
    marginBottom: 20
  },
  rowView: {
    flex: 1,
    marginEnd: 20,
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10
  },
});

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps
)(NotificationScreen);
