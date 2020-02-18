import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, AsyncStorage, TouchableWithoutFeedback, SwipeView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Loading from "react-native-whc-loading";
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation'

export default class ReciveOrder extends Component {

    constructor() {
        super()

        this.state = { isLoading: true, isFetching: false, };
        this.setState({ dataSource: null, ipoid: "", isLoading: false, });

    }

    nextscreen = (item, index) => {




        //  alert(item.ipoid)


        AsyncStorage.setItem(
            "ipoid",
            JSON.stringify(item.ipoid)
        );



        //alert(this.state.ipoid)
        //  alert("Next Screen")
        this.props.navigation.navigate('OrderInformation')
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.componentDidMount() });
    }

    LoginPress = () => {

        // alert("Under Development")
        this.props.navigation.navigate('AddNewReceivingOrder')
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
            {/* <FontAwesome name="bell" size={25} color="#16a0db" /> */}
          </View>
        )
      };

    renderItem = ({ item, index }) => {



        console.log(item.estatus)
        return (
            <View style = {{flex: 1}}>



                <ScrollView>
                    < View style={{
                        marginTop: 3, borderRightWidth: 1,
                        borderBottomWidth: 1,

                    }
                    }>


                        {/* <TouchableOpacity onPress={this.nextscreen()}> */}

                        <TouchableWithoutFeedback onPress={() => this.nextscreen(item, index)}>


                            <View style={{ flexDirection: 'row', marginLeft: '0%', marginBottom: '0%', marginRight: '2%', width: "100%", backgroundColor: item.estatus === 'Finalize' ? '#00a65a' : null }}>
                                <Text style={{ fontSize: 18, marginRight: '2%', color: item.estatus === 'Finalize' ? '#fff' : '#3386D6', width: "15%" }}>{item.dcreatedate}</Text>
                                <Text style={{ fontSize: 18, marginRight: '5%', color: item.estatus === 'Finalize' ? '#fff' : '#3386D6', width: "10%" }}>{item.vvendorname}</Text>
                                <Text style={{ fontSize: 18, marginRight: '2%', color: item.estatus === 'Finalize' ? '#fff' : '#3386D6', width: "35%" }}>{item.vinvoiceno}</Text>
                                <Text style={{ fontSize: 18, marginRight: '5%', color: item.estatus === 'Finalize' ? '#fff' : '#3386D6', width: "35%" }}>{item.total_amount}</Text>

                            </View>




                        </TouchableWithoutFeedback>



                    </View >

                </ScrollView>



            </View>

        )


    }

    componentDidMount() {




        AsyncStorage.getItem("token").then(data => {
            AsyncStorage.getItem("Sid").then(datasid => {
                if (data) {
                    this.setState(
                        {
                            isLoading: true,
                        },

                    );
                    const url = API_BASE_URL + 'admin/get_receiving_order/'
                    fetch(url + datasid + "?token=" + data)

                        .then((response) => response.json())
                        .then((responsejson) => {
                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );

                            this.setState({ isFetching: false })

                            if (responsejson.status == "success") {

                                this.setState({ dataSource: responsejson.table_data })
                            }

                            if (!this.alertPresent) {
                                this.alertPresent = true;

                                if (responsejson.status == "error") {

                                    alert(responsejson.error)
                                }
                                else {
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



        // AsyncStorage.getItem("Sid").then(SID => {
        //     const url = 'https://devportal.albertapayments.com/api/get_receiving_order2/'
        //     fetch(url)
        //         .then((response) => response.json())
        //         .then((responsejson) => {
        //             // this.setState({ isLoading: false, dataSource: responsejson.table_data })
        //             this.setState({ isLoading: false });

        //             this.setState({ dataSource: responseJson.table_data });
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         });

        // });


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



            <View>
                <Text
                    style={{
                        textAlign: "center",
                        color: "#696969",
                        fontSize: 20,
                        fontWeight: "bold"
                    }}
                >
                    Receiving Order

                </Text>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />

                <TouchableOpacity
                    style={styles.btncontainer}
                    onPress={this.LoginPress}
                >
                    <Text style={styles.btntext}>Add New</Text>
                </TouchableOpacity>



                <View style={styles.container}>


                    <View flexDirection='row' marginTop='0%'>



                        <View style={{
                            width: '15%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', fontWeight: "bold" }}>Date
</Text>
                        </View>

                        <View style={{
                            width: '20%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Vendor
</Text>
                        </View>

                        <View style={{
                            width: '35%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Invoice No
</Text>
                        </View>

                        <View style={{
                            width: '30%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Total Amount
</Text>
                        </View>


                    </View>


                    <FlatList
                        // horizontal={true}

                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        ItemSeparatorComponent={this.renderSeparator}

                    // showsVerticalScrollIndicator={true}
                    // showsHorizontalScrollIndicator={false}


                    //keyExtractor={(item, index) => index.toString()}



                    />

                </View>
                <View style={{ marginTop: 0, backgroundColor: '#000', height: '20%' }}>



                </View>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

        // paddingTop: 10,
        marginTop: 5,
        marginBottom: "10%",

        height: '80%'



    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 70,

    },
    btncontainer: {
        backgroundColor: "#3386D6",


        // marginTop: 10,
        bottom: 5,
        borderRadius: 40,
        height: 40,
        marginLeft: "65%",
        width: "35%",
        alignItems: 'center',
        justifyContent: 'center'


    },
    btntext: {
        //textAlign : 'center',
        fontSize: 20,
        fontWeight: "bold",



        color: "#fff"
    }

})