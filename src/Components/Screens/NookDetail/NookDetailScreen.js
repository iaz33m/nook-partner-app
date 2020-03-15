import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { Icon, Drawer, Card, CardItem, Textarea, Picker, Item } from "native-base";
import { DrawerItems } from 'react-navigation';
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

import * as actions from "../../../Store/Actions/NookActions";
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
      dateText:''
    }
  }


  Map = () => {

    const nook = this.props.navigation.state.params;

    return (<View pointerEvents="none" style={{ flex: 1 }}>

      <MapView initialRegion={{
        latitude: nook.location.lat,
        longitude: nook.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} style={styles.mapStyle} >
        <Marker onPress={(coordinate, points) => {
        }}
          image={require('./../../../../assets/marker.png')}
          coordinate={{
            latitude: nook.location.lat,
            longitude: nook.location.lng,
          }}
        />
      </MapView>
      <View style={[styles.container, { width: "100%", flex: 0, marginTop: 10, position: 'absolute' }]}>
        <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingStart: 20 }]}>
          <Image resizeMode="contain" source={require('./../../../../assets/search.png')} style={{ height: 20, width: 20, }} />
          <Text style={{ margin: 15, }}>{nook.address}</Text>
        </View>
      </View>
    </View>)
  }

  componentDidMount() {

    let featuredImage = null;
    const nook = this.props.navigation.state.params;
    if (nook.medias && nook.medias.length > 0) {
      featuredImage = nook.medias[0].path;
    }

    this.setState({
      featuredImage,
    });
  }
  handleRoomChange = value => this.setState({
    roomId: value
  });

  togglePopup = () => {
    const { isSchedule, isDialogVisible } = this.state;
    this.setState({
      isDialogVisible:!isDialogVisible
    });
  }

  renderScheduleVisitPopup = (nook_id) => {
    const { isSchedule, isDialogVisible,date } = this.state;

    if (isSchedule) {
      return (
        <PopupDialog
          width={0.9} height={0.35}
          visible={isDialogVisible}
          onTouchOutside={this.togglePopup}>
          <View style={{ flex: 1, padding: 25, }}>
            <TouchableOpacity onPress={this.togglePopup}>
              <Image resizeMode="contain" source={require('./../../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginTop: 5 }} >
              Date & Time
            </TitleText>

            <DatePicker
              style={{
                ...styles.container,
                width: "100%", flex: 0, padding: 0
              }}
              mode="datetime"
              placeholder="Select Date & Time"
              format="X"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconSource={require('./../../../../assets/date.png')}
              customStyles={{
                dateText: {
                  margin: 15,
                  color: 'black'
                },
                dateIcon: {
                  height: 20, width: 20,
                },
                dateInput: {
                  ...styles.child,
                  borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 15,

                }
              }}
              onDateChange={(date) => {
                console.log({ date })
                this.setState({
                  date: date
                })
              }}
            />

            <Button onPress={() => {
              this.setSchedule(nook_id)
            }}>Schedule</Button>
          </View>
        </PopupDialog>
      );
    }

  }

  render() {
    const nook = this.props.navigation.state.params;
    const { rooms } = nook;
    const { filter, featuredImage } = this.state;

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
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 22, }} >{nook.nookCode}</TitleText>
            </View>
          </View>
          <View style={{ borderRadius: 30, marginTop: 10, marginBottom: 10, marginStart: 15, marginEnd: 15 }}>
            <TouchableOpacity onPress={() => {
              showMode('time');
            }}>
              <View style={[styles.child, { borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
                <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>{nook.type}</Text>
                <Text style={{ margin: 15, fontSize: 16, }}>PKR {nook.price ? nook.price : Math.min(...nook.rooms.map(r => r.price_per_bed))}</Text>
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
                    nook.medias.map((m, index) => (
                      <TouchableOpacity key={index} onPress={() => this.setState({ featuredImage: m.path })}>
                        <Image resizeMode="cover" resizeMode="contain" source={{
                          uri: m.path
                        }
                        } style={{ marginEnd: 10, borderRadius: 10, height: 100, width: 100, flex: 1 }} />
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </View> :
              <View style={{ marginTop: 15, paddingBottom: 15, borderRadius: 10, backgroundColor: Colors.white }}>
                <WebView
                  style={{ height: 200, width: null, flex: 1 }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: `https://www.youtube.com/embed/${this.getYoutubeIDFromURL(nook.video_url)}?autoplay=1&theme=light&color=white&disablekb=1` }}
                  scalesPageToFit={true}
                  bounces={false}
                  javaScriptEnabled
                  automaticallyAdjustContentInsets={false}
                />
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
                  <Text>{nook.description}</Text>
                </View>
              </View>
            </View>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
              Feature
            </TitleText>

            <View style={{ flexWrap: 'wrap', flexDirection: 'row', }}>
              {nook.facilities.map((fac, facI) =>
                <View key={facI} style={{ width: "25%" }}>
                  <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                    <Text>{fac}</Text>
                  </Card>
                </View>
              )}

            </View>
            {nook.location &&
              <View>
                <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, marginTop: 15 }} >
                  Location
              </TitleText>
                <View style={{ height: 400 }}>
                  {view}
                </View>
              </View>
            }

            <View style={[styles.child, { borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
              <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Contact</Text>
              <Text style={{ margin: 15, fontSize: 16, }}>{nook.number}</Text>
            </View>
            <Button onPress={() => { this.setState({ isDialogVisible: true, isBookNow: true, isSchedule: false }); }}>Book Now</Button>
            <Button onPress={() => { this.setState({ isDialogVisible: true, isSchedule: true, isBookNow: false }); }}>Schedule List</Button>
          </View>
          {this.renderScheduleVisitPopup(nook.id)}
          {
            this.state.isBookNow &&
            <PopupDialog
              width={0.9} height={0.4}
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
                    onValueChange={this.handleRoomChange
                    }>
                    {rooms.map((room, roomi) => {
                      return <Picker.Item key={roomi} value={room.id} label={`${room.capacity} Persons Sharing - ${room.price_per_bed} PKR`} />
                    })}
                  </Picker>
                </Item>
                <Button onPress={() => {
                  this.setState({ isDialogVisible: false });
                  const { user: { access_token }, addNookRoom } = this.props;

                  this.setState({ loading: true, modalVisible: false });
                  addNookRoom({
                    data: { "nook_id": nook.id, "room_id": this.state.roomId },
                    onError: (error) => {
                      alert(error);
                      this.setState({ loading: false });
                    },
                    onSuccess: () => {
                      this.setState({ loading: false });
                      alert('Booking of room has been created successfully');
                    },
                    filter,
                    token: access_token
                  });
                }}>Book</Button>
              </View>
            </PopupDialog>
          }
        </ScrollView>
      </View >
    );
  }

  setSchedule(nook_id) {
    this.setState({ isDialogVisible: false });
    const { filter } = this.state;
    const { user: { access_token }, addNookSchedule } = this.props;
    this.setState({ loading: true, modalVisible: false });
    addNookSchedule({
      data: { "nook_id": nook_id, "time": this.state.date },
      onError: (error) => {
        alert(error);
        this.setState({ loading: false });
      },
      onSuccess: () => {
        this.setState({ loading: false });
        alert('Vist has been scheduled successfully');
      },
      filter,
      token: access_token
    })
  }

  getYoutubeIDFromURL(url) {
    var video_id = url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      return video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }
}
const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
  };
};
export default connect(
  mapStateToProps,
  {
    addNookRoom: actions.addNookRoom,
    addNookSchedule: actions.addNookSchedule
  },
)(NookDetailScreen)
