import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, FlatList, } from 'react-native';
import Colors from '../../helper/Colors';
import Header from '../SeperateComponents/Header';
import TitleText from '../SeperateComponents/TitleText';
import Button from '../SeperateComponents/Button';
import { AirbnbRating } from 'react-native-ratings';
import * as NavigationService from '../../NavigationService';
function Item(props) {
  let view;

  if (props.showRating) {
    view = <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
      <AirbnbRating showRating={false} size={30} />
    </View>
  } else {
    view = <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
      <Button onPress={props.onShowRating} >Add Rating</Button>
    </View>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <View style={{ flexDirection: 'row', margin: 15, marginBottom: 0, }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >Nook Code</TitleText>
            <TitleText style={{ color: Colors.textGray, marginTop: 10, fontSize: 16, }} >{props.nookCode}</TitleText>
            <TitleText style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, }} >Your Ratings</TitleText>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TitleText style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 16, }} >1500/month</TitleText>
          </View>
        </View>

        {view}

      </View>
    </View>
  )
}
class MyNookScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      requestData: {
        "1": {
          id: "1",
          nookCode: 'LMB003',
          showRating: false
        },
        "2": {
          id: "2",
          nookCode: 'LMB003',
          showRating: false
        }
      },
    }
  }


  componentDidMount(){
    const {user} = this.props;
    if(!user){
      NavigationService.navigateAndResetStack('LoginScreen');
    }
  }

  render() {

    return (

      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header backButton={true} />
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >My Nook</TitleText>

        <FlatList contentContainerStyle={styles.scrollView}
          data={Object.values(this.state.requestData)}
          renderItem={({ item }) => (
            <Item
              nookCode={item.nookCode}
              showRating={item.showRating}
              onShowRating={() => {
                const newItem = {
                  ...item,
                  showRating: true
                }
                const finalResult = { ...this.state.requestData, [item.id]: newItem }
                this.setState({ requestData: finalResult })
              }}

            />
          )}
          keyExtractor={item => item.id}
        />
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
  };
};

export default connect(
  mapStateToProps
)(MyNookScreen);