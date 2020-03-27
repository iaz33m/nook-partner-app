import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Text, Icon, Button as NativeButton, CheckBox, Textarea, Thumbnail } from 'native-base';
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
import { colors } from 'react-native-elements';

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
        const base64 = result.base64.replace(/\n/g, "");
        this.setState({ image: result.uri, profile: base64 });
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

  toggleSubmitting = () => {
    const {submitting} = this.state;
    this.setState({
      submitting:!submitting,
    });
  };
  updateProfile = () => {
    this.toggleSubmitting();
    const { name, number, gender, profile, address } = this.state;
    const { user: { access_token: token }, updateUser } = this.props;
    updateUser({
      token,
      data: { name, number, gender: gender.toLocaleLowerCase(), address, profile },
      onSuccess: message=> {
        alert(message);
      this.toggleSubmitting();
      },
      onError: message=> {
        alert(message);
        this.toggleSubmitting();
      }
    });
  };
  updatePassword = () => {
    const { oldPassword, password, confirmPassword } = this.state;
    const { user: { access_token: token }, changePassword } = this.props;

    if (password !== confirmPassword) {
      return alert('The password and confirmation password do not match.');
    }
    this.toggleSubmitting();
    changePassword({
      token,
      data: { old_password: oldPassword, password },
      onSuccess: message=> {
        alert(message);
        this.toggleSubmitting();
      },
      onError: message=> {
        alert(message);
        this.toggleSubmitting();
      }
    });
  }

  render() {
    let { name, number, gender, profile, address, oldPassword, password, confirmPassword,submitting } = this.state;

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
              {/* <Image
                style={styles.imageView}
                source={{ uri: profile }}
                onPress={this.selectImageSrc}
              /> */}

              <Thumbnail style={styles.imageView} source={{ uri: profile }} large/>

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
                    width: 25,
                    height: 25,
                  }}
                    source={require('./../../../assets/male.png')}
                  />
                  <Text>Male</Text>
                  <CheckBox style={{borderColor: Colors.orange }} checked={gender === 'Male'} onPress={() => { this.setState({ gender: 'Male' }) }} />
                </View>
                <View style={styles.checkboxItem}>
                  <Image style={{
                    width: 25,
                    height: 25,
                  }}
                    source={require('./../../../assets/female.png')}
                  />
                  <Text>Female</Text>
                  <CheckBox style={{borderColor: Colors.orange }} checked={gender === 'Female'} onPress={() => { this.setState({ gender: 'Female' }) }} />
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
              <View style={{ justifyContent: 'center', marginBottom: 20, }}>
                <Button disabled={submitting} onPress={this.updateProfile} >{submitting ? 'Please wait...':'Update'}</Button>
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
              <View style={{ justifyContent: 'center' }}>
                <Button disabled={submitting} onPress={this.updatePassword} >{submitting ? 'Please wait...':'Update Password'}</Button>
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
    alignSelf: 'center',
  },
  imageButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: -7,
    alignSelf: "flex-end"
  },
  imageView: {
    height: 160,
    width: 160,
    position: 'relative',
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.white,
    borderRadius: 160/2,
  },
  textArea: {
    margin: 10,
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
    marginStart: 10,
    marginEnd: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1, padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
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
    elevation: 3
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
