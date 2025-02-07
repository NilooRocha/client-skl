import * as SecureStore from 'expo-secure-store';

export const storeRefreshToken = async (refreshToken: string) => {
  await SecureStore.setItemAsync('refreshToken', refreshToken);
};

export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync('refreshToken');
};

export const removeTokens = async () => {
  await SecureStore.deleteItemAsync('refreshToken');
};
