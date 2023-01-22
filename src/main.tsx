import React from 'react';
import ReactDOM from 'react-dom/client';
import { baseTheme, ChakraProvider, extendTheme, StyleFunctionProps, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme(
  { config },
  {
    fonts: {
      body: 'Red Hat Display',
    },
    colors: {
      primary: baseTheme.colors.blue,
    },
    styles: {
      global: (props: StyleFunctionProps) => {
        return {
          body: {
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('white', 'gray.800')(props),
          },
        };
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  }),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
