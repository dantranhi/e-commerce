import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from './store/UserContext';

const INIT_ACCOUNT = JSON.parse(localStorage.getItem('user')) ?? {}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider init={INIT_ACCOUNT}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
