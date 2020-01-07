import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import Header from '../SeperateComponents/Header';
import TitleText from '../SeperateComponents/TitleText';
import * as NavigationService from '../../NavigationService';

class HomeScreen extends React.Component {
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
    margin: 25,
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