const commonColors = {
  primary: '#007BFF',
  secondary: '#FFBB00',
  tertiary: '#FF0015',
  error: '#E63946',
  success: '#28A745',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#D3D3D3',
  gray: '#808080',
  darkGray: '#A9A9A9',
  extraLightGray: '#e6e6e6ff',
};
export const colors = {
  light: {
    ...commonColors,
    background: '#FFFFFF',
    text: '#1E1E1E',
    card: '#F5F5F5',
    border: commonColors.lightGray,
  },
  dark: {
    ...commonColors,
    background: '#121212',
    text: '#FFFFFF',
    card: '#1E1E1E',
    border: commonColors.lightGray,
  },
};
