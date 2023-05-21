import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraWrap } from './components/chakraWrap';
import { ApolloWrapper } from './components/apolloWrapper';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloWrapper>
      <ChakraWrap>
        <App />
      </ChakraWrap>
    </ApolloWrapper>
  </React.StrictMode>
);
