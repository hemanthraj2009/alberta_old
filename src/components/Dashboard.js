import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import LinearGradient from 'react-native-linear-gradient';
import CardView from "react-native-cardview";
import AntDesignn from 'react-native-vector-icons/FontAwesome';


export default class DashBoard extends Component {

  myfun = () => {
    this.props.navigation.navigate('Transations');
  }


  static navigationOptions = {

    Title: 'Home',
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
        <Image source={require('../images/poslogo.jpg')}
          style={{ height: 130, width: 130, marginRight: 20, resizeMode: 'contain' }} />
      </View>
    ),
    headerRight: (<View style={{ marginRight: 20 }}>
      <AntDesignn name="bell" size={25} color="#16a0db" /></View>)
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.container}>

          <View style={{ alignItems: 'center', padding: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Reports</Text>
          </View>

          <SafeAreaView style={styles.safeAreaView}>


            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '50%', padding: 10 }}>


                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Transactions')}
                >
                  <LinearGradient
                    colors={[
                      "#52c6d8",
                      "#45c0d4",
                      "#37b9d0",
                      "#25b3cd",
                      "#04adc9"
                    ]}
                    style={styles.card2}
                  >
                    <View style={{ justifyContent: 'center', paddingTop: 40 }}>
                      <AntDesign name="retweet" size={50} color="#f2f2f2" />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ marginStart: 30, fontSize: 18, fontWeight: '100', color: '#f2f2f2' }}>Current</Text>
                      <Text style={styles.text}>25 Transactions</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>



              <View style={{ width: '50%', padding: 10 }}>

                <LinearGradient
                  colors={[
                    "#52c6d8",
                    "#45c0d4",
                    "#37b9d0",
                    "#25b3cd",
                    "#04adc9"
                  ]}
                  style={styles.card2}>

                  <TouchableOpacity  onPress={() => this.props.navigation.navigate('ESReport')}>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <AntDesign name="switcher" size={50} color="#f2f2f2" />
                      
                    </View>
                    <Text style={styles.text}>End Of Shift Report</Text>
                  </TouchableOpacity>

                </LinearGradient>
              </View>


            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '50%', padding: 10 }}>



                <LinearGradient colors={['#52c6d8', '#45c0d4', '#37b9d0', '#25b3cd', '#04adc9']}
                  style={styles.card2}>

                  <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('DailyReport')}
                 >
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Foundation name="clipboard-notes" size={50} color="#f2f2f2" />
                    </View>
                    {/* <Text style={{marginStart : 30,fontSize : 18,fontWeight : '100',color : '#f2f2f2'}}>Update</Text> */}
                    <Text style={styles.text1}>Daily Report</Text>
                    
                  </TouchableOpacity>

                </LinearGradient>
              </View>

              <View style={{ width: '50%', padding: 10 }}>

                <LinearGradient colors={['#52c6d8', '#45c0d4', '#37b9d0', '#25b3cd', '#04adc9']}
                  style={styles.card2}>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Weekly')}>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                      <FontAwesome name="calendar" size={50} color="#f2f2f2" />
                    </View>
                    <Text style={styles.text1}>Weekly</Text>
                  </TouchableOpacity>

                </LinearGradient>
              </View>

            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '50%', padding: 10 }}>


                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Monthly')}
                >
                  <LinearGradient
                    colors={[
                      "#52c6d8",
                      "#45c0d4",
                      "#37b9d0",
                      "#25b3cd",
                      "#04adc9"
                    ]}
                    style={styles.card2}
                  >
                    <View style={{ justifyContent: 'center', paddingTop: 40 }}>
                      <FontAwesome name="calendar" size={38} color="#f2f2f2" />
                    </View>
                    <View style={{ flexDirection: 'column' }}>

                      <Text style={styles.text1}>Monthly</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>



              <View style={{ width: '50%', padding: 10 }}>

                <LinearGradient
                  colors={[
                    "#52c6d8",
                    "#45c0d4",
                    "#37b9d0",
                    "#25b3cd",
                    "#04adc9"
                  ]}
                  style={styles.card2}>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Yealy')}>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                      <FontAwesome name="calendar" size={40} color="#f2f2f2" />
                    </View>
                    <Text style={styles.text1}>Yearly</Text>
                  </TouchableOpacity>

                </LinearGradient>
              </View>


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
    marginTop: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  rotateIcon: {
    transform: [{ rotate: '180deg' }]
  },
  animation: {
    alignSelf: 'stretch',
    width: 300,
    height: 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    borderRadius: 3,
    height: " 20%",
    width: "92%",
    marginTop: 10,

  },
  card4: {
    backgroundColor: '#e3b432',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    borderTopColor: "blue",
    height: 130,
    width: 300,
    margin: 10
  },
  card1: {
    // backgroundColor: '#16a0db',
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    height: 130,
    width: 300,
    margin: 10
  },
  card2: {

    // backgroundColor: '#16a0db',
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 130,
    width: '100%',

  },

  card5: {

    // backgroundColor: '#16a0db',

    borderRadius: 8,
    flex: 1,
    height: 130,
    width: '100%',

  },

  card3: {
    backgroundColor: '#286fb7',
    alignItems: 'center',
    borderTopColor: "blue",
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    height: 130,
    width: 300,
    margin: 10
  },
  cardd: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 40,
    marginBottom: 10,
    width: '100%',

  },
  container1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  box: {
    backgroundColor: '#fff',
    alignItems: "center",
    borderRadius: 75,
    borderWidth: 2,
    width: 150,
    height: 150,
    marginStart: "35%",
    marginTop: 0,
    borderColor: '#fff',
    justifyContent: "center"
  },
  box1: {
    width: 50,
    height: 50,
    alignItems: "flex-end",
    borderRadius: 25,
    justifyContent: "flex-end"
  },

  // text: {
  //   color: "#fff",
  //   fontSize : 20
  // },
  storename: {
    marginStart: 18,
    color: "#000",
    marginBottom: 10,
    fontSize: 20,
    marginTop: 0
  },
  text2: {
    fontWeight: '700',
    marginStart: 100,
    color: "green",
    marginBottom: 10,
    fontSize: 25
  },
  te: {
    marginStart: 5,
    color: "#000",
    marginTop: 5,
    fontSize: 20
  },

  carddd: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 200,
    width: "95%",
    margin: 10

  },
  anim: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    marginTop: 30,
    marginStart: 10,
  },
  imgg: {
    width: 180,
    height: 120,
    marginStart: "0%",
    alignItems: 'center',
    resizeMode: 'contain'
  },
  img1: {
    marginStart: 20,
    marginTop: 30,
  },
  text1: {
    color: "#fff",
    fontSize: 15,
  },
  textss: {
    color: "#000",
    marginBottom: 20,
    fontSize: 14,
    marginStart: 5
  },
  texts: {
    color: "#FFF"
  },

  text: {
    textAlign: 'center',
    height: 75,
    fontSize: 18,
    fontWeight: '100',
    marginStart: 5,


    color: '#f2f2f2'
  },
  text1: {
    textAlign: 'center',
    height: 75,
    fontSize: 18,
    fontWeight: '100',
    marginStart: 5,
    marginTop: 10,

    color: '#f2f2f2'
  },
  text3: {
    textAlign: 'center',
    height: 75,
    marginStart: 20,
    marginTop: 50,
    fontSize: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Foundation from 'react-native-vector-icons/Foundation';
// import LinearGradient from 'react-native-linear-gradient';
// import CardView from "react-native-cardview";
// import AntDesignn from 'react-native-vector-icons/FontAwesome';



// export default class DashBoard extends Component {

//   myfun = () => {
//     this.props.navigation.navigate('Transations');
//   }

//   static navigationOptions = {

//     Title: 'Home',
//     headerTitle: (
//       <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
//         <Image source={require('../images/poslogo.jpg')}
//           style={{ height: 130, width: 130, marginRight: 20, resizeMode: 'contain' }} />
//       </View>
//     ),
//     headerRight: (<View style={{ marginRight: 20 }}>
//       <AntDesignn name="bell" size={25} color="#16a0db" /></View>)
//   }

//   render() {
//     return (
//       <ScrollView style={{ backgroundColor: '#fff' }}>
//         <View style={styles.container}>

//           <View style={{ alignItems: 'center', padding: 10 }}>
//             <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Reports</Text>
//           </View>
//           <SafeAreaView style={styles.safeAreaView}>

//             <View style={{ flexDirection: 'row', width: '100%' }}>
//               <View style={{ width: '50%', padding: 10 }}>





//                 <TouchableOpacity
//                   onPress={() => this.props.navigation.navigate('Transactions')}
//                 >
//                   <LinearGradient
//                     colors={[
//                       "#52c6d8",
//                       "#45c0d4",
//                       "#37b9d0",
//                       "#25b3cd",
//                       "#04adc9"
//                     ]}
//                     style={styles.card2}
//                   >
//                     <View style={{ justifyContent: 'center', paddingTop: 40 }}>
//                       <AntDesign name="retweet" size={50} color="#f2f2f2" />
//                     </View>
//                     <View style={{ flexDirection: 'column' }}>
//                       <Text style={{ marginStart: 30, fontSize: 18, fontWeight: '100', color: '#f2f2f2' }}>Current</Text>
//                       <Text style={styles.text}>25 Transactions</Text>
//                     </View>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </View>




//               <View style={{ width: '50%', padding: 10 }}>
//                 <LinearGradient colors={['#52c6d8', '#45c0d4', '#37b9d0', '#25b3cd', '#04adc9']}
//                   style={styles.card2}>

//                   <TouchableOpacity onPress={() => this.props.navigation.navigate('DailyReport')}>
//                     <View style={{ alignItems: 'center', marginTop: 40 }}>
//                       <Foundation name="clipboard-notes" size={50} color="#f2f2f2" />
//                     </View>
//                     <Text style={styles.text}>Daily Report</Text>
//                   </TouchableOpacity>

//                 </LinearGradient>


//               </View>
//             </View>



//             <View style={{ width: '100%', }}>
//               <View style={{ width: '45%', marginStart: '25%', marginTop: 10 }}>

//                 <LinearGradient colors={['#52c6d8', '#45c0d4', '#37b9d0', '#25b3cd', '#04adc9']}
//                   style={styles.card2}>

//                   <TouchableOpacity onPress={() => this.props.navigation.navigate('ESReport')}>
//                     <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
//                       <AntDesign name="switcher" size={50} color="#f2f2f2" />
//                     </View>
//                     <Text style={styles.text}>End Of Shift Report</Text>
//                   </TouchableOpacity>

//                 </LinearGradient>
//               </View>



//             </View>

//           </SafeAreaView>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   safeAreaView: {
//     flex: 1,
//     marginTop: '40%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // width: Dimensions.get('screen').width,
//     // height: Dimensions.get('screen').height
//   },
//   card: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     flex: 1,
//     borderRadius: 3,
//     height: " 20%",
//     width: "92%",
//     marginTop: 10,

//   },
//   card4: {
//     backgroundColor: '#e3b432',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     flex: 1,
//     borderTopColor: "blue",
//     height: 130,
//     width: 300,
//     margin: 10
//   },
//   card1: {
//     // backgroundColor: '#16a0db',
//     alignItems: 'center',
//     borderRadius: 3,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     flex: 1,
//     height: 130,
//     width: 300,
//     margin: 10
//   },
//   card2: {

//     // backgroundColor: '#16a0db',
//     alignItems: "center",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignSelf: "center",
//     flex: 1,
//     height: 130,
//     width: '100%',

//   },
//   card3: {
//     backgroundColor: '#286fb7',
//     alignItems: 'center',
//     borderTopColor: "blue",
//     justifyContent: 'center',
//     alignSelf: 'center',
//     flex: 1,
//     height: 130,
//     width: 300,
//     margin: 10
//   },
//   cardd: {
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     height: 40,
//     marginBottom: 10,
//     width: '100%',

//   },
//   container1: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   box: {
//     backgroundColor: '#fff',
//     alignItems: "center",
//     borderRadius: 75,
//     borderWidth: 2,
//     width: 150,
//     height: 150,
//     marginStart: "35%",
//     marginTop: 0,
//     borderColor: '#fff',
//     justifyContent: "center"
//   },
//   box1: {
//     width: 50,
//     height: 50,
//     alignItems: "flex-end",
//     borderRadius: 25,
//     justifyContent: "flex-end"
//   },

//   // text: {
//   //   color: "#fff",
//   //   fontSize : 20
//   // },
//   storename: {
//     marginStart: 18,
//     color: "#000",
//     marginBottom: 10,
//     fontSize: 20,
//     marginTop: 0
//   },
//   text2: {
//     fontWeight: '700',
//     marginStart: 100,
//     color: "green",
//     marginBottom: 10,
//     fontSize: 25
//   },
//   te: {
//     marginStart: 5,
//     color: "#000",
//     marginTop: 5,
//     fontSize: 20
//   },

//   carddd: {
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     height: 200,
//     width: "95%",
//     margin: 10

//   },
//   anim: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   img: {
//     marginTop: 30,
//     marginStart: 10,
//   },
//   imgg: {
//     width: 180,
//     height: 120,
//     marginStart: "0%",
//     alignItems: 'center',
//     resizeMode: 'contain'
//   },
//   img1: {
//     marginStart: 20,
//     marginTop: 30,
//   },
//   text1: {
//     color: "#fff",
//     fontSize: 15,
//   },
//   textss: {
//     color: "#000",
//     marginBottom: 20,
//     fontSize: 14,
//     marginStart: 5
//   },
//   texts: {
//     color: "#FFF"
//   },

//   text: {
//     textAlign: 'center',
//     height: 75,
//     fontSize: 18,
//     fontWeight: '100',
//     marginStart: 5,

//     //color : '#636466'
//     color: '#f2f2f2'
//   },

//   textr: {
//     textAlign: 'center',
//     height: 75,
//     fontSize: 18,
//     fontWeight: '100',
//     marginStart: 5,
//     marginTop: 10,
//     //color : '#636466'
//     color: '#f2f2f2'
//   },

//   text3: {
//     textAlign: 'center',
//     height: 75,
//     marginStart: 20,
//     marginTop: 50,
//     fontSize: 20
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   }
// });