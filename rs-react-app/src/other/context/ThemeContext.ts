import { createContext } from 'react';
import { ThemeContextType } from '../interfases';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
