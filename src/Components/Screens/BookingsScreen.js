import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Platform, ScrollView, Image, TouchableOpacity, RefreshControl, FlatList, Linking, TextInput } from 'react-native';
import { Icon, Item, Picker, Spinner } from "native-base";
import Colors from '../../helper/Colors';
import Header from '../SeperateComponents/Header';
import TitleText from '../SeperateComponents/TitleText';
import Button from '../SeperateComponents/Button';
import * as NavigationService from '../../NavigationService';
import PopupDialog from "react-native-popup-dialog";
import InputField from "../SeperateComponents/InputField";
import * as actions from '../../Store/Actions/BookingsActions';

class BookingsScreen extends React.Component {

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
                "off-board":"Moved",
                "cancelled":"Cancelled",
            },
            status:'',
            oldSecuirty:'',
            security: "",
            paidSecurity:"",
            installments: '1',
            refunedSecurity: '',
            bookingId:'',
            isSchedule: false, 
            isDialogVisible:false, 
            isUpdateSchedule: false, 
            isUpdateDialogVisible:false, 
            submitting:false,
            loading: true,
            modalVisible: false,
            filter: {
                id:'',
                status: '',
                nookCode: "",
                space_type: "",
                number: "",
                email: "",
            },
            bookings: []
        };
    }

    componentDidMount() {
        const { user } = this.props;
        if (!user) {
            return NavigationService.navigateAndResetStack('LoginScreen');
        }
        this.applyFilter();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.bookings !== prevState.bookings) {
            return { bookings: nextProps.bookings };
        }
        return null;
    }

    onRefresh() {
        //Clear old data of the list
        this.setState({ bookings: [] });
        //Call the Service to get the latest data
        this.applyFilter();
    }
    applyFilter = () => {
        const { user: { access_token }, getBookings } = this.props;
        const { filter } = this.state;
        this.setState({ loading: true, modalVisible: false });
        getBookings({
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


    addSecurity() {
        const { user: { access_token }, addSecurity } = this.props;
        const {bookingId, security} = this.state;
        
        if(security == ''){
            return alert('Enter Security Fee');
        }
        this.setState({ submitting: true });
        const data = { "security":security, "id": bookingId};
        const id = {bookingId};
        addSecurity({
            data: data,
            id  : id,
            onError: (error) => {
              alert(error);
              this.setState({ submitting: false });
            },
            onSuccess: () => {
              this.setState({ submitting: false ,isDialogVisible: false});
              alert('Security added successfully');
              this.onRefresh();
            },
            token: access_token
        });
    }
    updateBooking() {
        const { user: { access_token }, updateBooking } = this.props;
        const {bookingId, installments, refunedSecurity, status} = this.state;
        
        if(status == ''){
            return alert('Select Status First');
        }
        if(status == "off-board"){
            if(refunedSecurity == ''){
                return alert('Select Status First');
            }
        }
        this.setState({ submitting: true });
        const data = { "installments":installments, "refunedSecurity":refunedSecurity, "status":status, "id": bookingId};
        const id = {bookingId};
        updateBooking({
            data: data,
            id  : id,
            onError: (error) => {
              alert(error);
              this.setState({ submitting: false });
            },
            onSuccess: () => {
              this.setState({ submitting: false ,isUpdateDialogVisible: false});
              alert('Booking Updated Successfully');
              this.onRefresh();
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
                        source={require('./../../../assets/close.png')}
                    />
                </TouchableOpacity>
                <TitleText
                    style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Filter
                </TitleText>
                <ScrollView style={styles.scrollView}>
                    <InputField
                        iconName="md-phone-portrait"
                        value={filter.id}
                        onChangeText={id => this.setState({ filter: { ...filter, id } })}
                    >
                        ID
                    </InputField>
                    <InputField
                        iconName="md-phone-portrait"
                        value={filter.nookCode}
                        onChangeText={nookCode => this.setState({ filter: { ...filter, nookCode } })}
                    >
                        Nook Code
                    </InputField>
                    <InputField
                        iconName="md-phone-portrait"
                        value={filter.number}
                        onChangeText={number => this.setState({ filter: { ...filter, number } })}
                    >
                        User Number
                    </InputField>
                    <InputField
                        iconName="md-phone-portrait"
                        value={filter.email}
                        onChangeText={email => this.setState({ filter: { ...filter, email } })}
                    >
                        Email
                    </InputField>
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
                            <Picker.Item label="All Bookings" value="" />
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
                            placeholder="Nook Type"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={filter.space_type}
                            onValueChange={space_type => this.setState({ filter: { ...filter, space_type } })}>
                            <Picker.Item label="All Nook Type" value="" />
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

    renderBookings = () => {

        if (this.state.loading) {
            return <Spinner color='black' />;
        }

        return (
            <FlatList
                data={this.state.bookings}
                enableEmptySections={true}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: "45%" }}
                renderItem={({ item, index }) => (
                    <View key={index} style={[styles.container]}>
                        {item.status != "Cancelled" &&
                        <View style={styles.child}>
                            <Image resizeMode="cover" style={{ position: 'absolute', height: 80, width: 90 }}
                                source={require('./../../../assets/feature.png')}
                            />
                            <Text style={{ marginTop: 15, marginStart: 5, alignSelf: 'flex-start', color: Colors.white, fontSize: 14, transform: [{ rotate: '-40deg' }] }} >{item.status}</Text>
                            <View style={{ flexDirection: 'row', margin: 15, marginTop: 35 }}>
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >Nook Code</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >ID</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >User Name</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >User Number</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Room</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Rent</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Room Type</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Security</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Paid Security</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Refuned Security</TitleText>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => NavigationService.navigate("NookDetailScreen", item.nook)}>
                                        <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >{item.nook.nookCode}</TitleText>
                                    </TouchableOpacity>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.id}</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.user.name}</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.user.number}</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{(item.room)?item.room.room_number: ''}</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.rent} PKR</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{(item.room)?`${item.room.capacity} Person(s)` : ''}</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.security} PKR</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.paidSecurity} PKR</TitleText>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{item.refunedSecurity} PKR</TitleText>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                                <Button 
                                    onPress={() => { this.setState({ isDialogVisible: true, isSchedule: true, bookingId: item.id, oldSecuirty: item.security, paidSecurity:item.paidSecurity }); }}
                                >Collect Security</Button>
                                <Button
                                    onPress={() => { this.setState({ isUpdateDialogVisible: true, isUpdateSchedule: true, bookingId: item.id, oldSecuirty: item.security, paidSecurity:item.paidSecurity, status:item.status_key }); }}
                                >Update</Button>
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
    }
    renderCollectSecurityPopup = () => {
        const { isSchedule, isDialogVisible, submitting, oldSecuirty,paidSecurity,bookingId} = this.state;
    
        if (isSchedule) {
          return (
            <PopupDialog
              width={0.9} height={0.7}
              visible={isDialogVisible}
              onTouchOutside={this.togglePopup}>
              <View style={{ flex: 1, padding: 25, }}>
                <TouchableOpacity onPress={() => this.setState({
                  isDialogVisible: false,
                })}>
                  <Image resizeMode="contain" source={require('./../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
                </TouchableOpacity>
                <Text style={{justifyContent: 'center', fontWeight: 'bold', fontSize: 18}}>Collect Security</Text>
                <View style={{ flexDirection: 'row', margin: 15,}}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Booking ID</TitleText>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Total Security</TitleText>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Paid Security</TitleText>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{bookingId}</TitleText>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{oldSecuirty} PKR</TitleText>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{paidSecurity} PKR</TitleText>
                    </View>
                </View>
                <View style={styles.Inputchild}>
                    <TextInput style={{pending: 10 }} keyboardType='numeric' value={this.state.security} onChangeText={(security) => this.setState({ security })}  placeholder ="Enter Security"/> 
                </View>
                <Button disabled={submitting} onPress={() => { this.addSecurity() }} >{submitting ? 'Please wait...' : 'Add Security'}</Button>
              </View>
            </PopupDialog>
          );
        }
    }
    renderUpdateBookingPopup = () => {
        const { isUpdateSchedule, isUpdateDialogVisible, submitting, oldSecuirty,paidSecurity,bookingId, status, action, refunedSecurity, installments, security} = this.state;
        let collectedSecuirty = Math.round(oldSecuirty / installments);
        if (isUpdateSchedule) {
          return (
            <PopupDialog
              width={0.9} height={0.9}
              visible={isUpdateDialogVisible}
              onTouchOutside={this.togglePopup}>
              <View style={{ flex: 1, padding: 25, }}>
                <TouchableOpacity onPress={() => this.setState({
                  isUpdateDialogVisible: false,
                })}>
                  <Image resizeMode="contain" source={require('./../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
                </TouchableOpacity>
                <Text style={{justifyContent: 'center', fontWeight: 'bold', fontSize: 18}}>Collect Security</Text>
                <View style={{ flexDirection: 'row', margin: 15,}}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Booking ID</TitleText>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Total Security</TitleText>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Paid Security</TitleText>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{bookingId}</TitleText>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{oldSecuirty} PKR</TitleText>
                        <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{paidSecurity} PKR</TitleText>
                    </View>
                </View>
                <Item picker style={styles.pickerStyle}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: "100%" }}
                    placeholder="Select Status"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.status}
                    onValueChange={status => this.setState({ status })}>
                    <Picker.Item  label="Select Status" value=""/>
                    {Object.keys(action)
                    .filter(k => k)
                    .map(k => <Picker.Item key={k} label={action[k]} value={k} />)}
                </Picker>
                </Item>
                {
                    (status === 'off-board') && (
                        <View style={styles.Inputchild}>
                            <TextInput style={{pending: 10 }} keyboardType='numeric' value={this.state.refunedSecurity} onChangeText={(refunedSecurity) => this.setState({ refunedSecurity })}  placeholder ="Refuned Security"/> 
                        </View>
                    )
                }

                {
                    status === 'approved' && (
                        <View>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: "100%" }}
                                placeholder="Select Status"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.installments}
                                onValueChange={installments => this.setState({ installments })}>
                                <Picker.Item  label="1 Installment" value="1"/>
                                <Picker.Item  label="2 Installment" value="2"/>
                                <Picker.Item  label="3 Installment" value="3"/>
                                <Picker.Item  label="4 Installment" value="4"/>
                            </Picker>
                            <View style={{ flexDirection: 'row', margin: 15,}}>
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Collected Security</TitleText>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >{collectedSecuirty}</TitleText>
                                </View>
                            </View>
                        </View>
                    )
                }
                <Button disabled={submitting} onPress={() => { this.updateBooking() }} >{submitting ? 'Please wait...' : 'Update'}</Button>
              </View>
            </PopupDialog>
          );
        }
    }
    render() {


        const { filter: { status }, statses } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
                <Header backButton={true} optionButton={true} />
                <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }}>Bookings</TitleText>
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 16, }}>
                            {statses[status]} Bookings
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
                    {this.renderBookings()}
                </View>
                {this.renderFilterView()}
                {this.renderCollectSecurityPopup()}
                {this.renderUpdateBookingPopup()}
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
    },
    Inputchild: {
        paddingStart: 15,
        paddingEnd: 15,
        padding:15,
        borderRadius: 30,
        // To round image corners
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0,
        backgroundColor: '#FFF',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 5,
        elevation: 3
    },
});


const mapStateToProps = state => {
    return {
        bookings: state.BookingsReducer.bookings,
        user: state.AuthReducer.user,
    };
};

export default connect(
    mapStateToProps,
    {
        getBookings: actions.getBookings,
        addSecurity:actions.addSecurity,
        updateBooking:actions.updateBooking,
    },
)(BookingsScreen);
