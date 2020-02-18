import    React, {Component} from 'react';
import { 
          AsyncStorage,
          Platform, 
          StyleSheet, 
          Text, 
          View,
          TouchableOpacity,
          Image, ScrollView }from 'react-native';
import { 
          Table, 
          TableWrapper, 
          Row, 
          Rows }             from 'react-native-table-component';
import    FontAwesome        from 'react-native-vector-icons/FontAwesome';
import    DatePicker         from 'react-native-datepicker'
import Loading from 'react-native-whc-loading'


export default class Sales extends Component {
  constructor(props){
    super(props)
    this.state = {date:new Date()}
  }

  getReportData = (date) => {
    this.setState({date: date})
    this.refs.loading.show();
    //AsyncStorage.setItem("Sid","1097");
    AsyncStorage.getItem("Sid").then(data => {
      if (data) {
        // alert("trew")
        STORE_ID = data; 
        API_URL = `https://portal.albertapayments.com/api/geteoddetail_new?sid=${data}&date=${date}`;
        return fetch(API_URL)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson)
            this.refs.loading.show(false);
            this.setState({EOD_TITLE: responseJson.eod_report_title});
            this.setState({EOD_DATA: responseJson.eod_report_data});

            this.setState({EOD_TITLE1: responseJson.hourly_sales_table_head});
            this.setState({EOD_DATA1: responseJson.hourly_sales_table_data});

            this.setState({EOD_TITLE2: responseJson.sales_by_vendor_table_head});
            this.setState({EOD_DATA2: responseJson.sales_by_vendor_table_data});

            this.setState({EOD_TITLE3: responseJson.sales_by_department_table_head});
            this.setState({EOD_DATA3: responseJson.sales_by_department_table_data});
          })
          
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

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

  Nextscreen =() =>{
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <ScrollView >
      <View style = {{backgroundColor : '#fff'}}>
        <View style={{width: "50%",}}>
        <DatePicker
        style={{width: 200,marginTop: 20}}
        date={this.state.date}
        mode="date"
         placeholder="select date"
         format="MM-DD-YYYY"
         //format="YYYY-DD-MM"
        // minDate="2016-05-01"
        // maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.getReportData(date)}}
      />
        </View>
       
        <View style={styles.table}>
        
      
      <View style = {{backgroundColor : '#fff'}}>
            <Text style={{textAlign:'center',color:'#3386D6', fontSize:20, fontWeight:'bold'}}>Daily Report</Text>
          </View>
        <Table 
           borderStyle={{borderWidth: 3, borderColor: '#ccc',height : 2000}}>
          <Row data={this.state.EOD_TITLE} style={styles.head} textStyle={styles.headText}/>
          <Rows data={this.state.EOD_DATA} textStyle={styles.text}/>

          <Row data={this.state.EOD_TITLE3} style={styles.head} textStyle={styles.headText}/>
          <Rows data={this.state.EOD_DATA3} textStyle={styles.text}/> 

          <Row data={this.state.EOD_TITLE2} style={styles.head} textStyle={styles.headText}/>
          <Rows data={this.state.EOD_DATA2} textStyle={styles.text}/>
          

          <Row data={this.state.EOD_TITLE1} style={styles.head} textStyle={styles.headText}/>
          <Rows data={this.state.EOD_DATA1} textStyle={styles.text}/>

         

         

          
          
          </Table>

      
      </View>
      <Loading ref="loading"/>
    
      </View> 
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  headText : {color:"white", fontSize : 16, textAlign:"center", fontWeight : 'bold'},
  head: { height: 40, backgroundColor: '#3386D6'},
  text: { margin: 6, fontSize : 14, textAlign:'left', color:'#3386D6' },
  table:{
    height :'2000%',
  
    
    backgroundColor:'#ffff'
  }
});
