import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { styles } from '../cartScreen.styles';

export default function CartSummary({ total }: { total: () => number }) {
  const navigation = useNavigation<any>();
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
      <CustomButton
        title={'Proceed to Checkout'}
        onPress={() => {
          navigation.navigate('Address');
        }}
      />
    </View>
  );
}
