import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { styles } from '../cartScreen.styles';
import Toast from 'react-native-toast-message';

export default function CartSummary({
  total,
  items,
}: {
  total: () => number;
  items: any[];
}) {
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
          if (items.length !== 0) {
            navigation.navigate('Address');
          } else {
            Toast.show({
              type: 'error',
              text1: 'Your cart is empty!',
              position: 'bottom',
            });
          }
        }}
      />
    </View>
  );
}
