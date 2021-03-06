import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, TouchableOpacity, Image, Keyboard,
    TextInput, AsyncStorage, Dimensions, Vibration, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import Camera from 'react-native-camera';
import Loading from 'react-native-whc-loading'
import { RNCamera } from 'react-native-camera';
import { NavigationEvents } from 'react-navigation'
import SearchableDropdown from 'react-native-searchable-dropdown';


export default class BarcodeAdd extends Component {

    static navigationOptions = {
        headerTitle: (
            <View style={{ flex: 1, alignItems: "center", marginRight: 20 }}>
                <Image source={require('../images/poslogo.jpg')}
                    style={{
                        height: 105,
                        width: 105, marginRight: 20, resizeMode: 'contain'
                    }} />
            </View>
        ),
        headerRight: (<View style={{ marginRight: 20 }}>
            {/* <FontAwesome name="bell" size={25} color="#16a0db" /> */}
            </View>)

    }
    componentDidMount() {
        this.barcode.clear()
        this.setState({ 'barcode': "" })
        this.state.barCodeScanned = true
        this.state.itemname = ""
        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    this.refs.loading.show(true);
                    const url = API_BASE_URL + 'admin/new_get_item_with_name?sid='
                    fetch(url + SID + "&token=" + data)
                        .then(response => response.json())
                        .then(responseJson => {
                            this.refs.loading.show(false);
                            //Successful response from the API Call
                            this.setState({
                                serverData: [...this.state.serverData, ...responseJson.item_data],
                                //adding the new data in Data Source of the SearchableDropdown
                            });

                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            })
        })

    }


    constructor(props) {
        super(props);
        let { width } = Dimensions.get('window');
        this.maskLength = (width * 85) / 100;
        this.camera = null;
        this.barcodeCodes = [];


        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
                barcodeFinderVisible: true
            },
            barcode: "",
            isLoading: false,
            barCodeScanned: true,
            serverData: [],
            itemname: ""
        };
    }
    cancelAlert = () => {
        this.barcode.clear()
        this.setState({ 'barcode': "" })

        this.state.barCodeScanned = true
    }

    gotoBarCodeList = () => {

        this.props.navigation.navigate('BarcodeTablePrint')

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

    screen = () => {
        const { barcode } = this.state;
        if (barcode == "") {
            Alert.alert(

                '',
                'Barcode missing Please check',
                [
                    { text: 'OK', },
                ]
            )
        } else {
            this.Nextscreen()
        }
    }




    Nextscreen = () => {





        if (this.state.barcode == "") {
            return
        }

        this.state.barCodeScanned = false;
        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {

                    this.setState(
                        {
                            isLoading: true,
                        },

                    );
                    fetch(API_BASE_URL + `admin/addbarcode?barcode=${this.state.barcode}&token=${encodeURIComponent(data)}&sid=${SID}`, {
                        method: 'POST',

                    }).then((response) => response.json())
                        .then((responseJson) => {
                            //this.refs.loading.show(false);

                            //console.log(responseJson)

                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );

                            if (responseJson.success) {

                                Alert.alert(

                                    '',
                                    responseJson.success,
                                    [
                                        { text: 'OK', onPress: () => this.cancelAlert() },
                                    ]
                                )
                                return;
                            }

                            if (responseJson.error) {
                                //this.refs.loading.show(false);

                                Alert.alert(

                                    '',
                                    responseJson.error,
                                    [
                                        { text: 'OK', onPress: () => this.cancelAlert() },
                                    ]
                                )
                                return;
                            }
                            else if (responseJson.error == 'Token is Invalid') {
                                //this.sessionButton()

                            }
                            Keyboard.dismiss();
                        })
                        .catch((error) => {
                            console.error(error)
                        });

                }

            });

        })

    }





    onBarCodeRead(scanResult) {

        if (this.state.barCodeScanned == false) {
            return
        }


        Vibration.vibrate()

        if (scanResult.type == "org.gs1.UPC-E") {

            AsyncStorage.getItem('UEUA').then(
                UEUA => {
                    if (UEUA == "1") {

                        // this.refs.loading.show(); 

                        fetch(API_BASE_URL + `convertupce2upca?upc=${encodeURIComponent(scanResult.data)}`, {

                            method: 'GET',

                        }).then((response) => response.json())
                            .then((responseJson) => {

                                // this.refs.loading.show(false);
                                if (responseJson.status == "success") {

                                    AsyncStorage.getItem('UPCAL').then(
                                        UPCAL => {
                                            if (UPCAL == "1") {

                                                AsyncStorage.getItem('UPCAR').then(
                                                    UPCAR => {
                                                        if (UPCAR == "1") {
                                                            this.setState({ "barcode": responseJson.data.substring(1, responseJson.data.length - 1) })
                                                            //if (this.state.barcode != '') this.Nextscreen();
                                                        } else {
                                                            this.setState({ "barcode": responseJson.data.substring(1) })
                                                            //if (this.state.barcode != '') this.Nextscreen();
                                                        }
                                                    }
                                                    //if (this.state.barcode != '') this.Nextscreen();
                                                )
                                                //if (this.state.barcode != '') this.Nextscreen();
                                            } else {

                                                AsyncStorage.getItem('UPCAR').then(
                                                    UPCAR => {
                                                        if (UPCAR == "1") {
                                                            this.setState({ "barcode": responseJson.data.substring(0, responseJson.data.length - 1) })
                                                            //if (this.state.barcode != '') this.Nextscreen();
                                                        } else {
                                                            this.setState({ 'barcode': responseJson.data })
                                                            //if (this.state.barcode != '') this.Nextscreen();
                                                        }
                                                        //if (this.state.barcode != '') this.Nextscreen();
                                                    }
                                                )

                                            }
                                        }
                                    )


                                } else if (responseJson.status == "error") {
                                    //this.setState({'barcode' : responseJson.data})
                                    Alert.alert(

                                        '',
                                        responseJson.message,
                                        [
                                            { text: 'OK', onPress: () => this.cancelAlert() },
                                        ]
                                    )
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    } else {

                        AsyncStorage.getItem('UPCEL').then(
                            UPCEL => {
                                if (UPCEL == "1") {

                                    AsyncStorage.getItem('UPCER').then(
                                        UPCER => {
                                            if (UPCER == "1") {
                                                this.setState({ "barcode": scanResult.data.substring(1, scanResult.data.length - 1) })
                                                //if (this.state.barcode != '') this.Nextscreen();
                                            } else {
                                                this.setState({ "barcode": scanResult.data.substring(1) })
                                                //if (this.state.barcode != '') this.Nextscreen();
                                            }
                                        }
                                    )

                                } else {

                                    AsyncStorage.getItem('UPCER').then(
                                        UPCER => {
                                            if (UPCER == "1") {
                                                this.setState({ "barcode": scanResult.data.substring(0, scanResult.data.length - 1) })
                                                //if (this.state.barcode != '') this.Nextscreen();
                                            } else {
                                                this.setState({ 'barcode': scanResult.data })
                                                //if (this.state.barcode != '') this.Nextscreen();
                                            }
                                        }
                                    )

                                }
                            }
                        )

                    }
                })

            if (this.state.barcode != '') this.Nextscreen();
        } else {

            var ScannedBarcodeResult = '';
            if (scanResult.data.length > 12)
                ScannedBarcodeResult = scanResult.data.substring(scanResult.data.length - 12)

            // scanned result UPCA 
            this.state.barCodeScanned = false;
            AsyncStorage.getItem('UAUE').then(
                UAUE => {
                    if (UAUE == "1") {
                        //this.refs.loading.show(); 

                        fetch(API_BASE_URL + `convertupca2upce?upc=${encodeURIComponent(ScannedBarcodeResult)}`, {

                            method: 'GET',

                        }).then((response) => response.json())
                            .then((responseJson) => {
                                // this.refs.loading.show(false);
                                if (responseJson.status == "success") {


                                    AsyncStorage.getItem('UPCEL').then(
                                        UPCEL => {
                                            if (UPCEL == "1") {

                                                AsyncStorage.getItem('UPCER').then(
                                                    UPCER => {
                                                        if (UPCER == "1") {
                                                            this.setState({ "barcode": responseJson.data.substring(1, responseJson.data.length - 1) })
                                                            if (this.state.barcode != '') this.Nextscreen();
                                                        } else {
                                                            this.setState({ "barcode": responseJson.data.substring(1) })
                                                            if (this.state.barcode != '') this.Nextscreen();
                                                        }
                                                    }
                                                )

                                            } else {

                                                AsyncStorage.getItem('UPCER').then(
                                                    UPCER => {
                                                        if (UPCER == "1") {
                                                            this.setState({ "barcode": responseJson.data.substring(0, responseJson.data.length - 1) })
                                                            if (this.state.barcode != '') this.Nextscreen();
                                                        } else {
                                                            this.setState({ 'barcode': responseJson.data })
                                                            if (this.state.barcode != '') this.Nextscreen();
                                                        }
                                                    }
                                                )

                                            }
                                        }
                                    )
                                } else if (responseJson.status == "error") {
                                    //this.setState({'barcode' : responseJson.data})
                                    Alert.alert(
                                        '',
                                        responseJson.message,
                                        [
                                            { text: 'OK', onPress: () => this.cancelAlert() },
                                        ]
                                    )
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    } else {

                        AsyncStorage.getItem('UPCAL').then(
                            UPCAL => {
                                if (UPCAL == "1") {

                                    AsyncStorage.getItem('UPCAR').then(
                                        UPCAR => {
                                            if (UPCAR == "1") {
                                                this.setState({ "barcode": ScannedBarcodeResult.substring(1, ScannedBarcodeResult.length - 1) })
                                                if (this.state.barcode != '') this.Nextscreen();

                                            } else {
                                                this.setState({ "barcode": ScannedBarcodeResult.substring(1) })
                                                if (this.state.barcode != '') this.Nextscreen();
                                            }
                                        }
                                    )

                                } else {

                                    AsyncStorage.getItem('UPCAR').then(
                                        UPCAR => {
                                            if (UPCAR == "1") {
                                                this.setState({ "barcode": ScannedBarcodeResult.substring(0, ScannedBarcodeResult.length - 1) })
                                                if (this.state.barcode != '') this.Nextscreen();
                                            } else {
                                                this.setState({ 'barcode': ScannedBarcodeResult })
                                                if (this.state.barcode != '') this.Nextscreen();
                                            }
                                        }
                                    )

                                }
                            }
                        )

                    }
                })

            //if (this.state.barcode != '') this.Nextscreen();

        }


    }






    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <ActivityIndicator size={"large"} />
                </View>
            );
        }
        return (


            <View style={styles.container}>

                <NavigationEvents onDidFocus={() => this.componentDidMount()} />

                <View style={{ marginTop: 5, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6', bottom: 5 }}>Add Barcode </Text>
                    <TouchableOpacity
                        style={styles.btncontainer}
                        onPress={this.gotoBarCodeList}
                    >
                        <Text style={styles.btntext}>Barcode List</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 5 }}>


                    <SearchableDropdown
                        // onTextChange={qoh => this.setState({ qoh })}

                        onTextChange={qoh => this.setState({ qoh })}

                        onItemSelect={(item) => {
                            this.state.barcode = item.vbarcode,
                                this.state.itemname = item.name,
                                resetValue = true,

                                this.Nextscreen()




                        }

                        }


                        containerStyle={{ padding: 0 }}
                        //suggestion container style
                        textInputStyle={{
                            alignSelf: "stretch",
                            height: 40,
                            width: "90%",
                            marginStart: 10,
                            borderRadius: 3,
                            backgroundColor: '#636466',
                            marginBottom: 10,
                            color: '#fff',
                            fontSize: 15,
                            paddingHorizontal: 20,
                        }}
                        itemStyle={{
                            //single dropdown item style
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#3386D6',
                            borderColor: '#bbb',
                            borderWidth: 1,
                        }}
                        itemTextStyle={{
                            //text style of a single dropdown item
                            color: 'white',
                        }}
                        itemsContainerStyle={{
                            //items container style you can pass maxHeight
                            //to restrict the items dropdown hieght
                            maxHeight: '70%',
                        }}
                        items={this.state.serverData}
                        //mapping of item array
                        defaultIndex={0}
                        //default selected item index
                        placeholder="Enter Item Name"
                        placeholderTextColor="white"
                        //place holder for the search input
                        resetValue={true}
                        //reset textInput Value with true and false state
                        underlineColorAndroid="transparent"


                    //To remove the underline from the android input
                    />

                </View>


                <View style={{ margin: 5 }}>
                    <TextInput
                        ref={input => { this.barcode = input }}
                        style={styles.input}
                        placeholder="Enter Barcode"
                        placeholderTextColor='white'
                        returnKeyType="done"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.barcode}
                        onChangeText={barcode => this.setState({ barcode })}
                        onSubmitEditing={() => this.screen()} />

                </View>
                <CardView
                    cardElevation={6}
                    cardMaxElevation={1}
                    cornerRadius={3}
                    style={{ margin: 10 }}>

                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                        barcodeFinderWidth={280}
                        barcodeFinderHeight={220}
                        barcodeFinderBorderColor="green"
                        barcodeFinderBorderWidth={2}
                        defaultTouchToFocus
                        flashMode={this.state.camera.flashMode}
                        mirrorImage={false}
                        onBarCodeRead={this.onBarCodeRead.bind(this)}
                        onFocusChanged={() => { }}
                        onZoomChanged={() => { }}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        style={styles.preview}
                        type={this.state.camera.type}>
                        <View style={styles.overlay} />
                        <View style={[styles.contentRow, { height: 190 }]}>
                            <View style={styles.overlay} />
                            <View style={[styles.content, { width: 300, height: 190 }]} />
                            <View style={styles.overlay} />
                        </View>
                        <View style={styles.overlay} />

                    </RNCamera>


                </CardView>

                <Loading ref="loading" />
            </View>

        );
    }
}


const styles = {
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    preview: {
        width: this.maskLength,
        height: 200,
        alignItems: 'center'
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    contentRow: {
        flexDirection: 'row',
    },

    content: {
        borderWidth: 2,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        //width: 250,
        alignSelf: "stretch",
        height: 40,
        width: "90%",
        marginStart: 10,
        borderRadius: 3,
        backgroundColor: '#636466',
        marginBottom: 10,
        color: '#fff',
        fontSize: 15,
        paddingHorizontal: 20,
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    scanScreenMessage: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btncontainer: {
        backgroundColor: "#3386D6",


        // marginTop: 10,

        borderRadius: 40,
        height: 40,
        marginLeft: "60%",
        width: "35%",
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 5,



    },
    btntext: {
        //textAlign : 'center',
        fontSize: 20,
        fontWeight: "bold",



        color: "#fff"
    }
};


