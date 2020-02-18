import React, { Component } from 'react';
 
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, 
  Alert,AsyncStorage,Image,TouchableOpacity ,TouchableHighlight,} from 'react-native';
  import FontAwesome  from 'react-native-vector-icons/FontAwesome';
  import Loading from 'react-native-whc-loading'
import CardView from 'react-native-cardview';
import moment from 'moment-timezone'
//import { TouchableHighlight } from 'react-native-gesture-handler';
  
 
export default class Storetableview extends Component {

  static navigationOptions = ({ navigate, navigation }) => ({
    headerTitle: ( 
        <View style={{ flex: 1, alignItems: "center" ,marginStart : 20}}> 
        <Image source={require('../images/poslogo.jpg')} 
        style={{ height: 105,
          width: 105,marginRight: 20,resizeMode: 'contain'}} /> 
        </View> 
        ),
    headerRight: (<View style={{ marginRight: 20 }}>
      <TouchableOpacity onPress={()=>{ navigation.navigate('Notifications'); }}>
    <FontAwesome name="bell" size={25} color="#16a0db"/></TouchableOpacity></View>)
  })
 
  constructor(props) {
 
    super(props);
 
    this.state = {
 
      isLoading: true,
      text: '',
     
    
    }
 
    this.arrayholder = [] ;
  }
 
  componentDidMount() {
    //this.timer = setInterval(()=> this.loginWithToken(), 1000)
    AsyncStorage.getItem('token').then((data) => {
      if (data) {

        var date = moment()
          .format("MM-DD-YYYY");

      //return fetch(`https://devportal.albertapayments.com/api/me_new_date?token=${encodeURIComponent(data)}`)
      return fetch(API_BASE_URL + `me_new_date?token=${encodeURIComponent(data)}&date=${date}`)
      .then((response) => response.json())
      .then((responseJson) => {
      
        //this.refs.loading.show(false);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.user.stores),
        }, function() {
 
          // In this block you can do something with new state.
          this.arrayholder = responseJson.user.stores;
 
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }})
      
  }
 
  GetListViewItem (name,voids,sales,deletes,SID,tax,paid_out,returns,No_Sales,isnewdatabase) {
    
   //alert(name + voids + sales + deletes);
   AsyncStorage.setItem('Storename', name);
   AsyncStorage.setItem('void', JSON.stringify(voids));
   AsyncStorage.setItem('Sid', JSON.stringify(SID));
   AsyncStorage.setItem('sales', sales);
   AsyncStorage.setItem('delete', JSON.stringify(deletes));
   AsyncStorage.setItem('tax',tax);
   AsyncStorage.setItem('paid_out', paid_out);
   AsyncStorage.setItem('returns', returns);
   AsyncStorage.setItem('No_Sales', No_Sales);
   showcategary = isnewdatabase
   //alert(tax)
   //getReactNativeHost().getReactInstanceManager().getDevSupportManager().handleReloadJS();
   this.props.navigation.navigate('Home');
  
  }


 
  
   SearchFilterFunction(text){

    // alert(text);
    
     
     const newData = this.arrayholder.filter(function(item){

         
      
        // const itemData = item.name.toUpperCase();
        // const textData = text.toUpperCase()
        // return itemData.indexOf(textData) != -1

      

      const searchItem = item.SID.toString() + item.name;
      return searchItem.indexOf(text) > -1;
  
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text,
         //number: number
     })
 }
 
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
 
 
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1,backgroundColor : '#fff',alignItems : 'center',justifyContent : 'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
 
    return (
 
      <View style={styles.MainContainer}>
 
      <TextInput 
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />
        <ListView
          dataSource={this.state.dataSource}
 
         renderSeparator= {this.ListViewItemSeparator}
 
          renderRow={(rowData) => 
            // <TouchableHighlight underlayColor='gray' onPress={this.GetListViewItem.bind(this, rowData.name,
            //   rowData.voids, rowData.sales, rowData.deletes,rowData.SID,rowData.tax,
            //   rowData.paid_out,rowData.returns)}>
           
             <TouchableHighlight underlayColor='gray' onPress={this.GetListViewItem.bind(this,
               rowData.name,rowData.voids, rowData.sales, 
               rowData.deletes,rowData.SID,rowData.tax,rowData.paid_out,rowData.returns,rowData.No_Sales,rowData.isnewdatabase)}> 
              <View style={styles.rowViewContainer}>

             {/* <CardView
             cardElevation={3}
             cardMaxElevation={1}
             cornerRadius={0}
             style={styles.cardd}>  */}
              
             <View flexDirection = 'row'>  
            <Text style ={{color : '#000',fontWeight : '300',fontSize : 15}}>{rowData.name}
             </Text>
             
            
             <Text style ={{color : '#000',fontWeight : '300',fontSize : 15,}}>[{rowData.SID}]
             </Text>
             </View>
            
             {/* </CardView> */}
             </View>
             </TouchableHighlight>
             
             
           
            
         
           
            
           
         
          }
         
 
          enableEmptySections={true}
 
         style={{marginTop: 10}}
 
        />
       
         <Loading/>
 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
 MainContainer :{
  flex:1,
  width : '100%',
  justifyContent: 'center',
 
  backgroundColor : '#fff'
 
  },
 
 rowViewContainer: {
   fontSize: 17,
   alignItems : 'center',
   padding : 10
  },
 
  TextInputStyleClass:{
  textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   marginTop : 10,
   backgroundColor : "#f2f2f2"
        
   },
   cardd: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height : 40,
    marginTop : 0,
   
    width : '100%',
    
  },
 
});