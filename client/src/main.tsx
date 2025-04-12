import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
const googleKey = 'AIzaSyARuBpdKXTThVYYvqqQrnFn1xx9q-IanPY';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <APIProvider apiKey={googleKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </APIProvider>
  </React.StrictMode>
);
