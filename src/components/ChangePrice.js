import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, 
  KeyboardAvoidingView, View, Image, TouchableOpacity, ScrollView, value, AsyncStorage, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from 'react-native-whc-loading'
export default class ChangePrice extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTitle: (

      <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
        <Image source={require('../images/poslogo.jpg')}
          style={{ height: 100, width: 100, marginRight: 40, resizeMode: 'contain' }} />
      </View>
    ),
    // headerRight: (<View style={{ marginRight: 20 }}>
    //   <TouchableOpacity onPress={()=>{ navigation.navigate('Notifications'); }}>
    // <FontAwesome name="bell" size={25} color="#16a0db"/></TouchableOpacity></View>)
  }

  constructor() {
    super();
    this.state = {
      check: true,
      item: "",
      cost: "",
      qoh: "",
      salesPrice: "",
      barCodeNumber: "",
      grossvalue : ""
    }
  }


  

  componentDidMount() {
    const item = this.props.navigation.getParam('item');
    this.setState({ item: item })
    const cost = this.props.navigation.getParam('cost')
    this.setState({ cost: cost })
    const qoh = this.props.navigation.getParam('qoh')
    this.setState({ qoh: qoh })
    const salesPrice = this.props.navigation.getParam('sale')
    this.setState({ salesPrice: salesPrice })
    const grossvalue = JSON.stringify(((parseInt(salesPrice))-(parseInt(cost))) * (100) /(parseInt(salesPrice))) 
    

    //this.setState ({grossvalue : JSON.stringify(grossvalue)})
    //this.setState ({gross : parseInt(grossvalue)})
    //alert(grossvalue)
     if(grossvalue == 'null'){
     this.setState ({grossvalue : '0.00'})
    }else{
      this.setState({grossvalue : grossvalue + '.00'})
    }
    
  }

 

  grossprofit = () =>{
    this.setState({grossvalue : JSON.stringify( ((parseInt(this.state.salesPrice))-(parseInt(this.state.cost))) * (100) /(parseInt(this.state.salesPrice))) })
  }

  saveNPLItemDetails = () => {
    const barCodeNumber = this.props.navigation.getParam('barcodePassValue')
    this.setState({ barCodeNumber: barCodeNumber })
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
         this.refs.loading.show();
          fetch(`https://portal.albertapayments.com/api/admin/updatePriceBySKU_new?token=${encodeURIComponent(data)}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sku: this.state.barCodeNumber,
              "sid": SID,
              "price": this.state.salesPrice,
            }),
          }).then((response) => response.json())
            .then((responseJson) => {

              this.refs.loading.show(false);

              if (responseJson.error) {
                Alert.alert(
                 
                  '',
                  responseJson.error,
                  [
                    { text: 'OK', onPress: () => this.cancelBtnPress() },
                  ]
                )
                return;
              }

              if (responseJson.message) {
                Alert.alert(
                 
                  '',
                  responseJson.message,
                  [
                    { text: 'OK', onPress: () => this.cancelBtnPress() },
                  ]
                )
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
    });
  }
  cancelBtnPress = () => {
    this.refs.loading.show(false);
    this.props.navigation.navigate('Barcodechangeprice');
  }
  render() {

    return (
      <ScrollView style = {{flex : 1,backgroundColor : '#fff'}}>
      <View style={styles.MainContainer}>
        <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Change Price</Text>
        </View>
        <View style={styles.logocontainer}>
        <View style = {{width : '40%'}}>
          <Text style={styles.setTextSize}>Item Name</Text>
          </View>
          <View style = {{width : '60%'}}>
          <TextInput
            //  value={this.saveNPLItemDetails}
            editable={false}
            style={styles.input}
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.item}
          >
          </TextInput>
          </View>
        </View>
        <View style={styles.logocontainer}>
        <View style = {{width : '40%'}}>
          <Text style={styles.setTextSize}>Cost</Text>
          </View>
          <View style = {{width : '60%'}}>
          <TextInput
            editable={false}
            style={styles.input}
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.cost}
          >
          </TextInput>
          </View>
        </View>
        <View style={styles.logocontainer}>
        <View style = {{width : '40%'}}>
          <Text style={styles.setTextSize}>QOH</Text>
          </View>
          <View style = {{width : '60%'}}>
          <TextInput
            editable={false}
            style={styles.input}
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.qoh}
          >
          </TextInput>
          </View>
        </View>
        <View style={styles.logocontainer}>
        <View style = {{width : '40%'}}>
          <Text style={styles.setTextSize}>Price</Text>
          </View>
          <View style = {{width : '60%'}}>
          <TextInput
            style={styles.input1}
            value={this.state.salesPrice}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={salesPrice => this.setState({ salesPrice },this.grossprofit)}
            autoCorrect={false}
          >
          </TextInput>
          </View>
        </View>

        <View style={styles.logocontainer}>
        <View style = {{width : '40%'}}>
          <Text style={styles.setTextSize}>Gross profit</Text>
          </View>
          <View style = {{width : '60%'}}>
          <TextInput
            style={styles.input1}
            value={this.state.grossvalue}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            keyboardType="numeric"
            autoCapitalize="none"
            //onChangeText={salesPrice => this.setState({ salesPrice })}
            autoCorrect={false}
          >
          </TextInput>
          </View>
        </View>
        <View style={styles.btncontainerr}>
          <TouchableOpacity style={styles.btncontainer} onPress={this.saveNPLItemDetails}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btncontainer} onPress={this.cancelBtnPress}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Loading ref="loading" />
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  logocontainer: {
    marginTop: 0,
    marginBottom: 3,
    marginLeft: 10,
    flexDirection: 'row',
  },

  btncontainerr: {
  
    marginLeft: 50,
    flexDirection: 'row',
  },

  MainContainer:
  {
    flex: 1,
    backgroundColor: '#fff',
  },
  setTextSize: {
    fontSize : 18,
    fontWeight : '300',
     color: "#286fb7",
   },

   input: {
    //width: 250,
    alignSelf : "stretch",
    height : 40,
    backgroundColor : '#ccc',
   
    marginEnd : 10,
    borderRadius : 3,
    borderRightWidth: 1, 
    borderRightColor: '#636466',
    borderLeftWidth: 1, 
    borderLeftColor: '#636466',
    borderTopWidth: 1, 
    borderTopColor: '#636466',
    borderBottomWidth: 1, 
    borderBottomColor: '#636466',
   
    marginBottom : 10,
    color : '#000',
    fontSize : 15,
    paddingHorizontal : 20,
  },
  input1: {
    alignSelf : "stretch",
    height : 40,
   
   
    marginEnd : 10,
    borderRadius : 3,
    borderRightWidth: 1, 
    borderRightColor: '#636466',
    borderLeftWidth: 1, 
    borderLeftColor: '#636466',
    borderTopWidth: 1, 
    borderTopColor: '#636466',
    borderBottomWidth: 1, 
    borderBottomColor: '#636466',
   
    marginBottom : 10,
    color : '#000',
    fontSize : 15,
    paddingHorizontal : 20,

  },
  btncontainer: {
    
    backgroundColor: '#f15a2c',
    paddingVertical: 15,
    borderRadius: 10,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    width: "30%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  btnText: {
    // marginLeft: 10,
    fontSize: 20,
    color: '#fff',
    alignItems: 'center'

  },
})