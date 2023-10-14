// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// Import OpenZeppelin contracts for ERC721 tokens and access control
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// The EscrowContract, owned by an owner
contract EscrowContract is Ownable {
    using ECDSA for bytes32;

    IERC721 public nftToken;   // The ERC721 token being used
    uint256 public listingFee = 1e15; // 0.001 ETH in Wei (fee for listing)

    // A struct representing a listing
    struct Listing {
        address seller;      // Seller's address
        uint256 tokenId;     // ID of the token being listed
        uint256 price;       // Listing price
        bool isCompleted;    // Indicates if the listing is completed (sold)
    }

    mapping(uint256 => Listing) public listings;  // Mapping of token ID to Listing
    mapping(address => bool) public approvedRelayers; // Mapping of approved relayers

    // Events for contract actions
    event TokenListed(address indexed seller, uint256 indexed tokenId, uint256 price);
    event TokenSold(address indexed buyer, address indexed seller, uint256 indexed tokenId);

    event AddRelayer(string message, address relayer);
    event RemoveRelayer(string message, address relayer);

    // Constructor to initialize the contract with the NFT token address and an initial owner
    constructor(address _nftToken, address initialOwner) Ownable(initialOwner) {
        nftToken = IERC721(_nftToken);
    }

    // Function to add an approved relayer (can only be called by the contract owner)
    function addRelayer(address _relayer) public onlyOwner  { 
        emit AddRelayer("Adding relayer", _relayer);
        approvedRelayers[_relayer] = true;
    }

    // Function to remove a relayer's approval (can only be called by the contract owner)
    function removeRelayer(address _relayer) public onlyOwner {
        emit RemoveRelayer("Removing relayer", _relayer);
        approvedRelayers[_relayer] = false;
    }

    // Function to list a token for sale
    function listToken(uint256 _tokenId, uint256 _price) public payable {
        require(msg.value >= listingFee, "Insufficient listing fee");
        require(nftToken.ownerOf(_tokenId) == msg.sender, "Not the owner of the token");

        listings[_tokenId] = Listing({
            seller: msg.sender,
            tokenId: _tokenId,
            price: _price,
            isCompleted: false
        });

        emit TokenListed(msg.sender, _tokenId, _price);
    }

    // Function to purchase a token using a meta-transaction
    function purchaseWithMetaTransaction(
        uint256 _tokenId,
        address _buyer,
        uint256 _price,
        uint256 _nonce,
        bytes calldata _signature
    ) external {

        require(approvedRelayers[msg.sender], "Not an approved relayer");

        bytes32 messageHash = keccak256(abi.encodePacked(_tokenId, _buyer, _price, _nonce));

        address recoveredSigner = messageHash.recover(_signature);

        require(recoveredSigner == _buyer, "Invalid signature");

        Listing storage listing = listings[_tokenId];
        require(listing.price == _price, "Price mismatch");
        require(!listing.isCompleted, "Token already sold");

        listing.isCompleted = true;
        nftToken.safeTransferFrom(listing.seller, _buyer, _tokenId);

        emit TokenSold(_buyer, listing.seller, _tokenId);
    }
}
