import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { Icon, Item, Picker, Spinner } from "native-base";
import Colors from '../../helper/Colors';
import Header from '../SeperateComponents/Header';
import TitleText from '../SeperateComponents/TitleText';
import Button from '../SeperateComponents/Button';
import InputField from '../SeperateComponents/InputField';
import * as NavigationService from '../../NavigationService';
import * as actions from '../../Store/Actions/RoomShiftsActions';
import PopupDialog from "react-native-popup-dialog";

class RoomShiftsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      statses: {
        "": "All",
        "pending": "Pending",
        "in_progress": "In Progress",
        "approved": "Approved",
        "rejected": "Rejected",
      },
      action: {
        "pending": "Pending",
        "in_progress": "In Progress",
        "approved": "Approved",
        "rejected": "Rejected",
      },
      shiftId:'',
      shiftStatus:'',
      refunedSecurity:'',
      loading: true,
      isDialogVisible: false,
      isSchedule: false,
      modalVisible: false,
      filter: {
        status: '',
        price_per_bed:'',
        id: "",
        nookCode: this.props.navigation.state.params,
        space_type: "",
        room_type:"",
        number: "",
        email: "",
      },
      room_shifts: []
    };
  }

  componentDidMount() {
    this.applyFilter();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.room_shifts !== prevState.room_shifts) {
      return { room_shifts: nextProps.room_shifts };
    }
    return null;
  }

  onRefresh() {
    //Clear old data of the list
    this.setState({ room_shifts: [] });
    //Call the Service to get the latest data
    this.applyFilter();
  }
  applyFilter = () => {
    const { user: { access_token }, getRoomShifts } = this.props;
    const { filter } = this.state;
    this.setState({ loading: true, modalVisible: false });
    getRoomShifts({
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


  cancelRoomShift = (shift) => {
    const { user: { access_token }, cancelRoomShift } = this.props;
    cancelRoomShift({
      onError: alert,
      onSuccess: alert,
      data: {
        id: shift.id,
        status: "canceled"
      },
      token: access_token
    });
  }

  renderFilterView = () => {
    const { modalVisible, statses, filter } = this.state;

    if (!modalVisible) {
      return;
    }

    return (
      <View style={{ position: 'absolute', width: "70%", height: "82%", marginTop: "20%", alignSelf: 'flex-end', backgroundColor: "white" }}>
        <TouchableOpacity onPress={() => {
          this.setState({ modalVisible: false })
        }}>
          <Image style={{
            width: 20,
            margin: 10,
            marginTop: 15,
            height: 20,
            alignSelf: 'flex-end'
          }}
            resizeMode="contain"
            source={require('./../../../assets/close.png')}
          />
        </TouchableOpacity>
        <TitleText style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }} >Filter</TitleText>
        <ScrollView style={styles.scrollView}>
        <InputField
          iconName="md-phone-portrait"
          value={filter.id}
          onChangeText={id => this.setState({ filter: { ...filter, id } })}
        >ID</InputField>
        <InputField
          iconName="md-phone-portrait"
          value={filter.price_per_bed}
          onChangeText={price_per_bed => this.setState({ filter: { ...filter, price_per_bed } })}
        >Price Per Bed</InputField>
        <InputField
          iconName="md-phone-portrait"
          value={filter.nookCode}
          onChangeText={nookCode => this.setState({ filter: { ...filter, nookCode } })}
        >Nook Code</InputField>
        <InputField
          iconName="md-phone-portrait"
          value={filter.number}
          onChangeText={number => this.setState({ filter: { ...filter, number } })}
        >User Number</InputField>
        <InputField
          iconName="md-phone-portrait"
          value={filter.emailemail}
          onChangeText={email => this.setState({ filter: { ...filter, email } })}
        >Email</InputField>
        <Item picker style={styles.pickerStyle}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%" }}
            placeholder="Room Catagories"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={filter.status}
            onValueChange={status => this.setState({ filter: { ...filter, status } })}>
            <Picker.Item label="All Shifts" value="" />
            {Object.keys(statses)
              .filter(k => k)
              .map(k => <Picker.Item key={k} label={statses[k]} value={k} />)}
          </Picker>
        </Item>
        <Item picker style={styles.pickerStyle}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%" }}
            placeholder="Room Type"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={filter.room_type}
            onValueChange={room_type => this.setState({ filter: { ...filter, room_type } })}>
            <Picker.Item label="All Room Type" value="" />
            <Picker.Item label="One Person Sharing" value="1" />
            <Picker.Item label="Two Person Sharing" value="2" />
            <Picker.Item label="Three Person Sharing" value="3" />
            <Picker.Item label="Four Person Sharing" value="4" />
            <Picker.Item label="five Person Sharing" value="5" />
            <Picker.Item label="Six Person Sharing" value="6" />
          </Picker>
        </Item>
        <Item picker style={styles.pickerStyle}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%" }}
            placeholder="Select Space Type"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={filter.space_type}
            onValueChange={space_type => this.setState({ filter: { ...filter, space_type } })}>
            <Picker.Item label="All Space Type" value="" />
            <Picker.Item label="Shared" value="shared" />
            <Picker.Item label="Independent" value="independent" />
          </Picker>
        </Item>
        <View style={{ justifyContent: 'center' }}>
          <Button onPress={this.applyFilter}>Apply Filter</Button>
        </View>
        </ScrollView>
      </View>
    );
  }

  renderShifts = () => {
    if (this.state.loading) {
      return <Spinner color='black' />;
    }

    return (
      <FlatList
        data={this.state.room_shifts}
        enableEmptySections={true}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: "45%" }}
        renderItem={({ item, index }) => (
          <View key={index} style={[styles.container]}>
            <View style={styles.child}>
              <Image resizeMode="cover" style={{ position: 'absolute', height: 80, width: 90 }}
                source={require('./../../../assets/feature.png')}
              />
              <Text style={{ marginTop: 15, marginStart: 5, alignSelf: 'flex-start', color: Colors.white, fontSize: 14, transform: [{ rotate: '-40deg' }] }} >{item.status}</Text>
              <View style={{ flexDirection: 'row', margin: 15, marginTop: 35 }}>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >Nook Code</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >ID</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >User</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >Current Room</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >Current Room Type</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >Room Type</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >Room Number</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >Price Per bed</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >Submited At</TitleText>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => NavigationService.navigate("NookDetailScreen", item.nook)}>
                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >{item.nook && item.nook.nookCode}</TitleText>
                  </TouchableOpacity>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >{item.id}</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >{item.user.name}</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >{(item.current_room)? item.current_room.room_number:''}</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >{(item.current_room)?item.current_room.capacity:''} Person(s) Sharing</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >{item.room_type} Person(s) Sharing</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >{(item.room)?item.room.room_number:''}</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >{item.price_per_bed} PKR</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15, }} >{item.created_at}</TitleText>
                </View>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <View style={{ padding:10 }}>
                  <Text>{item.details}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20,marginBottom:10 }}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => { this.setState({ isDialogVisible: true, isSchedule: true, shiftId: item.id, shiftStatus: item.status_key }); }}
                    >
                      <Text style={{justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>Update Shift </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={this.state.loading}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />
    );
  }
  renderShiftPopup = () => {
    const { isSchedule, isDialogVisible, submitting, refunedSecurity } = this.state;

    if (isSchedule) {
      return (
        <PopupDialog
          width={0.9} height={0.50}
          visible={isDialogVisible}
          onTouchOutside={this.togglePopup}>
          <View style={{ flex: 1, padding: 25, }}>
            <TouchableOpacity onPress={() => this.setState({
              isDialogVisible: false,
              shiftStatus:'',
              refunedSecurity:'',
            })}>
              <Image resizeMode="contain" source={require('./../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
            </TouchableOpacity>

            <Text style={{justifyContent: 'center', fontWeight: 'bold'}}>Update Shift {this.state.shiftId}</Text>
            <Item picker style={styles.pickerStyle}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%" }}
                placeholder="Select Status"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.shiftStatus}
                onValueChange={shiftStatus => this.setState({ shiftStatus })}>
                <Picker.Item  label="Select Status" value=""/>
                {Object.keys(this.state.action)
                  .filter(k => k)
                  .map(k => <Picker.Item key={k} label={this.state.action[k]} value={k} />)}
              </Picker>
            </Item>
            <Button disabled={submitting} onPress={() => { this.sendShift() }} >{submitting ? 'Please wait...' : 'Update Shift'}</Button>
          </View>
        </PopupDialog>
      );
    }

  }
  render() {


    const { filter: { status }, statses } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header backButton={true} />
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >Room Shifts</TitleText>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16, }} >
              {statses[status]} Shifts
            </TitleText>
            <TouchableOpacity onPress={() => {
              this.setState({ modalVisible: true })
            }}>
              <Image style={{
                width: 30,
                height: 30,
                marginBottom: 5,
                alignSelf: 'flex-end'
              }}
                resizeMode="contain"
                source={require('./../../../assets/filter.png')}
              />
            </TouchableOpacity>
          </View>
          {this.renderShifts()}
        </View>
        {this.renderFilterView()}
        {this.renderShiftPopup()}
      </View >
    );
  }
  
  toggleSubmitting = () => {
    const { submitting } = this.state;
    this.setState({
      submitting: !submitting,
    });
  }

  sendShift() {
    this.toggleSubmitting();
    const { filter, shiftId, shiftStatus, refunedSecurity  } = this.state;
    const { user: { access_token }, updateRoomShift } = this.props;
    this.setState({ loading: true, modalVisible: false });
    updateRoomShift({
      data: { "id": shiftId, "status": shiftStatus, "refunedSecurity": refunedSecurity },
      onError: (error) => {
        this.toggleSubmitting();
        alert(error);
        this.setState({ loading: false });
      },
      onSuccess: () => {
        this.toggleSubmitting();
        this.setState({ loading: false ,isDialogVisible: false, shiftStatus:'', refunedSecurity:''});
        alert('Shifts has been updated successfully');
        this.onRefresh();
      },
      filter,
      token: access_token
    })
  }
};
 
const styles = StyleSheet.create({
  imageContainer: {
    height: 160,
    width: 160,
    marginBottom: 20,
    alignSelf: 'center'
  },
  pickerStyle: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10, marginTop: 10,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#E59413',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    marginStart: 5,
    marginEnd: 5, height: 40
  },
  imageButton: {
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
    flex: 1,
    paddingStart: 5,
    paddingEnd: 5,
    paddingTop: 5,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
  },
  child: {
    flex: 1,
    borderRadius: 10,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 3
  }
});


const mapStateToProps = state => {
  return {
    room_shifts: state.RoomShiftsReducer.room_shifts,
    user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps,
  {
    getRoomShifts: actions.getRoomShifts,
    cancelRoomShift: actions.cancelRoomShift,
    updateRoomShift: actions.updateRoomShift,
  },
)(RoomShiftsScreen);
