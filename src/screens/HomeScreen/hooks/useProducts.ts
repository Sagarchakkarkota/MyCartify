// src/screens/HomeScreen/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { globalGetRequest } from '../../../libs/axios/request';

const useProducts = ({ id }: { id: string | number }) => {
  const getAllProducts = useQuery({
    queryKey: ['products'],
    queryFn: () => globalGetRequest({ url: '/products' }),
  });
  const getSingleProducts = useQuery({
    queryKey: ['products'],
    queryFn: () => globalGetRequest({ url: `/products/${id}` }),
    enabled: !!id,
  });

  return { services: { getAllProducts, getSingleProducts } };
};
export default useProducts;
