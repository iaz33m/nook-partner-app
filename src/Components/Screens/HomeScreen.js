import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import Header from '../SeperateComponents/Header';
import TitleText from '../SeperateComponents/TitleText';
import * as NavigationService from '../../NavigationService';
import Colors from '../../helper/Colors';

class HomeScreen extends React.Component {
  render() {

    return (
      <View style={{ flex: 1, }}>
        <Header />

        <View style={styles.main}>
          <View style={[styles.container, {
            marginBottom: 10,
          }]}>
            <View style={styles.child}>
              <View style={styles.childItem}>
                <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, }} >Add Nook</TitleText>
                <Icon
                  name="add-circle"
                  onPress={() => { NavigationService.navigate("AddNookScreen") }}
                />
              </View>
              <View style={{ padding: 25, paddingTop: 10 }}>
                <Text>Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
              </View>
            </View>
          </View>
          <View style={[styles.container, {
            marginTop: 10,
          }]}>
            <View style={styles.child}>
              <View style={styles.childItem}>
                <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, }} >Manage Nooks</TitleText>
                <Icon
                  name="add-circle"
                />
              </View>
              <View style={{ padding: 25, paddingTop: 10 }}>
                <Text>Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.gray,
  },
  childItem: {

    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
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


export default HomeScreen