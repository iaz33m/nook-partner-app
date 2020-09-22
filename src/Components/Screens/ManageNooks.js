import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView,TouchableOpacity, Platform } from 'react-native';
import { Text, Button as NativeButton } from 'native-base';
import Header from '../SeperateComponents/Header'
import TitleText from '../SeperateComponents/TitleText'
import Colors from '../../helper/Colors'
import * as NavigationService from '../../NavigationService';

class ManageNooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: "All Nooks",
      isDialogVisible: false,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (!user) {
      NavigationService.navigateAndResetStack('LoginScreen');
    }
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
profileCheck(){
  const { user } = this.props;
  const { aggreedToTerms, numberVerified} = user;
    if (aggreedToTerms && numberVerified) {
      NavigationService.navigateAndResetStack('AddNookScreen');
    }else{
      alert('You can not create nook, please complete your profile first.');
      NavigationService.navigateAndResetStack('ProfileScreen');
    }
}
  render() {

    return (

      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={false} optionButton={true} />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 25 }}>
            <View style={[styles.container, {
              marginBottom: 10,
            }]}>
              <View style={styles.child}>
                <View style={styles.childItem}>
                  <View style={styles.rowView}>
                    <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, }} >
                      Add Nook
                    </TitleText>
                    <TouchableOpacity style={{borderRadius: 15}} onPress={() => this.profileCheck() }>
                        <Image style={{ width: 30, height: 30, }}
                            source={require('./../../../assets/add.png')}
                        />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: Colors.black,
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text
                    style={{ color: Colors.textGray,  fontSize: 15, marginTop:10 }}>
                      By filling simple information about your property, you are one step closer to market your property at nooks. Once we received your property information, your property will go live after verification and legal process. Wait for company response. 
                      (Fill accurate information about your property)
                  </Text>
                </View>
              </View>
              <View style={styles.child}>
                <View style={styles.childItem}>
                  <View style={styles.rowView}>
                    <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20, }} >
                      Manage Nooks
                      </TitleText>
                      <TouchableOpacity style={{borderRadius: 15}} onPress={() => this.profileCheck() }>
                        <Image style={{ width: 30, height: 30, }}
                            source={require('./../../../assets/add.png')}
                        />
                      </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: Colors.black,
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text
                    style={{ color: Colors.textGray,  fontSize: 15, marginTop:10 }}>
                    By using nooks property management system you can manage your property like never before. Have better experience with your tenants by using nooks. Easy billing , maintenance services and better communication with your tenants.</Text>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  pickerStyle: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10, marginTop: 10,
  },
  childItem: {
    padding: 20,
  },
  container: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15
  },
  child: {
    flex: 1,
    borderRadius: 15,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 4,
    marginBottom: 20
  },
  rowView: {
    flex: 1,
    marginEnd: 20,
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10
  },
});

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
  };
};

export default connect(
  mapStateToProps
)(ManageNooks);
