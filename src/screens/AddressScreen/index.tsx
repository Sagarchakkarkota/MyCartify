import React, { use, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import { styles } from './AddressScreen.styles';
import CustomButton from '../../components/CustomButton';
import { IAddressSchema } from './AddressScreen.types';
import { useCheckoutStore } from '../../store/useCheckoutStore';
import { moderateScale } from '../../utils/scale';
import { colors } from '../../theme/colors';

const AddressScreen = ({ navigation }: any) => {
  const methods = useForm<IAddressSchema>();

  const address = useCheckoutStore(state => state.address);
  const setAddress = useCheckoutStore(state => state.setAddress);

  const onSubmit = (data: IAddressSchema) => {
    navigation.navigate('Payment');
    setAddress(data);
  };
  useEffect(() => {
    if (address) {
      methods.reset(address);
    }
  }, [address]);
  return (
    <ScreenWrapper>
      <FormProvider {...methods}>
        <View style={styles.container}>
          <Text style={styles.title}>Delivery Address</Text>

          <CustomInput
            name="fullName"
            placeholder="Full Name"
            rules={{ required: 'Name is required' }}
          />

          <CustomInput
            name="mobile"
            placeholder="Mobile Number"
            keyboardType="number-pad"
            rules={{
              required: 'Mobile is required',
              minLength: { value: 10, message: 'Invalid number' },
            }}
          />

          <CustomInput
            name="pincode"
            placeholder="Pincode"
            keyboardType="number-pad"
            rules={{ required: 'Pincode required' }}
          />

          <CustomInput
            name="city"
            placeholder="City"
            rules={{ required: 'City required' }}
          />

          <CustomInput
            name="state"
            placeholder="State"
            rules={{ required: 'State required' }}
          />

          <CustomInput
            name="line1"
            placeholder="Address Line"
            rules={{ required: 'Address required' }}
          />

          <CustomButton
            onPress={methods.handleSubmit(onSubmit)}
            title="Proceed to Checkout"
          />
        </View>
      </FormProvider>
    </ScreenWrapper>
  );
};

export default AddressScreen;
