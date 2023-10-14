import { useState, useEffect } from 'react';


export default function Home() {
  const [tokenId, setTokenId] = useState('');
  const [tokenPrice, setTokenPrice] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [signature, setSignature] = useState('');
  const [message, setMessage] = useState('');
  const [relayerAddress, setRelayerAddress] = useState('');
  
  useEffect(() => {
    // Fetch data from your backend or blockchain here
  }, []);

  const handleListToken = async () => {
    // Implement the logic to list a token on the backend
    try {
      const response = await fetch('http://localhost:3000/list-token', {
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
      const response = await fetch('http://localhost:3000/purchase-token', {
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

  const handleAddRelayer = async () => {
    // Implement the logic to add a relayer on the backend
    try {
      const response = await fetch('http://localhost:3000/add-relayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ relayerAddress }),
      });

      if (response.status === 200) {
        setMessage('Relayer added successfully');
      } else {
        setMessage('Error adding relayer');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error adding relayer');
    }
  };

  const handleRemoveRelayer = async () => {
    // Implement the logic to remove a relayer on the backend
    try {
      const response = await fetch('http://localhost:3000/remove-relayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ relayerAddress }),
      });

      if (response.status === 200) {
        setMessage('Relayer removed successfully');
      } else {
        setMessage('Error removing relayer');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error removing relayer');
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

      <h1>Relayer Management</h1>
      <input
        type="text"
        placeholder="Relayer Address"
        value={relayerAddress}
        onChange={(e) => setRelayerAddress(e.target.value)}
      />
      <button onClick={handleAddRelayer}>Add Relayer</button>
      <button onClick={handleRemoveRelayer}>Remove Relayer</button>

      {message && <p>{message}</p>}

    </div>
  );
}
