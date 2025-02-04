import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initional: string) {
  const [value, setValue] = useState(() => {
    const storeValue = localStorage.getItem(key);
    return storeValue ? storeValue : initional;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
