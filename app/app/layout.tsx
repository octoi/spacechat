import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { ChakraProvider } from '@chakra-ui/react';
import { ChakraWrap } from '@/components/chakraWrap';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Spacechat',
  description: 'A new way to chat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ChakraWrap>{children}</ChakraWrap>
      </body>
    </html>
  );
}
