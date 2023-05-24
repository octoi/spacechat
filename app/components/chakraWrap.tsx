import { useEffect } from 'react';
import { ReactComponent } from '@/lib/types/react.type';
import {
  ChakraProvider,
  extendTheme,
  createStandaloneToast,
  DarkMode,
  useColorMode,
} from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
});

const { ToastContainer } = createStandaloneToast();

export const ChakraWrap: ReactComponent = ({ children }) => {
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
