import { Ionicons } from '@react-native-vector-icons/ionicons';
import React, { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import useDebounce from '../hooks/useDebounce';
import { colors } from '../theme/colors';
import { moderateScale } from '../utils/scale';

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
    flex: 1,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
  },
});
