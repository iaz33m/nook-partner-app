import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Icon, Drawer, Card, CardItem, Item, Picker } from "native-base";
import { DrawerItems } from 'react-navigation';
import Colors from '../../helper/Colors';
import Header from '../SeperateComponents/Header';
import TitleText from '../SeperateComponents/TitleText';
import Button from '../SeperateComponents/Button';
import { AirbnbRating } from 'react-native-ratings';

class ComplaintsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: "All Nooks",
      modalVisible: false,
      showMore: false,
    };
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {

    let filterView = null;
    if (this.state.modalVisible) {
      let showMoreView = null;
      if (this.state.showMore) {
        showMoreView = <View>
          <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, }}>All Nooks</Text>
          </View>
          <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, }}>Home</Text>
          </View>
          <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, }}>DHA</Text>
          </View>
          <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, }}>Defence</Text>
          </View>
        </View>;
      }

      filterView = <View style={{ position: 'absolute', width: "70%", height: "82%", marginTop: "20%", alignSelf: 'flex-end', backgroundColor: "white" }}>
        <View style={{}}>
          <TouchableOpacity onPress={() => {
            this.setState({ modalVisible: false })
          }}>
            <Image style={{
              width: 20,
              margin: 10,
              marginTop: 15,
              height: 20,
              alignSelf: 'flex-end'
            }}
              resizeMode="contain"
              source={require('./../../../assets/close.png')}
            />
          </TouchableOpacity>
          <TitleText style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }} >Filter</TitleText>

          <View style={{ padding: 15, flexDirection: 'row', backgroundColor: Colors.gray, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ID 123</Text>
          </View>
          <View style={{ padding: 15, flexDirection: 'row', backgroundColor: Colors.gray, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Status</Text>
            <TouchableOpacity onPress={() => {
              this.setState({ showMore: !this.state.showMore })
            }}>
              <Image resizeMode="contain" style={{
                width: 20,
                marginTop: 5,
                height: 20,
                alignSelf: 'flex-end'
              }}
                source={require('./../../../assets/arrow_down.png')}
              />
            </TouchableOpacity>
          </View>
          {showMoreView}
        </View>
      </View>;
    }

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>

        <Header backButton={true} />
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Select Nook</TitleText>
        <View style={{ padding: 20, paddingTop: 5 }}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16, }} >
              Pending complaints
            </TitleText>
            <TouchableOpacity onPress={() => {
              this.setState({ modalVisible: true })
            }}>
              <Image style={{
                width: 30,
                height: 30,
                marginBottom: 5,
                alignSelf: 'flex-end'
              }}
                resizeMode="contain"
                source={require('./../../../assets/filter.png')}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginTop: 10 }}>

            <View style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View>
                  <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ID 123</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Status</Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text>Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View>
                  <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ID 123</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Status</Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text>Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View>
                  <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ID 123</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Status</Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text>Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {filterView}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 160,
    width: 160,
    marginBottom: 20,
    alignSelf: 'center'
  },
  pickerStyle: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10, marginTop: 10,
  },
  imageButton: {
    position: 'absolute',
    bottom: -7,
    alignSelf: "flex-end"
  },
  imageView: {
    height: "100%",
    width: "100%",
    position: 'relative',
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    alignSelf: 'center',
    borderRadius: 100
  },
  textArea: {
    margin: 20,
    paddingTop: 10
  },
  checkbox: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingEnd: 10,
    flexDirection: 'row',
  },
  checkboxItem: {
    flex: 1,
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    borderRadius: 10,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 4
  }
});



export default ComplaintsScreen
