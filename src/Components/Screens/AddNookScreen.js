import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Text, Icon, Button as NativeButton, Item, Picker, CheckBox } from 'native-base';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import Colors from '../../helper/Colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AirbnbRating } from 'react-native-ratings';
import * as NavigationService from '../../NavigationService';
import InputField from '../SeperateComponents/InputField';
import Button from '../SeperateComponents/Button';
import * as actions from '../../Store/Actions/NookActions';

class AddNookScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type     : "house",
      number   : "",
      address  : "",
      space_type: "shared",
      submitting: false,
      processing: false, 
    };
  }

  moveToHome = () => {
    NavigationService.navigateAndResetStack("TabScreens");
  };
  toggleSubmitting = () => {
    const { submitting } = this.state;
    this.setState({
      submitting: !submitting,
    });
  };

  toggleProcessing = () => {
    const { processing } = this.state;
    this.setState({
      processing: !processing,
    });
  };

  onValueChange2(value) {
    this.setState({
      space_type : value
    });
  }

  onValueChange1(value) {
    this.setState({
      type : value
    });
  }
  create = () => {

    const { number, address, type, space_type } = this.state;
    if (!type) {
      return alert('Type is required.');
    }
    if (!space_type) {
      return alert('Space Type is required.');
    }
    if (!number) {
      return alert('Number is required.');
    }

    if (!address) {
      return alert('Address is required.');
    }

    const {
            addNook,
            user: {
                access_token: token
              }
          } = this.props;

    this.toggleSubmitting();
    
    let data = { number, address, type, space_type };
    
    addNook({
      data: data,
      token,
      onSuccess: () => {
        this.moveToHome();
      },
      onError: (message) => {
        alert(message);
        this.toggleSubmitting();
      },
    });

  }
  render() {
    const { submitting, processing } = this.state;
    return (

      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 25 }}>
            <TitleText style={{ fontWeight: 'bold', fontSize: 20, }} >Add Nook</TitleText>


            <View style={styles.container}>
              <View style={styles.child}>
                <KeyboardAwareScrollView>
                <View style={{ flex: 1, }}>
                  <View style={{ flex: 1, marginTop: '5%', marginStart: '5%', marginEnd: '5%' }}>
                    <Item picker style={styles.pickerStyle}>
                      <Picker
                        mode="dropdown"

                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: "100%" }}
                        placeholder="Room Catagories"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.type}
                        onValueChange={this.onValueChange1.bind(this)}>
                        <Picker.Item label="House" value="house" />
                        <Picker.Item label="Flat" value="flat" />
                        <Picker.Item label="Upper Portion" value="upper_portion" />
                        <Picker.Item label="Lower Portion" value="lower_portion" />
                        <Picker.Item label="Farm House" value="farm_house" />
                        <Picker.Item label="Pent House" value="pent_house" />
                        <Picker.Item label="Independent Room" value="independentRoom" />
                        <Picker.Item label="Hostel Building" value="hostelBuilding" />
                        <Picker.Item label="Out House" value="outHouse" />
                        <Picker.Item label="Other" value="other" />
                      </Picker>
                    </Item>
                    <Item picker style={styles.pickerStyle}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: "100%" }}
                        placeholder="Nook Type"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.space_type}
                        onValueChange={this.onValueChange2.bind(this)}>
                        <Picker.Item label="Shared" value="shared" />
                        <Picker.Item label="Independent" value="independent" />
                      </Picker>
                    </Item>
                    <InputField
                      iconName="md-phone-portrait"
                      value={this.state.number}
                      onChangeText={number => this.setState({ number })}
                    >Enter Number</InputField>
                    <InputField
                      value={this.state.address}
                      onChangeText={address => this.setState({ address })}
                    >Enter Address</InputField>
                  </View>

                </View>
                <View style={{ flex: 1, alignContent: "center", marginBottom: 70 }}>
                  <View style={{ flex: 1, alignContent: "center" }}>
                    <View style={{ flex: 1, marginTop: 20, width: '100%', }}>
                      <Button disabled={submitting} onPress={this.create} >{submitting ? 'Please wait...' : 'Add Nook'}</Button>
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
          </View>
        </ScrollView>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    paddingEnd: 35,
  },
  checkboxItem: {
    flexDirection: 'row'
  },
  pickerStyle: {
    backgroundColor: Colors.white,
    borderRadius: 10, marginTop: 25,
  },
  childItem: {
    padding: 20,
  },
  container: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
  },
  child: {
    flex: 1,
    marginTop: 25,
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
        user: state.AuthReducer.user,
    };
};
export default connect(
  mapStateToProps,
  {
    addNook: actions.addNook,
  }
)(AddNookScreen);