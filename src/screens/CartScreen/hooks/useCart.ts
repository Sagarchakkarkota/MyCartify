import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { globalGetRequest } from '../../../libs/axios/request';
import { useCartStore } from '../../../store/useCartStore';

const useCart = () => {
  const { addToCart } = useCartStore();

  return {};
};

export default useCart;
