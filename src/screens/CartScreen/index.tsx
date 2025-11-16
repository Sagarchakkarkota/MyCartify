import React from 'react';
import { FlatList, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import FallBackImage from '../../components/FallBackImage';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useCartStore } from '../../store/useCartStore';
import { colors } from '../../theme/colors';
import { styles } from './cartScreen.styles';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

const CartScreen = () => {
  const { items, updateQty, total, clearCart, removeFromCart } = useCartStore();
  return (
    <ScreenWrapper style={{ padding: 0 }}>
      <View style={styles.container}>
        <CustomButton
          title={'Clear Cart'}
          onPress={clearCart}
          style={styles.clearCartBtn}
          textStyle={{ color: colors.light.primary }}
        />
        <FlatList
          data={items || []}
          keyExtractor={item => String(item.id)}
          ListEmptyComponent={() => (
            <FallBackImage
              url={require('./../../assets/images/empty-cart.png')}
            />
          )}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              updateQuantity={updateQty}
              removeFromCartHandler={removeFromCart}
            />
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
        <CartSummary total={total} />
      </View>
    </ScreenWrapper>
  );
};

export default CartScreen;
