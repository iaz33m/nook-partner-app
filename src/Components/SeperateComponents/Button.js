import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button as NativeButton } from 'native-base';


const Button = (props) => {
  let { children, style } = props;

  let buttonStyle = (style) ? style.buttonStyle || {} : {};
  let labelStyle = (style) ? style.labelStyle || {} : {};

  return (
    <NativeButton {...props} style={{ ...styles.buttonStyle, ...buttonStyle }}>
      <Text style={{ ...styles.labelStyle, ...labelStyle }}>{children}</Text>
    </NativeButton>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: 'gray',
    marginTop: 20,
    width: 200,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  labelStyle: {
    color: 'white',
  },

});
export default Button;