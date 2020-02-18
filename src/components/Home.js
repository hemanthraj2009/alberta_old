import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  BackHandler,
  Alert,
  PanResponder
} from "react-native";
import CardView from "react-native-cardview";
import { WebView } from "react-native-webview";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Popupmenu from "./Popupmenu";
//import moment from "moment";
import moment from 'moment-timezone'

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import LinearGradient from "react-native-linear-gradient";
import { NavigationEvents } from "react-navigation";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import NoSale from "./NoSale";
import VoidPage from "./VoidPage";
import Delete from "./Delete";
const MAX_POINTS = 100;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sname: null,
      svoid: null,
      ssale: null,
      sdelete: null,
      snosale: null,
      sid: null,
      date: "",
      stax: null,
      paidout: null,
      returns: null,
      curTime: null,
      refreshing: false,
      isMoving: false,
      pointsDelta: 0,
      points: 0,
      noSales : null
     
    };
  }
  
  

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  _;

  handleBackButton = () => {
    Alert.alert(
      "",
      "Do you want to exit the app?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  };

  static navigationOptions = ({ navigate, navigation }) => ({
    headerVisible: true,
    headerLeft: null,
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../images/poslogo.jpg")}
          style={{
            height: "60%",
            width: "50%",
            resizeMode: "contain",
            flex: 1
          }}
        />
      </View>
    ),
    headerRight: (
      <View style={{ flex: 1, alignItems: "center", width: 20 }}>
        <Popupmenu />
      </View>
    )
  });


  session = () => {
    AsyncStorage.removeItem("savedPassword");
    this.props.navigation.navigate("Loginscreen");
  };

  sessionButton = () => {
    Alert.alert(
      "",
      "Session expired Please login again",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => this.session()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }
  

  componentDidMount() {
   BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    AsyncStorage.getItem("No_Sales").then(noSales => {
      if (noSales) {
        //alert(noSales)
        this.setState({ noSales: noSales });
      }
    });

   AsyncStorage.getItem("Storename").then(datastore => {
      if (datastore) {
        //alert(datastore)
        this.setState({ sname: datastore });
      }
    });

    AsyncStorage.getItem("Sid").then(datasid => {
      if (datasid) {
        this.setState({ sid: datasid });
      }
    });
    
    AsyncStorage.getItem("tax").then(datatax => {
      if (datatax) {
        this.setState({ stax: datatax });
        
      }
    });
    AsyncStorage.getItem("returns").then(datareturns => {
      if (datareturns) {
        this.setState({ returns: datareturns });
      }
    });
    AsyncStorage.getItem("paid_out").then(datapaid_out => {
      if (datapaid_out) {
        this.setState({ paidout: datapaid_out });
      }
    });
    AsyncStorage.getItem("void").then(datavoid => {
      if (datavoid) {
        
        this.setState({ svoid: datavoid });
      }
    });

    
    AsyncStorage.getItem("sales").then(datasales => {
      if (datasales) {
        //alert(datastore)
        this.setState({ ssale: datasales });
      }
    });
    AsyncStorage.getItem("delete").then(datadelete => {
      if (datadelete) {
        //alert(datadelete)
        this.setState({ sdelete: datadelete });
      }
    });

    

     this.timer = setInterval(() => this.getitem(), 20000);
    //this.getitem()
  
     this.timer = setInterval(() => this.RefreshApi(), 20000);

    var date = moment().format("MM-DD-YYYY");
    // var getCurrentTimeZone = moment.tz.guess();
    // var date = moment().tz(getCurrentTimeZone).format("MM-DD-YYYY");

    //  var today = new Date();
    //  //format('MM-DD-YYYY');
    //  date = (((today.getMonth() + 1) < 10) ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1)) + "-" 
    //  + ((today.getDate() < 10) ? ("0" + today.getDate()) : (today.getDate())) + "-" + today.getFullYear();
    this.setState({ date: date });
    

    // AnimationCircle

    this.setState({ fill: 0 });
    this.animationTimer = setInterval(() => this.state.fill < 98 ? this.setState({fill : this.state.fill + 3}) : this.setState({fill : 100}), 1800);
    // this._panResponder = PanResponder.create({
     
    //   onStartShouldSetPanResponder: (evt, gestureState) => true,
    //   onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    //   onMoveShouldSetPanResponder: (evt, gestureState) => true,
    //   onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    //   onPanResponderGrant: (evt, gestureState) => {
    //     this.setState({ isMoving: true, pointsDelta: 0 });
    //   },

    //   onPanResponderMove: (evt, gestureState) => {
    //     alert('jbjhbj')
    //     this.refs.circularProgress.animate(100, 3000);
    //     // For each 2 pixels add or subtract 1 point
    //     this.setState({ pointsDelta: Math.round(-gestureState.dy / 2) });
    //   },
    //   onPanResponderTerminationRequest: (evt, gestureState) => true,
    //   onPanResponderRelease: (evt, gestureState) => {
    //     this.refs.circularProgress.animate(100, 3000);
    //     let points = this.state.points + this.state.pointsDelta;
    //     console.log(Math.min(points, MAX_POINTS));
    //     this.setState({
    //       isMoving: false,
    //       points: points > 0 ? Math.min(points, MAX_POINTS) : 0,
    //       pointsDelta: 0,
    //     });
    //   },
    // });
  }
  
  RefreshApi = () => {

    var date = moment()

      .format("MM-DD-YYYY");

    // var today = new Date();
    // //format('MM-DD-YYYY');
    // date = today.getMonth() + 1 + "-" + parseInt(today.getDate()) + "-" + today.getFullYear();
    this.setState({ date: date });

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(datasid => {
        if (data) {

          var date = moment()
          .format("MM-DD-YYYY");

          //RefreshApi
         // API_URL = RefreshApi +`${datasid}?token=${encodeURIComponent(data)}`;
            API_URL = API_BASE_URL + `storedetails_new/${datasid}?token=${encodeURIComponent(data)}&date=${date}`;
         
        //  fetch(`https://portal.albertapayments.com/api/storedetails_new/${datasid}?token=${encodeURIComponent(data)}&date=${date}`,
          fetch( API_URL,
            {
              method: "GET"
            }
          )
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson.error=='Something is wrong') {
                //this.sessionButton();
                //alert(responseJson.error)
                alert('working')
              }
              if(responseJson.error=='Session expired'){
                alert(responseJson.error)
              }
              if (responseJson.id) {
                //alert(responseJson.id)
                AsyncStorage.setItem(
                  "void",
                  JSON.stringify(responseJson.voids)
                );
                AsyncStorage.setItem("sales", responseJson.sales);
                AsyncStorage.setItem(
                  "delete",
                  JSON.stringify(responseJson.deletes)
                );
                AsyncStorage.setItem(
                  "No_Sales",
                  JSON.stringify(responseJson.No_Sales)
                );
                //AsyncStorage.setItem('role_name', (responseJson.user.roles[0].name));
                AsyncStorage.setItem("tax", responseJson.tax);
                AsyncStorage.setItem("paid_out", responseJson.paid_out);
                AsyncStorage.setItem("returns", responseJson.returns);
                //alert(responseJson.returns)
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });
  };

  myfun = index => {
    this.props.navigation.navigate("Notifications", { index: index });
  };



  getitem = () => {
    AsyncStorage.getItem("tax").then(datatax => {
      if (datatax) {
        this.setState({ stax: datatax });
        //alert(datatax)
      }
    });
    AsyncStorage.getItem("returns").then(datareturns => {
      if (datareturns) {
        this.setState({ returns: datareturns });
      }
    });
    AsyncStorage.getItem("paid_out").then(datapaid_out => {
      if (datapaid_out) {
        this.setState({ paidout: datapaid_out });
      }
    });
    AsyncStorage.getItem("void").then(datavoid => {
      if (datavoid) {
        //alert(datavoids)
        this.setState({ svoid: datavoid });
      }
    });
    AsyncStorage.getItem("sales").then(datasales => {
      if (datasales) {
        //alert(datastore)
        this.setState({ ssale: datasales });
      }
    });
    AsyncStorage.getItem("delete").then(datadelete => {
      if (datadelete) {
        //alert(datadelete)
        this.setState({ sdelete: datadelete });
      }
    });

    AsyncStorage.getItem("No_Sales").then(noSales => {
      if (noSales) {
        //alert(noSales)
        this.setState({ noSales: noSales });
      }
    });

   
  };

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    // const fill = (this.state.points / MAX_POINTS) * 100;
    // const fill = 100;

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" } }>
     
     
        <ScrollView >
          <NavigationEvents onDidFocus={() => this.componentDidMount()} />
          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
              <CardView
                cardElevation={6}
                cardMaxElevation={1}
                cornerRadius={0}
                style={styles.cardd}
              >
                <View style={{ marginTop: 5, marginStart: 0 }}>
                  <Text style={styles.storename}>
                    {this.state.sname}[{this.state.sid}]
                  </Text>
                </View>
              </CardView>

              <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={5}
                style={styles.carddd}>
                 <View style={{
                      flexDirection: "column",
                      alignItems: "center",
                      alignContent: "center"}}>
                      <Text style={{ fontSize: 18, fontWeight: "600" }}>
                        {this.state.date}
                      </Text>
                      <AnimatedCircularProgress
                       ref={(ref) => this.circularProgress = ref}
                       
                        size={200}
                        width={3}
                        fill={this.state.fill}
                        tintColor="#00e0ff"
                        onAnimationComplete={() => this.state.fill == 100 ? this.setState({fill:0}) : this.setState({fill:this.state.fill}) }
                       // ref="circularProgress"
                        backgroundColor="#3d5875">
                        {
                          (fill) => (
                            <TouchableOpacity onPress={() => this.flipCard()}>
                            <Animated.View
                                style={[styles.flipCard, frontAnimatedStyle]}>
                               {/* <CardView
                                 cardElevation={4}
                                 cardMaxElevation={4}
                                 cornerRadius={100}
                                 style={styles.card}> */}
                                  <Text style={{ fontSize: 18, fontWeight: "700" }}>Sales:</Text>
                                  <Text style={{ fontSize: 18, fontWeight: "700", color: "green" }}>${this.state.ssale}</Text>
                               {/* </CardView> */}
                            </Animated.View>
                            <Animated.View style={[backAnimatedStyle,styles.flipCard,styles.flipCardBack ]}>
                               {/* <CardView 
                               cardElevation={4} 
                               cardMaxElevation={4} 
                               cornerRadius={100} 
                               style={styles.card}> */}
                                   {/* <Text style={{fontSize : 18,fontWeight : '700'}}>Sales:</Text>
                                   <Text style={{fontSize : 18,fontWeight : '700',color : 'green'}}>${this.state.ssale}</Text> */}
                                    <Text style={{ fontSize: 18, fontWeight: "700" }}>Tax:</Text>
                                      <Text style={{
                                       fontSize: 18,
                                       fontWeight: "700",
                                       color: "green" }}>${this.state.stax}</Text>
                                     <Text style={{ fontSize: 18, fontWeight: "700" }}>Paid out</Text>
                                     <Text
                                      style={{
                                      fontSize: 18,
                                      fontWeight: "700",
                                      color: "green"
                                       }}>${this.state.paidout}</Text>
                                       <Text style={{ fontSize: 18, fontWeight: "700" }}> Returns</Text>
                                       <Text style={{fontSize: 18,fontWeight: "700",color: "green" }}>${this.state.returns}</Text>
                               {/* </CardView> */}
                            </Animated.View>
                       </TouchableOpacity>
                          )
                        }
                      </AnimatedCircularProgress>
                      
                  </View>
                  <View style={styles.anim}>
                  <View style={{  margin: 10,}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationNosale')}>
                      <LinearGradient
                        colors={[
                          "#52c6d8",
                        "#45c0d4",
                        "#37b9d0",
                        "#25b3cd",
                        "#04adc9"
                        ]}
                        style={styles.box1}
                      >
                        <View
                          style={{
                           
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 10
                          }}
                        >
                          <Feather name="shopping-cart" size={40} color="#fff"/>
                        </View>
                      </LinearGradient>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#f58120", fontWeight: "700" }}>
                          {this.state.noSales}
                        </Text>
                        <Text style={styles.textss}>No Sale</Text>
                      </View>
                    </TouchableOpacity>
                  </View>


                  <View style={{  margin: 10, }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('NotificationVoid')}>
                      <LinearGradient
                        colors={[
                          "#f58120",
                          "#f4771f",
                          "#f36c20",
                          "#f26221",
                          "#f05623"
                        ]}
                        style={styles.box1}
                      >
                        <View
                          style={{
                           
                            alignContent: "center",
                            justifyContent: "center",
                            padding: 10
                          }}
                        >
                          <MaterialCommunityIcons
                            name="cart-off"
                            size={40}
                            color="#fff"
                          />
                        </View>
                      </LinearGradient>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#f58120", fontWeight: "700" }}>
                          {this.state.svoid}
                        </Text>
                        <Text style={styles.textss}>Void</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{  margin: 10, }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('NotificationDelete')}>
                      <LinearGradient
                        colors={[
                          "#3386D6",
                          "#3386D6",
                          "#3386D6",
                          "#3386D6",
                          "#4C93D8"
                        ]}
                        style={styles.box1}
                      >
                        <View
                          style={{
                           
                            alignContent: "center",
                            justifyContent: "center",
                           padding : 10
                          }}
                        >
                          <MaterialCommunityIcons
                            name="delete"
                            size={40}
                            color="#fff"
                          />
                        </View>
                      </LinearGradient>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#f58120", fontWeight: "700" }}>
                          {this.state.sdelete}
                        </Text>
                        <Text style={styles.textss}>Delete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                <View style={{ margin: 10,}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboardweb')}>
                      <LinearGradient
                        colors={[
                          "#f4d60c",
                          "#edc425",
                          "#e3b432",
                          "#d8a43c",
                          "#ca9544"
                        ]}
                        style={styles.box1}
                      >
                        <View
                          style={{
                            alignContent: "center",
                            padding : 10
                          
                          }}
                        >
                         <FontAwesome name="line-chart" size={35} color="#f2f2f2" />
                        </View>
                      </LinearGradient>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#f58120", fontWeight: "700" }}>
                          {/* {this.state.sdelete} */}
                        </Text>
                        <Text style={styles.textss}>Dashboard</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </CardView>
            </View>
            <View
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <View flexDirection="row">
                <CardView
                  cardElevation={4}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Dashboard")}
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
                      <View style={{justifyContent : 'center',paddingTop: 40} }>
                        <MaterialIcons
                          name="library-books"
                          size={50}
                          color="#f2f2f2"
                        />
                      </View>
                      <Text style={styles.text}>Reports</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </CardView>

                <CardView
                  cardElevation={6}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("LiveSales")}
                  >
                    <LinearGradient
                      colors={[
                        "#f58120",
                        "#f4771f",
                        "#f36c20",
                        "#f26221",
                        "#f05623"
                      ]}
                      style={styles.card2}
                    >
                      <View style={{ justifyContent : 'center',paddingTop: 40 }}>
                      <FontAwesome name="youtube-play" size={50}  color="#f2f2f2"/>
                      </View>
                      <Text style={styles.text}>Tutorials</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </CardView>
              </View>

              <View flexDirection="row">
                <CardView
                  cardElevation={6}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ItemDashboard")
                    }
                  >
                    <LinearGradient
                      colors={[
                        "#3386D6",
                        "#3386D6",
                        "#3386D6",
                        "#3386D6",
                        "#3386D6"
                      ]}
                      style={styles.card2}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          marginTop: 40,
                          marginRight: 10
                        }}
                      >
                       <Ionicons
                            name="md-cart"
                            size={50}
                            color="#fff"
                          />
                      </View>
                      <Text style={styles.text}>Item</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </CardView>

                <CardView
                  cardElevation={6}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Notifications")
                    }
                  >
                    <LinearGradient
                      colors={[
                        "#f4d60c",
                        "#edc425",
                        "#e3b432",
                        "#d8a43c",
                        "#ca9544"
                      ]}
                      style={styles.card2}
                    >
                      <View style={{ justifyContent : 'center',paddingTop: 40}}>
                        <EvilIcons name="bell" size={70} color="#f2f2f2" />
                      </View>
                      <Text style={styles.text}>Notifications</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </CardView>
              </View>

            


                <View flexDirection="row" marginStart = "1%" >
                <CardView
                  cardElevation={6}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ReciveOrder")
                    }
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
                      <View
                        style={{
                          justifyContent : 'center',paddingTop: 40
                        }}
                      >
                        <FontAwesome name="line-chart" size={50} color="#f2f2f2" />
                      </View>
                      <Text style={styles.text}>Receiving Order</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </CardView>

                <CardView
                  cardElevation={6}
                  cardMaxElevation={4}
                  cornerRadius={10}
                  style={styles.card1}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("BarcodeTablePrint")
                    }
                  >
                    <LinearGradient
                       colors={[
                        "#f58120",
                        "#f4771f",
                        "#f36c20",
                        "#f26221",
                        "#f05623"
                      ]}
                      style={styles.card2}
                    >
                      <View style={{ justifyContent : 'center',paddingTop: 40}}>
                      <AntDesign
                          name="barcode"
                          size={40}
                          color="#fff"
                        />
                      </View>
                      <Text style={styles.text}>Print Label</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </CardView>
                </View>  

                

              




            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#fff"
  },
  animatedView: {
    backgroundColor: "#0a5386",
    elevation: 2,
    position: "absolute",
    bottom: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  exitText: {
    color: "#e5933a",
    paddingHorizontal: 10,
    paddingVertical: 3
  },

  animation: {
    alignSelf: "stretch",
    width: 300,
    height: 0
  },

  container: {
    flex: 1
    // backgroundColor: '#EEEEEE',
  },
  flipCard: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderRadius: 100,
    borderColor: "#52c6d8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    backfaceVisibility: "hidden"
  },
  flipCardBack: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 0
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    borderWidth: 4,
    backgroundColor: "#fff",
    width: 195,
    height: 40
  },
  card4: {
    backgroundColor: "#e3b432",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    borderTopColor: "blue",
    height: 130,
    width: 300,
    margin: 10
  },
  card1: {
    // backgroundColor: '#16a0db',
    alignItems: "center",
    borderRadius: 3,
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 130,
    width: 300,
    margin: 10
  },
  card2: {
    // backgroundColor: '#16a0db',
    alignItems: "center",
    borderRadius: 3,
    justifyContent: "center",
    alignSelf: "center",
    // flex: 1,
    height: 130,
    width: 300,
    margin: 10
  },
  // card2: {
  //   backgroundColor: '#f15a2c',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   flex: 1,
  //   height : 130,
  //   width : 300,
  //   margin: 10

  // },
  card3: {
    backgroundColor: "#286fb7",
    alignItems: "center",
    borderTopColor: "blue",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 130,
    width: 300,
    margin: 10
  },
  cardd: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 45,
    marginTop: 4,
    marginBottom: 10,
    width: "100%"
  },
  container1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  box: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 75,
    borderWidth: 2,
    width: 150,
    height: 150,
    marginStart: "35%",
    marginTop: 0,
    borderColor: "#fff",
    justifyContent: "center"
  },
  box1: {
    width: 60,
    height: 60,
    alignItems: "flex-start",
    borderRadius: 30,
    justifyContent: "flex-start"
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
    fontWeight: "700",
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 340,
    width: "95%",
    margin: 10
  },
  anim: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  img: {
    marginTop: 30,
    marginStart: 10
  },
  imgg: {
    width: 180,
    height: 120,
    marginStart: "0%",
    alignItems: "center",
    resizeMode: "contain"
  },
  img1: {
    marginStart: 20,
    marginTop: 30
  },
  text1: {
    color: "#fff",
    fontSize: 15
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
    textAlign: "center",
    height: 75,
    fontSize: 18,
    fontWeight: "100",
    marginStart: 5,
    marginTop: 10,
    color: "#f2f2f2"
  },

  text3: {
    textAlign: "center",
    height: 75,
    marginStart: 20,
    marginTop: 50,
    fontSize: 20
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
