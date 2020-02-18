import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,AsyncStorage,
  BackHandler} from 'react-native';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { CheckBox } from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';


export default class BarcodeSettings extends Component {

  constructor()
  {
    super();

    this.state = { 
     
      UPCAR: false,
      UPCAL: false,

      UPCER: false,
      UPCEL: false,

      CODE128R: false,
      CODE128L: false,

      CODE39R : false,
      CODE39L : false,

      EAN13R: false,
      EAN13L : false,

      EAN8R : false,
      EAN8L : false,

      UAUE : false,
      UEUA : false,

      
      
    }
  }

  componentDidMount()
  {
    AsyncStorage.getItem('UPCAR').then(
      UPCAR => {
        if(UPCAR)
        {
          this.setState({
            UPCAR : true
          })
        } 
    })

    AsyncStorage.getItem('UPCAL').then(
      UPCAL => {
        if(UPCAL)
        {
          this.setState({
            UPCAL : true
          })
        } 
    })

    AsyncStorage.getItem('UPCER').then(
      UPCER => {
        if(UPCER)
        {
          this.setState({
            UPCER : true
          })
        } 
    })

    AsyncStorage.getItem('UPCEL').then(
      UPCEL => {
        if(UPCEL)
        {
          this.setState({
            UPCEL : true
          })
        } 
    })
    AsyncStorage.getItem('UAUE').then(
      UAUE => {
        if(UAUE)
        {
          this.setState({
            UAUE : true
          })
        } 
    })

    AsyncStorage.getItem('UEUA').then(
      UEUA => {
        if(UEUA)
        {
          this.setState({
            UEUA : true
          })
        } 
    })
  }
 
  static navigationOptions ={
    headerTitle: ( 
    <View style={{ flex: 1, alignItems: "center" ,marginStart : 20}}> 
    <Image source={require('../images/poslogo.jpg')} 
    style={{ height: 105,
      width: 105,marginRight: 20,resizeMode: 'contain'}} /> 
    </View> 
    ),
    // headerRight: (<View style = {{marginRight: 20}}>
    // <FontAwesome name="bell" size={25} color="#16a0db"/></View>)
  }

  Nextscreen =() =>{

    // AsyncStorage.setItem("UPCAR",this.state.UPCAR)
   
  }

  componentWillUnmount(){
    
    AsyncStorage.removeItem("UPCAL")
    AsyncStorage.removeItem("UPCAR")
    AsyncStorage.removeItem("UPCEL")
    AsyncStorage.removeItem("UPCER")
    AsyncStorage.removeItem("UAUE")
    AsyncStorage.removeItem("UEUA")
    

    if(this.state.UPCAL)
    {
      AsyncStorage.setItem("UPCAL","1")
    }

    if(this.state.UPCAR)
    {
      AsyncStorage.setItem("UPCAR","1")
    }

       
    if(this.state.UPCEL)
    {
      AsyncStorage.setItem("UPCEL","1")
    }
    
    if(this.state.UPCER)
    {
      AsyncStorage.setItem("UPCER","1")
    }

     
    if(this.state.UAUE)
    {
      AsyncStorage.setItem("UAUE","1")
    }

    if(this.state.UEUA)
    {
      AsyncStorage.setItem("UEUA","1")
    }
 
   
  
 
    this.props.navigation.navigate('Home')
  }

  


