import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import CustomButton from '../../components/CustomButton';
import { styles } from './paymentScreen.styles';
import { useCheckoutStore } from '../../store/useCheckoutStore';
import { useCartStore } from '../../store/useCartStore';

const PaymentScreen = ({ navigation }: any) => {
  const address = useCheckoutStore(state => state.address);
  const cartItems = useCartStore(state => state.items || []);
  const [selectedMethod, setSelectedMethod] = useState<'COD' | 'UPI'>('COD');

  const paymentMethods = ['COD', 'UPI'];

  const handlePayment = () => {
    if (!selectedMethod) return; // safety
    // Integrate payment gateway later based on selectedMethod
    // navigation.navigate('Success');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Payment</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deliver To</Text>
          <Text>{address?.fullName}</Text>
          <Text>{address?.mobile}</Text>
          <Text>{address?.line1}</Text>
          <Text>
            {address?.city}, {address?.state} - {address?.pincode}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <Text>Total Items: {cartItems.length}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method}
              style={styles.radioContainer}
              onPress={() => setSelectedMethod(method as any)}
            >
              <View
                style={[
                  styles.radio,
                  selectedMethod === method && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <CustomButton title="Pay Now" onPress={handlePayment} />
      </View>
    </ScreenWrapper>
  );
};

export default PaymentScreen;
