import React from 'react';
 
import { View, Text,TouchableOpacity, AsyncStorage } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
 
export default class Menuu extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
     role_name: null,
     fname : null,
     }
  }

  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  role = () => {
    this._menu.hide();
    this.props.role();
  };
  barcode = () => {
    this._menu.hide();
    this.props.barcode();
  };
  Store = () => {
    this._menu.hide();
    this.props.Store();
  };
  Dashboard = () => {
    this._menu.hide();
    this.props.Dashboard();
  };
  
  logout = () => {
    this._menu.hide();
    this.props.logout();
  };

  componentDidMount() {

    AsyncStorage.getItem('role_name').then((dataRolename) => { 
      if(dataRolename){
        //alert(datavoids)
        this.setState({role_name:dataRolename})
      }

    })

    AsyncStorage.getItem('fname').then((datafname) => { 
      if(datafname){
        //alert(datavoids)
        this.setState({fname:datafname})
      }

    })

  }

  getRoleName = () => {
   // var roln = this.state.role_name.split(" ", 2)[0];
   var str = this.state.role_name; 
    // var splitted = str.split(" ", 1); 
    // console.log(splitted[0])
    return str;
  };

 
  render() {
   
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={ <TouchableOpacity onPress={this.showMenu} style = {{width : 30}}>
          <Ionicons name="md-more" size={40} color="#636466" />
          </TouchableOpacity>
          }>
            <MenuItem onPress={this.role}><Text style ={{color : '#000',fontWeight : '300'}}>{this.state.fname}({this.state.role_name})</Text></MenuItem>
            <MenuItem onPress={this.barcode}><Text style ={{color : '#000',fontWeight : '300'}}>Barcode Settings</Text></MenuItem>
             <MenuItem onPress={this.Store}><Text style ={{color : '#000',fontWeight : '300'}}>Select Store</Text></MenuItem>
             {/* <MenuItem onPress={this.Dashboard}><Text style ={{color : '#000',fontWeight : '300'}}>Dashboard</Text></MenuItem> */}
            
            <MenuDivider />
            <MenuItem onPress={this.logout}><Text style ={{color : '#000',fontWeight : '300'}}>
              Logout</Text>
            </MenuItem>
        </Menu>
        {/* <Text>welcomes</Text> */}
      </View>
    );
  }
}
