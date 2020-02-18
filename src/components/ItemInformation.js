import React, { Component } from 'react';
import {
    StyleSheet, TextInput, Text,
    KeyboardAvoidingView, View, Image, TouchableOpacity, ScrollView, value, AsyncStorage, Alert, Keyboard, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from 'react-native-whc-loading'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-material-dropdown";


export default class ItemInformation extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitle: (

            <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
                <Image source={require('../images/poslogo.jpg')}
                    style={{ height: 100, width: 100, marginRight: 0, resizeMode: 'contain' }} />
            </View>
        ),
        headerRight: (<View style={{ marginRight: 20 }}>
         {/* <FontAwesome name="bell" size={25} color="#16a0db" /> */}
          </View>) 
    }

    constructor() {
        super();
        this.state = {
            check: true,
            item: "",
            cost: "",
            qoh: "",
            salesPrice: "",
            barCodeNumber: "",
            recivingOrderValue: "",
            ipoid: "",
            iitemid: "",
            vitemcode: "",
            grossvalue: "",
            newcost: "",
            UnitCaseArray: [],
            testArray: [],
            new_costprice: "",
            npack: "",
            qty: "",
            value: "",
            SuggestionCost: "",
            totalAmount: "",
            showprice: "",
            isLoading: false,


        }
    }




    componentDidMount() {
        const item = this.props.navigation.getParam('item');
        this.setState({ item: item })
        const cost = this.props.navigation.getParam('cost')
        this.setState({ cost: cost })
        const qoh = this.props.navigation.getParam('qoh')
        this.setState({ qoh: qoh })
        const salesPrice = this.props.navigation.getParam('sale')
        this.setState({ salesPrice: salesPrice })
        const iitemid = this.props.navigation.getParam('iitemid')
        this.setState({ iitemid: iitemid })
        const vitemcode = this.props.navigation.getParam('vitemcode')
        this.setState({ vitemcode: vitemcode })
        const new_costprice = this.props.navigation.getParam('new_costprice')
        this.setState({ new_costprice: new_costprice })
        const npack = this.props.navigation.getParam('npack')
        this.setState({ npack: npack })

        this.state.value = "Case"




        AsyncStorage.getItem("ipoid").then(ipoid => {
            if (ipoid) {
                //alert(datastore)
                this.setState({ ipoid: ipoid });


            }
        });



    }



    nextToChooseItem = () => {






        if (this.state.qty == "" || this.state.qty == 0) {

            alert("qty received can not be empty or 0")
            return
        }
        else if (this.state.totalAmount == "") {

            alert("totalAmount Qty Field is required ")
            return
        }

        else {
            AsyncStorage.getItem("token").then(data => {
                AsyncStorage.getItem("Sid").then(datasid => {
                    this.setState(
                        {
                            isLoading: true,
                        },

                    );

                    fetch(API_BASE_URL + `admin/insert_ro_items?token=${data}`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            sid: datasid,
                            ipoid: this.state.ipoid,
                            itemid: this.state.iitemid,
                            vitemname: this.state.item,
                            vendorid: this.state.vitemcode,
                            nordqty: this.state.qty,
                            dunitprice: this.state.salesPrice,
                            po_order_by: this.state.value,
                            suggested_cost: this.state.SuggestionCost,
                            total_amount: this.state.totalAmount
                            // newcost: this.state.newcost,
                            // amount: this.state.grossvalue,
                            // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOlwvXC9kZXZwb3J0YWwuYWxiZXJ0YXBheW1lbnRzLmNvbVwvYXV0aGVudGljYXRlX25ldyIsImlhdCI6MTU3MTMxNTM0MywiZXhwIjoxNTczOTA3MzQzLCJuYmYiOjE1NzEzMTUzNDMsImp0aSI6IjYyYjU4NTJjN2MxMGRlYmQ4ZGZlZDU5ZmZhM2JmMDY2In0.8goYg3zNDcHcF7qtlhnw41TPv-ZPxgr6BwUDDGUbv_U"

                        }

                        ),



                    }).then((response) => response.json())
                        .then((responseJson) => {

                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );


                            // this.refs.loading.show(false);

                            if (responseJson.error) {
                                Alert.alert(

                                    '',
                                    responseJson.error,
                                    [
                                        { text: 'OK', onPress: () => this.navigateTochooseItem() },

                                    ]
                                )
                                return;
                            }

                            if (responseJson.success) {
                                Alert.alert(

                                    '',
                                    responseJson.success,
                                    [
                                        { text: 'OK', onPress: () => this.navigateTochooseItem() },
                                    ]
                                )
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
            })
            // }
        }

        // })
        // });
    }

    navigateToOrderInformation = () => {

        this.props.navigation.navigate('OrderInformation')

    }

    navigateTochooseItem = () => {

        this.props.navigation.navigate('ChooseItem')

    }

    grossprofit = () => {




        if (this.state.value == "Case") {

            const recivingOrderValue = (parseInt(this.state.qty)) * (parseInt(this.state.npack))



            // this.setState({ recivingOrderValue: JSON.stringify(recivingOrderValue) })





            const SuggestionCost = parseFloat(((parseFloat(recivingOrderValue)) * (parseFloat(this.state.new_costprice))).toFixed(2));


            // this.setState({ SuggestionCost: JSON.stringify(SuggestionCost ? SuggestionCost : 0) })

            const totalAmount = parseFloat(((parseFloat(recivingOrderValue)) * (parseFloat(this.state.new_costprice))).toFixed(2));
            // this.setState({ totalAmount: totalAmount || 0 })


            this.setState({
                SuggestionCost: JSON.stringify(SuggestionCost ? SuggestionCost : 0),
                recivingOrderValue: JSON.stringify(recivingOrderValue || 0),
                totalAmount: JSON.stringify(totalAmount || 0)
            })

        }

        if (this.state.value == "Unit") {



            const recivingOrderValue = (parseInt(this.state.qty))
            // this.setState({ recivingOrderValue: JSON.stringify(recivingOrderValue) })

            const SuggestionCost = parseFloat(((parseFloat(recivingOrderValue)) * (parseFloat(this.state.new_costprice))).toFixed(2));
            // this.setState({ SuggestionCost: JSON.stringify(SuggestionCost ? SuggestionCost : 0) })


            const totalAmount = parseFloat(((parseFloat(recivingOrderValue)) * (parseFloat(this.state.new_costprice))).toFixed(2));
            // this.setState({ totalAmount: totalAmount || 0 })

            this.setState({
                SuggestionCost: JSON.stringify(SuggestionCost ? SuggestionCost : 0),
                recivingOrderValue: JSON.stringify(recivingOrderValue || 0),
                totalAmount: JSON.stringify(totalAmount || 0)
            })
        }





    }

    caseUnitMethod = (value, index) => {

        this.setState({ recivingOrderValue: "" })
        this.setState({ qty: "" })

        this.setState({ SuggestionCost: "" })

        this.setState({ totalAmount: "" })




        if (index == 0) {


            this.setState({ value: JSON.stringify(value) })


        }
        if (index == 1) {

            this.setState({ value: JSON.stringify(value) })



        }



    }

    keyboardHidefunction = () => {

        Keyboard.dismiss()

    }

    nextToOrderInformation = () => {




        if (this.state.qty == "" || this.state.qty == 0) {

            alert("qty received can not be empty or 0")
            return
        }
        else if (this.state.totalAmount == "") {

            alert("totalAmount Qty Field is required ")
            return
        }

        else {
            AsyncStorage.getItem("token").then(data => {
                AsyncStorage.getItem("Sid").then(datasid => {
                    this.setState(
                        {
                            isLoading: true,
                        },

                    );

                    fetch(API_BASE_URL + `admin/insert_ro_items?token=${data}`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            sid: datasid,
                            ipoid: this.state.ipoid,
                            itemid: this.state.iitemid,
                            vitemname: this.state.item,
                            vendorid: this.state.vitemcode,
                            nordqty: this.state.qty,
                            dunitprice: this.state.salesPrice,
                            po_order_by: this.state.value,
                            suggested_cost: this.state.SuggestionCost,
                            total_amount: this.state.totalAmount
                            // newcost: this.state.newcost,
                            // amount: this.state.grossvalue,
                            // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOlwvXC9kZXZwb3J0YWwuYWxiZXJ0YXBheW1lbnRzLmNvbVwvYXV0aGVudGljYXRlX25ldyIsImlhdCI6MTU3MTMxNTM0MywiZXhwIjoxNTczOTA3MzQzLCJuYmYiOjE1NzEzMTUzNDMsImp0aSI6IjYyYjU4NTJjN2MxMGRlYmQ4ZGZlZDU5ZmZhM2JmMDY2In0.8goYg3zNDcHcF7qtlhnw41TPv-ZPxgr6BwUDDGUbv_U"

                        }),
                    }).then((response) => response.json())
                        .then((responseJson) => {



                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );


                            // this.refs.loading.show(false);

                            if (responseJson.error) {
                                Alert.alert(

                                    '',
                                    responseJson.error,
                                    [
                                        { text: 'OK', onPress: () => this.navigateTochooseItem() },

                                    ]
                                )
                                return;
                            }

                            if (responseJson.success) {
                                Alert.alert(

                                    '',
                                    responseJson.success,
                                    [
                                        { text: 'OK', onPress: () => this.navigateToOrderInformation() },
                                    ]
                                )
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
            })
            // }
        }

        // this.props.navigation.navigate('ChooseItem');
    }



    render() {
        let data = [{
            value: 'Case',
        }, {
            value: 'Unit',
        },];
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <ActivityIndicator size={"large"} />
                </View>
            );
        }

        return (


            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.MainContainer}>
                    <KeyboardAwareScrollView >
                        <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, fontWeight: '700', color: '#696969' }}>Item Information</Text>
                        </View>

                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>Name</Text>
                            </View>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    //  value={this.saveNPLItemDetails}
                                    editable={false}
                                    style={styles.input}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.item}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>Cost</Text>
                            </View>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    editable={false}
                                    style={styles.input}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.cost}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>Price</Text>
                            </View>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    editable={false}
                                    style={styles.input}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.salesPrice}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>QOH</Text>
                            </View>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    editable={false}
                                    style={styles.input}
                                    returnKeyType="next"
                                    keyboardType='number-pad'
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.qoh}
                                >
                                </TextInput>
                            </View>
                        </View>
                        {/* <View style={styles.logocontainer}>
                            <View style={{ width: '40%' }}>
                                <Text style={styles.setTextSize}>New Cost Price</Text>
                            </View>
                            <View style={{ width: '60%' }}>
                                <TextInput
                                    editable={false}
                                    style={styles.input}
                                    returnKeyType="next"
                                    keyboardType='number-pad'
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.new_costprice}
                                >
                                </TextInput>
                            </View>
                        </View> */}
                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>Case/Unit</Text>
                                <Text style={styles.setTextSize1}>(@ {this.state.npack}) </Text>
                            </View>
                            <View
                                style={{
                                    width: "70%",
                                }}
                            >


                                {
                                    <Dropdown
                                        // label=""
                                        data={data}
                                        value={this.state.value}
                                        itemTextStyle="bold"
                                        labelFontSize={0}
                                        fontSize={20}
                                        selectedValue={"Case"}
                                        containerStyle={styles.input1}
                                        onChangeText={(value, index) =>
                                            this.setState({
                                                value: value
                                            },
                                                this.caseUnitMethod(value, index)
                                            )
                                        }
                                    />
                                }
                            </View>
                        </View>

                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>Ord. Qty</Text>
                            </View>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    style={styles.input1}
                                    value={this.state.qty}
                                    underlineColorAndroid="transparent"
                                    returnKeyType="done"
                                    keyboardType='number-pad'
                                    onSubmitEditing={() => this.keyboardHidefunction()}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={qty => {

                                        if (qty.length == 1 && qty == 0) {


                                            alert("qty can not start from 0")

                                            return
                                        }

                                        let newText = '';
                                        let numbers = '0123456789';
        
                                         for (var i=0; i < qty.length; i++) {
                                          if(numbers.indexOf(qty[i]) > -1 ) {
                                          newText = newText + qty[i];
                                        }
                                      else {
                                      // your call back function
                                    
                                    return
                                }
                            }
                                        
                                        


                                        this.setState({ qty }, this.grossprofit)


                                    }
                                    }


                                >
                                </TextInput>
                            </View>
                        </View>


                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>Rec. Qty</Text>
                            </View>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.recivingOrderValue}
                                    underlineColorAndroid="transparent"
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    // onChangeText={recivingOrderValue => this.setState({ recivingOrderValue })}
                                    onChangeText={recivingOrderValue => this.setState({ recivingOrderValue }, this.grossprofit)}
                                    autoCorrect={false}
                                    editable={false}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>Sug. Cost</Text>
                                {/* <Text style={styles.setTextSize1}>(@ {this.state.new_costprice}) </Text> */}



                            </View>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    editable={false}
                                    style={styles.input}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.SuggestionCost}
                                >
                                </TextInput>
                            </View>
                        </View>

                        <View style={styles.logocontainer}>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.setTextSize}>New Cost</Text>
                            </View>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    style={styles.input1}
                                    value={this.state.totalAmount}
                                    underlineColorAndroid="transparent"
                                    returnKeyType="done"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.keyboardHidefunction()}
                                    onFocus={text => {


                                        // const { dataSource } = this.state
                                        // this.state.totalAmount = ""
                                        this.state.totalAmount = ''

                                        this.setState({
                                            totalAmount: this.state.totalAmount
                                        })
                                        // dataSource[index].totalAmount = ''


                                    }}
                                    onChangeText={totalAmount => {


                                        if (totalAmount) {
                                            let idx = totalAmount.indexOf('.')
                                            if (idx >= 0) {
                                                totalAmount = totalAmount.slice(0, idx + 3)
                                            }
                                        }
                                        if ((/^\d*[.]?\d*$/).test(totalAmount)) {

                                            this.setState({
                                                totalAmount
                                            })


                                        } else {

                                            return
                                        }


                                    }}
                                    // onChangeText={totalAmount => this.setState({ totalAmount })}
                                    autoCorrect={false}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <View style={styles.btncontainerr}>
                            <TouchableOpacity style={styles.btncontainer1} onPress={this.nextToChooseItem}>
                                <Text style={styles.btnText}>Add More Item</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btncontainer1} onPress={this.nextToOrderInformation}>
                                <Text style={styles.btnText}>Finish Order</Text>
                            </TouchableOpacity>
                        </View>
                        <Loading ref="loading" />
                    </KeyboardAwareScrollView >
                </View>

            </View >


        );
    }
}
const styles = StyleSheet.create({
    logocontainer: {
        marginTop: 0,
        marginBottom: 3,
        marginLeft: 10,
        flexDirection: 'row',
    },
    logocontainer1: {
        marginTop: 10,
        marginBottom: 3,
        marginLeft: 10,
        flexDirection: 'row',
    },

    btncontainer1: {
        backgroundColor: "#f15a2c",
        borderRadius: 10,
        // mirginTop: 10,
        height: 50,
        width: "35%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 70,
        margin : 10
    },

    btncontainerr: {
        flexDirection: "row",
        marginTop: "10%",
        height: "20%",
        alignContent : 'center',
        justifyContent : 'center'
    },

    MainContainer:
    {
        flex: 1,
        backgroundColor: '#fff',
    },
    setTextSize: {
        fontSize: 18,
        fontWeight: '300',
        color: "#286fb7",
    },
    setTextSize1: {
        fontSize: 14,
        fontWeight: '300',
        color: "black",
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
    input2: {
        //width: 250,
        // alignSelf: "stretch",
        height: 40,


        marginEnd: 10,
        borderRadius: 3,

        marginBottom: 10,

        fontSize: 15,
        paddingHorizontal: 20,
    },
    input1: {
        //  alignSelf: "stretch",
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
        //       fontSize: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',

    },
    inputt: {
        //width: 250,
        //  alignSelf: "stretch",
        height: 50,

        marginEnd: 10,

        borderRightWidth: 1,
        borderRightColor: "#636466",
        borderLeftWidth: 1,
        borderLeftColor: "#636466",
        borderTopWidth: 1,
        borderTopColor: "#636466",
        borderBottomWidth: 1,
        borderBottomColor: "#636466",

        marginBottom: 20,
        color: "#000",
        // alignItems: 'center',
        justifyContent: 'center',
        // fontSize: 15,
        //paddingHorizontal: 20
    },
    btncontainerr1: {
        flexDirection: "row",
        // marginBottom: '0%'
    },
    // btncontainer1: {
    //     flex: 1,
    //     backgroundColor: '#f15a2c',
    //     paddingVertical: 15,
    //     borderRadius: 10,
    //     height: 50,
    //     marginLeft: 10,
    //     marginRight: 40,
    //     width: "100%",
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: 30
    // },
    btnText: {
        fontSize: 18,
        color: '#fff',
        fontWeight : '400',
        alignItems: 'center'
    },
});
