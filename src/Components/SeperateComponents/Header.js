import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Button as NativeButton, Icon } from 'native-base';
import Constants from 'expo-constants';
import * as NavigationService from '../../NavigationService'

const Header = (props) => {

    let skipButton = null;
    let options = null;
    let backButton = true;
    if (props.skipButton)
        skipButton = <TouchableOpacity style={styles.buttonStyle} transparent>
            <Text style={{ textDecorationLine: 'underline' }}>Skip</Text>
        </TouchableOpacity>;
    if (props.optionButton)
        options = <TouchableOpacity onPress={props.optionButton} style={styles.buttonStyle} transparent>
            <Image style={styles.buttonStyle}
                source={require('./../../../assets/vertical_dot.png')}
            />
        </TouchableOpacity>
    if (props.backButton) {
        backButton = <TouchableOpacity onPress={() => { NavigationService.goBack() }} style={styles.buttonStyle} transparent>
            <Icon name='arrow-back' />
        </TouchableOpacity>
    }
    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                {backButton}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image style={styles.buttonStyle}
                    source={require('./../../../assets/nooks_logo.png')}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                {options}
                {skipButton}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    buttonStyle: {
        margin: 10,
        marginTop: 12,
        marginBottom: 12
    },
    container: {
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0,
        // Android shadow
        elevation: 10
    },

});
export default Header;