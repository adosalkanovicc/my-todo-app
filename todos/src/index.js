import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Client, Provider as UrqlProvider, cacheExchange, fetchExchange }
from 'urql';
const GRAPHQL_BASE_URL = 'http://127.0.0.1:3004/v1/graphql';

const client = new Client({
  url: GRAPHQL_BASE_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
  headers: {
  'x-hasura-admin-secret': 'ado1'
  },
  },
  });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
    <App />
    </UrqlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
