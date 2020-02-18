import React, { Component } from "react";
import {
    AsyncStorage,
    StyleSheet,
    TextInput,
    Text,
    KeyboardAvoidingView,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    value,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { CheckBox } from "react-native-elements";
import Entypo from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PhotoUpload from "react-native-photo-upload";
import Loading from "react-native-whc-loading";

export default class UpadteImage extends React.Component {
    static navigationOptions = {
        headerTitle: (
            <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
                <Image
                    source={require("../images/poslogo.jpg")}
                    style={{
                        height: 105,
                        width: 105,
                        marginRight: 50,
                        resizeMode: "contain"
                    }}
                />
            </View>
        ),
        // headerRight: (
        //     <View style={{ marginRight: 20 }}>
        //         <FontAwesome name="bell" size={25} color="#16a0db" />
        //     </View>
        // )
    };

    constructor() {
        super();
        this.state = {
            check: true,
            vitemname: "",
            dcostprice: "",
            nsaleprice: ""
        };
    }

    Backscreen = () => {
        this.props.navigation.navigate('BarcodeupdateImg', {
            SKU: ''
        })
    }

    buttonClickded = () => {
        this.refs.loading.show(false);
        Alert.alert(
            "",
            "Image Uploaded succesfully",
            [

                { text: "OK", onPress: () => this.Backscreen() }
            ],
            { cancelable: false }
        );
    };
    errorClickded = () => {
        this.refs.loading.show(false);
        Alert.alert(

            '',
            'Sorry, this barcode not prasent in the database',
            [
                { text: 'OK', onPress: () => this.Backscreen() },
            ]
        )
    };


    componentDidMount() {
        SKU = this.props.navigation.getParam(encodeURIComponent("sku"));
        if (SKU) {
            this.setState({ SKU: SKU });
            AsyncStorage.getItem("Sid").then(data => {
                if (data) {
                    this.refs.loading.show();
                    STORE_ID = data;
                    API_URL = API_BASE_URL + "getimage/";
                    fetch(API_URL, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            sid: STORE_ID,
                            sku: SKU
                        })
                    })
                        .then(response => response.json())
                        .then(responseJson => {
                            this.refs.loading.show(false);
                            if (responseJson.vitemname) {
                                this.setState({
                                    image: "data:image/gif;base64," + responseJson.data,
                                    vitemname: responseJson.vitemname,
                                    dcostprice: responseJson.dcostprice,
                                    nsaleprice: responseJson.dunitprice
                                });
                            } else if (responseJson.error) {
                                this.errorClickded()

                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        }
    }

    saveNPLItemDetails = () => {
       AsyncStorage.getItem("Sid").then(data => {
            if (data) {
               STORE_ID = data;
                API_URL = API_BASE_URL + "uploadbase64image/";
                fetch(API_URL, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sid: STORE_ID,
                        sku: this.state.SKU,
                        image: this.state.uploadedImage
                    })
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        // this.refs.loading.show(false);
                        if (responseJson) {
                            if (responseJson.status == "success") {
                                // Alert.alert(responseJson.message);

                                this.buttonClickded()



                            }
                        } else {
                            alert("Something went wrong!");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    };
    cancelBtnPress = () => {
        // alert("Under development");

        this.props.navigation.navigate('BarcodeupdateImg', {
            sku: ""
        })


    };

    render() {
        return (
            <View style={styles.MainContainer}>
                <View
                    style={{
                        marginTop: 5,
                        marginBottom: 10,
                        alignContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: "700",
                            color: "#3386D6"
                        }}
                    >
                        Upload Picture
                    </Text>
                </View>

                <View style={styles.logocontainer}>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.setTextSize}>Item Name</Text>
                    </View>
                    <View style={{ width: '60%' }}>
                        <TextInput
                            value={this.state.vitemname}
                            editable={false}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={styles.logocontainer}>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.setTextSize}>Cost</Text>
                    </View>
                    <View style={{ width: '60%' }}>

                        <TextInput
                            style={styles.input}
                            value={this.state.dcostprice}
                            editable={false}
                            returnKeyType="next"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                </View>

                <View style={styles.logocontainer}>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.setTextSize}>Price</Text>
                    </View>
                    <View style={{ width: '60%' }}>

                        <TextInput
                            style={styles.input}
                            value={this.state.nsaleprice}
                            editable={false}
                            returnKeyType="next"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                </View>
                <Text style={{ textAlign: "center" }}>
                    Tap on image to select Photo
                </Text>
                <View style={styles.log}>
                    <PhotoUpload
                        onPhotoSelect={avatar => {
                            if (avatar) {
                                this.setState({ uploadedImage: avatar });
                                // console.log('Image base64 string: ', "data:image/jpg;base64,"+avatar)
                            }
                        }}
                    >
                        <Image
                            style={{
                                paddingVertical: 30,
                                width: 250,
                                height: 250,
                                borderRadius: 7,

                            }}
                            resizeMode="cover"
                            source={{
                                uri:
                                    this.state.image != ""
                                        ? this.state.image
                                        : "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                            }}
                        />
                    </PhotoUpload>
                </View>

                <View style={styles.btncontainerr}>
                    <TouchableOpacity
                        style={styles.btncontainer}
                        onPress={this.saveNPLItemDetails}
                    >
                        <Text style={styles.btnText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btncontainer}
                        onPress={this.cancelBtnPress}
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <Loading ref="loading" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logocontainer: {
        marginTop: 0,
        marginBottom: 3,
        marginLeft: 10,
        flexDirection: "row"
    },

    btncontainerr:{
    marginLeft: 50,
    flexDirection: 'row',

    },
    log: {
        width: 250,
        height: 250,
        marginStart: 50,
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        borderColor: '#ccc',
        borderWidth: 8,
        flexDirection: "row"
    },
    MainContainer: {
        flex: 1,

        // Set content's vertical alignment.
        // justifyContent: 'center',

        // // Set content's horizontal alignment.
        // alignItems: 'center',

        // Set hex color code here.
        backgroundColor: "#fff"
    },
    taxContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        marginRight: 5,
        flexDirection: "row"
    },
    foodContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 0,
        flexDirection: "row"
    },

    setTextSize: {
        marginTop: 10,
        width: 90,
        height: 50,
        marginLeft: 0,
        color: 'white',
        fontWeight: 'bold',
        flexDirection: 'row',
        color: "#286fb7",
    },

    setCheckMark: {
        width: 50,
        height: 50,
        marginLeft: 70
        //  color: 'white'
    },
    input: {
        //width: 250,
        alignSelf: "stretch",
        height: 40,
        backgroundColor: '#ccc',

        marginEnd: 10,
        borderRadius: 3,
        borderRightWidth: 1,
        borderRightColor: '#636466',
        borderLeftWidth: 1,
        borderLeftColor: '#636466',
        borderTopWidth: 1,
        borderTopColor: '#636466',
        borderBottomWidth: 1,
        borderBottomColor: '#636466',

        marginBottom: 10,
        color: '#000',
        fontSize: 15,
        paddingHorizontal: 20,
    },
    input1: {
        //width: 250,
        alignSelf: "stretch",
        marginRight: 10,
        marginLeft: 20,
        height: 40,
        width: 230,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        color: "#000",
        fontSize: 15,
        paddingHorizontal: 20
    },
    btncontainer: {
       
        backgroundColor: '#f15a2c',
        paddingVertical: 15,
        borderRadius: 10,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        width: "30%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
        alignItems: 'center'
    },
});