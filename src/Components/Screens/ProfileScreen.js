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
import Color from 'color';

class ProfileScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={true} />
        <ScrollView contentContainerStyle={{ backgroundColor: Colors.gray }}>

          <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >User Profile</TitleText>

          <View style={styles.imageContainer}>
            <View style={styles.imageView}>

            </View>
            <Image style={styles.imageButton}
              source={require('./../../../assets/camera_icon.png')}
            />
          </View>

          <View style={styles.container}>
            <View style={styles.child}>
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
                  <Image style={{
                    width: 40,
                    height: 40,
                  }}
                    source={require('./../../../assets/male.png')}
                  />
                  <Text>Male</Text>
                  <CheckBox checked={true} />
                </View>
                <View style={styles.checkboxItem}>
                  <Image style={{
                    width: 40,
                    height: 40,
                  }}
                    source={require('./../../../assets/female.png')}
                  />
                  <Text>Female</Text>
                  <CheckBox checked={true} />
                </View>
              </View>
              <Textarea style={styles.textArea} rowSpan={5} bordered placeholder="Type your address" />
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.child}>
              <TitleText style={{ alignSelf: 'flex-start', margin: 15, fontWeight: 'bold', marginBottom: 0, fontSize: 18, }}>Security</TitleText>
              <View style={{ marginTop: 15, marginBottom: 5, }}>
                <InputField iconName="eye" secureTextEntry>Password</InputField>
                <InputField iconName="eye" secureTextEntry>Confrim Password</InputField>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 20, }}>
                <Button onPress={() => alert("Login")}  >Update Password</Button>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
            <Button >Update</Button>
          </View>
        </ScrollView>
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
  imageButton: {
    width: 40,
    height: 40,
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
    backgroundColor: Colors.white,
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
    flex: 1, padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 15
  },
  child: {
    padding: 15,
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