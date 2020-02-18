import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {createBottomTabNavigator,createAppContainer,createStackNavigator} from 'react-navigation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../src/components/Home';
import Dashboard from '../src/components/Dashboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Notifications from '../src/components/Notifications'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Transactions from '../src/components/Transactions';
import ItemDashboard from '../src/components/ItemDashboard';
import Popupmenu from '../src/components/Popupmenu';
import LivesalesDashboard from '../src/components/LivesalesDashboard';

export default  createBottomTabNavigator({
    Home: { screen: Home,

       navigationOptions : {
          tabBarLabel: 'Home',
       
          tabBarIcon:({tintColor}) =>(
           
            <FontAwesome name="home" size={30} color={tintColor}/>
           
          )
          
        } 
    },
    Dashboard: { screen: Dashboard,
      navigationOptions : {

        tabBarLabel: 'Reports',
     
        tabBarIcon:({tintColor}) =>(
          
          <MaterialIcons name="library-books" size={30} color={tintColor}/>
            
        )
        
      } 
    },
      LiveSales: { screen: LivesalesDashboard,
        navigationOptions : {
          tabBarLabel: 'Tutorials',
          tabBarIcon:({tintColor}) =>(
          <FontAwesome name="youtube-play" size={30} color={tintColor}/>
          )
        } 
      },
      ItemDashboard: { screen: ItemDashboard,
        navigationOptions : {
          tabBarLabel: 'Item',
          headerTitle : 'header',
          tabBarIcon:({tintColor}) =>(
          <Ionicons name="md-cart" size={35} color={tintColor}/>
          )
        } 
      },
     
     
      Notifications: { screen: Notifications,
        navigationOptions : {
  
          tabBarLabel: 'Notifications',
       
          tabBarIcon:({tintColor}) =>(
            
            <EvilIcons name="bell" size={45} color={tintColor}/>
              
          )
          
        } 
      }
    },{
      tabBarOptions: {
        activeTintColor : '#f15a2c',
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          width: 100,    
        },
        style: {
          backgroundColor: '#fff',
        },
    }
 
});


  
  
  