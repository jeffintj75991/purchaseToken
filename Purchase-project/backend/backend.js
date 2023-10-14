// Import required libraries
const express = require("express");
const ethers = require("ethers");

// Create an Express.js app
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

// Create an Ethereum provider using Infura (replace with your own provider)
const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/b00******25");
// Replace with your smart contract ABI and address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ECDSAInvalidSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "ECDSAInvalidSignatureLength",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "ECDSAInvalidSignatureS",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "relayer",
				"type": "address"
			}
		],
		"name": "Debug",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenid",
				"type": "uint256"
			}
		],
		"name": "Debug2",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "TokenListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "TokenSold",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_relayer",
				"type": "address"
			}
		],
		"name": "addRelayer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "approvedRelayers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "listToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listingFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isCompleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftToken",
		"outputs": [
			{
				"internalType": "contract IERC721",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_nonce",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_signature",
				"type": "bytes"
			}
		],
		"name": "purchaseWithMetaTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_relayer",
				"type": "address"
			}
		],
		"name": "removeRelayer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

//escroe contract address
const contractAddress = "0x6E0f38b9c5C5D85d0b78402B610F9307e43F4CA7";

// Initialize the contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Define an endpoint to list tokens
app.post("/list-token", async (req, res) => {
  try {
	console.log("list token starting..");
	console.log("req body:",req.body)
	
    const tokenId =req.body.tokenId; 
    const price =req.body.tokenPrice; // 0.1 ETH

    // Ethereum wallet private key of contract owner
    const privateKey = "0d7b57a274d6e3d1d42ad29d9e999aead8ff412b86ee1eb9a337c155a770b3b9";

    // Create a wallet from the private key
    const wallet = new ethers.Wallet(privateKey, provider);

    const gasLimit = 220000; 
    const tx = await wallet.sendTransaction({
      to: contractAddress,
      value: ethers.utils.parseEther("0.001"), // Value sent with the transaction
      data: contract.interface.encodeFunctionData("listToken", [tokenId, price]),
      gasLimit: gasLimit,
    });
    
    await tx.wait();

    res.status(200).json({ message: "Token listed successfully" });
  } catch (error) {
    console.error("error is : ", error);
    res.status(500).json({ error: "Error listing token" });
  }
});

// Define an endpoint for purchasing tokens with a meta-transaction
app.post("/purchase-token", async (req, res) => {
  try {


    const tokenId =req.body.tokenId; 
    const price =req.body.tokenPrice; // 0.1 ETH
	const buyerAddress =req.body.buyerAddress; 

    // Replace with your Ethereum wallet private key of buyers key
    const privateKey = "234b5acc93a67fae9956b8984614df29d9f1998219f28d32692be526ecd8d849";

    // Create a wallet from the private key
    const wallet = new ethers.Wallet(privateKey, provider);

    //Create a meta-transaction message
    const message = ethers.utils.solidityKeccak256(
      ["uint256", "address", "uint256"],
      [tokenId, buyerAddress, price]
    );

    // Sign the message
    const signature = await wallet.signMessage(ethers.utils.arrayify(message));
     // Encode the function call
     const data = contract.interface.encodeFunctionData("purchaseWithMetaTransaction", [tokenId, buyerAddress, price, 16, signature]);
 

    const tx = await wallet.sendTransaction({
      to: contract.address,
      data: data,
      gasLimit: 240000,
     
    });
    await tx.wait();

    res.status(200).json({ message: "Token purchased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error purchasing token" });
  }
});



// Define an endpoint for add-relayer
app.post("/add-relayer", async (req, res) => {
  try {
	const relayerAddress =req.body.relayerAddress; 
   
    // Replace with your Ethereum wallet private key of owner
    const privateKey = "0d7b57a274d6e3d1d42ad29d9e999aead8ff412b86ee1eb9a337c155a770b3b9";

    // Create a wallet from the private key
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = contract.connect(wallet);

    console.log("account 1 address:",wallet.getAddress())    
     
    const gasLimit = 220000; // Adjust the gas limit as needed

    const tx = await contractWithSigner.addRelayer(relayerAddress, {
      gasLimit: gasLimit
    });
    await tx.wait();

    res.status(200).json({ message: "Relayer added successfully" });
  } catch (error) {

    console.error("Transaction Error Message:", error);

    res.status(500).json({ error: "Error adding relayer" });
  }
});

// Define an endpoint to remove a relayer
app.post("/remove-relayer", async (req, res) => {
  try {
    const relayerAddress = req.body.relayerAddress; // Get the relayer address from the request body

    // Replace with your Ethereum wallet private key
    const privateKey = "0d7b57a274d6e3d1d42ad29d9e999aead8ff412b86ee1eb9a337c155a770b3b9";

    // Create a wallet from the private key
    const wallet = new ethers.Wallet(privateKey, provider);

    const contractWithSigner = contract.connect(wallet);

    // Call the removeRelayer function on the smart contract
    const gasLimit = 300000; // Adjust the gas limit as needed

    const tx = await contractWithSigner.removeRelayer(relayerAddress, {
      gasLimit: gasLimit
    });

    await tx.wait();

    res.status(200).json({ message: "Relayer removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error removing relayer" });
  }
});


// Start the Express.js server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

