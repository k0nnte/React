import { useEffect, useState } from 'react';
const useLocalstorage = (key: string, initval: string[]) => {
  const [store, setstore] = useState<string[]>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initval;
  });

  const setLocal = (item: string) => {
    if (!store.includes(item)) {
      setstore((prev) => [...prev, item]);
    }
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(store));
  }, [key, store]);

  return [store, setLocal] as const;
};

export default useLocalstorage;
