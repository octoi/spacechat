import '@/styles/globals.css';
import { ChakraWrap } from '@/components/chakraWrap';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraWrap>
      <Component {...pageProps} />
    </ChakraWrap>
  );
}
