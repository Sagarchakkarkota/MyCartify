import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, style }: any) {
  return (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
  },
  text: { color: '#fff', fontWeight: '600' },
});
