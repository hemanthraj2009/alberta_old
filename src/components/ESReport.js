import    React, {Component} from 'react';
import { 
          Platform, 
          StyleSheet, 
          Text, 
          View,
          TouchableOpacity,
          Image, ScrollView, AsyncStorage}           from 'react-native';

import    FontAwesome        from 'react-native-vector-icons/FontAwesome';
import    DatePicker         from 'react-native-datepicker'
import    { Dropdown }       from 'react-native-material-dropdown';
import Loading from 'react-native-whc-loading'
import { Cell, Section, TableView, CustomSectionHeader } from "react-native-tableview-simple";





export default class Sales extends Component {

  constructor(props){
    super(props)
    
    this.state = {
      date:new Date(),
      SalesTotal: [],
      TenderTotal: [],
      salesData: [],
      salesnottaxed : '',
      salestaxed : '',
      grandtotal : '',
      salesexcluding : '',
      taxes : '',
      liability : '',
      openingcash : '',
      cashsales : '',
      cashpaidout : '',
      cashpickup : '',
      expectedcash : '',
      actualcash : '',
      cashover : '',
      Coupon : '',
      CashDetails : '',
      CashDetailValue : '',
      batch:'',
      addcash : ''

     
    }
    this.batchData = null
    
  }

  

  static navigationOptions = ({ navigate, navigation }) => ({
    headerTitle: ( 
        <View style={{ flex: 1, alignItems: "center" ,marginStart : 20}}> 
        <Image source={require('../images/poslogo.jpg')} 
        style={{height: 105,
          width: 105,marginRight: 20,resizeMode: 'contain'}} /> 
        </View> 
        ),
        headerRight: (<View style={{ marginRight: 20 }}>
        </View>)
  })

  Nextscreen =() =>{
    this.props.navigation.navigate('Dashboard');
  }

  componentDidMount(){

    this.setState({visibleDetails:false})
    
  }

