import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'buffer'; // polyfill module
// Ensure global Buffer is available (for tonconnect SDK)
import { Buffer } from 'buffer';
if (!(window as any).Buffer) {
  (window as any).Buffer = Buffer;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 