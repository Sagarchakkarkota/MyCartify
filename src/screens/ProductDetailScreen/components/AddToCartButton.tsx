import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCartStore } from '../../../store/useCartStore';
import { quantities } from '../productDetail.constants';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../ProductDetail.styles';
export default function AddToCartButton({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore(state => state.addToCart);
  const { navigate } = useNavigation<any>();
  const addToCartHandler = () => {
    addToCart(product, quantity);
    Toast.show({
      type: 'success',
      text1: `${product.title} added to cart`,
      position: 'bottom',
    });
  };
  const buyNowHandler = () => {
    addToCart(product, quantity);
    navigate('Tabs', { screen: 'Cart' });
  };
  return (
    <View style={styles.addCartContainer}>
      <Dropdown
        style={styles.picker}
        placeholder="Select quantity"
        data={quantities}
        labelField="label"
        valueField="value"
        value={quantity}
        onChange={(item: any) => setQuantity(item?.value)}
      />
      <TouchableOpacity style={styles.cartButton} onPress={buyNowHandler}>
        <Text style={styles.cartButtonText}>Buy Now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.cartButton, { backgroundColor: colors.light.secondary }]}
        onPress={addToCartHandler}
      >
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
