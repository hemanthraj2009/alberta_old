import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Picker,
  PickerIOS,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { CheckBox } from "react-native-elements";
import Entypo from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { Dropdown } from "react-native-material-dropdown";
import Loading from "react-native-whc-loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class AddItem extends React.Component {
  testArray = [
    {
      label: "Yes                     ",
      value: 0
    },
    {
      label: "No                     ",
      value: 1
    }
  ];
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTitle: (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginStart: 0
        }}
      >
        <Image
          source={require("../images/poslogo.jpg")}
          style={{
            height: 100,
            width: 100,
            marginRight: 40,
            resizeMode: "contain"
          }}
        />
      </View>
    ),
    // headerRight: (
    //   <View
    //     style={{
    //       marginRight: 20
    //     }}
    //   >
    //     <FontAwesome name="bell" size={25} color="#16a0db" />
    //   </View>
    // )
  };

  constructor() {
    super();
    this.state = {
      check: true,
      isLoading: true,
      PickerValueHolder: "",
      categoryHolder: "",
      subcategoryHolder: "",
      deptHolder: "",
      supplierHolder: "",
      VerificationHolder: "",
      catdata: [],
      supdata: [],
      subcategortdata: [],
      data: [],
      cost: "",
      item: "",
      sellingPrice: "",
      qty_on_hand: "",
      department: "",
      category: "",
      supplier: "",
      subcategory: "",
      selling_unit: "",
      age_verification: "",
      food_stamp: "",
      barcode: "",
      visinventory: "",
      tax1: "",
      tax2: "",
      tax3: "",
      foodItem: "",
      taxValue: "",
      tax1Value: "",
      vdepartmentname: "",
      vcompanyname: "",
      vcategoryname: "",
      InventoryDataHolder: "",
      vdepcode: "",
      vcategorycode: "",
      vsuppliercode: "",
      ageverificationArray: [],
      vsubcategoryname: "",
      vsubcategorycode: ""
    };
  }

  componentDidMount() {
    this.setState({showCategory: 0});
    const item = this.props.navigation.getParam("item");
    this.setState({
      item: item
    });
    const cost = this.props.navigation.getParam("cost");
    this.setState({
      cost: cost
    });
    const sellingPrice = this.props.navigation.getParam("sellingPrice");
    this.setState({
      sellingPrice: sellingPrice
    });
    const qty_on_hand = this.props.navigation.getParam("qty_on_hand");
    this.setState({
      qty_on_hand: qty_on_hand
    });
    const department = this.props.navigation.getParam("department");
    this.setState({
      department: department
    });
    const category = this.props.navigation.getParam("category");
    this.setState({
      category: category
    });
    const supplier = this.props.navigation.getParam("supplier");
    this.setState({
      supplier: supplier
    });
    const visinventory = this.props.navigation.getParam("visinventory");
    this.setState({
      visinventory: visinventory
    });
    const selling_unit = this.props.navigation.getParam("selling_unit");
    this.setState({
      selling_unit: selling_unit
    });
    const age_verification = this.props.navigation.getParam("age_verification");
    this.setState({
      age_verification: age_verification
    });
    const food_stamp = this.props.navigation.getParam("food_stamp");
    this.setState({
      food_stamp: food_stamp
    });

    const vdepartmentname = this.props.navigation.getParam("vdepartmentname");
    this.setState({
      vdepartmentname: vdepartmentname
    });

    const vcategoryname = this.props.navigation.getParam("vcategoryname");
    this.setState({
      vcategoryname: vcategoryname
    });

    const vcompanyname = this.props.navigation.getParam("vcompanyname");
    this.setState({
      vcompanyname: vcompanyname
    });

    const vdepcode = this.props.navigation.getParam("vdepcode");
    this.setState({
      vdepcode: vdepcode
    });

    const vcategorycode = this.props.navigation.getParam("vcategorycode");
    this.setState({
      vcategorycode: vcategorycode
    });

    const vsuppliercode = this.props.navigation.getParam("vsuppliercode");
    this.setState({
      vsuppliercode: vsuppliercode
    });

    const vsubcategoryname = this.props.navigation.getParam("vsubcategoryname");
    this.setState({
      vsubcategoryname: vsubcategoryname
    });

    const vsubcategorycode = this.props.navigation.getParam("vsubcategorycode");
    this.setState({
      vsubcategorycode: vsubcategorycode
    });

    if (vsubcategorycode != "") {
      this.setState({
        categoryHolder: vcategorycode
      });
      this.getSubCategoryList(vcategorycode, 1);
      this.setState({
        subcategoryHolder: vsubcategoryname
      });
    }

    if (vdepcode != "") {
      this.setState({
        deptHolder: vdepcode
      });
      this.getCategoryList(vdepcode, 1);
      this.setState({
        categoryHolder: vcategorycode
      });
    }
    if (vsuppliercode != "") {
      this.setState({
        supplierHolder: vsuppliercode
      });
    }

    if (food_stamp == "N") {
      this.state.foodItem = 1;
    }
    if (food_stamp == "Y") {
      this.state.foodItem = 0;
    }
    if (age_verification != "") {
      this.setState({
        VerificationHolder: age_verification
      });
    }

    const barcode = this.props.navigation.getParam("barcode");
    this.setState({
      barcode: barcode
    });

    const isInventery = this.props.navigation.getParam("isInventery");
    this.setState({
      isInventery: isInventery
    });

    if (isInventery != "") {
      this.setState({
        InventoryDataHolder: isInventery
      });
    }

    const tax1 = this.props.navigation.getParam("tax1");
    this.setState({
      tax1: tax1
    });
    const tax2 = this.props.navigation.getParam("tax2");

    this.setState({
      tax2: tax2
    });

    const tax3 = this.props.navigation.getParam("tax3");

    this.setState({
      tax3: tax3
    });


    if (tax1 == "N") {
      this.state.checkedTax1 = false;
    }
    if (tax1 == "Y") {
      this.state.checkedTax1 = true;
    }

    if (tax2 == "N") {
      this.state.checkedTax2 = false;
    }
    if (tax2 == "Y") {
      this.state.checkedTax2 = true;
    }

    if (tax3 == "N") {
      this.state.checkedTax3 = false;
    }
    if (tax3 == "Y") {
      this.state.checkedTax3 = true;
    }

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(SID => {
        if (data) {
          return fetch(
            API_BASE_URL+`admin/department/list/${SID}?token=${encodeURIComponent(
              data
            )}`
          )
            .then(response => response.json())
            .then(responseJson => {
              this.setState(
                {
                  isLoading: false,
                  data: responseJson.data
                },
                function() {
                  // In this block you can do something with new state.
                }
              );
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });
    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(SID => {
        if (data) {
          return fetch(
            API_BASE_URL +
              `admin/vendor/list/${SID}?token=${encodeURIComponent(data)}`
          )
            .then(response => response.json())
            .then(responseJson => {
              this.setState(
                {
                  isLoading: false,
                  supdata: responseJson.data
                },
                function() {
                  // In this block you can do something with new state.
                }
              );
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(SID => {
        if (data) {
          return fetch(
            API_BASE_URL +
              `admin/ageverification/list/${SID}?token=${encodeURIComponent(
                data
              )}`
          )
            .then(response => response.json())
            .then(responseJson => {
              this.setState(
                {
                  isLoading: false,
                  ageverificationArray: responseJson.data
                },
                function() {
                  // In this block you can do something with new state.
                }
              );
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });
  }

  getCategoryList = (deparmentID, isLoad = 0) => {
    // this.state.vcategoryname = ""
    // // this.state.categoryHolder = ""
    // this.setState({ deptHolder: deparmentID })

    this.state.vcategoryname = "";
    this.state.categoryHolder = "";
    this.setState({
      deptHolder: deparmentID
    });
    // this.setState({ categoryHolder: this.state.categoryHolder })

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(SID => {
        if (data) {
          return fetch(
            `https://portal.albertapayments.com/api/admin/category/list/${SID}/${deparmentID}?token=${encodeURIComponent(
              data
            )}`
          )
            .then(response => response.json())
            .then(responseJson => {
              // this.refs.loading.show(false);

              if (responseJson.data.length === 0) {
                this.setState({
                  isLoading: false,
                  catdata: responseJson.data,
                  categoryHolder: ""
                });
              } else {
                this.setState(
                  {
                    isLoading: false,
                    catdata: responseJson.data
                    // categoryHolder: ''
                  },
                  function() {
                    // In this block you can do something with new state.
                  }
                );
              }
              this.componentWillUnmount;
              if (isLoad == 0) {
                this.setState({
                  categoryHolder: ""
                });
              } else {
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });
  };
  getSubCategoryList = (subCategoryID, isLoad = 0) => {
    // this.state.vcategoryname = ""
    // this.state.categoryHolder = ""
    // this.setState({ deptHolder: deparmentID })
    // this.setState({ categoryHolder: this.state.categoryHolder })

    this.state.vsubcategoryname = "";
    this.state.subcategoryHolder = "";
    this.setState({
      categoryHolder: subCategoryID
    });

    AsyncStorage.getItem("token").then(data => {
      AsyncStorage.getItem("Sid").then(SID => {
        if (data) {
          return fetch(
            `https://portal.albertapayments.com/api/admin/subcategorysid?category_id=${subCategoryID}&sid=${SID}&token=${encodeURIComponent(
              data
            )}`
          )
            .then(response => response.json())
            .then(responseJson => {
              this.setState(
                {
                  isLoading: false,
                  subcategortdata: responseJson.data
                  // subcategoryHolder: '',
                },
                function() {
                  // In this block you can do something with new state.
                }
              );
              if (isLoad == 0) {
                this.setState({
                  subcategoryHolder: ""
                });
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });
  };

  GetPickerSelectedItemValue = () => {
    Alert.alert(this.state.PickerValueHolder);
  };

  saveNPLItemDetails = deparmentID => {
    if (this.state.foodItem == 0) {
      this.state.foodItem = "Y";
    }

    if (this.state.foodItem == 1) {
      this.state.foodItem = "N";
    }

    if (this.state.checkedTax1 == true) {
      this.state.checkedTax1 = "Y";
    }
    if (this.state.checkedTax1 == false) {
      this.state.checkedTax1 = "N";
    }

    if (this.state.checkedTax2 == true) {
      this.state.checkedTax2 = "Y";
    }
    if (this.state.checkedTax2 == false) {
      this.state.checkedTax2 = "N";
    }

    if (this.state.checkedTax3 == true) {
      this.state.checkedTax3 = "Y";
    }
    if (this.state.checkedTax3 == false) {
      this.state.checkedTax3 = "N";
    }

    AsyncStorage.getItem("token").then(data => {
      // alert(this.state.categoryHolder)
      AsyncStorage.getItem("Sid").then(sid => {
        if (sid) {
          if (data) {
            fetch(
              `https://portal.albertapayments.com/api/admin/insert/item/customer?token=${encodeURIComponent(
                data
              )}`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  sku: this.state.barCodeNumber,
                  sid: sid,
                  item_name: this.state.item,
                  cost: this.state.cost,
                  barcode: this.state.barcode,
                  selling_price: this.state.sellingPrice,
                  qty_on_hand: this.state.qty_on_hand,
                  department_code: this.state.deptHolder,
                  category_code: this.state.categoryHolder,
                  supplier_code: this.state.supplierHolder,
                  age_verification: this.state.VerificationHolder,
                  is_inventory: this.state.InventoryDataHolder,
                  food_stamp: this.state.foodItem,
                  tax1: this.state.checkedTax1,
                  tax2: this.state.checkedTax2,
                  tax3: this.state.checkedTax3
                })
              }
            )
              .then(response => response.json())
              .then(responseJson => {
                if (responseJson.message) {
                  Alert.alert(responseJson.message);
                } 
                
                  if (responseJson.success) {
                    Alert.alert(
                       "",
                       responseJson.success,
                        [
                            { text: 'OK', onPress: () => this.cancelBtnPress() },

                        ]
                    )

                }
                if (responseJson.error) {
                  alert(responseJson.error);
                }
              })

              .catch(error => {
                console.error(error);
              });
          }
        }
      });
    });
  };
  cancelBtnPress = () => {
    this.props.navigation.navigate("Barcodeadditem");
  };

  render() {
    <Loading ref="loading" />;
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            paddingTop: 20
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    let InventoryData = [
      {
        value: "YES"
      },
      {
        value: "NO"
      }
    ];
    const { tax3 } = this.state;
    return (

      <View style={styles.MainContainer}>
        <KeyboardAwareScrollView>
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
              
              Add/Edit Item
            </Text>
          </View>
          <ScrollView>
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setTextSize}> Item Name </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                <TextInput
                  style={styles.input}
                  returnKeyType="next"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.item}
                  onChangeText={item =>
                    this.setState({
                      item
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setTextSize}> Bar Code </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                <TextInput
                  style={styles.input}
                  returnKeyType="next"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.barcode}
                />
              </View>
            </View>
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setTextSize}> Cost </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                <TextInput
                  style={styles.input}
                  returnKeyType="next"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.cost}
                  keyboardType="numeric"
                  onChangeText={cost =>
                    this.setState({
                      cost
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setTextSize}> Price </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                <TextInput
                  style={styles.input}
                  returnKeyType="next"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.sellingPrice}
                  keyboardType="numeric"
                  onChangeText={sellingPrice =>
                    this.setState({
                      sellingPrice
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setDepartmentTextSize}> Department </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                <Dropdown
                  label="Select Department"
                  data={this.state.data}
                  value={this.state.vdepartmentname}
                  selectedValue={this.state.deptHolder}
                  itemTextStyle="bold"
                  labelFontSize={16}
                  fontSize={16}
                  shadeOpacity="2.0"
                  containerStyle={styles.inputt}
                  onChangeText={(value, index) => this.getCategoryList(value)}
                />
              </View>
            </View>
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setDepartmentTextSize}> Category </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                
                {
                  <Dropdown
                    label="Select Category"
                    data={this.state.catdata}
                    value={this.state.categoryHolder}
                    // selectedValue={this.state.categoryHolder}
                    itemTextStyle="bold"
                    labelFontSize={16}
                    fontSize={16}
                    containerStyle={styles.inputt}
                    onChangeText={(value, index) =>
                      this.setState(
                        {
                          categoryHolder: value
                        },
                        this.getSubCategoryList(value)
                      )
                    }
                  />
                }
              </View>
            </View>
        {/* Sub category starts*/}
        
        {showcategary ? <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setDepartmentTextSize}> Sub category </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                <Dropdown
                  label="Select Sub-Category"
                  data={this.state.subcategortdata}
                  // value={this.state.vsubcategoryname}
                  value={this.state.subcategoryHolder}
                  itemTextStyle="bold"
                  labelFontSize={16}
                  fontSize={16}
                  shadeOpacity="2.0"
                  containerStyle={styles.inputt}
                  onChangeText={(value, index) =>
                    this.setState({
                      subcategoryHolder: value
                    })
                  }
                />
              </View>
            </View>
 : <View></View>}
        
                    {/* Sub category starts*/}
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setDepartmentTextSize}> Supplier </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                
                {
                  <Dropdown
                    label="Select Supplier"
                    data={this.state.supdata}
                    value={this.state.vcompanyname}
                    itemTextStyle="bold"
                    labelFontSize={16}
                    fontSize={16}
                    selectedValue={this.state.supplierHolder}
                    containerStyle={styles.inputt}
                    onChangeText={(value, index) =>
                      this.setState({
                        supplierHolder: value
                      })
                    }
                  />
                }
              </View>
            </View>
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setDepartmentTextSize}>
                  
                  Inventory Item
                </Text>
              </View>
              {/* <TextInput
                                    style={styles.input}
                                    
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.isInventery}
                                    onChangeText={isInventery => this.setState({ isInventery })}
                                  >
                                  </TextInput> */}
              <View
                style={{
                  width: "60%"
                }}
              >
                <Dropdown
                  label="Select Inventory"
                  data={InventoryData}
                  value={this.state.visinventory}
                  selectedValue={this.state.InventoryDataHolder}
                  itemTextStyle="bold"
                  labelFontSize={16}
                  fontSize={16}
                  shadeOpacity="2.0"
                  containerStyle={styles.inputt}
                  onChangeText={(value, index) =>
                    this.setState({
                      InventoryDataHolder: value
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.logocontainer}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setTextSize}> QOH </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                <TextInput
                  style={styles.input}
                  returnKeyType="next"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={this.state.qty_on_hand}
                  onChangeText={qty_on_hand =>
                    this.setState({
                      qty_on_hand
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.taxContainer}>
              <View
                style={{
                  width: "15%",
                  paddingLeft : 10
                  
                }}
              >
                <Text style={styles.setTextSize}> Tax </Text>
              </View>
              <View
                style={{
                  width: "28%"
                }}
              >
                <View flexDirection="row">
                  <CheckBox
                    checkedIcon={
                      <Entypo name="checksquare" size={15} color="#f15a2c">
                        
                      </Entypo>
                    }
                    uncheckedIcon={
                      <FontAwesome name="square-o" size={15} color="#636466" />
                    }
                    title="Tax1"
                    checked={this.state.checkedTax1}
                    onPress={() =>
                      this.setState({
                        checkedTax1: !this.state.checkedTax1
                      })
                    }
                    style={{
                      flex: 1,
                      backgroundColor: "#fff"
                    }}
                  />
                  <CheckBox
                    checkedIcon={
                      <Entypo
                        name="checksquare"
                        size={15}
                        color="#f15a2c"
                        marginLeft="10"
                        marginTop="0"
                      />
                    }
                    uncheckedIcon={
                      <FontAwesome name="square-o" size={15} color="#636466" />
                    }
                    title="Tax2"
                    checked={this.state.checkedTax2}
                    onPress={() =>
                      this.setState({
                        checkedTax2: !this.state.checkedTax2
                      })
                    }
                  />

{tax3 == "" || tax3 === "Y" || tax3 === "N" ? (
                                        <CheckBox
                                            checkedIcon={
                                                <Entypo
                                                    name="checksquare"
                                                    size={15}
                                                    color="#f15a2c"
                                                    marginLeft="0%"
                                                    marginEnd="1%"
                                                />
                                            }
                                            uncheckedIcon={
                                                <FontAwesome
                                                    name="square-o"
                                                    size={15}
                                                    color="#636466"
                                                />
                                            }
                                            title="Tax3"
                                            checked={this.state.checkedTax3}
                                            onPress={() =>
                                                this.setState({
                                                    checkedTax3: !this.state.checkedTax3
                                                })
                                            }
                                        />
                                    ) : null}
                </View>
              </View>
            </View>
            <View style={styles.foodContainer}>
              <View
                style={{
                  width: "38%"
                }}
              >
                <Text style={styles.setTextSize}> Food Item </Text>
              </View>
              <View
                style={{
                  width: "68%"
                }}
              >
                <RadioForm
                  radio_props={this.testArray}
                  labelstyle={{
                    fontSize: 40,
                    fontWeight: "bold",
                    alignItems: "center"
                  }}
                  flexDirection="row"
                  formHorizontal={true}
                  animation={true}
                  initial={this.state.foodItem}
                  labelColor="#636466"
                  selectedLabelColor="#286fb7"
                  onPress={foodItem => {
                    this.setState({
                      foodItem: foodItem
                    });
                  }}
                />
              </View>
            </View>
            <View style={styles.logocontainer1}>
              <View
                style={{
                  width: "40%"
                }}
              >
                <Text style={styles.setTextSize}> Age Verification </Text>
              </View>
              <View
                style={{
                  width: "60%"
                }}
              >
                
                {
                  <Dropdown
                    label="Select AgeVerification"
                    data={this.state.ageverificationArray}
                    value={this.state.age_verification}
                    itemTextStyle="bold"
                    labelFontSize={16}
                    fontSize={16}
                    selectedValue={this.state.VerificationHolder}
                    containerStyle={styles.inputt}
                    onChangeText={(value, index) =>
                      this.setState({
                        VerificationHolder: value
                      })
                    }
                  />
                }
              </View>
            </View>
            <View style={styles.btncontainerr}>
              <TouchableOpacity
                style={styles.btncontainer}
                onPress={this.saveNPLItemDetails}
              >
                <Text style={styles.btnText}> Save </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btncontainer}
                onPress={this.cancelBtnPress}
              >
                <Text style={styles.btnText}> Cancel </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Loading ref="loading" />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logocontainer: {
    flex: 1,
    marginTop: 0,
    marginBottom: 3,
    marginLeft: 10,
    flexDirection: "row"
  },

  btncontainerr: {
    flexDirection: "row",
    marginLeft: 50
  },
  logocontainer1: {
    flex: 1,
    marginTop: 0,
    marginBottom: 5,
    marginLeft: 10,
    flexDirection: "row"
  },
  ScrollContainer: {
    flex: 1,
    marginTop: 0,
    marginBottom: 3,
    marginLeft: 10,
    width: 100,

    flexDirection: "row"
  },
  MainContainer: {
    flex: 1,

    // Set content's vertical alignment.
    justifyContent: "center",

    // // Set content's horizontal alignment.
    alignItems: "center",

    // Set hex color code here.
    backgroundColor: "#fff"
  },

  MainContainer1: {
    justifyContent: "center",
    flex: 1,
    margin: 10
  },
  taxContainer: {
    flex: 1,
    marginTop: 13,

    marginRight: 5,
    
    backgroundColor: "#fff",

    flexDirection: "row"
  },
  foodContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    flexDirection: "row"
  },

  setTextSize: {
    fontSize: 18,
    fontWeight: "300",
    color: "#286fb7"
  },
  setDepartmentTextSize: {
    fontSize: 18,
    fontWeight: "300",
    color: "#286fb7"
  },
  setCheckMark: {
    width: 50,
    height: 50,
    marginLeft: 70,
    color: "#286fb7"
    //  color: 'white'
  },
  input: {
    //width: 250,
    alignSelf: "stretch",
    height: 40,

    marginEnd: 10,
    borderRadius: 3,
    borderRightWidth: 1,
    borderRightColor: "#636466",
    borderLeftWidth: 1,
    borderLeftColor: "#636466",
    borderTopWidth: 1,
    borderTopColor: "#636466",
    borderBottomWidth: 1,
    borderBottomColor: "#636466",

    marginBottom: 10,
    color: "#000",
    fontSize: 15,
    paddingHorizontal: 20
  },

  inputt: {
    //width: 250,
    alignSelf: "stretch",
    height: 70,

    marginEnd: 10,
    borderRadius: 3,
    borderRightWidth: 1,
    borderRightColor: "#636466",
    borderLeftWidth: 1,
    borderLeftColor: "#636466",
    borderTopWidth: 1,
    borderTopColor: "#636466",
    borderBottomWidth: 1,
    borderBottomColor: "#636466",

    marginBottom: 10,
    color: "#000",
    fontSize: 15,
    paddingHorizontal: 20
  },
  setDroupDownStyleInput: {
    marginRight: 10,
    marginLeft: 20,
    height: 40,
    width: 230,
    flexDirection: "row"
  },
  btncontainer: {
    backgroundColor: "#f15a2c",

    borderRadius: 10,
    // mirginTop: 10,
    height: 35,
    marginLeft: 10,
    marginRight: 20,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },
  btnText: {
    marginLeft: 0,
    fontSize: 20,
    color: "#fff"
  }
});
