import { useQuery } from '@tanstack/react-query';
import { globalGetRequest } from '../../../libs/axios/request';

const useProductDetail = ({ id }: { id: string | number }) => {
  const getSingleProducts = useQuery({
    queryKey: ['singleProducts', id],
    queryFn: () => globalGetRequest({ url: `/products/${id}` }),
    enabled: !!id,
  });

  return { services: { getSingleProducts } };
};

export default useProductDetail;
