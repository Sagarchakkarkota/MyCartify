import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { styles } from './PaymentSuccess.styles';
import { colors } from '../../theme/colors';

type Props = {
  navigation: any;
};

const PaymentSuccessScreen: React.FC<Props> = ({ navigation }) => {
  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Tabs',
          state: {
            index: 0,
            routes: [{ name: 'Home' }],
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark" size={64} color={colors.light.white} />
      </View>

      <Text style={styles.title}>Payment Successful</Text>
      <Text style={styles.subtitle}>
        Your order has been placed successfully
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccessScreen;
