declare module '@env' {
  export const API_SSL_PINNING_EXPIRATION_DATE: string;
  export const API_SSL_PINNING_PUBLIC_KEY_HASHES: string;
  export const APP_NAME: string;
  export const RAZORPAY_KEY_ID: string;
}

declare module 'react-native-config' {
  export interface NativeConfig {
    [name: string]: string | undefined;
    API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
