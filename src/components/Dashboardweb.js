

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,
    AsyncStorage,Animated,BackHandler,WebView,ActivityIndicator,Image,TouchableOpacity,Dimensions,Alert} from 'react-native';



export default class Dashboardweb extends Component{

  static navigationOptions = {
    
    Title : 'Home',
    headerTitle: ( 
    <View style={{ flex: 1, alignItems: "center"}}> 
    <Image source={require('../images/poslogo.jpg')} 
    style={{height: 105,
      width: 105 ,resizeMode: 'contain',marginRight : 45}} /> 
    </View> 
    ),
    // headerRight: (<View style = {{marginRight: 20}}>
    // <AntDesignn name="bell" size={25} color="#16a0db"/></View>)
  }

constructor(props)
  {
    super(props);
 
    this.state = {
      isLoading: true,
      visible: true ,
      token:"",
      date:"",
      sid:""
    }
}

hideSpinner() {
  this.setState({ visible: false });
}


componentDidMount() {

    AsyncStorage.getItem('Sid').then((datasid) => { 
        if(datasid){
         this.setState({sid:datasid})
        }
  
      })

    AsyncStorage.getItem('token').then((datareturns) => { 
      if(datareturns){
       this.setState({token:datareturns})
      }

    })
   
    var today = new Date()
    // .format('YYYY-MM-DD');
    // var todayDate=today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-"+ today.getDate();
    // this.setState({date :todayDate})
    this.setState({date :today})
  
  }



render() {
  return (
    <View style={{ flex: 1 }}>
      

      <WebView
       onLoad={() => this.hideSpinner()}
        style={{ flex: 1 }}
        
        //source={{ uri:'https://facebook.com'}}/>
      source={{ uri:`https://portal.albertapayments.com/api/admin/dashboard_new?date=${this.state.date}&sid=${this.state.sid}&token=${this.state.token}`}} /> 
      {this.state.visible && (
        <ActivityIndicator
          style={{alignItems : 'center', marginBottom : 200}}
          size="large"
        />
      )}
    </View>
  );
}
}



