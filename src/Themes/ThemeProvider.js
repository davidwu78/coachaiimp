import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';

import theme from './theme';
import GlobalStyle from './globalStyle';

const ThemeProvider = ({ children }) => (
  <BaseThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </BaseThemeProvider>
);

export default ThemeProvider;
