import {
  addSslPinningErrorListener,
  initializeSslPinning,
  isSslPinningAvailable,
} from 'react-native-ssl-public-key-pinning';
import {
  API_SSL_PINNING_EXPIRATION_DATE,
  API_SSL_PINNING_PUBLIC_KEY_HASHES,
} from '@env';
import { API_URL } from '@/config/api';

let isInitialized = false;
let initializationPromise: Promise<void> | undefined;

const getHostname = (url: string) => {
  const match = url.match(/^https?:\/\/([^/:?#]+)/i);
  return match?.[1];
};

const getPublicKeyHashes = () => {
  return (API_SSL_PINNING_PUBLIC_KEY_HASHES || '')
    .split(',')
    .map(hash => hash.trim())
    .filter(Boolean);
};

export const initializeApiSslPinning = async () => {
  if (isInitialized || !isSslPinningAvailable()) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  const hostname = getHostname(API_URL);
  const publicKeyHashes = getPublicKeyHashes();

  if (
    !hostname ||
    !API_URL.startsWith('https://') ||
    publicKeyHashes.length < 2
  ) {
    return;
  }

  initializationPromise = initializeSslPinning({
    [hostname]: {
      includeSubdomains: true,
      publicKeyHashes,
      ...(API_SSL_PINNING_EXPIRATION_DATE
        ? { expirationDate: API_SSL_PINNING_EXPIRATION_DATE }
        : {}),
    },
  })
    .then(() => {
      isInitialized = true;
    })
    .catch(error => {
      initializationPromise = undefined;
      throw error;
    });

  return initializationPromise;
};

export const addApiSslPinningErrorListener = () => {
  if (!isSslPinningAvailable()) {
    return undefined;
  }

  return addSslPinningErrorListener(error => {
    console.warn('SSL pinning error', error.serverHostname);
  });
};
