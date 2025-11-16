import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../cartScreen.styles';
import CustomButton from '../../../components/CustomButton';
import { moderateScale } from '../../../utils/scale';

export default function CartSummary({ total }: { total: () => number }) {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>
          {total().toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
          })}
        </Text>
      </View>
      <CustomButton title={'Checkout'} onPress={() => {}} />
    </View>
  );
}
