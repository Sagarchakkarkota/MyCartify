import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const HomeScreen = () => {
  const data = [
    { id: 1, name: 'Smartphone', price: '₹19,999' },
    { id: 2, name: 'Headphones', price: '₹2,499' },
    { id: 3, name: 'Laptop', price: '₹59,999' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Products</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
  },
  name: { fontSize: 18, fontWeight: '500' },
  price: { fontSize: 16, color: 'green', marginTop: 4 },
});

export default HomeScreen;
