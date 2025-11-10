import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { styles } from '../screens/HomeScreen/HomeScreen.styles';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={22} color="#9ca3af" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
