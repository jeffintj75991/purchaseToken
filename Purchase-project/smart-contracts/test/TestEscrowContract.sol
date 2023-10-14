// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/test-helpers/MockERC721.sol";
import "./EscrowContract.sol";

contract TestEscrowContract {

    EscrowContract contract = new EscrowContract(address(0), msg.sender);

    // Test that the listing fee is set correctly.
    function testListingFee() {
        assert(contract.listingFee() == 1e15); // 0.001 ETH in Wei
    }

    // Test that the contract owner can add and remove approved relayers.
    function testAddAndRemoveRelayer() {
        address relayer = address(1);

        // Add the relayer.
        contract.addRelayer(relayer);

        // Assert that the relayer is now approved.
        assert(contract.approvedRelayers(relayer));

        // Remove the relayer.
        contract.removeRelayer(relayer);

        // Assert that the relayer is no longer approved.
        assert(!contract.approvedRelayers(relayer));
    }

    // Test that a user can list a token for sale.
    function testListToken() {
        // Create a mock NFT token.
        MockERC721 nftToken = new MockERC721();

        // Mint a token to the user.
        nftToken.mint(msg.sender, 1);

        // List the token for sale.
        contract.listToken(1, 1e18); // 1 ETH

        // Assert that the token is now listed.
        Listing listing = contract.listings(1);

        assert(listing.seller == msg.sender);
        assert(listing.tokenId == 1);
        assert(listing.price == 1e18);
        assert(!listing.isCompleted);
    }

    // Test that a user can purchase a token using a meta-transaction.
    function testPurchaseWithMetaTransaction() {
        // Create a mock NFT token.
        MockERC721 nftToken = new MockERC721();

        // Mint a token to the user.
        nftToken.mint(msg.sender, 1);

        // List the token for sale.
        contract.listToken(1, 1e18); // 1 ETH

        // Approve the relayer to spend on our behalf.
        contract.approve(msg.sender, 1e18);

        // Create a meta-transaction.
        bytes32 messageHash = keccak256(abi.encodePacked(1, msg.sender, 1e18, 1));
        bytes memory signature = msg.sender.signHash(messageHash);

        // Purchase the token using the meta-transaction.
        contract.purchaseWithMetaTransaction(1, msg.sender, 1e18, 1, signature);

        // Assert that the token is now owned by the buyer.
        assert(nftToken.ownerOf(1) == msg.sender);
    }
}