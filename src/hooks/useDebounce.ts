import { useEffect, useState } from 'react';

const useDebounce = ({ duration = 1000 }: { duration?: number }) => {
  const [filterValue, setFIlterValue] = useState('');
  const [debounceValue, setDebounceValue] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(filterValue);
    }, duration);
    return () => {
      clearTimeout(handler);
    };
  }, [filterValue, duration]);
  return { debounceValue, filterValue, setFIlterValue };
};

export default useDebounce;
