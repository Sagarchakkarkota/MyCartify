import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { globalPostRequest } from '../../../libs/axios/request';
import { setHeadersToken } from '../../../libs/axios/axiosInstance';
import { useAuthStore } from '../../../store/authStore';

type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

const useRegister = () => {
  const setUser = useAuthStore(state => state.setUser);
  const setTokens = useAuthStore(state => state.setTokens);
  const navigation = useNavigation<any>();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterPayload) =>
      globalPostRequest({ url: '/auth/register', data }),
    onSuccess: data => {
      setHeadersToken(data.accessToken);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data);
      navigation.reset({ index: 0, routes: [{ name: 'App' }] });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        position: 'bottom',
      });
    },
  });

  return { registerMutation };
};

export default useRegister;
