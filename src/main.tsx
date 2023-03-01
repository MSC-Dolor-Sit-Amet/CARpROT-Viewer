import React from 'react';
import ReactDOM from 'react-dom/client';
import { baseTheme, ChakraProvider, extendTheme, StyleFunctionProps, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import ColorsProvider from './providers/ColorsContext';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme(
  { config },
  {
    colors: {
      primary: baseTheme.colors.blue,
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          color: mode('gray.800', 'whiteAlpha.900')(props),
          bg: mode('white', 'gray.800')(props),
          fontFamily: 'Red Hat Display',
        },
      }),
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  }),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorsProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
