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
import { WebView } from 'react-native-webview';
import { connect } from "react-redux";
import DatePicker from 'react-native-datepicker'
import * as NavigationService from '../../../NavigationService';
import * as actions from "../../../Store/Actions/NookActions";
import * as bookingActions from '../../../Store/Actions/BookingsActions';
import * as shiftsActions from "../../../Store/Actions/ShiftsActions";
import moment from 'moment';

class NookDetailScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tabIndex: 0,
      tabIndexUser: 0,
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
      submitting:false,
      isSchedule: false,
      show: false,
      nook: null,
      addShiftModal: false,
      details: '',
      dateText: ''
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
        <Marker
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

    // const { user, getMyNookDetails } = this.props;
    // if(user){
    //   getMyNookDetails({
    //     token: user.access_token
    //   });
    // }
    
    let featuredImage = null;
    const nook = this.props.navigation.state.params;
    if (nook.medias && nook.medias.length > 0) {
      featuredImage = nook.medias[0].path;
    }

    this.setState({
      featuredImage,
    });
  }
  facilities(fc){
    if(fc.length == 0){
      return true;
    }
   return(
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', }}>
              {fc.map((fac, facI) =>
                <View key={facI} style={{ width: "25%" }}>
                  <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                    <Text>{fac}</Text>
                  </Card>
                </View>
              )}
      </View>
   )}
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
    let tab3Color;
    let tab4Color;
    let tab3Icon;
    let tab4Icon;
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
    if (this.state.tabIndexUser == 0) {

      tab3Color = Colors.orange;
      tab4Color = Colors.white;
      tab3Icon = require('./../../../../assets/map_select.png');
      tab4Icon = require('./../../../../assets/option_unselect.png');
    } else {

      tab4Color = Colors.orange;
      tab3Color = Colors.white;
      tab4Icon = require('./../../../../assets/map_unselect.png');
      tab3Icon = require('./../../../../assets/option_select.png');
    }

    return (

      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={true} optionButton={() => {

        }} />
        <ScrollView style={{ top: -7 }}>
          <View style={{ flexDirection: "row", }}>
            <View >
              <Image resizeMode="contain" style={{ height: 100, width: 100, }} />
            </View>
            <View style={{ flex: 1, width: '100%', marginTop: 10, position: 'absolute', }}>
              <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 22, }} >Nook Code {nook.nookCode}</TitleText>
            </View>
          </View>
          <View style={{ borderRadius: 30, marginTop: 10, marginBottom: 10, marginStart: 15, marginEnd: 15 }}>
            <TouchableOpacity>
              <View style={[styles.child, { borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
                <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Nook Gender</Text>
                <Text style={{ margin: 15, fontSize: 16, }}>{nook.gender_type}</Text>
              </View>
              <View style={[styles.child, { marginTop: 10, borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
                <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Nook Type</Text>
                <Text style={{ margin: 15, fontSize: 16, }}>{nook.type}</Text>
              </View>
              <View style={[styles.child, { marginTop: 10, borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
                <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Rent</Text>
                <Text style={{ margin: 15, fontSize: 16, }}>{(nook.rent && nook.rent !== '0') ? nook.rent : Math.min(...nook.rooms.map(r => r.price_per_bed))} PKR / Month</Text>
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
                { (nook.video_url) &&
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
                }
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

            {
              (nook.space_type === 'Independent') &&
              <View style={[styles.container, { marginBottom: 10, padding: 0 }]}>
                <View style={styles.child}>
                  <View style={{ padding: 20, }}>
                    <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
                      Inner Details
                      </TitleText>
                    <Text>{nook.inner_details}</Text>
                  </View>
                </View>
              </View>
            }

            {
              (nook.space_type === 'Independent' && nook.other) &&
              <View style={[styles.container, { marginBottom: 10, padding: 0 }]}>
                <View style={styles.child}>
                  <View style={{ padding: 20, }}>
                    <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
                      Other Details
                    </TitleText>
                    <Text>{nook.other}</Text>
                  </View>
                </View>
              </View>
            }

            {
              (nook.space_type === 'Independent') &&
              <Card style={{ borderRadius: 20 }}>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <TitleText style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>Area</TitleText>

                    <TitleText style={{
                      fontWeight: 'bold',
                      marginTop: 10,
                      fontSize: 16,
                    }}>Furnished</TitleText>

                    <TitleText style={{
                      fontWeight: 'bold',
                      marginTop: 10,
                      fontSize: 16,
                    }}>Security</TitleText>

                    <TitleText style={{
                      fontWeight: 'bold',
                      marginTop: 10,
                      fontSize: 16,
                    }}>Agreement Charges</TitleText>

                    <TitleText style={{
                      fontWeight: 'bold',
                      marginTop: 10,
                      fontSize: 16,
                    }}>Agreement Tenure</TitleText>

                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>

                    <TitleText style={{
                      color: Colors.textGray,
                      fontSize: 16,
                    }}>{nook.area}</TitleText>


                    <TitleText style={{
                      color: Colors.textGray,
                      marginTop: 10,
                      fontSize: 16,
                    }}>{nook.furnished ? 'Yes' : 'No'}</TitleText>

                    <TitleText style={{
                      color: Colors.textGray,
                      marginTop: 10,
                      fontSize: 16,
                    }}>{nook.security} PKR</TitleText>

                    <TitleText style={{
                      color: Colors.textGray,
                      marginTop: 10,
                      fontSize: 16,
                    }}>{nook.agreementCharges} PKR</TitleText>

                    <TitleText style={{
                      color: Colors.textGray,
                      marginTop: 10,
                      fontSize: 16,
                    }}>{nook.agreementTenure}</TitleText>
                  </View>
                </View>
              </Card>
            }

            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
              Facilities
            </TitleText>

            {this.facilities(nook.facilities)}
              {(nook.location)?
              <View>
                <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, marginTop: 15 }} >
                  Location
              </TitleText>
                <View style={{ height: 400 }}>
                  {view}
                </View>
              </View>
              :
              <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, marginTop: 15 }} >
                  Location
              </TitleText>
            }

            <View style={[styles.child, { borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
              <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>Contact</Text>
              <Text style={{ margin: 15, fontSize: 16, }}>{nook.number}</Text>
            </View>

            {/* Rooms and user data tab */}
            <View style={{ backgroundColor: Colors.white, borderRadius: 30, flexDirection: "row", marginTop: 30, marginBottom: 10, }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                  this.setState({ tabIndexUser: 0 });
                }} style={[styles.tabButton, { backgroundColor: tab3Color }]} >
                  <Text style={{ color: tab4Color }}>Rooms</Text>

                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => {
                  this.setState({ tabIndexUser: 1 })
                }} style={[styles.tabButton, { backgroundColor: tab4Color }]} >
                  <Text style={{ color: tab3Color }}>Users</Text>
                </TouchableOpacity>
              </View>
            </View>

            {this.state.tabIndexUser === 0 ?
              <View style={[styles.container, { width: "100%", marginTop: 10, padding: 0, }]}>
                {
                  nook.rooms.map((r, rI) =>
                    <View key={rI} style={[styles.child, { marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: Colors.white, }]}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                          <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>Price Per Bed</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', }}>
                          <Text style={{ marginBottom: 15, fontSize: 16, }}>{r.price_per_bed} PKR</Text>
                          <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 15, }}>
                            <Image resizeMode="contain" source={require('./../../../../assets/bed-icon.png')} style={{ marginRight: 15, }} />
                            <Text style={{ fontSize: 16, }}>{r.noOfBeds}</Text>
                          </View>
                          <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 15, }}>
                            <Image resizeMode="contain" source={require('./../../../../assets/user-icon.png')} style={{ marginRight: 15, }} />
                            <Text style={{ fontSize: 16, }}>{r.capacity}</Text>
                          </View>
                        </View>
                      </View>   
                   </View>    
                  )
                } 
                </View>
              :
              <View style={[styles.container, { width: "100%", marginTop: 10, padding: 0, }]}>
                  <View style={[styles.child, { borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingStart: 20 }]}>
                    <View searchBar rounded>
                      <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                      </Item>
                    </View>
                  </View>

                  <View >
                   {
                    nook.bookings.map((b, bI) =>
                      <View style={[styles.child, { marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: Colors.white, }]}>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>{b.user.name}</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>Room # {b.room.id}</Text>
                          </View>
                        </View>

                        <View style={{ flexDirection: "row",  }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>Rent</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>{b.rent} PKR</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row",  }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>Paid Security</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>{b.paidSecurity} PKR</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row",  }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>Security</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>{b.security} PKR</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row",  }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>Refuned Security</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>{b.refunedSecurity} PKR</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignContent: "center" }}>
                          <View style={{ flex: 1, marginTop: 20, width: "100%" }}>
                            <Button disabled={submitting} >
                              {submitting ? "Please wait..." : "GENERATE RECEIPT"}
                            </Button>
                          </View>
                        </View>
                      </View>
                    )
                   }
                    <View style={{ flex: 1, alignContent: "center" }}>
                      <View style={{ flex: 1, marginTop: 20, width: "100%" }}>
                        <Button disabled={submitting} >
                          {submitting ? "Please wait..." : "GENERATE RECEIPT"}
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>  
            }
      
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
  getYoutubeIDFromURL(url) {
    var video_id = url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
      return video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }
}
const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
    usersNook: state.NookReducer.nook,
    bookings: state.BookingsReducer.bookings,
  };
};
export default connect(
  mapStateToProps,
  {
    addNookRoom: actions.addNookRoom,
    addNookSchedule: actions.addNookSchedule,
    addShift: shiftsActions.addShift,
    getMyNookDetails: actions.getMyNookDetails,
    getBookings: bookingActions.getBookings,
  },
  
)
(NookDetailScreen)
