import React, { Component } from 'react';
import {
  AlertIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  BackAndroid,
  BackHandler
} from 'react-native';

import TouchID from "react-native-touch-id";
import LocalAuth from "react-native-local-auth";

export default  class Touchid extends Component {

  pressHandler() {
    LocalAuth.authenticate({
        reason: 'this is a secure area, please authenticate yourself',
        fallbackToPasscode: true,    // fallback to passcode on cancel
        suppressEnterPassword: true // disallow Enter Password fallback
      })
      .then(success => {
        this.props.navigation.navigate('Sett')
      })
      .catch(error => {
        alert('Authentication Failed', error.message)
      })
  }
  
  clickHandler =(props)=> {
    TouchID.isSupported()
      .then(Authenticated(props))
      .catch(error => {
        this.pressHandler()
        //this.props.navigation.navigate('Splashscreen')
      });
  }
 componentDidMount (){
   this.clickHandler(this.props)
  }
 
  Apicall=(props) =>{
    AsyncStorage.getItem('savedPassword').then(
          save => {
            if (save) {
             API_URL = LOGIN_BASE_URL1 + save ;
             fetch(API_URL, {
                    method: 'GET',
                    
                  }).then((response) => response.json())
                      .then((responseJson) => {
                       
              
                        if (responseJson.error){
                         
                          // AsyncStorage.removeItem('savedPassword')
                          //  this.props.navigation.navigate('Loginscreen')
                          if (responseJson.error) {
                            //this.sessionButton();
                            alert(responseJson.error)
                          }
              
                        }
                        if(responseJson.user.email){
                          AsyncStorage.setItem('fname', responseJson.user.fname);
                          AsyncStorage.setItem('lname', responseJson.user.lname);
                          AsyncStorage.setItem('emailid', responseJson.user.email);
                          AsyncStorage.setItem('Storename', responseJson.user.stores[0].name);
                          AsyncStorage.setItem('Sid', JSON.stringify(responseJson.user.stores[0].SID));
                          AsyncStorage.setItem('void', JSON.stringify(responseJson.user.stores[0].voids));
                          AsyncStorage.setItem('sales', responseJson.user.stores[0].sales);
                          AsyncStorage.setItem('delete', JSON.stringify(responseJson.user.stores[0].deletes));
                          AsyncStorage.setItem('role_name', (responseJson.user.roles[0].name));
                          AsyncStorage.setItem('tax',responseJson.user.stores[0].tax);
                          AsyncStorage.setItem('paid_out', responseJson.user.stores[0].paid_out);
                          AsyncStorage.setItem('returns', responseJson.user.stores[0].returns);
                          AsyncStorage.setItem('No_Sales', responseJson.user.stores[0].No_Sales);
                          showcategary = responseJson.user.stores[0].isnewdatabase;
                           this.props.navigation.navigate('Stacknav');
                        }
                         
                    })
                      .catch((error) => {
                        alert('Something went wrong! Please try again later!!!!')
                        // this.props.navigation.navigate('Stacknav');
                      });
                        
              
                  }
                  else{
                  this.props.navigation.navigate('Loginscreen');
                  }
                  
              }
          
      )
  }

render (){
return (
  <View style={{backgroundColor : 'red'}}></View>
)
}
} 

const Authenticated = (props) => {
  return TouchID.authenticate()
  .then(success => {
  props.navigation.navigate('Sett')
  })
  .catch(error => {
    Alert.alert(
      "",
      "Do want to exit the app ?",
      [
        {
          text: "Cancel",
          onPress: () =>console.log("cancle"),
          style: "NO"
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp()
        }
      ],
      {
        cancelable: false
      }
    );
  });
};
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

