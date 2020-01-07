import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton, Item, Picker, Form } from 'native-base';
import Button from './../SeperateComponents/Button';
import InputField from './../SeperateComponents/InputField';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import * as NavigationService from '../../NavigationService';

class AddNookScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: "All Nooks"
    };
  }
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="home"
        size={30}
        color='white'
      />
    ),
    headerTitle: "Home",
    headerLeft:
      <View style={{ paddingLeft: 16 }}>
        <Icon
          name="md-menu"
          size={30}
          color='white'
          onPress={() => navigation.toggleDrawer()} />

      </View>,


  })

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {

    return (

      <View style={{ flex: 1, }}>
        <Header />
        <View style={{ flex: 1, }}>
          <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Add Nook</TitleText>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"

                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%" }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="DHA" value="key0" />
                <Picker.Item label="Defence" value="key1" />
                <Picker.Item label="Defence" value="key2" />
              </Picker>
            </Item>
          </Form>

        </View>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, margin: 25,
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


export default AddNookScreen