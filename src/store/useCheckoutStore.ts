import { create } from 'zustand';
import { IAddressSchema } from '../screens/AddressScreen/addressScreen.types';

interface ICheckoutStateSChema {
  address: IAddressSchema | null;
  setAddress: (data: IAddressSchema) => void;
  clearAddress: () => void;
}

export const useCheckoutStore = create<ICheckoutStateSChema>(set => ({
  address: null,
  setAddress: (data: IAddressSchema) => set({ address: data }),
  clearAddress: () => set({ address: null }),
}));
