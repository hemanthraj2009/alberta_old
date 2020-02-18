import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import TopBarNav from "top-bar-nav";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationEvents } from "react-navigation";

import NoSale from "./NoSale";
import VoidPage from "./VoidPage";
import Delete from "./Delete";
import { TableView } from "react-native-tableview-simple";
// import console = require('console');

const Scene = ({ index }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 20 }}>{index}</Text>
  </View>
);

const ROUTES = {
  Scene
  // ideally you would have a ROUTES object with multiple React component scenes
};

const ROUTESTACK = [
  { text: "NoSale", title: "Scene" },
  { text: "Void", title: "Scene" }, // title is just the name of the Component being rendered.  See the renderScene property below
  { text: "Delete", title: "Scene" }
];
// const ROUTESTACK = [
//   { text: "NoSale", title: "Scene" },
//   { text: "Void", title: "Scene" }, // title is just the name of the Component being rendered.  See the renderScene property below
//   { text: "Delete", title: "Scene" }
// ];


export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount  () {
    //initialIndex={this.props.navigation.getParam(("index"))}
    //alert(this.props.navigation.getParam(("index")))
    this.setState({ screen: this.props.navigation.getParam("index") });
    this.render()
  }

  static navigationOptions = {
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
        <Image
          source={require("../images/poslogo.jpg")}
          style={{
            height: 105,
            width: 105,
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

  Nextscreen = () => {
    this.props.navigation.navigate("Dashboard");
  };

  render() {
    //  alert(this.props.navigation.getParam(("index")))
    //  var screen = this.state.screen
     //
    // alert(screen)
    
    return (
      
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
         <NavigationEvents onDidFocus={() => this.componentDidMount()} /> 
      
        <TopBarNav
      
          // routeStack and renderScene are required props
          routeStack={ROUTESTACK}
          
          renderScene={(route, i) => {
           
            // This is a lot like the now deprecated Navigator component
            let Component = ROUTES[route.title];
            
            if (i == 0) {
              return <NoSale />;
            }
            if (i == 1) {
              return <VoidPage />;
            }
            if (i == 2) {
              return <Delete />;
            }
            //<Component index={i} />
          }}
          // Below are optional props
          headerStyle={[styles.headerStyle,{ paddingTop: 30 }]} // probably want to add paddingTop if using TopBarNav for the  entire height of screen to account for notches/status bars
          labelStyle={styles.labelStyle}
          initialIndex={1}
          
          underlineStyle={styles.underlineStyle}
          imageStyle={styles.imageStyle}
          sidePadding={40} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
          inactiveOpacity={1}
          fadeLabels={true}
        />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  headerStyle: {
    width: "100%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#e6faff",
    backgroundColor: "#fff"
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff"
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: "#e6faff"
  },
  underlineStyle: {
    height: 3.6,
    backgroundColor: "#3386D6",
    width: "100%"
  }
});
