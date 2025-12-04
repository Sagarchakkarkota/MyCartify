import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { globalPostRequest } from '../../../libs/axios/request';
import Toast from 'react-native-toast-message';
import { setHeadersToken } from '../../../libs/axios/axiosInstance';
import { useAuthStore } from '../../../store/authStore';
import { useNavigation } from '@react-navigation/native';

const useLogin = () => {
  const setUser = useAuthStore(state => state.setUser);
  const setTokens = useAuthStore(state => state.setTokens);

  const navigation = useNavigation<any>();
  const loginMutation = useMutation({
    mutationFn: data => globalPostRequest({ url: '/auth/login', data }),
    onSuccess: data => {
      setHeadersToken(data.accessToken);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data);
      navigation.reset({ index: 0, routes: [{ name: 'App' }] });
    },
    onError: error => {
      console.log(error);
      Toast.show({
        type: 'success',
        text1: `Login failed`,
        position: 'bottom',
      });
    },
  });
  return { loginMutation };
};

export default useLogin;
