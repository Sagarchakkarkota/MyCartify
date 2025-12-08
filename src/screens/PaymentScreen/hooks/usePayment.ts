import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../../store/useCartStore';
import { useCheckoutStore } from '../../../store/useCheckoutStore';
import Toast from 'react-native-toast-message';

const { BiometricModule } = NativeModules;

type PaymentMethod = 'COD' | 'UPI';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'COD' | 'UPI'>('COD');

  const cartItems = useCartStore(state => state.items || []);
  const clearCart = useCartStore(state => state.clearCart);
  const address = useCheckoutStore(state => state.address);
  const navigation = useNavigation<any>();

  const paymentHandler = async () => {
    if (!selectedMethod) return;

    try {
      setLoading(true);

      if (selectedMethod === 'COD') {
        Toast.show({
          type: 'success',
          text1: `Payment successful with ${selectedMethod}`,
          position: 'bottom',
        });
        return;
      }
      if (Platform.OS === 'android') {
        const authenticated = await BiometricModule.authenticate();

        if (!authenticated) {
          setLoading(false);
          return Toast.show({
            type: 'error',
            text1: `Authentication Failed`,
            text2: 'Please try again',
            position: 'bottom',
          });
        }
        return;
      }

      //   navigation.navigate('Success'); // or Orders screen
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: `Payment Failed`,
        text2: err?.message || 'Try again',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    states: {
      loading,
      cartItems,
      address,
      selectedMethod,
      setSelectedMethod,
    },
    functions: { paymentHandler },
  };
};
export default usePayment;
