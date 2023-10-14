async function mintToken() {
    const contractAddress = "0xD32EC69ed8c7fEC5Aa663E772EfF1B4d674EAC54";
    const contract = new web3.eth.Contract(MyERC721Token.abi, contractAddress);
  
    const mintTransaction = await contract.methods.mint("0x1f177BeE76EC49Fc1E5bea1B2BC61383F858A6Ab", 1).send();
  
    const transactionReceipt = await web3.eth.getTransactionReceipt(mintTransaction.transactionHash);
  
    if (transactionReceipt.status) {
      console.log("Token minted successfully!");
    } else {
      console.log("Error minting token:", transactionReceipt.gasUsed);
    }
  }
  
  mintToken();
  