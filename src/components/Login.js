import React from "react";
import {
  TextInput,
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
  AsyncStorage,
  Alert,
  Keyboard
} from "react-native";
import CardView from "react-native-cardview";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
import Snackbar from "react-native-snackbar";
import Loading from "react-native-whc-loading";
import Spinner from "react-native-loading-spinner-overlay";
const ACCESS_TOKEN = "access_token";
import PasswordInputText from "react-native-hide-show-password-input";
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment-timezone'


export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      hidePassword: true,
      check: true,
      email: "",
      password: "",
      error: "",
      isLoading: false,
      checked: false,
      AUTH: false,
    };

  }
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
  
  componentWillUnmount(){
   AsyncStorage.removeItem("AUTH")
   if(this.state.AUTH)
    {
     AsyncStorage.setItem("AUTH","1")
    }
    this.props.navigation.navigate('Home')
 }
  
 componentDidMount(){
  AsyncStorage.getItem('AUTH').then(
    AUTH => {
      if(AUTH)
      {
       this.setState({
          AUTH : false
        })
      } 
  })
}
loginWithToken = () => {
    if(this.state.AUTH) {
      AsyncStorage.getItem("token").then(data => {
        if (data) {
          AsyncStorage.setItem("AuthPassword", data);
          AsyncStorage.getItem("AuthPassword").then(AuthPassword => {
          if (AuthPassword) {
          }
          });
        }
      });

    }
    if (this.state.checked) {
      AsyncStorage.getItem("token").then(data => {
        if (data) {
          AsyncStorage.setItem("savedPassword", data);
          AsyncStorage.getItem("savedPassword").then(save => {
          if (save) {
            
          }
          });
        }
      });
    }

    this.refs.loading.show();
    AsyncStorage.getItem("token").then(data => {
      if (data) {
         var date = moment()

        .format("MM-DD-YYYY");
        //API_URL = `https://portal.albertapayments.com/api/me_new_date?token=${encodeURIComponent(data)}&date=${date}`;
        API_URL = LOGIN_BASE_URL1 + `${encodeURIComponent(data)}&date=${date}`;
        fetch(API_URL, {
          method: "GET"
        })
          .then(response => response.json())
          .then(responseJson => {
            this.refs.loading.show(false);
            if (responseJson.error=='Something is wrong') {
              //this.sessionButton();
              //alert(responseJson.error)
              alert('working')
            }
            if(responseJson.error=='Session expired'){
              alert(responseJson.error)
            }
            if (responseJson.user.email) {
              AsyncStorage.setItem("fname", responseJson.user.fname);
              AsyncStorage.setItem("lname", responseJson.user.lname);
              AsyncStorage.setItem("emailid", responseJson.user.email);
              AsyncStorage.setItem(
                "Storename",
                responseJson.user.stores[0].name
              );
              AsyncStorage.setItem(
                "Sid",
                JSON.stringify(responseJson.user.stores[0].SID)
              );
              AsyncStorage.setItem(
                "void",
                JSON.stringify(responseJson.user.stores[0].voids)
              );
              AsyncStorage.setItem("sales", responseJson.user.stores[0].sales);
              AsyncStorage.setItem(
                "delete",
                JSON.stringify(responseJson.user.stores[0].deletes)
              );
              AsyncStorage.setItem(
                "role_name",
                responseJson.user.roles[0].name
              );
              AsyncStorage.setItem("tax", responseJson.user.stores[0].tax);
              AsyncStorage.setItem(
                "paid_out",
                responseJson.user.stores[0].paid_out
              );
              AsyncStorage.setItem(
                "returns",
                responseJson.user.stores[0].returns
              );
              AsyncStorage.setItem(
                "No_Sales",
                responseJson.user.stores[0].No_Sales
              );
              showcategary = responseJson.user.stores[0].isnewdatabase;
              this.Gonext();
            }
            Keyboard.dismiss();
          })
          .catch(error => {
            alert("Something went wrong! Please try again later!!!!");
          });
      }
    });
};

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  Nextscreen = () => {

    if(this.state.AUTH)
    {
     AsyncStorage.setItem("AUTH","1")
    
    }

    Keyboard.dismiss();
    const { email } = this.state;
    const { password } = this.state;
    if (email == "") {
      this.setState({ msg: "Please enter valid email" });
    } else if (password == "") {
      this.setState({ msg: "Please enter valid password" });
    } else if((this.state.checked && this.state.AUTH)){
      this.setState({ msg: "Please select any one Checkbox" });
    }else{
      this.onLoginPressed();
    }
  };

  Gonext = () => {
    this.props.navigation.navigate("Stacknav");
  };

 

  onLoginPressed = () => {
    this.refs.loading.show();
    API_URL = LOGIN_BASE_URL + "authenticate_new";

    fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.refs.loading.show(false);
        if (responseJson.error) {
          this.setState({ msg: "Username or password not match" });
        } else if (responseJson.token) {
          AsyncStorage.setItem("token", responseJson.token);
          this.loginWithToken();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  checkbox = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior="position"
            enabled
            style={styles.formcontainer}
          >
            <Text
              style={{
                color: "red",
                fontSize: 18,
                marginLeft: 10,
                marginBottom: 20,
                fontWeight: "400"
              }}
            >
              {this.state.msg}
            </Text>

            <View style={styles.inputbar}>
              <View
                style={{
                  height: 40,
                  width: "10%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#286fb7",
                  borderRightWidth: 1,
                  borderRightColor: "#ebebeb",
                  borderTopLeftRadius: 3,
                  borderBottomLeftRadius: 3
                }}
              >
                <FontAwesome name="user" size={16} color="#fff" />
              </View>

              <TextInput
                style={styles.input}
                placeholder="User Name (Email)"
                placeholderTextColor="white"
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => this.PasswordInput.focus()}
              />
            </View>

            {/* <View style = { styles.textBoxBtnHolder }> */}

            <View style={styles.inputbarr}>
              <View
                style={{
                  height: 40,
                  width: "10%",
                  alignItems: "center",
                  borderTopLeftRadius: 3,
                  borderBottomLeftRadius: 3,
                  justifyContent: "center",
                  borderRightWidth: 1,
                  borderRightColor: "#ebebeb",
                  backgroundColor: "#286fb7"
                }}
              >
                <FontAwesome name="lock" size={16} color="#fff" />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Password"
                returnKeyType="go"
                secureTextEntry={this.state.hidePassword}
                ref={input => (this.PasswordInput = input)}
                onChangeText={password => this.setState({ password })}
                placeholderTextColor="white"
              />

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.visibilityBtn}
                onPress={this.managePasswordVisibility}
              >
                <FontAwesome
                  name={this.state.hidePassword ? "eye-slash" : "eye"}
                  size={25}
                  color="#fff"
                ></FontAwesome>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btncontainer}
              onPress={this.Nextscreen}
            >
              <Text style={styles.btntext}>Login</Text>
            </TouchableOpacity>

           <View style={{flexDirection : 'row'}}>

            <View
              style={{marginTop: "5%" , width : '50%'}}
            >
              <CheckBox
                checkedIcon={
                  <Entypo name="checksquare" size={25} color="#f15a2c" />
                }
                uncheckedIcon={
                  <FontAwesome name="square-o" size={25} color="#286fb7" />
                }
                title="Save Username"
               // title="Save Logged in"
                checked={this.state.checked}
                onPress={() => this.checkbox()}
              ></CheckBox>
              <Loading ref="loading" />
            </View>

            <View
              style={{marginTop: "5%",width : '50%' }}
            >
              <CheckBox
                checkedIcon={
                  <Entypo name="checksquare" size={25} color="#f15a2c" />
                }
                uncheckedIcon={
                  <FontAwesome name="square-o" size={25} color="#286fb7" />
                }
                title="Use Touch-id"
                checked={this.state.AUTH}
                onPress={() => this.setState({ AUTH: !this.state.AUTH })}/>
              
            
            </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff"
  },
  formcontainer: {
    marginTop: 150,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  textBoxBtnHolder: {
    flexDirection: "row"
  },

  checkboxstyle: {},

  container: {
    flexGrow: 1,
    backgroundColor: "#FAFBFD"
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#16a0db"
  },
  bcontainer: {
    padding: 10,
    justifyContent: "center",
    marginBottom: 0
  },
  titleStylesuc: {
    fontSize: 15
  },
  messageStyle: {
    fontSize: 15
  },

  messageStyled: {
    fontSize: 13
  },
  titleStylenotrgt: {
    fontSize: 15
  },

  cancelButtonStyle: {
    width: 80,
    height: 40,
    alignItems: "center"
  },

  confirmButtonTextStyle: {
    width: 80,
    height: 40,
    alignItems: "center"
  },

  logocontainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center"
  },
  inputbar: {
    marginStart: 10,
    marginEnd: 10,
    flexDirection: "row"
  },
  inputbarr: {
    marginStart: 10,
    flexDirection: "row",
    marginEnd: 10,
    marginTop: 5
  },
  seprator: {
    borderBottomWidth: 0.8,
    borderBottomColor: "#ebebeb",
    marginBottom: 5,
    marginTop: 5
  },

  visibilityBtn: {
    position: "absolute",
    right: 15,
    height: 40,
    width: 35,
    padding: 5
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  input: {
    alignSelf: "stretch",
    height: 40,
    width: "90%",
    marginEnd: 10,
    borderRadius: 3,
    backgroundColor: "#636466",
    marginBottom: 10,
    color: "#fff",
    fontSize: 15,
    paddingHorizontal: 20
  },
  btnImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  },

  btncontainer: {
    backgroundColor: "#f15a2c",

    borderRadius: 10,
    height: 40,
    marginStart: "28%",
    width: "45%",

    alignItems: "center",
    justifyContent: "center"
  },

  btntext: {
    //textAlign : 'center',
    fontSize: 20,

    alignItems: "center",
    color: "#fff"
  }
});
