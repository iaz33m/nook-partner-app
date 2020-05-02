import React from 'react';
// import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Text, Item, Picker, Icon, Button as NativeButton, CheckBox, Textarea, Thumbnail } from 'native-base';
import Button from '../../SeperateComponents/Button';
import ButtonOther from '../../SeperateComponents/ButtonOther';
import InputField from '../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import Colors from '../../../helper/Colors';

class VisitsNookScreen extends React.Component {

    state = {
        user: null,
        id: '',
        name: '',
    };

    onValueChange2(value) {
        this.setState({
          selected2: value
        });
    }

    render() {
        let {  } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
                <Header backButton={true} optionButton={false} />
                <ScrollView contentContainerStyle={{ backgroundColor: Colors.gray, paddingBottom: 200 }}>

                    <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 28, }} >Visits</TitleText>
                    <View style={styles.container}>
                        <View style={{ flex: 1, flexDirection: 'row',  marginBottom: 15, }}>
                            <Item picker style={styles.pickerStyle}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ flex: 1, marginLeft: 10, paddingLeft: 10, }}
                                    placeholder="Select Nooks"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.selected2}
                                    onValueChange={this.onValueChange2.bind(this)}>
                                    <Picker.Item label="Nook 1" value="key0" />
                                    <Picker.Item label="Nook 2" value="key1" />
                                    <Picker.Item label="Nook 3" value="key2" />
                                </Picker>
                            </Item>
                        </View>
                        <View style={styles.child}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, }}>
                                <View style={{ flex: 1, alignItems: 'flex-start', }}>
                                    <TitleText style={{ fontWeight: 'bold', margin: 0, fontSize: 18, }}>
                                        NK-123
                                    </TitleText>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                    <TitleText style={{ fontWeight: 'bold', margin: 0, fontSize: 18, }}>
                                        12 - jan
                                    </TitleText>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, }}>
                                <View style={{ flex: 1, alignItems: 'flex-start', }}>
                                    <TitleText style={{ fontWeight: 'bold', margin: 0, fontSize: 18, }}>
                                        Bilal Ali
                                    </TitleText>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                    <TitleText style={{ fontWeight: 'bold', margin: 0, fontSize: 18, }}>
                                        0300-4171788
                                    </TitleText>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <View style={{ flex: 1, alignItems: 'stretch', }}>
                                    <ButtonOther style={styles.buttonRejectStyle}>
                                        <Text style={styles.buttonTextStyle}>Reject</Text>
                                    </ButtonOther>
                                </View>
                                <View style={{ flex: 1, alignItems: 'stretch', marginLeft: 1, }}>
                                    <ButtonOther style={styles.buttonRejectStyle}>
                                        <Text style={styles.buttonTextStyle}>Confirm</Text>
                                    </ButtonOther>
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
  container: {
    flex: 1,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
  },
  child: {
    paddingTop: 10,
    borderRadius: 15,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 3
  },
  pickerStyle: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
    // Android shadow
    elevation: 3
  },
  buttonTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    textTransform: 'uppercase',
    lineHeight: 24,
    margin: 0,
    width: '100%',
  },
})



export default VisitsNookScreen;
