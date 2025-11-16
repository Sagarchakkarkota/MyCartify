import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCartStore } from '../../../store/useCartStore';
import { styles } from '../productDetail.styles';
import { quantities } from '../productDetail.constants';
import { Dropdown } from 'react-native-element-dropdown';
export default function AddToCartButton({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const addToCartHandler = () => {
    addToCart(product, quantity);
    Toast.show({
      type: 'success',
      text1: `${product.title} added to cart`,
      position: 'bottom',
    });
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
      <TouchableOpacity style={styles.cartButton} onPress={addToCartHandler}>
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
