import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,
  TouchableOpacity,Image,TextInput,AsyncStorage,Vibration,Dimensions,Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import Loading from 'react-native-whc-loading'
import { RNCamera } from 'react-native-camera';
import { ScrollView } from 'react-native-gesture-handler';
import {NavigationEvents} from 'react-navigation'
import SearchableDropdown from 'react-native-searchable-dropdown';


export default class Barcodeadditem extends Component {

  static navigationOptions ={
    headerTitle: ( 
    <View style={{ flex: 1, alignItems: "center",marginRight:60}}> 
    <Image source={require('../images/poslogo.jpg')} 
    style={{ height: 105,
      width: 105 ,resizeMode: 'contain'}} /> 
    </View> 
    ),
   
  }
  componentDidMount() {
    this.barcode.clear()
    this.setState ({'barcode':""})
    this.state.barCodeScanned = true
    this.state.itemname = ""


    this.setState({ vendorItemCode: "" })

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
    this.maskLength = (width*85)/100;
    this.camera = null;
    this.barcodeCodes = [];
    
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true
      },
      barcode : "",
      isLoading: false,
      barCodeScanned : true,
      serverData: [],
      itemname: ""
    };
  }

  cancelAlert = () =>{
    
    this.state.barCodeScanned = true
  }
  screen = () => {
    const {barcode} = this.state;
    if(barcode == ""){
      Alert.alert(
                   
        '',
      'Barcode missing Please check',
        [
          { text: 'OK', },
        ]
      )
    }else{
    this.Nextscreen()
    // this.state.barCodeScanned = true
    }
  }
 
    Nextscreen = () => {
      if(this.state.barcode  == "")
      {
        return
      }
      
      this.state.barCodeScanned = false;
      AsyncStorage.getItem('token').then((data) => {
        AsyncStorage.getItem("Sid").then(sid => {
          if (data) {
            this.refs.loading.show();
            fetch(API_BASE_URL + `admin/checkPriceBySKU_new?sku=${this.state.barcode}&token=${encodeURIComponent(data)}&sid=${sid}`, {
              method: 'GET',
  
            }).then((response) => response.json())
              .then((responseJson) => {
                this.refs.loading.show(false);
  
                if (responseJson.status == "success") {
                  var SampleNameArray = responseJson.data[0].vitemname
                  var SampleNameArray1 = responseJson.data[0].dcostprice
                  var selling_price = responseJson.data[0].dunitprice
                  var qty_on_hand = responseJson.data[0].iqtyonhand
                  var tax1 = responseJson.data[0].vtax1
                  var tax2 = responseJson.data[0].vtax2
                  var tax3 = responseJson.data[0].vtax3
                  var department = responseJson.data[0].department
                  var category = responseJson.data[0].category
                  var supplier = responseJson.data[0].supplier
                  var selling_unit = responseJson.data[0].dunitprice
                  var age_verification = responseJson.data[0].vageverify
                  var food_stamp = responseJson.data[0].vfooditem
                  var WIC_item = responseJson.data[0].WIC_item
                  var barcode = responseJson.data[0].vbarcode
                  var visinventory = responseJson.data[0].visinventory
                  var vdepartmentname = responseJson.data[0].vdepartmentname
                  var vcategoryname = responseJson.data[0].vcategoryname
                  var vcompanyname = responseJson.data[0].vcompanyname
                  var vdepcode = responseJson.data[0].vdepcode
                  var vcategorycode = responseJson.data[0].vcategorycode
                  var vsuppliercode = responseJson.data[0].vsuppliercode
                  var vsubcategoryname = responseJson.data[0].subcat_name
                  var vsubcategorycode = responseJson.data[0].subcat_id
                  this.props.navigation.navigate('AddItem',
                    {
                      item: SampleNameArray,
                      cost: SampleNameArray1,
                      sellingPrice: selling_price,
                      qty_on_hand: qty_on_hand,
                      department: department,
                      category: category,
                      supplier: supplier,
                      selling_unit: selling_unit,
                      age_verification: age_verification,
                      food_stamp: food_stamp,
                      barcode: barcode,
                      visinventory: visinventory,
                      tax1: tax1,
                      tax2: tax2,
                      tax3: tax3,
                      vdepartmentname: vdepartmentname,
                      vcategoryname: vcategoryname,
                      vcompanyname: vcompanyname,
                      vdepcode: vdepcode,
                      vcategorycode: vcategorycode,
                      vsuppliercode: vsuppliercode,
                      vsubcategoryname: vsubcategoryname,
                      vsubcategorycode: vsubcategorycode,
                    })
  
                  //   this.props.navigation.navigate('AddItem');
  
                }
                else if (responseJson.error) {
                  this.NplItemScreen();
                }
                // else if (responseJson.data[0].subcat_name == null) {
                //   alert("testing")
                // }
                else { }
              })
              .catch((error) => {
                Alert.alert(
  
                  '',
                  'Something went wrong! Please try again later!!!!',
                  [
                    { text: 'OK', },
                  ]
                )
                // this.state.barCodeScanned = true;
              });
          }
        })
      });
      // this.barcode.clear()
    }
  
    NplItemScreen = () => {
  
      AsyncStorage.getItem('token').then((data) => {
        if (data) {
          fetch(API_BASE_URL + `admin/getItemBySKU_new?sku=${this.state.barcode}&token=${encodeURIComponent(data)}`, {
            method: 'GET',
          }).then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.status == "success") {
                Alert.alert(
                  'No Item found',
                  'Do you Want to download data from NPL',
                  [
                    {
                      text: 'No',onPress: () => this.cancelAlert(),
                      style: 'cancel',
                    },
                    { text: 'Add data from NPL', onPress: () => this.abc() },
                    { text: 'Add data Manually', onPress: () => this.abcd() },
                  ],
                  { cancelable: false },
                );
              }
              if (responseJson.message == "Item not found in NPL") {
                Alert.alert(
                  'No Item found',
                  'Do you Want to Add Item Manually',
                  [
  
                    { text: 'Yes', onPress: () => this.abcd() },
  
                    {
                      text: 'Cancel', onPress: () => this.cancelAlert(),
                      style: 'cancel',
                    },
  
                  ],
                  { cancelable: false },
  
                );
                // Alert.alert(
                //   'No Item found',
                //   'Do you Want to download data from NPL',
                //   [
  
                //     { text: 'Add data from NPL', onPress: () => this.abc() },
  
  
                //     { text: 'Add data Manually', onPress: () => this.abcd() },
  
                //     {
                //       text: 'No',
                //       style: 'cancel',
                //     },
  
                //   ],
                //   { cancelable: false },
  
                // );
              }
              else { }
            })
  
            .catch((error) => {
              Alert.alert(
  
                '',
                'Something went wrong! Please try again later!!!!',
                [
                  { text: 'OK', },
                ]
              )
            });
        }
        // this.barcode.clear()
  
      });
    }
  
    abc = () => {
  
      AsyncStorage.getItem('token').then((data) => {
  
        if (data) {
          fetch(API_BASE_URL + `admin/getItemBySKU_new?sku=${this.state.barcode}&token=${encodeURIComponent(data)}`, {
            method: 'GET',
          }).then((response) => response.json())
            .then((responseJson) => {
              var SampleNameArray = responseJson.data.item_name
              var SampleNameArray1 = responseJson.data.cost
              var selling_price = responseJson.data.selling_price
              var qty_on_hand = responseJson.data.qty_on_hand
              var tax1 = responseJson.data.tax1
              var tax2 = responseJson.data.tax2
              var department = responseJson.data.department
              var category = responseJson.data.category
              var supplier = responseJson.data.supplier
              var selling_unit = responseJson.data.selling_price
              var age_verification = responseJson.data.age_verification
              var food_stamp = responseJson.data.food_stamp
              var WIC_item = responseJson.data.WIC_item
              var barcode = responseJson.data.barcode
              this.props.navigation.navigate('NPLAddItem',
                {
                  item: SampleNameArray,
                  cost: SampleNameArray1,
                  sellingPrice: selling_price,
                  qty_on_hand: qty_on_hand,
                  department: department,
                  category: category,
                  supplier: supplier,
                  selling_unit: selling_unit,
                  age_verification: age_verification,
                  food_stamp: food_stamp,
                  barcode: barcode,
                  tax1: tax1,
                  tax2: tax2,
  
  
                })
  
            })
        }
      })
    }
    abcd = () => {

      AsyncStorage.getItem("token").then(data => {
        // alert(this.state.categoryHolder)
        AsyncStorage.getItem("Sid").then(sid => {
          if (sid) {
            if (data) {
              fetch(
                API_BASE_URL + `admin/taxinfo?token=${data}&sid=${sid}`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                }
              )
                .then(response => response.json())
                .then(responseJson => {
  
                  if (responseJson.success) {
  
                    var bCodePass = this.state.barcode
                    var tax3 = responseJson.success
  
  
  
                    this.props.navigation.navigate('NPLBlankResponse',
                      {
                        barcodePass: bCodePass,
                        tax3: tax3
                      })
  
  
  
                  }
  
                  else {
  
                    var bCodePass = this.state.barcode
  
  
                    this.props.navigation.navigate('NPLBlankResponse',
                      {
                        barcodePass: bCodePass,
  
                      })
  
                   
  
  
  
                  }
  
  
  
  
  
  
  
                })
  
                .catch(error => {
                  console.error(error);
                });
            }
          }
        });
      });
  
  
  
  
    }
  
    onBarCodeRead(scanResult) {
      
      if(this.state.barCodeScanned == false){
        return
      }
    
  
      Vibration.vibrate()

       if(scanResult.type == "UPC_E"){

        AsyncStorage.getItem('UEUA').then(
          UEUA => {
                  if (UEUA == "1") {

                   // this.refs.loading.show(); 
                  
                   fetch(API_BASE_URL + `convertupce2upca?upc=${encodeURIComponent(scanResult.data)}`, {
                     
                    method: 'GET',
         
                   }).then((response) => response.json())
                    .then((responseJson) => {

                     // this.refs.loading.show(false);
                      if (responseJson.status =="success") {
              
                        AsyncStorage.getItem('UPCAL').then(
                          UPCAL => {
                                  if (UPCAL == "1") {
                                    
                                    AsyncStorage.getItem('UPCAR').then(
                                      UPCAR => {
                                              if (UPCAR == "1") {
                                                this.setState({"barcode":responseJson.data.substring(1, responseJson.data.length - 1)})
                                                if(this.state.barcode != '')   this.Nextscreen();
                                              }else{
                                                this.setState({"barcode":responseJson.data.substring(1)})
                                                if(this.state.barcode != '')   this.Nextscreen();
                                              }
                                            }
                                    )

                                  } else {

                                    AsyncStorage.getItem('UPCAR').then(
                                      UPCAR => {
                                              if (UPCAR == "1") {
                                                this.setState({"barcode": responseJson.data.substring(0, responseJson.data.length - 1)})
                                                if(this.state.barcode != '')   this.Nextscreen();
                                              }else{
                                                this.setState({'barcode' : responseJson.data})
                                                if(this.state.barcode != '')   this.Nextscreen();
                                              }
                                            }
                                    )
                      
                                  }
                                }            
                        )
                  

                      } else if (responseJson.status =="error") {
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
                                  this.setState({"barcode":scanResult.data.substring(1, scanResult.data.length - 1)})
                                  if(this.state.barcode != '')   this.Nextscreen();
                                }else{
                                  this.setState({"barcode":scanResult.data.substring(1)})
                                  if(this.state.barcode != '')   this.Nextscreen();
                                }
                              }
                      )

                    } else {

                      AsyncStorage.getItem('UPCER').then(
                        UPCER => {
                                if (UPCER == "1") {
                                  this.setState({"barcode": scanResult.data.substring(0, scanResult.data.length - 1)})
                                  if(this.state.barcode != '')   this.Nextscreen();
                                }else{
                                  this.setState({'barcode' : scanResult.data})
                                  if(this.state.barcode != '')   this.Nextscreen();
                                }
                              }
                      )
        
                    }
                  }            
          )
    
        }
        })
   
      } else {

        var ScannedBarcodeResult = '';
        if(scanResult.data.length > 12)
          ScannedBarcodeResult = scanResult.data.substring(scanResult.data.length-12)

        // scanned result UPCA 
        AsyncStorage.getItem('UAUE').then(
          UAUE => {
                 if (UAUE == "1") {
                  //this.refs.loading.show(); 
                  
                  fetch(API_BASE_URL + `convertupca2upce?upc=${encodeURIComponent(ScannedBarcodeResult)}`, {
                     
                    method: 'GET',
         
                   }).then((response) => response.json())
                    .then((responseJson) => {
                     // this.refs.loading.show(false);
                      if (responseJson.status =="success") {
          
                        
                        AsyncStorage.getItem('UPCEL').then(
                          UPCEL => {
                                  if (UPCEL == "1") {
                                    
                                    AsyncStorage.getItem('UPCER').then(
                                      UPCER => {
                                              if (UPCER == "1") {
                                                this.setState({"barcode":responseJson.data.substring(1, responseJson.data.length - 1)})
                                                if(this.state.barcode != '')   this.Nextscreen();
                                              }else{
                                                this.setState({"barcode":responseJson.data.substring(1)})
                                                if(this.state.barcode != '')   this.Nextscreen();
                                              }
                                            }
                                    )

                                  } else {

                                    AsyncStorage.getItem('UPCER').then(
                                      UPCER => {
                                              if (UPCER == "1") {
                                                this.setState({"barcode": responseJson.data.substring(0, responseJson.data.length - 1)})
                                                if(this.state.barcode != '')   this.Nextscreen();
                                              }else{
                                                this.setState({'barcode' : responseJson.data})
                                                if(this.state.barcode != '')   this.Nextscreen();
                                              }
                                            }
                                    )
                      
                                  }
                                }            
                        )
                  } else if (responseJson.status =="error") {
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
                                  this.setState({"barcode":ScannedBarcodeResult.substring(1, ScannedBarcodeResult.length - 1)})
                                  if(this.state.barcode != '')   this.Nextscreen();

                                }else{
                                  this.setState({"barcode":ScannedBarcodeResult.substring(1)})
                                  if(this.state.barcode != '')   this.Nextscreen();
                                }
                              }
                      )

                    } else {

                      AsyncStorage.getItem('UPCAR').then(
                        UPCAR => {
                                if (UPCAR == "1") {
                                  this.setState({"barcode": ScannedBarcodeResult.substring(0, ScannedBarcodeResult.length - 1)})
                                  if(this.state.barcode != '')   this.Nextscreen();
                                }else{
                                  this.setState({'barcode' : ScannedBarcodeResult})
                                  if(this.state.barcode != '')   this.Nextscreen();
                                }
                              }
                      )
        
                    }
                  }            
          )
    
        }
    })
   
  }


  }
   

  render() {
    return (
      // <ScrollView >

      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />

        <View style={{ marginTop: 5, alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}> Add/Edit Item</Text>
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
            }}


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
            keyboardType="numeric"
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
      // </ScrollView>
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
  }
};