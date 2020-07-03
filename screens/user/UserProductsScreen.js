import React from 'react';
import { StyleSheet, FlatList, Button, Alert } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const { navigation } = props;
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const editProductHandler = id => {
      navigation.navigate('EditProduct', {
        productId: id,
      });
    };
    const deleteHandler = (id) => {
      Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(productsActions.deleteProduct(id));
          }
        }
      ]);
    };
    navigation.setOptions({
        headerTitle: 'Your Products',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add"
              iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              onPress={() => {
                navigation.navigate('EditProduct')
              }}
            />
          </HeaderButtons>
        )
    });
    return (
        <FlatList data={userProducts} keyExtractor={item  => item.id} 
                  renderItem={itemData => 
                  <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {}}
                  >
                    <Button
                        color={Colors.primary}
                        title="Edit"
                        onPress={() => { 
                          editProductHandler(itemData.item.id);
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="Delete" 
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />                      
                  </ProductItem>
                }/>
    )
}
const styles = StyleSheet.create({})
export default UserProductsScreen;


