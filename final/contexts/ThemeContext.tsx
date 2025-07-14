import React, { createContext, ReactNode, useContext } from 'react';
import { useColorScheme as _useColorScheme } from 'react-native';
import 'react-native-url-polyfill/auto';
import dayjs from '../utils/dayjs';

type Theme = 'light' | 'dark';
const ThemeContext = createContext<Theme>('light');

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const system = _useColorScheme();
  const hour = dayjs().hour();
  const theme: Theme = hour >= 6 && hour < 18 ? 'light' : 'dark';
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);