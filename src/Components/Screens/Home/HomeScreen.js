import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { CardItem, Spinner } from "native-base";
import Header from '../../SeperateComponents/Header';
import TitleText from '../../SeperateComponents/TitleText';
import * as NavigationService from '../../../NavigationService';
import Colors from '../../../helper/Colors';
import styles from './styles';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import PopupDialog from 'react-native-popup-dialog';
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/NookActions";
import {calculateDistance} from '../../../helper/locationHelper';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 3,
      isMap: true,
      isDialogVisible: false,
      markers: {
        latlng: {
          latitude: 31.5204,
          longitude: 74.3587,
        },
        title: "",
        description: ""
      },
      filter: {
        space_type: ''
      },
      loading: true,
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.applyFilter();
  }
  applyFilter = () => {
    const { user: { access_token }, getPublicNooks } = this.props;
    const { filter } = this.state;
    console.log('filter', filter);
    this.setState({ loading: true, modalVisible: false });
    getPublicNooks({
      onError: (error) => {
        alert(error);
        this.setState({ loading: false });
      },
      onSuccess: () => {
        this.setState({ loading: false });
      },
      filter,
      token: access_token
    });
  }


  mapView = () => {

    const { nooks, desiredLocation } = this.props;
    let locationAddress = 'Enter desired location';

    if(desiredLocation){
      locationAddress = desiredLocation.address || locationAddress;
    }

    console.log('Render desiredLocation',desiredLocation);
    
    const { loading, selectedNook } = this.state;
    if (loading) {
      return <Spinner color='black' />;
    }

    let distance = '';
    if(desiredLocation && selectedNook){
      distance = calculateDistance(desiredLocation,selectedNook.location)
    } 

    return (<View style={{ flex: 1 }}>

      <MapView initialRegion={{
        ...this.state.markers.latlng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} style={styles.mapStyle}>
        {nooks.filter(nook => nook.location).map((nook) => {
          return (
            <Marker key={nook.id} onPress={(coordinate, points) => {
              this.setState({ isDialogVisible: true, selectedNook: nook });
            }}
              image={require('./../../../../assets/marker.png')}
              coordinate={{
                latitude: nook.location.lat,
                longitude: nook.location.lng,
              }}
            />
          );
        })}
      </MapView>
      <TouchableOpacity onPress={() => NavigationService.navigate("GooglePlacesInput")}
        style={[styles.container, { width: "100%", flex: 0, marginTop: 10, position: 'absolute' }]}>
        <View style={[styles.child, {
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
          paddingStart: 20
        }]}>
          <Image resizeMode="contain" source={require('./../../../../assets/search.png')}
            style={{ height: 20, width: 20, }} />
          <Text style={{ margin: 15, }}>{locationAddress}</Text>
        </View>
      </TouchableOpacity>
      {selectedNook && <PopupDialog
        width={0.9} height={0.6}
        ref={"popupDialog"}
        visible={this.state.isDialogVisible}
        onTouchOutside={() => {
          this.setState({ isDialogVisible: false });
        }}>
        <View style={{ flex: 1, padding: 15, }}>
          <TouchableOpacity onPress={() => {
            this.setState({ isDialogVisible: false });
          }}>
            <Image resizeMode="contain" source={require('./../../../../assets/close.png')}
              style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
          </TouchableOpacity>
          <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }}>{selectedNook.nookCode}</TitleText>
          <Image resizeMode="contain" source={{uri:selectedNook.medias[0].path}}
            style={{ borderRadius: 5, height: 200, width: null, marginTop: 15 }} />
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }}>Price</TitleText>
              {distance && <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }}>Distance</TitleText>}
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }}>Gender</TitleText>
              {/* <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }}>Partner time</TitleText> */}
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }}>PKR {selectedNook.rooms[0].price_per_bed}</TitleText>
              {distance && <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }}>{distance} km</TitleText>}
              <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }}>{selectedNook.gender_type}</TitleText>
              {/* <TitleText style={{ marginTop: 15, fontWeight: 'bold', fontSize: 16, }}>Pak Arab</TitleText> */}
            </View>
          </View>
        </View>
      </PopupDialog>
      }

    </View>)
  }
  listView = () => {
    const { nooks, desiredLocation } = this.props;
    let locationAddress = 'Enter desired location';

    if(desiredLocation){
      locationAddress = desiredLocation.address || locationAddress;
    }

    console.log('Render desiredLocation',desiredLocation);

    const { loading } = this.state;
    if (loading) {
      return <Spinner color='black' />;
    }

    return (<View style={{ flex: 1, flexDirection: "column" }}>

      <TouchableOpacity style={[styles.container, { flex: 0, marginTop: 10 }]} onPress={() => NavigationService.navigate("GooglePlacesInput")}>
        <View style={[styles.child, {
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
          paddingStart: 20
        }]}>
          <Image resizeMode="contain" source={require('./../../../../assets/search.png')}
            style={{ height: 20, width: 20, }} />
          <Text style={{ margin: 15, }}>{locationAddress}</Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        {nooks.map((item, i) =>
          <View style={styles.container} key={i}>
            <TouchableOpacity style={styles.child} onPress={() => {
              this.setState({ isDialogVisible: false });
              NavigationService.navigate("NookDetailScreen", item)
            }}>
              <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.type} </Text>
                <Text>PKR {item.price ? item.price : Math.min(...item.rooms.map(r => r.price_per_bed))}</Text>
              </View>
              <CardItem cardBody>
                {
                  item.medias.map((m, index) => {
                    if (index === 0) {
                      return <Image key={index} resizeMode="contain" source={{
                        uri: m.path
                      }
                      } style={{ height: 200, width: null, flex: 1 }} />
                    }
                  }
                  )
                }
              </CardItem>
              <TitleText
                style={{ marginTop: 10, marginBottom: 10, fontSize: 20, }}>{item.nookCode}</TitleText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>)
  }

  render() {
    console.log("state chenage", this.state.tabIndex);

    let view;
    let tab1Color;
    let tab2Color;
    let tab1Icon;
    let tab2Icon;
    let tab3Color;
    let tab4Color;
    let tab3Icon;
    let tab4Icon;
    if (this.state.isMap) {
      // view = this.mapView();
      tab1Color = Colors.orange;
      tab2Color = Colors.white;
      tab1Icon = require('./../../../../assets/map_select.png');
      tab2Icon = require('./../../../../assets/option_unselect.png');
    } else {
      // view = this.listView();
      tab2Color = Colors.orange;
      tab1Color = Colors.white;
      tab1Icon = require('./../../../../assets/map_unselect.png');
      tab2Icon = require('./../../../../assets/option_select.png');
    }
    if (this.state.tabIndex === 3) {
      view = this.mapView();
      tab3Color = Colors.orange;
      tab4Color = Colors.white;
      tab3Icon = require('./../../../../assets/icons8-individual-server-100.png');
      tab4Icon = require('./../../../../assets/icons8-shared-mailbox-100-yellow.png');
    } else if (this.state.tabIndex === 4) {
      view = this.mapView();
      tab4Color = Colors.orange;
      tab3Color = Colors.white;
      tab3Icon = require('./../../../../assets/icons8-individual-server-100-yellow.png');
      tab4Icon = require('./../../../../assets/icons8-shared-mailbox-100.png');
    }
    else if (this.state.tabIndex === 5) {
      view = this.listView();
      tab3Color = Colors.orange;
      tab4Color = Colors.white;
      tab3Icon = require('./../../../../assets/icons8-individual-server-100.png');
      tab4Icon = require('./../../../../assets/icons8-shared-mailbox-100-yellow.png');
    } else {
      view = this.listView();
      tab4Color = Colors.orange;
      tab3Color = Colors.white;
      tab3Icon = require('./../../../../assets/icons8-individual-server-100-yellow.png');
      tab4Icon = require('./../../../../assets/icons8-shared-mailbox-100.png');
    }
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header backButton={false} optionButton={true} />

        <View style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
          <TitleText
            style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, marginStart: '50%' }}>Nook
                    </TitleText>
          <View style={{
            backgroundColor: Colors.white, flexDirection: "row", display: 'flex', marginLeft: 'auto',
            borderRadius: 30, width: '30%', marginTop: 10
          }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => {
                this.setState({ isMap: true, tabIndex: 3 });
              }} style={[styles.tabButton, { backgroundColor: tab1Color }]}>
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
                this.setState({ isMap: false, tabIndex: 5 })
              }} style={[styles.tabButton, { backgroundColor: tab2Color }]}>
                <Image resizeMode="contain" style={{
                  width: 25,
                  height: 25,
                }}
                  source={tab2Icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{
          backgroundColor: Colors.white,
          borderRadius: 30,
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 10,
          marginStart: 15,
          marginEnd: 15
        }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => {
              if (this.state.isMap) {
                this.setState({ tabIndex: 3 });
                console.log('map View independant');
                this.setState({
                  filter: {
                    space_type: 'independent'
                  }
                }, () => {
                  this.applyFilter();
                });
              } else {
                this.setState(({ tabIndex: 5 }));
                console.log('list View independent');
                this.setState({
                  filter: {
                    space_type: 'independent'
                  }
                }, () => {
                  this.applyFilter();
                });
              }
            }} style={[styles.tabButton, { backgroundColor: tab3Color }]}>
              <Image resizeMode="contain" style={{
                width: 25,
                height: 25,
              }}
                source={tab3Icon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => {
              // this.setState({ tabIndex: 1 })
              if (this.state.isMap) {
                this.setState({ tabIndex: 4 });
                this.setState({
                  filter: {
                    space_type: 'shared'
                  }
                }, () => {
                  this.applyFilter();
                });
              } else {
                console.log('list View shared');
                this.setState({ tabIndex: 6 });
                this.setState({
                  filter: {
                    space_type: 'shared'
                  }
                }, () => {
                  this.applyFilter();
                });
              }
            }} style={[styles.tabButton, { backgroundColor: tab4Color }]}>
              <Image resizeMode="contain" style={{
                width: 25,
                height: 25,
              }}
                source={tab4Icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {view}
        </View>
      </View>
    );

  }
}

const mapStateToProps = state => {
  return {
    nooks: state.NookReducer.nooks,
    user: state.AuthReducer.user,
    desiredLocation: state.NookReducer.desiredLocation,
  };
};
export default connect(
  mapStateToProps,{
    getPublicNooks: actions.getPublicNooks,
  },
)(HomeScreen)
