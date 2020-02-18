import React, {Component} from 'react';
import {  Platform, 
          StyleSheet, 
          Text, 
          View,
          TouchableOpacity, 
          Image, 
          SafeAreaView, 
          ScrollView  } from 'react-native';
import { 
          BarChart, 
          XAxis, 
          ProgressCircle , 
          PieChart ,
          Grid } from 'react-native-svg-charts';
import { 
          Table, 
          TableWrapper, 
          Row, 
          Rows } from 'react-native-table-component';
import * as scale from 'd3-scale'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const data = [
  {
      value: 10,
      label: 'JAN 1',
  },
  {
      value: 20,
      label: 'JAN 2',
  },
  {
      value: 50,
      label: 'JAN 3',
  },
  {
      value: 60,
      label: 'JAN 4',
  },
  {
      value: 100,
      label: 'JAN 5',
  },
  {
    value: 90,
    label: 'JAN 6',
  },
  {
    value: 80,
    label: 'JAN 7',
  },
]


const state = {
  tableHead: ['Date', 'Sales', 'Void', 'Delete'],
  tableData: [
    ['01-01-2019', '10','2','1'],
    ['01-02-2019', '20','2','1'],
    ['01-03-2019', '50','3','2'],
    ['01-04-2019', '60','2','1'],
    ['01-05-2019', '100','5','2'],
    ['01-06-2019', '90','1','1'],
    ['01-07-2019', '80','0','0'],    
  ]
}

export default class Sales extends Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    headerTitle: ( 
        <View style={{ flex: 1, alignItems: "center" ,marginStart : 20}}> 
        <Image source={require('../images/poslogo.jpg')} 
        style={{ height: 130, width: 130 ,marginRight: 20,resizeMode: 'contain'}} /> 
        </View> 
        ),
    headerRight: <TouchableOpacity onPress={()=>{ navigation.navigate('Notifications'); }}><FontAwesome name="bell" size={25} color="#16a0db"/></TouchableOpacity>,
  })

  Nextscreen =() =>{
  this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <Text style={{textAlign:'center', color:'#3386D6', fontSize:20, fontWeight:'bold'}}>Live Sales</Text>
      </View>
      <View style={styles.graph}>
        <BarChart
            style={{ flex: 1 }}
            // horizontal={true}
            data={data}
            yAccessor={({ item }) => item.value}
            xAccessor = {({ index }) => index.value}
            gridMin={0}
            svg={{ fill: '#f05623' }}
            spacingInner={0.2}
            spacingOuter={0.2}
            contentInset={{ top: 10, left: 10, right: 10, bottom: 10 }}
        />
        <XAxis
            style={{ marginTop: 10 }}
            data={ data }
            scale={scale.scaleBand}
            formatLabel={ (_, index) => data[ index ].label }
            labelStyle={ { color: 'black' } }
        />
       </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}
      />

      <ScrollView style={styles.table}>
        <Table borderStyle={{borderWidth: 3, borderColor: '#3386D6'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.headText}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </ScrollView> 

      </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  graph:{
      height : 300,
      padding: 10,
      backgroundColor : "#ffe"
  },
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
  headText : {color:"white", fontSize : 16, textAlign:"center", fontWeight : 'bold'},
  head: { height: 40, backgroundColor: '#3386D6', borderColor : "white", flex: 1, padding:10},
  text: { margin: 6, fontSize : 14, textAlign:'center', color:'#3386D6' },
  table:{
    paddingTop : 10,
    paddingLeft : 10,
    paddingRight : 10,
    paddingBottom : 10, 
    backgroundColor:'#ffff'
  }
});
