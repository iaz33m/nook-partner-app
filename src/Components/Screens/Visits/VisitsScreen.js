import React from 'react';
import { connect } from "react-redux";
import {StyleSheet, View, ScrollView, Image, Linking, Alert, Platform, TouchableOpacity} from 'react-native';
import {Icon, Item, Picker, Spinner, Text} from "native-base";
import Colors from '../../../helper/Colors';
import Header from '../../SeperateComponents/Header';
import TitleText from '../../SeperateComponents/TitleText';
import Button from '../../SeperateComponents/Button';
import * as NavigationService from '../../../NavigationService';
import * as actions from "../../../Store/Actions/VisitsActions";

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
      modalVisible: false,
      loading: true,
      filter: {
        status: '',
      },


    };
  }
  componentDidMount() {
    const { user } = this.props;
    if (!user) {
      NavigationService.navigateAndResetStack('LoginScreen');
    }
    this.applyFilter();
  }

  applyFilter = () => {
    const {user: {access_token}, getVisits} = this.props;
    const {filter} = this.state;
    this.setState({loading: true,modalVisible: false});
    getVisits({
      onError: (error) => {
        alert(error);
        this.setState({loading: false});
      },
      onSuccess: () => {
        this.setState({loading: false});
      },
      filter,
      token: access_token
    });
  }

  openGps = (lat,lng,address) => {
    // const label = 'Nook Directions';
    // const lat = '31.6031794000000019195795175619423389434814453125';
    // const lng = '74.2418090999999975565515342168509960174560546875';
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${address}@${latLng}`,
      android: `${scheme}${latLng}(${address})`
    });

    this.openExternalApp(url)
  }

  openExternalApp = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(
            'ERROR',
            'Unable to open: ' + url,
            [
              {text: 'OK'},
            ]
        );
      }
    });
  }

  renderList = ()=>{
    const {visits} = this.props;
    const { loading} = this.state;
    if (loading) {
      return <Spinner color='black'/>;
    }
    return (
        <View>
          {visits.length>0&&
              <ScrollView style={{paddingBottom: "60%"}}>
            {visits.map((visit,visitI)=><View key={visitI} style={[styles.container]}>
              <View style={styles.child}>
                <Image resizeMode="cover" style={{ position: 'absolute', height: 80, width: 90 }}
                       source={require('./../../../../assets/feature.png')}
                />
                <Text style={{ marginTop: 15, marginStart: 5, alignSelf: 'flex-start', color: Colors.white, fontSize: 14, transform: [{ rotate: '-40deg' }] }} >{visit.status}</Text>
                <View style={{ flexDirection: 'row', margin: 15, marginTop: 35 }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >Nook Code</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Date</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Time</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Partner Name</TitleText>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >{visit.nook.nookCode}</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{visit.date}</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{visit.time}</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{visit.partner.name}</TitleText>
                  </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                  <Button  onPress={()=>this.openGps(visit.nook.location.lat,visit.nook.location.lng,visit.nook.address)}>Get Direction</Button>
                </View>
              </View>
            </View>)}
          </ScrollView>
              }
        </View>
    );
  };
  renderFilterView = () => {
    const {modalVisible, statses, filter} = this.state;

    if (!modalVisible) {
      return;
    }

    return (
        <View style={{
          position: 'absolute',
          width: "70%",
          height: "82%",
          marginTop: "20%",
          alignSelf: 'flex-end',
          backgroundColor: "white"
        }}>
          <TouchableOpacity onPress={() => {
            this.setState({modalVisible: false})
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
          <TitleText
              style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 5}}>Filter</TitleText>


          <Item picker style={styles.pickerStyle}>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down"/>}
                style={{width: "100%"}}
                placeholder="Room Catagories"
                placeholderStyle={{color: "#bfc6ea"}}
                placeholderIconColor="#007aff"
                selectedValue={filter.status}
                onValueChange={status => this.setState({filter: {...filter, status}})}>
              <Picker.Item label="All Visits" value=""/>
              {Object.keys(statses)
                  .filter(k => k)
                  .map(k => <Picker.Item key={k} label={statses[k]} value={k}/>)}
            </Picker>
          </Item>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button onPress={this.applyFilter}>Apply Filter</Button>
          </View>

        </View>
    );
  }
  render() {
    const {filter: {status}, statses} = this.state;

    return (
        <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
          <Header backButton={false} optionButton={true}/>
          <TitleText style={{marginTop: 25, fontWeight: 'bold', fontSize: 20,}}>Visists</TitleText>
          <View style={{padding: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
              <TitleText style={{alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16,}}>
                {statses[status]} Visits
              </TitleText>
              <TouchableOpacity onPress={() => {
                this.setState({modalVisible: true})
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
            {this.renderList()}
          </View>
          {this.renderFilterView()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 160,
    width: 160,
    marginBottom: 20,
    alignSelf: 'center'
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
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 5
  },
  child: {
    borderRadius: 15,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 4
  }
})


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
    },
)(VisitsScreen);
