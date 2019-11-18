import React from 'react';
import { StyleSheet } from 'react-native';
import { Item, Input } from 'native-base';


const InputField = (props) => {

    let { children, style, regular, secureTextEntry } = props;
    //let {inputStyleMain} = style;
    let inputStyleMain = (style)? style.inputStyleMain || {} : {};

    // const itemProps = { regular };
    const inputProps = { secureTextEntry };

    return (
        <Item regular style={{ ...styles.inputStyle, ...inputStyleMain }}>
            <Input {...inputProps} placeholder={children} />
        </Item>
    );
};
export default InputField;

const styles = StyleSheet.create({
    inputStyle: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
    },
});