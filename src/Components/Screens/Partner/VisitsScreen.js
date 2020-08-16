import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { Icon, Item, Picker, Spinner, Textarea } from "native-base";
import Colors from '../../../helper/Colors';
import Header from '../../SeperateComponents/Header';
import TitleText from '../../SeperateComponents/TitleText';
import InputField from '../../SeperateComponents/InputField';
import Button from '../../SeperateComponents/Button';
import * as NavigationService from '../../../NavigationService';
import * as actions from '../../../Store/Actions/VisitsActions';
import PopupDialog from "react-native-popup-dialog";

class VisitsScreen extends React.Component {

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
      loading: true,
      modalVisible: false,
      filter: {
        status: '',
        id: "",
        nook_id: "",
      },
      visitId:'',
      visitStatus:'',
      visits: [],
      id: "",
      nook_id: ""
    };
  }

  componentDidMount() {
    this.applyFilter();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visits !== prevState.visits) {
      return { visits: nextProps.visits };
    }
    return null;
  }

  onRefresh() {
    //Clear old data of the list
    this.setState({ visits: [] });
    //Call the Service to get the latest data
    this.applyFilter();
  }


  applyFilter = () => {
    const { user: { access_token }, getVisits } = this.props;
    const { filter } = this.state;
    this.setState({ loading: true, modalVisible: false });
    getVisits({
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


  renderFilterView = () => {
    const { modalVisible, statses, filter, types, } = this.state;

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
            source={require('./../../../../assets/close.png')}
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
          value={filter.nook_id}
          onChangeText={nook_id => this.setState({ filter: { ...filter, nook_id } })}
        >Nook ID</InputField>

        <Item picker style={styles.pickerStyle}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%" }}
            placeholder="Visit Catagories"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={filter.status}
            onValueChange={status => this.setState({ filter: { ...filter, status } })}>
            <Picker.Item label="All Visits" value="" />
            {Object.keys(statses)
              .filter(k => k)
              .map(k => <Picker.Item key={k} label={statses[k]} value={k} />)}
          </Picker>
        </Item>
        <View style={{ justifyContent: 'center' }}>
          <Button onPress={this.applyFilter}>Apply Filter</Button>
        </View>
        </ScrollView>

      </View>
    );
  }

  rendervisits = () => {

    if (this.state.loading) {
      return <Spinner color='black' />;
    }

    return (
      <FlatList
        data={this.state.visits}
        enableEmptySections={true}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: "50%" }}
        renderItem={({ item, index }) => (
          <View key={index} style={[styles.container]}>
            {item.status != "Canceled" && 
            <View style={styles.child}>
              <Image resizeMode="cover" style={{ position: 'absolute', height: 80, width: 90 }}
                source={require('./../../../../assets/feature.png')}
              />
              <Text style={{ marginTop: 15, marginStart: 5, alignSelf: 'flex-start', color: Colors.white, fontSize: 14, transform: [{ rotate: '-40deg' }] }} >{item.status}</Text>
              <View style={{ flexDirection: 'row', margin: 15, marginTop: 35 }}>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >Nook Code</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >ID</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Date</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Time</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >User Name</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >User Number</TitleText>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => NavigationService.navigate("NookDetailScreen", item.nook)}>
                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >{item.nook.nookCode}</TitleText>
                  </TouchableOpacity>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.id}</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.date}</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.time}</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.user.name}</TitleText>
                  <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.user.number}</TitleText>      
                </View>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <View style={{ padding:10 }}>
                  <Text >{item.description}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => { this.setState({ isDialogVisible: true, isSchedule: true, visitId: item.id, visitStatus: item.status_key }); }}
                    >
                      <Text style={{justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>Update Visits </Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>
            </View>
          }
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
  };
  rendervisitsPopup = () => {
    const { isSchedule, isDialogVisible, date, description, submitting, visitId, visitStatus, action } = this.state;

    if (isSchedule) {
      return (
        <PopupDialog
          width={0.9} height={0.5}
          visible={isDialogVisible}
          onTouchOutside={this.togglePopup}>
          <View style={{ flex: 1, padding: 25, }}>
            <TouchableOpacity onPress={() => this.setState({
              isDialogVisible: false
            })}>
              <Image resizeMode="contain" source={require('./../../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            <Text style={{justifyContent: 'center', fontWeight: 'bold'}}>Update Visit {this.state.visitId}</Text>
            <Item picker style={styles.pickerStyle}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%" }}
                placeholder="Select Status"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.visitStatus}
                onValueChange={visitStatus => this.setState({ visitStatus })}>
                <Picker.Item  label="Select Status" value=""/>
                {Object.keys(action)
                  .filter(k => k)
                  .map(k => <Picker.Item key={k} label={action[k]} value={k} />)}
              </Picker>
            </Item>

            
            <Button disabled={submitting} onPress={() => { this.sendvisits() }} >{submitting ? 'Please wait...' : 'Update Visit'}</Button>
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
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >{statses[status]} Visits</TitleText>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16, }}>
               List of Visits
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
                source={require('./../../../../assets/filter.png')}
              />
            </TouchableOpacity>
          </View>
          {this.rendervisits()}
        </View>
        {this.rendervisitsPopup()}
        {this.renderFilterView()}
      </View >
    );
  }
  toggleSubmitting = () => {
    const { submitting } = this.state;
    this.setState({
      submitting: !submitting,
    });
  };
  moveToHome = () => {
    NavigationService.navigateAndResetStack("TabScreens");
  };
  sendvisits() {
    this.toggleSubmitting();
    const { filter ,visitId , visitStatus} = this.state;
    const { user: { access_token }, update } = this.props;
    this.setState({ loading: true, modalVisible: false });
    const data = { "id":visitId,"status": visitStatus };
    const id = {visitId};
    update({
      data: data,
      id  : id,
      onError: (error) => {
        this.toggleSubmitting();
        alert(error);
        this.setState({ loading: false });
      },
      onSuccess: () => {
        this.toggleSubmitting();
        this.setState({ loading: false ,isDialogVisible: false});
        alert('Visit has been updated successfully');
        this.onRefresh();
      },
      filter,
      token: access_token
    })
  }
}

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
  textAreaContainer: {
    borderColor: Colors.textGray,
    borderWidth: 1,
    padding: 5,
    marginStart: 10,
    marginEnd: 10
  },
  textArea1: {
    height: 70,
    justifyContent: "flex-start"
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
    visits: state.VisitsReducer.visits,
    user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps,
  {
    getVisits: actions.getVisits,
    update: actions.update
  },
)(VisitsScreen);
