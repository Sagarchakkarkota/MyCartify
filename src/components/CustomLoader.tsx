import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

const CustomLoader = ({ style }: { style?: any }) => {
  return (
    <View style={[styles.loaderContainer, style]}>
      <ActivityIndicator size="large" color={colors.light.primary} />
    </View>
  );
};

export default CustomLoader;
const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
