import React from 'react';
import { connect } from "react-redux";
import {StyleSheet, View, ScrollView, Image, Linking, Alert, Platform, TouchableOpacity} from 'react-native';
import {Icon, Item, Picker, Spinner, Text} from "native-base";
import Colors from '../../../helper/Colors';
import Header from '../../SeperateComponents/Header';
import TitleText from '../../SeperateComponents/TitleText';
import Button from '../../SeperateComponents/Button';
import * as NavigationService from '../../../NavigationService';
import * as actions from "../../../Store/Actions/ReceiptsActions";

class ReceiptsScreen extends React.Component {

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
    const {user: {access_token}, getReceipts} = this.props;
    const {filter} = this.state;
    this.setState({loading: true,modalVisible: false});
    getReceipts({
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


  renderList = ()=>{
    const {receipts} = this.props;
    const { loading} = this.state;
    if (loading) {
      return <Spinner color='black'/>;
    }
    return (
        <View>
          {receipts.length>0&&
              <ScrollView style={{paddingBottom: "60%"}}>
            {receipts.map((receipt,index)=><View key={index} style={[styles.container]}>
              <View style={styles.child}>
                <Image resizeMode="cover" style={{ position: 'absolute', height: 80, width: 90 }}
                       source={require('./../../../../assets/feature.png')}
                />
                <Text style={{ marginTop: 15, marginStart: 5, alignSelf: 'flex-start', color: Colors.white, fontSize: 14, transform: [{ rotate: '-40deg' }] }} >{receipt.status}</Text>
                <View style={{ flexDirection: 'row', margin: 15, marginTop: 35 }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} ></TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Late Date Charges</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Due Date</TitleText>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >{receipt.total_amount} PKR</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{receipt.late_day_fine} PKR/Day</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{receipt.due_date}</TitleText>
                  </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                  <Button  onPress={() => alert('todo')}>Get Direction</Button>
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
              <Picker.Item label="All Receipts" value=""/>
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
          <Header backButton={true}/>
          <TitleText style={{marginTop: 25, fontWeight: 'bold', fontSize: 20,}}>Receipts</TitleText>
          <View style={{padding: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
              <TitleText style={{alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16,}}>
                {statses[status]} Receipts
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
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
  },
  child: {
    borderRadius: 15,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 3
  }
})


const mapStateToProps = state => {
  return {
    receipts: state.ReceiptReducer.receipts,
    user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps,
    {
        getReceipts: actions.getReceipts,
    },
)(ReceiptsScreen);
