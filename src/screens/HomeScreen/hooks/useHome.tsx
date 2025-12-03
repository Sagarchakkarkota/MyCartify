// src/screens/HomeScreen/hooks/useProducts.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { globalGetRequest } from '../../../libs/axios/request';

const useHome = ({}) => {
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState('all');
  const [filterValue, setFIlterValue] = useState('');
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const limit = 10;
  const paginationLock = useRef(false);
  const getAllProducts = useQuery({
    queryKey: ['products', filterValue, category, skip],
    queryFn: () => {
      let url = `/products?limit=${limit}&skip=${skip}`;
      if (filterValue) {
        url = `/products/search?limit=${limit}&skip=${skip}&q=${filterValue}`;
      } else if (category && category !== 'all') {
        url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
      }
      return globalGetRequest({ url });
    },
    // placeholderData: keepPreviousData,
  });

  const getAllCategories = useQuery({
    queryKey: ['categories'],
    queryFn: () => globalGetRequest({ url: '/products/categories' }),
  });

  // useEffect
  useEffect(() => {
    if (!getAllProducts?.data?.products) return;
    paginationLock.current = false;
    if (skip === 0) {
      setAllProducts(getAllProducts?.data?.products);
    } else {
      setAllProducts(prev => {
        const mergedArray = [...prev, ...getAllProducts?.data?.products];
        const mappedData = Array.from(
          new Map(mergedArray?.map(p => [p.id, p]))?.values(),
        );
        return mappedData;
      });
    }
  }, [getAllProducts?.data]);
  return {
    states: {
      allProducts,
      skip,
      setSkip,
      filterValue,
      setFIlterValue,
      category,
      setCategory,
      limit,
      paginationLock,
    },
    services: { getAllProducts, getAllCategories },
  };
};
export default useHome;
