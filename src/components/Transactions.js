import React, { Component } from 'react';
 
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, 
  Alert,AsyncStorage,Image,TouchableOpacity ,TouchableHighlight,} from 'react-native';
  import FontAwesome  from 'react-native-vector-icons/FontAwesome';
  import Loading from 'react-native-whc-loading'
import CardView from 'react-native-cardview';
//import { TouchableHighlight } from 'react-native-gesture-handler';
  
 
export default class MyProject extends Component {

  static navigationOptions = ({ navigate, navigation }) => ({
    headerTitle: ( 
        <View style={{ flex: 1, alignItems: "center" ,marginStart : 20}}> 
        <Image source={require('../images/poslogo.jpg')} 
        style={{ height: 105,
          width: 105 ,marginRight: 20,resizeMode: 'contain'}} /> 
        </View> 
        ),
    headerRight: (<View style={{ marginRight: 20 }}>
      
    </View>)
  })
 
  constructor(props) {
 
    super(props);
 
    this.state = {
 
      isLoading: true,
      text: '',
      num : ''
    
    }
 
    this.arrayholder = [] ;
  }
 
  componentDidMount() {
    //this.timer = setInterval(()=> this.loginWithToken(), 1000)
    AsyncStorage.getItem('Sid').then((SID) => {
      if (SID) {
        STORE_ID = SID
       
        //API_URL = current25_Transactions + STORE_ID ;
      return fetch(`https://portal.albertapayments.com/api/current25transactions/${STORE_ID}`)
      
      .then((response) => response.json())
      .then((responseJson) => {
        //this.refs.loading.show(false);
       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.table_data),
        }, function() {
 
          // In this block you can do something with new state.
          this.arrayholder = responseJson.table_data;
 
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }})
      
  }
 
  GetListViewItem (SalesId) {
    
  //  alert(SalesId);
   AsyncStorage.setItem('SalesId',JSON.stringify(SalesId));
   
   //alert(tax)
   //getReactNativeHost().getReactInstanceManager().getDevSupportManager().handleReloadJS();
  this.props.navigation.navigate('Transcationdetails');
  
  }
  
//    SearchFilterFunction(text){

//     // alert(text);
    
     
//      const newData = this.arrayholder.filter(function(item){

         
      
//       //   const itemData = item.name;
//       //   const textData = text
//       //   return itemData.indexOf(textData) > -1

//       // }

//       const searchItem = item.SID.toString() + item.name;
//       return searchItem.indexOf(text) > -1;
  
//      })
//      this.setState({
//          dataSource: this.state.dataSource.cloneWithRows(newData),
//          text: text,
//          //number: number
//      })
//  }
 
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
      <View style = {{flex :1,backgroundColor : '#fff'}}>

      {/* <View style = {{marginTop : 10,marginLeft : 280,}}>
      <TouchableOpacity onPress = {()=>this.props.navigation.navigate('TransactionFilter')}>
      <View style = {{flexDirection : 'row'}}>
      <Text style = {{fontSize : 20,color: '#3386D6'}}>Filter</Text>
      <FontAwesome name = 'filter' color = '#3386D6' size = {30}></FontAwesome>
     
      </View>
      </TouchableOpacity>
      </View> */}
 
      <View style={styles.MainContainer}>
      <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Transactions</Text>
          </View>

        <View style={styles.rowViewContainer}>
        <View flexDirection = 'row' marginTop = '5%'> 
          
          <View style = {{ width : '60%', alignItems : 'center',justifyContent : 'center',
          backgroundColor: "#3386D6",height : 40}}>
          <Text style ={{fontWeight : '300',fontSize : 18,color : '#fff'}}>Date
           </Text>
           </View>
           <View style = {{ width : '40%', alignItems : 'center',justifyContent : 'center', 
           backgroundColor: "#3386D6", height : 40,}}>
           <Text style ={{fontWeight : '300',fontSize : 18,color : '#fff'}}>Sales Amt ($)
           </Text>
           </View>
           </View>
           </View>
       
 
        <ListView
          dataSource={this.state.dataSource}

         // renderSeparator= {this.ListViewItemSeparator}
 
          renderRow={(rowData) => 
            <View style={styles.ViewContainer}>
             <TouchableHighlight underlayColor='gray'
              onPress={this.GetListViewItem.bind(this,rowData.SalesId,)}>
            <CardView
             cardElevation={3}
             cardMaxElevation={1}
             cornerRadius={0}
             style={styles.cardd}>
            
             <View flexDirection = 'row'> 
            
             <View style = {{ width : '60%', alignItems : 'center',height : 40,}}>
             <View style = {{ flexDirection : 'column'}}>
             <Text style ={{color : '#000',fontWeight : '300',fontSize : 15}}>Id:{rowData.SalesId}</Text>
             <Text style ={{color : '#000',fontWeight : '300',fontSize : 15}}>{rowData.Date}</Text>
             </View>
              </View>
              <View style = {{ width : '40%', alignItems : 'center',height : 40,}}>
              <Text style ={{color : '#000',fontWeight : '300',fontSize : 15,}}>{rowData.SaleAmount}
              </Text>
              </View>
              </View>
             </CardView>
             </TouchableHighlight>
            </View>
            
           
         
          }
         
 
          enableEmptySections={true}
 
          //style={{marginTop: 10}}
 
        />
       
         <Loading/>
 
      </View>
      </View>
      
    );
  }
}
 
const styles = StyleSheet.create({
 
 MainContainer :{
 
  justifyContent: 'center',
  flex:1,
  marginTop: 0,
  backgroundColor : '#fff'
 
  },
 
 rowViewContainer: {
   fontSize: 17,
   paddingBottom: 5
  },
  ViewContainer: {
    flex : 1,
    fontSize: 17,
    paddingBottom: 1
   },
 
  TextInputStyleClass:{
  textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#f2f2f2"
        
   },
   cardd: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height : 50,
    marginTop : 0,
   
    width : '100%',
    
  },
 
});