import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, ScrollView, value, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import Loading from 'react-native-whc-loading'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class UpdateQuantity extends React.Component {

  static navigationOptions = ({ navigate, navigation }) => ({
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
        <Image source={require('../images/poslogo.jpg')}
          style={{ height: 105,
            width: 105, marginRight: 40, resizeMode: 'contain' }} />
      </View>
    ),
    // headerRight: <TouchableOpacity onPress={() => { navigation.navigate('Notifications'); }}>
    //   <FontAwesome name="bell" size={25} color="#16a0db" /></TouchableOpacity>,
  })


  constructor() {
    super();
    this.state = {

      check: true,
      item: "",
      cost: "",
      qoh: "",
      salesPrice: "",
      barCodeNumber: "",
      bar : ""

    }

  }




  componentDidMount() {

  //   const item = this.props.navigation.getParam('item');
  //   // alert(item)

  //   this.setState({ item: item })

  //   const cost = this.props.navigation.getParam('cost')

  //   this.setState({ cost: cost })

  //   const qoh = this.props.navigation.getParam('qoh')

  //   this.setState({ qoh: qoh })

  //  //alert(qoh)

  //   const salesPrice = this.props.navigation.getParam('sale')

  //   this.setState({ salesPrice: salesPrice })

    AsyncStorage.getItem('vitemname').then((vitemname) => { 
      if(vitemname){
        //alert(datastore)
        this.setState({item:vitemname})
        
      }

    })
    
    AsyncStorage.getItem('costPrice').then((costPrice) => { 
      if(costPrice){
       this.setState({cost:costPrice})
      }

    })

    AsyncStorage.getItem('QOHData').then((QOHData) => { 
      if(QOHData){
       this.setState({qoh:QOHData})
       //alert(datatax)
      }

    })

    AsyncStorage.getItem('SalesPriceData').then((SalesPriceData) => { 
      if(SalesPriceData){
       this.setState({salesPrice:SalesPriceData})
       //alert(datatax)
      }

    })
    AsyncStorage.getItem('barcodeData').then((barcodeData) => { 
      if(barcodeData){
       this.setState({barCodeNumber:barcodeData})
       //alert(datatax)
      }
    })





  }

  saveNPLItemDetails = () => {

    



    // const barCodeNumber = this.props.navigation.getParam('barcodePassValue')

    // this.setState({ barCodeNumber: barCodeNumber })

     //alert(barcodePassValue)

    AsyncStorage.getItem('token').then((data) => {

      AsyncStorage.getItem('Sid').then((SID) => {





        if (data) {

          //   alert(data)
          this.refs.loading.show();
          fetch(`https://portal.albertapayments.com/api/admin/updateQuantityBySKU?token=${encodeURIComponent(data)}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sku: this.state.barCodeNumber,
              sid: SID,
              qty: this.state.qoh,

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



    // alert('Under development')

  }
  cancelBtnPress = () => {
   // var bar = this.state.barCodeNumber
     AsyncStorage.removeItem('barcodeData')
    //alert(this.state.barCodeNumber)
    this.props.navigation.navigate('Barcodeupdateqty')
    // {
    //   barcodePassValue: bar
     
    // })
    // alert(bar)
    
       

  }


  render() {


    return (
      <ScrollView style = {{ flex : 1, backgroundColor : '#fff'}}> 



      <View style={styles.MainContainer}>

        <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Update Qunantity</Text>
        </View>


        <View style={styles.logocontainer}>


        <View style = {{width : '40%'}}>

          <Text style={styles.setTextSize}>Item Name</Text>
          </View>
          <View style = {{width : '60%'}}>

          <TextInput
            value={this.state.item}
            editable={false}
            style={styles.input}
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}

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
            style={styles.input}
            value={this.state.cost}
            editable={false}

            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
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
            style={styles.input}


            value={this.state.salesPrice}
            editable={false}
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
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

            style={styles.input1}
            value={this.state.qoh}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={qoh => this.setState({ qoh })}
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

      </View>
      <Loading ref="loading"/>
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

    // Set content's vertical alignment.
    // justifyContent: 'center',

    // // Set content's horizontal alignment.
    // alignItems: 'center',

    // Set hex color code here.
    backgroundColor: '#fff',

  },
  taxContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    flexDirection: 'row',
  },
  foodContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 0,
    flexDirection: 'row',
  },



  setTextSize: {
    marginTop: 10,
    width: 90,
    height: 50,
    marginLeft: 0,
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'row',
    color: "#286fb7",



  },
  setCheckMark: {

    width: 50,
    height: 50,
    marginLeft: 70
    //  color: 'white'

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