import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
  const { navigation, route} = props;
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectedItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  }

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
    ),
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
    )
  });
  return (
    <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            // Note renderItem({ item, index, separators });
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onSelect={() => {
                selectedItemHandler(itemData.item.id, itemData.item.title);
              }}
            //  onAddToCart={() => {
            //     dispatch( cartActions.addToCart(itemData.item))
            //   }}
               
            >
             <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => {
                  selectedItemHandler(itemData.item.id, itemData.item.title);
                }}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={() => {
                  dispatch(cartActions.addToCart(itemData.item));
                 }
                }
              />
            </ProductItem>
          )}
        />
      );
    };



export default ProductsOverviewScreen;
