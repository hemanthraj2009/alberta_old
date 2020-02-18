import React, { Component } from "react";
import {
    ActivityIndicator,
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
    Alert,
    AsyncStorage,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Cell, Section, TableView, CustomSectionHeader } from "react-native-tableview-simple";
import { Table, Row, Rows } from "react-native-table-component";
import FontAwesome from "react-native-vector-icons/FontAwesome";



export default class Transcationdetails extends React.Component {

    constructor() {
        super()
        this.state = {
            register: "",
            sales: "",
            tax: "",
            discountAmount: "",
            nnettotal: "",
            vstorename: "",
            SalesTenderDetail: [],
            User: [],
            SalesDetail: [],
            salesData: [],
            isLoading: true,
            SalesReturnDetail: [],
            SalesReturnDetailValue : [],
            SalesGranTotal : [],
            total : "",
            Tender_Total : '',
            tender_detail : []

        }
    }
    // componentDidMount() {
    //     AsyncStorage.getItem('discountAmount').then((discountAmount) => {
    //     alert(discountAmount)
    //     })
    // }
    static navigationOptions = ({ navigate, navigation }) => ({
        headerTitle: (
            <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
                <Image
                    source={require("../images/poslogo.jpg")}
                    style={{
                        height: 105,
                        width: 105,
                        marginRight: 0,
                        resizeMode: "contain"
                    }}
                />
            </View>
        ),
        headerRight: (<View style={{ marginRight: 20 }}>
                </View>)
        
    });

