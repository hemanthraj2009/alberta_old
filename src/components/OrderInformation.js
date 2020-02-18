import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator,Keyboard, AsyncStorage, TextInput, Index, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Loading from "react-native-whc-loading";
import { arrayExpression } from '@babel/types';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationEvents } from 'react-navigation'

export default class OrderInformation extends Component {
     constructor() {
        super()
        this.state = { isLoading: true, isFetching: true, };
        this.setState({ dataSource: null, check: [], qty: "", ipoid: "", textInputs: [], qtyCheck: true,vendorName: "", vinvoiceno: "", nnettotal: "" ,isLoading: false});

    }
    updateCost = (e, index) => {

    }

    saveDetails = () => {




        if (!this.state.qtyCheck) {

            //  alert(JSON.stringify(this.state.qty))
            alert('Please Enter  qty ')
            return
        }




        let { dataSource: itemdata, textInputs } = this.state


        itemdata = itemdata.map((item, key) => {
            return {

                ipodetid: item.ipodetid,
                vitemname: item.item_name,
                // nordqty: item.qty_received,
                npack: item["npack"],
                receiving_qty: item.qty_received,
                suggested_cost: item["suggested_cost"],
                total_amount: textInputs[key],
            }
        })



        let res = {
            "itemdata": itemdata
        }











        AsyncStorage.getItem("ipoid").then(ipoid => {
            AsyncStorage.getItem("token").then(data => {
                AsyncStorage.getItem("Sid").then(datasid => {

                    this.setState(
                        {
                            isLoading: true,
                        },

                    );

                    fetch(API_BASE_URL + `admin/edit_multiple_ro_items_save?sid=${datasid}&ipoid=${ipoid}&token=${data}`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        // body: JSON.stringify(updatedData)

                        body: JSON.stringify(res)
                    }).then((response) => response.json())
                        .then((responseJson) => {

                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );

                            //  alert(responseJson.error)
                            // this.refs.loading.show(false);

                            if (responseJson.status == "error") {

                                alert(responseJson.error)
                            }

                            if (responseJson.status == "success") {
                                Alert.alert(
                                    "",
                                    responseJson.success,
                                    [
                                        { text: 'OK', onPress: () => this.nexttoRecOrderScreen() },

                                    ]
                                )

                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            alert(error)
                        });
                });
            })
        })


    }
    

    finalizedDetails = () => {




        if (!this.state.qtyCheck) {

            //  alert(JSON.stringify(this.state.qty))
            alert('Please Enter  qty ')
            return
        }




        let { dataSource: itemdata, textInputs } = this.state


        itemdata = itemdata.map((item, key) => {
            return {

                ipodetid: item.ipodetid,
                vitemname: item.item_name,
                // nordqty: item.qty_received,
                npack: item["npack"],
                receiving_qty: item.qty_received,
                suggested_cost: item["suggested_cost"],
                total_amount: textInputs[key],
            }
        })



        let res = {
            "itemdata": itemdata
        }



        AsyncStorage.getItem("ipoid").then(ipoid => {
            AsyncStorage.getItem("token").then(data => {
                AsyncStorage.getItem("Sid").then(datasid => {

                    this.setState(
                        {
                            isLoading: true,
                        },

                    );


                    fetch(API_BASE_URL + `admin/edit_multiple_ro_items_finalize?sid=${datasid}&ipoid=${ipoid}&token=${data}`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        // body: JSON.stringify(updatedData)

                        body: JSON.stringify(res)
                    }).then((response) => response.json())
                        .then((responseJson) => {

                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );


                            //  alert(responseJson.error)
                            // this.refs.loading.show(false);

                            if (responseJson.status == "error") {

                                alert(responseJson.error)
                            }

                            if (responseJson.status == "success") {
                                Alert.alert(
                                    "",
                                    responseJson.success,
                                    [
                                        { text: 'OK', onPress: () => this.nexttoRecOrderScreen() },

                                    ]
                                )

                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            alert(error)
                        });
                });
            })
        })



    }

    

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.componentDidMount() });
    }

    LoginPress = () => {
       this.props.navigation.navigate('ChooseItem')
    }
    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#fff"
        },
        headerTitle: ( 
            <View style={{ flex: 1, alignItems: "center" ,marginStart : 20}}> 
            <Image source={require('../images/poslogo.jpg')} 
            style={{ height: 105,
              width: 105,marginRight: 20,resizeMode: 'contain'}} /> 
            </View> 
            ),
            headerRight: (<View style={{ marginRight: 20 }}>
              </View>)
       

    }
    keyboardHidefunction = () => {

        Keyboard.dismiss()

    }


    endEditing(index) {


        // let { dataSource, textInputs } = this.state;
        // // dataSource[index] = dataSource[index]['qty']
        // dataSource[index].qty = text


        let { dataSource, qtyCheck } = this.state;
        let recQty = dataSource[index]["qty_received"]

        let npack = dataSource[index]["npack"]



        if (recQty == 0 || recQty == "") {


            alert("qty received can not be empty or 0")

            qtyCheck = false
        }

        else if (recQty % npack == 0) {

            // qty = recQty / npack

            dataSource[index]["qty_received"] = recQty

            qtyCheck = true


            // this.state.qtyCheck = true

            // this.setState({
            //     qtyCheck: true
            // });


            // this.totalAmountFunc(index)


        }
        else {
            qtyCheck = false
            // this.setState({
            //     qtyCheck: false,

            // });

            alert("Please Enter Correct qty which fits in cases" + "(" + npack + ")")
            //  alert(npack)
        }

        this.setState({
            qtyCheck,
            dataSource
        });

    }


    totalAmountFunc = (index, item) => {
      let { dataSource } = this.state;
      dataSource[index].total_amount = 100

    }

    renderItem = ({ item, index }) => {
       this.state.check = item.qty
       return (
       <View style={{
                marginTop: 5, borderRightWidth: 1,
                borderBottomWidth: 1,
                backgroundColor : '#fff'

            }}>
                <TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginLeft: '2%', marginBottom: '2%', marginRight: '5%', width: "100%" }}>
                        <Text style={{ fontSize: 18, marginRight: '2%', color: '#3386D6', width: "40%" }}>{item.item_name}</Text>
                        {/* <Text style={{ fontSize: 18, marginRight: '0%', color: '#3386D6', width: "15%" }}>{item.po_order_by}  ({item.npack})</Text> */}
                        {/* <Text style={{ fontSize: 18, marginRight: '5%', color: '#3386D6', width: "20%%" }}></Text> */}
                        <TextInput style={{
                            fontSize: 18, marginRight: '2%', color: '#3386D6', width: "20%", borderRadius: 3,
                            borderRightWidth: 1,
                            borderRightColor: '#3386D6',
                            borderLeftWidth: 1,
                            borderLeftColor: '#3386D6',
                            borderTopWidth: 1,
                            borderTopColor: '#3386D6',
                            borderBottomWidth: 1,
                            borderBottomColor: '#3386D6',
                            backgroundColor: 'white',
                        }}

                            underlineColorAndroid="transparent"
                            returnKeyType="done"
                            keyboardType='number-pad'
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            maxLength = {5}
                            editable = {true}
                            onSubmitEditing={() => this.keyboardHidefunction()}
                            onEndEditing={() => this.endEditing(index)}
                            onChangeText={text => {
                                
                                if(text.length == 1 && text == 0) {


                                    alert("qty can not start from 0")

                                    return
                                }

                                let newText = '';
                                let numbers = '0123456789';

                                 for (var i=0; i < text.length; i++) {
                                  if(numbers.indexOf(text[i]) > -1 ) {
                                  newText = newText + text[i];
                                }
                              else {
                              // your call back function
                            
                            return
                        }
    }
    

                               

                             
                                

                              


                                // if (text) {
                                //     let idx = text.indexOf('.')
                                //     if (idx >= 0) {
                                //         text = text.slice(0, idx + 3)
                                //     }
                                // }

                         


                              
                                if ((/^\d*[.]?\d*$/).test(text)) {

                                    
                                
                                let { dataSource, textInputs } = this.state;

                                dataSource[index].qty_received = text




                                let total_amount = text.trim() ? parseFloat(text) * dataSource[index]["new_costprice"] : 0;

                                total_amount.toFixed(2)


                                textInputs[index] = total_amount.toString()
                                textInputs[index] = total_amount.toFixed(2)


                                //  JSON.stringify(textInputs[index])







                                // textInputs[index] = text.trim() ? parseFloat(text) * dataSource[index]["new_costprice"] : "0";
                                // this.setState({
                                //     textInputs,
                                // });


                                // dataSource[index].suggested_cost = text.trim() ? parseFloat(text) * dataSource[index]["cost_price"] : 0
                                let rowData = { ...dataSource[index] }
                                rowData = {
                                    ...rowData,
                                    suggested_cost: text.trim() ? parseFloat(text) * dataSource[index]["new_costprice"] .toFixed(2): 0,
                                    total_amount: text.trim() ? parseFloat(text) * dataSource[index]["new_costprice"] : 0,



                                }


                                dataSource[index] = {
                                    ...rowData
                                }


                                this.setState({
                                    dataSource,
                                    textInputs
                                },
                                    // this.totalAmountFunc(index)
                                );
                                let sum = 0.00;

                                    this.state.textInputs.map((userData) => {
                                        sum += parseFloat(userData);
                                    });
                                    // this.setState({
                                    //     nnettotal = sum
                                    // },
                                    // )

                                    sum.toFixed(2)

                                    this.state.nnettotal = sum.toString()

                                    this.state.nnettotal = sum.toFixed(2)


                                


                            }
                            else{

                               return
                            }
                        }
                        }


                            value={this.state.dataSource[index].qty_received}


                        />


                        {/* <Text style={{ fontSize: 18, marginRight: '2%', color: '#3386D6', width: "10%" }}>{item.suggested_cost}</Text> */}


                        <TextInput style={{
                            fontSize: 18, marginRight: '2%', color: '#3386D6', width: "35%", borderRadius: 3,
                            borderRightWidth: 1,
                            borderRightColor: '#3386D6',
                            borderLeftWidth: 1,
                            borderLeftColor: '#3386D6',
                            borderTopWidth: 1,
                            borderTopColor: '#3386D6',
                            borderBottomWidth: 1,
                            borderBottomColor: '#3386D6',
                            backgroundColor: 'white',
                        }}

                            underlineColorAndroid="transparent"
                            returnKeyType="done"
                            keyboardType='number-pad'
                            autoCapitalize="none"
                            maxLength = {9}
                            autoCorrect={false}
                            multiline={true}
                            onFocus={text => {
                                const { textInputs, dataSource } = this.state

                                textInputs[index] = ''
                                // dataSource[index].totalAmount = ''
                                this.setState({
                                    textInputs
                                })


                            }}
                            // defaultValue={this.state.textInputs[index]}
                            onChangeText={text => {


                                if (this.state.dataSource[index].qty_received == "") {

                                    alert("qty cannot be empty")


                                    return
                                }

                                if (text) {
                                    let idx = text.indexOf('.')
                                    if (idx >= 0) {
                                        text = text.slice(0, idx + 3)
                                    }
                                }



                                if ((/^\d*[.]?\d*$/).test(text)) {

                                    let { dataSource, textInputs } = this.state;

                                    text = ((text == "") || (text == undefined)) ? 0.00 : text;


                                    textInputs[index] = text
                                    this.setState({
                                        textInputs,
                                        dataSource,

                                    });
                                    let sum = 0.00;

                                    this.state.textInputs.map((userData) => {
                                        sum += parseFloat(userData);
                                        sum.toFixed(2)
                                    });


                                    this.state.nnettotal = sum.toString()
                                    this.state.nnettotal = sum.toFixed(2)
                                    sum.toFixed(2)
                                } else {
                                    return;
                                }

                            }}
                            value={this.state.textInputs[index]}


                        />

                    </View>

                </TouchableOpacity>
                {/* <Loading ref="loading" /> */}

            </View >


        )



    }
   componentDidMount() {
      this.setState({
            refresh: !this.state.refresh

        })

        this.setState({
            isLoading: false
            
        })

        //this.refs.loading.show();
        this.state.qtyCheck = true
        AsyncStorage.getItem("ipoid").then(ipoid => {
            AsyncStorage.getItem("token").then(data => {
                AsyncStorage.getItem("Sid").then(datasid => {
                    if (data) {

                        this.setState({
                            isLoading: true
                            
                        })
                        const url = API_BASE_URL + 'admin/' + 'get_order_items?'



                        fetch(url + "ipoid=" + ipoid + "&sid=" + datasid + "&token=" + data)

                            .then((response) => response.json())
                            .then((responsejson) => {

                                this.setState({
                                    isLoading: false
                                    
                                })
                                //this.refs.loading.show(false);



                                if (responsejson.status == "success") {
                                    this.state.vendorName = responsejson.vvendorname
                                    this.state.vinvoiceno = responsejson.vinvoiceno
                                    this.state.nnettotal = responsejson.nnettotal
                                    let dataSource = responsejson.table_data
                                    
                                    textInputs = dataSource.map(item => {

                                        return item["total_amount"]

                                    })
                                    dataSource = dataSource.map(item => {
                                        item["qty_received"] = item.qty_received.toString()
                                        return item
                                    })
                                    this.setState({ dataSource, textInputs, isFetching: false })



                                }

                                if (!this.alertPresent) {
                                    this.alertPresent = true;
                                    if (responsejson.status == "error") {

                                        alert(responsejson.error)
                                    } else {
                                        this.alertPresent = false;

                                    }

                                }


                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    }
                })

            })
        });


    }


    cancelBtnPress = () => {


        this.props.navigation.navigate('ReciveOrder')
    }

    nexttoRecOrderScreen = () => {
        this.props.navigation.navigate('ReciveOrder')

    }



    saveNPLItemDetails = () => {




        if (!this.state.qtyCheck) {

            //  alert(JSON.stringify(this.state.qty))
            Alert.alert( "",'Please Enter Correct qty which fits in cases')
            return
        }

        let { dataSource: itemdata, textInputs } = this.state


        itemdata = itemdata.map((item, key) => {
            return {

                ipodetid: item.ipodetid,
                vitemname: item.item_name,
                // nordqty: item.qty_received,
                npack: item["npack"],
                receiving_qty: item.qty_received,
                suggested_cost: item["suggested_cost"],
                total_amount: textInputs[key],
            }
        })



        let res = {
            "itemdata": itemdata
        }









        AsyncStorage.getItem("ipoid").then(ipoid => {
            AsyncStorage.getItem("token").then(data => {
                AsyncStorage.getItem("Sid").then(datasid => {



                    fetch(API_BASE_URL + `admin/edit_multiple_ro_items?sid=${datasid}&ipoid=${ipoid}&token=${data}`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        // body: JSON.stringify(updatedData)

                        body: JSON.stringify(res)
                    }).then((response) => response.json())
                        .then((responseJson) => {


                            //  alert(responseJson.error)
                            // this.refs.loading.show(false);

                            if (responseJson.status == "error") {

                                alert("",responseJson.error)
                            }

                            if (responseJson.status == "success") {
                                Alert.alert(
                                    "",
                                    responseJson.success,
                                    [
                                        { text: 'OK', onPress: () => this.nexttoRecOrderScreen() },

                                    ]
                                )

                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            Alert.alert("",error)
                        });
                });
            })
        })



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
            <View style={{ flexDirection: 'column', height: "100%" }}>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                <KeyboardAwareScrollView style={{ height: "80%" }}>


                    <ScrollView>

                        <View>
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#696969",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}
                            >
                                Order Information

                </Text>
                            <View style={{ flexDirection: 'row', width: '100%', margin: 10 }}>



                                <View style={{ marginTop: 0, flexDirection: 'column', width: '60%', }}>



                                    <Text style={{ color: '#696969', fontSize: 16, fontWeight: "bold" }}>Vendor Name: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{this.state.vendorName} </Text></Text>
                                    <Text style={{ color: '#696969', fontSize: 16, fontWeight: "bold" }}>Invoice No: <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" }}>{this.state.vinvoiceno} </Text></Text>
                                    <Text style={{ color: '#696969', fontSize: 16, fontWeight: "bold" }}>Total Amount: <Text style={{ color: '#f15a2c', fontSize: 16, fontWeight: "bold" }}>{this.state.nnettotal} </Text></Text>

                                </View>
                                <View style={{ width: '30%', marginRight: 20 }}>
                                    <TouchableOpacity
                                        style={styles.btncontainer}
                                        onPress={this.LoginPress}
                                    >
                                        <Text style={styles.btntext}>Add New</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={styles.container}>

                                <View flexDirection='row' marginTop='0%'>

                                    <View style={{
                                        width: '40%', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: "#3386D6", height: 60
                                    }}>
                                        <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', fontWeight: "bold" }}>Name
</Text>
                                    </View>

                                    {/* <View style={{
                                        width: '20%', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: "#3386D6", height: 60,
                                    }}>
                                        <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Case/Unit
</Text>
                                    </View> */}

                                    <View style={{
                                        width: '30%', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: "#3386D6", height: 60,
                                    }}>
                                        <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Unit Recd
</Text>
                                    </View>
                                    {/* <View style={{
                                        width: '20%', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: "#3386D6", height: 60,
                                    }}>
                                        <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Sug Cost
</Text>
                                    </View> */}
                                    <View style={{
                                        width: '30%', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: "#3386D6", height: 60,
                                    }}>
                                        <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>New Cost
</Text>
                                    </View>
                                </View>



                                <FlatList
                                    data={this.state.dataSource}
                                    extraData={[this.state.dataSource, this.state.textInputs, this.state.refresh]}
                                    renderItem={(item) => this.renderItem(item)}
                                    onRefresh={() => this.onRefresh()}
                                    refreshing={this.state.isFetching}

                                //   onPress={() => this.nextscreen()}


                                //keyExtractor={(item, index) => index.toString()}
                                />
                            </View>

                        </View>
                    </ScrollView>


                </KeyboardAwareScrollView>

                <View style={styles.btncontainerr}>


                    <TouchableOpacity
                        style={styles.btncontainer1}
                        onPress={this.saveDetails}
                    >
                        <Text style={styles.btnText}> Save </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btncontainer2}
                        onPress={this.finalizedDetails}
                    >
                        <Text style={styles.btnText}> Finalize </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btncontainer1}
                        onPress={this.cancelBtnPress}
                    >
                        <Text style={styles.btnText}> Cancel </Text>
                    </TouchableOpacity>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        marginTop: 10,


    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 70,

    },
    btncontainer: {
        backgroundColor: "#f15a2c",
        borderRadius: 10,
        height: 35,
        
        alignContent : 'center',
        alignItems: "center",
        justifyContent: "center",
        
    },
    btncontainer2: {
       
            backgroundColor: "#f15a2c",
            borderRadius: 10,
            // mirginTop: 10,
            height: 50,
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 70,
            margin : 10
        },

     
    
    btncontainer1: {
        backgroundColor: "#f15a2c",
        borderRadius: 10,
       
        height: 50,
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 70,
        margin : 10
    },
    btntext: {
       fontSize: 16,
        fontWeight : '600',
        color: "#fff"
    },
    btncontainerr: {
        flexDirection: "row",
        marginTop: "10%",
        height: "20%",
        alignContent : 'center',
        justifyContent : 'center'
    },

    btncontainerr1: {
        flexDirection: "row",
        // marginBottom: '0%'
    },
    btnText: {
        marginLeft: 0,
        fontSize: 20,
        color: "#fff"
    }

})