  render() {
    return (
      <ScrollView style ={{flex : 1,backgroundColor : '#fff'}}>
     
      <View style={styles.container}>

        <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Barcode Settings</Text>
        </View>

      <View style = {styles.content}>
      
        <Text style = {{fontSize : 20,fontWeight : '600', marginStart : 10}}>UPCA</Text>
        <View style = {{flexDirection: 'row'}}> 
        
         <CheckBox
       
          checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
          uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
          title = 'Remove 1st Digit'
          checked={this.state.UPCAL}
          onPress={() => this.setState({ UPCAL: !this.state.UPCAL })}/>
         {/* <Text style={{marginTop: 5}}> Remove 1st Digit </Text> */}

         <CheckBox
           checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
           uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
           title = ' Remove last Digit'
            checked={this.state.UPCAR}
            onPress={() => this.setState({ UPCAR: !this.state.UPCAR })}/>
         {/* <Text style={{marginTop: 5}}> Remove last Digit </Text> */}

        </View>
        </View>


        <View style = {styles.content}>
      
        <Text style = {{fontSize : 20,fontWeight : '600',marginStart : 10}}>UPCE</Text>
        <View style = {{flexDirection: 'row'}}> 
       

         <CheckBox
           checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
           uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
           title = ' Remove 1st Digit'
        checked={this.state.UPCEL}
        onPress={() => this.setState({ UPCEL: !this.state.UPCEL })}/>
         {/* <Text style={{marginTop: 5}}> Remove 1st Digit </Text> */}

         <CheckBox
          checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
          uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
          title = ' Remove last Digit'
         
        checked={this.state.UPCER}
        onPress={() => this.setState({ UPCER: !this.state.UPCER })}/>
         {/* <Text style={{marginTop: 5}}> Remove last Digit </Text> */}
        </View>
        </View>

        <View style = {styles.content}>
      
      <Text style = {{fontSize : 20,fontWeight : '600',marginStart : 10}}>CODE128</Text>
      <View style = {{flexDirection: 'row'}}> 
      
       <CheckBox
         checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
         uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
         title = ' Remove 1st Digit'
      checked={this.state.CODE128R}
      onPress={() => this.setState({ CODE128R: !this.state.CODE128R })}/>
       {/* <Text style={{marginTop: 5}}> Remove 1st Digit </Text> */}

       <CheckBox
        checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
        uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
        title = ' Remove last Digit'
      checked={this.state.CODE128L}
      onPress={() => this.setState({ CODE128L: !this.state.CODE128L})}/>
       {/* <Text style={{marginTop: 5}}> Remove last Digit </Text> */}

      </View>
      </View>

      <View style = {styles.content}>
      
      <Text  style = {{fontSize : 20,fontWeight : '600',marginStart : 10}}>CODE39</Text>
      <View style = {{flexDirection: 'row'}}> 
      
       <CheckBox
         checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
         uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
         title = ' Remove 1st Digit'
      checked={this.state.CODE39R}
      onPress={() => this.setState({ CODE39R: !this.state.CODE39R })}/>
       {/* <Text style={{marginTop: 5}}> Remove 1st Digit </Text> */}

       <CheckBox
        checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
        uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
        title = ' Remove last Digit'
      checked={this.state.CODE39L}
      onPress={() => this.setState({ CODE39L: !this.state.CODE39L})}/>
       {/* <Text style={{marginTop: 5}}> Remove last Digit </Text> */}

      </View>
      </View>

      <View style = {styles.content}>
      
      <Text  style = {{fontSize : 20,fontWeight : '600',marginStart : 10}}>EAN13</Text>
      <View style = {{flexDirection: 'row'}}> 
      
       <CheckBox
         checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
         uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
         title = ' Remove 1st Digit'
      checked={this.state.EAN13R}
      onPress={() => this.setState({ EAN13R: !this.state.EAN13R })}/>
       {/* <Text style={{marginTop: 5}}> Remove 1st Digit </Text> */}

       <CheckBox

       checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
       uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
       title = ' Remove last Digit'
      checked={this.state.EAN13L}
      onPress={() => this.setState({ EAN13L: !this.state.EAN13L})}/>
       {/* <Text style={{marginTop: 5}}> Remove last Digit </Text> */}

      </View>
      </View>

      <View style = {styles.content}>
      
      <Text  style = {{fontSize : 20,fontWeight : '600',marginStart : 10}}>EAN8</Text>
      <View style = {{flexDirection: 'row'}}> 
      
       <CheckBox
         checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
         uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
         title = ' Remove 1st Digit'
      checked={this.state.EAN8R}
      onPress={() => this.setState({ EAN8R: !this.state.EAN8R })}/>
       {/* <Text style={{marginTop: 5}}> Remove 1st Digit </Text> */}

       <CheckBox
        checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
        uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
        title = ' Remove last Digit'
      checked={this.state.EAN8L}
      onPress={() => this.setState({ EAN8L: !this.state.EAN8L})}/>
       {/* <Text style={{marginTop: 5}}> Remove last Digit </Text> */}

      </View >

      <View style ={{flex : 1,marginTop : 20}}>

      <Text  style = {{fontSize : 20,fontWeight : '600',marginStart : 10}}>UPCA-TO-UPCE</Text>
      <View style = {{flexDirection: 'row'}}> 
      
       <CheckBox
        checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
        uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
        title='Convert'
        checked={this.state.UAUE}
        onPress={() => this.setState({ UAUE: !this.state.UAUE })}/>
       {/* <Text style={{marginTop: 5}}> Convert </Text> */}
       </View>

       <View style ={{flex : 1,marginTop : 20}}>

      <Text  style = {{fontSize : 20,fontWeight : '600',marginStart : 10}}>UPCE-TO-UPCA</Text>
      <View style = {{flexDirection: 'row'}}> 
      
      <CheckBox
        checkedIcon={<Entypo name="checksquare" size={20} color="#f15a2c"></Entypo>}
        uncheckedIcon={<FontAwesome name="square-o" size={20} color="#636466" />}
        title='Convert'
        checked={this.state.UEUA}
        onPress={() => this.setState({ UEUA: !this.state.UEUA })}/>
       {/* <Text style={{marginTop: 5}}> Convert </Text> */}
       
       </View>
       </View>


      <View>

      </View>
      </View>


   </View>
   

  </View>
  </ScrollView>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin : 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content:{
    flex : 1,
    // alignContent : 'stretch',
    // alignItems : 'stretch',
    width : '100%',
    marginEnd : 20,
    borderBottomWidth : 2,
    borderBottomColor : '#696161',
    marginBottom : 20

  },
  btncontainer: {
    backgroundColor : '#f15a2c',
    borderRadius : 10,
     height : 40,
     width : "30%",
     alignItems : 'center',
     justifyContent : 'center'
     
 },
 
   btntext:{
     textAlign : 'center',
     fontSize : 20,
     alignItems : 'center',
     color : '#fff',
   },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  backgroundColor : '#068AD6'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