  getReportData = (batchID) => {
   
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (batchID) {
       
        this.setState({batch :batchID })  
        //API_URL = ESReport + `sid=${SID}&batchid=${batchID}&token=${data}`;
        API_URL = `https://portal.albertapayments.com/api/admin/zreport_new?sid=${SID}&batchid=${batchID}&token=${data}`;
         
        //return fetch(`https://devportal.albertapayments.com/api/admin/zreport?sid=${SID}&batchid=${batchID}&token=${data}`)
        return fetch(API_URL)
          
        .then((response) => response.json())
        .then((responseJson) => {
        
            console.log("cashdetailsss "+ responseJson)
            this.setState({
              visibleDetails:true,
              Coupon: responseJson.Coupon,
              Cashover : responseJson.Cashover,
            
              TenderTotal : responseJson.TenderTotal,

                salesnottaxed:responseJson.SalesTotal[0].NNONTAXABLETOTAL,
                salestaxed :responseJson.SalesTotal[0].NTAXABLETOTAL,
                grandtotal  :responseJson.SalesTotal[0].NSUBTOTAL,
                salesexcluding   :responseJson.SalesTotal[0].NNETTOAL,
                taxes : responseJson.SalesTotal[0].NTAXTOTAL,
                liability:responseJson.SalesTotal[0].NTOTALLOTTERY,
                oftransaction :responseJson.OfTransaction[0].Tot,
                avgtransaction :responseJson.AvgTranscation,
                openingcash :responseJson.OpeningCash[0].NOpeningBalance,
                cashsales :responseJson.CashSale,
                cashpaidout :responseJson.Cashpaidout[0].nAmount,
                cashpickup:responseJson.Cashpickup[0].NAMOUNT,
                expectedcash :responseJson.ExpectedCash,
                actualcash :responseJson.Cashactual,
                CashDetails :responseJson.CashDetail,
                CashDetailValue :responseJson.CashDetailValue,
                addcash : responseJson.addcash
            
            },);

            
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  })
  }

  getBatches = (date) => {
    this.refs.loading.show();
    this.setState({date: date})

    // AsyncStorage.setItem("Sid","1097");
    AsyncStorage.getItem("Sid").then(data => {
      if (data) {
        STORE_ID = data;
        API_URL = `https://portal.albertapayments.com/api/getbatches?date=${date}&sid=${data}`;
      fetch(API_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sid: STORE_ID,
            date: this.state.date,
          
          }),
        }).then(response => response.json())
          .then(responseJson => {
            this.refs.loading.show(false);
            if(responseJson)
           
            {
           
              this.setState(
                {
                  isLoading: false,
                  batchData:responseJson
                },
                
              );
            }
            else{
              alert("No Batches Available!")
            }
              
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

  render() {

    if(!this.state.visibleDetails)
    {
      return (
        <ScrollView>

          <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>End of Shift Report</Text>
          </View>
  
          <View style={{flex:1,flexDirection: "row",width:"100%"}}>
          <View style={{width: "50%"}}>
            <DatePicker
              style={{width: "90%",paddingTop:20}}
              date={this.state.date}
              mode="date"
              androidMode = "spinner"
              placeholder="select date"
              format="MM-DD-YYYY"
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
              onDateChange={(date) => {this.getBatches(date)}}
            />
          </View>
          <View style={{width: "50%"}}>
            <Dropdown
            style={{width: "80%"}}
              label='Select Batch'
              data={this.state.batchData}
              onChangeText={(value) => {
  
                this.getReportData(value);
                //alert(value)
              }}
  
              // onChangeText= function({}) {this.getReportData(this.selectedIndex)}
              // propsExtractor={({ props }, index) => props}
            />
          </View>
        </View>
      
        <Loading ref="loading"/>
        </ScrollView> 
      );
    }
    else
    {
      return (
        <ScrollView>
  
          <View style={{flex:1,flexDirection: "row",width:"100%"}}>
          <View style={{width: "50%"}}>
            <DatePicker
              style={{width: "90%",paddingTop:20}}
              date={this.state.date}
              mode="date"
              androidMode = "spinner"
              placeholder="select date"
              format="MM-DD-YYYY"
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
              onDateChange={(date) => {this.getBatches(date)}}
            />
          </View>
          <View style={{width: "50%"}}>
            <Dropdown
            style={{width: "80%"}}
              label='Select Batch'
              data={this.state.batchData}
              onChangeText={(value) => {
  
                this.getReportData(value);
                //alert(value)
              }}
  
              // onChangeText= function({}) {this.getReportData(this.selectedIndex)}
              // propsExtractor={({ props }, index) => props}
            />
          </View>
        </View>
        <ScrollView style={styles.table}>
        <TableView >

          <Text style = {{fontSize : 15,fontWeight : '600',alignItems : 'center'}}>Batch :{this.state.batch}</Text>
  
            <Section header="SALES DETAILS" headerTextColor="#3386D6">
              <Cell cellStyle="RightDetail" title="SALES (excluding Tax)" detail={<Text>${this.state.salesexcluding}</Text>}/>
              <Cell cellStyle="RightDetail" title="SALES TAXED" detail={<Text>${this.state.salestaxed}</Text>}/>
              <Cell cellStyle="RightDetail" title="SALES-NOT TAXED" detail={<Text>${this.state.salesnottaxed}</Text>}/>
              <Cell cellStyle="RightDetail" title="TAXES" detail={<Text>${this.state.taxes}</Text>}/> 
              <Cell cellStyle="RightDetail" title="LIABILITY SALES" detail={<Text>${this.state.liability}</Text>}/>
              <Cell cellStyle="RightDetail" title="GRAND TOTAL" detail={<Text>${this.state.grandtotal}</Text>}/>
            </Section>
  
            <Section header="TENDER TOTAL" headerTextColor="#3386D6">
                          {this.state.TenderTotal.map((item, key) => (
                         
                          <Cell cellStyle="RightDetail" title={<Text style = {{textTransform : 'uppercase'}}>{item.vtendername}</Text>} detail={<Text>${item.Amount}</Text> }></Cell>
                          ))
                          }
                          <Cell cellStyle="RightDetail" title="COUPON" detail={this.state.Coupon}/>
            </Section>
  
            <Section header="PERFORMANCE STATISTICS" headerTextColor="#3386D6">
            <Cell cellStyle="RightDetail" title="# OF TRANSACTIONS" detail={this.state.oftransaction}/>
            <Cell cellStyle="RightDetail" title="# AVG TRANSACTIONS" detail={<Text>${this.state.avgtransaction}</Text>}/>
          
        </Section>
  
        <Section header="CASH COUNT" headerTextColor="#3386D6">
        <Cell cellStyle="RightDetail" title="OPENING CASH" detail={<Text>${this.state.openingcash}</Text>}/>
        <Cell cellStyle="RightDetail" title="+ CASH SALES" detail={<Text>${this.state.cashsales}</Text>}/>
        <Cell cellStyle="RightDetail" title="+ CASH ADD" detail={<Text>${this.state.addcash}</Text>}/>
        <Cell cellStyle="RightDetail" title="- CASH PAIDOUT" detail={<Text>${this.state.cashpaidout}</Text>}/>
        <Cell cellStyle="RightDetail" title="- CASH PICKUP" detail={<Text>${this.state.cashpickup}</Text>}/>
        <Cell cellStyle="RightDetail" title="EXPECTED CASH" detail={<Text>${this.state.expectedcash}</Text>}/>
        <Cell cellStyle="RightDetail" title="ACTUAL CASH" detail={<Text>${this.state.actualcash}</Text>}/>
        <Cell cellStyle="RightDetail" title={<Text style = {{textTransform : 'uppercase'}}>{this.state.CashDetails}</Text>} detail={<Text>${this.state.CashDetailValue}</Text>}/>
        
        {/* {this.state.CashDetails.map(( key,value) => (
          
  
                         
                         <Cell cellStyle="RightDetail" title={key} detail={<Text>${value}</Text> }>
                         </Cell>
                         ))
                         } */}
        {/* <Cell cellStyle="RightDetail" title="CASH OVER" detail={this.state.cashover}/> */}
  
      
    </Section>
  
           
  
  
            
  
        </TableView>
  
        
  
  
        
        </ScrollView>
        <Loading ref="loading"/>
        </ScrollView> 
      );
    }
    
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
    paddingTop : 10,
    paddingLeft : 10,
    paddingRight : 10,
    paddingBottom : 20, 
    backgroundColor:'#ffff'
  }
});
