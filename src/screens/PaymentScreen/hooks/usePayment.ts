import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../../store/useCartStore';
import { useCheckoutStore } from '../../../store/useCheckoutStore';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';
import { colors } from '../../../theme/colors';
import { useAuthStore } from '../../../store/authStore';
import { TEST_KEY_ID } from '@env';

const { BiometricModule } = NativeModules;

type PaymentMethod = 'COD' | 'UPI';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'COD' | 'UPI'>('COD');

  const cartItems = useCartStore(state => state.items || []);
  const total = useCartStore(state => state.total);
  const clearCart = useCartStore(state => state.clearCart);
  const address = useCheckoutStore(state => state.address);

  const navigation = useNavigation<any>();
  const user = useAuthStore(state => state.user);
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
        return upiPaymentHandler();
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

  const upiPaymentHandler = () => {
    let options = {
      description: `Order of ${cartItems.length} items`,
      image: require('../../../assets/images/myCartLogoFilled.png'),
      currency: 'INR',
      key: TEST_KEY_ID,
      amount: String(total() * 100),
      name: 'MyCartify',
      notes: {
        items: cartItems.map(i => i.title).join(', '),
        totalQty: cartItems.reduce((sum, i) => sum + i?.qty, 0),
      },
      // order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
      prefill: {
        email: user?.email,
        contact: '+91' + address?.mobile,
        name: user?.username,
      },
      theme: { color: colors.light.primary },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // // handle success
        // Toast.show({
        //   type: 'success',
        //   text1: `Payment successful with UPI`,
        //   position: 'bottom',
        // });
        navigation.replace('PaymentSuccess');
        clearCart();
      })
      .catch((error: any) => {
        // handle failure
        Toast.show({
          type: 'error',
          text1: `Payment Failed`,
          text2: error?.message || 'Try again',
          position: 'bottom',
        });
      });
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
