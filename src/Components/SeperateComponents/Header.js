import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Button as NativeButton, Icon } from 'native-base';
import Constants from 'expo-constants';
import * as NavigationService from '../../NavigationService'

const Header = (props) => {
    return (
        <View style={styles.container}>
            <NativeButton onPress={() => { NavigationService.goBack() }} style={styles.buttonStyle} transparent>
                <Icon name='arrow-back' />
            </NativeButton>
            <Image style={styles.buttonStyle}
                source={require('./../../../assets/nooks_logo.png')}
            />
            <NativeButton style={styles.buttonStyle} transparent>
                <Icon name='arrow-back' />
            </NativeButton>
        </View>
    );
};


const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: Constants.statusBarHeight + 5,
        marginBottom: 5
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
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