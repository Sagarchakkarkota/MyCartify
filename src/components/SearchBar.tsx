import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../utils/scale';
import { colors } from '../theme/colors';
import useDebounce from '../hooks/useDebounce';

interface Props {
  valueHandler: (debounceValue: string) => void;
}

export default function SearchBar({ valueHandler }: Props) {
  const { filterValue, setFIlterValue, debounceValue } = useDebounce({});
  useEffect(() => {
    valueHandler(debounceValue);
  }, [debounceValue]);
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={22} color={colors.light.gray} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        placeholderTextColor={colors.light.gray}
        value={filterValue}
        onChangeText={setFIlterValue}
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
