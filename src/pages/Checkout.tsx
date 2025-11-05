import { useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { usePayments } from '../context/PaymentContext';
import { createInvoice, generateTransactionHash } from '../utils/invoiceGenerator';

export function Checkout() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { addInvoice, updateInvoiceStatus } = usePayments();
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('LocalPay Store');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    if (!wallet) {
      setMessage('Please connect your wallet first');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const invoice = createInvoice(amount, merchant);
      addInvoice(invoice);

      const amountInNanotons = (parseFloat(amount) * 1_000_000_000).toString();

      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 300,
        messages: [
          {
            address: wallet.account.address,
            amount: amountInNanotons
          }
        ]
      });

      const txHash = generateTransactionHash();
      updateInvoiceStatus(invoice.id, txHash);

      setMessage('Payment successful!');
      setAmount('');
    } catch (error) {
      setMessage('Payment cancelled or failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="checkout-card">
        <h2 className="page-title">Instant Checkout</h2>
        <p className="subtitle">Pay with TON in seconds</p>

        <div className="wallet-section">
          <TonConnectButton />
        </div>

        {wallet && (
          <div className="payment-form">
            <div className="form-group">
              <label>Merchant Name</label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="input-field"
                placeholder="Enter merchant name"
              />
            </div>

            <div className="form-group">
              <label>Amount (TON)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="pay-button"
            >
              {loading ? 'Processing...' : `Pay ${amount || '0'} TON`}
            </button>

            {message && (
              <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </div>
        )}

        {!wallet && (
          <div className="connect-prompt">
            <p>Connect your TON wallet to start making payments</p>
          </div>
        )}
      </div>
    </div>
  );
}
