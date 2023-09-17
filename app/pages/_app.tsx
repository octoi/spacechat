import '@/styles/globals.css';
import { ChakraWrapper } from '@/components/chakra-wrapper';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraWrapper>
      <Component {...pageProps} />
    </ChakraWrapper>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
