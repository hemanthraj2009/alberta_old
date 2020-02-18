import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,Button,AsyncStorage} from 'react-native';
import OptionsMenu from "react-native-options-menu";
import {createStackNavigator} from 'react-navigation';
import Login from './src/components/Login';
import SplashSceen from './src/components/SplashSceen'
import Transactions from './src/components/Transactions'
import Transcationdetails from './src/components/Transcationdetails'
import TransactionFilter from './src/components/TransactionFilter'
import Transations from './src/components/Transations'
import DailyReport from './src/components/DailyReport'
import ESReport from './src/components/ESReport'
import AddItem from './src/components/AddItem'
import ChangePrice from './src/components/ChangePrice'
import UpdatePicture from './src/components/UploadPicture'
import UpdateQuantity from './src/components/UpdateQuantity'
import UpdateImage from './src/components/UpdateImage'
import Notifications from './src/components/Notifications'
import Barcodeadditem from './src/components/Barcodeadditem'
import Popupmenu from './src/components/Popupmenu'
import Weekly from './src/components/Weekly'
import VoidPage from './src/components/VoidPage'
import Delete from './src/components/Delete'
import Monthly from './src/components/Monthly'
import Yealy from './src/components/Yealy'
import NPLAddItem from './src/components/NPLAddItem'
import NPLBlankResponse from './src/components/NPLBlankResponse'
import Storetableview from './src/components/Storetableview'
import BarcodeSettings from './src/components/BarcodeSettings'
import Flip from './src/components/Flip'
import NotificationDelete from './src/components/NotificationDelete'
import NotificationNosale from './src/components/NotificationNosale'
import NotificationVoid from './src/components/NotificationVoid'
import Dashboardweb from './src/components/Dashboardweb'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Barcodechangeprice from './src/components/Barcodechangeprice'
import Barcodeupdateqty from './src/components/Barcodeupdateqty'
import BarcodeupdateImg from './src/components/BarcodeupdateImg'
import Sett from './src/components/Sett'
import Touchid from './src/components/Touchid'
import Stacknav from './Navigation/Stacknav'
import BarcodeAdd from './src/components/BarcodeAdd'
import BarcodeTablePrint from './src/components/BarcodeTablePrint'

import ReciveOrder from './src/components/ReciveOrder'
import OrderInformation from './src/components/OrderInformation'
import ItemInformation from './src/components/ItemInformation'
import AddNewReceivingOrder from './src/components/AddNewReceivingOrder'
import ChooseItem from './src/components/ChooseItem'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from 'react-native-hide-show-password-input/src/component/passwordInput';

export default class App extends Component {

  dev =() =>{
    AsyncStorage.clear()
    this.props.navigation.navigate('Loginscreen');
  }

  
  render (){
    return (
     <Appstack></Appstack>
    )
  }
}
const myIcon = (<Ionicons name="md-more" size={30} color="#636466" />)
const Appstack =createStackNavigator({
//Transations : {screen : Transations},

SplashSceen: {screen:SplashSceen,
  navigationOptions: {
    header: null,
  }
},
Touchid:{screen : Touchid,
  navigationOptions: {
    header: null,
  }
},
Loginscreen : {screen : Login,
   
  navigationOptions: {
    headerVisible: true,
    headerLeft : null,
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTitle: ( 
                    <View style={{ flex: 1, alignItems: "center" }}> 
                       <Image source={require('./src/images/poslogo.jpg')} 
                        style={{ height: '50%', width: '35%' ,resizeMode: 'contain',flex : 1}} /> 
                    </View> 
                  ),
                },
},
Transactions : {screen : Transactions},
Sett : {screen : Sett,
  navigationOptions: {
    header: null,
  }
},

UpdatePicture : {screen : UpdatePicture},
TransactionFilter : {screen : TransactionFilter},
Transcationdetails : {screen : Transcationdetails},
Barcodeadditem : {screen : Barcodeadditem},
AddItem : {screen : AddItem},
BarcodeAdd: { screen: BarcodeAdd },
  BarcodeTablePrint: { screen: BarcodeTablePrint },
ChangePrice : {screen : ChangePrice},
VoidPage :{screen : VoidPage},
Delete :{screen : Delete},
Weekly : {screen : Weekly},
Monthly : {screen : Monthly},
Yealy : {screen : Yealy},
Flip : {screen : Flip},
NPLAddItem: { screen: NPLAddItem },
NPLBlankResponse: { screen: NPLBlankResponse },
Barcodechangeprice : {screen : Barcodechangeprice},
Barcodeupdateqty : {screen : Barcodeupdateqty},
BarcodeupdateImg : {screen : BarcodeupdateImg},
UpdatePicture : {screen : UpdatePicture},
UpdateQuantity : {screen : UpdateQuantity},
UpdateImage : {screen : UpdateImage},
DailyReport : {screen : DailyReport},
ESReport : {screen : ESReport},
Popupmenu : {screen : Popupmenu},
Dashboardweb : {screen : Dashboardweb},
Storetableview : {screen : Storetableview},
Notifications : {screen : Notifications},
NotificationVoid : {screen : NotificationVoid},
NotificationDelete : {screen : NotificationDelete},
NotificationNosale : {screen : NotificationNosale},
BarcodeSettings : {screen : BarcodeSettings},


ReciveOrder : {screen : ReciveOrder},
OrderInformation : {screen : OrderInformation},
ItemInformation : {screen : ItemInformation},
AddNewReceivingOrder : {screen : AddNewReceivingOrder},
ChooseItem : {screen : ChooseItem},

Stacknav : {screen : Stacknav,
navigationOptions:({ navigate, navigation }) => ({
    headerVisible: true,
    headerLeft : null,
    headerTitle: ( 
              <View style={{ flex: 1, alignItems: "center", marginLeft : 30 }}> 
                    <Image source={require('./src/images/poslogo.jpg')} 
                    style={{ height: 105, width: 105,resizeMode: 'contain',flex : 1}} /> 
                    </View> 
            ),
            headerRight: (
              // <View style={{ flex: 1, alignItems: "center" ,width : 20}}> 
              // <Popupmenu></Popupmenu>
              //  </View>

            <Popupmenu
          //Menu Text
          menutext="Menu"
          //Menu View Style
          menustyle={{
            marginRight: 16,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
          //Menu Text Style
          textStyle={{
            color: 'white',
          }}
          //Click functions for the menu items
          role={() => {
           
          }}
          barcode={() => {navigation.navigate('BarcodeSettings');}}
          Store={() => {navigation.navigate('Storetableview');}}
         // Dashboard={() => {navigation.navigate('Dashboardweb');}}
         
          logout={() => { 
            AsyncStorage.clear()
            //AsyncStorage.removeItem('savedPassword')

            navigation.navigate('Loginscreen')
          }}
        />
      
           
            )
            }),
          }
         }
//  {
//   navigationOptions: {
//     headerVisible: true,
//     headerLeft: null,
//       headerTitle: ( 
//         <View style={{ flex: 1, alignItems: "center" }}> 
//               <Image source={require('D:/AwesomeProject/src/images/poslogo.jpg')} 
//               style={{ height: '50%', width: '35%' ,resizeMode: 'contain',flex : 1}} /> 
//               </View> 
//       )
//   }
         
//   }
) 
//const Con = createAppContainer(Appstack)