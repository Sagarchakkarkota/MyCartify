import { useState } from 'react';
import { Platform } from 'react-native';
import { NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../../store/useCartStore';
import { useCheckoutStore } from '../../../store/useCheckoutStore';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';
import { colors } from '../../../theme/colors';
import { useAuthStore } from '../../../store/authStore';
import { RAZORPAY_KEY_ID } from '@env';
import { globalPostRequest } from '../../../libs/axios/request';

const { BiometricModule } = NativeModules;

type PaymentMethod = 'COD' | 'Online Payment';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('COD');

  const cartItems = useCartStore(state => state.items || []);
  const total = useCartStore(state => state.total);
  const clearCart = useCartStore(state => state.clearCart);
  const address = useCheckoutStore(state => state.address);

  const navigation = useNavigation<any>();
  const user = useAuthStore(state => state.user);
  const accessToken = useAuthStore(state => state.accessToken);
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

      if (!accessToken) {
        Toast.show({
          type: 'error',
          text1: 'Login required',
          text2: 'Please login to continue with online payment',
          position: 'bottom',
        });
        navigation.getParent()?.getParent()?.navigate('Auth', {
          screen: 'Login',
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

        await onlinePaymentHandler();

        return;
      }
      await onlinePaymentHandler();
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

  const createPaymentOrder = () => {
    return globalPostRequest({
      url: '/payments/create-order',
      data: {
        amount: Math.round(total() * 100),
        currency: 'INR',
        itemCount: cartItems.length,
      },
    });
  };

  const verifyPayment = (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    return globalPostRequest({
      url: '/payments/verify',
      data,
    });
  };

  const onlinePaymentHandler = async () => {
    const order = await createPaymentOrder();

    const options = {
      description: `Order of ${cartItems.length} items`,
      image: require('../../../assets/images/myCartLogoFilled.png'),
      currency: order.currency || 'INR',
      key: RAZORPAY_KEY_ID,
      amount: String(order.amount),
      name: 'MyCartify',
      order_id: order.id,
      notes: {
        items: cartItems.map(i => i.title).join(', '),
        totalQty: cartItems.reduce((sum, i) => sum + i?.qty, 0),
      },
      prefill: {
        email: user?.email,
        contact: '+91' + address?.mobile,
        name: user?.username,
      },
      theme: { color: colors.light.primary },
    };

    const paymentData = await RazorpayCheckout.open(options);
    await verifyPayment(paymentData);

    navigation.replace('PaymentSuccess');
    clearCart();
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
