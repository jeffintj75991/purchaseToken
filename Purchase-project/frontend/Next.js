import { useState, useEffect } from 'react';

export default function Home() {
  const [tokenId, setTokenId] = useState('');
  const [tokenPrice, setTokenPrice] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [signature, setSignature] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Fetch data from your backend or blockchain here
  }, []);

  const handleListToken = async () => {
    // Implement the logic to list a token on the backend
    try {
      const response = await fetch('/list-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId, tokenPrice }),
      });

      if (response.status === 200) {
        setMessage('Token listed successfully');
      } else {
        setMessage('Error listing token');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error listing token');
    }
  };

  const handlePurchaseToken = async () => {
    // Implement the logic to purchase a token with a meta-transaction on the backend
    try {
      const response = await fetch('/purchase-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId, buyerAddress, signature }),
      });

      if (response.status === 200) {
        setMessage('Token purchased successfully');
      } else {
        setMessage('Error purchasing token');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error purchasing token');
    }
  };

  return (
    <div>
      <h1>Token Listing</h1>
      <input
        type="number"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Token Price"
        value={tokenPrice}
        onChange={(e) => setTokenPrice(e.target.value)}
      />
      <button onClick={handleListToken}>List Token</button>

      <h1>Token Purchase</h1>
      <input
        type="number"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buyer Address"
        value={buyerAddress}
        onChange={(e) => setBuyerAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
      />
      <button onClick={handlePurchaseToken}>Purchase Token</button>

      {message && <p>{message}</p>}
    </div>
  );
}

