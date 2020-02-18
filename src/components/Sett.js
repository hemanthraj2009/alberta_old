import React from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
//import Netinfo from './NetInfo'
import moment from 'moment-timezone'


export default class Splash extends React.Component {

  // session = () => {
  //   AsyncStorage.removeItem("savedPassword");
  //   this.props.navigation.navigate("Loginscreen");
  // };

  // sessionButton = () => {
  //   Alert.alert(
  //     "",
  //     "Session expired Please login again",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       {
  //         text: "OK",
  //         onPress: () => this.session()
  //       }
  //     ],
  //     {
  //       cancelable: false
  //     }
  //   );
  //   return true;
  // };
    
    componentDidMount() {
    // AsyncStorage.getItem('AUTH').then(
    //   auth =>{
    //     if(auth){
    //       this.props.navigation.navigate('Touchid')

    //     }else{
    //       this.props.navigation.navigate('Loginscreen')
    //     }
    //   })
   // )
     AsyncStorage.getItem('AuthPassword').then(
        save => {
          if (save) {
            // alert(save)
            var date = moment()

        .format("MM-DD-YYYY");
            API_URL = `https://portal.albertapayments.com/api/me_new_date?token=${encodeURIComponent(save)}&date=${date}`;
            fetch(API_URL, {
                  
                // fetch(`https://devportal.albertapayments.com/api/me?token=${encodeURIComponent(save)}`, {
                  method: 'GET',
                  
                }).then((response) => response.json())
                    .then((responseJson) => {
                     
            
                      if (responseJson.error){
                       
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
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             
                <ActivityIndicator size="large" color="blue" />
               
            </View>
        )
    }
}