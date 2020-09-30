import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { Icon, Item, Picker, Spinner, Text, Textarea } from "native-base";
import PopupDialog from "react-native-popup-dialog";
import Colors from '../../../helper/Colors';
import Header from '../../SeperateComponents/Header';
import TitleText from '../../SeperateComponents/TitleText';
import InputField from './../../SeperateComponents/InputField';
import Button from '../../SeperateComponents/Button';
import * as NavigationService from '../../../NavigationService';
import * as actions from "../../../Store/Actions/ReceiptsActions";

class ReceiptsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      statses: {
        "": "All",
        "draft": "Draft",
        "paid": "Paid",
        "unpaid": "Unpaid",
        "in_progress": "In Progress"
      },
      selectedReciept: null,
      addPaymentModal: false,
      details: '',
      amount: "",
      modalVisible: false,
      loading: true,
      filter: {
        status: 'in_progress',
        id: '',
        nookCode: this.props.navigation.state.params.nookCode,
        space_type: "",
        number: this.props.navigation.state.params.number,
        email: "",
        month: "",
      },
      receipts: []
    };
  }
  componentDidMount() {
    const { user } = this.props;
    if (!user) {
      NavigationService.navigateAndResetStack('LoginScreen');
    }
    this.applyFilter();
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.receipts !== prevState.receipts) {
      return { receipts: nextProps.receipts };
    }
    return null;
  }

  onRefresh() {
    //Clear old data of the list
    this.setState({ receipts: [] });
    //Call the Service to get the latest data
    this.applyFilter();
  }
  applyFilter = () => {
    const { user: { access_token }, getReceipts } = this.props;
    const { filter } = this.state;
    this.setState({ loading: true, modalVisible: false });
    getReceipts({
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
  toggleSubmitting = () => {
    const { submitting } = this.state;
    this.setState({
      submitting: !submitting,
    });
  };

  submitPayment = () => {
    this.toggleSubmitting();
    const { user: { access_token }, payReceipt } = this.props;
    const { selectedReciept, amount } = this.state;
    payReceipt({
      id: selectedReciept.id,
      data: {
        amount
      },
      onError: message => {
        alert(message);
        this.toggleSubmitting();
      },
      onSuccess: message => {
        alert(message);
        this.toggleSubmitting();
      },
      token: access_token
    });
  }

  togglePaymentModal = () => {
    const { addPaymentModal } = this.state;
    this.setState({
      addPaymentModal: !addPaymentModal
    });
  }

  renderAddPaymentModal = () => {

    const { addPaymentModal, amount, submitting } = this.state;
    return (
      <PopupDialog
        width={0.9} height={0.4}
        visible={addPaymentModal}
        onTouchOutside={this.togglePaymentModal}>
        <View style={{ flex: 1, padding: 25, }}>
          <TouchableOpacity onPress={this.togglePaymentModal}>
            <Image resizeMode="contain" source={require('./../../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
          </TouchableOpacity>

          <InputField
            value={amount}
            onChangeText={amount => this.setState({ amount })}
          >Paymet Amount</InputField>

          <Button disabled={submitting} onPress={this.submitPayment} >{submitting ? 'Please wait...' : 'Submit'}</Button>
        </View>
      </PopupDialog>
    );
  }


  renderList = () => {

    if (this.state.loading) {
      return <Spinner color='black' />;
    }
    return (
      <FlatList
        data={this.state.receipts}
        enableEmptySections={true}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: "60%" }}
        renderItem={({ item, index }) => (
          <View key={index} style={[styles.container]}>
            <TouchableOpacity onPress={() => {
              NavigationService.navigate("ReceiptDetailsScreen", item)
            }}>
              <View style={styles.child}>
                <Image resizeMode="cover" style={{ position: 'absolute', height: 80, width: 90 }}
                  source={require('./../../../../assets/feature.png')}
                />
                <Text style={{ marginTop: 15, marginStart: 5, alignSelf: 'flex-start', color: Colors.white, fontSize: 14, transform: [{ rotate: '-40deg' }] }} >{item.status}</Text>
                <View style={{ flexDirection: 'row', margin: 15, marginTop: 35 }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >Nook Code</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >ID</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >User</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Total Amount</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Late Date Charges</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Due Date</TitleText>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >{item.nook.nookCode}</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.id}</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.user.name}</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.total_amount} PKR</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.late_day_fine} PKR/Day</TitleText>
                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.due_date}</TitleText>
                  </View>
                </View>

                {
                  (!item.transaction) && 
                  <View style={{ justifyContent: 'center' }}>
                  <Button onPress={() => {
                    NavigationService.navigate("ReceiptDetailsScreen", item)
                  }}>View Details</Button>
                </View>
                }
                {
                  (item.status === 'In Progress') && 
                  <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                    <Button onPress={() => {this.setState({selectedReciept: item}); this.togglePaymentModal();}}>Receive Payment</Button>
                  </View>
                }

              </View>
            </TouchableOpacity>
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

  renderFilterView = () => {
    const { modalVisible, statses, filter } = this.state;

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
        <TitleText
          style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Filter</TitleText>
        <ScrollView style={styles.scrollView}>
          <InputField
            iconName="md-phone-portrait"
            value={filter.id}
            onChangeText={id => this.setState({ filter: { ...filter, id } })}
          >ID</InputField>
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
              <Picker.Item label="All Receipts" value="" />
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
          <Item picker style={styles.pickerStyle}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: "100%" }}
              placeholder="Months"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={filter.month}
              onValueChange={month => this.setState({ filter: { ...filter, month } })}>
              <Picker.Item label="All Month" value="" />
              <Picker.Item label="January" value="1" />
              <Picker.Item label="February" value="2" />
              <Picker.Item label="March" value="3" />
              <Picker.Item label="April" value="4" />
              <Picker.Item label="May" value="5" />
              <Picker.Item label="June" value="6" />
              <Picker.Item label="July" value="7" />
              <Picker.Item label="August" value="8" />
              <Picker.Item label="September" value="9" />
              <Picker.Item label="October" value="10" />
              <Picker.Item label="November" value="11" />
              <Picker.Item label="December" value="12" />
            </Picker>
          </Item>
          <View style={{ justifyContent: 'center' }}>
            <Button onPress={this.applyFilter}>Apply Filter</Button>
          </View>
          </ScrollView>

      </View>
    );
  }
  render() {
    const { filter: { status }, statses } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header backButton={true} />
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }}>Receipts</TitleText>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16, }}>
              {statses[status]} Receipts
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
          {this.renderList()}
          {this.renderAddPaymentModal()}
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
    paddingStart: 5,
    paddingEnd: 5,
    paddingTop: 5,
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
    payReceipt: actions.payReceipt,
  },
)(ReceiptsScreen);
