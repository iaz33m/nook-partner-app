import React from 'react';
import { StyleSheet } from 'react-native';
import { Item, Input, Icon, View } from 'native-base';
import Colors from '../../helper/Colors'


const InputField = (props) => {

    let { children, style, regular, secureTextEntry, iconName } = props;
    //let {inputStyleMain} = style;
    let inputStyleMain = (style) ? style.inputStyleMain || {} : {};

    // const itemProps = { regular };
    const inputProps = { secureTextEntry };

    return (
        <Item regular style={{ ...styles.container, ...inputStyleMain }}>
            <View style={styles.child}>
                <Input  {...inputProps} placeholder={children} />
                <Icon name={iconName} />
            </View>
        </Item>
    );
};
export default InputField;

const styles = StyleSheet.create({
    container: {
        marginLeft: 30,
        borderColor: 'transparent',
        marginRight: 30,
        marginTop: 20,

        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 30
    },
    child: {
        flex: 1,
        paddingStart: 15,
        paddingEnd: 15,
        flexDirection: 'row',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // To round image corners
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0,
        backgroundColor: '#FFF',
        // Android shadow
        elevation: 4
    }
});