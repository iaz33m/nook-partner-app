import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Spinner, Card, Text, Icon, Item, Picker } from 'native-base';
import Colors from '../../helper/Colors';
import Header from '../SeperateComponents/Header';
import TitleText from '../SeperateComponents/TitleText';
import Button from '../SeperateComponents/Button';
import { AirbnbRating,Rating } from 'react-native-ratings';
import * as actions from '../../Store/Actions/NookActions';
import * as NavigationService from '../../NavigationService';
import PopupDialog from 'react-native-popup-dialog';

class MyNookScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      rating: 1,
      isDialogVisible: false,
    }
  }

  componentDidMount() {
    const { user, getMyNookDetails } = this.props;
    if (!user) {
      NavigationService.navigateAndResetStack('LoginScreen');
    }
    this.setState({ loading: true });
    getMyNookDetails({
      onError: (error) => {
        alert(error);
        this.setState({ loading: false });
      },
      onSuccess: () => {
        this.setState({ loading: false });
      },
      token: user.access_token
    });
  }

  addReview = () => {
    const { user, addReivew } = this.props;
    const { rating } = this.state;
    addReivew({
      data: { rating },
      onError: alert,
      onSuccess: () => {
        this.setState({ isDialogVisible: false });
      },
      token: user.access_token
    });
  }

  renderRattingView = () => {

    const { review } = this.props;
    const { isDialogVisible } = this.state;

    if (!review) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
          <Button onPress={() => this.setState({ isDialogVisible: true })} >Add Rating</Button>
          <PopupDialog
            width={0.9} height={0.4}
            ref={"popupDialog"}
            visible={isDialogVisible}
            onTouchOutside={() => this.setState({ isDialogVisible: false })}>
            <View style={{ flex: 1, padding: 25, }}>
              <TouchableOpacity onPress={() => this.setState({ isDialogVisible: false })}>
                <Image resizeMode="contain" source={require('./../../../assets/close.png')} style={{ height: 25, width: 25, alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>

                <AirbnbRating
                  count={5}
                  reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
                  defaultRating={5}
                  showRating
                  size={40}
                  onFinishRating={rating => this.setState({ rating })}
                />
                <Button style={{ marginTop: 15 }} onPress={this.addReview}  >Add Review</Button>
              </View>

            </View>
          </PopupDialog>
        </View>
      );
    }
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
          defaultRating={review.rating}
          showRating
          isDisabled={true}
          size={30}
        />
      </View>
    )
  }


  renderNookDetails = () => {

    const { loading } = this.state;
    const { nook } = this.props;

    if (loading) {
      return <Spinner color="black" />
    }

    if (!nook) {
      return (
        <View style={styles.container}>
          <View style={styles.child}>
            <TitleText>You are registered in any nook.</TitleText>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.child}>
          <View style={{ flexDirection: 'row', margin: 15, marginBottom: 0, }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >Nook Code</TitleText>
              <TitleText style={{ color: Colors.textGray, marginTop: 10, fontSize: 16, }} >{nook.nookCode}</TitleText>
              <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Your Ratings</TitleText>

            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >{nook.booking.rent} Rs/month</TitleText>
            </View>
          </View>
          {this.renderRattingView()}
        </View>
      </View>
    );
  }

  render() {

    return (

      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={true} />
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >My Nook</TitleText>
        {this.renderNookDetails()}
      </View >
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1, padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 15
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
    user: state.AuthReducer.user,
    nook: state.NookReducer.nook,
    review: state.NookReducer.review,
  };
};

export default connect(
  mapStateToProps,
  {
    getMyNookDetails: actions.getMyNookDetails,
    addReivew: actions.addReivew,
  },
)(MyNookScreen);