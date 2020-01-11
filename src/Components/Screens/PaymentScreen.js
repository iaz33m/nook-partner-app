import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Item, Picker, Form, CheckBox } from 'native-base';
import Button from './../SeperateComponents/Button';
import InputField from './../SeperateComponents/InputField';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import * as NavigationService from '../../NavigationService';
import Colors from '../../helper/Colors'
import { Rating, AirbnbRating } from 'react-native-ratings';

class PaymentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: "All Nooks"
    };
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {

    return (

      <View style={{ flex: 1, backgroundColor: Colors.gray }}>
        <Header />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 25 }}>
            <TitleText style={{ fontWeight: 'bold', fontSize: 20, }} >Payments</TitleText>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16, }} >
              Rent Receipt
            </TitleText>
            <Item picker style={styles.pickerStyle}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%" }}
                placeholder="Room Catagories"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}>
                <Picker.Item label="123-12500 PKR" value="key0" />
                <Picker.Item label="123-12500 PKR" value="key1" />
                <Picker.Item label="123-12500 PKR" value="key2" />
              </Picker>
            </Item>
            <View style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View style={styles.childItem}>
                  <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
                    Detail
                    </TitleText>
                  <Text>Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
                </View>
              </View>
            </View>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16, marginTop: 10, }} >
              Receipted by
            </TitleText>

            <Item picker style={styles.pickerStyle}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%" }}
                placeholder="Room Catagories"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}>
                <Picker.Item label="Muhammad Waqas" value="key0" />
                <Picker.Item label="Azeem Tariq" value="key1" />
                <Picker.Item label="Muhammad Awaise" value="key2" />
              </Picker>
            </Item>

            <View style={styles.container} >
              <View style={[styles.child, { height: 170, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
                <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, }} >
                  Select Image
                </TitleText>
                <Icon
                  style={{ marginTop: 10 }}
                  name="add-circle"
                  onPress={() => { }}
                />
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10, }}>
              <Button onPress={() => alert("Login")}  >Submit</Button>
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
    elevation: 4
  }
});


export default PaymentScreen