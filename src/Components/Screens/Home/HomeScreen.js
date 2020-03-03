import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { Icon, Drawer, Card, CardItem } from "native-base";
import { DrawerItems } from 'react-navigation';
import Header from '../../SeperateComponents/Header';
import TitleText from '../../SeperateComponents/TitleText';
import * as NavigationService from '../../../NavigationService';
import Colors from '../../../helper/Colors';
import { AirbnbRating } from 'react-native-ratings';
import styles from './styles';
import InputField from '../../SeperateComponents/InputField';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import PopupDialog from 'react-native-popup-dialog';
import Button from '../../SeperateComponents/Button';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class HomeScreen extends React.Component {

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
          this.setState({ isDialogVisible: true });
        }}
          image={require('./../../../../assets/marker.png')}
          coordinate={{
            latitude: 31.435076,
            longitude: 74.3000764,
          }}
        />
      </MapView>
      <TouchableOpacity onPress={()=>NavigationService.navigate("GooglePlacesInput")}
          style={[styles.container, { width: "100%", flex: 0, marginTop: 10, position: 'absolute' }]}>
        <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingStart: 20 }]}>
          <Image resizeMode="contain" source={require('./../../../../assets/search.png')} style={{ height: 20, width: 20, }} />
          <Text style={{ margin: 15, }}>Enter desired location</Text>
        </View>
      </TouchableOpacity>
      <PopupDialog
        width={0.9} height={0.8}
        ref={"popupDialog"}
        visible={this.state.isDialogVisible}
        onTouchOutside={() => {
          this.setState({ isDialogVisible: false });
        }}>
        <View style={{ flex: 1, padding: 15, }}>
          <TouchableOpacity onPress={() => {
            this.setState({ isDialogVisible: false });
          }}>
            <Image resizeMode="contain" source={require('./../../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
          </TouchableOpacity>
          <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >NK-123</TitleText>
          <Image resizeMode="contain" source={require('./../../../../assets/test_image.jpeg')} style={{ borderRadius: 5, height: 200, width: null, marginTop: 15 }} />
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }} >Price</TitleText>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }} >Distance</TitleText>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }} >Gender</TitleText>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }} >Partner time</TitleText>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }} >8000</TitleText>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }} >9/1 km</TitleText>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }} >Male</TitleText>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }} >Pak Arab</TitleText>
            </View>
          </View>
          <Button onPress={() => {
            this.setState({ isDialogVisible: false });
            NavigationService.navigate("NookDetailScreen")
          }}>See More</Button>
        </View>
      </PopupDialog>
    </View>)
  }
  listView = () => {
    return (<View style={{ flex: 1, flexDirection: "column" }}>

      <TouchableOpacity style={[styles.container, { flex: 0, marginTop: 10 }]}>
        <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingStart: 20 }]}>
          <Image resizeMode="contain" source={require('./../../../../assets/search.png')} style={{ height: 20, width: 20, }} />
          <Text style={{ margin: 15, }}>Enter desired location</Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        <View style={styles.container} >
          <TouchableOpacity style={styles.child} onPress={() => {
            this.setState({ isDialogVisible: false });
            NavigationService.navigate("NookDetailScreen")
          }}>
            <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Type</Text>
              <Text>Price</Text>
            </View>
            <CardItem cardBody>
              <Image resizeMode="contain" source={require('./../../../../assets/test_image.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
              <View style={{ position: 'absolute', bottom: 8, left: 10 }}>
                <AirbnbRating showRating={false} size={15} />
              </View>
            </CardItem>
            <TitleText style={{ marginTop: 10, marginBottom: 10, fontSize: 20, }} >NK-123</TitleText>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.child}>
            <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Type</Text>
              <Text>Price</Text>
            </View>
            <CardItem cardBody>
              <Image resizeMode="contain" source={require('./../../../../assets/test_image.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
              <View style={{ position: 'absolute', bottom: 8, left: 10 }}>
                <AirbnbRating showRating={false} size={15} />
              </View>
            </CardItem>
            <TitleText style={{ marginTop: 10, marginBottom: 10, fontSize: 20, }} >NK-123</TitleText>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.child}>
            <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Type</Text>
              <Text>Price</Text>
            </View>
            <CardItem cardBody>
              <Image resizeMode="contain" source={require('./../../../../assets/test_image.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
              <View style={{ position: 'absolute', bottom: 8, left: 10 }}>
                <AirbnbRating showRating={false} size={15} />
              </View>
            </CardItem>
            <TitleText style={{ marginTop: 10, marginBottom: 10, fontSize: 20, }} >NK-123</TitleText>
          </View>
        </View>
      </ScrollView>
    </View>)
  }
  render() {
    console.log("state chenage", this.state.tabIndex)

    let view;
    let tab1Color;
    let tab2Color;
    let tab1Icon;
    let tab2Icon;
    if (this.state.tabIndex == 0) {
      view = this.mapView();
      tab1Color = Colors.orange;
      tab2Color = Colors.white;
      tab1Icon = require('./../../../../assets/map_select.png');
      tab2Icon = require('./../../../../assets/option_unselect.png');
    } else {
      view = this.listView();
      tab2Color = Colors.orange;
      tab1Color = Colors.white;
      tab1Icon = require('./../../../../assets/map_unselect.png');
      tab2Icon = require('./../../../../assets/option_select.png');
    }
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={false} optionButton={true} />
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Nook</TitleText>

        <View style={{ backgroundColor: Colors.white, borderRadius: 30, flexDirection: "row", marginTop: 10, marginBottom: 10, marginStart: 15, marginEnd: 15 }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => {
              this.setState({ tabIndex: 0 });
            }} style={[styles.tabButton, { backgroundColor: tab1Color }]} >
              <Image resizeMode="contain" style={{
                width: 25,
                height: 25,
              }}
                source={tab1Icon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => {
              this.setState({ tabIndex: 1 })
            }} style={[styles.tabButton, { backgroundColor: tab2Color }]} >
              <Image resizeMode="contain" style={{
                width: 25,
                height: 25,
              }}
                source={tab2Icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {view}
        </View>
      </View >
    );

  }
}


export default HomeScreen
