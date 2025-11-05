import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { PaymentProvider } from './src/context/PaymentContext';
import { Navbar } from './src/components/Navbar';
import { Checkout } from './src/pages/Checkout';
import { Dashboard } from './src/pages/Dashboard';
import './src/styles/global.css';

export default function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <PaymentProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </PaymentProvider>
    </TonConnectUIProvider>
  );
}
