import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import useRegister from './hooks/useRegister';
import { styles } from './Register.styles';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const { registerMutation } = useRegister();
  const methods = useForm();
  const navigation = useNavigation<any>();

  const handleRegister = (data: any) => {
    registerMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <ScreenWrapper style={styles.maincontainer}>
      <View style={styles.centerContainer}>
        <Image
          source={require('../../assets/images/myCartLogoFilled.png')}
          style={[styles.image]}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <FormProvider {...methods}>
            <CustomInput
              name="firstName"
              placeholder="First name"
              rules={{ required: 'First name is required' }}
            />
            <CustomInput
              name="lastName"
              placeholder="Last name"
              rules={{ required: 'Last name is required' }}
            />
            <CustomInput
              name="username"
              placeholder="Username"
              rules={{ required: 'Username is required' }}
            />
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
              onPress={methods.handleSubmit(handleRegister)}
              title="Create Account"
              type="touchableOpacity"
              loading={registerMutation.isPending}
            />
          </FormProvider>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
