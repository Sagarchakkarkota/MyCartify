import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function ProductCard({ item, onPress }: any) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(item.id)}>
      <Image
        source={{ uri: item.thumbnail || item.images?.[0] }}
        style={styles.img}
      />
      <View style={{ flex: 1, paddingLeft: 12 }}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    elevation: 1,
  },
  img: { width: 80, height: 80, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { marginTop: 8, color: 'green', fontWeight: '700' },
});
