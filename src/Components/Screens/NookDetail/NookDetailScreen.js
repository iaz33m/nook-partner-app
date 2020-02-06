import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { Icon, Drawer, Card, CardItem, Textarea } from "native-base";
import { DrawerItems } from 'react-navigation';
import Header from '../../SeperateComponents/Header';
import TitleText from '../../SeperateComponents/TitleText';
import * as NavigationService from '../../../NavigationService';
import Colors from '../../../helper/Colors';
import { AirbnbRating } from 'react-native-ratings';
import styles from './styles';
import InputField from '../../SeperateComponents/InputField';
import MapView, { Marker } from 'react-native-maps';
import PopupDialog from 'react-native-popup-dialog';
import Button from '../../SeperateComponents/Button';

class NookDetailScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
      isDialogVisible: false,
      markers: {
        latlng: {
          latitude: 31.435076,
          longitude: 74.3000764,
        },
        title: "",
        description: ""
      }
    }
  }


  mapView = () => {
    return (<View style={{ flex: 1 }}>

      <MapView initialRegion={{
        ...this.state.markers.latlng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} style={styles.mapStyle} >
        <Marker onPress={(coordinate, points) => {

        }}
          image={require('./../../../../assets/marker.png')}
          coordinate={{
            latitude: 31.435076,
            longitude: 74.3000764,
          }}
        />
      </MapView>
      <TouchableOpacity style={[styles.container, { width: "100%", flex: 0, marginTop: 10, position: 'absolute' }]}>
        <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingStart: 20 }]}>
          <Image resizeMode="contain" source={require('./../../../../assets/search.png')} style={{ height: 20, width: 20, }} />
          <Text style={{ margin: 15, }}>Enter desired location</Text>
        </View>
      </TouchableOpacity>
    </View>)
  }


  render() {
    let view = this.mapView();
    let tab1Color;
    let tab2Color;
    let tab1Icon;
    let tab2Icon;
    if (this.state.tabIndex == 0) {

      tab1Color = Colors.orange;
      tab2Color = Colors.white;
      tab1Icon = require('./../../../../assets/map_select.png');
      tab2Icon = require('./../../../../assets/option_unselect.png');
    } else {

      tab2Color = Colors.orange;
      tab1Color = Colors.white;
      tab1Icon = require('./../../../../assets/map_unselect.png');
      tab2Icon = require('./../../../../assets/option_select.png');
    }

    return (



      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={true} optionButton={() => {

        }} />
        <ScrollView style={{ top: -7 }}>
          <View style={{ flexDirection: "row", }}>
            <View >
              <Image resizeMode="contain" source={require('./../../../../assets/feature.png')} style={{ height: 100, width: 100, }} />

            </View>
            <View style={{ flex: 1, width: '100%', marginTop: 10, position: 'absolute', }}>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 22, }} >NK-123</TitleText>
            </View>
          </View>
          <View style={{ borderRadius: 30, marginTop: 10, marginBottom: 10, marginStart: 15, marginEnd: 15 }}>
            <View style={[styles.child, { borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
              <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Type</Text>
              <Text style={{ margin: 15, fontSize: 16, }}>Rs1200</Text>
            </View>
            <View style={{ marginTop: 15 }}>
              <Image resizeMode="cover" source={require('./../../../../assets/test_image.jpeg')} style={{ borderRadius: 10, height: 200, width: null, flex: 1 }} />
              <View style={{ position: 'absolute', bottom: 8, left: 10 }}>
                <AirbnbRating showRating={false} size={15} />
              </View>
            </View>
            <ScrollView horizontal={true} style={{ paddingTop: 15, paddingBottom: 15 }}>
              <Image resizeMode="cover" source={require('./../../../../assets/test_image.jpeg')} style={{ marginEnd: 10, borderRadius: 10, height: 100, width: 100, flex: 1 }} />
              <Image resizeMode="cover" source={require('./../../../../assets/test_image.jpeg')} style={{ marginEnd: 10, borderRadius: 10, height: 100, width: 100, flex: 1 }} />
              <Image resizeMode="cover" source={require('./../../../../assets/test_image.jpeg')} style={{ marginEnd: 10, borderRadius: 10, height: 100, width: 100, flex: 1 }} />
              <Image resizeMode="cover" source={require('./../../../../assets/test_image.jpeg')} style={{ marginEnd: 10, borderRadius: 10, height: 100, width: 100, flex: 1 }} />
            </ScrollView>
            <View style={{ backgroundColor: Colors.white, borderRadius: 30, flexDirection: "row", marginTop: 10, marginBottom: 10, marginStart: 15, marginEnd: 15 }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                  this.setState({ tabIndex: 0 });
                }} style={[styles.tabButton, { backgroundColor: tab1Color }]} >
                  <Text style={{ color: tab2Color }}>Image</Text>

                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                  this.setState({ tabIndex: 1 })
                }} style={[styles.tabButton, { backgroundColor: tab2Color }]} >
                  <Text style={{ color: tab1Color }}>Video</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.container, {
              marginBottom: 10, padding: 0
            }]}>
              <View style={styles.child}>
                <View style={{ padding: 20, }}>
                  <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
                    Description
                    </TitleText>
                  <Text>Non in in labore fugiat ullamco. Irure laboris magna dolor esse nisi dolore. Elit commodo amet officia esse pariatur dolor minim non excepteur exercitation proident esse. Minim culpa ut est exercitation labore amet do laborum non. Lorem dolore eu non ea ullamco aliqua officia do adipisicing culpa incididunt voluptate.</Text>
                </View>
              </View>
            </View>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
              Feature
            </TitleText>

            <View style={{ flexWrap: 'wrap', flexDirection: 'row', }}>
              <View style={{ width: "25%" }}>
                <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                  <Text>Wifi</Text>
                </Card>
              </View>
              <View style={{ width: "25%" }}>
                <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                  <Text>Card</Text>
                </Card>
              </View>
              <View style={{ width: "25%" }}>
                <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                  <Text>TV</Text>
                </Card>
              </View>
              <View style={{ width: "25%" }}>
                <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                  <Text>Intenet</Text>
                </Card>
              </View>
              <View style={{ width: "25%" }}>
                <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                  <Text>Iron</Text>
                </Card>
              </View>

            </View>

            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, marginTop: 15 }} >
              Location
            </TitleText>
            <View style={{ height: 400 }}>
              {view}
            </View>
            <View style={[styles.child, { borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
              <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Contact</Text>
              <Text style={{ margin: 15, fontSize: 16, }}>+89222120240</Text>
            </View>
            <Button onPress={() => { this.setState({ isDialogVisible: true }); }}>Book Now</Button>
            <Button onPress={() => { }}>Schedule List</Button>
          </View>
          <PopupDialog
            width={0.9} height={0.55}
            ref={"popupDialog"}
            visible={this.state.isDialogVisible}
            onTouchOutside={() => {
              this.setState({ isDialogVisible: false });
            }}>
            <View style={{ flex: 1, padding: 25, }}>
              <TouchableOpacity onPress={() => {
                this.setState({ isDialogVisible: false });
              }}>
                <Image resizeMode="contain" source={require('./../../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginTop: 5 }} >
                Date
            </TitleText>
              <TouchableOpacity style={[styles.container, { width: "100%", flex: 0, padding: 0 }]}>
                <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 15 }]}>
                  <Text style={{ margin: 15, }}>01/01/2020</Text>
                  <Image resizeMode="contain" source={require('./../../../../assets/date.png')} style={{ height: 20, width: 20, }} />
                </View>
              </TouchableOpacity>
              <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginTop: 15 }} >
                Time
            </TitleText>
              <TouchableOpacity style={[styles.container, { width: "100%", flex: 0, padding: 0 }]}>
                <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 15 }]}>
                  <Text style={{ margin: 15, }}>10:30Pm</Text>
                  <Image resizeMode="contain" source={require('./../../../../assets/time.png')} style={{ height: 20, width: 20, }} />
                </View>
              </TouchableOpacity>
              <Button onPress={() => {
                this.setState({ isDialogVisible: false });

              }}>Schedule</Button>
            </View>
          </PopupDialog>
        </ScrollView>
      </View >
    );
  }
}


export default NookDetailScreen