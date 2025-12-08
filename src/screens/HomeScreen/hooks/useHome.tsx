// src/screens/HomeScreen/hooks/useProducts.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { globalGetRequest } from '../../../libs/axios/request';

const useHome = ({}) => {
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState('all');
  const [filterValue, setFilterValue] = useState('');
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
  const transFormData = (data: any[]) => {
    return data?.map((p: any) => ({ ...p, price: Math.round(p?.price * 60) }));
  };
  // useEffect
  useEffect(() => {
    if (!getAllProducts?.data?.products) return;
    paginationLock.current = false;
    const transformedProducts = transFormData(getAllProducts?.data?.products);
    if (skip === 0) {
      setAllProducts(transformedProducts);
    } else {
      setAllProducts(prev => {
        const mergedArray = [...prev, ...transformedProducts];
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
      setFilterValue,
      category,
      setCategory,
      limit,
      paginationLock,
    },
    services: { getAllProducts, getAllCategories },
  };
};
export default useHome;
