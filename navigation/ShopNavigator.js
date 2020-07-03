import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const optionsStackDefault = {
    headerTitle: 'A Screen',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans'
      },
      
    }

const ProductsStack = createStackNavigator();
const ProductsStackScreen = () => (
    <ProductsStack.Navigator
        screenOptions={optionsStackDefault}
    >
        <ProductsStack.Screen 
            name="ProductsOverview" 
            component={ProductsOverviewScreen}
            options={() => ({
                
            })} 
        />
            <ProductsStack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={() => ({
                
            })} 
        />
            <ProductsStack.Screen 
            name="Cart" 
            component={CartScreen}
            options={() => ({
                
            })} 
        />                          
    </ProductsStack.Navigator>  
)
const OrderStack = createStackNavigator();
const OrderStackScreen = () => (
    <OrderStack.Navigator
        screenOptions={optionsStackDefault}
    >
        <OrderStack.Screen 
        name="Order" 
        component={OrdersScreen}
        options={() => ({
            
        })} 
        />                          
    </OrderStack.Navigator>  
)
const AdminStack = createStackNavigator();
const AdminStackScreen = () => (
    <AdminStack.Navigator
        screenOptions={optionsStackDefault}
    >
        <AdminStack.Screen 
        name="Order" 
        component={UserProductsScreen}
        options={() => ({
            
        })} 
        />      
        <AdminStack.Screen 
        name="EditProduct" 
        component={EditProductScreen}
        options={() => ({
            
        })} 
        />                                 
    </AdminStack.Navigator>  
)

const ShopNavigatorDrawer = createDrawerNavigator();


const ShopNavigator = () => { //export default


    return (   
        <NavigationContainer>
            <ShopNavigatorDrawer.Navigator
                drawerContentOptions={{
                activeTintColor: Colors.accentColor,
                labelStyle: {
                    fontFamily: 'open-sans-bold'
                }
                }}
            >
                <ShopNavigatorDrawer.Screen 
                    name="ProductsStack" 
                    component={ProductsStackScreen}
                    options={() => ({
                        drawerLabel: 'Products',
                        drawerIcon: config => <Ionicons
                        size={23}
                        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}></Ionicons>
                    })} 
                />
                <ShopNavigatorDrawer.Screen
                    name="OrderStack" 
                    component={OrderStackScreen}
                    options={() => ({
                        drawerLabel: 'Orders',
                        drawerIcon: config => <Ionicons
                        size={23}
                        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}></Ionicons>
                    })} 
                />
                <ShopNavigatorDrawer.Screen
                    name="AdminStack" 
                    component={AdminStackScreen}
                    options={() => ({
                        drawerLabel: 'Admin',
                        drawerIcon: config => <Ionicons
                        size={23}
                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}></Ionicons>
                    })} 
                />
            </ShopNavigatorDrawer.Navigator>
        </NavigationContainer>

    )
}



export default ShopNavigator;