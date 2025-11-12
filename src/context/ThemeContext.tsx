import React, { createContext, ReactNode, useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../theme/colors';

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    colorScheme === 'dark' ? 'dark' : 'light',
  );

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider
      value={{ theme, colors: colors[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
