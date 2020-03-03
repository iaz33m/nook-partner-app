import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Text, Icon, Button as NativeButton, CheckBox, Textarea } from 'native-base';
import Button from '../SeperateComponents/Button';
import InputField from '../SeperateComponents/InputField';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import * as NavigationService from '../../NavigationService';
import Colors from '../../helper/Colors';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as actions from '../../Store/Actions/UserActions';

class ProfileScreen extends React.Component {

  state = {
    user: null,
    id: '',
    name: '',
    number: '',
    gender: '',
    profile: '',
    address: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  componentDidMount() {
    const { user } = this.props;
    if (!user) {
      return NavigationService.navigateAndResetStack('LoginScreen');
    }
    this.state = {
      user,
      ...user
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
        this.setState({ image: result.uri, profile: result.base64 });
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


  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps;
    const { user: oldUser } = prevState;
    if (JSON.stringify(user) !== JSON.stringify(oldUser)) {
      return { user, ...user };
    }
    return null;
  }

  updateProfile = () => {
    const { name, number, gender, profile, address } = this.state;
    const { user: { access_token: token }, updateUser } = this.props;
    updateUser({
      token,
      data: { name, number, gender: gender.toLocaleLowerCase(), address, profile },
      onSuccess: alert,
      onError: alert
    });
  }
  updatePassword = () => {
    const { oldPassword, password, confirmPassword } = this.state;
    const { user: { access_token: token }, changePassword } = this.props;

    if (password !== confirmPassword) {
      return alert('The password and confirmation password do not match.');
    }

    changePassword({
      token,
      data: { old_password: oldPassword, password },
      onSuccess: alert,
      onError: alert
    });
  }

  render() {
    let { name, number, gender, profile, address, oldPassword, password, confirmPassword } = this.state;

    // image is not coming from internet
    if (!profile.includes('http')) {
      profile = `data:image/png;base64,${profile}`;
    }

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={false} optionButton={true} />
        <ScrollView contentContainerStyle={{ backgroundColor: Colors.gray, paddingBottom: 200 }}>

          <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >User Profile</TitleText>

          <TouchableWithoutFeedback onPress={this.selectImageSrc}>
            <View style={styles.imageContainer} onPress={this.selectImageSrc}>
              <Image
                style={styles.imageView}
                source={{ uri: profile }}
                onPress={this.selectImageSrc}
              />
              <Image style={styles.imageButton}
                source={require('./../../../assets/camera_icon.png')}
                onPress={this.selectImageSrc}
              />
            </View>
          </TouchableWithoutFeedback>


          <View style={styles.container}>
            <View style={styles.child}>
              <TitleText style={{ alignSelf: 'flex-start', margin: 15, fontWeight: 'bold', marginBottom: 0, fontSize: 18, }}>
                Personal Information
              </TitleText>
              <View style={{ marginTop: 15, marginBottom: 5, }}>
                <InputField value={name} iconName="person"
                  onChangeText={name => this.setState({ name })}
                >Name</InputField>
                <InputField value={number} iconName="call"
                  onChangeText={number => this.setState({ number })}
                >Phone</InputField>
              </View>
              <TitleText style={{ alignSelf: 'flex-start', margin: 15, fontWeight: 'bold', marginBottom: 0, fontSize: 18, }}>
                Gender
              </TitleText>
              <View style={styles.checkbox}>
                <View style={styles.checkboxItem}>
                  <Image style={{
                    width: 40,
                    height: 40,
                  }}
                    source={require('./../../../assets/male.png')}
                  />
                  <Text>Male</Text>
                  <CheckBox checked={gender === 'Male'} onPress={() => { this.setState({ gender: 'Male' }) }} />
                </View>
                <View style={styles.checkboxItem}>
                  <Image style={{
                    width: 40,
                    height: 40,
                  }}
                    source={require('./../../../assets/female.png')}
                  />
                  <Text>Female</Text>
                  <CheckBox checked={gender === 'Female'} onPress={() => { this.setState({ gender: 'Female' }) }} />
                </View>
              </View>
              <Textarea
                style={styles.textArea}
                rowSpan={5}
                bordered
                placeholder="Type your address"
                value={address}
                onChangeText={address => this.setState({ address })}
              />
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                <Button onPress={this.updateProfile}  >Update</Button>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.child}>
              <TitleText style={{ alignSelf: 'flex-start', margin: 15, fontWeight: 'bold', marginBottom: 0, fontSize: 18, }}>Security</TitleText>
              <View style={{ marginTop: 15, marginBottom: 5, }}>
                <InputField
                  iconName="eye"
                  secureTextEntry
                  value={oldPassword}
                  onChangeText={(oldPassword) => this.setState({ oldPassword })}
                >Old Password</InputField>
                <InputField
                  iconName="eye"
                  secureTextEntry
                  value={password}
                  onChangeText={(password) => this.setState({ password })}
                >New Password</InputField>
                <InputField iconName="eye" secureTextEntry value={confirmPassword} onChangeText={(confirmPassword) => this.setState({ confirmPassword })} >Confrim New Password</InputField>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                <Button onPress={this.updatePassword}  >Update Password</Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View >
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
    width: 40,
    height: 40,
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
    backgroundColor: Colors.white,
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
    flex: 1, padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 15
  },
  child: {
    padding: 15,
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
    user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps,
  {
    changePassword: actions.changePassword,
    updateUser: actions.updateUser
  },
)(ProfileScreen);