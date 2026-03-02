import React from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { styles } from '../screens/HomeScreen/HomeScreen.styles';

interface Props {
  data: any;
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryList({ data, selected, onSelect }: Props) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryContentContainerStyle}
      data={data}
      keyExtractor={item => String(item.slug)}
      renderItem={({ item }) => {
        const active = selected === item.slug;
        return (
          <Pressable
            onPress={() => onSelect(item.slug)}
            style={[styles.categoryChip, active && styles.categoryChipActive]}
          >
            <Text
              style={[styles.categoryText, active && styles.categoryTextActive]}
            >
              {item.name}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}