    componentDidMount() {

        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                AsyncStorage.getItem('SalesId').then((SalesId) => {
                    // alert(SalesId)
                    if (data) {
                        fetch(`https://portal.albertapayments.com/api/admin/getTransactionDetail_new?token=${encodeURIComponent(data)}&sid=${SID}&salesId=${SalesId}`, {
                            method: 'GET',

                        }).then((response) => response.json())
                            .then((responseJson) => {
                                // alert(responseJson.Sales[0].isalesid)

                                // AsyncStorage.setItem('discountAmount',responseJson.Sales[0].ndiscountamt)
                                // AsyncStorage.setItem('sales',responseJson.Sales[0].nsaletotalamt)
                                // AsyncStorage.setItem('tax',responseJson.Sales[0].nnettotal)
                                // AsyncStorage.setItem('register',responseJson.Sales[0].iuserid)
                                // AsyncStorage.setItem('User',responseJson.SalesTenderDetail)
                                // AsyncStorage.setItem('salesData',responseJson.SalesDetail)




                                this.setState(

                                    {
                                        isLoading: false,
                                        discountAmount: responseJson.Sales[0].ndiscountamt,
                                        vstorename: responseJson.Sales[0].vstorename,
                                        sales: responseJson.Sales[0].nsubtotal,
                                        tax: responseJson.Sales[0].ntaxtotal,
                                        register: responseJson.Sales[0].vterminalid,
                                        //register: responseJson.Sales[0].iuserid,
                                        User: responseJson.SalesTenderDetail,
                                        salesData: responseJson.SalesDetail,
                                        nnettotal: responseJson.Sales[0].nnettotal,
                                        SalesReturnDetail : responseJson.SalesReturnDetail,
                                        SalesReturnDetailValue:responseJson.SalesReturnDetailValue,
                                        SalesGranTotal:responseJson.SalesGranTotal,
                                        total :responseJson.total,
                                        Tender_Total : responseJson.Tender_Total,
                                        tender_detail:responseJson.tender_detail
                                    })



                                    
                            })
                            .catch((error) => {
                                alert(responseJson.error);
                            });
                    }
                });
            })
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (

            <ScrollView >
                <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}></SafeAreaView>

                <View>
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#3386D6",
                            fontSize: 20,
                            fontWeight: "bold"
                        }}
                    >
                        Transaction Details
            </Text>
                </View>
                <View>
                    <Text
                        style={{
                            topmargin: 15,
                            bottommargin: 10,
                            textAlign: "center",
                            color: "#f15a2c",
                            fontSize: 20,
                            fontWeight: "bold"
                        }}
                    >
                        {this.state.vstorename}
                    </Text>
                </View>
                <View
                    style={{
                        borderBottomColor: "white",
                        borderBottomWidth: 1
                    }}
                />
                <TableView >

                    <Section header="SALES DETAILS" headerTextColor="#3386D6"  >

                        {/* <Cell cellStyle="RightDetail" rightDetailColor="#f15a2c" titleTextColor="#f15a2c" title={"Qty   Itemname"} detail="Amount" /> */}
                        <View style = {{flexDirection : 'row'}}>
                        <View style = {{width : '10%',marginLeft : '3%'}}>
                        <Text style={{fontSize : 15,color : '#f15a2c'}}>Qty</Text>
                        </View>
                        <View style = {{width : '65%',}}>
                        <Text style={{fontSize : 15,color : '#f15a2c'}}>Itemname</Text>
                        </View>
                        <View style = {{width : '25%'}}>
                        <Text style={{fontSize : 15,color : '#f15a2c'}}>Amount</Text>
                        </View>
                        </View>

                        {this.state.salesData.map((item, key) => (
                            <View style = {{flexDirection : 'row',backgroundColor : '#fff'}}>
                             <View style = {{width : '10%',marginLeft : '3%'}}>
                             {/* <Text style={{fontSize : 15,color : '#f15a2c'}}>Qty</Text> */}
                            <Text style={styles.TextStyle}> {item.iunitqty}</Text>
                            </View>
                            <View style = {{width : '65%',}}>
                            {/* <Text style={{fontSize : 15,color : '#f15a2c'}}>Itemname</Text> */}
                            <Text style={styles.TextStyle}> {item.vitemname}</Text>
                            </View>
                            <View style = {{width : '25%'}}>
                            {/* <Text style={{fontSize : 15,color : '#f15a2c'}}>Amount</Text> */}
                            <Text style={styles.TextStyle}> ${item.nextunitprice}</Text>
                            </View>
                            </View>)
                            
                            // <Cell

                            //     cellStyle="RightDetail" title={item.iunitqty +""+ "   " + item.vitemname} detail={item.nextunitprice} />
                        )
                        }
                    </Section>

                   


                    <Section header="SALES" headerTextColor="#3386D6">
                    <Cell cellStyle="RightDetail" title="Register" detail={<Text>{this.state.register}</Text>} />
                       <Cell cellStyle="RightDetail" title="Sub Total" detail={<Text>${this.state.sales}</Text>}/>
                        <Cell cellStyle="RightDetail" title="Tax" detail={<Text>${this.state.tax}</Text>}/>
                        {/* <Cell cellStyle="RightDetail" title="Discount Amount" detail={this.state.discountAmount} /> */}
                     <Cell cellStyle="RightDetail" title="Total" detail={<Text>${this.state.nnettotal}</Text>}/>
                     </Section>

                     <Section header="RETURNED ITEMS" headerTextColor="#3386D6"  >

                        {/* <Cell cellStyle="RightDetail" rightDetailColor="#f15a2c" titleTextColor="#f15a2c" title={"Qty   Itemname"} detail="Amount" /> */}
                        <View style = {{flexDirection : 'row'}}>
                        <View style = {{width : '10%',marginLeft : '3%'}}>
                        <Text style={{fontSize : 15,color : '#f15a2c'}}>Qty</Text>
                        </View>
                        <View style = {{width : '65%',}}>
                        <Text style={{fontSize : 15,color : '#f15a2c'}}>Itemname</Text>
                        </View>
                        <View style = {{width : '25%'}}>
                        <Text style={{fontSize : 15,color : '#f15a2c'}}>Amount</Text>
                        </View>
                        </View>

                        {this.state.SalesReturnDetail.map((item, key) => (
                            <View style = {{flexDirection : 'row',backgroundColor : '#fff'}}>
                            <View style = {{width : '10%',marginLeft : '3%'}}>
                            {/* <Text style={{fontSize : 15,color : '#f15a2c'}}>Qty</Text> */}
                            <Text style={styles.TextStyle}> {item.iunitqty}</Text>
                            </View>
                            <View style = {{width : '65%',}}>
                            {/* <Text style={{fontSize : 15,color : '#f15a2c'}}>Itemname</Text> */}
                            <Text style={styles.TextStyle}> {item.vitemname}</Text>
                            </View>
                            <View style = {{width : '25%'}}>
                            {/* <Text style={{fontSize : 15,color : '#f15a2c'}}>Amount</Text> */}
                            <Text style={styles.TextStyle}> (${item.ndebitamt})</Text>
                            </View>
                            </View>)
                            
                            // <Cell

                            //     cellStyle="RightDetail" title={item.iunitqty +""+ "   " + item.vitemname} detail={item.nextunitprice} />
                        )
                        }
                        </Section>

                        <Section header="SALES RETURN DETAIL VALUE" headerTextColor="#3386D6" >
                        {this.state.SalesReturnDetailValue.map((item, key) => (

                        <Cell cellStyle="RightDetail" title={item.subTotal} detail={<Text>(${item.subTotal_amount})</Text> }></Cell>
                         //<Cell cellStyle="RightDetail" title={item.tax} detail={<Text>${item.tax_amount}</Text> }></Cell>
                        // <Cell cellStyle="RightDetail" title={item.total} detail={<Text>${item.total}</Text> }></Cell>
                        ))
                        }
                         {this.state.SalesReturnDetailValue.map((item, key) => (

                            <Cell cellStyle="RightDetail" title={item.tax} detail={<Text>(${item.tax_amount})</Text> }></Cell>
                            //<Cell cellStyle="RightDetail" title={item.tax} detail={<Text>${item.tax_amount}</Text> }></Cell>
                            // <Cell cellStyle="RightDetail" title={item.total} detail={<Text>${item.total}</Text> }></Cell>
                            ))
                            }

                            {this.state.SalesReturnDetailValue.map((item, key) => (

                            <Cell cellStyle="RightDetail" title={item.total} detail={<Text>(${item.r_total})</Text> }></Cell>
                            //<Cell cellStyle="RightDetail" title={item.tax} detail={<Text>${item.tax_amount}</Text> }></Cell>
                            // <Cell cellStyle="RightDetail" title={item.total} detail={<Text>${item.total}</Text> }></Cell>
                            ))
                            }
                   
                     </Section>


                     <Section header=" " headerTextColor="#3386D6">
                     <Cell cellStyle="RightDetail" title="Grand Total" detail={<Text>{this.state.total}</Text>} />

                     {this.state.SalesGranTotal.map((item, key) => (
                       
                       <Cell cellStyle="RightDetail" title={item.vtendertype} detail={<Text>${item.namount}</Text> }></Cell>
                       ))
                       }



                     </Section>


                          

                    <Section header="TENDER DETAILS" headerTextColor="#3386D6">
                    <Cell cellStyle="RightDetail" title="Tender" detail={<Text>${this.state.Tender_Total}</Text>} />

                        {this.state.tender_detail.map((item, key) => (
                       
                        <Cell cellStyle="RightDetail" title={<Text>{item.type}</Text>} detail={<Text>${item.value}</Text> }></Cell>
                        ))
                        }
                        

                        


                    </Section>
                </TableView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    stage: {
        backgroundColor: "#EFEFF4",
        paddingTop: 0,
        paddingBottom: 0
    },
    text: { margin: 6, fontSize: 14, textAlign: "center", color: "#3386D6" },
    table: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: "#ffff"
    },
    TextStyle : {
        fontSize : 15,
        color : '#000',
        lineHeight : 25
        



    }
});