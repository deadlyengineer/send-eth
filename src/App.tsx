import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert('Please install MetaMask to use this feature.');
        return;
      }

      // Request access to the user's MetaMask wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the user's Ethereum address
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setIsConnected(true);

      // Send 0.00001 ETH to the 0x0000 address
      const tx = await signer.sendTransaction({
        to: '0x0000000000000000000000000000000000000000',
        value: ethers.parseEther('0.0000001'),
      });
      await tx.wait();

      console.log('Transaction successful:', tx.hash);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div className='App'>
      <div className=''>
        <div
          className='button'
          onClick={connectWallet}
          >
          {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </div>
      </div>
    </div>
  );
}

export default App;
