import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as NativeButton, Text, View } from 'native-base';


const Button = (props) => {
  let { children, style } = props;

  let buttonStyle = (style) ? style.buttonStyle || {} : {};
  let labelStyle = (style) ? style.labelStyle || {} : {};

  return (
    <View style={{ paddingStart: 30, paddingEnd: 30 }}>
      <NativeButton warning full rounded  {...props} style={{ ...styles.buttonStyle, ...buttonStyle }}>
        <Text style={{ ...styles.labelStyle, ...labelStyle }}>{children}</Text>
      </NativeButton>
    </View>
  );
};


const styles = StyleSheet.create({

  buttonStyle: {
    marginTop: 20,
    width: "100%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    color: 'white',
    alignSelf: 'center'
  },

});
export default Button;