import React, { useEffect } from 'react';
import { ReactComponent } from '@/lib/types';
import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  createStandaloneToast,
  DarkMode,
  useColorMode,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({ config });

const { ToastContainer } = createStandaloneToast();

export const ChakraWrapper: ReactComponent = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ChakraDarkMode>
        {children}
        <ToastContainer />
      </ChakraDarkMode>
    </ChakraProvider>
  );
};

const ChakraDarkMode: ReactComponent = ({ children }) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode('dark'); // setting color mode to dark, just in case
  }, []);

  return <DarkMode>{children}</DarkMode>;
};
