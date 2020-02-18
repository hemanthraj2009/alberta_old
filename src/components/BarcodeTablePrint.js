import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  AsyncStorage,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { TouchableOpacity } from "react-native";
import Loading from "react-native-whc-loading";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationEvents } from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swipeout from "react-native-swipeout";

export default class BarcodeTablePrint extends Component {
  constructor() {
    super();

    this.state = { isLoading: true, isFetching: false };
    this.setState({ dataSource: null, ipoid: "", isLoading: false });
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() {
      this.componentDidMount();
    });
  }

  LoginPress = () => {
    // alert("Under Development")
    this.props.navigation.navigate("BarcodeAdd");
  };
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTitle: (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginStart: 0
        }}
      >
        <Image
          source={require("../images/poslogo.jpg")}
          style={{
            height: 100,
            width: 100,
            marginRight: 0,
            resizeMode: "contain"
          }}
        />
      </View>
    ),
    headerRight: (<View style={{ marginRight: 20 }}>
      {/* <FontAwesome name="bell" size={25} color="#16a0db" /> */}
      </View>)
  };

  closeAllOpneStatus = () => {
    const self = this;

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(SID => {
        if (data) {
          this.setState({
            isLoading: true
          });

          fetch(
            API_BASE_URL +
              `admin/closestatus?token=${encodeURIComponent(data)}&sid=${SID}`,
            {
              method: "POST"
            }
          )
            .then(response => response.json())
            .then(responseJson => {
              //this.refs.loading.show(false);
              //console.log(responseJson)

              this.setState({
                isLoading: false
              });

              if (responseJson.success) {
                Alert.alert("", responseJson.success, [
                  {
                    text: "OK",
                    onPress: () => {
                      // let { dataSource } = self.state
                      // dataSource = dataSource.splice(1, index)
                      // this.setState({ dataSource })
                      this.updateData();
                    }
                  }
                ]);
                return;
              }

              if (responseJson.error) {
                //this.refs.loading.show(false);

                Alert.alert("", responseJson.error, [{ text: "OK" }]);
                return;
              } else if (responseJson.error == "Token is Invalid") {
                //this.sessionButton()
              }
              Keyboard.dismiss();
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });
  };

  saveDetails = (index, item) => {
    const self = this;

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(SID => {
        if (data) {
          this.setState({
            isLoading: true
          });

          fetch(
            API_BASE_URL +
              `admin/deletebarcode?barcode=${
                item.vbarcode
              }&token=${encodeURIComponent(data)}&sid=${SID}`,
            {
              method: "POST"
            }
          )
            .then(response => response.json())
            .then(responseJson => {
              //this.refs.loading.show(false);
              //console.log(responseJson)

              this.setState({
                isLoading: false
              });

              if (responseJson.success) {
                Alert.alert("", responseJson.success, [
                  {
                    text: "OK",
                    onPress: () => {
                      // let { dataSource } = self.state
                      // dataSource = dataSource.splice(1, index)
                      // this.setState({ dataSource })
                      this.updateData();
                    }
                  }
                ]);
                return;
              }

              if (responseJson.error) {
                //this.refs.loading.show(false);

                Alert.alert("", responseJson.error, [{ text: "OK" }]);
                return;
              } else if (responseJson.error == "Token is Invalid") {
                //this.sessionButton()
              }
              Keyboard.dismiss();
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });
  };

  renderItem = ({ item, index }) => {
    var swipeoutBtns = [
      {
        text: "Delect",
        fontWeight: "bold",
        backgroundColor: "#f15a2c",
        // borderRadius: 40,
        onPress: () => {
          Alert.alert(
            "",
            "Do you want to delect the Item",
            [
              {
                text: "Ok",
                onPress: () => this.saveDetails(index, item)
              },
              {
                text: "Canel",
                onPress: () => {
                  swipeoutBtns;
                }
              }
            ],
            {
              cancelable: false
            }
          );
          return true;
        }
      }
    ];

    // var swipeoutBtns = [

    //     {

    //         component: (
    //             <View
    //                 style={{

    //                     flex: 1,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     flexDirection: 'column',

    //                     // height: 40,
    //                     // width: 40,
    //                     // textAlign: 'center',
    //                     backgroundColor: "#f15a2c",

    //                     // borderRadius: "30%",
    //                     // marginLeft: 20,

    //                     // width: 40,
    //                     // height: 40,
    //                     // borderRadius: 44 / 2,

    //                     // buttonWidth: 200,

    //                 }}
    //             >
    {
      /* <MaterialCommunityIcons
                            name="delete"
                            size={30}
                            color="#fff"
                        /> */
    }
    {
      /* </View >
                ), */
    }

    // width: 40,
    // height: 40,
    // textAlign: 'center',
    // text: "Delect",
    // color: "#fff",

    //     }

    // ]

    console.log(item.estatus);
    return (
      <Swipeout right={swipeoutBtns} autoClose={true}>
        <View>
          <ScrollView>
            <View
              style={{
                // marginTop: 5, borderRightWidth: 0,
                // marginBottom: 2,
                // borderBottomWidth: 1,
                // borderBottomColor: '#f15a2c'
                marginTop: 3,
                borderBottomWidth: 0.3,
                borderBottomColor: "#3386D6"
              }}
            >
              {/* <TouchableOpacity onPress={this.nextscreen()}> */}

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: "0%",
                  marginBottom: "0%",
                  marginRight: "2%",
                  width: "100%"
                }}
              >
                <Text
                  style={{ marginLeft: "2%", marginRight: "5%", width: "70%" }}
                >
                  <Text
                    style={{ fontSize: 18, color: "#3386D6", marginRight: 10 }}
                  >
                    {item.vitemname + "  "}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#3386D6" }}>
                    ({item.vbarcode})
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Swipeout>
    );
  };

  updateData = () => {
    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(datasid => {
        if (data) {
          this.setState({
            isLoading: true
          });
          const url = API_BASE_URL + "admin/openstatus";
          fetch(url + "?token=" + data + "&sid=" + datasid)
            .then(response => response.json())
            .then(responsejson => {
              this.setState({
                isFetching: false,
                isLoading: false,
                dataSource: responsejson.table_data
              });

              if (responsejson.status == "success") {
                this.setState({
                  isFetching: false,
                  isLoading: false,
                  dataSource: responsejson.table_data
                });
              }

              if (!this.alertPresent) {
                this.setState({
                  isFetching: false,
                  isLoading: false
                });
                this.alertPresent = true;

                if (responsejson.status == "error") {
                  alert(responsejson.error);
                  this.alertPresent = true;
                } else {
                  this.alertPresent = false;
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    });
  };

  componentDidMount() {
    this.updateData();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff"
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      );
    }

    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            color: "#696969",
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          Item List
        </Text>
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />

        <TouchableOpacity
          style={styles.btncontainer1}
          onPress={this.LoginPress}
        >
          <Text style={styles.btntext}>Add New</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <View flexDirection="row" marginTop="0%">
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#3386D6",
                height: 40
              }}
            >
              <Text
                style={{
                  fontWeight: "300",
                  fontSize: 18,
                  color: "#fff",
                  flexDirection: "row",
                  fontWeight: "bold"
                }}
              >
                Item Name(Barcode)
              </Text>
            </View>
          </View>

          <FlatList
            // horizontal={true}

            data={this.state.dataSource}
            renderItem={this.renderItem}
            extraData={this.state}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            ItemSeparatorComponent={this.renderSeparator}
          />

          <TouchableOpacity
            style={styles.btncontainer2}
            onPress={this.closeAllOpneStatus}
          >
            <Text style={styles.btntext}>Clear</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.btncontainerr}>
                    <TouchableOpacity
                        style={styles.btncontainer2}
                        onPress={this.closeAllOpneStatus}
                    >
                        <Text style={styles.btntext}> Clear </Text>
                    </TouchableOpacity>
                </View> */}
        {/* <View style={{ marginTop: 20, color: 'red', height: '20%' }}> */}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    marginTop: 5,

    height: "80%"
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 70
  },
  btncontainer: {
    // marginTop: 10,
    bottom: 5,

    height: "100%",
    marginLeft: "2%%",
    marginEnd: "2%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center"
  },
  btncontainer1: {
    backgroundColor: "#3386D6",

    // marginTop: 10,

    borderRadius: 40,
    height: 40,
    marginLeft: "65%",
    width: "35%",
    alignItems: "center",
    justifyContent: "center"
  },
  btncontainer2: {
    backgroundColor: "#f15a2c",
    marginStart: "28%",
    // marginBottom: '20%',

    marginTop: 40,

    borderRadius: 40,
    height: 50,
    // marginLeft: "65%",
    top: 30,
    width: "35%",
    alignItems: "center",
    justifyContent: "center"
  },

  btntext: {
    //textAlign : 'center',
    fontSize: 20,
    fontWeight: "bold",

    color: "#fff"
  },
  btncontainerr: {
    flexDirection: "row",
    // marginBottom: '10%',
    marginBottom: "30%",

    height: "0%",
    bottom: "0%",
    backgroundColor: "red"
  },
  btntext1: {
    //textAlign : 'center',
    fontSize: 18,
    // fontWeight: "bold",
    color: "white"
  }
});
