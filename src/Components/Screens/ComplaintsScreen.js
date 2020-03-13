import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon, Item, Picker, Spinner } from "native-base";
import Colors from '../../helper/Colors';
import Header from '../SeperateComponents/Header';
import TitleText from '../SeperateComponents/TitleText';
import Button from '../SeperateComponents/Button';
import * as actions from '../../Store/Actions/ComplainsActions';
import PopupDialog from "react-native-popup-dialog";
import InputField from "../SeperateComponents/InputField";
import DatePicker from "react-native-datepicker";

class ComplaintsScreen extends React.Component {

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
      loading: true,
      modalVisible: false,
      filter: {
        status: '',
      },
      description:'',
      type:'',
      types:{
        'internet':'Internet',
        'cleaning':'Cleaning',
        'entertainment':'Entertainment',
        'security':'Security',
        'food':'Food',
        'maintenance':'Maintenance',
        'discipline' : 'Discipline',
        'staff_related' : 'Staff Related',
        'privacy' : 'Privacy',
        'other' : 'Other'
      }
    };
  }

  componentDidMount() {
    this.applyFilter();
  }


  applyFilter = () => {
    const { user: { access_token }, getComplains } = this.props;
    const { filter } = this.state;
    this.setState({ loading: true,modalVisible: false });
    getComplains({
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
    const { modalVisible, statses,filter } = this.state;

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


        <Item picker style={styles.pickerStyle}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%" }}
            placeholder="Room Catagories"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={filter.status}
            onValueChange={status => this.setState({filter:{...filter,status}})}>
            <Picker.Item label="All Complains" value="" />
            {Object.keys(statses)
            .filter(k => k)
            .map(k => <Picker.Item key={k} label={statses[k]} value={k} />)}
          </Picker>
        </Item>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button onPress={this.applyFilter}>Apply Filter</Button>
        </View>

      </View>
    );
  }

  renderComplains = () => {
    const { complains } = this.props;
    const { statses, loading } = this.state;

    if (loading) {
      return <Spinner color='black' />;
    }

    return (
      <ScrollView contentContainerStyle={{paddingVertical:30}}>
        {complains.map(c => (
            <View key={c.id} style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View>
                  <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ID: {c.id}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{statses[c.status]}</Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text>{c.description}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    );
  }
  renderComplainsPopup = () => {
    const { isSchedule, isDialogVisible,date } = this.state;

    if (isSchedule) {
      return (
          <PopupDialog
              width={0.9} height={0.40}
              visible={isDialogVisible}
              onTouchOutside={this.togglePopup}>
            <View style={{ flex: 1, padding: 25, }}>
              <TouchableOpacity onPress={()=>this.setState({
                isDialogVisible: false
              })}>
                <Image resizeMode="contain" source={require('./../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              <InputField
                  value={this.state.details}
                  textContentType="text"
                  onChangeText={description => this.setState({ description })}
              >Description</InputField>
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


              <Button onPress={() => {
                this.sendComplains()
              }}>Add Complain</Button>
            </View>
          </PopupDialog>
      );
    }

  }
  render() {


    const { filter: { status }, statses } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header />
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >{statses[status]} Complains</TitleText>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => { this.setState({ isDialogVisible: true, isSchedule: true }); }}
            >
              <Text style={{
                color:'white',fontWeight:'bold'
              }}>Add </Text>
              <Image style={{
                width: 30,
                height: 30,
                alignSelf: 'center',
                alignItems: 'center'
              }}
                     resizeMode="contain"
                     source={require('./../../../assets/add.png')}
              />
            </TouchableOpacity>
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
          {this.renderComplains()}
        </View>
        {this.renderComplainsPopup()}
        {this.renderFilterView()}
      </View >
    );
  }

  sendComplains() {
    this.setState({ isDialogVisible: false });
    const { filter } = this.state;
    const { user: { access_token }, addComplain } = this.props;
    this.setState({ loading: true, modalVisible: false });
    const data = { "description": this.state.description, "type": this.state.type };
    console.log('data',data);
    addComplain({
      data: data,
      onError: (error) => {
        alert(error);
        this.setState({ loading: false });
      },
      onSuccess: () => {
        this.setState({ loading: false });
        alert('Complain has been sent successfully');
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
    paddingStart:5,
    paddingEnd:5,
    paddingTop:5,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#E59413',
    padding: 10,
    display: 'flex',
    flexDirection:'row',
    borderRadius: 5,
    marginStart: 5,
    marginEnd: 5,height: 40
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
    complains: state.ComplainsReducer.complains,
    user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps,
  {
    getComplains: actions.getComplains,
    addComplain: actions.addComplain
  },
)(ComplaintsScreen);
