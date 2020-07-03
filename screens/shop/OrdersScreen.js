import React from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = props => {
  const { navigation } = props;
  const orders = useSelector(state => state.orders.orders);

  navigation.setOptions({
    headerTitle: 'Your Orders',
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
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData =><OrderItem
        amount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
        items={itemData.item.items}
      />}
    />
  );
};

export default OrdersScreen;
