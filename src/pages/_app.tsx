import * as React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from 'src/libs/CustomTheme';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
