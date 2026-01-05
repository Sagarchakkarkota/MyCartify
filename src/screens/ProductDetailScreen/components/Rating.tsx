import { View, Text } from 'react-native';
import React from 'react';

import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../../../theme/colors';
import { styles } from '../ProductDetail.styles';

const Rating = ({ productData }: { productData: any }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.rating}>{productData.rating}</Text>

      <Ionicons name={'star'} size={16} color={colors.light.primary} />
    </View>
  );
};

export default Rating;
