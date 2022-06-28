import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './store/UserContext';

const INIT_ACCOUNT = JSON.parse(localStorage.getItem('user')) ?? {}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider init={INIT_ACCOUNT}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
