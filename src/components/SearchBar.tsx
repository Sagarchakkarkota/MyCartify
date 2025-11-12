import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../utils/scale';
import { colors } from '../theme/colors';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={22} color={colors.light.gray} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        placeholderTextColor={colors.light.gray}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.background,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(12),
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: scaleWidth(8),
    color: colors.light.text,
    paddingVertical: scaleHeight(8),
    fontSize: scaleFont(14),
  },
});
