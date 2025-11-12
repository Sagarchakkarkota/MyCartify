import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from '../ProductDetail.styles';
import Toast from 'react-native-toast-message';

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = () => {
    Toast.show({
      type: 'success',
      text1: `${product.title} added to cart 🛒`,
      position: 'bottom',
    });
  };

  return (
    <View style={styles.addCartContainer}>
      <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
