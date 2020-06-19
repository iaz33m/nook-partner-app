import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ViewPagerAndroid,
  ImageBackground,
} from "react-native";
import {
  Text,
  Icon,
  Button as NativeButton,
  Item,
  Picker,
  Thumbnail,
  CheckBox,
  Textarea,
  Spinner,
} from "native-base";
import Header from "../SeperateComponents/Header";
import TitleText from "../SeperateComponents/TitleText";
import Colors from "../../helper/Colors";
import MapView, { Marker } from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AirbnbRating } from "react-native-ratings";
import PopupDialog from "react-native-popup-dialog";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as NavigationService from "../../NavigationService";
import InputField from "../SeperateComponents/InputField";
import Button from "../SeperateComponents/Button";
import * as actions from "../../Store/Actions/NookActions";

class AddNookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      number: "",
      description: "",
      space_type: "",
      capacity: "",
      noOfBeds: "",
      price_per_bed: "",
      profile: [],
      image: "",
      setImage: "",
      lng: 10,
      lat: 10,
      blockName: {
        lat: 10,
        lng: 10,
        name: "",
      },
      images: [],
      rooms: [],
      area: [],
      mainArea: [],
      areaLocation: [],
      review: 3,
      Fernished: true,
      AC: true,
      TV: true,
      Wifi: true,
      CCTV: true,
      UPS: true,
      modalVisible: false,
      isDialogVisible: false,
      isSchedule: false,
      submitting: false,
      processing: false,
      isMapReady: false,
      isDraggingMap: false,
    };
  }

  componentDidMount() {
    this.getArea();
  }
  getArea = () => {
    const {
      getArea,
      user: { access_token: token },
    } = this.props;

    this.setState({ loading: true, modalVisible: false });

    getArea({
      onError: (error) => {
        alert(error);
        this.setState({ loading: false });
      },
      onSuccess: (data) => {
        this.setState({ loading: false, area: data });
      },
      token,
    });
  };
  moveToHome = () => {
    NavigationService.navigateAndResetStack("TabScreens");
  };
  toggleSubmitting = () => {
    const { submitting } = this.state;
    this.setState({
      submitting: !submitting,
    });
  };

  toggleProcessing = () => {
    const { processing } = this.state;
    this.setState({
      processing: !processing,
    });
  };
  updateRooms = () => {
    const { capacity, noOfBeds, price_per_bed, rooms } = this.state;
    var room = { capacity, noOfBeds, price_per_bed };
    this.setState((prevState) => ({
      rooms: [
        {
          capacity: capacity,
          noOfBeds: noOfBeds,
          price_per_bed: price_per_bed,
        },
        ...prevState.rooms,
      ],
      capacity: "",
      isDialogVisible: false,
    }));
  };
  onValueChange2(value) {
    this.setState({
      space_type: value,
    });
  }
  onValueChange1(value) {
    this.setState({
      type: value,
    });
  }
  onValueChangeArea(value) {
    const { blockName } = this.state;
    this.setState({
      mainArea: value,
      areaLocation: [],
      blockName: { ...blockName },
    });
  }
  onValueChangeSubArea(value) {
    const { name, lat, lng } = this.state.blockName;
    this.setState({
      areaLocation: value,
      blockName: { name: "", lat: "", lng: "" },
    });
  }
  onValueChangeLocation(value) {
    this.setState({
      lat: value.lat,
      lng: value.lng,
      blockName: value,
    });
  }
  create = () => {
    const {
      number,
      description,
      type,
      space_type,
      review,
      Fernished,
      AC,
      TV,
      Wifi,
      CCTV,
      UPS,
      rooms,
      profile,
      lat,
      lng,
    } = this.state;
    var facilities = [];
    if (Fernished) {
      facilities.push("Fernished");
    }
    if (AC) {
      facilities.push("AC");
    }
    if (TV) {
      facilities.push("TV");
    }
    if (Wifi) {
      facilities.push("Wifi");
    }
    if (CCTV) {
      facilities.push("CCTV");
    }
    if (UPS) {
      facilities.push("UPS");
    }
    if (!type) {
      return alert("Type is required.");
    }
    if (!space_type) {
      return alert("Space Type is required.");
    }
    if (!number) {
      return alert("Number is required.");
    }

    if (!description) {
      return alert("description is required.");
    }

    const {
      addNook,
      user: { access_token: token },
    } = this.props;

    this.toggleSubmitting();
    let images = [];
    let data = {
      number,
      description,
      type,
      space_type,
      facilities,
      review,
      rooms,
      images: {...profile},
      lat,
      lng,
    };

    addNook({
      data: data,
      token,
      onSuccess: () => {
        this.moveToHome();
      },
      onError: (message) => {
        alert(message);
        this.toggleSubmitting();
      },
    });
  };
  renderRoomPopup = () => {
    const {
      isSchedule,
      isDialogVisible,
      submitting,
      capacity,
      noOfBeds,
      price_per_bed,
    } = this.state;

    if (isSchedule) {
      return (
        <PopupDialog
          width={0.9}
          height={0.7}
          visible={isDialogVisible}
          onTouchOutside={this.togglePopup}
        >
          <View style={{ flex: 1, padding: 25 }}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  isDialogVisible: false,
                })
              }
            >
              <Image
                resizeMode="contain"
                source={require("./../../../assets/close.png")}
                style={{ height: 25, width: 25, alignSelf: "flex-end" }}
              />
            </TouchableOpacity>

            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>
              Rooms
            </Text>
            <Item picker style={styles.pickerStyle}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "100%" }}
                placeholder="Select Status"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.capacity}
                onValueChange={(capacity) => this.setState({ capacity })}
              >
                <Picker.Item label="Room Type" value="" />
                <Picker.Item label="One Person" value="1" />
                <Picker.Item label="Two Person" value="2" />
                <Picker.Item label="Three Person" value="3" />
                <Picker.Item label="Four Person" value="4" />
                <Picker.Item label="Five Person" value="5" />
              </Picker>
            </Item>
            <InputField
              iconName="md-phone-portrait"
              onChangeText={(noOfBeds) => this.setState({ noOfBeds })}
            >
              No of Bads
            </InputField>

            <InputField
              iconName="md-phone-portrait"
              onChangeText={(price_per_bed) => this.setState({ price_per_bed })}
            >
              Price Per Bed
            </InputField>
            <Button onPress={this.updateRooms}>Add Room</Button>
          </View>
        </PopupDialog>
      );
    }
  };
  roomList() {
    const { rooms } = this.state;
    if (rooms.length == 0) {
      return true;
    }
    return (
      <View
        style={[styles.container, { width: "100%", marginTop: 10, padding: 0 }]}
      >
        {rooms.map((r, rI) => (
          <View
            key={rI}
            style={[
              styles.child,
              {
                marginTop: 15,
                padding: 15,
                borderRadius: 10,
                backgroundColor: Colors.white,
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ marginBottom: 15, fontSize: 18, fontWeight: "bold" }}
                >
                  Price Per Bed
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{ marginBottom: 15, fontSize: 16 }}>
                  {r.price_per_bed} PKR
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 15,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("./../../../assets/bed-icon.png")}
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{ fontSize: 16 }}>{r.noOfBeds}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 15,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("./../../../assets/user-icon.png")}
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{ fontSize: 16 }}>{r.capacity}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
  areaLocation() {
    const { area } = this.state;

    if (this.state.loading) {
      return true;
    }
    if (area.length == 0) {
      return true;
    }
    return (
      <View style={styles.container}>
        <View>
          <Item picker style={styles.pickerStyle}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: "100%" }}
              placeholder="Select Area"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.mainArea}
              onValueChange={this.onValueChangeArea.bind(this)}
            >
              <Picker.Item label="Select Area" value="" />
              {area.data.map((k) => (
                <Picker.Item key={k.id} label={k.area} value={k.sub_area} />
              ))}
            </Picker>
          </Item>
        </View>
      </View>
    );
  }
  subAreaLocation() {
    const { mainArea } = this.state;

    if (this.state.loading) {
      return true;
    }
    if (mainArea.length == 0) {
      return true;
    }
    return (
      <View style={styles.container}>
        <View>
          <Item picker style={styles.pickerStyle}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: "100%" }}
              placeholder="Select Location"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.areaLocation}
              onValueChange={this.onValueChangeSubArea.bind(this)}
            >
              <Picker.Item label="Select Sub Area" value="" />
              {mainArea.map((k) => (
                <Picker.Item label={k.name} value={k.locations} />
              ))}
            </Picker>
          </Item>
        </View>
      </View>
    );
  }
  areaBlockLocation() {
    const { areaLocation, mainArea } = this.state;

    if (this.state.loading) {
      return true;
    }
    if (areaLocation.length == 0) {
      return true;
    }
    if (mainArea.length == 0) {
      return true;
    }
    return (
      <View style={styles.container}>
        <View>
          <Item picker style={styles.pickerStyle}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: "100%" }}
              placeholder="Select Location"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.blockName}
              onValueChange={this.onValueChangeLocation.bind(this)}
            >
              <Picker.Item label="Select Street" value="" />
              {areaLocation.map((k) => (
                <Picker.Item label={k.name} value={k} />
              ))}
            </Picker>
          </Item>
        </View>
      </View>
    );
  }
  areaLatLngLocation() {
    const { areaLocation, mainArea, blockName } = this.state;
    let view = this.Map();
    if (this.state.loading) {
      return true;
    }
    if (areaLocation.length == 0) {
      return true;
    }
    if (mainArea.length == 0) {
      return true;
    }
    if (!this.state.blockName.name) {
      return true;
    }
    return (
      <View style={styles.container}>
        <View>
          <TitleText
            style={{
              alignSelf: "flex-start",
              fontWeight: "bold",
              fontSize: 20,
              marginRight: 10,
              marginBottom: 10,
              marginTop: 15,
            }}
          >
            Select Your Location
          </TitleText>
          <View style={{ height: 400 }}>{view}</View>
        </View>
      </View>
    );
  }

  Map = () => {
    const { areaLocation, mainArea, blockName } = this.state;
    if (this.state.loading) {
      return true;
    }
    if (areaLocation.length == 0) {
      return true;
    }
    if (mainArea.length == 0) {
      return true;
    }
    if (!this.state.blockName.name) {
      return true;
    }
    if (!this.state.blockName.lng) {
      return true;
    }
    if (!this.state.blockName.lat) {
      return true;
    }
    let lat = this.state.lat;
    let lng = this.state.lng;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          initialRegion={{
            latitude: Number(lat),
            longitude: Number(lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapStyle}
          onLayout={this.onMapLayout}
          provider="google"
          mapType="standard"
          showsScale
          showsCompass
          showsPointsOfInterest
          showsBuildings
          showsUserLocation={true}
          onPanDrag={this.setMapDragging}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {this.state.isMapReady && (
            <MapView.Marker
              image={require("./../../../assets/marker.png")}
              style={{ width: 40, height: 62 }}
              draggable
              coordinate={{
                latitude: Number(lat),
                longitude: Number(lng),
              }}
            />
          )}
        </MapView>
        <View
          style={[
            styles.container,
            { width: "100%", flex: 0, marginTop: 10, position: "absolute" },
          ]}
        >
          <View
            style={[
              styles.child,
              {
                borderRadius: 30,
                flexDirection: "row",
                alignItems: "center",
                paddingStart: 20,
              },
            ]}
          >
            <Image
              resizeMode="contain"
              source={require("./../../../assets/search.png")}
              style={{ height: 20, width: 20 }}
            />
            <Text style={{ margin: 15 }}>{this.state.blockName.name}</Text>
          </View>
        </View>
      </View>
    );
  };
  setMapDragging = () => {
    if (!this.state.isDraggingMap) {
      this.setState({
        isDraggingMap: true,
      });
    }
  };

  onRegionChangeComplete = (value) => {
    if (this.state.isDraggingMap) {
      this.setState({
        isDraggingMap: false,
        lat: value.latitude,
        lng: value.longitude,
      });
    }

    if (!this.state.isDraggingMap) {
      return;
    }
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  pickImage = async (driver) => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (status === "granted") {
      let src = ImagePicker.launchImageLibraryAsync;

      if (driver == "camera") {
        src = ImagePicker.launchCameraAsync;
      }

      let result = await src({
        allowsEditing: false,
        base64: true,
        quality: 0.5,
      });

      if (!result.cancelled) {
        const base64 = result.base64.replace(/\n/g, "");
        const base_64 = `data:image/png;base64,${base64}`;
        let { images, profile } = this.state;
        images.push(result.uri);
        profile.push(base64);
        this.setState({
          images: images,
          profile: profile,
        });
      }
    } else {
      return alert("Permission not granted");
    }
  };

  selectImageSrc = () => {
    this.pickImage("gallary");
  };

  removeImage = (index) => {
    const { images, profile } = this.state;
    this.setState({
      images: (images || []).filter((image, i) => i !== index),
      profile: (profile || []).filter((pro, i) => i !== index),
    });
  };

  ShowImages() {
    const { images, profile } = this.state;

    if (images.length == 0) {
      return;
    }

    const featuredImage = images[0];
    const filteredImages = images.slice(1);

    return (
      <>
        <View>
          <View style={{ marginTop: 15 }}>
            {featuredImage && (
              <>
                <TouchableOpacity onPress={() => this.removeImage(0)}>
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
                    uri: featuredImage,
                  }}
                  style={{
                    borderRadius: 10,
                    height: 200,
                    width: null,
                    flex: 1,
                  }}
                />
              </>
            )}
          </View>
          <ScrollView
            horizontal={true}
            style={{ paddingTop: 15, paddingBottom: 15 }}
          >
            {filteredImages.map((m, index) => (
              <View>
                <TouchableOpacity onPress={() => this.removeImage(index + 1)}>
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
                    uri: m,
                  }}
                  style={{
                    marginEnd: 10,
                    borderRadius: 10,
                    height: 100,
                    width: 100,
                    flex: 1,
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
  render() {
    const { submitting, processing, review, profile, images } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
        <Header />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 25 }}>
            <TitleText style={{ fontWeight: "bold", fontSize: 20 }}>
              Add Nook
            </TitleText>

            <View style={styles.container}>
              <View style={styles.child}>
                <KeyboardAwareScrollView>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flex: 1,
                        marginTop: "5%",
                        marginStart: "5%",
                        marginEnd: "5%",
                      }}
                    >
                      <Item picker style={styles.pickerStyle}>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: "100%" }}
                          placeholder="Room Catagories"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.type}
                          onValueChange={this.onValueChange1.bind(this)}
                        >
                          <Picker.Item label="Room Catagories" value="" />
                          <Picker.Item label="House" value="house" />
                          <Picker.Item label="Flat" value="flat" />
                          <Picker.Item
                            label="Upper Portion"
                            value="upper_portion"
                          />
                          <Picker.Item
                            label="Lower Portion"
                            value="lower_portion"
                          />
                          <Picker.Item label="Farm House" value="farm_house" />
                          <Picker.Item label="Pent House" value="pent_house" />
                          <Picker.Item
                            label="Independent Room"
                            value="independentRoom"
                          />
                          <Picker.Item
                            label="Hostel Building"
                            value="hostelBuilding"
                          />
                          <Picker.Item label="Out House" value="outHouse" />
                          <Picker.Item label="Other" value="other" />
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
                          selectedValue={this.state.space_type}
                          onValueChange={this.onValueChange2.bind(this)}
                        >
                          <Picker.Item label="Nook Type" value="" />
                          <Picker.Item label="Shared" value="shared" />
                          <Picker.Item
                            label="Independent"
                            value="independent"
                          />
                        </Picker>
                      </Item>

                      <Textarea
                        style={{ marginTop: 20, margin: 10 }}
                        rowSpan={5}
                        bordered
                        placeholder="Nook Description"
                        value={this.state.description}
                        onChangeText={(description) =>
                          this.setState({ description })
                        }
                      />
                      <View
                        style={[
                          styles.container,
                          {
                            marginBottom: 10,
                          },
                        ]}
                      >
                        <View style={styles.child}>
                          <View
                            style={[
                              styles.childItem,
                              {
                                flexDirection: "row",
                                borderBottomWidth: 1,
                                borderBottomColor: "black",
                              },
                            ]}
                          >
                            <TitleText
                              style={{
                                alignSelf: "flex-start",
                                fontWeight: "bold",
                                fontSize: 20,
                                marginRight: 10,
                              }}
                            >
                              Rating
                            </TitleText>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                              <AirbnbRating
                                showRating={false}
                                size={20}
                                defaultRating={4}
                                onFinishRating={(review) =>
                                  this.setState({ review })
                                }
                              />
                            </View>
                          </View>
                          <View style={styles.checkbox}>
                            <View style={styles.checkboxItem}>
                              <Text>Furnished</Text>
                              <CheckBox
                                checked={this.state.Fernished}
                                onPress={() =>
                                  this.setState({
                                    Fernished: !this.state.Fernished,
                                  })
                                }
                              />
                            </View>
                            <View style={styles.checkboxItem}>
                              <Text>AC</Text>
                              <CheckBox
                                checked={this.state.AC}
                                onPress={() =>
                                  this.setState({ AC: !this.state.AC })
                                }
                              />
                            </View>
                            <View style={styles.checkboxItem}>
                              <Text>TV</Text>
                              <CheckBox
                                checked={this.state.TV}
                                onPress={() =>
                                  this.setState({ TV: !this.state.TV })
                                }
                              />
                            </View>
                          </View>
                          <View style={[styles.checkbox, { paddingTop: 0 }]}>
                            <View style={styles.checkboxItem}>
                              <Text>Wifi</Text>
                              <CheckBox
                                checked={this.state.Wifi}
                                onPress={() =>
                                  this.setState({ Wifi: !this.state.Wifi })
                                }
                              />
                            </View>
                            <View style={styles.checkboxItem}>
                              <Text>CCTV</Text>
                              <CheckBox
                                checked={this.state.CCTV}
                                onPress={() =>
                                  this.setState({ CCTV: !this.state.CCTV })
                                }
                              />
                            </View>
                            <View style={styles.checkboxItem}>
                              <Text>UPS</Text>
                              <CheckBox
                                checked={this.state.UPS}
                                onPress={() =>
                                  this.setState({ UPS: !this.state.UPS })
                                }
                              />
                            </View>
                          </View>
                        </View>
                      </View>

                      {this.ShowImages()}

                      <TouchableWithoutFeedback onPress={this.selectImageSrc}>
                        <View style={styles.container}>
                          <View
                            style={[
                              styles.child,
                              {
                                height: 170,
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                              },
                            ]}
                          >
                            <TitleText
                              style={{
                                alignSelf: "flex-start",
                                fontWeight: "bold",
                                fontSize: 20,
                              }}
                            >
                              Select Image
                            </TitleText>

                            <View onPress={this.selectImageSrc}>
                              <Image
                                style={{
                                  width: 40,
                                  height: 40,
                                }}
                                onPress={this.selectImageSrc}
                                source={require("./../../../assets/add.png")}
                              />
                            </View>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>

                      <InputField
                        iconName="md-phone-portrait"
                        value={this.state.number}
                        onChangeText={(number) => this.setState({ number })}
                      >
                        Phone Number
                      </InputField>
                      {this.areaLocation()}
                      {this.subAreaLocation()}
                      {this.areaBlockLocation()}
                      {this.areaLatLngLocation()}
                      <View style={styles.container}>
                        <View
                          style={[
                            styles.child,
                            {
                              borderRadius: 30,
                              flex: 1,
                              justifyContent: "space-between",
                              flexDirection: "row",
                              alignItems: "center",
                              paddingStart: 15,
                              paddingEnd: 15,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              margin: 15,
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            Room
                          </Text>
                          <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                              this.setState({
                                isDialogVisible: true,
                                isSchedule: true,
                              });
                            }}
                          >
                            <Image
                              style={{ width: 40, height: 40 }}
                              source={require("./../../../assets/add.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      {this.roomList()}
                      {this.renderRoomPopup()}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignContent: "center",
                      marginBottom: 70,
                    }}
                  >
                    <View style={{ flex: 1, alignContent: "center" }}>
                      <View style={{ flex: 1, marginTop: 20, width: "100%" }}>
                        <Button disabled={submitting} onPress={this.create}>
                          {submitting ? "Please wait..." : "Add Nook"}
                        </Button>
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 160,
    width: 160,
    marginBottom: 20,
    alignSelf: "center",
  },
  pickerStyle: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: 10,
  },
  imageButton: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: -7,
    alignSelf: "flex-end",
  },
  imageView: {
    height: 160,
    width: 160,
    position: "relative",
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.white,
    borderRadius: 160 / 2,
  },
  checkbox: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    paddingEnd: 35,
  },
  mapStyle: {
    width: "100%",
    alignSelf: "center",
    height: "95%",
  },
  checkboxItem: {
    flexDirection: "row",
  },
  pickerStyle: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: 25,
  },
  textArea: {
    margin: 20,
    paddingTop: 20,
  },
  childItem: {
    padding: 20,
  },
  container: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  child: {
    flex: 1,
    marginTop: 25,
    borderRadius: 15,
    // To round image corners
    overflow: "hidden",
    borderColor: "#999",
    borderWidth: 0,
    backgroundColor: "#FFF",
    // Android shadow
    elevation: 3,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
    area: state.NookReducer.area,
  };
};
export default connect(mapStateToProps, {
  addNook: actions.addNook,
  getArea: actions.getArea,
})(AddNookScreen);
