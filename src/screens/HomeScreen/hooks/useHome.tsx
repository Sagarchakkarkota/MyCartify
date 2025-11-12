// src/screens/HomeScreen/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { globalGetRequest } from '../../../libs/axios/request';
import { useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

const useHome = ({}) => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const { filterValue, setFIlterValue, debounceValue } = useDebounce({});
  const getAllProducts = useQuery({
    queryKey: ['products', debounceValue, category, page],
    queryFn: () => {
      let url = '/products';
      if (debounceValue) {
        url = `/products/search?q=${debounceValue}`;
      } else if (category && category !== 'all') {
        url = `/products/category/${category}`;
      }
      return globalGetRequest({ url });
    },
  });
  const getAllCategories = useQuery({
    queryKey: ['categories'],
    queryFn: () => globalGetRequest({ url: '/products/categories' }),
  });

  return {
    states: {
      page,
      setPage,
      filterValue,
      setFIlterValue,
      category,
      setCategory,
    },
    services: { getAllProducts, getAllCategories },
  };
};
export default useHome;
