import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton, Item, Picker, Form, CheckBox } from 'native-base';
import Button from './../SeperateComponents/Button';
import InputField from './../SeperateComponents/InputField';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import * as NavigationService from '../../NavigationService';
import Colors from '../../helper/Colors'
import { Rating, AirbnbRating } from 'react-native-ratings';

class AddNookScreen extends React.Component {

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

      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 25 }}>
            <TitleText style={{ fontWeight: 'bold', fontSize: 20, }} >Add Nook</TitleText>

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
                <Picker.Item label="DHA" value="key0" />
                <Picker.Item label="Defence" value="key1" />
                <Picker.Item label="Defence" value="key2" />
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
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}>
                <Picker.Item label="DHA" value="key0" />
                <Picker.Item label="Defence" value="key1" />
                <Picker.Item label="Defence" value="key2" />
              </Picker>
            </Item>
            <View style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View style={styles.childItem}>
                  <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
                    Nook Description
                    </TitleText>
                  <Text>Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
                </View>
              </View>
            </View>
            <View style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View style={[styles.childItem, {
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }]}>
                  <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, }} >Rating</TitleText>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <AirbnbRating showRating={false} size={20} />
                  </View>
                </View>
                <View style={styles.checkbox}>
                  <View style={styles.checkboxItem}>
                    <Text>Fernished</Text>
                    <CheckBox checked={true} />
                  </View>
                  <View style={styles.checkboxItem}>
                    <Text>AC</Text>
                    <CheckBox checked={true} />
                  </View>
                  <View style={styles.checkboxItem}>
                    <Text>TV</Text>
                    <CheckBox checked={true} />
                  </View>
                </View>
                <View style={[styles.checkbox, { paddingTop: 0 }]}>
                  <View style={styles.checkboxItem}>
                    <Text>Wifi</Text>
                    <CheckBox checked={true} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.container} >
              <View style={[styles.child, { height: 170, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
                <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, }} >
                  Select Image
                </TitleText>
                <TouchableOpacity>
                  <Image style={{
                    width: 40,
                    height: 40,
                  }}
                    source={require('./../../../assets/add.png')}
                  />
                </TouchableOpacity>
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


export default AddNookScreen