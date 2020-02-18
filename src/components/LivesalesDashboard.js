import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesignn from "react-native-vector-icons/FontAwesome";
import CardView from "react-native-cardview";

export default class Livesalesdashboard extends Component {
  myfun = () => {
    this.props.navigation.navigate("Transations");
  };

  static navigationOptions = {
    Title: "Home",
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
        <Image
          source={require("../images/poslogo.jpg")}
          style={{
            height: 130,
            width: 130,
            marginRight: 20,
            resizeMode: "contain"
          }}
        />
      </View>
    ),
    headerRight: (
      <View style={{ marginRight: 20 }}>
        <AntDesignn name="bell" size={25} color="#16a0db" />
      </View>
    )
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, color: "#fff" }}>
        <View style={styles.container}>
          <View style={{ alignItems: "center", padding: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: "700", color: "#3386D6" }}>
              Tutorials
            </Text>
          </View>

          <View style={{ flexDirection: "column", margin: 10 }}>
            {/* onPress = {()=>this.props.navigation.navigate('BarcodeupdateImg') */}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Flip", {
                  myUrl: "TDY7oOuY6sg"
                })
              }
            >
              <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={10}
                style={styles.card1}
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
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "80%",
                        color: "#f2f2f2",
                        fontSize: 20,
                        fontWeight: "700",
                        marginLeft: "40%",
                        justifyContent: "center"
                      }}
                    >
                      Basic POS Settings
                    </Text>
                    <FontAwesome
                      name="play"
                      size={30}
                      color="#f2f2f2"
                      style={{ width: "30%" }}
                    />
                  </View>
                </LinearGradient>
              </CardView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Flip", {
                  myUrl: "vCI3cpbHX-4"
                })
              }
            >
              <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={10}
                style={styles.card1}
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
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "80%",
                        color: "#f2f2f2",
                        fontSize: 20,
                        fontWeight: "700",
                        marginLeft: "40%",
                        justifyContent: "center"
                      }}
                    >
                      User Tutorial
                    </Text>
                    <FontAwesome
                      name="play"
                      size={30}
                      color="#f2f2f2"
                      style={{ width: "30%" }}
                    />
                  </View>
                </LinearGradient>
              </CardView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Flip", {
                  myUrl: "1xoePbgoUSQ"
                })
              }
            >
              <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={10}
                style={styles.card1}
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
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "80%",
                        color: "#f2f2f2",
                        fontSize: 20,
                        fontWeight: "700",
                        marginLeft: "40%",
                        justifyContent: "center"
                      }}
                    >
                      Vendor Tutorial
                    </Text>
                    <FontAwesome
                      name="play"
                      size={30}
                      color="#f2f2f2"
                      style={{ width: "30%" }}
                    />
                  </View>
                </LinearGradient>
              </CardView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Flip", {
                  myUrl: "3hEwh6U2h84"
                })
              }
            >
              <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={10}
                style={styles.card1}
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
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "80%",
                        color: "#f2f2f2",
                        fontSize: 20,
                        fontWeight: "700",
                        marginLeft: "40%",
                        justifyContent: "center"
                      }}
                    >
                      Item Tutorial
                    </Text>
                    <FontAwesome
                      name="play"
                      size={30}
                      color="#f2f2f2"
                      style={{ width: "30%" }}
                    />
                  </View>
                </LinearGradient>
              </CardView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Flip", {
                  myUrl: "h6P-gOZBs74"
                })
              }
            >
              <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={10}
                style={styles.card1}
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
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "80%",
                        color: "#f2f2f2",
                        fontSize: 20,
                        fontWeight: "700",
                        marginLeft: "40%",
                        justifyContent: "center"
                      }}
                    >
                      Advance Item Tutorial
                    </Text>
                    <FontAwesome
                      name="play"
                      size={30}
                      color="#f2f2f2"
                      style={{ width: "30%" }}
                    />
                  </View>
                </LinearGradient>
              </CardView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Flip", {
                  myUrl: "LtHw57w8bzM"
                })
              }
            >
              <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={10}
                style={styles.card1}
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
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "80%",
                        color: "#f2f2f2",
                        fontSize: 20,
                        fontWeight: "700",
                        marginLeft: "40%",
                        justifyContent: "center"
                      }}
                    >
                      Item Labeling
                    </Text>
                    <FontAwesome
                      name="play"
                      size={30}
                      color="#f2f2f2"
                      style={{ width: "30%" }}
                    />
                  </View>
                </LinearGradient>
              </CardView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Flip", {
                  myUrl: "oJt8SzR9zqg"
                })
              }
            >
              <CardView
                cardElevation={4}
                cardMaxElevation={4}
                cornerRadius={10}
                style={styles.card1}
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
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "80%",
                        color: "#f2f2f2",
                        fontSize: 20,
                        fontWeight: "700",
                        marginLeft: "40%",
                        justifyContent: "center"
                      }}
                    >
                      Purchase Orders
                    </Text>
                    <FontAwesome
                      name="play"
                      size={30}
                      color="#f2f2f2"
                      style={{ width: "30%" }}
                    />
                  </View>
                </LinearGradient>
              </CardView>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card1: {
    // backgroundColor: '#16a0db',
    alignItems: "center",
    borderRadius: 3,
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,

    height: 60,
    width: "100%",
    marginTop: 20
  },
  card2: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 60,

    width: "100%"
  }
});
