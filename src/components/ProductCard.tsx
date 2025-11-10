import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from '../screens/HomeScreen/HomeScreen.styles';

interface ProductCardProps {
  item: any;
  onPress: (id: number) => void;
}

const ProductCard = ({ item, onPress }: ProductCardProps) => {
  return (
    <Pressable style={styles.cardContainer} onPress={() => onPress(item.id)}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardInfo}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.cardDesc}>
          {item.description}
        </Text>
        <Text style={styles.cardPrice}>₹{item.price}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
