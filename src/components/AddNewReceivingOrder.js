import React, { Component } from 'react';
import {
    StyleSheet, TextInput, Text,
    KeyboardAvoidingView, View, Image, TouchableOpacity, ScrollView, value, AsyncStorage, Alert, Keyboard, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from 'react-native-whc-loading'
import DatePicker from 'react-native-datepicker'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { NavigationEvents } from 'react-navigation'
export default class AddNewReceivingOrder extends React.Component {
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
            {/* <FontAwesome name="bell" size={25} color="#16a0db" /> */}
          </View>
        )
      };
    constructor() {
        super();
        this.state = {
            check: true,
            item: "",
            invoiceNo: "",
            qoh: "",
            salesPrice: "",
            barCodeNumber: "",
            grossvalue: "",

            date: new Date(),
            serverData: [],
            itemname: "",
            suppliercode: "",
            isLoading: false,

        }
    }

    componentDidMount() {

        this.state.invoiceNo = ""


        AsyncStorage.getItem("Sid").then(datasid => {
            AsyncStorage.getItem("token").then(data => {

                if (data) {
                    this.refs.loading.show(true);
                    // this.setState(
                    //     {
                    //         isLoading: true,
                    //     },

                    // );

                    const url = API_BASE_URL + 'admin/get_new_vendor_list?sid='
                    fetch(url + datasid + "&token=" + data)
                        .then(response => response.json())
                        .then(responseJson => {
                            this.refs.loading.show(false);
                            // this.setState(
                            //     {
                            //         isLoading: false,

                            //     },

                            // );
                            //Successful response from the API Call
                            this.setState({
                                serverData: [...this.state.serverData, ...responseJson.vendor_data],
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



    getReportData = (date) => {
        this.setState({ date: date })

    }


    saveNPLItemDetails = () => {




        const self = this
        if (this.state.invoiceNo == "") {

            alert("Please enter the Invoice -No")
            return
        }

        if (this.state.serverData.item == "") {

            alert("Please insert Vendor name ")
            return
        }

        AsyncStorage.setItem(
            "supplier_id",
            JSON.stringify(this.state.suppliercode)
        );

        AsyncStorage.getItem("Sid").then(datasid => {
            AsyncStorage.getItem("token").then(data => {

                if (data) {
                    // this.refs.loading.show(true);
                    this.setState(
                        {
                            isLoading: true,
                        },
                    )

                    fetch(API_BASE_URL + `admin/insert_ro_details?token=${data}`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            vvendorid: this.state.suppliercode,
                            sid: datasid,
                            vinvoiceno: this.state.invoiceNo,
                            dcreatedate: this.state.date,

                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {


                            this.setState(
                                {
                                    isLoading: false,
                                },
                            )
                            this.refs.loading.close();

                            if (responseJson.status == "error") {

                                Alert.alert(

                                    '',
                                    responseJson.error,
                                    [
                                        { text: 'OK', onPress: () => this.componentDidMount() },
                                    ]
                                )

                                return;
                            }
                            if (responseJson.status == "success") {

                                AsyncStorage.setItem(
                                    "ipoid",
                                    JSON.stringify(responseJson.ipoid)
                                );


                                Alert.alert(

                                    '',
                                    responseJson.msg,
                                    [
                                        { text: 'OK', onPress: () => this.goToRecivingOrderScreen() },

                                    ]
                                )


                            }
                            if (responseJson.error) {


                                Alert.alert(

                                    '',
                                    responseJson.error,
                                    [
                                        { text: 'OK' },

                                    ]
                                )


                            }

                        })
                }
            })
        })

            .catch((error) => {
                console.error(error);
            });


    }



    goToRecivingOrderScreen = () => {


        this.invoiceNo.clear()
        //  this.refs.loading.show(false);
        this.setState({ date: "" })

        this.props.navigation.navigate('ChooseItem');
    }


    cancelBtnPress = () => {
        // this.refs.loading.show(false);
        this.props.navigation.navigate('ReciveOrder');
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


            <View style={styles.MainContainer}>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                <Loading show={true / false} />
                <View style={{ marginTop: 20, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#696969' }}>Add New Receiving Order</Text>
                </View>
                <View style={styles.logocontainer}>
                    <View style={{ width: '30%' }}>
                        <Text style={styles.setTextSize}> Vendor</Text>
                    </View>
                    <View style={{ width: '70%' }}>
                        <SearchableDropdown
                            // onTextChange={this.a}

                            onTextChange={qoh => this.setState({ qoh })}

                            //On text change listner on the searchable input
                            // onItemSelect={item => this.setState({
                            //     itemname1 = item.name
                            // }, TextInput)}


                            // onItemSelect={item => this.setState({
                            //     itemname1 = item.name
                            // }, TextInput)}
                            onItemSelect={item =>
                                this.state.suppliercode = item.supplier_id}
                            // onItemSelect={item => alert(JSON.stringify(item))}
                            //onItemSelect called after the selection from the dropdown
                            containerStyle={{ padding: 0 }}
                            //suggestion container style
                            textInputStyle={{
                                //inserted text style
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                // backgroundColor: '#FAF7F6',
                            }}
                            itemStyle={{
                                //single dropdown item style
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#FAF9F8',
                                borderColor: '#bbb',
                                borderWidth: 1,
                            }}
                            itemTextStyle={{
                                //text style of a single dropdown item
                                color: '#222',
                            }}
                            itemsContainerStyle={{
                                //items container style you can pass maxHeight
                                //to restrict the items dropdown hieght
                                maxHeight: '80%',
                            }}
                            items={this.state.serverData}
                            //mapping of item array
                            defaultIndex={0}
                            //default selected item index
                            placeholder="Select Vendor"
                            //place holder for the search input
                            resetValue={false}


                            //reset textInput Value with true and false state
                            underlineColorAndroid="transparent"
                        //To remove the underline from the android input
                        />
                    </View>
                </View>
                <View style={styles.logocontainer}>
                    <View style={{ width: '30%' }}>
                        <Text style={styles.setTextSize}>Invoice #</Text>
                    </View>
                    <View style={{ width: '70%' }}>
                        <TextInput

                            style={styles.input1}
                            returnKeyType="done"
                            keyboardType="default"
                            autoCapitalize="none"
                            editable={true}
                            placeholder="Enter Invoice-No"
                            value={this.state.invoiceNo}
                            autoCorrect={false}
                            ref={input => { this.invoiceNo = input }}
                            onChangeText={invoiceNo => this.setState({ invoiceNo })}
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={styles.logocontainer}>
                    <View style={{ width: '20%' }}>
                        <Text style={styles.setTextSize}>Date</Text>
                    </View>
                    <View style={{ width: '90%', borderRadius: 3, }}>
                        <DatePicker
                            style={{ width: '85%', }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="MM/DD/YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"

                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                </View>

                <View style={styles.btncontainerr}>
                    <TouchableOpacity style={styles.btncontainer} onPress={this.saveNPLItemDetails}>
                        <Text style={styles.btnText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btncontainer} onPress={this.cancelBtnPress}>
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
        marginTop: 10,
        marginBottom: 3,
        marginLeft: 10,
        flexDirection: 'row',
    },

    btncontainerr: {

        marginLeft: 50,
        flexDirection: 'row',
    },

    MainContainer:
    {
        flex: 1,
        backgroundColor: '#fff',
    },
    setTextSize: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#696969",
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
        alignSelf: "stretch",
        height: 40,
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
    btncontainer: {
        flex: 1,
        backgroundColor: '#f15a2c',
        paddingVertical: 15,
        borderRadius: 10,
        height: 50,
        marginLeft: 10,
        marginRight: 40,
        width: "45%",
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

// import React, { Component } from 'react';
// //import react in our project
// import { View, Text } from 'react-native';
// //import basic react native components
// import SearchableDropdown from 'react-native-searchable-dropdown';
// //import SearchableDropdown component

// //Item array for the dropdown
// var items = [
//     //name key is must.It is to show the text in front
//     { supplier_id: 1, name: 'angellist' },
//     { supplier_id: 2, name: 'codepen' },
//     { supplier_id: 3, name: 'envelope' },
//     { supplier_id: 4, name: 'etsy' },
//     { supplier_id: 5, name: 'facebook' },
//     { supplier_id: 6, name: 'foursquare' },
//     { supplier_id: 7, name: 'github-alt' },
//     { supplier_id: 8, name: 'github' },
//     { supplier_id: 9, name: 'gitlab' },
//     { supplier_id: 10, name: 'instagram' },
// ];
// export default class App extends Component {
//     constructor() {
//         super();
//         this.state = {
//             serverData: [],
//             //Data Source for the SearchableDropdown
//         };
//     }
//     componentDidMount() {
//         fetch('https://devportal.albertapayments.com/api/admin/get_vendor_list?sid=1001&keyword=a&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOlwvXC9kZXZwb3J0YWwuYWxiZXJ0YXBheW1lbnRzLmNvbVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNTcwNzAwNjk4LCJleHAiOjE1NzA3MDQyOTgsIm5iZiI6MTU3MDcwMDY5OCwianRpIjoiMWU1ZjMwYjUwYTJiNTJjNjYyYmQ1MTUwN2I2Yjg4MDkifQ.yC1md4XJ_RPmYzfKMvJQj2U3iLHy6Aad2Tf2ijDOBh0')
//             .then(response => response.json())
//             .then(responseJson => {
//                 //Successful response from the API Call
//                 this.setState({
//                     serverData: [...this.state.serverData, ...responseJson.vendor_data],
//                     //adding the new data in Data Source of the SearchableDropdown
//                 });
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }
//     render() {
//         return (
//             <View style={{ flex: 1, marginTop: 30 }}>
//                 <Text style={{ marginLeft: 10 }}>
//                     Select Vendor
//         </Text>
//                 <SearchableDropdown
//                     onTextChange={text => console.log(text)}
//                     //On text change listner on the searchable input
//                     onItemSelect={item => alert(JSON.stringify(item))}
//                     //onItemSelect called after the selection from the dropdown
//                     containerStyle={{ padding: 5 }}
//                     //suggestion container style
//                     textInputStyle={{
//                         //inserted text style
//                         padding: 12,
//                         borderWidth: 1,
//                         borderColor: '#ccc',
//                         backgroundColor: '#FAF7F6',
//                     }}
//                     itemStyle={{
//                         //single dropdown item style
//                         padding: 10,
//                         marginTop: 2,
//                         backgroundColor: '#FAF9F8',
//                         borderColor: '#bbb',
//                         borderWidth: 1,
//                     }}
//                     itemTextStyle={{
//                         //text style of a single dropdown item
//                         color: '#222',
//                     }}
//                     itemsContainerStyle={{
//                         //items container style you can pass maxHeight
//                         //to restrict the items dropdown hieght
//                         maxHeight: '60%',
//                     }}
//                     items={items}
//                     //mapping of item array
//                     defaultIndex={2}
//                     //default selected item index
//                     placeholder="placeholder"
//                     //place holder for the search input
//                     resetValue={false}
//                     //reset textInput Value with true and false state
//                     underlineColorAndroid="transparent"
//                 //To remove the underline from the android input
//                 />
//                 <Text style={{ marginLeft: 10 }}>
//                     Searchable Dropdown from Dynamic Array from Server
//         </Text>
//                 <SearchableDropdown
//                     onTextChange={text => console.log(text)}
//                     //On text change listner on the searchable input
//                     onItemSelect={item => alert(JSON.stringify(item))}
//                     //onItemSelect called after the selection from the dropdown
//                     containerStyle={{ padding: 5 }}
//                     //suggestion container style
//                     textInputStyle={{
//                         //inserted text style
//                         padding: 12,
//                         borderWidth: 1,
//                         borderColor: '#ccc',
//                         backgroundColor: '#FAF7F6',
//                     }}
//                     itemStyle={{
//                         //single dropdown item style
//                         padding: 10,
//                         marginTop: 2,
//                         backgroundColor: '#FAF9F8',
//                         borderColor: '#bbb',
//                         borderWidth: 1,
//                     }}
//                     itemTextStyle={{
//                         //text style of a single dropdown item
//                         color: '#222',
//                     }}
//                     itemsContainerStyle={{
//                         //items container style you can pass maxHeight
//                         //to restrict the items dropdown hieght
//                         maxHeight: '50%',
//                     }}
//                     items={this.state.serverData}
//                     //mapping of item array
//                     defaultIndex={2}
//                     //default selected item index
//                     placeholder="placeholder"
//                     //place holder for the search input
//                     resetValue={false}
//                     //reset textInput Value with true and false state
//                     underlineColorAndroid="transparent"
//                 //To remove the underline from the android input
//                 />
//             </View>
//         );
//     }
// }