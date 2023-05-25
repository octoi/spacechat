import '@/styles/globals.css';
import { ChakraWrap } from '@/components/chakraWrap';
import type { AppProps } from 'next/app';
import { ApolloWrapper } from '@/components/apolloWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloWrapper>
      <ChakraWrap>
        <Component {...pageProps} />
      </ChakraWrap>
    </ApolloWrapper>
  );
}
