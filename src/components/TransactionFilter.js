import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Image,
  TextInput,
  AsyncStorage,
  ScrollView,
  Keyboard,
  Alert,
  TouchableHighlight
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DatePicker from "react-native-datepicker";
import { Table, Row, Rows } from "react-native-table-component";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import CardView from "react-native-cardview";
import Loading from 'react-native-whc-loading'


var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class TransactionFilter extends Component {
  constructor(props) {
    super(props);

    // this.state = { date: "" };
    this.state = { date1: "" };
    this.state = { fromtime: "" };
    this.state = { totime: "" };
    this.state = { fTime: "" };
    this.state = { tTime: "" };
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    this.setState({date:""})

    this.arrayholder = [];
  }

  GetListViewItem(SalesId) {
   
    AsyncStorage.setItem("SalesId", JSON.stringify(SalesId));
    this.props.navigation.navigate('Transcationdetails');
  }

  static navigationOptions = {
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
        <Image
          source={require("../images/poslogo.jpg")}
          style={{
            height: 105,
                        width: 105,
            marginRight: 60,
            resizeMode: "contain"
          }}
        />
      </View>
    ),
    // headerRight: (
    //   <View style={{ marginRight: 20 }}>
    //     <FontAwesome name="bell" size={25} color="#16a0db" />
    //   </View>
    // )
  };

  submit = () => {
    // const {date} = this.state;
    // alert(this.state.date);
    if(this.state.date == undefined || this.state.date1 == undefined){
      Alert.alert(
                   
        '',
      'Date should not be empty',
        [
          { text: 'OK', },
        ]
      )
   }
   else{
     this.getReportData()
   }
  }



  getReportData = () => {
  
    if(parseInt(this.state.toAmount) < parseInt(this.state.fromAmount))
      {
          alert("End amount Should not be less than start amount.");
          
        return;
      }
  AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(sid => {
        if (sid) {
          if (data) {
            this.refs.loading.show(); 

            fetch(
              `https://portal.albertapayments.com/api/current25transactionsbydate?start_date=${this.state.date}&end_date=${this.state.date1}&sid=${sid}&start_amount=${this.state.fromAmount}&end_amount=${this.state.toAmount}&s_time=${this.state.fTime}&e_time=${this.state.tTime}`,
              {
                method: "GET"
              }
            )
              .then(response => response.json())
              .then(responseJson => {
                this.refs.loading.show(false);
                this.setState({ date: "" });
                this.setState({ date1: "" });
                this.setState({ tTime: "" });
                this.setState({ fTime: "" });
                this.fromAmount.clear()
                this.toAmount.clear()
                console.log(responseJson)
                if(responseJson.status != 'error')
                {
                    this.setState(
                        {
                          isLoading: false,
                          dataSource: ds.cloneWithRows(responseJson.table_data)
                        },
      
                        function() {
                          this.arrayholder = responseJson.table_data;
                        }
                      );
                }
                else{
                    alert("No Sales found!!!")
                }
                
              })
              .catch(error => {
                console.error(error);
              });
          }
        }
      });
    });
  };

  Nextscreen = () => {
    
    // this.getReportData(this.state.date,this.state.date1,this.state.fTime,this.state.tTime,this.state.fromAmount,this.state.toAmount)
  };
  render() {
    return (
      <View
        style={{ flex: 1, alignContent: "center", backgroundColor: "#fff" }}
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              color: "#3386D6",
              fontSize: 25,
              fontWeight: "bold"
            }}
          >
            Transactions
          </Text>
        </View>
        {/* <ScrollView> */}
        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20 }}>
          Date Between
        </Text>
        {/* <View style={{ height : 60,borderBottomWidth : 2,borderBottomColor: '#ccc' }}> */}

        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 0,}}>
          <DatePicker
            // ref={input => {this.date = input }}
            style={{ width: 130, marginTop: 10, marginLeft: 10 ,}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            maxDate= {new Date()}
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{}}
            showIcon ={false}
            onDateChange={date => {
                this.setState({ date: date });
            }}
          />
         <Text style={{ fontSize: 15,marginTop: 18,marginLeft: 5 }}>To</Text>
        
          <DatePicker
            ref={input => {this.date1 = input }}
            style={{ width: 160, marginTop: 10, marginLeft: 10,}}
            date={this.state.date1}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            maxDate= {new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{}}
            onDateChange={date1 => {
                this.setState({ date1: date1 });
            }}
          />
        </View>
        {/* </View> */}

        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20 }}>
          Time Between
        </Text>
        {/* <View style={{ height : 60,borderBottomWidth : 2,borderBottomColor: '#ccc' }}> */}

        <View style={{ flexDirection: "row", marginLeft: 18, marginTop: 0 }}>
        <DatePicker
           ref={input => {this.fTime = input }}
            style={{ width: 130, marginTop: 10, marginLeft: 15 }}
            date={this.state.fTime}
            mode="time"
            placeholder="select time"
            format="hh:mm a"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon ={false}
            iconComponent={
              <Icon size={30} color="#f15a2c" name="access-time" />
            }
            customStyles={{}}
            onDateChange={fTime => {
                this.setState({ fTime: fTime });
            }}
          />
        
        <Text style={{ fontSize: 15,marginTop: 18,marginLeft: 5 }}>To</Text>
       
         
          <DatePicker
           ref={input => {this.tTime = input }}
            style={{ width: 150, marginTop: 10, marginLeft:10}}
            date={this.state.tTime}
            mode="time"
            placeholder="select time"
            format="hh:mm a"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconComponent={
              <View style={{marginLeft : 5}}>
              <Icon size={30} color="#f15a2c" name="access-time" />
              </View>
            }
            customStyles={{}}
            onDateChange={tTime => {
                this.setState({ tTime: tTime });
            }}
          />
        
        </View>
        {/* </View> */}

        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20 }}>
          Amount Between
        </Text>
        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 10 }}>
          <TextInput
            ref={input => {this.fromAmount = input }}
            style={styles.input}
            placeholder=""
            placeholderTextColor="white"
            returnKeyType="next"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={fromAmount => this.setState({ fromAmount : fromAmount})}
          />

          <Text style={{  fontSize: 15,marginTop: 10,}}>To</Text>
          <View style={{ flexDirection: "row" }}>

          <TextInput
            ref={input => {this.toAmount = input }}
            style={styles.input1}
            placeholder=""
            placeholderTextColor="white"
            returnKeyType="next"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={toAmount => this.setState({ toAmount : toAmount })}
          />
          <FontAwesome name= 'dollar'color='#f15a2c' size = {30}></FontAwesome>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            alignContent: "center",
            justifyContent: "center",
            borderBottomWidth: 2,
            padding: 10,
            borderBottomColor: "#ccc"
          }}
        >
        
          <TouchableOpacity
            style={styles.btncontainer}
            onPress={this.submit}
          >
            <Text style={styles.btntext}>Submit</Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
        <ScrollView style={styles.table}>
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
            renderRow={rowData => (
              <View style={styles.ViewContainer}>
                <TouchableHighlight
                  underlayColor="gray"
                  onPress={this.GetListViewItem.bind(this, rowData.saleId)}
                >
                  <CardView
                    cardElevation={3}
                    cardMaxElevation={1}
                    cornerRadius={0}
                    style={styles.cardd}
                  >
                    <View flexDirection="row">
                      <View
                        style={{
                          width: "60%",
                          alignItems: "center",
                          height: 40
                        }}
                      >
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "300",
                            fontSize: 15
                          }}
                        >
                          {rowData.Date}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "40%",
                          alignItems: "center",
                          height: 40
                        }}
                      >
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "300",
                            fontSize: 15
                          }}
                        >
                          {rowData.Amount}
                        </Text>
                      </View>
                    </View>
                  </CardView>
                </TouchableHighlight>
              </View>
            )}
            enableEmptySections={true}
          />
        </ScrollView>
        <Loading ref="loading"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  btncontainer: {
    backgroundColor: "#f15a2c",
    borderRadius: 10,
    height: 40,
    width: "45%",
    marginLeft: "25%",
    alignContent: "center",
    justifyContent: "center"
  },
  btntext: {
    textAlign: "center",
    fontSize: 20,
    alignItems: "center",
    color: "#fff",
    marginTop: 2,
    justifyContent: "center"
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    backgroundColor: "#068AD6"
  },
  input: {
    //width: 250,
    alignSelf: "stretch",
    marginRight: 7,
    marginLeft: 15,
    height: 40,
    width: 130,
    borderRadius: 0,
    borderColor: "#afacac",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 15,
    paddingHorizontal: 20
  },
  input1: {
    //width: 250,
    alignSelf: "stretch",
    marginRight: 10,
    marginLeft: 5,
    height: 40,
    width: 120,
    borderRadius: 0,
    borderColor: "#afacac",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 15,
    paddingHorizontal: 20
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  headText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold"
  },
  head: { height: 40, backgroundColor: "#3386D6" },
  text: { margin: 6, fontSize: 14, textAlign: "center", color: "#3386D6" },
  table: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: "#ffff"
  },

  MainContainer: {
    justifyContent: "center",
    flex: 1,
    marginTop: 0,
    backgroundColor: "#fff"
  },

  rowViewContainer: {
    fontSize: 17,
    paddingBottom: 5
  },
  ViewContainer: {
    flex: 1,
    fontSize: 17,
    paddingBottom: 1
  },

  TextInputStyleClass: {
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7,
    backgroundColor: "#f2f2f2"
  },
  cardd: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    marginTop: 0,

    width: "100%"
  }
});
