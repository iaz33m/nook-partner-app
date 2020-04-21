import React from 'react';
// import { connect } from "react-redux";
import { StyleSheet, View, Image, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
// import { Item, Input, Icon } from 'native-base';
import { Text, Item, Picker, Icon, Button as NativeButton, CheckBox, Textarea, Thumbnail } from 'native-base';
import Button from '../../SeperateComponents/Button';
import InputField from '../../SeperateComponents/InputField';
import Header from '../../SeperateComponents/Header'
import TitleText from '../../SeperateComponents/TitleText'
import Colors from '../../../helper/Colors';

class ComplainsDetailScreen extends React.Component {

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
        let { name } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
                <Header backButton={true} optionButton={false} />
                <ScrollView contentContainerStyle={{ backgroundColor: Colors.gray, paddingBottom: 200 }}>

                    <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 28, }} >Complaints Details</TitleText>
                    <View style={styles.container}>
                        <View style={{ marginBottom: 3, }}>
                            <InputField value={name} iconName="person"
                                onChangeText={name => this.setState({ name })}
                            >Name</InputField>
                        </View>
                        <View style={{ marginTop: 0, marginBottom: 50, }}>
                            <InputField value={name} iconName="person"
                                onChangeText={name => this.setState({ name })}
                            >Name</InputField>
                        </View>
                        <TitleText style={{ alignSelf: 'flex-start', fontWeight: 'bold', marginBottom: 15, fontSize: 18, }}>
                            User Complaints
                        </TitleText>
                        <View style={styles.child}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 2, borderColor: Colors.gray, paddingBottom: 20, paddingTop: 10, }}>
                                <View style={{ flex: 1, alignItems: 'flex-start', }}>
                                    <TitleText style={{ fontWeight: 'bold', margin: 0, fontSize: 18, }}>
                                        ID: 123
                                    </TitleText>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                                    <TitleText style={{ fontWeight: 'bold', margin: 0, fontSize: 18, }}>
                                        Status
                                    </TitleText>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row',  paddingTop: 10, }}>
                                <Text style={{ margin: 0, fontSize: 16, lineHeight: 24, }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also.
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row',  paddingTop: 10, }}>
                            <Item picker style={styles.pickerStyle}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ flex: 1, marginLeft: 10, paddingLeft: 10, }}
                                    placeholder="Status"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.selected2}
                                    onValueChange={this.onValueChange2.bind(this)}>
                                    <Picker.Item label="Muhammad Waqas" value="key0" />
                                    <Picker.Item label="Azeem Tariq" value="key1" />
                                    <Picker.Item label="Muhammad Awaise" value="key2" />
                                </Picker>
                            </Item>
                        </View>
                        <View style={{ justifyContent: 'center', marginTop: 50, }}>
                            <Button>
                                <Text style={styles.buttonTextStyle}>Update Status</Text>
                            </Button>
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
  }
})



export default ComplainsDetailScreen;
