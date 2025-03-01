// 'use client';
// import { useState, useEffect } from 'react';

// function useLocalStorage(key: string, initional: string) {
//   const [value, setValue] = useState(() => {
//     const storeValue = localStorage.getItem(key);
//     return storeValue ? storeValue : initional;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, value);
//   }, [key, value]);

//   return [value, setValue] as const;
// }

// export default useLocalStorage;

'use client';
import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? storedValue : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
