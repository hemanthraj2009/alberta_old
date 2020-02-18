import React, { Component } from 'react';
import {
  AlertIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import TouchID from "react-native-touch-id";
import LocalAuth from "react-native-local-auth";

export default class FingerPrint extends Component {

  pressHandler() {
    LocalAuth.authenticate({
        reason: 'this is a secure area, please authenticate yourself',
        fallbackToPasscode: true,    // fallback to passcode on cancel
        suppressEnterPassword: true // disallow Enter Password fallback
      })
      .then(success => {
        alert('Authenticated Successfully')
      })
      .catch(error => {
        alert('Authentication Failed', error.message)
      })
  }
  
  
  componentDidMount(){
    this.clickHandler()
  }

  render() {
    return (
      <View style={styles.container}>
       
      </View>
    );
  }

clickHandler() {
    TouchID.isSupported()
      .then(authenticate)
      .catch(error => {
        this.pressHandler()
         //alert('not support')
      });
  }
}
function authenticate() {
  return TouchID.authenticate()
    .then(success => {
      alert('Authenticated Successfully');
    })
    .catch(error => {
      console.log(error)
      alert(error.message);
    });
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  btn: {
    borderRadius: 3,
    marginTop: 200,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7'
  }
});

