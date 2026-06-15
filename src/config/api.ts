import Config from 'react-native-config';

const normalizeBaseUrl = (url?: string) => url?.trim().replace(/\/+$/, '');

const resolvedApiUrl = normalizeBaseUrl(Config.API_URL);

if (!resolvedApiUrl) {
  throw new Error('API_URL is missing. Check your react-native-config env file.');
}

export const API_URL = resolvedApiUrl;
