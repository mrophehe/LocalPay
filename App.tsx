import {
  TonConnectUIProvider,
  TonConnectButton,
  useTonConnectUI,
  useTonWallet
} from '@tonconnect/ui-react';

function WalletActions() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const sendOneTon = async () => {
    if (!wallet) return;

    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: [
        {
          address: wallet.account.address,
          amount: '1000000000'
        }
      ]
    });
  };

  return (
    <>
      <TonConnectButton />
      <button onClick={sendOneTon}>Send 1 TON</button>
    </>
  );
}

export default function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <WalletActions />
    </TonConnectUIProvider>
  );
}
