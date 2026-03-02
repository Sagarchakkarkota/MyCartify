import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import ScreenWrapper from '../../components/ScreenWrapper';
import usePayment from './hooks/usePayment';
import { styles } from './PaymentScreen.styles';

const PaymentScreen = ({ navigation }: any) => {
  const {
    states: { address, cartItems, selectedMethod, setSelectedMethod },
    functions: { paymentHandler },
  } = usePayment();
  const paymentMethods = ['COD', 'Online Payment'];

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
        <CustomButton title="Pay Now" onPress={paymentHandler} />
      </View>
    </ScreenWrapper>
  );
};

export default PaymentScreen;
