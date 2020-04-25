import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { Input, Icon, Card, Textarea, Picker, Item } from "native-base";
import Header from '../../SeperateComponents/Header';
import TitleText from '../../SeperateComponents/TitleText';
import Colors from '../../../helper/Colors';
import styles from './styles';
import MapView, { Marker } from 'react-native-maps';
import PopupDialog from 'react-native-popup-dialog';
import Button from '../../SeperateComponents/Button';
import { WebView } from 'react-native';
import { connect } from "react-redux";
import DatePicker from 'react-native-datepicker'
import * as NavigationService from '../../../NavigationService';

import * as actions from "../../../Store/Actions/NookActions";
import * as shiftsActions from "../../../Store/Actions/ShiftsActions";
import moment from 'moment';

class NookDetailScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tabIndex: 0,
      isDialogVisible: false,
      date: moment(),
      markers: {
        latlng: {
          latitude: 31.435076,
          longitude: 74.3000764,
        },
        title: "",
        description: ""
      },
      filter: {
        status: '',
      },
      roomId: 0,
      isBookNow: false,
      isSchedule: false,
      show: false,
      nook: null,
      addShiftModal:false,
      details:'',
      dateText:''
    }
  }


  Map = () => {

    const nook = this.props.navigation.state.params;

    return (<View pointerEvents="none" style={{ flex: 1 }}>

      <MapView initialRegion={{
        latitude: 6422,
        longitude: 6422,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} style={styles.mapStyle} >
        <Marker onPress={(coordinate, points) => {
        }}
          image={require('./../../../../assets/marker.png')}
          coordinate={{
            latitude: 6422,
            longitude: 6422,
          }}
        />
      </MapView>
      <View style={[styles.container, { width: "100%", flex: 0, marginTop: 10, position: 'absolute' }]}>
        <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingStart: 20 }]}>
          <Image resizeMode="contain" source={require('./../../../../assets/search.png')} style={{ height: 20, width: 20, }} />
          <Text style={{ margin: 15, }}>nook.address</Text>
        </View>
      </View>
    </View>)
  }

  componentDidMount() {

    // const { user, getMyNookDetails } = this.props;
    // if(user){
    //   getMyNookDetails({
    //     token: user.access_token
    //   });
    // }
    
    let featuredImage = null;
    // const nook = this.props.navigation.state.params;
    // if (nook.medias && nook.medias.length > 0) {
    //   featuredImage = nook.medias[0].path;
    // }

    this.setState({
      featuredImage,
    });
  }

  render() {
    const nook = this.props.navigation.state.params;
    // const { rooms } = nook;
    const { filter, featuredImage ,submitting} = this.state;
    const {usersNook} = this.props;

    let view = this.Map();
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
              <Image resizeMode="contain"  style={{ height: 100, width: 100, }} />
            </View>
            <View style={{ flex: 1, width: '100%', marginTop: 10, position: 'absolute', }}>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 22, }} >Nook Code</TitleText>
            </View>
          </View>
          <View style={{ borderRadius: 30, marginTop: 10, marginBottom: 10, marginStart: 15, marginEnd: 15 }}>
            <TouchableOpacity onPress={() => {
              showMode('time');
            }}>
              <View style={[styles.child, { borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
                <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Nook Type</Text>
                <Text style={{ margin: 15, fontSize: 16, }}>PKR 1222</Text>
              </View>
            </TouchableOpacity>
            {this.state.tabIndex === 0 ?
              <View>
                <View style={{ marginTop: 15 }}>
                  {featuredImage && (
                    <Image resizeMode="cover" resizeMode="contain" source={{
                      uri: featuredImage
                    }
                    } style={{ borderRadius: 10, height: 200, width: null, flex: 1 }} />
                  )}
                </View>
                <ScrollView horizontal={true} style={{ paddingTop: 15, paddingBottom: 15 }}>
                  {
                    // nook.medias.map((m, index) => (
                    //   <TouchableOpacity key={index} onPress={() => this.setState({ featuredImage: m.path })}>
                    //     <Image resizeMode="cover" resizeMode="contain" source={{
                    //       uri: m.path
                    //     }
                    //     } style={{ marginEnd: 10, borderRadius: 10, height: 100, width: 100, flex: 1 }} />
                    //   </TouchableOpacity>
                    // ))
                  }
                </ScrollView>
              </View> :
              <View style={{ marginTop: 15, paddingBottom: 15, borderRadius: 10, backgroundColor: Colors.white }}>
                
              </View>
            }

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
                  <Text>nook.description</Text>
                </View>
              </View>
            </View>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
              Feature
            </TitleText>

            <View style={{ flexWrap: 'wrap', flexDirection: 'row', }}>
              <View style={{ width: "25%" }}>
                  <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                    <Text>fac</Text>
                  </Card>
                </View>
            </View>
            <View>
                <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, marginTop: 15 }} >
                  Location
              </TitleText>
                <View style={{ height: 400 }}>
                  {view}
                </View>
              </View>

            <View style={[styles.child, { borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
              <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Contact</Text>
              <Text style={{ margin: 15, fontSize: 16, }}>Number</Text>
            </View>

            {/* Rooms and user data tab */}
            <View style={{ backgroundColor: Colors.white, borderRadius: 30, flexDirection: "row", marginTop: 30, marginBottom: 10, }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                  this.setState({ tabIndex: 2 });
                }} style={[styles.tabButton, { backgroundColor: tab1Color }]} >
                  <Text style={{ color: tab2Color }}>Rooms</Text>

                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                  this.setState({ tabIndex: 3 })
                }} style={[styles.tabButton, { backgroundColor: tab2Color }]} >
                  <Text style={{ color: tab1Color }}>Users</Text>
                </TouchableOpacity>
              </View>
            </View>

            {this.state.tabIndex === 2 ?
              <View>
                <View style={{ marginTop: 15 }}>
                  
                </View>
              </View> :
              <View style={[styles.container, { width: "100%", marginTop: 10, padding: 0, }]}>
                <View style={[styles.child, { marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: Colors.white, }]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>Single</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                      <Text style={{ marginBottom: 15, fontSize: 16, }}>12000</Text>
                      <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 15, }}>
                        <Image resizeMode="contain" source={require('./../../../../assets/bed-icon.png')} style={{ marginRight: 15, }} />
                        <Text style={{ fontSize: 16, }}>2</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 15, }}>
                        <Image resizeMode="contain" source={require('./../../../../assets/user-icon.png')} style={{ marginRight: 15, }} />
                        <Text style={{ fontSize: 16, }}>5</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={[styles.child, { marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: Colors.white, }]}>
                  <View style={{ flexDirection: "row", }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>Two Person</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                      <Text style={{ marginBottom: 15, fontSize: 16, }}>12000</Text>
                      <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 15, }}>
                        <Image resizeMode="contain" source={require('./../../../../assets/bed-icon.png')} style={{ marginRight: 15, }} />
                        <Text style={{ fontSize: 16, }}>3</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 15, }}>
                        <Image resizeMode="contain" source={require('./../../../../assets/user-icon.png')} style={{ marginRight: 15, }} />
                        <Text style={{ fontSize: 16, }}>10</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              
            }

            {this.state.tabIndex === 3 ?
              <View>
                <View style={{ marginTop: 15 }}>
                
                </View>
                
              </View> :
              <View style={[styles.container, { width: "100%", marginTop: 10, padding: 0, }]}>
                <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingStart: 20 }]}>
                  <View searchBar rounded>
                    <Item>
                      <Icon name="ios-search" />
                      <Input placeholder="Search" />
                    </Item>
                  </View>
                </View>

                <View style={[styles.child, { marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: Colors.white, }]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>Bilal Ali</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                      <Text style={{ marginBottom: 15, fontSize: 16, }}>Room # 3</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row",  }}>
                    <View style={{ flex: 1 }}>
                    <Text style={{ marginBottom: 15, fontSize: 16, }}>Receivable</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                      <Text style={{ marginBottom: 15, fontSize: 16, }}>15000</Text>
                    </View>
                  </View>
                </View>
              </View>
            
            }

            <View style={{ marginTop: 30, }}>
              <Button>
                  <Text style={styles.buttonTextStyle}>Update Status</Text>
              </Button>
            </View>

          </View>

          {
            this.state.isBookNow &&
            <PopupDialog
              width={0.9} height={0.35}
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
                  Room
                    </TitleText>
                <Item picker style={styles.pickerStyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: "100%" }}
                    placeholder="Room Catagories"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.roomId}
                    onValueChange={() => {}}>
                    <Picker.Item key={-1} value={0} label="Select Room" />
                    {[].map((room, roomi) => {
                      return <Picker.Item key={roomi} value={room.id} label={`${room.capacity} Persons Sharing - ${room.price_per_bed} PKR`} />
                    })}
                  </Picker>
                </Item>
                
              </View>
            </PopupDialog>
          }
        </ScrollView>
      </View >
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
    usersNook: state.NookReducer.nook,
  };
};
export default connect(
  mapStateToProps,
  {
    addNookRoom: actions.addNookRoom,
    addNookSchedule: actions.addNookSchedule,
    addShift: shiftsActions.addShift,
    getMyNookDetails: actions.getMyNookDetails,
  },
  
)
(NookDetailScreen)
