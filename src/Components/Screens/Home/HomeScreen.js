import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  FlatList,
  Alert,
} from "react-native";

import { AirbnbRating } from 'react-native-ratings';

import {
  Icon,
  Spinner,
  Item,
  Picker,
  Button as NativeButton,
  Card,
  CardItem,
} from "native-base";

import Header from "../../SeperateComponents/Header";
import TitleText from "../../SeperateComponents/TitleText";
import * as NavigationService from "../../../NavigationService";
import Colors from "../../../helper/Colors";
import styles from "./styles";
import { Marker } from "react-native-maps";
import Button from "../../SeperateComponents/Button";
import * as actions from "../../../Store/Actions/NookActions";
import { connect } from "react-redux";


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 4,
      isMap: true,
      isDialogVisible: false,
      markers: {
        latlng: {
          latitude: 31.4697,
          longitude: 74.2728,
        },
        title: "",
        description: "",
      },
      filter: {
        space_type: "",
        type: "",
        gender: "",
      },
      loading: true,
      submitting:false,
      isCancel:false,
      modalVisible: false,
      nookId:'',
      nooks: [],
      filters: {
        type: {
          house: "House",
          flat: "Flat",
          independentRoom: "Independent Room",
          hostelBuilding: "Hostel Building",
          outHouse: "Out House",
          other: "Other",
        },
        gender: {
          both: "Both",
          male: "Male",
          female: "Female",
        },
        space_type: {
          "": "All Space Type",
          shared: "Shared",
          independent: "Independent",
        },
      },
    };
  }

  componentDidMount() {
    this.applyFilter();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.nooks !== prevState.nooks) {
      return { nooks: nextProps.nooks };
    }
    return null;
  }

  onRefresh() {
    //Clear old data of the list
    this.setState({ nooks: [] });
    //Call the Service to get the latest data
    this.applyFilter();
  }
  applyFilter = () => {
    const {
      getPublicNooks,
      user: { access_token: token },
    } = this.props;
    const { filter } = this.state;
    
    this.setState({ loading: true, modalVisible: false });
    getPublicNooks({
      onError: (error) => {
        alert(error);
        this.setState({ loading: false });
      },
      onSuccess: () => {
        if (this.state.nooks.length == 0) {
          if (filter.space_type == '' && filter.type == '' && filter.gender == '') {
            return NavigationService.navigateAndResetStack("ManageNooks");
          }
        }
        this.setState({ loading: false });
      },
      filter,
      token,
    });
  };

  componentDidUpdate() {
    const { desiredLocation } = this.props;
    if (desiredLocation) {
      const point = {
        latitude: desiredLocation.lat,
        longitude: desiredLocation.lng,
      };

      if (this.myMap) {
        this.myMap.animateCamera(
          {
            center: point,
          },
          2000
        );
      }
    }
  }

  renderDesiredLocationMarker = () => {
    const { desiredLocation } = this.props;
    if (desiredLocation) {
      const point = {
        latitude: desiredLocation.lat,
        longitude: desiredLocation.lng,
      };
      return <Marker title="Desired Location" coordinate={point} />;
    }
  };
  deleteNookAlert(id){
    this.setState({ submitting: true });
    Alert.alert(
      "Delete Nook",
      "Are you sure, you want to delete nook?",
      [
        {
          text: "Cancel",
          onPress: () => { this.setState({ submitting: false }) },
          style: "cancel"
        },
        { 
          text: "Yes! Delete It",
          onPress: () => { this.deleteNook(id) } 
        }
      ],
      { cancelable: false }
    );
  }
  deleteNook(id){
    const { deleteNook, user: { access_token: token } } = this.props;
    
    const { submitting,isCancel} = this.state;
    
    this.setState({ submitting: true });
    
    const data = { "id":id };
    deleteNook({
      onError: (error) => {
        alert(error);
        this.setState({ submitting:false });
      },
      onSuccess: () => {
        this.setState({ submitting:false });
        alert('Nook Deleted Successfully');
        this.onRefresh();
      },
      data,
      token,
    });
  }

  getPrice = (item) => {
    const price = item.rent && item.rent !== "0" && item.rent !== null
    ? item.rent
    : Math.min(
        ...item.rooms.map((r) =>
          r.price_per_bed !== "0" &&
          r.price_per_bed !== null ? r.price_per_bed : "0"
        )
      );
    if(price !== Infinity){
      return price;
    }
    return 0;
  }

  listView = () => {

    if (this.state.loading) {
      return true;
      // return <Spinner color="black" />;
    }

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <FlatList
          data={this.state.nooks}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: "5%", marginTop: 10 }}
          renderItem={({ item, index }) => (
            <View style={styles.container} key={index}>              
              <View style={styles.child}>
                  {/* <TouchableOpacity
                    onPress={() => {
                      this.setState({ isDialogVisible: false });
                      NavigationService.navigate("NookDetailScreen", item);
                    }}
                  > */}
                  <Image
                    style={{ position: "absolute", height:80, width:100 }}
                    source={require("./../../../../assets/feature.png")}
                  />
                  <Text
                    style={{
                      padding: 10,
                      paddingStart: 20,
                      paddingEnd: 20,
                      alignSelf: "flex-end",
                      color: Colors.white,
                      fontWeight: "bold",
                      backgroundColor: Colors.primaryColor,
                      fontSize: 14,
                      position: "absolute",
                    }}
                  >
                    {item.type}
                  </Text>
                  <Text
                    style={{
                      marginTop: 20,
                      alignSelf: "flex-start",
                      color: Colors.white,
                      fontSize: 14,
                      transform: [{ rotate: "-40deg" }],
                    }}
                  >
                    {item.status}
                  </Text>

                  <View style={{ margin: 20, marginTop:30 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ isDialogVisible: false });
                        NavigationService.navigate("NookDetailScreen", item);
                      }}
                    >
                    <Card>
                      <View
                        style={{
                          padding: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                          <Text></Text>
                        <Text>
                          PKR{" "}
                          {this.getPrice(item)}
                        </Text>
                      </View>
                      
                      <CardItem cardBody>
                        {item.medias.map((m, index) => {
                          if (index === 0) {
                            return (
                              <Image
                                key={index}
                                resizeMode="contain"
                                source={{
                                  uri: m.path,
                                }}
                                style={{ height: 200, width: null, flex: 1 }}
                              />
                            );
                          }
                        })}

                        <View
                          style={{
                            position: "absolute",
                            bottom: 8,
                            left: 10,
                          }}
                        >
                          <AirbnbRating showRating={false} size={15} />
                        </View>
                      </CardItem>
                    </Card>
                    { 
                      (item.nookCode) && 
                      <TitleText style={{ marginTop: 10, fontSize: 20 }}>
                        {item.nookCode}
                      </TitleText>
                    }
                    </TouchableOpacity>
                  </View>
                  {/* </TouchableOpacity> */}
                  {
                    (item.status === "Pending") &&
                    <View style={{ justifyContent: 'center' ,marginRight: 30, marginLeft: 30,}}>
                      <View style={{ paddingBottom:10 }}>
                        <View style={{justifyContent: 'center'}}>
                          <View style={{ paddingStart: 15, paddingEnd: 15 }}>
                            <NativeButton onPress={() => { this.deleteNookAlert(item.id) }} danger full rounded style={{color: '#ff3333'}}  disabled={this.state.submitting}>
                              <Text style={{ color: 'white', alignSelf: 'center' }}>{this.state.submitting ? 'Please wait...' : 'Delete Nook'}</Text>
                            </NativeButton>
                          </View>
                        </View>
                      </View>
                      <View style={{ paddingBottom:10 }}>
                        <View style={{justifyContent: 'center'}}>
                          <View style={{ paddingStart: 15, paddingEnd: 15 }}>
                            <NativeButton onPress={() => { NavigationService.navigate("UpdateNookScreen", item)}} warning full rounded style={{color: '#ff3333'}}  disabled={this.state.submitting}>
                              <Text style={{ color: 'white', alignSelf: 'center' }}>{this.state.submitting ? 'Please wait...' : 'Update Nook'}</Text>
                            </NativeButton>
                          </View>
                        </View>
                      </View>
                    </View>
                  }
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
      </View>
    );
  };

  renderFilterView = () => {
    const { modalVisible, filters, filter } = this.state;

    if (!modalVisible) {
      return;
    }

    return (
      <View
        style={{
          position: "absolute",
          width: "70%",
          height: "82%",
          alignSelf: "flex-end",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <Image
            style={{
              width: 20,
              margin: 10,
              marginTop: 15,
              height: 20,
              alignSelf: "flex-end",
            }}
            resizeMode="contain"
            source={require("./../../../../assets/close.png")}
          />
        </TouchableOpacity>
        <TitleText
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          Filter
        </TitleText>

        <Item picker style={styles.pickerStyle}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%" }}
            placeholder="Select Nook Type"
            placeholderStyle={{ color: "black" }}
            placeholderIconColor="#007aff"
            selectedValue={filter.type}
            onValueChange={(type) =>
              this.setState(
                {
                  filter: { ...filter, type },
                },
                () => {
                  console.log("filter", this.state.filter);
                }
              )
            }
          >
            <Picker.Item label="All Types" value="" />
            {Object.keys(filters.type)
              .filter((k) => k)
              .map((k) => (
                <Picker.Item key={k} label={filters.type[k]} value={k} />
              ))}
          </Picker>
        </Item>
        <Item picker style={styles.pickerStyle}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%" }}
            placeholder="Select Gender"
            placeholderStyle={{ color: "black" }}
            placeholderIconColor="#007aff"
            selectedValue={filter.gender}
            onValueChange={(gender) =>
              this.setState(
                {
                  filter: { ...filter, gender },
                },
                () => {
                  console.log("filter", this.state.filter);
                }
              )
            }
          >
            {Object.keys(filters.gender)
              .filter((k) => k)
              .map((k) => (
                <Picker.Item key={k} label={filters.gender[k]} value={k} />
              ))}
          </Picker>
        </Item>
        <Item picker style={styles.pickerStyle}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "100%" }}
            placeholder="Select Space Type"
            placeholderStyle={{ color: "black" }}
            placeholderIconColor="#007aff"
            selectedValue={filter.space_type}
            onValueChange={(space_type) =>
              this.setState(
                {
                  filter: { ...filter, space_type },
                },
                () => {
                  console.log("filter", this.state.filter);
                }
              )
            }
          >
            <Picker.Item label="All Space Type" value="" />
            {Object.keys(filters.space_type)
              .filter((k) => k)
              .map((k) => (
                <Picker.Item key={k} label={filters.space_type[k]} value={k} />
              ))}
          </Picker>
        </Item>

        <View style={{ justifyContent: "center" }}>
          <Button onPress={this.applyFilter}>Apply Filter</Button>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header backButton={false} optionButton={true} />
        <ScrollView
          refreshControl={<RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <TitleText
            style={{ marginTop: 25, fontWeight: "bold", fontSize: 20 }}
          >
            Nook
          </TitleText>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <NativeButton
              warning
              style={{ marginStart: 25 }}
              onPress={() => {
                NavigationService.navigate("AddNookScreen");
              }}
            >
              <View
                style={{
                  margin: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: Colors.white,
                    fontSize: 16,
                  }}
                >
                  Add
                </Text>
                <Image
                  style={{ width: 30, height: 30, marginStart: 5 }}
                  source={require("./../../../../assets/add.png")}
                />
              </View>
            </NativeButton>

            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              style={{ marginRight: 20 }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginBottom: 5,
                  alignSelf: "flex-end",
                }}
                resizeMode="contain"
                source={require("./../../../../assets/filter.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>{this.listView()}</View>
          {this.renderFilterView()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nooks: state.NookReducer.nooks,
    user: state.AuthReducer.user,
    desiredLocation: state.NookReducer.desiredLocation,
  };
};

export default connect(mapStateToProps, {
  getPublicNooks: actions.getPublicNooks,
  deleteNook: actions.deleteNook,
  
})(HomeScreen);
