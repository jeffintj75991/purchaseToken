const MyERC721Token = artifacts.require("MyERC721Token");
const EscrowContract = artifacts.require("EscrowContract");

module.exports = function (deployer) {
  deployer.deploy(MyERC721Token, "MyTokenName", "MyTokenSymbol").then(function () {
    return deployer.deploy(EscrowContract, MyERC721Token.address, "0x9a30Ef125F8cf76b4cEc5598f2601b7C37db2427");
  });
};

