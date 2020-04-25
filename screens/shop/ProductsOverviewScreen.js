import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = props => {
  const { navigation, route} = props;
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  navigation.setOptions({
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
              navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  });
  return (
    <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onViewDetail={() => {
                  navigation.navigate('ProductDetail', {
                  productId: itemData.item.id,
                  productTitle: itemData.item.title
                });
              }}
              onAddToCart={() => {
                dispatch(cartActions.addToCart(itemData.item))
              }}
              
            />
          )}
        />
      );
    };



export default ProductsOverviewScreen;