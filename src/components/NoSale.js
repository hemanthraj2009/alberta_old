import React, { Component } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationEvents } from "react-navigation";
// import {CompleteFlatList} from 'react-native-complete-flatlist';
import { ScrollView } from "react-native-gesture-handler";
import * as css from "./Styles";

export default class NoSale extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.setState({ NOSALE_NOTIFICATION: null });
  }

  componentDidMount() {
    // alert("no sale")
    AsyncStorage.getItem("Sid").then(data => {
      if (data) {
        STORE_ID = data;
        API_URL = `https://portal.albertapayments.com/api/notifications_new/${data}`;
        return fetch(API_URL)
          .then(response => response.json())
          .then(responseJson => {
            this.setState({ isLoading: false });

            this.setState({ NOSALE_NOTIFICATION: responseJson.no_sale });
          })
          .catch(error => {
            // console.error(error);
            alert("Sommething went  wrong! Please try again later!");
          });
      }
    });
  }

  renderRow({ item }) {
    const time = `${item.time}`;
    const itemName = `${item.message}`;
    // const temp = css.addDegreesToEnd(item.currentTemp);

    let actualRowComponent = (
      <View style={css.home_screen_list.row}>
        <View style={css.home_screen_list.row_cell_timeplace}>
          <Text style={css.home_screen_list.row_time}>{time}</Text>
          <Text style={css.home_screen_list.row_place}>{itemName}</Text>
        </View>

        {/* <Text style={css.home_screen_list.row_cell_temp}>{count}</Text> */}
      </View>
    );

    let touchableWrapperIos = (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={css.colors.transparent_white}
        onPress={() => {
          // this._navigation.navigate("DetailsRoute", {...item});
        }}
      >
        {actualRowComponent}
      </TouchableHighlight>
    );

    let touchableWrapperAndroid = (
      <TouchableNativeFeedback
        useForeground={true}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={() => {
          // this._navigation.navigate("DetailsRoute", {...item});
        }}
      >
        {actualRowComponent}
      </TouchableNativeFeedback>
    );

    if (require("react-native").Platform.OS === "ios") {
      return touchableWrapperIos;
    } else return touchableWrapperAndroid;
  }

  static navigationOptions = {
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
        <FontAwesome name="bell" size={25} color="#16a0db" />
      </View>
    )
  };

  render() {
    const { navigation } = this.props;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView>
         <NavigationEvents onDidFocus={() => this.componentDidMount()} /> 
        <View style={css.home_screen.v_container}>
          <FlatList
            style={css.home_screen_list.container}
            data={this.state.NOSALE_NOTIFICATION}
            renderItem={this.renderRow}
          />
        </View>
      </ScrollView>
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    backgroundColor: "#068AD6"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
