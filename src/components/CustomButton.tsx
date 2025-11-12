import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { moderateScale } from '../utils/scale';

export default function CustomButton({ title, onPress, style }: any) {
  return (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: moderateScale(12),
    backgroundColor: colors.light.primary,
    borderRadius: moderateScale(20),
    alignItems: 'center',
  },
  text: { color: colors.light.white, fontWeight: '600' },
});
