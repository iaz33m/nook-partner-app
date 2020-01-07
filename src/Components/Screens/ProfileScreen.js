import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button as NativeButton, CheckBox, Textarea } from 'native-base';
import Button from '../SeperateComponents/Button';
import InputField from '../SeperateComponents/InputField';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import * as NavigationService from '../../NavigationService';
import Colors from '../../helper/Colors';

class ProfileScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, }}>
        <Header />
        <View style={styles.container}>
          <View style={styles.child}>
            <ScrollView>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >User Profile</TitleText>
              <TitleText style={{ alignSelf: 'flex-start', margin: 15, fontWeight: 'bold', marginBottom: 0, fontSize: 18, }}>
                Personal Information
              </TitleText>
              <View style={{ marginTop: 15, marginBottom: 5, }}>
                <InputField iconName="person" >Name</InputField>
                <InputField iconName="call" >Phone</InputField>
              </View>
              <TitleText style={{ alignSelf: 'flex-start', margin: 15, fontWeight: 'bold', marginBottom: 0, fontSize: 18, }}>
                Gender
              </TitleText>
              <View style={styles.checkbox}>
                <View style={styles.checkboxItem}>
                  <Icon name="home" />
                  <Text>Male</Text>
                  <CheckBox checked={true} />
                </View>
                <View style={styles.checkboxItem}>
                  <Icon name="home" />
                  <Text>Female</Text>
                  <CheckBox checked={true} />
                </View>
              </View>
              <Textarea style={styles.textArea} rowSpan={5} bordered placeholder="Type your address" />
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                <Button >Update</Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
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
    flex: 1, padding: 25,
    backgroundColor: Colors.gray,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 15
  },
  child: {
    borderRadius: 15,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 4
  }
})

export default ProfileScreen;