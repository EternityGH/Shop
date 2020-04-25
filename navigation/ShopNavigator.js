import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';

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

const ShopNavigator = () => { //export default
    return (   
        <NavigationContainer>
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
        </NavigationContainer>

    )
}



export default ShopNavigator;