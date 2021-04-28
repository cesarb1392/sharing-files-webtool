import * as React from 'react';
import { ChakraProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react';
import theme from 'src/libs/CustomTheme';
import { AppProps } from 'next/app';
import ThemeToggle from 'src/components/ThemeToggle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider options={{ useSystemColorMode: true, initialColorMode: 'dark' }}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <ThemeToggle />
        <Component {...pageProps} />
      </ChakraProvider>
    </ColorModeProvider>
  );
}
