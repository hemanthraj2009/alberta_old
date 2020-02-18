import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,SafeAreaView,Image, ScrollView} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignn from 'react-native-vector-icons/FontAwesome';
import CardView from "react-native-cardview";

export default class DashBoard extends Component {

  myfun =() =>{
    this.props.navigation.navigate('Transations');
  }

  static navigationOptions = {
    Title : 'Home',
    headerTitle: ( 
    <View style={{ flex: 1, alignItems: "center" ,marginStart : 20}}> 
    <Image source={require('../images/poslogo.jpg')} 
    style={{ height: 130, width: 130 ,marginRight: 20,resizeMode: 'contain'}} /> 
    </View> 
    ),
    headerRight: (<View style = {{marginRight: 20}}>
    <AntDesignn name="bell" size={25} color="#16a0db"/></View>)
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      
      <View style ={{alignItems : 'center', padding : 10}}>
        <Text style = {{fontSize : 25,fontWeight : '700',color : '#3386D6' }}>Item DashBoard</Text>
      </View>
        
      <SafeAreaView style={styles.safeAreaView}>

       
       <View flexDirection="row" alignItems = 'center'>
       <CardView
                  cardElevation={4}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
       <LinearGradient colors={['#3386D6', '#3386D6', '#3386D6', '#3386D6','#3386D6']}  
        style={styles.card2}>

            <TouchableOpacity  onPress = {()=>this.props.navigation.navigate('Barcodeadditem')}>
            <View style={{alignItems : 'center',marginTop : 30}}>
            <MaterialIcons name="add-shopping-cart" size={40} color="#f2f2f2"/>
            </View>
            <Text style={styles.text}>Add/Edit Item</Text>
            </TouchableOpacity>
         
            </LinearGradient>
            </CardView>

            <CardView
                  cardElevation={4}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}>
           
            <LinearGradient colors={['#3386D6', '#3386D6', '#3386D6', '#3386D6','#3386D6']} 
            style={styles.card2}>
            
            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Barcodechangeprice')}>
            <View style={{alignItems : 'center',marginTop : 30}}>
            <FontAwesome name="dollar" size={38} color="#f2f2f2"/>
            </View>
              <Text style={styles.text}>Change Price</Text>
              </TouchableOpacity>
         
            </LinearGradient>
            </CardView>
         
          </View>
          
          <View flexDirection="row" marginBottom = {80} alignItems = 'center'>

          <CardView
                  cardElevation={4}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
          
          <LinearGradient colors={['#3386D6', '#3386D6', '#3386D6', '#3386D6','#3386D6']}  
            style={styles.card2}>
           
             <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Barcodeupdateqty')}>
             <View style={{alignItems : 'center', marginTop : 20}}>
             <MaterialIcons name="system-update-alt" size={50} color="#f2f2f2"/>
            </View>
            {/* <Text style={{marginStart : 30,fontSize : 18,fontWeight : '100',color : '#f2f2f2'}}>Update</Text> */}
              <Text style={styles.text}>Update Quantity</Text>
              </TouchableOpacity>
         
            </LinearGradient>
            </CardView>

            <CardView
                  cardElevation={4}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
            <LinearGradient colors={['#3386D6', '#3386D6', '#3386D6', '#3386D6','#3386D6']}  
            style={styles.card2}>
           
             <TouchableOpacity onPress = {()=>this.props.navigation.navigate('BarcodeupdateImg')}>
             <View style={{alignItems : 'center', marginTop : 20}}>
             <MaterialIcons name="system-update-alt" size={50} color="#f2f2f2" style={styles.rotateIcon}/>
            </View>
              <Text style={styles.text}>Upload Picture</Text>
              </TouchableOpacity>
         
            </LinearGradient>
            </CardView>
        
            
          </View>
       
      </SafeAreaView>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop : '40%',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#fff',
  },
  rotateIcon: {
      transform: [{ rotate: '180deg'}]
  },
  animation : {
     alignSelf : 'stretch',
      width : 300,
      height : 0,
    },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems : 'center',
    justifyContent : 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    borderRadius : 3,
    height :" 20%",
    width : "92%",
    marginTop : 10,
  
   },
  card4: {
    backgroundColor: '#e3b432',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    borderTopColor: "blue",
    height : 130,
    width : 300,
    margin: 10
  },
  card1: {
    // backgroundColor: '#16a0db',
    alignItems: 'center',
    borderRadius : 3,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    height : 130,
    width : 300,
    margin: 10
  },
  card2: {
    backgroundColor: '#f15a2c',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    height : 130,
    width : 300,
    
    
  },
  card3: {
    backgroundColor: '#286fb7',
    alignItems: 'center',
    borderTopColor: "blue",
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    height : 130,
    width : 300,
    margin: 10
  },
  cardd: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height : 40,
    marginBottom : 10,
    width : '100%',
    
  },
  container1: {
    flex: 1,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : 10,
  },
  box: {
    backgroundColor: '#fff',
    alignItems: "center",
    borderRadius: 75,
    borderWidth: 2,
    width: 150,
    height: 150,
    marginStart : "35%",
    marginTop :0,
    borderColor: '#fff',
    justifyContent: "center"
  },
  box1: {
    width: 50,
    height: 50,
    alignItems: "flex-end",
    borderRadius:25,
    justifyContent: "flex-end"
  },

  // text: {
  //   color: "#fff",
  //   fontSize : 20
  // },
 storename: {
    marginStart : 18,
    color: "#000",
    marginBottom : 10,
    fontSize: 20,
    marginTop : 0
   },
   text2: {
    fontWeight : '700',
    marginStart : 100,
    color: "green",
    marginBottom : 10,
    fontSize: 25
   },
   te: {
    marginStart : 5,
    color: "#000",
    marginTop : 5,
    fontSize: 20
   },

carddd: {
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  height : 200,
  width : "95%",
  margin : 10
 
},
  anim: {
    flex: 1,
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
  
  img: {
   marginTop : 30,
   marginStart : 10,
  },
  imgg: {
   width : 180,
   height : 120,
   marginStart : "0%",
   alignItems : 'center',
   resizeMode: 'contain'
   },
  img1 : {
   marginStart : 20,
   marginTop : 30,
  },
  text1: {
    color: "#fff",
    fontSize : 15,
  },
  textss: {
    color: "#000",
     marginBottom : 20,
     fontSize: 14,
     marginStart : 5
   },
   texts: {
    color: "#FFF"
  },
  
  text: {
    textAlign: 'center',
    height: 75,
    fontSize : 18,
    fontWeight : '100',
    marginStart : 5,
   
    color : '#f2f2f2'
  },
  
  text3: {
    textAlign: 'center',
    height: 75,
    marginStart : 20,
    marginTop: 50,
    fontSize : 20 
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});