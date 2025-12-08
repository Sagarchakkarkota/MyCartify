import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { styles } from '../cartScreen.styles';

export default function CartItem({
  item,
  updateQuantity,
  removeFromCartHandler,
}: any) {
  return (
    <View style={styles.itemContainer}>
      <Pressable
        style={styles.removeBtn}
        onPress={() => removeFromCartHandler(item?.id)}
      >
        <Ionicons name="trash-sharp" size={16} color={colors.light.error} />
      </Pressable>
      <Image source={{ uri: item?.thumbnail }} style={styles.itemImage} />
      <View style={styles.itemTitleContainer}>
        <Text style={styles.itemTitle}>{item?.title}</Text>
        <Text style={styles.itemPrice}>₹{item?.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item?.id, 'dec')}>
            <Ionicons
              name="remove-circle-sharp"
              size={24}
              color={colors.light.primary}
            />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item?.qty}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item?.id, 'inc')}>
            <Ionicons
              name="add-circle"
              size={24}
              color={colors.light.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
