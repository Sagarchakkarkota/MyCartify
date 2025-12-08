import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import ScreenWrapper from '../../components/ScreenWrapper';
import useLogin from './hooks/useLogin';
import { styles } from './login.styles';
import { colors } from '../../theme/colors';
import { moderateScale } from '../../utils/scale';

export default function LoginScreen() {
  const { loginMutation } = useLogin();
  const methods = useForm();
  const handleLogin = (data: any) => {
    const newData: any = { username: data.email, password: data.password };
    loginMutation.mutate(newData);
  };

  return (
    <ScreenWrapper style={styles.maincontainer}>
      <View
        style={styles.centerContainer}
      >
        <Image
          source={require('../../assets/images/myCartLogoFilled.png')}
          style={[styles.image]}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <FormProvider {...methods}>
            <CustomInput
              name="email"
              placeholder="Enter email"
              rules={{ required: 'Email is required' }}
              keyboardType="email-address"
            />
            <CustomInput
              name="password"
              placeholder="Enter password"
              secureTextEntry
              rules={{ required: 'Password is required' }}
            />
            <CustomButton
              onPress={methods.handleSubmit(handleLogin)}
              title="Login"
              type="touchableOpacity"
            />
          </FormProvider>
        </View>
      </View>
    </ScreenWrapper>
  );
}
