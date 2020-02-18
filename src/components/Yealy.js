import React, {Component} from 'react';
import  { StyleSheet, 
          Text, 
          View, 
          SafeAreaView, 
          Image, 
          TouchableOpacity, 
          ScrollView,
          AsyncStorage,
          ActivityIndicator  }   from 'react-native';

import  { Table,  
          Row, 
          Rows,  }  from 'react-native-table-component';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import PureChart    from 'react-native-pure-chart';

export default class Yearly extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  
  componentDidMount() {
    // AsyncStorage.setItem("Sid", "1097");
    AsyncStorage.getItem("Sid").then(data => {
      if (data) {
        STORE_ID = data;
        //API_URL = API_BASE_URL + "get_last_12months_transactions/" + STORE_ID;
        API_URL = `https://portal.albertapayments.com/api/get_last_12months_transactions/${STORE_ID}`;
        return fetch(API_URL)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
            this.setState(
              {
                isLoading: false,
                tableHead: responseJson.table_title,
                tableData: responseJson.table_data,
                chartData: responseJson.chart_data
              },
              function() {}
            );
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
          width: 105,marginRight: 20,resizeMode: 'contain'}} /> 
        </View> 
        ),
        headerRight: (<View style={{ marginRight: 20 }}>
         </View>)
  })

  Nextscreen =() =>{
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 , alignItems: 'center',justifyContent : 'center',backgroundColor : '#fff'}}>
          <ActivityIndicator  size = {"large"}/>
        </View>
      );
    }

    let sampleData = [
      {
        seriesName: 'Sales',
        data :this.state.chartData,
        color: '#52c6d8'
      },
      
  ]
    
    return (
      
      <ScrollView>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View>
            <Text style={{textAlign:'center',color:'#3386D6', fontSize:20, fontWeight:'bold'}}>Yearly</Text>
          </View>

          <View style={styles.graph}>
          
          <PureChart data={sampleData} 
            width={'100%'}
            height={230}
            showEvenNumberXaxisLabel={false}
            backgroundColor = "#fff"
            xAxisColor={'#000'}
            yAxisColor={'#000'}
            xAxisGridLineColor={'#000'}
            yAxisGridLineColor={'#000'}
            labelColor={'#000'}
            type='bar'
            numberOfYAxisGuideLine= {10}
            customValueRenderer={(index, point) => {
              // if (index % 2 === 0) return null
              return (
                <View>
                <Text style={{textAlign: 'center',color : "#fff", fontSize:10}}>{point.y}</Text>
                
                </View>
              )
            }} />
          </View>

          <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: 1,
            }}
          />
  
          <ScrollView style={styles.table}>
            <Table borderStyle={{borderWidth: 3, borderColor: '#ccc'}}>
              <Row data={this.state.tableHead} flexArr={[2, 3, 1.5, 2]} style={styles.head} textStyle={styles.headText}/>
              <Rows data={this.state.tableData} flexArr={[2, 3, 1.5, 2]} textStyle={styles.text}/>
            </Table>
          </ScrollView>  
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  graph:{
      height : 300,
      padding:2,
      backgroundColor : "#fff",
  },
  headText : {color:"white", fontSize : 16, textAlign:"center", fontWeight : 'bold'},
  head: { height: 40, backgroundColor: '#3386D6'},
  text: { margin: 6, fontSize : 13, textAlign:'center', color:'#3386D6' },
  table:{
    paddingTop : 10,
    paddingLeft : 10,
    paddingRight : 10,
    paddingBottom : 10, 
    backgroundColor:'#ffff'
  }
});
