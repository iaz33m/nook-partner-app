import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert,ScrollView, Image, TextInput } from 'react-native';
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
import InputField from "../../SeperateComponents/InputField";
import DatePicker from 'react-native-datepicker'
import * as NavigationService from '../../../NavigationService';
import * as actions from "../../../Store/Actions/ReceiptsActions";
import * as complainaActions from "../../../Store/Actions/ComplainsActions";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import moment from 'moment';

class NookDetailScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tabIndex: 0,
      tabIndexUser: 0,
      isDialogVisible: false,
      isDialogComplainVisible: false,
      roomUserDialogVisible:false,
      users:[],
      date: new Date(),
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
      bookings:this.props.navigation.state.params.bookings,
      addShiftModal: false,
      details: '',
      dateText: '',
      e_unit_cost:null,
      status:"draft",
      late_day_fine:null,
      e_units:null,
      user_id:null,
      user_name:null,
      fine:null,
      due_date: moment(),
      extras: [],
      extra: {
        name: '',
        value: ''
      },
      type: '',
      types: {
        'other': 'Other'
      },
      image:'',
      profile:'',
    }
  }

  pickImage = async (driver) => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    if (status === 'granted') {

      let src = ImagePicker.launchImageLibraryAsync;

      if (driver == "camera") {
        src = ImagePicker.launchCameraAsync;
      }

      let result = await src({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 0.5
      });

      if (!result.cancelled) {
        const base64 = result.base64.replace(/\n/g, "");
        this.setState({ image: result.uri, profile: base64 });
      }

    } else {
      return alert("Permission not granted");
    }

  };

  selectImageSrc = () => {

    Alert.alert(
      'Image Source',
      'Select Image From', [
      { text: 'Camera', onPress: () => this.pickImage("camera") },
      { text: 'Gallery', onPress: () => this.pickImage("gallary") },
    ],
      { cancelable: true },
    );

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
    if(fc == null){
      return true;
    }
    if(fc.length == 0){
      return true;
    }
   return(
     <>
      <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, marginRight: 10, marginBottom: 10, }} >
        Facilities
      </TitleText>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', }}>
              {fc.map((fac, facI) =>
                <View key={facI} style={{ width: "25%" }}>
                  <Card style={{ borderRadius: 20, padding: 5, alignItems: 'center' }}>
                    <Text>{fac}</Text>
                  </Card>
                </View>
              )}
      </View>
    </>
   )}
   
  generateReceipt = () => {

    const {
      generateReceipt,
      user: { access_token: token },
    } = this.props;
    
    const extras = {};
    if(this.state.extras.length > 0){
      this.state.extras.map((ex) => {
        extras[ex.name] = ex.value
      });
    }    
  const data = {
      "user_id": this.state.user_id,
      "due_date": moment(this.state.due_date, 'MMMM Do YYYY, h:mm a').unix(),
      // "status": this.state.status || "0",
      "status": "draft" || "0",
      "e_units": this.state.e_units || "0",
      "e_unit_cost": this.state.e_unit_cost || "0",
      "fine": this.state.fine || "0",
      "late_day_fine": this.state.late_day_fine || "0",
      "extras": extras
    };

    this.setState({ submitting: true });
    generateReceipt({
      data: data,
      token,
      onSuccess: () => {
        this.setState({ submitting: false ,isDialogVisible: false, status:''});
        alert('Receipt Generated Successfully');
      },
      onError: (message) => {
        alert(message);
        this.setState({
          submitting: false,
        });
      },
    });
  };


  publishReceipt = (receiptData = {}) => {

    const {
      publishReceipt,
      user: { access_token: token, id },
    } = this.props;
    

    const data = {
        user_id: id,
        ...receiptData,
    };

    this.setState({ submitting: true });
    publishReceipt({
      data: data,
      token,
      onSuccess: (message) => {
        this.setState({ submitting: false});
        alert(message);
      },
      onError: (message) => {
        alert(message);
        this.setState({
          submitting: false,
        });
      },
    });
  };
  toggleSubmitting = () => {
    const { submitting } = this.state;
    this.setState({
      submitting: !submitting,
    });
  };
  sendComplains() {

    this.toggleSubmitting();
    
    const { filter, user_id } = this.state;
    const { user: { access_token }, addComplain } = this.props;
    if(this.state.type.length == 0){
      alert('Select Type First');
      this.setState({ submitting:false });
      return true;
    }
    
    const data = { "description": this.state.description, "type": this.state.type, "media":this.state.profile,"user_id":this.state.user_id };
    
    addComplain({
      data: data,
      onError: (error) => {
        this.toggleSubmitting();
        alert(error);
      },
      onSuccess: () => {
        alert('Complain has been sent successfully');
        this.setState({ submitting:false, isDialogComplainVisible:false, profile:'', image:'' });
      },
      filter,
      token: access_token
    })
  }

  renderComplainsPopup = () => {
    const { isDialogComplainVisible, description, submitting, profile, image } = this.state;
    
      return (
        <PopupDialog
          width={0.9} height={0.8}
          visible={this.state.isDialogComplainVisible}
          onTouchOutside={this.togglePopup}>
          <View style={{ flex: 1, padding: 25, }}>
          {/* <ScrollView> */}
            <TouchableOpacity onPress={() => this.setState({
              isDialogComplainVisible: false
            })}>
              <Image resizeMode="contain" source={require('./../../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            <Item picker style={styles.pickerStyle}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%" }}
                placeholder="Select Type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.type}
                onValueChange={type => this.setState({ type })}>
                <Picker.Item label="All Types" value="" />
                {Object.keys(this.state.types)
                  .filter(k => k)
                  .map(k => <Picker.Item key={k} label={this.state.types[k]} value={k} />)}
              </Picker>
            </Item>

            <Textarea
              rowSpan={4}
              bordered
              placeholder="Description"
              value={description}
              onChangeText={description => this.setState({ description })}
            /> 
            { image !='' && 
              <>
              <TouchableOpacity onPress={() => this.setState({image:'', profile:''})}>
              <Text
                style={{
                  marginRight: 0,
                  width: 100,
                  flex: 1,
                  color: "red",
                }}
              >
                x
              </Text>
            </TouchableOpacity>
            <Image
              resizeMode="cover"
              resizeMode="contain"
              source={{
                uri: image,
              }}
              style={{
                borderRadius: 10,
                height: 100,
                width: null,
                flex: 1,
              }}
            />
            </> 
            }
            { !image && 
              <View style={styles.container} >
                <View style={[styles.child, { height: 150, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
                  <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20 }} >
                    Select Image
                  </TitleText>
                  <TouchableOpacity onPress={this.selectImageSrc}>
                    <Image style={{
                      width: 40,
                      height: 40,
                    }}
                      source={require('./../../../../assets/add.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
            <Button disabled={submitting} onPress={() => { this.sendComplains() }} >{submitting ? 'Please wait...' : 'Add Complain'}</Button>
            {/* </ScrollView> */}
          </View>
        </PopupDialog>
      );
  }

   renderReceiptGeneraterPopup = () => {
    const { isSchedule, isDialogVisible, submitting,status,fine,late_day_fine,e_units,e_unit_cost,due_date } = this.state;

    if (isSchedule) {
      return (
        <PopupDialog
          width={0.9} height={0.9}
          visible={isDialogVisible}
          onTouchOutside={this.togglePopup}>
          <View style={{ flex: 1, padding: 25, }}>
            <TouchableOpacity onPress={() => this.setState({
              isDialogVisible: false,
              status:"",
            })}>
              <Image resizeMode="contain" source={require('./../../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            <Text style={{justifyContent: 'center', fontWeight: 'bold'}}>Generate Receipt</Text>
            <ScrollView style={{ marginTop: 10 }}>
              {/* <Item picker style={styles.pickerStyle}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: "100%" }}
                  placeholder="Select Status"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.status}
                  onValueChange={(status) => this.setState({ status })}
                >
                  <Picker.Item value="" label="Select Status"/>
                  <Picker.Item value="draft" label="Draft" />
                  <Picker.Item value="unpaid" label="Unpaid" />
                  <Picker.Item value="in_progress" label="In Progress" />
                  <Picker.Item value="paid" label="paid" />
                </Picker>
              </Item> */}
              <View style={styles.Inputchild}>
                <TextInput style={{pending: 10 }} keyboardType='numeric' onChangeText={(fine) => this.setState({ fine })}  placeholder ="Fine"/> 
              </View>
              <DatePicker
                style={{
                  ...styles.container,
                  width: "100%", flex: 0, padding: 0, marginTop: 10
                }}
                mode="datetime"
                date={due_date}
                placeholder='Select a date'
                format="MMMM Do YYYY, h:mm a"
                // format="X"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('./../../../../assets/date.png')}
                customStyles={{
                  dateText: {
                    margin: 15,
                    marginTop: 15,
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
                onDateChange={(due_date) => {this.setState({due_date})}}
              />
              <View style={styles.Inputchild}>
                <TextInput style={{pending: 10 }} keyboardType='numeric' onChangeText={(late_day_fine) => this.setState({ late_day_fine })}  placeholder ="Late Day Fine"/> 
              </View>
              <View style={styles.Inputchild}>
                <TextInput style={{pending: 10 }} keyboardType='numeric' onChangeText={(e_units) => this.setState({ e_units })}  placeholder ="Electricity units"/> 
              </View>
              <View style={styles.Inputchild}>
                <TextInput style={{pending: 10 }} keyboardType='numeric' onChangeText={(e_unit_cost) => this.setState({ e_unit_cost })}  placeholder ="Electricity unit Cost"/> 
              </View>
              <Text style={{justifyContent: 'center', fontWeight: 'bold', margin: 20}}>Add Extras</Text>
              
                {this.state.extras.map((extra) =>
                  this.Extra_row(extra)
                )}
                { this.ExtrasField()}
              <Button disabled={submitting} onPress={() => { this.generateReceipt() }} >{submitting ? 'Please wait...' : 'Generate Receipt'}</Button>
            </ScrollView>
          </View>
        </PopupDialog>
      );
    }
  }
  renderRoomUserPopup =()=>{
    const { roomUserDialogVisible, users } = this.state;
    if(users.length == 0 && roomUserDialogVisible == true){
      this.setState({
        roomUserDialogVisible: false,
        users: [],
      });
      alert('There is no user')
    }
    if(users.length > 0){
      return (
        <PopupDialog
          width={0.9} height={0.7}
          visible={roomUserDialogVisible}
          onTouchOutside={this.togglePopup}>
          <View style={{ flex: 1, padding: 25, }}>
            <TouchableOpacity onPress={() => this.setState({
              roomUserDialogVisible: false,
            })}>
              <Image resizeMode="contain" source={require('./../../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            <Text style={{justifyContent: 'center', fontWeight: 'bold'}}>Room Users</Text>
            <ScrollView style={{ marginTop: 10 }}>
              {
                users.map((u, uI) =>
                  <View key={uI} style={[styles.child, { marginTop: 15, marginBottom: 15,  marginRight: 10,  marginLeft: 10, padding: 15, borderRadius: 10, backgroundColor: Colors.white, }]}>      
                        <View style={{ flexDirection: "row"  }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>User Name</Text>
                            <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>User Number</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>{u.name}</Text>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>{u.number}</Text>
                          </View>
                        </View>   
                  </View>
                )
              }
            </ScrollView>
          </View>
        </PopupDialog>
      );
    }
  }
  Extra_row =(extra)=>{
    return(
      <>
        <View style={[styles.child, { marginTop: 10, borderRadius: 30, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingStart: 15, paddingEnd: 15 }]}>
          <Text style={{ margin: 15, fontSize: 16, fontWeight: 'bold' }}>{extra.name}</Text>
          <Text style={{ margin: 15, fontSize: 16, }}>{extra.value}</Text>
        </View>
      </>
    );
  }
  ExtrasField(){
    
    return(
      <>
        <InputField value={this.state.extra.name}  onChangeText={name => {
            this.setState({
              extra: {
                ...this.state.extra,
                name: name
              }
            })
          }} > Name </InputField>
          <View style={styles.Inputchild}>
            <TextInput style={{pending: 10 }} keyboardType='numeric' value={this.state.extra.value} 
            onChangeText={value => {
              this.setState({
                extra: {
                  ...this.state.extra,
                  value: value
                }
              })
            }}  placeholder ="Value"/> 
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => { this.addExtra() }}
            >
              <Text style={{justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>Add Extra</Text>
            </TouchableOpacity>
          </View>
      </>
    );
  }
  addExtra = () => {
    const {name, value} = this.state.extra;
    if(name.length > 0 && value.length > 0){
      let joined = this.state.extras.concat(this.state.extra);
      this.setState({
        extras: joined,
        extra: { name: '', value: '' }
      });
    }
  };
  SearchFilterFunction(text) {
    const bookings = this.state.bookings;
    if(text.length > 0){
      const newData = bookings.filter(function(b) {
        const itemData = b.user.name ? b.user.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        bookings: newData,
      });
    }else{
      this.setState({
        bookings: this.props.navigation.state.params.bookings,
      });
    }
  }
  bookings = () =>{
    const bookings = this.state.bookings;
    const nook = this.props.navigation.state.params;
    const {submitting} = this.state;
    if(bookings.length == 0 ){
      return true;
    }
    return(
        <View>
        {bookings.map((b, bI) => {
          const {receipts} = b;
          const singleReceipt = receipts ? receipts : null; 
          if(b.status =="Approved"){
          return (
            <>
            <View key={bI} style={[styles.child, { marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: Colors.white, }]}>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>{b.user.name}</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>Room {(b.room)? ((b.room.room_number !== null)? b.room.room_number :b.room.id):''}</Text>
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
                        {(singleReceipt && singleReceipt.received_amount) && (
                        <View style={{ flexDirection: "row",  }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>Receivable</Text>
                          </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', }}>
                              <Text style={{ marginBottom: 15, fontSize: 16, }}>{singleReceipt.received_amount} PKR</Text>
                           </View>
                        </View>
                        )}
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            {(!singleReceipt) && (
                              <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => { this.setState({ isDialogVisible: true, isSchedule: true, user_id: b.user.id, extras:[] }); }}
                              >
                                <Text style={{justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>Generate Receipt</Text>
                              </TouchableOpacity>
                            
                            )}
                            {(singleReceipt) && (
                              <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => this.publishReceipt({receipt_id: singleReceipt.id, user_id: b.user.id})}
                                disabled={submitting}
                              >
                              <Text style={{justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>{submitting ? "Please wait..." : "Publish Receipt"}</Text>
                            </TouchableOpacity>
                            )}
                              <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => { this.setState({ isDialogComplainVisible: true, user_id: b.user.id}); }}
                              >
                                <Text style={{justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>Add Complain</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => NavigationService.navigate('ReceiptsScreen',{"nookCode":nook.nookCode,"number":b.user.number})}
                              >
                                <Text style={{justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>Receipt</Text>
                              </TouchableOpacity>
                            </View>
                          
                        </View>
                      </View>
                      <View style={{ flex: 1, alignContent: "center" }}>
                        <View style={{ flex: 1, marginTop: 20, width: "100%" }}>
                          <Button disabled={submitting} onPress={() => this.publishReceipt()} >
                            {submitting ? "Please wait..." : "PUBLISH ALL RECEIPTS"}
                          </Button>
                        </View>
                      </View>
                    </>
                    );
                  }
                })
          }
        </View>
    );
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
                <Text style={{ margin: 15, fontSize: 16, }}>{(nook.rent && nook.rent !== '0') ? nook.rent : (nook.rooms.length != 0 )? Math.min(...nook.rooms.map(r => r.price_per_bed)):'' } PKR / Month</Text>
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
                  <Text style={{ color: tab1Color }}>Virtual Visit</Text>
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
              (nook.space_type === 'Independent' && nook.inner_details) &&
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
            {nook.status ==="Approved" && 
            <View style={styles.ScreenButtonContainer}>
                <View style={styles.ScreenButtonChild}>
                    <ScrollView contentContainerStyle={{
                        alignSelf: 'center', flexDirection: 'column',
                        alignItems: 'center', padding: 20
                    }}>
                        <View style={{
                            flexDirection: 'row', alignSelf: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                style={styles.bigButton}
                                onPress={() => NavigationService.navigate('ShiftsScreen',nook.nookCode)}
                            >
                                <Image style={{
                                    width: 25,
                                    height: 25,
                                    alignSelf: 'center',
                                    alignItems: 'center', tintColor: 'white'
                                }}
                                    resizeMode="contain"
                                    source={require('./../../../../assets/shift.png')}
                                />
                                <Text style={{
                                    color: 'white'
                                }}>Shifts </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bigButton}
                                onPress={() => NavigationService.navigate('ReceiptsScreen',{"nookCode":nook.nookCode,"number":""})}
                            >
                                <Image style={{
                                    width: 25,
                                    height: 25,
                                    alignSelf: 'center',
                                    alignItems: 'center', tintColor: 'white'
                                }}
                                    resizeMode="contain"
                                    source={require('../../../../assets/receipts.png')}
                                />
                                <Text style={{
                                    color: 'white'
                                }}>Receipts </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row', alignSelf: 'center',
                            alignItems: 'center', marginTop:10
                        }}>
                        <TouchableOpacity
                            // style={styles.shiftButton}
                            style={styles.bigButton}
                            onPress={() => NavigationService.navigate('NoticesScreen',nook.nookCode)}
                        >
                            <Image style={{
                                width: 25,
                                height: 25,
                                alignSelf: 'center',
                                alignItems: 'center', tintColor: 'white'
                            }}
                                resizeMode="contain"
                                source={require('./../../../../assets/notices.png')}
                            />
                            <Text style={{
                                color: 'white'
                            }}>Notices </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                                style={styles.bigButton}
                                onPress={() => NavigationService.navigate('RoomShiftsScreen',nook.nookCode)}
                            >
                                <Image style={{
                                    width: 25,
                                    height: 25,
                                    alignSelf: 'center',
                                    alignItems: 'center', tintColor: 'white'
                                }}
                                    resizeMode="contain"
                                    source={require('./../../../../assets/shift.png')}
                                />
                                <Text style={{
                                    color: 'white'
                                }}>Room Shifts</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            </View>
            }

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
                  <Text style={{ color: tab3Color }}>Tenants</Text>
                </TouchableOpacity>
              </View>
            </View>

            {this.state.tabIndexUser === 0 ?
              <View style={[styles.container, { width: "100%", marginTop: 10, padding: 0, }]}>
                {
                  nook.rooms.map((r, rI) =>
                    <View key={rI} style={[styles.child, { marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: Colors.white, }]}>
                      <TouchableOpacity onPress={() => {
                        this.setState({ users: r.users, roomUserDialogVisible:true })
                        }} >      
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>Room Number</Text>
                            <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: 'bold' }}>Price Per Bed</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', }}>
                            <Text style={{ marginBottom: 15, fontSize: 16, }}>{r.room_number}</Text>
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
                      </TouchableOpacity>
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
                        <TextInput 
                          style={{margin:15}} 
                          onChangeText={user_name => this.SearchFilterFunction(user_name)}
                          value={this.state.user_name}
                          underlineColorAndroid="transparent"
                          placeholder="Search Users..."/> 
                      </Item>
                    </View>
                  </View>

                  <View>
                   {this.bookings()}
                    
                  </View>
                </View>  
            }
          {this.renderReceiptGeneraterPopup()}
          {this.renderComplainsPopup()}
          {this.renderRoomUserPopup()}
          </View>
          
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
    generateReceipt: actions.generateReceipt,
    publishReceipt: actions.publishReceipt,
    addComplain:complainaActions.addComplain,
  },
  
)
(NookDetailScreen)
